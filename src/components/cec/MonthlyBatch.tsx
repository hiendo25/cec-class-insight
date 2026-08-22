import { useMemo, useState } from "react";
import { MaHS } from "./MaHS";
import { useNavigate } from "@tanstack/react-router";
import type { ClassRow } from "@/data/classes";
import { MONTHLY, REPORTS, type MonthlyReport } from "@/data/reports";
import { SESSIONS } from "@/data/sessions";
import { STUDENTS } from "@/data/students";
import { INK, INK2, INK3, LINE, NAVY, OK, WARN, DANGER } from "@/data/const";
import { monthlyStatusOf, setMonthlyStatus, reportStatusOf, useOverrides } from "@/data/overrides";
import { Person } from "./Person";
import { ME } from "@/data/me";
import { IconCheck, IconWarn } from "./icons";

type Co = "xanh" | "vang" | "do";

/**
 * Báo cáo tháng — duyệt hàng loạt (WF-10).
 *
 * Lớp 9 em thì cuối tháng QC phải mở 9 lần rồi bấm 9 lần. Nhưng việc thật không
 * phải là BẤM — mà là ĐỌC và SỬA 9 bản nháp AI. Nên chỗ này không gộp thao tác
 * một cách mù quáng: chia ba cờ để QC chỉ phải mở kỹ thẻ vàng và đỏ.
 *
 *  🟢 đủ nguồn      — mọi buổi trong tháng đều có phiếu đã duyệt
 *  🟡 thiếu nguồn   — còn buổi chưa có phiếu duyệt, AI chưa đưa vào
 *  🔴 nghi trùng    — nhận xét giống tháng trước, vi phạm ràng buộc CEC
 *                     "không được lặp lại nhận xét tháng trước"
 */
