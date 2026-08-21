import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import type { ClassRow } from "@/data/classes";
import { MONTHLY, REPORTS, type MonthlyReport } from "@/data/reports";
import { SESSIONS } from "@/data/sessions";
import { STUDENTS } from "@/data/students";
import { INK, INK2, INK3, LINE, NAVY, OK, WARN, DANGER } from "@/data/const";
import { monthlyStatusOf, setMonthlyStatus, reportStatusOf, useOverrides } from "@/data/overrides";
import { Person } from "./Person";
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

      const co: Co = nghiTrung ? "do" : thieuNguon ? "vang" : "xanh";
      const lyDo = nghiTrung
        ? `Nghi trùng: ${khongDoi}/${bc.skills.length} kỹ năng không đổi so với tháng trước.`
        : thieuNguon
          ? `Thiếu nguồn: chỉ có ${bc.reportCount}/${bc.sessionTotal} phiếu nhắc tên em.`
          : "";

      ra.push({ sid: s.id, name: s.name, code: s.code, state: s.state, bc, co, lyDo, status });
    }
    /* đỏ lên trước — cái cần đọc kỹ nhất nằm trên cùng */
    const uu: Record<Co, number> = { do: 0, vang: 1, xanh: 2 };
    return ra.sort((a, b) => uu[a.co] - uu[b.co]);
  }, [hs, month]);

  const demCo = (c: Co) => the.filter((t) => t.co === c).length;
  const chuaDuyet = the.filter((t) => t.status !== "approved");
  const daDuyet = the.length - chuaDuyet.length;

  const chonHetXanh = () =>
    setChon(new Set(the.filter((t) => t.co === "xanh" && t.status !== "approved").map((t) => t.sid)));

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

      <p className="text-[12.5px]" style={{ color: INK2 }}>
        Nguồn: {phieuThang.daDuyet} phiếu buổi đã duyệt · {the.length} bản nháp AI · 0 bài ghi âm
      </p>

      {/* ba cờ + hành động theo lô */}
      <div className="flex flex-wrap items-center gap-[12px] text-[12.5px]">
        <Co1 mau={OK} nhan="đủ nguồn" so={demCo("xanh")} />
        <Co1 mau={WARN} nhan="thiếu nguồn" so={demCo("vang")} />
        <Co1 mau={DANGER} nhan="nghi trùng tháng trước" so={demCo("do")} />
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
          />
        ))}
      </div>

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
  t, chon, onChon, onDuyet,
}: {
  t: { sid: string; name: string; code: string; state: string; bc: MonthlyReport; co: Co; lyDo: string; status: string };
  chon: boolean;
  onChon: () => void;
  onDuyet: () => void;
}) {
  const mau = t.co === "do" ? DANGER : t.co === "vang" ? WARN : OK;
  const xong = t.status === "approved";

  return (
    <section className="rounded-[9px] bg-white" style={{ border: `1px solid ${xong ? "#cbe6d6" : LINE}` }}>
      <div className="flex flex-wrap items-center gap-[10px] px-[14px] py-[10px]"
        style={{ borderBottom: `1px solid #f1f3f7` }}>
        <input type="checkbox" checked={chon} disabled={xong} onChange={onChon}
          style={{ accentColor: NAVY }} aria-label={`Chọn báo cáo của ${t.name}`} />
        <span className="h-[9px] w-[9px] shrink-0 rounded-full" style={{ background: mau }} />
        <Person name={t.name} size={24} />
        <span className="tabular-nums text-[11.5px]" style={{ color: INK3 }}>{t.code}</span>
        {t.state !== "Đang học" && (
          <span className="rounded-[4px] px-[7px] py-[1px] text-[11px]"
            style={{ background: "#f0f2f6", color: INK2 }}>{t.state}</span>
        )}
        <span className="flex-1" />
        <span className="rounded-[5px] px-[8px] py-[2px] text-[11.5px] font-medium"
          style={xong ? { background: "#e6f5ec", color: OK } : { background: "#f0f2f6", color: INK2 }}>
          {xong ? "Đã duyệt" : "Nháp"}
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

      <div className="flex flex-wrap items-center gap-[8px] px-[14px] py-[9px]"
        style={{ borderTop: `1px solid #f1f3f7`, background: "#fbfcfe" }}>
        <span className="flex-1" />
        {t.co === "do" && !xong && (
          <button type="button"
            className="rounded-[6px] px-[11px] py-[6px] text-[12px]"
            style={{ border: `1px solid #d9dde5`, color: WARN }}>
            AI soạn lại
          </button>
        )}
        <button type="button"
          className="rounded-[6px] px-[11px] py-[6px] text-[12px]"
          style={{ border: `1px solid #d9dde5`, color: NAVY }}>
          Mở xem
        </button>
        {!xong && (
          <button type="button" onClick={onDuyet}
            className="rounded-[6px] px-[13px] py-[6px] text-[12px] font-semibold text-white"
            style={{ background: NAVY }}>
            Duyệt
          </button>
        )}
      </div>
    </section>
  );
}
