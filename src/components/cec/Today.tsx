import { useMemo } from "react";
import { MaHS } from "./MaHS";
import { useNavigate } from "@tanstack/react-router";
import { CLASSES } from "@/data/classes";
import { REPORTS, MONTHLY } from "@/data/reports";
import { ASSIGNMENTS, SESSIONS } from "@/data/sessions";
import { STUDENTS } from "@/data/students";
import { BAI_NOP, baiTroBanCu } from "@/data/submissions";
import { EXAMS } from "@/data/exams";
import { ME } from "@/data/me";
import {
  INK, INK2, INK3, LINE, NAVY, OK, WARN, DANGER, TODAY, soNgayToi,
} from "@/data/const";
import { daCongBo, daDuyetBai, daNhac, monthlyStatusOf, reportStatusOf, useOverrides } from "@/data/overrides";
import { Person } from "./Person";

const THU = ["Chủ nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];

/**
 * Màn "Hôm nay của tôi" — điểm vào chính của QC (WF-1).
 *
 * Gom bốn việc BẮT BUỘC của QC vào một chỗ, thay vì bắt QC mở 16 lớp để tự đếm.
 * Bốn khối là bốn TRÁCH NHIỆM, không phải dashboard tuỳ thích — nên KHÔNG cho
 * ẩn/tuỳ biến khối: cho ẩn tức là cho QC giấu việc của chính mình.
 *
 * Khối rỗng vẫn hiện, không ẩn — ẩn đi thì QC tưởng app hỏng, và mất luôn
 * cảm giác "hôm nay nhẹ việc".
 */
export function Today() {
  useOverrides();
  const navigate = useNavigate();

  /* Chỉ tính trên lớp QC phụ trách — mọi con số phải cùng một phạm vi */
  const lopCuaToi = useMemo(() => CLASSES.filter((c) => c.mine), []);
  const idCuaToi = useMemo(() => new Set(lopCuaToi.map((c) => c.id)), [lopCuaToi]);
  const tenLop = useMemo(
    () => new Map(CLASSES.map((c) => [c.id, c.code])),
    [],
  );

  /* ① Phiếu buổi chờ tôi duyệt — gom theo BUỔI, không phải theo từng em */
  const phieuCho = useMemo(() => {
    const ra: { key: string; classId: number; session: number; date: string; by: string; cho: number | null }[] = [];
    for (const c of lopCuaToi) {
      for (const s of SESSIONS[c.id] ?? []) {
        if (s.report !== "pending") continue;
        ra.push({
          key: `${c.id}-${s.no}`,
          classId: c.id,
          session: s.no,
          date: s.date,
          by: s.ta ?? s.teacher,
          cho: soNgayToi(s.date),
        });
      }
    }
    return ra.sort((a, b) => (b.cho ?? 0) - (a.cho ?? 0));
  }, [lopCuaToi]);

  /* ② Bài AI chấm chờ xác nhận */
  const baiCho = useMemo(
    () => BAI_NOP.filter((b) => b.tuLuan && idCuaToi.has(b.classId) && !daDuyetBai(b.id)),
    [idCuaToi],
  );
  /* Đã xác nhận nhưng đề tắt tự công bố -> HS vẫn chưa thấy điểm */
  const chuaCongBo = useMemo(
    () => BAI_NOP.filter((b) => b.tuLuan && idCuaToi.has(b.classId) && daDuyetBai(b.id) && !daCongBo(b.id)),
    [idCuaToi],
  );

  /* ③ Em nợ bài — CHỈ em Đang học. Em bảo lưu/đã nghỉ không nhận bài nên không nhắc. */
  const emNoBai = useMemo(() => {
    const ra: { id: string; name: string; code: string; classId: number; assigned: number; submitted: number }[] = [];
    for (const c of lopCuaToi) {
      for (const s of STUDENTS[c.id] ?? []) {
        if (s.state !== "Đang học") continue;
        if (s.assigned - s.submitted <= 0) continue;
        ra.push({ id: s.id, name: s.name, code: s.code, classId: c.id, assigned: s.assigned, submitted: s.submitted });
      }
    }
    return ra.sort((a, b) => b.assigned - b.submitted - (a.assigned - a.submitted));
  }, [lopCuaToi]);

  /* ④ Báo cáo tháng chưa gửi — gom theo LỚP × THÁNG */
  const baoCaoCho = useMemo(() => {
    const gom = new Map<string, { classId: number; month: string; tong: number; xong: number }>();
    for (const [sid, list] of Object.entries(MONTHLY)) {
      const cid = list[0]?.classId;
      if (cid === undefined || !idCuaToi.has(cid)) continue;
      for (const m of list) {
        const k = `${cid}:${m.month}`;
        const cur = gom.get(k) ?? { classId: cid, month: m.month, tong: 0, xong: 0 };
        cur.tong++;
        if (monthlyStatusOf(`${sid}:${m.month}`, m.status) === "approved") cur.xong++;
        gom.set(k, cur);
      }
    }
    return [...gom.values()].filter((x) => x.xong < x.tong).sort((a, b) => a.xong / a.tong - b.xong / b.tong);
  }, [idCuaToi]);

  /* Bài đã giao mà đề nay có bản mới — QC publish xong tưởng xong việc,
     HS mở ra vẫn bản cũ. PROD có thẻ đếm này, app mình trước không có. */
  const troBanCu = useMemo(
    () => baiTroBanCu(EXAMS).filter((x) => idCuaToi.has(x.classId)),
    [idCuaToi],
  );

  /* Lớp đang diễn ra mà CHƯA giao bài nào — PROD có 8637/8757 lớp như vậy
     mà con số chỉ nằm ở một góc màn, không cảnh báo ở đâu. Đây là việc bị bỏ
     quên hẳn, khác với "còn bài chưa nộp". */
  const lopChuaGiao = useMemo(
    () => lopCuaToi.filter((c) => c.status === "Đang diễn ra" && (ASSIGNMENTS[c.id] ?? []).length === 0),
    [lopCuaToi],
  );

  /* Lớp đang diễn ra mà CHƯA GÁN GIÁO VIÊN — buổi vẫn diễn ra bình thường,
     không ai cảnh báo. PROD có thật: cột GV ghi "Chưa gán" mà lớp vẫn chạy. */
  const lopChuaGV = useMemo(
    () =>
      lopCuaToi.filter(
        (c) => c.status === "Đang diễn ra" && (!c.teacher || c.teacher === "Chưa gán"),
      ),
    [lopCuaToi],
  );

  const ngay = `${THU[TODAY.getDay()]} · ${String(TODAY.getDate()).padStart(2, "0")}/${String(TODAY.getMonth() + 1).padStart(2, "0")}/${TODAY.getFullYear()}`;

  return (
    <div className="flex flex-col gap-[16px]">
      <header className="flex flex-wrap items-end gap-x-[14px] gap-y-[4px]">
        <h1 className="text-[19px] font-bold" style={{ color: INK }}>
          Hôm nay của tôi
        </h1>
        <span className="flex-1" />
        <span className="text-[13px]" style={{ color: INK2 }}>{ngay}</span>
      </header>
      <p className="-mt-[10px] text-[12.5px]" style={{ color: INK3 }}>
        {ME.name} · {ME.role} · {ME.campus} — {lopCuaToi.length} lớp bạn phụ trách
      </p>

      {lopChuaGV.length > 0 && (
        <div
          className="flex flex-wrap items-center gap-[10px] rounded-[8px] px-[14px] py-[11px] text-[12.5px]"
          style={{ background: "#fdecea", border: "1px solid #f2cfcb", color: DANGER }}
        >
          <strong>{lopChuaGV.length} lớp đang diễn ra chưa gán giáo viên</strong>
          <span style={{ color: INK2 }}>
            — {lopChuaGV.map((c) => c.code).join(", ")}. Buổi vẫn diễn ra bình thường,
            cần báo phòng học vụ xếp người.
          </span>
        </div>
      )}

      {lopChuaGiao.length > 0 && (
        <div
          className="flex flex-wrap items-center gap-[10px] rounded-[8px] px-[14px] py-[11px] text-[12.5px]"
          style={{ background: "#fdf3e7", border: "1px solid #f0dcc0", color: WARN }}
        >
          <strong>{lopChuaGiao.length} lớp đang diễn ra chưa được giao bài nào</strong>
          <span style={{ color: INK2 }}>
            — {lopChuaGiao.map((c) => c.code).slice(0, 4).join(", ")}
            {lopChuaGiao.length > 4 ? ` và ${lopChuaGiao.length - 4} lớp nữa` : ""}
          </span>
          <span className="flex-1" />
          <button
            type="button"
            onClick={() =>
              navigate({
                to: "/class/$classId/$tab",
                params: { classId: String(lopChuaGiao[0]!.id), tab: "bai-tap" },
              })
            }
            className="rounded-[6px] px-[11px] py-[6px] font-semibold"
            style={{ border: `1px solid #e0cfae`, background: "#fff", color: WARN }}
          >
            Mở lớp đầu tiên
          </button>
        </div>
      )}

      {troBanCu.length > 0 && (
        <div
          className="flex flex-wrap items-center gap-[10px] rounded-[8px] px-[14px] py-[11px] text-[12.5px]"
          style={{ background: "#fdecea", border: "1px solid #f2cfcb", color: DANGER }}
        >
          <strong>
            {troBanCu.length} bài đã giao đang trỏ BẢN CŨ của đề
          </strong>
          <span style={{ color: INK2 }}>
            — đề đã có bản mới, {troBanCu.reduce((a, b) => a + b.soHS, 0)} em vẫn mở ra bản cũ.
            Cần giao lại hoặc cập nhật bản.
          </span>
          <span className="flex-1" />
          <button
            type="button"
            onClick={() =>
              navigate({
                to: "/class/$classId/$tab",
                params: { classId: String(troBanCu[0]!.classId), tab: "bai-tap" },
              })
            }
            className="rounded-[6px] px-[11px] py-[6px] font-semibold"
            style={{ border: `1px solid #e3bdb8`, background: "#fff", color: DANGER }}
          >
            Xem bài đầu tiên
          </button>
        </div>
      )}

      <div className="grid gap-[14px] lg:grid-cols-2">
        {/* ① phiếu buổi */}
        <Khoi
          so={1}
          tieuDe="Phiếu buổi chờ tôi duyệt"
          dem={phieuCho.length}
          rong="Không còn phiếu nào chờ duyệt."
          coNguon={lopCuaToi.some((c) => (SESSIONS[c.id] ?? []).length > 0)}
          chan={`${phieuCho.length} phiếu · ${new Set(phieuCho.map((p) => p.classId)).size} lớp`}
          xemHet={phieuCho.length > 3 ? `Xem tất cả ${phieuCho.length} ›` : null}
          onXemHet={() => navigate({ to: "/queue/phieu" })}
        >
          {phieuCho.slice(0, 3).map((p) => (
            <Dong
              key={p.key}
              ten={p.by}
              phu={`${tenLop.get(p.classId)} · Buổi ${p.session}`}
              phu2={`${p.date}${p.cho !== null && p.cho > 0 ? ` · quá ${p.cho} ngày chưa duyệt` : ""}`}
              canhBao={p.cho !== null && p.cho >= 14}
              nut="Duyệt"
              onNut={() => navigate({ to: "/queue/phieu" })}
            />
          ))}
        </Khoi>

        {/* ② bài AI chấm */}
        <Khoi
          so={2}
          tieuDe="Bài AI chấm chờ xác nhận"
          dem={baiCho.length}
          rong="Không còn bài nào chờ xác nhận."
          coNguon={BAI_NOP.some((b) => idCuaToi.has(b.classId))}
          chan={
            chuaCongBo.length > 0 ? (
              <span style={{ color: WARN }}>
                ⚠ {chuaCongBo.length} bài đã xác nhận nhưng học sinh chưa thấy điểm
              </span>
            ) : (
              `${baiCho.length} bài · ${new Set(baiCho.map((b) => b.classId)).size} lớp`
            )
          }
          xemHet={baiCho.length > 3 ? `Xem tất cả ${baiCho.length} ›` : null}
          onXemHet={() => navigate({ to: "/queue/bai" })}
        >
          {baiCho.slice(0, 3).map((b) => (
            <Dong
              key={b.id}
              ten={b.studentName}
              ma={b.studentCode}
              maSid={b.studentId}
              maCid={b.classId}
              phu={`${b.dangTen} · AI ${b.diemAI?.toFixed(1)}`}
              phu2={`${b.baiTen} · ${tenLop.get(b.classId)}`}
              nut="Xem"
              onNut={() => navigate({ to: "/queue/bai" })}
            />
          ))}
        </Khoi>

        {/* ③ em nợ bài */}
        <Khoi
          so={3}
          tieuDe="Em nợ bài quá hạn"
          dem={emNoBai.length}
          rong="Không có em nào đang nợ bài."
          coNguon={lopCuaToi.some((c) => (STUDENTS[c.id] ?? []).length > 0)}
          chan={`${emNoBai.length} em · ${new Set(emNoBai.map((e) => e.classId)).size} lớp — chỉ tính em đang học`}
          xemHet={emNoBai.length > 3 ? `Xem tất cả ${emNoBai.length} ›` : null}
          onXemHet={() => navigate({ to: "/assignment/student" })}
        >
          {emNoBai.slice(0, 3).map((e) => (
            <Dong
              key={e.id}
              ten={e.name}
              ma={e.code}
              maSid={e.id}
              maCid={e.classId}
              phu={`${e.submitted}/${e.assigned} bài · còn ${e.assigned - e.submitted} bài`}
              phu2={tenLop.get(e.classId) ?? ""}
              nut={daNhac(`hs-${e.id}`) ? "Đã nhắc" : "Nhắc"}
              tatNut={daNhac(`hs-${e.id}`)}
              onNut={() => navigate({ to: "/assignment/student" })}
            />
          ))}
        </Khoi>

        {/* ④ báo cáo tháng */}
        <Khoi
          so={4}
          tieuDe="Báo cáo tháng chưa xong"
          dem={baoCaoCho.length}
          rong="Báo cáo tháng đã duyệt hết."
          coNguon={Object.keys(MONTHLY).length > 0}
          chan={`${baoCaoCho.length} lớp còn báo cáo dang dở`}
          xemHet={baoCaoCho.length > 3 ? `Xem tất cả ${baoCaoCho.length} ›` : null}
          onXemHet={() => navigate({ to: "/class" })}
        >
          {baoCaoCho.slice(0, 3).map((b) => (
            <Dong
              key={`${b.classId}:${b.month}`}
              ten={`${tenLop.get(b.classId)} · ${b.month}`}
              phu={b.xong === 0 ? `${b.tong} em · chưa duyệt em nào` : `${b.tong} em · ${b.xong} đã duyệt`}
              nut={b.xong === 0 ? "Soạn cả lớp" : "Tiếp tục"}
              onNut={() =>
                navigate({
                  to: "/class/$classId/$tab",
                  params: { classId: String(b.classId), tab: "ket-qua" },
                })
              }
            />
          ))}
        </Khoi>
      </div>
    </div>
  );
}

/** Một khối việc. Rỗng vẫn hiện — ẩn đi thì QC tưởng app hỏng. */
function Khoi({
  so, tieuDe, dem, rong, coNguon, chan, xemHet, onXemHet, children,
}: {
  so: number;
  tieuDe: string;
  dem: number;
  rong: string;
  /** false = CHƯA CÓ dữ liệu nguồn, khác hẳn "hết việc rồi".
   *  Lỗi nặng nhất của PROD là gộp hai thứ này làm một: QC thấy "0" rồi
   *  tưởng hết việc, trong khi thật ra bộ đếm chưa chạy. */
  coNguon: boolean;
  chan: React.ReactNode;
  xemHet: string | null;
  onXemHet: () => void;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col rounded-[10px] bg-white" style={{ border: `1px solid ${LINE}` }}>
      <div className="flex items-start gap-[10px] px-[16px] pb-[10px] pt-[14px]">
        <span
          className="mt-[2px] grid h-[20px] w-[20px] shrink-0 place-items-center rounded-full text-[11px] font-bold text-white"
          style={{ background: dem > 0 ? NAVY : "#b9c0cc" }}
        >
          {so}
        </span>
        <span className="flex-1 text-[13.5px] font-semibold" style={{ color: INK }}>
          {tieuDe}
        </span>
        <span
          className="text-[22px] font-bold leading-none tabular-nums"
          style={{ color: dem > 0 ? NAVY : "#b9c0cc" }}
        >
          {dem}
        </span>
      </div>

      <div className="flex-1" style={{ borderTop: `1px solid ${LINE}` }}>
        {dem === 0 ? (
          coNguon ? (
            <p className="px-[16px] py-[26px] text-center text-[12.5px]" style={{ color: OK }}>
              {rong}
            </p>
          ) : (
            <p className="px-[16px] py-[26px] text-center text-[12.5px]" style={{ color: INK3 }}>
              Chưa có dữ liệu — bộ đếm chạy lúc 6h sáng.
              <br />
              <span className="text-[11.5px]">Không phải hết việc, mà là chưa tính được.</span>
            </p>
          )
        ) : (
          children
        )}
      </div>

      <div
        className="flex flex-wrap items-center gap-[10px] px-[16px] py-[10px] text-[12px]"
        style={{ borderTop: `1px solid ${LINE}`, background: "#fbfcfe", color: INK3 }}
      >
        <span className="min-w-0 flex-1">{dem === 0 ? "" : chan}</span>
        {xemHet && (
          <button
            type="button"
            onClick={onXemHet}
            className="shrink-0 font-semibold hover:underline"
            style={{ color: NAVY }}
          >
            {xemHet}
          </button>
        )}
      </div>
    </section>
  );
}

function Dong({
  ten, ma, maSid, maCid, phu, phu2, nut, onNut, canhBao, tatNut,
}: {
  ten: string;
  ma?: string;
  /** để mã HS bấm được mở hồ sơ em */
  maSid?: string;
  maCid?: number;
  phu: string;
  phu2?: string;
  nut: string;
  onNut: () => void;
  canhBao?: boolean;
  tatNut?: boolean;
}) {
  return (
    <div
      className="flex items-start gap-[10px] px-[16px] py-[10px]"
      style={{ borderBottom: `1px solid #f1f3f7` }}
    >
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-x-[7px] text-[12.5px] font-medium" style={{ color: INK }}>
          <Person name={ten} size={22} />
          {ma && <MaHS ma={ma} studentId={maSid} classId={maCid} size={11} />}
        </span>
        <span className="ml-[29px] block text-[12px]" style={{ color: INK2 }}>{phu}</span>
        {phu2 && (
          <span className="ml-[29px] block text-[11.5px]" style={{ color: canhBao ? DANGER : INK3 }}>
            {phu2}
          </span>
        )}
      </span>
      <button
        type="button"
        onClick={onNut}
        disabled={tatNut}
        className="mt-[2px] shrink-0 rounded-[6px] px-[11px] py-[5px] text-[12px] font-semibold"
        style={{
          border: `1px solid ${tatNut ? LINE : "#d9dde5"}`,
          color: tatNut ? INK3 : NAVY,
          cursor: tatNut ? "default" : "pointer",
        }}
      >
        {nut}
      </button>
    </div>
  );
}
