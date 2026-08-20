import { useMemo, useState } from "react";
import type { ClassRow } from "@/data/classes";
import type { Student } from "@/data/students";
import { topicVi } from "@/data/topics";
import {
  PROFILES,
  type DailyPoint,
  type ErrorGroup,
  type HistoryItem,
  type InProgress,
  type Profile,
} from "@/data/studentProfile";
import {
  IconBell,
  IconChevronLeft,
  IconCheck,
  IconClipboard,
  IconClock,
  IconPause,
  IconWarn,
} from "./icons";

const NAVY = "#1e2d5c";
const LINE = "#e6e8ee";
const INK = "#1f2430";
const INK2 = "#6b7280";
const INK3 = "#6a7386";
const DANGER = "#d4342c";
const OK = "#1f6f4a";
const WARN = "#b8791c";

const AV = ["#2b3f7a", "#1f6f4a", "#8a5a10", "#6b2fa0", "#136d5e", "#a03c3c"];

/** điểm quy về thang 10 */
const to10 = (h: HistoryItem) => (h.score / h.max) * 10;

/** màu theo mức điểm — dùng chung cả trang cho nhất quán */
function scoreTone(v: number) {
  if (v >= 8) return { fg: OK, bg: "#e6f5ec" };
  if (v >= 6.5) return { fg: "#2b3f7a", bg: "#eaf1fb" };
  if (v >= 5) return { fg: WARN, bg: "#fdf3e7" };
  return { fg: DANGER, bg: "#fdecea" };
}

const dnum = (d: string) => d.split("/").reverse().join("");

/** mốc thời gian của dữ liệu mẫu */
const TODAY = new Date(2026, 7, 20);

/* ---------------- các mảnh nhỏ ---------------- */

function Avatar({ name, size = 48 }: { name: string; size?: number }) {
  const parts = name.trim().split(/\s+/);
  const initials = ((parts[0]?.[0] ?? "") + (parts.at(-1)?.[0] ?? "")).toUpperCase();
  const bg = AV[[...name].reduce((a, c) => a + c.charCodeAt(0), 0) % AV.length];
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full font-semibold text-white"
      style={{ width: size, height: size, background: bg, fontSize: size * 0.36 }}
    >
      {initials}
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: string;
}) {
  return (
    <div
      className="flex flex-col gap-1 rounded-lg bg-white px-4 py-3"
      style={{ border: `1px solid ${LINE}` }}
    >
      <span className="text-[11px] uppercase tracking-wide" style={{ color: INK3 }}>
        {label}
      </span>
      <span
        className="text-[22px] font-semibold leading-none"
        style={{ color: tone ?? INK, fontVariantNumeric: "tabular-nums" }}
      >
        {value}
      </span>
      {sub && (
        <span className="text-[12px]" style={{ color: INK2 }}>
          {sub}
        </span>
      )}
    </div>
  );
}

/** đường xu hướng điểm — cũ nhất bên trái */
function Trend({ items }: { items: HistoryItem[] }) {
  const pts = useMemo(
    () => [...items].sort((a, b) => (dnum(a.assignedAt) > dnum(b.assignedAt) ? 1 : -1)),
    [items],
  );
  if (pts.length < 2)
    return (
      <div
        className="flex h-[120px] items-center justify-center rounded-lg text-[13px]"
        style={{ border: `1px dashed ${LINE}`, color: INK3 }}
      >
        Cần ít nhất 2 bài đã chấm mới vẽ được xu hướng
      </div>
    );

  const W = 560;
  const H = 120;
  const PAD = 18;
  const xs = (i: number) => PAD + (i * (W - PAD * 2)) / (pts.length - 1);
  const ys = (v: number) => H - PAD - (v / 10) * (H - PAD * 2);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${xs(i)},${ys(to10(p))}`).join(" ");
  const area = `${line} L${xs(pts.length - 1)},${H - PAD} L${xs(0)},${H - PAD} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-[120px] w-full" role="img" aria-label="Xu hướng điểm">
      {[0, 5, 10].map((g) => (
        <line key={g} x1={PAD} x2={W - PAD} y1={ys(g)} y2={ys(g)} stroke={LINE} strokeWidth={1} />
      ))}
      <path d={area} fill="rgba(30,45,92,0.08)" />
      <path d={line} fill="none" stroke={NAVY} strokeWidth={2} strokeLinejoin="round" />
      {pts.map((p, i) => {
        const v = to10(p);
        const last = i === pts.length - 1;
        return (
          <circle
            key={p.id}
            cx={xs(i)}
            cy={ys(v)}
            r={last ? 5 : 3.5}
            fill={last ? scoreTone(v).fg : "#ffffff"}
            stroke={last ? scoreTone(v).fg : NAVY}
            strokeWidth={2}
          />
        );
      })}
    </svg>
  );
}

