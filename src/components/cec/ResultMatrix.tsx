import { useEffect, useMemo, useRef, useState } from "react";
import type { ClassRow } from "@/data/classes";
import { STUDENTS, type Student } from "@/data/students";
import { SESSIONS, ASSIGNMENTS } from "@/data/sessions";
import {
  MONTHLY,
  REPORTS,
  type MonthlyReport as Monthly,
  type StudentReport,
} from "@/data/reports";
import { MonthlyDetail, SessionNote } from "./MonthlyReport";
import { monthlyStatusOf, reportStatusOf, useOverrides } from "@/data/overrides";

const NAVY = "#1e2d5c";
const LINE = "#e6e8ee";
const INK = "#1f2430";
const INK2 = "#6b7280";
const INK3 = "#6a7386";
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

export function ResultMatrix({
  row,
  openNoteKey,
  openMonthKey,
  onOpenNote,
  onOpenMonth,
}: {
  row: ClassRow;
  /** "<studentId>:<số buổi>" lấy từ URL */
  openNoteKey?: string | undefined;
  /** "<studentId>:<MM/YYYY>" lấy từ URL */
  openMonthKey?: string | undefined;
  onOpenNote: (key: string | null) => void;
  onOpenMonth: (key: string | null) => void;
}) {
  const students = STUDENTS[row.id] ?? [];
  const sessions = SESSIONS[row.id] ?? [];
  const assigns = ASSIGNMENTS[row.id] ?? [];
  const reps = REPORTS[row.id] ?? [];

  useOverrides();
  const [mode, setMode] = useState<ScoreMode>("Lần gần nhất");
  /** QC phải duyệt phiếu giáo viên điền — trước đây phải bấm từng ô mới biết
   *  ô nào đang chờ, nên bật cờ này để tô sáng đúng những ô cần xử lý. */
  const [onlyPending, setOnlyPending] = useState(false);
  /* Hai màn con nằm trên URL để F5 giữ nguyên chỗ đang xem và Back về đúng bảng */
  const setOpenMonth = (v: { s: Student; m: Monthly } | null) =>
    onOpenMonth(v ? `${v.s.id}:${v.m.month}` : null);
  const setOpenNote = (v: { s: Student; no: number } | null) =>
    onOpenNote(v ? `${v.s.id}:${v.no}` : null);

  const openNote = (() => {
    if (!openNoteKey) return null;
    const [sid, no] = openNoteKey.split(":");
    const s = students.find((x) => x.id === sid);
    return s && no ? { s, no: Number(no) } : null;
  })();

  const openMonth = (() => {
    if (!openMonthKey) return null;
    const i = openMonthKey.indexOf(":");
    const sid = openMonthKey.slice(0, i);
    const month = openMonthKey.slice(i + 1);
    const s = students.find((x) => x.id === sid);
    const m = (MONTHLY[sid] ?? []).find((x) => x.month === month);
    return s && m ? { s, m } : null;
  })();

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
        onBack={() => onOpenMonth(null)}
      />
    );
  if (openNote)
    return (
      <SessionNote
        student={openNote.s}
        session={openNote.no}
        row={row}
        onBack={() => onOpenNote(null)}
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
    <Matrix
      {...{ row, students, cols, reps, bySession, mode, setMode, score, tone, setOpenMonth, setOpenNote, NAME_W, onlyPending, setOnlyPending }}
    />
  );
}

/** Bảng ma trận — tách riêng để dùng hook cuộn mà không vướng nhánh return sớm ở trên */
type MatrixProps = {
  students: Student[];
  cols: Col[];
  reps: StudentReport[];
  bySession: Map<number, string[]>;
  mode: ScoreMode;
  setMode: (m: ScoreMode) => void;
  score: (s: Student, no: number) => number | null;
  tone: (v: number) => { bg: string; fg: string };
  setOpenMonth: (v: { s: Student; m: Monthly }) => void;
  setOpenNote: (v: { s: Student; no: number }) => void;
  NAME_W: number;
  onlyPending: boolean;
  setOnlyPending: (v: boolean) => void;
};

