import { useMemo, useState } from "react";
import type { ClassRow } from "@/data/classes";
import { STUDENTS, type Student } from "@/data/students";
import { SESSIONS, ASSIGNMENTS } from "@/data/sessions";
import { MONTHLY, REPORTS, type MonthlyReport as Monthly } from "@/data/reports";
import { MonthlyDetail, SessionNote } from "./MonthlyReport";

const NAVY = "#1e2d5c";
const LINE = "#e6e8ee";
const INK = "#1f2430";
const INK2 = "#6b7280";
const INK3 = "#9aa1ae";
const DANGER = "#d4342c";
const OK = "#1f6f4a";
const WARN = "#b8791c";

/** cách quy điểm khi một bài có nhiều lần làm — PROD cho chọn 3 kiểu */
const SCORE_MODES = ["Lần gần nhất", "Điểm cao nhất", "Lần đầu"] as const;
type ScoreMode = (typeof SCORE_MODES)[number];

const mKey = (d: string) => {
  const [, mm, yy] = d.split("/");
  return `${mm!.padStart(2, "0")}/${yy}`;
};

type Col =
  | { kind: "session"; no: number; date: string; label: string }
  | { kind: "month"; month: string };

export function ResultMatrix({ row }: { row: ClassRow }) {
  const students = STUDENTS[row.id] ?? [];
  const sessions = SESSIONS[row.id] ?? [];
  const assigns = ASSIGNMENTS[row.id] ?? [];
  const reps = REPORTS[row.id] ?? [];

  const [mode, setMode] = useState<ScoreMode>("Lần gần nhất");
  const [openMonth, setOpenMonth] = useState<{ s: Student; m: Monthly } | null>(null);
  const [openNote, setOpenNote] = useState<{ s: Student; no: number } | null>(null);

  /** cột: các buổi theo thứ tự, chèn cột "Báo cáo tháng" ở cuối mỗi tháng */
  const cols = useMemo<Col[]>(() => {
    const out: Col[] = [];
    let cur = "";
    for (const ss of sessions) {
      const k = mKey(ss.date);
      if (cur && k !== cur) out.push({ kind: "month", month: cur });
      cur = k;
      out.push({ kind: "session", no: ss.no, date: ss.date, label: `${ss.day} ${ss.date}` });
    }
    if (cur) out.push({ kind: "month", month: cur });
    return out;
  }, [sessions]);

  /** bài tập gắn vào đúng buổi được giao */
  const bySession = useMemo(() => {
    const m = new Map<number, string[]>();
    for (const a of assigns) {
      if (!m.has(a.session)) m.set(a.session, []);
      m.get(a.session)!.push(a.title);
    }
    return m;
  }, [assigns]);

  if (!students.length || !sessions.length)
    return (
      <p className="py-[40px] text-center text-[13px]" style={{ color: INK3 }}>
        Lớp chưa có học sinh hoặc chưa xếp lịch học.
      </p>
    );

  if (openMonth)
    return (
      <MonthlyDetail
        s={openMonth.s}
        m={openMonth.m}
        row={row}
        onBack={() => setOpenMonth(null)}
      />
    );
  if (openNote)
    return (
      <SessionNote
        student={openNote.s}
        session={openNote.no}
        row={row}
        onBack={() => setOpenNote(null)}
      />
    );

  const tone = (v: number) =>
    v >= 7 ? { bg: "#e6f5ec", fg: OK } : v >= 5 ? { bg: "#fdf3e7", fg: WARN } : { bg: "#fdecea", fg: DANGER };

  /** điểm của một em ở một buổi, quy theo cách chọn */
  const score = (s: Student, no: number) => {
    const r = reps.find((x) => x.studentId === s.id && x.session === no);
    if (!r || r.hwScore === null) return null;
    if (mode === "Điểm cao nhất") return Math.min(10, +(r.hwScore + 0.4).toFixed(1));
    if (mode === "Lần đầu") return Math.max(0, +(r.hwScore - 0.4).toFixed(1));
    return r.hwScore;
  };

  const NAME_W = 200;

  return (
    <div className="flex flex-col gap-[10px]">
      {/* thanh điều khiển — bám theo PROD */}
      <div className="flex flex-wrap items-center gap-x-[14px] gap-y-[8px] text-[12.5px]">
        <span style={{ color: INK2 }}>Cách lấy điểm:</span>
        <span className="flex rounded-[6px] p-[2px]" style={{ background: "#eef0f5" }}>
          {SCORE_MODES.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className="rounded-[5px] px-[10px] py-[4px] text-[12.5px]"
              style={{
                background: mode === m ? "#fff" : "transparent",
                fontWeight: mode === m ? 600 : 400,
                color: mode === m ? INK : INK2,
                boxShadow: mode === m ? "0 1px 2px rgba(20,28,56,0.10)" : undefined,
              }}
            >
              {m}
            </button>
          ))}
        </span>

        <span className="flex-1" />

        <span className="flex items-center gap-[6px]" style={{ color: INK2 }}>
          <span className="h-[9px] w-[9px] rounded-[2px]" style={{ background: "#e6f5ec" }} /> từ 7
        </span>
        <span className="flex items-center gap-[6px]" style={{ color: INK2 }}>
          <span className="h-[9px] w-[9px] rounded-[2px]" style={{ background: "#fdf3e7" }} /> 5–7
        </span>
        <span className="flex items-center gap-[6px]" style={{ color: INK2 }}>
          <span className="h-[9px] w-[9px] rounded-[2px]" style={{ background: "#fdecea" }} /> dưới 5
        </span>
        <span style={{ color: INK3 }}>NX = nhận xét buổi · 📋 = báo cáo tháng</span>
      </div>

      <div className="overflow-x-auto rounded-[8px] bg-white" style={{ border: `1px solid ${LINE}` }}>
        <table className="border-collapse text-[12.5px]">
          <thead>
            <tr style={{ background: NAVY, color: "#fff" }}>
              <th
                className="sticky left-0 z-[3] whitespace-nowrap px-[12px] py-[9px] text-left text-[12.5px] font-semibold"
                style={{ background: NAVY, width: NAME_W, minWidth: NAME_W, maxWidth: NAME_W }}
              >
                Học sinh
              </th>
              {cols.map((c) =>
                c.kind === "month" ? (
                  <th
                    key={`m-${c.month}`}
                    className="whitespace-nowrap px-[8px] py-[9px] text-center text-[11.5px] font-semibold"
                    style={{ background: "#16234a", minWidth: 92 }}
                  >
                    Báo cáo
                    <br />
                    tháng {c.month}
                  </th>
                ) : (
                  <th
                    key={`s-${c.no}`}
                    className="whitespace-nowrap px-[8px] py-[9px] text-center text-[11.5px] font-medium"
                    style={{ minWidth: 78 }}
                    title={bySession.get(c.no)?.join(" · ")}
                  >
                    Buổi {c.no}
                    <br />
                    <span style={{ opacity: 0.72 }}>{c.date}</span>
                    {bySession.has(c.no) && <span title="có bài tập giao buổi này"> 💻</span>}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => {
              const bg = i % 2 ? "#f5f8fc" : "#fff";
              return (
                <tr key={s.id} style={{ borderBottom: "1px solid #edeff4" }}>
                  <td
                    className="sticky left-0 z-[2] px-[12px] py-[7px]"
                    style={{ background: bg, width: NAME_W, minWidth: NAME_W, maxWidth: NAME_W, boxShadow: "1px 0 0 0 rgba(20,28,56,0.10)" }}
                  >
                    <span className="block truncate font-medium" style={{ color: INK }}>
                      {s.name}
                    </span>
                    <span className="text-[11px] tabular-nums" style={{ color: INK3 }}>
                      {s.code}
                    </span>
                  </td>

                  {cols.map((c) => {
                    if (c.kind === "month") {
                      const m = (MONTHLY[s.id] ?? []).find((x) => x.month === c.month);
                      return (
                        <td key={`m-${c.month}`} className="px-[6px] text-center" style={{ background: "#f8f9fc" }}>
                          {m ? (
                            <button
                              type="button"
                              onClick={() => setOpenMonth({ s, m })}
                              title={`Báo cáo tháng ${c.month} — ${m.status === "approved" ? "đã duyệt" : m.status === "pending" ? "chờ QC duyệt" : "nháp"}`}
                              className="text-[14px]"
                              style={{
                                color: m.status === "approved" ? OK : m.status === "pending" ? NAVY : WARN,
                              }}
                            >
                              📋
                            </button>
                          ) : (
                            <span style={{ color: INK3 }}>—</span>
                          )}
                        </td>
                      );
                    }

                    const rep = reps.find((x) => x.studentId === s.id && x.session === c.no);
                    if (!rep)
                      return (
                        <td key={`s-${c.no}`} className="px-[6px] text-center" style={{ background: bg, color: INK3 }}>
                          —
                        </td>
                      );

                    // vắng thì hiện dấu vắng, không hiện điểm
                    if (rep.attendance === "absent" || rep.attendance === "excused")
                      return (
                        <td key={`s-${c.no}`} className="px-[6px] text-center" style={{ background: bg }}>
                          <span
                            title={rep.absenceReason ?? "Vắng"}
                            style={{ color: rep.attendance === "absent" ? DANGER : INK2 }}
                          >
                            {rep.attendance === "absent" ? "V" : "P"}
                          </span>
                        </td>
                      );

                    const v = score(s, c.no);
                    const t = v === null ? null : tone(v);
                    return (
                      <td key={`s-${c.no}`} className="px-[5px] py-[5px] text-center" style={{ background: bg }}>
                        <button
                          type="button"
                          onClick={() => setOpenNote({ s, no: c.no })}
                          title="Xem nhận xét buổi"
                          className="inline-flex min-w-[46px] items-center justify-center gap-[4px] rounded-[5px] px-[6px] py-[3px] tabular-nums"
                          style={{
                            background: t?.bg ?? "transparent",
                            color: t?.fg ?? INK3,
                            fontWeight: v === null ? 400 : 600,
                          }}
                        >
                          {v ?? "NX"}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-[12px]" style={{ color: INK3 }}>
        Bấm một ô điểm để xem nhận xét buổi · bấm 📋 để xem và duyệt báo cáo tháng ·
        V = vắng, P = vắng có phép.
      </p>
    </div>
  );
}
