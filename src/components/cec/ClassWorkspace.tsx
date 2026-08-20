import { useMemo, useState } from "react";
import type { ClassRow } from "@/data/classes";
import { STUDENTS, type Student } from "@/data/students";
import { SESSIONS, ASSIGNMENTS } from "@/data/sessions";
import { AssignDialog } from "./AssignDialog";
import { StudentProfile } from "./StudentProfile";
import {
  IconBell,
  IconCalendarCheck,
  IconChart,
  IconCheck,
  IconClipboard,
  IconUsers,
  IconWarn,
} from "./icons";

const NAVY = "#1e2d5c";
const LINE = "#e6e8ee";
const INK = "#1f2430";
const INK2 = "#6b7280";
const INK3 = "#9aa1ae";
const DANGER = "#d4342c";
const OK = "#1f6f4a";
const WARN = "#b8791c";

const TABS = [
  "Tổng quan",
  "Học sinh",
  "Lịch học",
  "Bài tập",
  "Kết quả",
  "Lịch sử",
] as const;
type Tab = (typeof TABS)[number];

/* ---------- chỉ số của lớp ---------- */

type Stats = {
  students: Student[];
  assignedTotal: number;
  submittedTotal: number;
  submitRate: number | null;
  overdue: number;
  avg: number | null;
  needAttention: Student[];
  absentTotal: number;
};

/** Học sinh cần chú ý: điểm dưới 5, hoặc còn ≥3 bài chưa nộp, hoặc vắng ≥2 buổi */
const isAtRisk = (s: Student) =>
  (s.avg !== null && s.avg < 5) || s.assigned - s.submitted >= 3 || s.absent >= 2;

function useStats(row: ClassRow): Stats {
  return useMemo(() => {
    const students = STUDENTS[row.id] ?? [];
    const assignedTotal = students.reduce((a, s) => a + s.assigned, 0);
    const submittedTotal = students.reduce((a, s) => a + s.submitted, 0);
    const scored = students.filter((s) => s.avg !== null);
    return {
      students,
      assignedTotal,
      submittedTotal,
      submitRate: assignedTotal ? submittedTotal / assignedTotal : null,
      overdue: assignedTotal - submittedTotal,
      avg: scored.length
        ? Math.round((scored.reduce((a, s) => a + (s.avg ?? 0), 0) / scored.length) * 10) / 10
        : null,
      needAttention: students.filter(isAtRisk),
      absentTotal: students.reduce((a, s) => a + s.absent, 0),
    };
  }, [row.id]);
}

/* ---------- mảnh dùng lại ---------- */

function StatCard({
  label,
  value,
  sub,
  tone = "ink",
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: "ink" | "danger" | "warn" | "ok";
}) {
  const color = { ink: INK, danger: DANGER, warn: WARN, ok: OK }[tone];
  return (
    <div
      className="flex min-w-0 flex-1 flex-col gap-[3px] rounded-[8px] bg-white px-[16px] py-[13px]"
      style={{ border: `1px solid ${LINE}` }}
    >
      <span className="text-[12px]" style={{ color: INK2 }}>
        {label}
      </span>
      <span className="text-[22px] font-bold leading-[26px]" style={{ color }}>
        {value}
      </span>
      {sub && (
        <span className="truncate text-[11.5px]" style={{ color: INK3 }}>
          {sub}
        </span>
      )}
    </div>
  );
}

