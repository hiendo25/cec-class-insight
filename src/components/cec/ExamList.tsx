import { useEffect, useMemo, useState } from "react";
import { TH_BG, TH_FG, TH_LINE, NAVY, LINE, INK, INK2, INK3, OK, WARN, DANGER } from "@/data/const";
import { useNavigate } from "@tanstack/react-router";
import {
  EXAMS,
  EXAM_CAP_DO,
  EXAM_KY_NANG,
  EXAM_LOAI,
  EXAM_TRANG_THAI,
  EXAM_CO_SO,
  type Exam,
} from "@/data/exams";
import { ME } from "@/data/me";
import { matchCode, matchWords } from "@/lib/search";
import { IconCheck, IconSearch } from "./icons";


const TT_STYLE: Record<string, { bg: string; fg: string; ngan: string }> = {
  "Nháp": { bg: "#f0f2f6", fg: INK2, ngan: "Nháp" },
  "Đã xuất bản": { bg: "#e6f5ec", fg: OK, ngan: "Đã xuất bản" },
  "Đã xuất bản · đang sửa bản mới": { bg: "#fdf3e7", fg: WARN, ngan: "Đã xuất bản · đang sửa v2" },
};

/* Chỉ mở sort cho cột QC thật sự cần xếp — số câu, thời gian, ngày tạo, tên. */
type SortCot = "ten" | "soCau" | "thoiGian" | "ngayTao";
const SORT_CUA: Record<string, SortCot | undefined> = {
  "Tên đề bài": "ten",
  "Câu": "soCau",
  "Thời gian": "thoiGian",
  "Ngày tạo": "ngayTao",
};
/** Chiều rộng từng cột — khớp thứ tự mảng tiêu đề bên dưới.
 *  Tên đề chiếm phần lớn như PROD; các cột còn lại vừa đủ nội dung. */
const COL_W = [420, 96, 150, 100, 96, 62, 92, 140, 150, 104];

/** dd/mm/yyyy -> số so sánh được; sai định dạng thì trả 0 chứ không NaN làm hỏng sort */
const ngaySo = (d: string) => {
  const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(d.trim());
  return m ? +m[3]! * 10000 + +m[2]! * 100 + +m[1]! : 0;
};

type Loc = { loai: string; kyNang: string; capDo: string; trangThai: string; coSo: string; nguoiTao: string };
const TRONG: Loc = { loai: "", kyNang: "", capDo: "", trangThai: "", coSo: "", nguoiTao: "" };

function Chon({
  nhan,
  giaTri,
  cacGiaTri,
  onChon,
}: {
  nhan: string;
  giaTri: string;
  cacGiaTri: readonly string[];
  onChon: (v: string) => void;
}) {
  return (
    <select
      value={giaTri}
      onChange={(e) => onChon(e.target.value)}
      className="rounded-[6px] px-[10px] py-[7px] text-[12.5px]"
      style={{
        border: `1px solid ${giaTri ? NAVY : "#d9dde5"}`,
        color: giaTri ? INK : INK2,
        background: "#fff",
        fontWeight: giaTri ? 600 : 400,
      }}
    >
      <option value="">{nhan}</option>
      {cacGiaTri.map((v) => (
        <option key={v} value={v}>
          {v}
        </option>
      ))}
    </select>
  );
}

/**
 * Màn Đề bài cho QC — bản CHỈ ĐỌC.
 *
 * Audit PROD (_ee/_PROD_MAN_DEBAI.md) chốt: QC tra cứu / lọc đề, mở xem cấu trúc,
 * bấm "Thử làm" để kiểm đáp án và máy chấm, đọc cấu hình đối chiếu điểm.
 * QC KHÔNG soạn đề, không xuất bản, không nhân bản, không gán buổi học —
 * nên màn này bỏ hẳn các nút đó, và bỏ luôn kiểu sửa-inline của PROD
 * (cột Loại/Cơ sở trên PROD bấm nhầm là đổi dữ liệu thật, không hỏi lại).
 */