function Matrix({
  students, cols, reps, bySession, mode, setMode, score, tone, setOpenMonth, setOpenNote, NAME_W,
  onlyPending, setOnlyPending,
}: MatrixProps) {
  /* Chỉ đếm phiếu THỰC SỰ có ô trên bảng: ma trận chỉ vẽ buổi có trong lịch
     và học sinh còn trong danh sách, nên đếm cả kho sẽ ra số lớn hơn số ô QC
     nhìn thấy — bấm mãi không hết việc. */
  const pendingCount = (() => {
    const buoi = new Set(cols.filter((c) => c.kind === "session").map((c) => (c as { no: number }).no));
    const hs = new Set(students.map((x) => x.id));
    /* CHỈ đếm phiếu giáo viên đã nộp và đang chờ QC duyệt.
       Phiếu "Nháp" là giáo viên chưa nộp — QC không duyệt được, đếm vào đây
       là thổi phồng việc lên hơn gấp đôi (15 thành 32). */
    return reps.filter(
      (r) => reportStatusOf(r.id, r.status) === "pending" && buoi.has(r.session) && hs.has(r.studentId),
    ).length;
  })();
  const boxRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState({ left: 0, right: 0 });

  /** đếm xem còn bao nhiêu cột đang khuất mỗi bên, để báo bằng CHỮ */
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const scan = () => {
      const ths = [...el.querySelectorAll("thead th")].slice(1) as HTMLElement[];
      const box = el.getBoundingClientRect();
      const nameEdge = box.left + NAME_W;
      let l = 0, r = 0;
      for (const th of ths) {
        const t = th.getBoundingClientRect();
        if (t.right <= nameEdge + 1) l++;
        else if (t.right > box.right + 1) r++;
      }
      setHidden({ left: l, right: r });
    };
    scan();
    el.addEventListener("scroll", scan, { passive: true });
    window.addEventListener("resize", scan);
    return () => {
      el.removeEventListener("scroll", scan);
      window.removeEventListener("resize", scan);
    };
  }, [cols, NAME_W]);

  const nudge = (dir: 1 | -1) => {
    const el = boxRef.current;
    if (el) el.scrollBy({ left: dir * Math.max(240, el.clientWidth * 0.7), behavior: "smooth" });
  };

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

        {pendingCount > 0 && (
          <button
            type="button"
            onClick={() => setOnlyPending(!onlyPending)}
            className="rounded-[6px] px-[11px] py-[5px] text-[12.5px]"
            style={{
              border: `1px solid ${onlyPending ? NAVY : "#d9dde5"}`,
              background: onlyPending ? "#eef1f7" : "#fff",
              color: onlyPending ? NAVY : INK,
              fontWeight: onlyPending ? 600 : 400,
            }}
          >
            {pendingCount} phiếu chờ bạn duyệt
          </button>
        )}

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
        <span style={{ color: INK2 }}>NX = chưa có điểm · 📋 = báo cáo tháng · ô viền chấm = phiếu chờ bạn duyệt · ô mờ = giáo viên chưa nộp</span>
      </div>

      {(hidden.left > 0 || hidden.right > 0) && (
        <div className="flex flex-wrap items-center gap-[10px] text-[12.5px]">
          <button
            type="button"
            onClick={() => nudge(-1)}
            disabled={hidden.left === 0}
            className="rounded-[6px] px-[10px] py-[5px]"
            style={{
              border: `1px solid ${LINE}`,
              background: "#fff",
              color: hidden.left ? INK : "#c3c9d4",
              cursor: hidden.left ? "pointer" : "default",
            }}
          >
            ‹ Buổi trước
          </button>
          <button
            type="button"
            onClick={() => nudge(1)}
            disabled={hidden.right === 0}
            className="rounded-[6px] px-[10px] py-[5px]"
            style={{
              border: `1px solid ${LINE}`,
              background: "#fff",
              color: hidden.right ? INK : "#c3c9d4",
              cursor: hidden.right ? "pointer" : "default",
            }}
          >
            Buổi sau ›
          </button>
          <span style={{ color: WARN, fontWeight: 600 }}>
            Đang khuất{hidden.left ? ` ${hidden.left} cột bên trái` : ""}
            {hidden.left && hidden.right ? " và" : ""}
            {hidden.right ? ` ${hidden.right} cột bên phải` : ""} — cuộn ngang để xem
          </span>
        </div>
      )}

      <div
        ref={boxRef}
        className="cec-scroll overflow-x-auto rounded-[8px] bg-white"
        style={{ border: `1px solid ${LINE}` }}
      >
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
                                color: monthlyStatusOf(`${s.id}:${m.month}`, m.status) === "approved" ? OK : monthlyStatusOf(`${s.id}:${m.month}`, m.status) === "pending" ? NAVY : WARN,
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
                          <button
                            type="button"
                            onClick={() => setOpenNote({ s, no: c.no })}
                            title={
                              (reportStatusOf(rep.id, rep.status) === "pending" ? "Phiếu chờ bạn duyệt — " : "") +
                              (rep.absenceReason ?? (rep.attendance === "absent" ? "Vắng không phép" : "Vắng có phép"))
                            }
                            className="inline-block min-w-[46px] rounded-[5px] px-[6px] py-[3px] text-[11.5px]"
                            style={{
                              background: "#eceef3",
                              color: INK2,
                              fontStyle: "italic",
                              outline: reportStatusOf(rep.id, rep.status) === "pending" ? `1.5px dashed ${NAVY}` : undefined,
                              outlineOffset: reportStatusOf(rep.id, rep.status) === "pending" ? "1px" : undefined,
                              opacity:
                                onlyPending && reportStatusOf(rep.id, rep.status) !== "pending" ? 0.24 : 1,
                            }}
                          >
                            {rep.attendance === "absent" ? "vắng" : "phép"}
                          </button>
                        </td>
                      );

                    const v = score(s, c.no);
                    const t = v === null ? null : tone(v);
                    const st = reportStatusOf(rep.id, rep.status);
                    const cho = st === "pending";       // QC duyệt được
                    const nhap = st === "draft";        // giáo viên chưa nộp
                    return (
                      <td key={`s-${c.no}`} className="px-[5px] py-[5px] text-center" style={{ background: bg }}>
                        <button
                          type="button"
                          onClick={() => setOpenNote({ s, no: c.no })}
                          title={
                            cho
                              ? "Phiếu chờ bạn duyệt — bấm để xem"
                              : nhap
                                ? "Giáo viên chưa nộp phiếu"
                                : "Xem nhận xét buổi"
                          }
                          className="inline-flex min-w-[46px] items-center justify-center gap-[4px] rounded-[5px] px-[6px] py-[3px] tabular-nums"
                          style={{
                            background: t?.bg ?? "transparent",
                            color: t?.fg ?? INK3,
                            fontWeight: v === null ? 400 : 600,
                            /* viền chấm CHỈ cho phiếu QC duyệt được; phiếu giáo viên
                               chưa nộp thì để mờ, không phải việc của QC */
                            outline: cho ? `1.5px dashed ${NAVY}` : undefined,
                            outlineOffset: cho ? "1px" : undefined,
                            opacity: onlyPending && !cho ? 0.24 : nhap ? 0.55 : 1,
                          }}
                        >
                          {v === null ? "NX" : v.toFixed(1)}
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
        NX = đã có phiếu nhưng chưa chấm điểm · cuộn ngang để xem các buổi sau.
      </p>
    </div>
  );
}