function Bar({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  const tone = pct >= 85 ? OK : pct >= 65 ? WARN : DANGER;
  return (
    <span className="inline-flex w-[74px] items-center gap-[6px]">
      <span
        className="h-[5px] flex-1 overflow-hidden rounded-full"
        style={{ background: "#eef1f5" }}
      >
        <span
          className="block h-full rounded-full"
          style={{ width: `${pct}%`, background: tone }}
        />
      </span>
      <span className="text-[11.5px] tabular-nums" style={{ color: INK2 }}>
        {pct}%
      </span>
    </span>
  );
}

/* ---------- tab Tổng quan ---------- */

function TabOverview({ row, stats }: { row: ClassRow; stats: Stats }) {
  const issues = row.issues ?? [];
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex gap-[12px]">
        <StatCard
          label="Tiến độ giao bài"
          value={`${stats.assignedTotal} bài`}
          sub={`cho ${stats.students.length} học sinh`}
        />
        <StatCard
          label="Tỉ lệ nộp"
          value={
            stats.submitRate === null
              ? "—"
              : `${stats.submittedTotal}/${stats.assignedTotal}`
          }
          sub={
            stats.submitRate === null
              ? "chưa giao bài"
              : `${Math.round(stats.submitRate * 100)}% đã nộp`
          }
          tone={
            stats.submitRate === null
              ? "ink"
              : stats.submitRate >= 0.85
                ? "ok"
                : stats.submitRate >= 0.65
                  ? "warn"
                  : "danger"
          }
        />
        <StatCard
          label="Chưa nộp"
          value={stats.overdue ? `${stats.overdue} bài` : "0"}
          sub={stats.overdue ? "cần nhắc học sinh" : "không còn bài tồn"}
          tone={stats.overdue ? "danger" : "ok"}
        />
        <StatCard
          label="Điểm trung bình"
          value={stats.avg === null ? "—" : `${stats.avg}`}
          sub={stats.avg === null ? "chưa có bài chấm" : "trên thang 10"}
          tone={stats.avg === null ? "ink" : stats.avg >= 7 ? "ok" : "warn"}
        />
        <StatCard
          label="Cần chú ý"
          value={`${stats.needAttention.length} em`}
          sub={stats.needAttention.length ? "điểm thấp / nợ bài / vắng" : "cả lớp ổn"}
          tone={stats.needAttention.length ? "warn" : "ok"}
        />
      </div>

      <div className="flex gap-[16px]">
        <section
          className="flex min-w-0 flex-1 flex-col rounded-[8px] bg-white"
          style={{ border: `1px solid ${LINE}` }}
        >
          <header
            className="flex items-center gap-[8px] px-[16px] py-[12px] text-[13px] font-semibold"
            style={{ borderBottom: `1px solid ${LINE}` }}
          >
            <IconWarn size={15} />
            Việc cần xử lý
          </header>

          {issues.length === 0 ? (
            <p
              className="flex items-center gap-[7px] px-[16px] py-[18px] text-[13px]"
              style={{ color: OK }}
            >
              <IconCheck size={15} />
              Lớp không có việc cần xử lý.
            </p>
          ) : (
            <ul className="flex flex-col">
              {issues.map((it) => (
                <li
                  key={it.title}
                  className="flex items-center gap-[12px] px-[16px] py-[11px]"
                  style={{ borderBottom: `1px solid #f1f3f7` }}
                >
                  <span
                    className="h-[6px] w-[6px] shrink-0 rounded-full"
                    style={{ background: DANGER }}
                  />
                  <span className="min-w-0 flex-1 truncate text-[13px]">{it.title}</span>
                  <button
                    type="button"
                    className="shrink-0 rounded-[6px] px-[11px] py-[6px] text-[12.5px] font-semibold"
                    style={{ border: `1px solid ${LINE}`, color: NAVY }}
                  >
                    {it.action} ›
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section
          className="flex w-[300px] shrink-0 flex-col rounded-[8px] bg-white"
          style={{ border: `1px solid ${LINE}` }}
        >
          <header
            className="px-[16px] py-[12px] text-[13px] font-semibold"
            style={{ borderBottom: `1px solid ${LINE}` }}
          >
            Thông tin lớp
          </header>
          <dl className="flex flex-col gap-[10px] px-[16px] py-[13px] text-[12.5px]">
            {[
              ["Giáo viên", row.teacher ?? "Chưa gán"],
              ["QC phụ trách", row.qc ?? "Chưa gán"],
              ["EC", row.ec ?? "Chưa gán"],
              ["Cơ sở", row.campus],
              ["Lịch học", row.schedule ?? "Chưa xếp lịch"],
              ["Thời gian", `${row.start} – ${row.end}`],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-[10px]">
                <dt className="w-[92px] shrink-0" style={{ color: INK2 }}>
                  {k}
                </dt>
                <dd
                  className="min-w-0 flex-1 whitespace-pre-line"
                  style={{
                    color: v === "Chưa gán" || v === "Chưa xếp lịch" ? INK3 : INK,
                    fontStyle: v === "Chưa gán" || v === "Chưa xếp lịch" ? "italic" : undefined,
                  }}
                >
                  {String(v).replace(" / ", "\n")}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  );
}

/* ---------- tab Học sinh ---------- */

function TabStudents({
  stats,
  onOpenStudent,
}: {
  stats: Stats;
  onOpenStudent: (s: Student) => void;
}) {
  const [onlyRisk, setOnlyRisk] = useState(false);
  const list = onlyRisk ? stats.needAttention : stats.students;

  if (stats.students.length === 0)
    return (
      <p className="py-[40px] text-center text-[13px]" style={{ color: INK3 }}>
        Lớp chưa có học sinh.
      </p>
    );

  return (
    <div className="flex flex-col gap-[12px]">
      <div className="flex items-center gap-[10px] text-[12.5px]">
        <button
          type="button"
          onClick={() => setOnlyRisk((v) => !v)}
          className="flex items-center gap-[7px] rounded-[6px] px-[11px] py-[7px] font-medium"
          style={{
            border: `1px solid ${onlyRisk ? WARN : LINE}`,
            background: onlyRisk ? "#fdf3e7" : "#fff",
            color: onlyRisk ? WARN : INK,
          }}
        >
          <IconWarn size={14} />
          Chỉ xem em cần chú ý ({stats.needAttention.length})
        </button>
        <span style={{ color: INK3 }}>
          Hiển thị {list.length}/{stats.students.length} học sinh
        </span>
      </div>

      <div className="overflow-x-auto rounded-[8px] bg-white" style={{ border: `1px solid ${LINE}` }}>
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr style={{ background: NAVY, color: "#fff" }}>
              {[
                "Học sinh",
                "Số điện thoại",
                "Bài đã nộp",
                "Điểm TB",
                "Vắng",
                "Ghi chú của QC",
                "Phản hồi phụ huynh",
                "",
              ].map((h) => (
                <th
                  key={h}
                  className="whitespace-nowrap px-[12px] py-[10px] text-left text-[12.5px] font-semibold"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {list.map((s, i) => {
              const risk = isAtRisk(s);
              const rate = s.assigned ? s.submitted / s.assigned : 0;
              return (
                <tr
                  key={s.id}
                  style={{
                    background: i % 2 ? "#f5f8fc" : "#fff",
                    borderLeft: `3px solid ${risk ? WARN : "transparent"}`,
                    borderBottom: `1px solid #edeff4`,
                  }}
                >
                  <td className="px-[12px] py-[10px]">
                    <button
                      type="button"
                      onClick={() => onOpenStudent(s)}
                      className="font-medium hover:underline"
                      style={{ color: NAVY }}
                    >
                      {s.name}
                    </button>
                    <span className="ml-[7px] text-[11.5px]" style={{ color: INK3 }}>
                      {s.code}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-[12px] tabular-nums" style={{ color: INK2 }}>
                    {s.phone}
                  </td>
                  <td className="whitespace-nowrap px-[12px]">
                    <span className="mr-[8px] tabular-nums">
                      {s.submitted}/{s.assigned}
                    </span>
                    <Bar value={rate} />
                  </td>
                  <td
                    className="whitespace-nowrap px-[12px] font-semibold tabular-nums"
                    style={{
                      color: s.avg === null ? INK3 : s.avg < 5 ? DANGER : s.avg >= 7 ? OK : WARN,
                    }}
                  >
                    {s.avg === null ? "—" : s.avg}
                  </td>
                  <td
                    className="whitespace-nowrap px-[12px] tabular-nums"
                    style={{ color: s.absent >= 2 ? WARN : INK2 }}
                  >
                    {s.absent ? `${s.absent} buổi` : "—"}
                  </td>
                  <td className="max-w-[210px] px-[12px]" style={{ color: s.note ? INK : INK3 }}>
                    <span className="line-clamp-2">{s.note || "—"}</span>
                  </td>
                  <td
                    className="max-w-[210px] px-[12px]"
                    style={{ color: s.parentFeedback ? INK : INK3 }}
                  >
                    <span className="line-clamp-2">{s.parentFeedback || "—"}</span>
                  </td>
                  <td className="whitespace-nowrap px-[12px] py-[8px]">
                    <button
                      type="button"
                      className="rounded-[6px] px-[10px] py-[5px] text-[12px] font-semibold"
                      style={{ border: `1px solid ${LINE}`, color: NAVY }}
                    >
                      Giao bài
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- tab Lịch học ---------- */

function Dot({ on }: { on: boolean | null }) {
  if (on === null) return <span style={{ color: INK3 }}>—</span>;
  return (
    <span
      className="inline-block h-[9px] w-[9px] rounded-full align-middle"
      style={{ background: on ? "#0fa958" : "#c4c4c4" }}
      title={on ? "Đã xong" : "Chưa làm"}
    />
  );
}

function TabSessions({ row }: { row: ClassRow }) {
  const list = SESSIONS[row.id] ?? [];
  if (list.length === 0)
    return (
      <p className="py-[40px] text-center text-[13px]" style={{ color: INK3 }}>
        Lớp chưa xếp lịch học.
      </p>
    );

  const done = list.filter((s) => s.past);
  const missing = done.filter((s) => !s.homework).length;

  return (
    <div className="flex flex-col gap-[12px]">
      <div className="flex flex-wrap items-center gap-x-[10px] gap-y-[6px] text-[12.5px]">
        {missing > 0 ? (
          <span style={{ color: DANGER, fontWeight: 600 }}>
            {missing} buổi đã dạy mà chưa giao bài
          </span>
        ) : (
          <span style={{ color: OK }}>Mọi buổi đã dạy đều đã giao bài</span>
        )}
        <span style={{ color: INK3 }}>
          · Báo cáo buổi và điểm danh là việc của giáo viên — xem ở màn Lớp học trong ngày
        </span>
      </div>

      <div className="overflow-x-auto rounded-[8px] bg-white" style={{ border: `1px solid ${LINE}` }}>
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr style={{ background: NAVY, color: "#fff" }}>
              {["Buổi", "Ngày", "Giờ", "Phòng", "Giáo viên", "Trợ giảng", "Đã giao bài", ""].map((h, i) => (
                <th key={i} className="whitespace-nowrap px-[12px] py-[10px] text-left text-[12.5px] font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {list.map((s, i) => (
              <tr
                key={s.no}
                style={{
                  background: i % 2 ? "#f5f8fc" : "#fff",
                  borderLeft: `3px solid ${s.past && !s.homework ? DANGER : "transparent"}`,
                  borderBottom: "1px solid #edeff4",
                  opacity: s.past ? 1 : 0.62,
                }}
              >
                <td className="px-[12px] py-[10px] font-medium tabular-nums">{s.no}</td>
                <td className="whitespace-nowrap px-[12px] tabular-nums" style={{ color: INK2 }}>
                  {s.day} · {s.date}
                </td>
                <td className="whitespace-nowrap px-[12px] tabular-nums" style={{ color: INK2 }}>
                  {s.time}
                </td>
                <td className="px-[12px]" style={{ color: INK2 }}>{s.room}</td>
                <td className="whitespace-nowrap px-[12px]">{s.teacher}</td>
                <td className="whitespace-nowrap px-[12px]" style={{ color: s.ta ? INK : INK3 }}>
                  {s.ta ?? "—"}
                </td>
                <td className="px-[12px]"><Dot on={s.homework} /></td>
                <td className="whitespace-nowrap px-[12px] py-[8px]">
                  {s.past && !s.homework && (
                    <button
                      type="button"
                      className="rounded-[6px] px-[10px] py-[5px] text-[12px] font-semibold"
                      style={{ border: `1px solid ${LINE}`, color: NAVY }}
                    >
                      Giao bài
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- tab Bài tập ---------- */

function TabAssignments({ row }: { row: ClassRow }) {
  const list = ASSIGNMENTS[row.id] ?? [];
  const students = STUDENTS[row.id] ?? [];

  if (list.length === 0)
    return (
      <div
        className="flex flex-col items-center gap-[10px] rounded-[8px] bg-white py-[50px]"
        style={{ border: `1px solid ${LINE}` }}
      >
        <span className="text-[13px]" style={{ color: INK2 }}>Lớp chưa được giao bài nào.</span>
        <button
          type="button"
          className="rounded-[6px] px-[13px] py-[8px] text-[12.5px] font-semibold text-white"
          style={{ background: NAVY }}
        >
          Giao bài cho lớp
        </button>
      </div>
    );

  return (
    <div className="flex flex-col gap-[10px]">
      {list.map((a) => {
        const missing = a.total - a.submitted;
        const ungraded = a.submitted - a.graded;
        const late = students.slice(0, missing).map((s) => s.name);
        return (
          <div key={a.id} className="rounded-[8px] bg-white px-[16px] py-[13px]" style={{ border: `1px solid ${LINE}` }}>
            <div className="flex flex-wrap items-center gap-[12px]">
              <span className="text-[13.5px] font-semibold">{a.title}</span>
              <span className="text-[12px]" style={{ color: INK3 }}>
                Buổi {a.session} · giao {a.assigned} · hạn {a.due}
              </span>
              <span className="flex-1" />
              <span className="text-[12.5px] tabular-nums">{a.submitted}/{a.total} nộp</span>
              <Bar value={a.total ? a.submitted / a.total : 0} />
              {a.avg !== null && (
                <span className="text-[12.5px] font-semibold tabular-nums" style={{ color: a.avg >= 7 ? OK : WARN }}>
                  TB {a.avg}
                </span>
              )}
            </div>

            {(missing > 0 || ungraded > 0) && (
              <div className="mt-[10px] flex flex-wrap items-center gap-[10px] pt-[10px]" style={{ borderTop: "1px solid #f1f3f7" }}>
                {missing > 0 && (
                  <>
                    <span className="shrink-0 text-[12.5px]" style={{ color: DANGER }}>{missing} em chưa nộp</span>
                    <span className="min-w-0 flex-1 truncate text-[12px]" style={{ color: INK2 }}>{late.join(" · ")}</span>
                    <button
                      type="button"
                      className="shrink-0 rounded-[6px] px-[10px] py-[5px] text-[12px] font-semibold"
                      style={{ border: `1px solid ${LINE}`, color: NAVY }}
                    >
                      Nhắc {missing} em
                    </button>
                  </>
                )}
                {ungraded > 0 && (
                  <>
                    {missing === 0 && <span className="flex-1" />}
                    <span className="shrink-0 text-[12.5px]" style={{ color: WARN }}>{ungraded} bài chờ chấm</span>
                    <button
                      type="button"
                      className="shrink-0 rounded-[6px] px-[10px] py-[5px] text-[12px] font-semibold text-white"
                      style={{ background: NAVY }}
                    >
                      Chấm bài
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ---------- tab Kết quả ---------- */

function TabResults({ row, stats }: { row: ClassRow; stats: Stats }) {
  const list = ASSIGNMENTS[row.id] ?? [];
  if (list.length === 0 || stats.students.length === 0)
    return (
      <p className="py-[40px] text-center text-[13px]" style={{ color: INK3 }}>
        Chưa có bài nào được chấm.
      </p>
    );

  const cell = (s: Student, i: number) => {
    if (s.avg === null || i >= s.submitted) return null;
    const base = list[i].avg ?? s.avg;
    const v = Math.max(2, Math.min(10, (s.avg * 2 + base) / 3 + ((i % 3) - 1) * 0.4));
    return Math.round(v * 10) / 10;
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex items-center gap-[16px] text-[12px]" style={{ color: INK2 }}>
        <span className="flex items-center gap-[6px]">
          <span className="h-[9px] w-[9px] rounded-[2px]" style={{ background: "#e6f5ec" }} /> từ 7 trở lên
        </span>
        <span className="flex items-center gap-[6px]">
          <span className="h-[9px] w-[9px] rounded-[2px]" style={{ background: "#fdf3e7" }} /> từ 5 đến dưới 7
        </span>
        <span className="flex items-center gap-[6px]">
          <span className="h-[9px] w-[9px] rounded-[2px]" style={{ background: "#fdecea" }} /> dưới 5
        </span>
        <span className="flex items-center gap-[6px]">
          <span style={{ color: INK3 }}>—</span> chưa nộp
        </span>
      </div>

      <div className="overflow-x-auto rounded-[8px] bg-white" style={{ border: `1px solid ${LINE}` }}>
        <table className="border-collapse text-[13px]">
          <thead>
            <tr style={{ background: NAVY, color: "#fff" }}>
              <th
                className="sticky left-0 z-[2] whitespace-nowrap px-[12px] py-[10px] text-left text-[12.5px] font-semibold"
                style={{ background: NAVY, minWidth: 190 }}
              >
                Học sinh
              </th>
              {list.map((a) => (
                <th
                  key={a.id}
                  className="whitespace-nowrap px-[10px] py-[10px] text-center text-[12px] font-semibold"
                  title={a.title + " · buổi " + a.session}
                  style={{ minWidth: 74 }}
                >
                  B{a.session}
                </th>
              ))}
              <th className="whitespace-nowrap px-[12px] text-center text-[12.5px] font-semibold">TB</th>
            </tr>
          </thead>
          <tbody>
            {stats.students.map((s, ri) => {
              const bg = ri % 2 ? "#f5f8fc" : "#fff";
              const cells = list.map((_, i) => cell(s, i)).filter((v): v is number => v !== null);
              const rowAvg = cells.length
                ? Math.round((cells.reduce((a, v) => a + v, 0) / cells.length) * 10) / 10
                : null;
              return (
                <tr key={s.id} style={{ background: bg, borderBottom: "1px solid #edeff4" }}>
                  <td
                    className="sticky left-0 z-[1] whitespace-nowrap px-[12px] py-[9px]"
                    style={{ background: bg, boxShadow: "1px 0 0 #e6e8ee" }}
                  >
                    {s.name}
                  </td>
                  {list.map((a, i) => {
                    const v = cell(s, i);
                    const tone =
                      v === null
                        ? { bg: "transparent", fg: INK3 }
                        : v >= 7
                          ? { bg: "#e6f5ec", fg: OK }
                          : v >= 5
                            ? { bg: "#fdf3e7", fg: WARN }
                            : { bg: "#fdecea", fg: DANGER };
                    return (
                      <td key={a.id} className="px-[6px] py-[6px] text-center">
                        <span
                          className="inline-block min-w-[38px] rounded-[4px] py-[4px] text-[12.5px] font-medium tabular-nums"
                          style={{ background: tone.bg, color: tone.fg }}
                        >
                          {v ?? "—"}
                        </span>
                      </td>
                    );
                  })}
                  <td
                    className="px-[12px] text-center text-[12.5px] font-semibold tabular-nums"
                    style={{ color: rowAvg === null ? INK3 : rowAvg >= 7 ? OK : rowAvg >= 5 ? WARN : DANGER }}
                  >
                    {rowAvg ?? "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- tab Lịch sử ---------- */

function TabHistory({ row }: { row: ClassRow }) {
  const sessions = SESSIONS[row.id] ?? [];
  const students = STUDENTS[row.id] ?? [];

  type Item = { date: string; kind: string; text: string; tone: "ink" | "warn" | "danger" | "ok" };
  const items: Item[] = [];

  sessions
    .filter((s) => s.past && !s.homework)
    .forEach((s) =>
      items.push({
        date: s.date,
        kind: "Chưa giao bài",
        text: `Buổi ${s.no} (${s.day} ${s.time}) đã dạy xong nhưng chưa giao bài.`,
        tone: "danger",
      }),
    );

  students
    .filter((s) => s.absent > 0)
    .slice(0, 6)
    .forEach((s, i) =>
      items.push({
        date: sessions[Math.min(i * 2, Math.max(0, sessions.length - 1))]?.date ?? row.start,
        kind: "Vắng học",
        text: `${s.name} vắng ${s.absent} buổi` + (s.absent >= 2 ? " — cần xếp lớp bù." : "."),
        tone: s.absent >= 2 ? "warn" : "ink",
      }),
    );

  students
    .filter((s) => s.parentFeedback)
    .slice(0, 4)
    .forEach((s, i) =>
      items.push({
        date: sessions[Math.min(i * 3, Math.max(0, sessions.length - 1))]?.date ?? row.start,
        kind: "Trao đổi phụ huynh",
        text: `${s.name}: ${s.parentFeedback}`,
        tone: "ok",
      }),
    );

  if (items.length === 0)
    return (
      <p className="py-[40px] text-center text-[13px]" style={{ color: INK3 }}>
        Chưa có ghi nhận nào cho lớp này.
      </p>
    );

  // sắp theo thời gian, mới nhất lên đầu
  const key = (d: string) => {
    const [dd, mm, yy] = d.split("/");
    return Number(yy) * 10000 + Number(mm) * 100 + Number(dd);
  };
  items.sort((a, b) => key(b.date) - key(a.date));

  const color = { ink: INK2, warn: WARN, danger: DANGER, ok: OK };

  return (
    <div className="rounded-[8px] bg-white px-[18px] py-[14px]" style={{ border: `1px solid ${LINE}` }}>
      <ol className="flex flex-col">
        {items.map((it, i) => (
          <li key={i} className="flex gap-[14px] py-[9px]">
            <span className="w-[74px] shrink-0 text-[12px] tabular-nums" style={{ color: INK3 }}>
              {it.date}
            </span>
            <span className="relative flex shrink-0 flex-col items-center">
              <span className="mt-[5px] h-[7px] w-[7px] rounded-full" style={{ background: color[it.tone] }} />
              {i < items.length - 1 && <span className="mt-[2px] w-[1px] flex-1" style={{ background: LINE }} />}
            </span>
            <span className="min-w-0 flex-1">
              <span className="mr-[8px] text-[12px] font-semibold" style={{ color: color[it.tone] }}>
                {it.kind}
              </span>
              <span className="text-[13px]">{it.text}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---------- khung ---------- */

export function ClassWorkspace({ row, onBack }: { row: ClassRow; onBack: () => void }) {
  const [tab, setTab] = useState<Tab>("Tổng quan");
  const [assignOpen, setAssignOpen] = useState(false);
  const [openStudent, setOpenStudent] = useState<Student | null>(null);
  const stats = useStats(row);

  if (openStudent)
    return (
      <StudentProfile
        student={openStudent}
        row={row}
        onBack={() => setOpenStudent(null)}
      />
    );

  return (
    <div className="flex flex-col gap-[14px]">
      <div className="flex items-start justify-between gap-[16px]">
        <div className="flex flex-col gap-[4px]">
          <button
            type="button"
            onClick={onBack}
            className="self-start text-[12px]"
            style={{ color: INK2 }}
          >
            ‹ Quay lại danh sách lớp
          </button>
          <div className="flex items-center gap-[10px]">
            <h1 className="text-[20px] font-bold" style={{ letterSpacing: "-0.2px" }}>
              {row.code}
            </h1>
            <span
              className="rounded-[4px] px-[9px] py-[3px] text-[11.5px] font-semibold"
              style={
                row.status === "Đang diễn ra"
                  ? { background: "#e6f5ec", color: OK }
                  : { background: "#f1f2f6", color: INK2 }
              }
            >
              {row.status}
            </span>
          </div>
          <p className="text-[12px]" style={{ color: INK2 }}>
            {row.type} · {row.campus} · {stats.students.length} học sinh ·{" "}
            {row.teacher ?? "Chưa gán giáo viên"}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-[8px]">
          <button
            type="button"
            className="flex items-center gap-[7px] rounded-[6px] bg-white px-[11px] py-[8px] text-[12.5px]"
            style={{ border: `1px solid #d9dde5`, color: INK }}
          >
            <IconBell size={15} />
            Nhắc học sinh
          </button>
          <button
            type="button"
            onClick={() => setAssignOpen(true)}
            className="flex items-center gap-[7px] rounded-[6px] px-[13px] py-[8px] text-[12.5px] font-semibold text-white"
            style={{ background: NAVY }}
          >
            <IconClipboard size={15} />
            Giao bài cho lớp
          </button>
        </div>
      </div>

      <nav className="flex items-end gap-[3px]" style={{ borderBottom: `1px solid ${LINE}` }}>
        {TABS.map((t) => {
          const on = t === tab;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className="-mb-px rounded-t-[6px] px-[15px] py-[9px] text-[13px]"
              style={{
                color: on ? NAVY : INK2,
                fontWeight: on ? 700 : 400,
                background: on ? "#fff" : "transparent",
                border: `1px solid ${on ? LINE : "transparent"}`,
                borderBottomColor: on ? "#fff" : "transparent",
              }}
            >
              {t}
            </button>
          );
        })}
      </nav>

      {tab === "Tổng quan" && <TabOverview row={row} stats={stats} />}
      {tab === "Học sinh" && <TabStudents stats={stats} onOpenStudent={setOpenStudent} />}
      {tab === "Lịch học" && <TabSessions row={row} />}
      {tab === "Bài tập" && <TabAssignments row={row} />}
      {tab === "Kết quả" && <TabResults row={row} stats={stats} />}
      {tab === "Lịch sử" && <TabHistory row={row} />}

      {assignOpen && <AssignDialog from={row} onClose={() => setAssignOpen(false)} />}
    </div>
  );
}
