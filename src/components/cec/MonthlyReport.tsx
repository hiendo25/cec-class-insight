import { useMemo, useState } from "react";
import { TH_BG, TH_FG, TH_LINE, NAVY, LINE, INK, INK2, INK3, OK, WARN, DANGER } from "@/data/const";
import type { ClassRow } from "@/data/classes";
import { STUDENTS, type Student } from "@/data/students";
import { PROFILES } from "@/data/studentProfile";
import {
  MONTHLY,
  REPORTS,
  type MonthlyReport as Monthly,
  type ReportStatus,
} from "@/data/reports";
import { IconCheck, IconChevronLeft, IconClipboard, IconWarn } from "./icons";
import { MonthlyBatch } from "./MonthlyBatch";
import { topicFull, topicVi } from "@/data/topics";
import { useAction } from "./ActionDialog";
import {
  markReminded,
  monthlyStatusOf,
  reportStatusOf,
  setMonthlyStatus,
  setReportStatus,
  useOverrides,
} from "@/data/overrides";


const AV = ["#2b3f7a", "#1f6f4a", "#8a5a10", "#6b2fa0", "#136d5e", "#a03c3c"];

/** nhãn trạng thái — màu theo tài liệu CEC */
const ST: Record<ReportStatus, { label: string; bg: string; fg: string }> = {
  draft: { label: "Nháp", bg: "#fdf3e7", fg: WARN },
  pending: { label: "Chờ QC duyệt", bg: "#eaf1fb", fg: "#2b3f7a" },
  approved: { label: "Đã duyệt", bg: "#e6f5ec", fg: OK },
};

const mLabel = (m: string) => {
  const [mm, yy] = m.split("/");
  return `Tháng ${mm}/${yy}`;
};
const mNum = (m: string) => {
  const [mm, yy] = m.split("/");
  return +yy! * 100 + +mm!;
};

function Avatar({ name, size = 34 }: { name: string; size?: number }) {
  const p = name.trim().split(/\s+/);
  const ini = ((p[0]?.[0] ?? "") + (p.at(-1)?.[0] ?? "")).toUpperCase();
  const bg = AV[[...name].reduce((a, c) => a + c.charCodeAt(0), 0) % AV.length];
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full font-semibold text-white"
      style={{ width: size, height: size, background: bg, fontSize: size * 0.38 }}
    >
      {ini}
    </div>
  );
}

function Badge({ status }: { status: ReportStatus }) {
  const s = ST[status];
  return (
    <span
      className="shrink-0 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium"
      style={{ background: s.bg, color: s.fg }}
    >
      {s.label}
    </span>
  );
}

function Card({ label, value, sub, tone }: { label: string; value: string; sub: string; tone?: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-lg bg-white px-4 py-3" style={{ border: `1px solid ${LINE}` }}>
      <span className="text-[11px] uppercase tracking-wide" style={{ color: INK3 }}>{label}</span>
      <span
        className="text-[21px] font-semibold leading-none"
        style={{ color: tone ?? INK, fontVariantNumeric: "tabular-nums" }}
      >
        {value}
      </span>
      <span className="text-[12px]" style={{ color: INK2 }}>{sub}</span>
    </div>
  );
}

/** Dựng báo cáo tháng dạng văn bản theo mẫu CEC rồi tải về.
 *  Trước đây nút "Xuất file" chỉ báo "đã xuất" mà không có file nào — QC gửi
 *  phụ huynh bằng gì? */