export function ExamList() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"Tất cả" | "Của tôi" | "Đã xuất bản">("Tất cả");
  const [loc, setLoc] = useState<Loc>(TRONG);
  const [q, setQ] = useState("");
  const [sap, setSap] = useState<{ cot: SortCot; giam: boolean }>({ cot: "ngayTao", giam: true });
  const [soHien, setSoHien] = useState(100);

  /* Người tạo lấy từ chính kho đề — PROD dùng dropdown động có ô tìm kiếm */
  const nguoiTaoList = useMemo(
    () => [...new Set(EXAMS.map((e) => e.nguoiTao))].sort((a, b) => a.localeCompare(b, "vi")),
    [],
  );

  const theoTab = useMemo(
    () =>
      EXAMS.filter((e) =>
        tab === "Của tôi"
          ? e.nguoiTao === ME.name
          : tab === "Đã xuất bản"
            ? e.trangThai !== "Nháp"
            : true,
      ),
    [tab],
  );

  const list = useMemo(
    () =>
      theoTab.filter(
        (e) =>
          (!loc.loai || e.loai === loc.loai) &&
          (!loc.kyNang || e.kyNang === loc.kyNang) &&
          (!loc.capDo || e.capDo === loc.capDo) &&
          (!loc.trangThai || e.trangThai === loc.trangThai) &&
          (!loc.coSo || e.coSo === loc.coSo) &&
          (!loc.nguoiTao || e.nguoiTao === loc.nguoiTao) &&
          (!q.trim() || matchWords(e.ten, q) || matchCode(e.ma, q) || matchWords(e.topic, q)),
      ),
    [theoTab, loc, q],
  );

  const daSap = useMemo(() => {
    const c = sap.cot;
    const key = (e: Exam) =>
      c === "ten" ? e.ten : c === "ngayTao" ? ngaySo(e.ngayTao) : c === "soCau" ? e.soCau : e.thoiGian;
    return [...list].sort((x, y) => {
      const a = key(x), b = key(y);
      const r = typeof a === "string" ? a.localeCompare(b as string, "vi") : (a as number) - (b as number);
      /* Cột Thời gian/Câu có nhiều đề trùng giá trị — xếp phụ theo ngày tạo mới nhất
         để khối trùng không nằm theo thứ tự ngẫu nhiên mỗi lần sort. */
      if (r === 0 && c !== "ngayTao") return ngaySo(y.ngayTao) - ngaySo(x.ngayTao);
      return sap.giam ? -r : r;
    });
  }, [list, sap]);

  useEffect(() => setSoHien(100), [tab, loc, q, sap]);

  const coLoc = Object.values(loc).some(Boolean) || !!q.trim();
  const dem = {
    "Tất cả": EXAMS.length,
    "Của tôi": EXAMS.filter((e) => e.nguoiTao === ME.name).length,
    "Đã xuất bản": EXAMS.filter((e) => e.trangThai !== "Nháp").length,
  };

  return (
    <div className="mt-4 flex flex-col gap-[12px]">
      {/* nhắc rõ phạm vi của QC ở màn này */}
      <p
        className="rounded-[8px] px-[14px] py-[10px] text-[12.5px]"
        style={{ background: "#f4f6fa", border: `1px solid ${LINE}`, color: INK2 }}
      >
        Màn này để <strong>tra cứu và kiểm đề</strong>. Bấm một đề để xem cấu trúc, cấu hình chấm
        điểm và <strong>Thử làm</strong> trước khi giao cho học sinh. Việc soạn đề và xuất bản do
        người soạn đề làm.
      </p>

      {/* tab */}
      <div className="flex items-end gap-[3px]" style={{ borderBottom: `1px solid ${LINE}` }}>
        {(["Tất cả", "Của tôi", "Đã xuất bản"] as const).map((t) => {
          const on = t === tab;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className="flex items-center gap-[7px] rounded-t-[7px] px-[15px] py-[9px] text-[13px]"
              style={{
                background: on ? "#fff" : "transparent",
                border: on ? `1px solid ${LINE}` : "1px solid transparent",
                borderBottomColor: on ? "#fff" : LINE,
                marginBottom: -1,
                fontWeight: on ? 700 : 500,
                color: on ? INK : INK2,
              }}
            >
              {t}
              <span
                className="rounded-full px-[7px] py-[1px] text-[11px] tabular-nums"
                style={{ background: on ? "#eef1f7" : "#f1f2f6", color: on ? NAVY : INK3 }}
              >
                {dem[t]}
              </span>
            </button>
          );
        })}
      </div>

      {/* bộ lọc — đúng các trường PROD có */}
      <div className="flex flex-wrap items-center gap-[8px] text-[12.5px]">
        <span
          className="flex items-center gap-[7px] rounded-[6px] bg-white px-[10px] py-[7px]"
          style={{ border: `1px solid #d9dde5`, minWidth: 260 }}
        >
          <IconSearch size={14} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tìm tên đề, mã đề hoặc chủ điểm"
            className="w-full text-[12.5px] outline-none"
          />
        </span>

        <Chon nhan="Tất cả loại đề" giaTri={loc.loai} cacGiaTri={EXAM_LOAI} onChon={(v) => setLoc({ ...loc, loai: v })} />
        <Chon nhan="Tất cả kỹ năng" giaTri={loc.kyNang} cacGiaTri={EXAM_KY_NANG} onChon={(v) => setLoc({ ...loc, kyNang: v })} />
        <Chon nhan="Tất cả cấp độ" giaTri={loc.capDo} cacGiaTri={EXAM_CAP_DO} onChon={(v) => setLoc({ ...loc, capDo: v })} />
        <Chon nhan="Tất cả trạng thái" giaTri={loc.trangThai} cacGiaTri={EXAM_TRANG_THAI} onChon={(v) => setLoc({ ...loc, trangThai: v })} />
        <Chon nhan="Tất cả cơ sở" giaTri={loc.coSo} cacGiaTri={EXAM_CO_SO} onChon={(v) => setLoc({ ...loc, coSo: v })} />
        <Chon nhan="Tất cả người tạo" giaTri={loc.nguoiTao} cacGiaTri={nguoiTaoList} onChon={(v) => setLoc({ ...loc, nguoiTao: v })} />

        {coLoc && (
          <button
            type="button"
            onClick={() => {
              setLoc(TRONG);
              setQ("");
            }}
            className="cec-btn cec-btn-secondary"
          >
            Đặt lại bộ lọc
          </button>
        )}

        <span className="flex-1" />
        <span style={{ color: INK3 }}>
          {list.length > soHien
            ? `Hiện ${soHien} trong ${list.length} đề${coLoc ? " khớp bộ lọc" : ""}`
            : coLoc
              ? `${list.length} đề khớp bộ lọc (kho ${theoTab.length} đề)`
              : `${list.length} đề`}
        </span>
      </div>

      {list.length === 0 ? (
        <div
          className="flex flex-col items-center gap-[10px] rounded-[8px] bg-white py-[40px] text-center text-[13px]"
          style={{ border: `1px solid ${LINE}`, color: INK3 }}
        >
          <span>
            <strong style={{ color: INK }}>0 đề</strong> khớp bộ lọc — kho vẫn còn {theoTab.length} đề.
          </span>
          <span className="text-[12px]">Bộ lọc đang quá hẹp, không phải lỗi màn hình.</span>
          <button
            type="button"
            onClick={() => {
              setLoc(TRONG);
              setQ("");
            }}
            className="cec-btn cec-btn-secondary"
          >
            Bỏ hết bộ lọc
          </button>
        </div>
      ) : (
        <div className="cec-scroll overflow-x-auto rounded-[8px] bg-white" style={{ border: `1px solid ${LINE}` }}>
          {/* PROD dinh chieu rong tung cot: ten de ~440px mot dong, cat bang "…".
              Khong co colgroup thi trinh duyet chia deu -> cot ten bi bop con 95px
              trong khi cot "Cap do" chi chua "A1" lai rong gap doi. */}
          <table className="border-collapse text-[13px]" style={{ minWidth: 1180, width: "100%" }}>
            <colgroup>
              {COL_W.map((w, i) => (
                <col key={i} style={{ width: w }} />
              ))}
            </colgroup>
            <thead>
              <tr style={{ background: TH_BG, color: TH_FG, borderBottom: `1px solid ${TH_LINE}` }}>
                {["Tên đề bài", "Loại", "Cơ sở", "Kỹ năng", "Cấp độ", "Câu", "Thời gian", "Người tạo", "Trạng thái", "Ngày tạo"].map(
                  (h) => {
                    const c = SORT_CUA[h];
                    const on = c && sap.cot === c;
                    return (
                      <th key={h} className="whitespace-nowrap px-[12px] py-[10px] text-left text-[12.5px] font-semibold">
                        {c ? (
                          <button
                            type="button"
                            onClick={() => setSap((v) => (v.cot === c ? { cot: c, giam: !v.giam } : { cot: c, giam: true }))}
                            className="flex items-center gap-[5px] font-semibold hover:underline"
                            style={{ color: TH_FG }}
                            title={`Sắp xếp theo ${h}`}
                          >
                            {h}
                            <span style={{ opacity: on ? 1 : 0.4, fontSize: 10 }}>{on ? (sap.giam ? "▼" : "▲") : "↕"}</span>
                          </button>
                        ) : (
                          h
                        )}
                      </th>
                    );
                  },
                )}
              </tr>
            </thead>
            <tbody>
              {daSap.slice(0, soHien).map((e, i) => (
                <Dong key={e.id} e={e} i={i} onMo={() => navigate({ to: "/exam/$examId", params: { examId: e.id } })} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {list.length > soHien && (
        <div className="flex items-center gap-[10px] text-[12px]" style={{ color: INK3 }}>
          <button
            type="button"
            onClick={() => setSoHien((n) => n + 100)}
            className="cec-btn cec-btn-secondary"
          >
            Tải thêm {Math.min(100, list.length - soHien)} đề
          </button>
          <span>Còn {list.length - soHien} đề chưa hiện — hoặc lọc thêm để thu hẹp.</span>
        </div>
      )}
    </div>
  );
}

function Dong({ e, i, onMo }: { e: Exam; i: number; onMo: () => void }) {
  const tt = TT_STYLE[e.trangThai] ?? TT_STYLE["Nháp"]!;
  return (
    <tr
      onClick={onMo}
      className="cursor-pointer"
      style={{ background: i % 2 ? "#f5f8fc" : "#fff", borderBottom: "1px solid #edeff4" }}
    >
      {/* Một dòng, cắt bằng "…" như PROD — để tên dài không đội cao cả hàng */}
      <td className="max-w-0 px-[12px] py-[9px]">
        <button
          type="button"
          onClick={onMo}
          className="block w-full truncate text-left font-medium hover:underline"
          style={{ color: NAVY }}
          title={e.ten}
        >
          {e.ten}
        </button>
        <span className="block truncate text-[11.5px]" style={{ color: INK3 }}>
          <span className="tabular-nums">{e.ma}</span>
          {e.nhanBanTu && <> · nhân bản từ {e.nhanBanTu}</>}
        </span>
      </td>
      <td className="whitespace-nowrap px-[12px]" style={{ color: INK2 }}>{e.loai}</td>
      <td className="max-w-0 truncate px-[12px]" style={{ color: INK2 }} title={e.coSo}>{e.coSo}</td>
      <td className="whitespace-nowrap px-[12px]" style={{ color: INK2 }}>{e.kyNang}</td>
      <td className="whitespace-nowrap px-[12px]" style={{ color: INK2 }}>{e.capDo}</td>
      <td className="px-[12px] tabular-nums" style={{ color: INK2 }}>{e.soCau}</td>
      <td className="whitespace-nowrap px-[12px] tabular-nums" style={{ color: INK2 }}>{e.thoiGian} phút</td>
      <td className="max-w-0 truncate px-[12px]" style={{ color: INK2 }} title={e.nguoiTao}>{e.nguoiTao}</td>
      <td className="whitespace-nowrap px-[12px]">
        <span className="rounded-full px-[8px] py-[2px] text-[11.5px]" style={{ background: tt.bg, color: tt.fg }}>
          {tt.ngan}
        </span>
      </td>
      <td className="whitespace-nowrap px-[12px] tabular-nums" style={{ color: INK3 }}>{e.ngayTao}</td>
    </tr>
  );
}

export { TT_STYLE };
