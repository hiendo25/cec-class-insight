import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CLASSES } from "@/data/classes";
import { REPORTS } from "@/data/reports";
import { SESSIONS } from "@/data/sessions";
import { INK, INK2, INK3, LINE, NAVY, OK, WARN, DANGER, soNgayToi } from "@/data/const";
import { reportStatusOf, setReportStatus, useOverrides } from "@/data/overrides";
import { Person } from "./Person";
import { IconCheck } from "./icons";

/**
 * Hàng đợi duyệt phiếu buổi — XUYÊN LỚP (WF-2).
 *
 * QC phụ trách 16 lớp; trước đây muốn duyệt phiếu phải mở 16 lượt cho cùng một
 * thao tác. Ở đây gom theo VIỆC, không theo lớp: duyệt liên tục không rời màn.
 *
 * Phiếu do GV/TA điền, QC chỉ DUYỆT hoặc TRẢ LẠI — không viết hộ.
 */
export function PhieuQueue() {
  useOverrides();
  const navigate = useNavigate();
  const [locLop, setLocLop] = useState("");
  /* Đếm số lần duyệt — buộc tính lại danh sách sau mỗi thao tác */
  const [dauX, setDauX] = useState(0);

  const tenLop = useMemo(() => new Map(CLASSES.map((c) => [c.id, c.code])), []);

  /* Một dòng = một BUỔI đang chờ duyệt, kèm các phiếu từng em bên trong */
  const buoiCho = useMemo(() => {
    const ra: {
      key: string; classId: number; session: number; date: string;
      by: string; cho: number | null;
      phieu: { id: string; studentId: string; status: string }[];
    }[] = [];
    for (const c of CLASSES) {
      if (!c.mine) continue;
      for (const s of SESSIONS[c.id] ?? []) {
        if (s.report !== "pending") continue;
        const phieu = (REPORTS[c.id] ?? [])
          .filter((r) => r.session === s.no)
          .map((r) => ({ id: r.id, studentId: r.studentId, status: reportStatusOf(r.id, r.status) }));
        /* buổi mà mọi phiếu đã duyệt xong thì rời hàng đợi */
        if (phieu.length > 0 && phieu.every((p) => p.status === "approved")) continue;
        ra.push({
          key: `${c.id}-${s.no}`, classId: c.id, session: s.no, date: s.date,
          by: s.ta ?? s.teacher, cho: soNgayToi(s.date), phieu,
        });
      }
    }
    return ra.sort((a, b) => (b.cho ?? 0) - (a.cho ?? 0));
    /* PHẢI có `dauX` trong mảng phụ thuộc: bên trong đọc reportStatusOf(),
       để rỗng thì trạng thái đóng băng lúc mount — duyệt xong nhãn vẫn nguyên,
       QC bấm mãi không thấy gì đổi mà cũng không có toast để nghi ngờ. */
  }, [dauX]);

  const list = locLop ? buoiCho.filter((b) => String(b.classId) === locLop) : buoiCho;
  const lopCo = useMemo(
    () => [...new Set(buoiCho.map((b) => b.classId))].map((id) => ({ id, code: tenLop.get(id) ?? "" })),
    [buoiCho, tenLop],
  );

  const [idx, setIdx] = useState(0);
  const viTri = Math.min(idx, Math.max(0, list.length - 1));
  const buoi = list[viTri];

  return (
    <div className="flex flex-col gap-[13px]">
      <div className="flex flex-wrap items-center gap-[10px] text-[12.5px]">
        <span
          className="rounded-[8px] px-[11px] py-[6px] font-semibold"
          style={{ background: list.length ? "#fdf3e7" : "#e6f5ec", color: list.length ? WARN : OK }}
        >
          {list.length ? `Chờ tôi duyệt: ${list.length} buổi` : "Đã duyệt hết"}
        </span>
        <select
          value={locLop}
          onChange={(e) => { setLocLop(e.target.value); setIdx(0); }}
          className="rounded-[8px] px-[10px] py-[6px] text-[12.5px]"
          style={{ border: `1px solid ${locLop ? NAVY : "#d9dde5"}`, background: "#fff", color: locLop ? INK : INK2 }}
        >
          <option value="">Tất cả {lopCo.length} lớp</option>
          {lopCo.map((l) => (
            <option key={l.id} value={String(l.id)}>{l.code}</option>
          ))}
        </select>
        {locLop && list.length === 0 && (
          <span style={{ color: WARN }}>
            Lớp này không còn phiếu nào chờ duyệt —{" "}
            <button type="button" onClick={() => setLocLop("")} className="font-semibold underline" style={{ color: NAVY }}>
              bỏ lọc để xem cả {buoiCho.length} buổi
            </button>
          </span>
        )}
      </div>

      {!buoi ? (
        <p className="rounded-[12px] bg-white py-[40px] text-center text-[13px]"
          style={{ border: `1px solid ${LINE}`, color: locLop ? INK3 : OK }}>
          {locLop ? "Không có buổi nào khớp bộ lọc." : "Không còn phiếu nào chờ duyệt."}
        </p>
      ) : (
        <section className="rounded-[12px] bg-white" style={{ border: `1px solid ${LINE}` }}>
          <div className="flex flex-wrap items-center gap-[10px] px-[16px] py-[11px]"
            style={{ borderBottom: `1px solid ${LINE}`, background: "#fbfcfe" }}>
            <button
              type="button"
              onClick={() => navigate({ to: "/class/$classId/$tab", params: { classId: String(buoi.classId), tab: "lich-hoc" } })}
              className="text-[13px] font-semibold hover:underline"
              style={{ color: NAVY }}
            >
              {tenLop.get(buoi.classId)}
            </button>
            <span className="text-[13px]" style={{ color: INK }}>· Buổi {buoi.session}</span>
            <span className="text-[12.5px] tabular-nums" style={{ color: INK2 }}>{buoi.date}</span>
            {buoi.cho !== null && buoi.cho > 0 && (
              <span className="text-[12px]" style={{ color: buoi.cho >= 14 ? DANGER : WARN }}>
                quá {buoi.cho} ngày chưa duyệt
              </span>
            )}
            <span className="flex-1" />
            <span className="text-[12px]" style={{ color: INK3 }}>Người điền:</span>
            <Person name={buoi.by} size={22} />

            <span className="ml-[10px] tabular-nums text-[12.5px]" style={{ color: INK2 }}>
              Buổi {viTri + 1}/{list.length}
            </span>
            <NutDi nhan="‹ Trước" tat={viTri === 0} onBam={() => setIdx((n) => Math.max(0, n - 1))} />
            <NutDi nhan="Sau ›" tat={viTri >= list.length - 1} onBam={() => setIdx((n) => Math.min(list.length - 1, n + 1))} />
          </div>

          <div className="px-[16px] py-[12px]">
            <p className="mb-[9px] text-[12px]" style={{ color: INK3 }}>
              {buoi.phieu.length} phiếu trong buổi này ·{" "}
              {buoi.phieu.filter((p) => p.status === "approved").length} đã duyệt
            </p>
            <div className="flex flex-col gap-[6px]">
              {buoi.phieu.map((p) => (
                <PhieuDong key={p.id} id={p.id} classId={buoi.classId} studentId={p.studentId} status={p.status} onDoi={() => setDauX((n) => n + 1)} />
              ))}
              {buoi.phieu.length === 0 && (
                <p className="py-[14px] text-center text-[12.5px]" style={{ color: INK3 }}>
                  Buổi này chưa có phiếu nào của học sinh.
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-[10px] px-[16px] py-[11px]"
            style={{ borderTop: `1px solid ${LINE}`, background: "#fbfcfe" }}>
            <span className="text-[12px]" style={{ color: INK3 }}>
              Phiếu do giáo viên và trợ giảng điền — QC duyệt hoặc trả lại, không viết hộ.
            </span>
            <span className="flex-1" />
            <button
              type="button"
              onClick={() => {
                buoi.phieu.forEach((p) => setReportStatus(p.id, "approved"));
                setDauX((n) => n + 1);
              }}
              className="flex items-center gap-[7px] rounded-[8px] px-[15px] py-[8px] text-[12.5px] font-semibold text-white"
              style={{ background: NAVY }}
            >
              <IconCheck size={13} />
              Duyệt cả buổi ({buoi.phieu.filter((p) => p.status !== "approved").length})
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

function PhieuDong({
  id, classId, studentId, status, onDoi,
}: { id: string; classId: number; studentId: string; status: string; onDoi: () => void }) {
  const em = useMemo(() => {
    const rp = (REPORTS[classId] ?? []).find((r) => r.id === id);
    return rp;
  }, [classId, id]);

  const M: Record<string, { t: string; bg: string; fg: string }> = {
    draft: { t: "GV chưa gửi", bg: "#fdecea", fg: DANGER },
    pending: { t: "chờ tôi duyệt", bg: "#fdf3e7", fg: WARN },
    approved: { t: "đã duyệt", bg: "#e6f5ec", fg: OK },
  };
  const m = M[status] ?? M["pending"]!;

  return (
    <div className="flex flex-wrap items-center gap-[10px] rounded-[8px] px-[11px] py-[8px]"
      style={{ border: `1px solid ${LINE}`, background: status === "approved" ? "#fbfdfc" : "#fff" }}>
      <span className="min-w-[190px] text-[12.5px]" style={{ color: INK }}>
        <Person name={em?.by ?? studentId} size={20} />
      </span>
      <span className="min-w-0 flex-1 truncate text-[12px]" style={{ color: INK2 }}>
        {em?.comment ?? "—"}
      </span>
      <span className="shrink-0 rounded-[4px] px-[8px] py-[2px] text-[11.5px] font-medium"
        style={{ background: m.bg, color: m.fg }}>
        {m.t}
      </span>
      {status !== "approved" && (
        <>
          <button type="button" onClick={() => { setReportStatus(id, "draft"); onDoi(); }}
            className="shrink-0 rounded-[8px] px-[10px] py-[5px] text-[12px]"
            style={{ border: `1px solid ${LINE}`, color: WARN }}>
            Trả lại
          </button>
          <button type="button" onClick={() => { setReportStatus(id, "approved"); onDoi(); }}
            className="shrink-0 rounded-[8px] px-[10px] py-[5px] text-[12px] font-semibold"
            style={{ border: `1px solid ${LINE}`, color: NAVY }}>
            Duyệt
          </button>
        </>
      )}
    </div>
  );
}

function NutDi({ nhan, tat, onBam }: { nhan: string; tat: boolean; onBam: () => void }) {
  return (
    <button
      type="button"
      onClick={onBam}
      disabled={tat}
      className="rounded-[8px] px-[10px] py-[6px] text-[12.5px]"
      style={{
        border: `1px solid ${tat ? "#e3e6ec" : "#d9dde5"}`,
        color: tat ? "#b9c0cc" : INK,
        cursor: tat ? "not-allowed" : "pointer",
      }}
    >
      {nhan}
    </button>
  );
}