/** màu cố định cho từng chủ điểm — donut và bảng chú giải phải khớp nhau */
const TOPIC_COLOR = [
  "#2b3f7a", "#1f6f4a", "#b8791c", "#6b2fa0", "#136d5e",
  "#a03c3c", "#3b6bd6", "#0fa958", "#d4342c", "#8a5a10",
];

/** vòng tròn tỉ lệ câu theo chủ điểm — lát to = làm nhiều câu chủ điểm đó */
function Donut({ errors, size = 168 }: { errors: ErrorGroup[]; size?: number }) {
  const total = errors.reduce((a, e) => a + e.total, 0);
  const r = size / 2 - 14;
  const C = 2 * Math.PI * r;
  let acc = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Tỉ lệ câu theo chủ điểm">
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        {errors.map((e, i) => {
          const frac = e.total / total;
          const el = (
            <circle
              key={e.topic}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={TOPIC_COLOR[i % TOPIC_COLOR.length]}
              strokeWidth={16}
              strokeDasharray={`${C * frac} ${C}`}
              strokeDashoffset={-C * acc}
            />
          );
          acc += frac;
          return el;
        })}
      </g>
      <text
        x="50%"
        y="47%"
        textAnchor="middle"
        style={{ fontSize: 26, fontWeight: 600, fill: INK, fontVariantNumeric: "tabular-nums" }}
      >
        {total}
      </text>
      <text x="50%" y="62%" textAnchor="middle" style={{ fontSize: 11, fill: INK3 }}>
        câu đã làm
      </text>
    </svg>
  );
}