function xuatFile(s: Student, m: Monthly, row: ClassRow, noiDung: string[]) {
  const dong = [
    "BÁO CÁO HỌC TẬP THÁNG",
    "CEC Academic Progress Report",
    "",
    `Học sinh:   ${s.name} (${s.code})`,
    `Lớp:        ${row.code}${row.teacher ? ` — GV ${row.teacher}` : ""}`,
    `Kỳ:         ${mLabel(m.month)}`,
    "",
    "1. CHUYÊN CẦN",
    `   Đi học: ${m.present}/${m.reportCount} buổi (${m.attendRate}%)` +
      `${m.late ? ` · đi trễ ${m.late}` : ""}${m.absent ? ` · vắng ${m.absent}` : ""}` +
      `${m.excused ? ` · nghỉ phép ${m.excused}` : ""}`,
    `   Bài tập: nộp ${m.hwDone}/${m.hwTotal}` +
      `${m.hwLate ? ` · nộp trễ ${m.hwLate}` : ""}`,
    `   Điểm bài tập trung bình: ${m.avgHw ?? "chưa có bài chấm"}`,
    "",
    "2. ĐIỂM THỰC HÀNH TRÊN LỚP",
    ...m.skills.map(
      (k) =>
        `   ${k.name.padEnd(10)} ${k.now ?? "—"}` +
        (k.prev !== null ? `   (tháng trước ${k.prev}, ${k.delta! > 0 ? "+" : ""}${k.delta})` : ""),
    ),
    "",
    "3. NHẬN XÉT",
    ...noiDung.filter(Boolean).map((x) => `   ${x}`),
    "",
    `Nguồn dữ liệu: ${m.reportCount} phiếu nhận xét buổi đã duyệt.`,
    `CEC — ${row.campus}`,
  ];

  /* Xuất HTML thay vì .txt — phụ huynh mở bằng trình duyệt, in ra giấy hoặc
     lưu PDF được. Đo trên app học sinh: KHÔNG có màn Báo cáo, KHÔNG có khu vực
     phụ huynh — nghĩa là file này là đường DUY NHẤT tới người nhận, nên phải tử tế.
     Bản .txt cũ mở ra là chữ thô, gửi phụ huynh không coi được. */
  const esc = (t: string) =>
    t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const than = dong
    .map((d) => {
      if (!d.trim()) return "";
      if (/^\d\. /.test(d)) return `<h2>${esc(d)}</h2>`;
      if (d === "BÁO CÁO HỌC TẬP THÁNG") return "";
      if (d === "CEC Academic Progress Report") return "";
      return `<p>${esc(d.trim())}</p>`;
    })
    .join("\n");

  const html = `<!doctype html>
<html lang="vi"><head><meta charset="utf-8">
<title>Báo cáo tháng ${esc(s.name)} — ${esc(mLabel(m.month))}</title>
<style>
  body{font:14px/1.7 system-ui,"Segoe UI",sans-serif;color:#1f2430;max-width:720px;margin:32px auto;padding:0 20px}
  header{border-bottom:2px solid #1e2d5c;padding-bottom:14px;margin-bottom:20px}
  h1{font-size:20px;color:#1e2d5c;margin:0 0 4px}
  .sub{color:#6b7280;font-size:13px}
  h2{font-size:14px;color:#1e2d5c;margin:22px 0 8px;padding-bottom:5px;border-bottom:1px solid #e6e8ee}
  p{margin:5px 0}
  footer{margin-top:28px;padding-top:12px;border-top:1px solid #e6e8ee;color:#6a7386;font-size:12px}
  @media print{body{margin:0}}
</style></head><body>
<header>
  <h1>Báo cáo học tập tháng</h1>
  <div class="sub">CEC Academic Progress Report · ${esc(row.campus)}</div>
</header>
${than}
<footer>Nguồn: ${m.reportCount} phiếu nhận xét buổi đã duyệt · in từ hệ thống CEC</footer>
</body></html>`;

  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `BaoCaoThang_${s.code}_${m.month.replace("/", "-")}.html`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/* ---------------- Modal 1: chọn kỳ để gen ---------------- */

function GenPanel({
  row,
  month,
  onMonth,
  onGen,
}: {
  row: ClassRow;
  month: string;
  onMonth: (m: string) => void;
  onGen: () => void;
}) {
  const reps = REPORTS[row.id] ?? [];
  const months = useMemo(
    () => [...new Set(reps.map((r) => r.date.split("/").slice(1).join("/")))]
      .sort((a, b) => mNum(b) - mNum(a)),
    [reps],
  );

  const inMonth = reps.filter((r) => r.date.split("/").slice(1).join("/") === month);
  const approved = inMonth.filter((r) => r.status === "approved");
  const students = STUDENTS[row.id] ?? [];
  const sessions = new Set(inMonth.map((r) => r.session)).size;
  const chuaDuyet = inMonth.length - approved.length;

  return (
    <section className="rounded-xl bg-white px-5 py-4" style={{ border: `1px solid ${LINE}` }}>
      <h2 className="text-[15px] font-semibold" style={{ color: INK }}>
        Tạo Monthly Report bằng AI
      </h2>
      <p className="mb-3 mt-1 text-[12.5px]" style={{ color: INK2 }}>
        AI tổng hợp phiếu nhận xét buổi, bài tập, kết quả test và bài ghi âm trong kỳ cho từng
        học sinh — mỗi em một bản nháp riêng.
      </p>

      <div className="mb-3 flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-[11px] uppercase tracking-wide" style={{ color: INK3 }}>Kỳ nhận xét</span>
          <select
            value={month}
            onChange={(e) => onMonth(e.target.value)}
            className="rounded-md px-3 py-[7px] text-[13px]"
            style={{ border: `1px solid ${LINE}`, color: INK, background: "#fff" }}
          >
            {months.map((m) => <option key={m} value={m}>{mLabel(m)}</option>)}
          </select>
        </label>
        <button
          type="button"
          onClick={onGen}
          className="rounded-md px-4 py-[8px] text-[13px] font-semibold text-white"
          style={{ background: NAVY }}
        >
          Tạo Monthly Report
        </button>
      </div>

      <div className="mb-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card label="Học sinh" value={String(students.length)} sub="sẽ được tạo báo cáo" />
        <Card label="Buổi học trong kỳ" value={String(sessions)} sub="buổi có phiếu nhận xét" />
        <Card
          label="Phiếu khả dụng"
          value={String(approved.length)}
          sub={`đã QC duyệt / ${inMonth.length} bản`}
          tone={approved.length ? OK : INK3}
        />
        <Card
          label="Chưa duyệt"
          value={String(chuaDuyet)}
          sub={chuaDuyet ? "AI sẽ bỏ qua các bản này" : "không còn bản treo"}
          tone={chuaDuyet ? WARN : OK}
        />
      </div>

      <p
        className="rounded-lg px-3 py-2 text-[12.5px]"
        style={{ background: "#fdf8ef", border: "1px solid #f0dfc0", color: "#7a5410" }}
      >
        <strong>AI sẽ bỏ qua:</strong> buổi trước ngày em vào lớp · bài tập giao trước ngày
        vào lớp · buổi bảo lưu. Em chuyển lớp giữa kỳ sẽ được gom dữ liệu của cả hai lớp.
      </p>
    </section>
  );
}

/* ---------------- Modal 2: danh sách theo tháng ---------------- */

function List({
  row,
  month,
  onOpen,
}: {
  row: ClassRow;
  month: string;
  onOpen: (s: Student, m: Monthly) => void;
}) {
  useOverrides();
  const students = STUDENTS[row.id] ?? [];
  const rows = students
    .map((s) => ({ s, m: (MONTHLY[s.id] ?? []).find((x) => x.month === month) }))
    .filter((x): x is { s: Student; m: Monthly } => !!x.m);

  if (!rows.length)
    return (
      <p
        className="rounded-xl bg-white py-[40px] text-center text-[13px]"
        style={{ border: `1px solid ${LINE}`, color: INK3 }}
      >
        Kỳ này chưa có báo cáo nào. Bấm “Tạo Monthly Report” ở trên.
      </p>
    );

  return (
    <section className="rounded-xl bg-white" style={{ border: `1px solid ${LINE}` }}>
      <div className="flex items-baseline justify-between px-5 pb-3 pt-4">
        <h2 className="text-[15px] font-semibold" style={{ color: INK }}>
          {mLabel(month)} · {rows.length} học sinh
        </h2>
        <span className="text-[12px]" style={{ color: INK3 }}>
          Bấm một em để xem và duyệt
        </span>
      </div>

      {rows.map(({ s, m }) => {
        const owed = m.hwTotal - m.hwDone;
        const warn = m.attendRate < 80 || owed >= 2 || (m.avgHw !== null && m.avgHw < 5);
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => onOpen(s, m)}
            className="flex w-full flex-wrap items-center gap-x-3 gap-y-1.5 px-5 py-3 text-left"
            style={{ borderTop: `1px solid ${LINE}` }}
          >
            <Avatar name={s.name} />
            <span className="min-w-0 shrink-0">
              <span className="block truncate text-[13.5px] font-medium" style={{ color: INK }}>
                {s.name}
              </span>
              <span className="text-[11.5px]" style={{ color: INK3, fontVariantNumeric: "tabular-nums" }}>
                {s.code}
              </span>
            </span>
            <Badge status={monthlyStatusOf(`${s.id}:${m.month}`, m.status)} />

            <span className="flex-1" />

            <span className="text-[12.5px]" style={{ color: m.attendRate < 80 ? DANGER : INK2, fontVariantNumeric: "tabular-nums" }}>
              Điểm danh <strong>{m.attendRate}%</strong> ({m.present}/{m.reportCount}
              {m.late ? `, trễ ${m.late}` : ""}{m.absent ? `, vắng ${m.absent}` : ""})
            </span>
            <span className="text-[12.5px]" style={{ color: owed ? WARN : INK2, fontVariantNumeric: "tabular-nums" }}>
              Bài tập <strong>{m.hwDone}/{m.hwTotal}</strong>
            </span>
            <span className="text-[12.5px]" style={{ color: INK2, fontVariantNumeric: "tabular-nums" }}>
              TB <strong>{m.avgHw ?? "—"}</strong>
            </span>
            {warn && <IconWarn size={15} />}
            <span className="text-[15px]" style={{ color: INK3 }}>›</span>
          </button>
        );
      })}
    </section>
  );
}