export function MonthlyBatch({ row, month }: { row: ClassRow; month: string }) {
  useOverrides();
  const navigate = useNavigate();
  const [chon, setChon] = useState<Set<string>>(new Set());
  /* Gửi xong phải nói ra — nút báo thành công mà màn không đổi gì
     còn tệ hơn nút chết, QC tưởng xong việc rồi bỏ đi. */
  const [daGui, setDaGui] = useState(false);
  /* Thẻ đã bấm "AI soạn lại" — đổi nội dung và gỡ cờ nghi trùng */
  const [daSoanLai, setDaSoanLai] = useState<Set<string>>(new Set());
  /* Thẻ đang mở xem chi tiết */
  const [moThe, setMoThe] = useState<string | null>(null);
  /* Đã bấm "AI soạn cho cả lớp" chưa — trước đó thẻ hiện sẵn, QC không hiểu ở đâu ra */
  const [daSoan, setDaSoan] = useState(false);

  const hs = STUDENTS[row.id] ?? [];

  /* Phiếu buổi trong tháng — nguồn của báo cáo. Buổi chưa duyệt thì AI chưa dùng. */
  const phieuThang = useMemo(() => {
    const [mm, yy] = month.split("/");
    const buoi = (SESSIONS[row.id] ?? []).filter((s) => {
      const p = s.date.split("/");
      return p.length === 3 && String(+p[1]!).padStart(2, "0") === mm && p[2] === yy;
    });
    const daDuyet = buoi.filter((s) => s.report === "approved").length;
    return { tong: buoi.length, daDuyet, chuaDuyet: buoi.length - daDuyet };
  }, [row.id, month]);

  /* Một thẻ = một học sinh × tháng này */
  const the = useMemo(() => {
    const ra: {
      sid: string; name: string; code: string; state: string;
      bc: MonthlyReport; co: Co; lyDo: string; status: string;
    }[] = [];
    for (const s of hs) {
      const list = MONTHLY[s.id] ?? [];
      const bc = list.find((m) => m.month === month);
      if (!bc) continue;

      const status = monthlyStatusOf(`${s.id}:${month}`, bc.status);

      /* 🔴 nghi trùng: kỹ năng tháng này không đổi so với tháng trước
         (delta = 0 hoặc null ở phần lớn kỹ năng) -> nhận xét nhiều khả năng lặp */
      const coPrev = bc.skills.some((k) => k.prev !== null);
      const khongDoi = bc.skills.filter((k) => k.delta === 0 || k.delta === null).length;
      const nghiTrung = coPrev && khongDoi >= Math.ceil(bc.skills.length * 0.7);

      /* 🟡 thiếu nguồn: số phiếu nhắc tên em ít hơn số buổi trong kỳ */
      const thieuNguon = bc.reportCount < bc.sessionTotal;

      /* Soạn lại rồi thì hết nghi trùng — nếu vẫn để cờ đỏ thì QC bấm xong
         không thấy gì đổi, đúng kiểu nút nói dối. */
      const daLam = daSoanLai.has(s.id);
      const co: Co = nghiTrung && !daLam ? "do" : thieuNguon ? "vang" : "xanh";
      const lyDo = nghiTrung && !daLam
        ? `Nghi trùng: ${khongDoi}/${bc.skills.length} kỹ năng không đổi so với tháng trước.`
        : thieuNguon
          ? `Thiếu nguồn: chỉ có ${bc.reportCount}/${bc.sessionTotal} phiếu nhắc tên em.`
          : "";

      ra.push({ sid: s.id, name: s.name, code: s.code, state: s.state, bc, co, lyDo, status });
    }
    /* đỏ lên trước — cái cần đọc kỹ nhất nằm trên cùng */
    const uu: Record<Co, number> = { do: 0, vang: 1, xanh: 2 };
    return ra.sort((a, b) => uu[a.co] - uu[b.co]);
  }, [hs, month, daSoanLai]);

  const demCo = (c: Co) => the.filter((t) => t.co === c).length;
  const chuaDuyet = the.filter((t) => t.status !== "approved");
  const daDuyet = the.length - chuaDuyet.length;

  /* Chỉ chọn được thẻ TA ĐÃ GỬI. Thẻ còn là nháp thì TA chưa xong,
     QC duyệt vào là duyệt bản nửa vời — app cũ tách rõ TA Submit / QC Approve. */
  const chonHetXanh = () =>
    setChon(new Set(the.filter((t) => t.co === "xanh" && t.status === "pending").map((t) => t.sid)));

  const soNhap = the.filter((t) => t.status === "draft").length;
  const soChoDuyet = the.filter((t) => t.status === "pending").length;

  if (the.length === 0)
    return (
      <p className="rounded-[10px] bg-white py-[36px] text-center text-[13px]"
        style={{ border: `1px solid ${LINE}`, color: INK3 }}>
        Lớp này chưa có báo cáo tháng {month}.
      </p>
    );

  return (
    <div className="flex flex-col gap-[12px]">
      {/* cảnh báo nguồn thiếu — AI chưa đưa buổi chưa duyệt vào báo cáo */}
      {phieuThang.chuaDuyet > 0 && (
        <div className="flex flex-wrap items-center gap-[10px] rounded-[8px] px-[14px] py-[11px] text-[12.5px]"
          style={{ background: "#fdf3e7", border: "1px solid #f0dcc0", color: WARN }}>
          <IconWarn size={14} />
          <strong>
            Còn {phieuThang.chuaDuyet} phiếu buổi chưa duyệt. AI chưa đưa {phieuThang.chuaDuyet} buổi này vào báo cáo.
          </strong>
          <span className="flex-1" />
          <button type="button" onClick={() => navigate({ to: "/queue/phieu" })}
            className="rounded-[6px] px-[11px] py-[6px] font-semibold"
            style={{ border: `1px solid #e0cfae`, background: "#fff", color: WARN }}>
            Đi duyệt {phieuThang.chuaDuyet} phiếu
          </button>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-[10px] text-[12.5px]">
        <span style={{ color: INK2 }}>
          Nguồn: {phieuThang.daDuyet} phiếu buổi đã duyệt · {the.length} bản nháp AI · 0 bài ghi âm
        </span>
        <span className="flex-1" />
        {/* Không có bước này thì QC không hiểu 9 thẻ ở đâu ra, và khi dữ liệu
            đổi (duyệt thêm phiếu) cũng không soạn lại được. */}
        <button
          type="button"
          onClick={() => { setDaSoan(true); setDaSoanLai(new Set()); }}
          className="rounded-[6px] px-[12px] py-[6px] font-semibold"
          style={{ border: `1px solid #d9dde5`, background: "#fff", color: NAVY }}
        >
          {daSoan ? "AI soạn lại cả lớp" : `AI soạn cho cả lớp ${the.length} em`}
        </button>
      </div>
      {daSoan && (
        <p className="-mt-[6px] text-[12px]" style={{ color: OK }}>
          Đã soạn lại {the.length} bản nháp từ {phieuThang.daDuyet} phiếu buổi đã duyệt.
        </p>
      )}

      {/* ba cờ + hành động theo lô */}
      <div className="flex flex-wrap items-center gap-[12px] text-[12.5px]">
        <Co1 mau={OK} nhan="đủ nguồn" so={demCo("xanh")} />
        <Co1 mau={WARN} nhan="thiếu nguồn" so={demCo("vang")} />
        <Co1 mau={DANGER} nhan="nghi trùng tháng trước" so={demCo("do")} />
        <span className="mx-[4px] h-[14px] w-px" style={{ background: "#d9dde5" }} />
        {/* Hai bước như app cũ: TA gửi -> QC duyệt */}
        <span style={{ color: soNhap ? INK2 : INK3 }}>
          TA chưa gửi <b className="tabular-nums">{soNhap}</b>
        </span>
        <span style={{ color: soChoDuyet ? NAVY : INK3 }}>
          chờ tôi duyệt <b className="tabular-nums">{soChoDuyet}</b>
        </span>
        <span className="flex-1" />
        <button type="button" onClick={chonHetXanh}
          className="rounded-[6px] px-[11px] py-[6px]"
          style={{ border: `1px solid #d9dde5`, color: INK }}>
          Chọn tất cả thẻ xanh
        </button>
        <button
          type="button"
          disabled={chon.size === 0}
          onClick={() => {
            chon.forEach((sid) => setMonthlyStatus(`${sid}:${month}`, "approved"));
            setChon(new Set());
          }}
          className="flex items-center gap-[7px] rounded-[6px] px-[13px] py-[7px] font-semibold text-white"
          style={{ background: chon.size ? NAVY : "#b9c0cc", cursor: chon.size ? "pointer" : "not-allowed" }}
        >
          <IconCheck size={13} />
          Duyệt {chon.size} thẻ đã chọn
        </button>
      </div>

      <div className="flex flex-col gap-[8px]">
        {the.map((t) => (
          <The
            key={t.sid}
            t={t}
            chon={chon.has(t.sid)}
            onChon={() =>
              setChon((s) => {
                const n = new Set(s);
                n.has(t.sid) ? n.delete(t.sid) : n.add(t.sid);
                return n;
              })
            }
            onDuyet={() => setMonthlyStatus(`${t.sid}:${month}`, "approved")}
            onSoanLai={() => setDaSoanLai((v) => new Set(v).add(t.sid))}
            daSoanLai={daSoanLai.has(t.sid)}
            moRong={moThe === t.sid}
            onMoRong={() => setMoThe(moThe === t.sid ? null : t.sid)}
          />
        ))}
      </div>

      {daGui && (
        <div
          className="flex flex-wrap items-center gap-[10px] rounded-[8px] px-[14px] py-[11px] text-[12.5px]"
          style={{ background: "#e6f5ec", border: "1px solid #cbe6d6", color: OK }}
        >
          <IconCheck size={14} />
          <strong>Đã gửi {the.length} báo cáo tháng {month} cho phụ huynh.</strong>
          <span className="flex-1" />
          <button type="button" onClick={() => setDaGui(false)}
            className="rounded-[6px] px-[11px] py-[6px] font-semibold"
            style={{ border: `1px solid #b7dcc6`, background: "#fff", color: OK }}>
            Hoàn tác
          </button>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-[10px] rounded-[8px] bg-white px-[14px] py-[11px] text-[12.5px]"
        style={{ border: `1px solid ${LINE}` }}>
        <span style={{ color: INK2 }}>
          Đã duyệt <b style={{ color: INK }}>{daDuyet}/{the.length}</b>
        </span>
        <span className="flex-1" />
        {chuaDuyet.length > 0 && (
          <span style={{ color: INK3 }}>Còn {chuaDuyet.length} bản chưa duyệt</span>
        )}
        <button
          type="button"
          disabled={chuaDuyet.length > 0}
          onClick={() => setDaGui(true)}
          className="rounded-[6px] px-[14px] py-[8px] font-semibold text-white"
          style={{
            background: chuaDuyet.length ? "#b9c0cc" : NAVY,
            cursor: chuaDuyet.length ? "not-allowed" : "pointer",
          }}
          title={chuaDuyet.length ? `Còn ${chuaDuyet.length} bản chưa duyệt` : undefined}
        >
          Gửi phụ huynh
        </button>
      </div>
    </div>
  );
}

function Co1({ mau, nhan, so }: { mau: string; nhan: string; so: number }) {
  return (
    <span className="flex items-center gap-[6px]" style={{ color: so ? INK : INK3 }}>
      <span className="h-[9px] w-[9px] rounded-full" style={{ background: so ? mau : "#d9dde5" }} />
      {nhan} <b className="tabular-nums">{so}</b>
    </span>
  );
}

function The({
  t, chon, onChon, onDuyet, onSoanLai, daSoanLai, moRong, onMoRong,
}: {
  t: { sid: string; name: string; code: string; state: string; bc: MonthlyReport; co: Co; lyDo: string; status: string };
  chon: boolean;
  onChon: () => void;
  onDuyet: () => void;
  onSoanLai: () => void;
  daSoanLai: boolean;
  moRong: boolean;
  onMoRong: () => void;
}) {
  const mau = t.co === "do" ? DANGER : t.co === "vang" ? WARN : OK;
  const xong = t.status === "approved";

  return (
    <section className="rounded-[9px] bg-white" style={{ border: `1px solid ${xong ? "#cbe6d6" : LINE}` }}>
      <div className="flex flex-wrap items-center gap-[10px] px-[14px] py-[10px]"
        style={{ borderBottom: `1px solid #f1f3f7` }}>
        <input
          type="checkbox"
          checked={chon}
          disabled={xong || t.status === "draft"}
          onChange={onChon}
          style={{ accentColor: NAVY }}
          title={t.status === "draft" ? "TA chưa gửi bản này" : undefined}
          aria-label={`Chọn báo cáo của ${t.name}`}
        />
        <span className="h-[9px] w-[9px] shrink-0 rounded-full" style={{ background: mau }} />
        <Person name={t.name} size={24} />
        <MaHS ma={t.code} studentId={t.sid} classId={t.bc.classId} />
        {t.state !== "Đang học" && (
          <span className="rounded-[4px] px-[7px] py-[1px] text-[11px]"
            style={{ background: "#f0f2f6", color: INK2 }}>{t.state}</span>
        )}
        <span className="flex-1" />
        {/* Ba trạng thái theo đúng hai bước của app cũ, không gộp làm "Nháp" */}
        <span className="rounded-[5px] px-[8px] py-[2px] text-[11.5px] font-medium"
          style={
            xong
              ? { background: "#e6f5ec", color: OK }
              : t.status === "pending"
                ? { background: "#eef1f7", color: NAVY }
                : { background: "#f0f2f6", color: INK2 }
          }>
          {xong ? "QC đã duyệt" : t.status === "pending" ? "TA đã gửi — chờ tôi duyệt" : "TA đang soạn"}
        </span>
      </div>

      <div className="flex flex-col gap-[5px] px-[14px] py-[10px] text-[12.5px]">
        {t.lyDo && (
          <p className="flex items-start gap-[6px]" style={{ color: mau }}>
            <IconWarn size={13} /> {t.lyDo}
          </p>
        )}
        <p style={{ color: INK }}>
          <b>1. Điểm danh:</b> nghỉ {t.bc.absent}/{t.bc.sessionTotal} buổi, đi muộn {t.bc.late}.
        </p>
        <p style={{ color: INK }}>
          <b>2. Bài tập:</b> hoàn thành {t.bc.hwDone}/{t.bc.hwTotal}, nộp muộn {t.bc.hwLate}.
        </p>
        <p style={{ color: INK }}>
          <b>3. Tiến bộ:</b>{" "}
          {t.bc.skills
            .filter((k) => k.now !== null)
            .slice(0, 3)
            .map((k) => `${k.name} ${k.now?.toFixed(1)}${k.delta ? ` (${k.delta > 0 ? "↑" : "↓"}${Math.abs(k.delta).toFixed(1)})` : " (→)"}`)
            .join(" · ")}
        </p>
      </div>

      {moRong && (
        <div className="px-[14px] pb-[10px]" style={{ borderTop: `1px solid #f1f3f7` }}>
          <p className="mb-[7px] mt-[9px] text-[12px] font-semibold" style={{ color: INK2 }}>
            Tiến bộ 7 kỹ năng
          </p>
          <div className="grid gap-x-[16px] gap-y-[4px] text-[12.5px] sm:grid-cols-2">
            {t.bc.skills.map((k) => (
              <div key={k.name} className="flex items-center gap-[8px]">
                <span className="w-[74px] shrink-0" style={{ color: INK2 }}>{k.name}</span>
                <span className="w-[38px] tabular-nums font-semibold" style={{ color: INK }}>
                  {k.now === null ? "—" : k.now.toFixed(1)}
                </span>
                <span className="tabular-nums text-[11.5px]"
                  style={{ color: !k.delta ? INK3 : k.delta > 0 ? OK : DANGER }}>
                  {!k.delta ? "→ không đổi" : `${k.delta > 0 ? "↑" : "↓"}${Math.abs(k.delta).toFixed(1)} so tháng trước`}
                </span>
              </div>
            ))}
          </div>
          {/* Phân loại — app cũ có 3 mức trong modal Comment detail */}
          <div className="mt-[10px] flex flex-wrap items-center gap-[8px] text-[12.5px]">
            <span style={{ color: INK2 }}>Xếp loại:</span>
            {(["Xuất sắc", "Tốt", "Cần hỗ trợ"] as const).map((x) => {
              const goiY = t.bc.attendRate >= 90 && (t.bc.hwDone / Math.max(1, t.bc.hwTotal)) >= 0.8
                ? "Xuất sắc"
                : t.bc.attendRate >= 70 ? "Tốt" : "Cần hỗ trợ";
              const on = x === goiY;
              return (
                <span key={x}
                  className="rounded-[5px] px-[9px] py-[3px] text-[11.5px]"
                  style={{
                    border: `1px solid ${on ? NAVY : "#dfe3ea"}`,
                    background: on ? "#eef1f7" : "#fff",
                    color: on ? NAVY : INK3,
                    fontWeight: on ? 600 : 400,
                  }}
                  title={on ? "AI đề xuất theo điểm danh và tỉ lệ nộp bài" : undefined}
                >
                  {x}
                </span>
              );
            })}
          </div>

          <p className="mt-[9px] text-[11.5px]" style={{ color: INK3 }}>
            Nguồn: {t.bc.reportCount}/{t.bc.sessionTotal} phiếu buổi nhắc tên em ·
            {" "}{t.bc.hwDone}/{t.bc.hwTotal} bài tập · điểm danh {t.bc.attendRate}%
          </p>
          {/* Lưu vết — app cũ ghi "sysadmin modified at 23:55, 01/08/2026" */}
          <p className="mt-[4px] text-[11px]" style={{ color: INK3 }}>
            {xong
              ? `${ME.name} đã duyệt`
              : t.status === "pending"
                ? "Trợ giảng đã gửi, chờ QC duyệt"
                : "Trợ giảng đang soạn, chưa gửi"}
          </p>
          {daSoanLai && (
            <p className="mt-[6px] text-[11.5px]" style={{ color: OK }}>
              Đã soạn lại — AI viết bản mới, không dùng lại câu của tháng trước.
            </p>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-[8px] px-[14px] py-[9px]"
        style={{ borderTop: `1px solid #f1f3f7`, background: "#fbfcfe" }}>
        <span className="flex-1" />
        {t.co === "do" && !xong && (
          <button type="button" onClick={onSoanLai}
            className="rounded-[6px] px-[11px] py-[6px] text-[12px] font-semibold"
            style={{ border: `1px solid #e0cfae`, color: WARN }}>
            AI soạn lại
          </button>
        )}
        <button type="button" onClick={onMoRong}
          className="rounded-[6px] px-[11px] py-[6px] text-[12px]"
          style={{ border: `1px solid #d9dde5`, color: NAVY }}>
          {moRong ? "Thu gọn" : "Mở xem"}
        </button>
        {!xong && t.status === "pending" && (
          <button type="button" onClick={onDuyet}
            className="rounded-[6px] px-[13px] py-[6px] text-[12px] font-semibold text-white"
            style={{ background: NAVY }}>
            Duyệt
          </button>
        )}
        {!xong && t.status === "draft" && (
          <span className="text-[12px]" style={{ color: INK3 }}>
            Chờ trợ giảng gửi
          </span>
        )}
      </div>
    </section>
  );
}