/** nhóm lỗi hay gặp — xếp theo tỉ lệ sai giảm dần */
function ErrorGroups({ errors }: { errors: ErrorGroup[] }) {
  if (!errors.length)
    return (
      <p className="text-[13px]" style={{ color: INK3 }}>
        Chưa có bài nào đã chấm nên chưa phân tích được.
      </p>
    );
  return (
    <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-start">
      <Donut errors={errors} />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-center gap-2 pb-1 text-[11px] uppercase tracking-wide" style={{ color: INK3 }}>
          <span className="min-w-0 flex-1">Chủ điểm</span>
          <span className="w-[86px] text-right">Tỉ lệ sai</span>
          <span className="w-[104px] text-right">So tháng trước</span>
        </div>
        {errors.map((e, i) => {
          const tone = e.rate >= 40 ? DANGER : e.rate >= 20 ? WARN : OK;
          const delta = e.rate - e.prevRate;
          return (
            <div key={e.topic} className="flex items-center gap-2 text-[13px]">
              <span
                className="h-[10px] w-[10px] shrink-0 rounded-[2px]"
                style={{ background: TOPIC_COLOR[i % TOPIC_COLOR.length] }}
              />
              <span className="min-w-0 flex-1 truncate" style={{ color: INK }}>
                {topicVi(e.topic)}
              </span>
              <span className="w-[86px] text-right" style={{ color: tone, fontVariantNumeric: "tabular-nums" }}>
                {e.rate}%{" "}
                <span style={{ color: INK3 }}>
                  ({e.wrong}/{e.total})
                </span>
              </span>
              <span
                className="w-[104px] text-right text-[12px]"
                style={{
                  color: delta === 0 ? INK3 : delta > 0 ? DANGER : OK,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {delta === 0 ? "— không đổi" : `${delta > 0 ? "↑ sai thêm" : "↓ đỡ hơn"} ${Math.abs(delta)}%`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** nhịp độ theo ngày: cột = số câu đã làm, đường = số phút ngồi làm.
 *  Trục ngang là ngày THẬT — nghỉ 3 tuần thì phải thấy khoảng trống 3 tuần. */
function Rhythm({ daily }: { daily: DailyPoint[] }) {
  if (daily.length < 2)
    return (
      <div
        className="flex h-[150px] items-center justify-center rounded-lg text-[13px]"
        style={{ border: `1px dashed ${LINE}`, color: INK3 }}
      >
        Chưa đủ dữ liệu để vẽ nhịp độ
      </div>
    );

  const W = 560;
  const H = 150;
  const L = 26;
  const B = 26;
  const T = 10;

  const ms = (d: string) => {
    const [dd, mm, yy] = d.split("/").map(Number);
    return new Date(yy!, mm! - 1, dd!).getTime();
  };
  const t0 = ms(daily[0]!.date);
  const t1 = Math.max(ms(daily.at(-1)!.date), t0 + 86400000);
  const maxQ = Math.max(...daily.map((d) => d.questions), 1);
  const maxM = Math.max(...daily.map((d) => d.minutes), 1);

  const xs = (d: string) => L + ((ms(d) - t0) / (t1 - t0)) * (W - L - 8);
  const yq = (v: number) => H - B - (v / maxQ) * (H - B - T);
  const ym = (v: number) => H - B - (v / maxM) * (H - B - T);
  const bw = Math.min(14, Math.max(3, (W - L - 8) / (daily.length * 2)));
  const line = daily.map((d, i) => `${i ? "L" : "M"}${xs(d.date)},${ym(d.minutes)}`).join(" ");

  /* mốc ngày: đầu, giữa, cuối — đủ định vị mà không chen chữ */
  const marks = [daily[0]!, daily[Math.floor(daily.length / 2)]!, daily.at(-1)!];

  return (
    <>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-[150px] w-full" role="img" aria-label="Nhịp độ làm bài theo ngày">
        <line x1={L} x2={W - 8} y1={H - B} y2={H - B} stroke={LINE} strokeWidth={1} />
        <text x={L - 6} y={yq(maxQ) + 4} textAnchor="end" style={{ fontSize: 10, fill: INK3 }}>
          {maxQ}
        </text>
        {daily.map((d) => {
          const h = H - B - yq(d.questions);
          return (
            <rect
              key={d.date}
              x={xs(d.date) - bw / 2}
              y={yq(d.questions)}
              width={bw}
              height={Math.max(h, 1)}
              rx={2}
              fill="#7fb98f"
            />
          );
        })}
        <path d={line} fill="none" stroke={NAVY} strokeWidth={1.8} strokeLinejoin="round" />
        {daily.map((d) => (
          <circle key={d.date} cx={xs(d.date)} cy={ym(d.minutes)} r={2.6} fill="#ffffff" stroke={NAVY} strokeWidth={1.6} />
        ))}
        {marks.map((d, i) => (
          <text
            key={`${d.date}-${i}`}
            x={Math.min(W - 20, Math.max(L, xs(d.date)))}
            y={H - 8}
            textAnchor={i === 0 ? "start" : i === 2 ? "end" : "middle"}
            style={{ fontSize: 10, fill: INK3 }}
          >
            {d.date.slice(0, 5)}
          </text>
        ))}
      </svg>
      <div className="flex items-center gap-4 pt-1 text-[12px]" style={{ color: INK2 }}>
        <span className="flex items-center gap-1.5">
          <span className="h-[10px] w-[10px] rounded-[2px]" style={{ background: "#7fb98f" }} /> Số câu đã làm
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-[2px] w-[14px]" style={{ background: NAVY }} /> Số phút ngồi làm
        </span>
      </div>
    </>
  );
}

/** bài em đã mở nhưng bỏ giữa chừng — PROD đang gộp chung với "chưa làm" */
function Unfinished({ items }: { items: InProgress[] }) {
  if (!items.length) return null;
  return (
    <section className="rounded-xl px-5 py-4" style={{ background: "#fdf8ef", border: "1px solid #f0dfc0" }}>
      <h2 className="mb-1 flex items-center gap-2 text-[15px] font-semibold" style={{ color: "#7a5410" }}>
        <IconPause size={15} /> Bài em mở rồi bỏ giữa chừng
      </h2>
      <p className="mb-3 text-[12px]" style={{ color: INK2 }}>
        Khác hẳn “chưa làm” — em đã vào bài nhưng dừng lại. Thường là gặp câu khó hoặc mất mạng.
      </p>
      <div className="flex flex-col gap-2">
        {items.map((q) => (
          <div
            key={q.id}
            className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg bg-white px-3 py-2"
            style={{ border: `1px solid ${LINE}` }}
          >
            <span className="min-w-0 flex-1 truncate text-[13px]" style={{ color: INK }}>
              {q.title}
            </span>
            <span className="rounded-full px-2 py-0.5 text-[11px]" style={{ background: "#f0f2f6", color: INK2 }}>
              {topicVi(q.topic)}
            </span>
            <span className="text-[12px]" style={{ color: INK2, fontVariantNumeric: "tabular-nums" }}>
              mở {q.openedAt}
            </span>
            <span className="flex items-center gap-1 text-[12px]" style={{ color: INK2 }}>
              <IconClock size={13} /> {q.timeSpent} phút
            </span>
            <span className="text-[12px] font-medium" style={{ color: WARN, fontVariantNumeric: "tabular-nums" }}>
              mới trả lời {q.answered}/{q.total} câu
            </span>
            <button type="button" className="text-[13px] font-medium" style={{ color: NAVY }}>
              Nhắc em làm nốt ›
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

/** một dòng lịch sử làm bài, mở ra xem từng lần thử */
function HistoryRow({ h }: { h: HistoryItem }) {
  const [open, setOpen] = useState(false);
  const v = to10(h);
  const tone = scoreTone(v);
  const multi = h.attempts.length > 1;
  return (
    <div style={{ borderTop: `1px solid ${LINE}` }}>
      <button
        type="button"
        onClick={() => multi && setOpen((o) => !o)}
        className="flex w-full items-center gap-3 px-3 py-2.5 text-left"
        style={{ cursor: multi ? "pointer" : "default" }}
      >
        <span className="w-[86px] shrink-0 text-[12px]" style={{ color: INK2, fontVariantNumeric: "tabular-nums" }}>
          {h.assignedAt}
        </span>
        <span className="min-w-0 flex-1 truncate text-[13px]" style={{ color: INK }}>
          {h.title}
        </span>
        <span
          className="shrink-0 rounded-full px-2 py-0.5 text-[11px]"
          style={{ background: "#f0f2f6", color: INK2 }}
        >
          {topicVi(h.topic)}
        </span>
        <span className="w-[64px] shrink-0 text-right text-[12px]" style={{ color: INK3 }}>
          Buổi {h.session}
        </span>
        {multi && (
          <span className="shrink-0 text-[11px]" style={{ color: NAVY }}>
            {h.attempts.length} lần {open ? "▴" : "▾"}
          </span>
        )}
        <span
          className="w-[64px] shrink-0 rounded-md py-0.5 text-center text-[13px] font-semibold"
          style={{ background: tone.bg, color: tone.fg, fontVariantNumeric: "tabular-nums" }}
        >
          {h.score}/{h.max}
        </span>
        {!h.graded && (
          <span className="shrink-0 text-[11px]" style={{ color: WARN }}>
            chờ chấm
          </span>
        )}
      </button>
      {open &&
        h.attempts.map((a) => (
          <div
            key={a.attempt}
            className="flex items-center gap-3 py-1.5 pl-[100px] pr-3 text-[12px]"
            style={{ background: "#fafbfc", color: INK2 }}
          >
            <span className="w-[70px]">Lần {a.attempt}</span>
            <span className="w-[86px]" style={{ fontVariantNumeric: "tabular-nums" }}>
              {a.at}
            </span>
            <span className="flex-1">
              làm trong {Math.floor(a.timeSpent / 60)} phút {a.timeSpent % 60}s
            </span>
            <span style={{ color: scoreTone((a.score / a.max) * 10).fg, fontVariantNumeric: "tabular-nums" }}>
              {a.score}/{a.max}
            </span>
          </div>
        ))}
    </div>
  );
}

/* ---------------- màn chính ---------------- */

export function StudentProfile({
  student,
  row,
  onBack,
}: {
  student: Student;
  row: ClassRow;
  onBack: () => void;
}) {
  const profile: Profile = PROFILES[student.id] ?? { history: [], errors: [], daily: [], inProgress: [] };
  const history = useMemo(
    () => [...profile.history].sort((a, b) => (dnum(a.assignedAt) > dnum(b.assignedAt) ? -1 : 1)),
    [profile.history],
  );

  const owed = student.assigned - student.submitted;
  const retried = history.filter((h) => h.attempts.length > 1).length;
  const worst = profile.errors[0];

  /* thời gian làm bài — cộng mọi lần thử, đơn vị phút */
  const totalMin = Math.round(
    history.reduce((a, h) => a + h.attempts.reduce((x, at) => x + at.timeSpent, 0), 0) / 60,
  );
  const avgMin = history.length ? Math.round(totalMin / history.length) : null;

  /* bao nhiêu ngày rồi em chưa đụng bài — mốc là hôm nay 20/08/2026 */
  const lastGap = useMemo(() => {
    const days = [
      ...history.flatMap((h) => h.attempts.map((a) => a.at)),
      ...profile.inProgress.map((q) => q.openedAt),
    ];
    if (!days.length) return null;
    const newest = days.sort((a, b) => (dnum(a) > dnum(b) ? -1 : 1))[0]!;
    const [d, m, y] = newest.split("/").map(Number);
    const diff = (TODAY.getTime() - new Date(y!, m! - 1, d!).getTime()) / 86400000;
    return Math.max(0, Math.round(diff));
  }, [history, profile.inProgress]);

  /* em làm nhanh bất thường: dưới 20 giây/câu thì nhiều khả năng đoán bừa */
  const rushed = history.filter((h) => {
    const a = h.attempts.at(-1);
    return a && a.timeSpent / a.max < 20;
  });

  /* việc QC nên làm với em này — suy từ chính số liệu ở trên, không bịa thêm */
  const todos: { tone: string; text: string; action: string }[] = [];
  if (owed > 0)
    todos.push({
      tone: DANGER,
      text: `Còn ${owed} bài chưa nộp`,
      action: "Nhắc nộp bài",
    });
  if (student.avg !== null && student.avg < 5)
    todos.push({
      tone: DANGER,
      text: `Điểm trung bình ${student.avg} — dưới ngưỡng 5`,
      action: "Báo phụ huynh",
    });
  if (student.absent >= 2)
    todos.push({
      tone: WARN,
      text: `Vắng ${student.absent} buổi`,
      action: "Gọi phụ huynh",
    });
  if (lastGap !== null && lastGap >= 14)
    todos.push({
      tone: DANGER,
      text: `${lastGap} ngày rồi em chưa đụng bài nào`,
      action: "Gọi phụ huynh",
    });
  if (rushed.length >= 2)
    todos.push({
      tone: WARN,
      text: `${rushed.length} bài em làm dưới 20 giây/câu — nhiều khả năng bấm bừa`,
      action: "Xem lại bài",
    });
  if (worst && worst.rate >= 40)
    todos.push({
      tone: WARN,
      text: `Yếu rõ ở ${topicVi(worst.topic)} — sai ${worst.rate}% và đang ${worst.trend}`,
      action: "Giao bài luyện thêm",
    });

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4">
      {/* thanh quay lại */}
      <button
        type="button"
        onClick={onBack}
        className="flex w-fit items-center gap-1 text-[13px]"
        style={{ color: NAVY }}
      >
        <IconChevronLeft size={15} /> Về lớp {row.code}
      </button>

      {/* đầu trang */}
      <div
        className="flex items-start gap-4 rounded-xl bg-white px-5 py-4"
        style={{ border: `1px solid ${LINE}` }}
      >
        <Avatar name={student.name} />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h1 className="truncate text-[20px] font-semibold leading-tight" style={{ color: INK }}>
            {student.name}
          </h1>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px]" style={{ color: INK2 }}>
            <span style={{ fontVariantNumeric: "tabular-nums" }}>{student.code}</span>
            <span style={{ color: LINE }}>|</span>
            <span>Lớp {row.code}</span>
            <span style={{ color: LINE }}>|</span>
            <span style={{ fontVariantNumeric: "tabular-nums" }}>{student.phone}</span>
            {row.teacher && (
              <>
                <span style={{ color: LINE }}>|</span>
                <span>GV {row.teacher}</span>
              </>
            )}
          </div>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px]"
            style={{ border: `1px solid ${LINE}`, color: INK, background: "#fff" }}
          >
            <IconBell size={14} /> Nhắc nộp bài
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] font-medium text-white"
            style={{ background: NAVY }}
          >
            <IconClipboard size={14} /> Giao bài riêng
          </button>
        </div>
      </div>

      {/* số liệu */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <Stat
          label="Điểm trung bình"
          value={student.avg === null ? "—" : String(student.avg)}
          sub={student.avg === null ? "chưa có bài chấm" : `trung bình ${history.length} bài online`}
          tone={student.avg === null ? INK3 : scoreTone(student.avg).fg}
        />
        <Stat
          label="Đã nộp"
          value={`${student.submitted}/${student.assigned}`}
          sub={owed > 0 ? `còn nợ ${owed} bài` : "nộp đủ"}
          tone={owed > 0 ? DANGER : OK}
        />
        <Stat label="Vắng" value={String(student.absent)} sub="buổi" tone={student.absent >= 2 ? WARN : INK} />
        <Stat
          label="Thời gian làm bài"
          value={totalMin >= 60 ? `${Math.floor(totalMin / 60)}g ${totalMin % 60}p` : `${totalMin}p`}
          sub={avgMin === null ? "chưa có" : `trung bình ${avgMin} phút/bài`}
        />
        <Stat
          label="Làm bài gần nhất"
          value={lastGap === null ? "—" : lastGap === 0 ? "hôm nay" : `${lastGap} ngày trước`}
          sub={lastGap !== null && lastGap >= 14 ? "đã lâu không đụng bài" : "tính theo lần nộp cuối"}
          tone={lastGap !== null && lastGap >= 14 ? DANGER : INK}
        />
        <Stat
          label="Chủ điểm yếu nhất"
          value={worst ? `${worst.rate}%` : "—"}
          sub={worst ? topicVi(worst.topic) : "chưa đủ dữ liệu"}
          tone={worst && worst.rate >= 40 ? DANGER : INK}
        />
      </div>

      {/* việc cần làm */}
      <section className="rounded-xl bg-white px-5 py-4" style={{ border: `1px solid ${LINE}` }}>
        <h2 className="mb-3 text-[15px] font-semibold" style={{ color: INK }}>
          Việc cần xử lý với em này
        </h2>
        {todos.length === 0 ? (
          <p className="flex items-center gap-2 text-[13px]" style={{ color: OK }}>
            <IconCheck size={15} /> Em đang theo kịp lớp, chưa có việc gì cần xử lý.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {todos.map((t) => (
              <li
                key={t.text}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2"
                style={{ background: "#fafbfc", border: `1px solid ${LINE}` }}
              >
                <IconWarn size={15} className="shrink-0" />
                <span className="flex-1 text-[13px]" style={{ color: INK }}>
                  {t.text}
                </span>
                <button type="button" className="shrink-0 text-[13px] font-medium" style={{ color: NAVY }}>
                  {t.action} ›
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <Unfinished items={profile.inProgress} />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {/* nhịp độ làm bài */}
        <section className="rounded-xl bg-white px-5 py-4" style={{ border: `1px solid ${LINE}` }}>
          <h2 className="mb-1 text-[15px] font-semibold" style={{ color: INK }}>
            Nhịp độ làm bài
          </h2>
          <p className="mb-3 text-[12px]" style={{ color: INK3 }}>
            Trải đều theo ngày. Khoảng trống dài = em nghỉ hẳn một quãng.
          </p>
          <Rhythm daily={profile.daily} />
        </section>

        {/* xu hướng */}
        <section className="rounded-xl bg-white px-5 py-4" style={{ border: `1px solid ${LINE}` }}>
          <h2 className="mb-1 text-[15px] font-semibold" style={{ color: INK }}>
            Xu hướng điểm
          </h2>
          <p className="mb-3 text-[12px]" style={{ color: INK3 }}>
            Theo thứ tự ngày giao, cũ nhất bên trái. Điểm quy về thang điểm 10.
          </p>
          <Trend items={history} />
        </section>
      </div>

      {/* nhóm lỗi */}
      <section className="rounded-xl bg-white px-5 py-4" style={{ border: `1px solid ${LINE}` }}>
        <h2 className="mb-1 text-[15px] font-semibold" style={{ color: INK }}>
          Nhóm lỗi hay gặp
        </h2>
        <p className="mb-3 text-[12px]" style={{ color: INK3 }}>
          Gộp theo chủ điểm của các bài đã chấm. Cột phải so với cùng kỳ tháng trước.
        </p>
        <ErrorGroups errors={profile.errors} />
      </section>

      {/* lịch sử */}
      <section className="rounded-xl bg-white pb-1" style={{ border: `1px solid ${LINE}` }}>
        <div className="flex items-baseline justify-between px-5 pb-3 pt-4">
          <h2 className="text-[15px] font-semibold" style={{ color: INK }}>
            Lịch sử làm bài
          </h2>
          <span className="text-[12px]" style={{ color: INK3 }}>
            {history.length} bài · bấm dòng có nhiều lần để xem từng lần thử
          </span>
        </div>
        {history.length === 0 ? (
          <p className="px-5 pb-4 text-[13px]" style={{ color: INK3 }}>
            Em chưa nộp bài nào.
          </p>
        ) : (
          history.map((h) => <HistoryRow key={h.id} h={h} />)
        )}
      </section>

      {/* ghi chú */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <section className="rounded-xl bg-white px-5 py-4" style={{ border: `1px solid ${LINE}` }}>
          <h2 className="mb-2 text-[15px] font-semibold" style={{ color: INK }}>
            Ghi chú của QC
          </h2>
          <p className="text-[13px]" style={{ color: student.note ? INK : INK3 }}>
            {student.note || "Chưa có ghi chú."}
          </p>
        </section>
        <section className="rounded-xl bg-white px-5 py-4" style={{ border: `1px solid ${LINE}` }}>
          <h2 className="mb-2 text-[15px] font-semibold" style={{ color: INK }}>
            Phản hồi phụ huynh
          </h2>
          <p className="text-[13px]" style={{ color: student.parentFeedback ? INK : INK3 }}>
            {student.parentFeedback || "Chưa có phản hồi."}
          </p>
        </section>
      </div>
    </div>
  );
}