/* ---------------- Modal 3: chi tiết một em ---------------- */

/** AI dựng câu từ số thật — không có số thì không bịa */
function draft(s: Student, m: Monthly) {
  const p = PROFILES[s.id];
  const errs = p?.errors ?? [];
  const yeu = errs.filter((e) => e.rate >= 30).slice(0, 2);
  const vung = errs.filter((e) => e.rate < 15).slice(0, 2);
  const len = m.skills.filter((k) => k.delta !== null && k.delta > 0);
  const xuong = m.skills.filter((k) => k.delta !== null && k.delta < 0);
  const owed = m.hwTotal - m.hwDone;

  const manh: string[] = [];
  if (len.length)
    manh.push(`Tiến bộ ở ${len.map((k) => `${k.name} (+${k.delta})`).join(", ")} so với tháng trước.`);
  if (vung.length)
    manh.push(`Nắm vững ${vung.map((v) => topicFull(v.topic)).join(", ")} — tỉ lệ sai dưới 15%.`);
  /* Chỉ nói "đi học đầy đủ" khi thật sự không vắng buổi nào — trước đây chỉ xét
     attendRate (đi trễ vẫn tính có mặt) nên câu này mâu thuẫn với chính băng
     cảnh báo cùng màn. */
  if (m.absent === 0 && m.excused === 0 && m.late === 0)
    manh.push(`Đi học đầy đủ và đúng giờ cả ${m.reportCount} buổi trong tháng.`);
  else if (m.absent === 0 && m.excused === 0)
    manh.push(`Đi học đủ ${m.reportCount} buổi, có ${m.late} buổi tới muộn.`);
  if (!owed && m.hwTotal) manh.push(`Nộp đủ ${m.hwTotal} bài tập được giao.`);

  const caithien: string[] = [];
  for (const e of yeu)
    caithien.push(`${topicFull(e.topic)}: sai ${e.wrong}/${e.total} câu (${e.rate}%)${e.trend === "tăng" ? ", đang tăng so với tháng trước" : ""}.`);
  if (xuong.length)
    caithien.push(`Điểm thực hành giảm ở ${xuong.map((k) => `${k.name} (${k.delta})`).join(", ")}.`);
  if (owed) caithien.push(`Còn ${owed} bài chưa nộp trong tháng.`);
  if (m.absent > 0)
    caithien.push(`Vắng ${m.absent} buổi không phép — phần bài của buổi đó con bị hổng.`);
  if (m.excused > 0 && m.absent === 0)
    caithien.push(`Nghỉ có phép ${m.excused} buổi, cần học bù phần đã lỡ.`);
  if (m.hwLate) caithien.push(`${m.hwLate} bài nộp trễ hạn.`);

  const giaiphap: string[] = [];
  for (const e of yeu)
    giaiphap.push(`Giao thêm 2 bài luyện ${topicFull(e.topic)} trong tháng tới, chữa từng câu sai cùng con.`);
  if (owed)
    giaiphap.push("Cố định giờ làm bài ở nhà 30 phút/ngày; cơ sở sẽ giữ con lại cuối giờ nếu chưa nộp.");
  if (m.attendRate < 80)
    giaiphap.push("Sắp xếp buổi học bù cho các buổi con nghỉ, tránh hổng bài.");
  if (xuong.length)
    giaiphap.push(
      `Buổi tới gọi con luyện thêm phần ${xuong.map((k) => k.name).join(", ")} — cô ghi nhận lại điểm để so tháng sau.`,
    );
  if (m.hwLate)
    giaiphap.push("Nhắc phụ huynh đặt hạn nộp sớm hơn 1 ngày để con không nộp sát giờ.");
  if (!giaiphap.length)
    giaiphap.push("Con đang theo kịp lớp — giữ nhịp học hiện tại, tháng tới nâng dần độ khó bài giao.");

  return { manh, caithien, giaiphap };
}

function Box({
  title,
  ai,
  items,
  hint,
}: {
  title: string;
  ai?: boolean;
  items: string[];
  hint?: string;
}) {
  const [text, setText] = useState(items.join("\n"));
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline gap-2">
        <span className="text-[13px] font-semibold" style={{ color: INK }}>{title}</span>
        {ai && (
          <span
            className="rounded-full px-2 py-0.5 text-[10.5px] font-medium"
            style={{ background: "#eef1f8", color: NAVY }}
          >
            AI soạn — sửa được
          </span>
        )}
        {hint && <span className="text-[11.5px]" style={{ color: INK3 }}>{hint}</span>}
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={Math.max(3, text.split("\n").length)}
        className="w-full resize-y rounded-lg px-3 py-2 text-[13px] leading-[1.55]"
        style={{ border: `1px solid ${LINE}`, color: INK, background: "#fff" }}
      />
    </div>
  );
}

export function MonthlyDetail({
  s,
  m,
  row,
  onBack,
}: {
  s: Student;
  m: Monthly;
  row: ClassRow;
  onBack: () => void;
}) {
  const d = useMemo(() => draft(s, m), [s, m]);
  const { ask } = useAction();
  useOverrides();
  const mKeyId = `${s.id}:${m.month}`;
  const status = monthlyStatusOf(mKeyId, m.status);
  const p = PROFILES[s.id];
  const reps = (REPORTS[row.id] ?? []).filter(
    (r) => r.studentId === s.id && r.date.split("/").slice(1).join("/") === m.month,
  );
  const owed = m.hwTotal - m.hwDone;
  /** tháng đầu tiên thì chưa có gì để so — ẩn 2 cột so sánh cho khỏi rỗng cả bảng */
  const hasPrev = m.skills.some((k) => k.prev !== null);

  return (
    <div className="flex flex-col gap-4">
      <button type="button" onClick={onBack} className="flex w-fit items-center gap-1 text-[13px]" style={{ color: NAVY }}>
        <IconChevronLeft size={15} /> Về danh sách {mLabel(m.month)}
      </button>

      <div className="flex flex-wrap items-center gap-3 rounded-xl bg-white px-5 py-4" style={{ border: `1px solid ${LINE}` }}>
        <Avatar name={s.name} size={44} />
        <div className="min-w-0">
          <h1 className="truncate text-[18px] font-semibold" style={{ color: INK }}>{s.name}</h1>
          <p className="text-[12.5px]" style={{ color: INK2 }}>
            {s.code} · Lớp {row.code} · {mLabel(m.month)}
          </p>
        </div>
        <Badge status={status} />
        <span className="flex-1" />
        {status === "approved" ? (
          <span className="flex items-center gap-2">
            <span className="text-[12.5px]" style={{ color: OK }}>
              Đã duyệt — sẵn sàng gửi phụ huynh
            </span>
            <button
              type="button"
              onClick={() =>
                ask({
                  title: "Xuất file gửi phụ huynh",
                  body: (
                    <>
                      Xuất báo cáo {mLabel(m.month).toLowerCase()} của em <strong>{s.name}</strong>{" "}
                      ({s.code}) theo mẫu CEC để gửi phụ huynh.
                    </>
                  ),
                  confirmLabel: "Xuất file",
                  doneText: `Đã tải báo cáo ${mLabel(m.month).toLowerCase()} của ${s.name}.`,
                  run: () =>
                    xuatFile(s, m, row, [
                      ...d.manh.map((x) => `[Điểm tích cực] ${x}`),
                      ...d.caithien.map((x) => `[Cần cải thiện] ${x}`),
                      ...d.giaiphap.map((x) => `[Giải pháp] ${x}`),
                    ]),
                })
              }
              className="rounded-md px-4 py-[8px] text-[13px] font-semibold text-white"
              style={{ background: NAVY }}
            >
              Xuất file gửi phụ huynh
            </button>
          </span>
        ) : status === "pending" ? (
          /* Đang chờ duyệt mà QC chính là người duyệt — cho duyệt ngay tại đây */
          <span className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                ask({
                  title: "Trả lại người soạn",
                  body: (
                    <>
                      Trả báo cáo {mLabel(m.month).toLowerCase()} của em <strong>{s.name}</strong> về
                      để sửa lại. Nội dung hiện tại được giữ nguyên.
                    </>
                  ),
                  confirmLabel: "Trả lại",
                  doneText: `Đã trả báo cáo của ${s.name} về cho người soạn.`,
                  danger: true,
                  run: () => setMonthlyStatus(mKeyId, "draft"),
                })
              }
              className="rounded-md px-3 py-[7px] text-[13px]"
              style={{ border: `1px solid ${LINE}`, color: INK, background: "#fff" }}
            >
              Trả lại người soạn
            </button>
            <button
              type="button"
              onClick={() =>
                ask({
                  title: "Duyệt báo cáo tháng",
                  body: (
                    <>
                      Duyệt báo cáo {mLabel(m.month).toLowerCase()} của em <strong>{s.name}</strong>.
                      Duyệt xong mới xuất file gửi phụ huynh được.
                    </>
                  ),
                  confirmLabel: "Duyệt",
                  doneText: `Đã duyệt báo cáo của ${s.name}.`,
                  run: () => setMonthlyStatus(mKeyId, "approved"),
                })
              }
              className="rounded-md px-4 py-[8px] text-[13px] font-semibold text-white"
              style={{ background: NAVY }}
            >
              Duyệt báo cáo
            </button>
          </span>
        ) : (
          <button
            type="button"
            onClick={() =>
              ask({
                title: "Gửi báo cáo cho QC duyệt",
                body: (
                  <>
                    Gửi báo cáo {mLabel(m.month).toLowerCase()} của em <strong>{s.name}</strong> để
                    QC duyệt trước khi gửi phụ huynh.
                  </>
                ),
                confirmLabel: "Gửi duyệt",
                doneText: `Đã gửi báo cáo của ${s.name} chờ duyệt.`,
                run: () => setMonthlyStatus(mKeyId, "pending"),
              })
            }
            className="rounded-md px-4 py-[8px] text-[13px] font-semibold text-white"
            style={{ background: NAVY }}
          >
            Gửi QC duyệt
          </button>
        )}
      </div>

      {/* 4 thẻ tổng hợp */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card
          label="Điểm danh"
          value={`${m.attendRate}%`}
          sub={
            m.sessionTotal > m.reportCount
              ? `${m.present}/${m.reportCount} buổi đã duyệt (tháng có ${m.sessionTotal} buổi) · vắng ${m.absent}`
              : `${m.present}/${m.reportCount} buổi · trễ ${m.late} · vắng ${m.absent}${m.excused ? ` · phép ${m.excused}` : ""}`
          }
          tone={m.attendRate < 80 ? DANGER : OK}
        />
        <Card
          label="Bài tập hoàn thành"
          value={`${m.hwDone}/${m.hwTotal}`}
          sub={owed ? `còn ${owed} bài chưa nộp · trễ ${m.hwLate}` : `nộp đủ · trễ ${m.hwLate}`}
          tone={owed ? WARN : OK}
        />
        <Card
          label="Điểm bài tập TB"
          value={m.avgHw === null ? "—" : String(m.avgHw)}
          sub={
            m.avgHw === null
              ? `${mLabel(m.month).toLowerCase()} chưa có bài nào được chấm`
              : `riêng ${mLabel(m.month).toLowerCase()} · ${m.hwDone}/${m.hwTotal} bài`
          }
        />
        <Card
          label="Chủ điểm yếu nhất"
          value={p?.errors[0] ? `${p.errors[0].rate}%` : "—"}
          sub={p?.errors[0] ? topicVi(p.errors[0].topic) : "chưa đủ dữ liệu"}
          tone={p?.errors[0] && p.errors[0].rate >= 40 ? DANGER : INK}
        />
      </div>

      {m.sessionTotal > m.reportCount && (
        <p
          className="rounded-lg px-3 py-2 text-[12.5px]"
          style={{ background: "#fdf8ef", border: "1px solid #f0dfc0", color: "#7a5410" }}
        >
          <strong>Đang tính trên {m.reportCount}/{m.sessionTotal} buổi của tháng.</strong>{" "}
          Còn {m.sessionTotal - m.reportCount} phiếu nhận xét buổi chưa vào báo cáo — gồm phiếu
          đang chờ bạn duyệt và phiếu giáo viên chưa nộp. Bạn duyệt được phiếu đã nộp; phiếu
          giáo viên chưa nộp thì phải đòi giáo viên nộp trước.
        </p>
      )}

      {/* điểm thực hành trên lớp */}
      <section className="rounded-xl bg-white px-5 py-4" style={{ border: `1px solid ${LINE}` }}>
        <h2 className="mb-1 text-[15px] font-semibold" style={{ color: INK }}>Điểm thực hành trên lớp</h2>
        <p className="mb-3 text-[12px]" style={{ color: INK3 }}>
          Trung bình từ {m.reportCount} phiếu nhận xét buổi đã duyệt trong tháng.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr style={{ color: INK3 }}>
                {(hasPrev ? ["Kỹ năng", "Tháng trước", "Tháng này", "Thay đổi"] : ["Kỹ năng", "Tháng này"]).map((h) => (
                  <th key={h} className="whitespace-nowrap px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {m.skills.map((k) => (
                <tr key={k.name} style={{ borderTop: `1px solid ${LINE}` }}>
                  <td className="px-3 py-2" style={{ color: INK }}>{k.name}</td>
                  {hasPrev && (
                    <td className="px-3 py-2 tabular-nums" style={{ color: INK3 }}>{k.prev ?? "—"}</td>
                  )}
                  <td className="px-3 py-2 font-semibold tabular-nums" style={{ color: INK }}>{k.now ?? "—"}</td>
                  {hasPrev && (
                    <td
                      className="px-3 py-2 tabular-nums"
                      style={{ color: k.delta === null ? INK3 : k.delta > 0 ? OK : k.delta < 0 ? DANGER : INK2 }}
                    >
                      {k.delta === null ? "—" : k.delta > 0 ? `▲ +${k.delta}` : k.delta < 0 ? `▼ ${k.delta}` : "không đổi"}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* các ô AI soạn */}
      <section className="flex flex-col gap-4 rounded-xl bg-white px-5 py-4" style={{ border: `1px solid ${LINE}` }}>
        <h2 className="text-[15px] font-semibold" style={{ color: INK }}>Nội dung nhận xét</h2>
        <Box title="Điểm tích cực" ai items={d.manh} />
        <Box
          title="Điểm cần cải thiện"
          ai
          items={d.caithien}
          hint="không được lặp lại nhận xét tháng trước"
        />
        <Box title="Giải pháp — QC quyết" ai items={d.giaiphap} hint="phải cụ thể, tránh nói chung chung" />
        <Box
          title="Bài ghi âm tháng / Read & Tell"
          items={[]}
          hint="chưa có bài ghi âm nào trong kỳ — QC ghi tay"
        />
      </section>

      {/* nguồn dữ liệu — để QC biết AI dựa vào đâu */}
      <p className="text-[12px]" style={{ color: INK3 }}>
        Nguồn dữ liệu AI dùng: {m.reportCount} phiếu nhận xét buổi đã duyệt ·{" "}
        {p?.history.length ?? 0} bài tập online · {reps.filter((r) => r.comment).length} nhận xét của giáo viên · 0 bài ghi âm
      </p>
    </div>
  );
}

/* ---------------- màn chính ---------------- */

export function MonthlyReportTab({ row }: { row: ClassRow }) {
  const reps = REPORTS[row.id] ?? [];
  const months = useMemo(
    () => [...new Set(reps.map((r) => r.date.split("/").slice(1).join("/")))]
      .sort((a, b) => mNum(b) - mNum(a)),
    [reps],
  );
  const [month, setMonth] = useState(months[0] ?? "");
  const [open, setOpen] = useState<{ s: Student; m: Monthly } | null>(null);
  /* Hai chế độ xem: từng em (ma trận cũ) và duyệt hàng loạt cả lớp (WF-10).
     Cuối tháng QC cần cái sau — lớp 9 em mà mở 9 lần thì mất cả buổi. */
  const [cheDo, setCheDo] = useState<"tung-em" | "ca-lop">("ca-lop");

  if (!months.length)
    return (
      <p className="py-[40px] text-center text-[13px]" style={{ color: INK3 }}>
        Lớp chưa có phiếu nhận xét buổi nào nên chưa tạo được báo cáo tháng.
      </p>
    );

  if (open)
    return <MonthlyDetail s={open.s} m={open.m} row={row} onBack={() => setOpen(null)} />;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-[8px] text-[12.5px]">
        <span className="flex rounded-[8px] p-[2px]" style={{ background: "#eef0f5" }}>
          {(["ca-lop", "tung-em"] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCheDo(c)}
              className="rounded-[4px] px-[11px] py-[5px]"
              style={{
                background: cheDo === c ? "#fff" : "transparent",
                fontWeight: cheDo === c ? 600 : 400,
                color: cheDo === c ? INK : INK2,
                boxShadow: cheDo === c ? "0 1px 2px rgba(20,28,56,0.10)" : undefined,
              }}
            >
              {c === "ca-lop" ? "Duyệt cả lớp" : "Xem từng em"}
            </button>
          ))}
        </span>
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="rounded-[8px] px-[10px] py-[6px] text-[12.5px]"
          style={{ border: `1px solid #d9dde5`, background: "#fff", color: INK }}
        >
          {months.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {cheDo === "ca-lop" ? (
        <MonthlyBatch row={row} month={month} />
      ) : (
        <>
      {/* `onGen={() => undefined}` là nút CHẾT: bấm "Tạo Monthly Report" không có
          gì xảy ra, cũng không có toast để QC nghi ngờ — đúng loại lỗi đã đi diệt
          một lượt nhưng bỏ sót chỗ này. Việc thật của nút là chuyển sang chế độ
          soạn cả lớp, màn đó đã dựng sẵn ở `MonthlyBatch`. */}
      <GenPanel row={row} month={month} onMonth={setMonth} onGen={() => setCheDo("ca-lop")} />
      <List row={row} month={month} onOpen={(s, m) => setOpen({ s, m })} />
        </>
      )}
    </div>
  );
}

/* ---------------- tab Student Report ---------------- */

const ATT: Record<string, { label: string; fg: string; bg: string }> = {
  present: { label: "Có mặt", fg: OK, bg: "#e6f5ec" },
  late: { label: "Đi trễ", fg: WARN, bg: "#fdf3e7" },
  excused: { label: "Vắng có phép", fg: "#2b3f7a", bg: "#eaf1fb" },
  absent: { label: "Vắng", fg: DANGER, bg: "#fdecea" },
};

const HW: Record<string, { label: string; fg: string }> = {
  ontime: { label: "Nộp đúng hạn", fg: OK },
  late: { label: "Nộp trễ", fg: WARN },
  missing: { label: "Chưa nộp", fg: DANGER },
};

export function StudentReportTab({ row }: { row: ClassRow }) {
  const reps = REPORTS[row.id] ?? [];
  const students = STUDENTS[row.id] ?? [];
  const byId = useMemo(() => new Map(students.map((s) => [s.id, s])), [students]);

  const sessions = useMemo(
    () => [...new Map(reps.map((r) => [r.session, r])).values()]
      .sort((a, b) => b.session - a.session),
    [reps],
  );
  const [ses, setSes] = useState<number | null>(sessions[0]?.session ?? null);

  if (!reps.length)
    return (
      <p className="py-[40px] text-center text-[13px]" style={{ color: INK3 }}>
        Lớp chưa có Student Report nào.
      </p>
    );

  const list = reps.filter((r) => r.session === ses);
  const cho = reps.filter((r) => r.status !== "approved").length;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[12.5px]">
        <span style={{ color: INK2 }}>Buổi:</span>
        <select
          value={ses ?? ""}
          onChange={(e) => setSes(+e.target.value)}
          className="rounded-md px-3 py-[6px] text-[13px]"
          style={{ border: `1px solid ${LINE}`, color: INK, background: "#fff" }}
        >
          {sessions.map((x) => (
            <option key={x.session} value={x.session}>
              Buổi {x.session} · {x.date}
            </option>
          ))}
        </select>
        {cho > 0 ? (
          <span style={{ color: WARN, fontWeight: 600 }}>
            <IconWarn size={13} /> {cho} bản chưa duyệt trong lớp
          </span>
        ) : (
          <span style={{ color: OK }}>
            <IconCheck size={13} /> Mọi bản đã duyệt
          </span>
        )}
        <span className="flex-1" />
        <span style={{ color: INK3 }}>
          Giáo viên chấm, QC duyệt. Đây là nguồn của Monthly Report.
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg bg-white" style={{ border: `1px solid ${LINE}` }}>
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr style={{ background: TH_BG, color: TH_FG, borderBottom: `1px solid ${TH_LINE}` }}>
              {["Học sinh", "Điểm danh", "Bài tập", "Điểm BT", "Điểm thực hành TB", "Nhận xét", "Trạng thái", "Người điền"].map((h) => (
                <th key={h} className="whitespace-nowrap px-3 py-[9px] text-left text-[12px] font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {list.map((r, i) => {
              const s = byId.get(r.studentId);
              const a = ATT[r.attendance]!;
              const vals = r.skills ? Object.values(r.skills).filter((v): v is number => v !== null) : [];
              const avg = vals.length ? +(vals.reduce((x, y) => x + y, 0) / vals.length).toFixed(1) : null;
              return (
                <tr key={r.id} style={{ background: i % 2 ? "#f5f8fc" : "#fff", borderBottom: "1px solid #edeff4" }}>
                  <td className="whitespace-nowrap px-3 py-[9px]">
                    <span className="font-medium">{s?.name ?? r.studentId}</span>
                    <span className="ml-2 text-[11.5px]" style={{ color: INK3 }}>{s?.code}</span>
                  </td>
                  <td className="whitespace-nowrap px-3">
                    <span className="rounded-full px-2 py-0.5 text-[11.5px]" style={{ background: a.bg, color: a.fg }}>
                      {a.label}
                    </span>
                    {r.absenceReason && (
                      <span className="ml-2 text-[11.5px]" style={{ color: INK3 }}>{r.absenceReason}</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3" style={{ color: r.hwStatus ? HW[r.hwStatus]!.fg : INK3 }}>
                    {r.hwStatus ? HW[r.hwStatus]!.label : "—"}
                  </td>
                  <td className="px-3 tabular-nums" style={{ color: INK2 }}>{r.hwScore ?? "—"}</td>
                  <td className="px-3 font-semibold tabular-nums" style={{ color: avg === null ? INK3 : INK }}>
                    {avg ?? "—"}
                  </td>
                  <td className="max-w-[280px] px-3" style={{ color: r.comment ? INK2 : INK3 }}>
                    <span className="line-clamp-1">{r.comment ?? "— khoá vì em vắng —"}</span>
                  </td>
                  <td className="whitespace-nowrap px-3"><Badge status={r.status} /></td>
                  <td className="whitespace-nowrap px-3" style={{ color: INK2 }}>{r.by}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="flex items-center gap-1.5 text-[12px]" style={{ color: INK3 }}>
        <IconClipboard size={13} />
        Em vắng thì bài tập, điểm thực hành và nhận xét đều bị khoá — đúng quy tắc của phiếu.
      </p>
    </div>
  );
}

/* ---------------- nhận xét một buổi của một em ---------------- */

const ATT_LABEL: Record<string, { label: string; fg: string; bg: string }> = {
  present: { label: "Có mặt", fg: OK, bg: "#e6f5ec" },
  late: { label: "Đi trễ", fg: WARN, bg: "#fdf3e7" },
  excused: { label: "Vắng có phép", fg: "#2b3f7a", bg: "#eaf1fb" },
  absent: { label: "Vắng", fg: DANGER, bg: "#fdecea" },
};

const HW_LABEL: Record<string, { label: string; fg: string }> = {
  ontime: { label: "Nộp đúng hạn", fg: OK },
  late: { label: "Nộp trễ", fg: WARN },
  missing: { label: "Chưa nộp", fg: DANGER },
};

export function SessionNote({
  student,
  session,
  row,
  onBack,
}: {
  student: Student;
  session: number;
  row: ClassRow;
  onBack: () => void;
}) {
  const { ask } = useAction();
  useOverrides();
  const rep = (REPORTS[row.id] ?? []).find(
    (r) => r.studentId === student.id && r.session === session,
  );

  if (!rep)
    return (
      <div className="flex flex-col gap-4">
        <button type="button" onClick={onBack} className="flex w-fit items-center gap-1 text-[13px]" style={{ color: NAVY }}>
          <IconChevronLeft size={15} /> Về bảng kết quả
        </button>
        <p className="text-[13px]" style={{ color: INK3 }}>
          Buổi này chưa có phiếu nhận xét cho em {student.name}.
        </p>
      </div>
    );

  const status = reportStatusOf(rep.id, rep.status);
  /* Ở PHIẾU BUỔI, "Nháp" nghĩa là giáo viên chưa nộp — khác hẳn báo cáo tháng
     (nháp do QC/AI soạn), nên phải nói rõ chứ không dùng chung một nhãn. */
  const nhanPhieu =
    status === "draft"
      ? { label: "Giáo viên chưa nộp", bg: "#fdf3e7", fg: WARN }
      : status === "pending"
        ? { label: "Chờ bạn duyệt", bg: "#eaf1fb", fg: "#2b3f7a" }
        : { label: "Đã duyệt", bg: "#e6f5ec", fg: OK };
  const a = ATT_LABEL[rep.attendance]!;
  const vang = rep.attendance === "absent" || rep.attendance === "excused";
  const skills = rep.skills ?? {};

  return (
    <div className="flex flex-col gap-4">
      <button type="button" onClick={onBack} className="flex w-fit items-center gap-1 text-[13px]" style={{ color: NAVY }}>
        <IconChevronLeft size={15} /> Về bảng kết quả
      </button>

      <div className="flex flex-wrap items-center gap-3 rounded-xl bg-white px-5 py-4" style={{ border: `1px solid ${LINE}` }}>
        <Avatar name={student.name} size={40} />
        <div className="min-w-0">
          <h1 className="truncate text-[17px] font-semibold" style={{ color: INK }}>{student.name}</h1>
          <p className="text-[12.5px]" style={{ color: INK2 }}>
            {student.code} · Lớp {row.code} · Buổi {rep.session} · {rep.date}
          </p>
        </div>
        <span
          className="shrink-0 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium"
          style={{ background: nhanPhieu.bg, color: nhanPhieu.fg }}
        >
          {nhanPhieu.label}
        </span>
        <span className="flex-1" />
        <span className="text-[12.5px]" style={{ color: INK2 }}>
          Người điền: <strong style={{ color: INK }}>{rep.by}</strong>
        </span>
        {status === "draft" && (
          <span className="shrink-0 text-[12.5px]" style={{ color: WARN }}>
            Giáo viên chưa nộp phiếu — chưa duyệt được
          </span>
        )}
        {status === "pending" && (
          <span className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() =>
                ask({
                  title: "Trả phiếu lại cho giáo viên",
                  body: (
                    <>
                      Trả phiếu buổi {rep.session} của em <strong>{student.name}</strong> về cho{" "}
                      <strong>{rep.by}</strong> sửa lại.
                    </>
                  ),
                  confirmLabel: "Trả lại",
                  doneText: `Đã trả phiếu buổi ${rep.session} về cho ${rep.by}.`,
                  danger: true,
                  run: () => setReportStatus(rep.id, "draft"),
                })
              }
              className="rounded-md px-3 py-[7px] text-[13px]"
              style={{ border: `1px solid ${LINE}`, color: INK, background: "#fff" }}
            >
              Trả lại giáo viên
            </button>
            <button
              type="button"
              onClick={() =>
                ask({
                  title: "Duyệt phiếu nhận xét buổi",
                  body: (
                    <>
                      Duyệt phiếu buổi {rep.session} ({rep.date}) của em{" "}
                      <strong>{student.name}</strong>. Phiếu đã duyệt mới được tính vào báo cáo tháng.
                    </>
                  ),
                  confirmLabel: "Duyệt phiếu",
                  doneText: `Đã duyệt phiếu buổi ${rep.session} của ${student.name}.`,
                  run: () => setReportStatus(rep.id, "approved"),
                })
              }
              className="rounded-md px-4 py-[7px] text-[13px] font-semibold text-white"
              style={{ background: NAVY }}
            >
              Duyệt phiếu
            </button>
          </span>
        )}
      </div>

      <section className="flex flex-col gap-4 rounded-xl bg-white px-5 py-4" style={{ border: `1px solid ${LINE}` }}>
        {/* 1. điểm danh */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[13px] font-semibold" style={{ color: INK }}>Điểm danh</span>
          <span className="rounded-full px-2.5 py-1 text-[12.5px] font-medium" style={{ background: a.bg, color: a.fg }}>
            {a.label}
          </span>
          {rep.absenceReason && (
            <span className="text-[12.5px]" style={{ color: INK2 }}>Lý do: {rep.absenceReason}</span>
          )}
        </div>

        {vang ? (
          <p
            className="rounded-lg px-3 py-2 text-[12.5px]"
            style={{ background: "#f6f7fa", border: `1px solid ${LINE}`, color: INK2 }}
          >
            Em vắng buổi này nên bài tập, điểm thực hành và nhận xét đều bị khoá.
          </p>
        ) : (
          <>
            {/* 2. bài tập về nhà */}
            <div className="flex flex-wrap items-center gap-3" style={{ borderTop: `1px solid ${LINE}`, paddingTop: 14 }}>
              <span className="text-[13px] font-semibold" style={{ color: INK }}>Bài tập về nhà</span>
              {rep.hwStatus && (
                <span className="text-[12.5px] font-medium" style={{ color: HW_LABEL[rep.hwStatus]!.fg }}>
                  {HW_LABEL[rep.hwStatus]!.label}
                </span>
              )}
              <span className="text-[12.5px]" style={{ color: INK2, fontVariantNumeric: "tabular-nums" }}>
                Điểm bài tập online: <strong style={{ color: INK }}>{rep.hwScore ?? "—"}</strong>
              </span>
              <button
                type="button"
                onClick={() =>
                  ask({
                    title: "Xem chi tiết bài làm",
                    body: (
                      <>
                        Mở bài em <strong>{student.name}</strong> làm ở buổi {rep.session} để xem
                        từng câu đúng sai. Màn này cần API trả lời từng câu — đang chờ dev mở.
                      </>
                    ),
                    confirmLabel: "Đã hiểu",
                    doneText: "Màn xem từng câu sẽ có khi API sẵn sàng.",
                  })
                }
                className="text-[12.5px] font-medium"
                style={{ color: NAVY }}
              >
                Xem chi tiết bài làm ›
              </button>
            </div>

            {/* 3. điểm thực hành trên lớp */}
            <div style={{ borderTop: `1px solid ${LINE}`, paddingTop: 14 }}>
              <p className="mb-2 text-[13px] font-semibold" style={{ color: INK }}>
                Điểm thực hành trên lớp
              </p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(skills).map(([k, v]) => (
                  <span
                    key={k}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px]"
                    style={{ border: `1px solid ${LINE}`, color: v === null ? INK3 : INK }}
                  >
                    {k}
                    <strong style={{ fontVariantNumeric: "tabular-nums" }}>{v ?? "—"}</strong>
                  </span>
                ))}
              </div>
            </div>

            {/* 4. thái độ & tương tác */}
            <div style={{ borderTop: `1px solid ${LINE}`, paddingTop: 14 }}>
              <p className="mb-1.5 text-[13px] font-semibold" style={{ color: INK }}>
                Thái độ &amp; tương tác trên lớp
              </p>
              <p className="text-[13px] leading-[1.6]" style={{ color: rep.attitude ? INK2 : INK3 }}>
                {rep.attitude ?? "Chưa ghi."}
              </p>
            </div>

            {/* 5. nhận xét chung */}
            <div style={{ borderTop: `1px solid ${LINE}`, paddingTop: 14 }}>
              <p className="mb-1.5 text-[13px] font-semibold" style={{ color: INK }}>Nhận xét chung</p>
              <p className="text-[13px] leading-[1.6]" style={{ color: rep.comment ? INK2 : INK3 }}>
                {rep.comment ?? "Chưa ghi."}
              </p>
            </div>
          </>
        )}
      </section>

      <p className="text-[12px]" style={{ color: INK3 }}>
        Giáo viên và trợ giảng điền phiếu này, QC duyệt. Đây là nguồn của báo cáo tháng.
      </p>
    </div>
  );
}
