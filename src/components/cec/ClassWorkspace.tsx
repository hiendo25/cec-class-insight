import { useMemo, useState } from "react";
import { TH_BG, TH_FG, TH_LINE, NAVY, LINE, INK, INK2, INK3, OK, WARN, DANGER } from "@/data/const";
import type { ClassRow } from "@/data/classes";
import { STUDENTS, type Student } from "@/data/students";
import { SESSIONS, ASSIGNMENTS } from "@/data/sessions";
import { AssignDialog } from "./AssignDialog";
import { useAction } from "./ActionDialog";
import { StudentProfile } from "./StudentProfile";
import { ResultMatrix } from "./ResultMatrix";
import { TestResults } from "./TestResults";
import { useNavigate } from "@tanstack/react-router";
import { GradingQueue } from "./GradingQueue";
import { choDuyetCuaLop } from "@/data/submissions";
import { Person } from "./Person";
import { MonthlyBatch } from "./MonthlyBatch";
import { MONTHLY, REPORTS } from "@/data/reports";
import { soNgayToi } from "@/data/const";
import { daDuyetBai, daNhac, markReminded, reportStatusOf, useOverrides } from "@/data/overrides";
import {
  IconBell,
  IconCalendarCheck,
  IconChart,
  IconCheck,
  IconClipboard,
  IconUsers,
  IconWarn,
} from "./icons";


/** 5 tab đúng như CEC PROD — không tự đẻ thêm tab.
 *  Báo cáo tháng và nhận xét buổi nằm TRONG tab Kết quả, giống PROD. */
const TABS = ["Học sinh", "Lịch học", "Bài tập", "Duyệt bài", "Kết quả", "Điểm kiểm tra", "Lịch sử"] as const;
export type Tab = (typeof TABS)[number];

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

/** Học sinh cần chú ý theo mắt QC: đang nợ bài, hoặc điểm dưới 5, hoặc vắng từ 2 buổi.
 *  Trước đây đòi nợ TỪ 3 BÀI mới tính, nên nhãn ghi (0) trong khi hai màn khác
 *  cùng lúc báo "5 em nợ bài" — QC không tin được con số nào. */
const isAtRisk = (s: Student) =>
  s.assigned - s.submitted > 0 || (s.avg !== null && s.avg < 5) || s.absent >= 2;

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

/* ---------- tab Học sinh ---------- */

/** Nhóm học sinh theo tình trạng — bám PROD: Đang học / Lịch sử / Tất cả.
 *  "Lịch sử" gộp em đã bảo lưu, chuyển lớp, nghỉ — tức không còn học ở lớp này. */
type Group = "Đang học" | "Lịch sử" | "Tất cả";

const STATE_STYLE: Record<string, { background: string; color: string }> = {
  "Đang học": { background: "#e6f5ec", color: OK },
  "Bảo lưu": { background: "#fdf3e7", color: WARN },
  "Đã chuyển lớp": { background: "#eaf1fb", color: "#2b3f7a" },
  "Đã nghỉ": { background: "#f0f2f6", color: INK2 },
};

function TabStudents({
  stats,
  onOpenStudent,
  onOpenAssign,
}: {
  stats: Stats;
  onOpenStudent: (s: Student) => void;
  /** giao bài riêng cho một em — mở modal, chế độ chọn học sinh */
  onOpenAssign: (s: Student) => void;
}) {
  const [onlyRisk, setOnlyRisk] = useState(false);
  const [group, setGroup] = useState<Group>("Đang học");

  const inGroup = (s: Student) =>
    group === "Tất cả" ? true : group === "Đang học" ? s.state === "Đang học" : s.state !== "Đang học";

  const count = {
    "Đang học": stats.students.filter((s) => s.state === "Đang học").length,
    "Lịch sử": stats.students.filter((s) => s.state !== "Đang học").length,
    "Tất cả": stats.students.length,
  };

  /* Đếm theo ĐÚNG nhóm đang xem — trước đây nhãn đếm cả em đã nghỉ trong khi
     bảng chỉ hiện em đang học, nên nhãn ghi (1) mà bảng có 4 dòng gạch đỏ. */
  const inGroupList = stats.students.filter(inGroup);
  const riskInGroup = inGroupList.filter(isAtRisk);
  const list = onlyRisk ? riskInGroup : inGroupList;

  if (stats.students.length === 0)
    return (
      <p className="py-[40px] text-center text-[13px]" style={{ color: INK3 }}>
        Lớp chưa có học sinh.
      </p>
    );

  return (
    <div className="flex flex-col gap-[12px]">
      <div className="flex flex-wrap items-center gap-[10px] text-[12.5px]">
        <span className="flex rounded-[6px] p-[2px]" style={{ background: "#eef0f5" }}>
          {(["Đang học", "Lịch sử", "Tất cả"] as Group[]).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGroup(g)}
              className="rounded-[5px] px-[11px] py-[5px] text-[12.5px]"
              style={{
                background: group === g ? "#fff" : "transparent",
                fontWeight: group === g ? 600 : 400,
                color: group === g ? INK : INK2,
                boxShadow: group === g ? "0 1px 2px rgba(20,28,56,0.10)" : undefined,
              }}
            >
              {g} ({count[g]})
            </button>
          ))}
        </span>
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
          Chỉ xem em cần chú ý ({riskInGroup.length})
        </button>
        <span style={{ color: INK3 }}>
          Hiển thị {list.length}/{stats.students.length} học sinh
        </span>
      </div>

      <div className="cec-scroll overflow-x-auto rounded-[8px] bg-white" style={{ border: `1px solid ${LINE}` }}>
        {/* Định chiều rộng từng cột — không có thì trình duyệt chia đều, cột Ghi chú
            và Phản hồi PH bị bóp cụt ngang dù đã line-clamp. */}
        <table className="border-collapse text-[13px]" style={{ minWidth: 1240, width: "100%" }}>
          <colgroup>
            {[218, 104, 88, 112, 124, 128, 74, 74, 190, 190, 104].map((w, i) => (
              <col key={i} style={{ width: w }} />
            ))}
          </colgroup>
          <thead>
            <tr style={{ background: TH_BG, color: TH_FG, borderBottom: `1px solid ${TH_LINE}` }}>
              {[
                "Học sinh",
                "Tình trạng",
                "Loại",
                "Ngày vào lớp",
                "Số điện thoại",
                "Bài đã nộp",
                "Điểm TB",
                "Vắng",
                "Ghi chú của QC",
                "Phản hồi PH",
                "",
              ].map((h, i, a) => (
                <th
                  key={h}
                  className={
                    /* cột thao tác cuối bảng: đóng băng bên phải để ở laptop hẹp
                       nút Giao bài không bị cắt mất */
                    i === a.length - 1
                      ? "sticky right-0 whitespace-nowrap px-[12px] py-[10px] text-left text-[12.5px] font-semibold"
                      : "whitespace-nowrap px-[12px] py-[10px] text-left text-[12.5px] font-semibold"
                  }
                  style={i === a.length - 1 ? { background: TH_BG } : undefined}
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
                  {/* PROD có avatar ở MỌI chỗ hiện tên người (ảnh P02) — giữ nút bấm,
                      bọc avatar vào trong để không mất đường mở hồ sơ em. */}
                  <td className="max-w-[240px] px-[12px] py-[10px]">
                    <button
                      type="button"
                      onClick={() => onOpenStudent(s)}
                      className="max-w-full font-medium hover:underline"
                      style={{ color: NAVY }}
                    >
                      <Person name={s.name} size={24} />
                    </button>
                    {/* Ở bảng này TÊN đã bấm mở hồ sơ rồi — mã HS để chữ thường,
                        không cần hai đường vào cùng một nơi trên một dòng. */}
                    <span className="ml-[31px] block text-[11.5px] tabular-nums" style={{ color: INK3 }}>
                      {s.code}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-[12px]">
                    <span
                      className="rounded-full px-[8px] py-[2px] text-[11.5px]"
                      style={STATE_STYLE[s.state] ?? { background: "#f0f2f6", color: INK2 }}
                    >
                      {s.state}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-[12px] text-[12px]" style={{ color: INK2 }}>
                    {/* PROD hiện chip cho CẢ HAI loại (ảnh P02) — trước đây em "Mới"
                        để trống nên không phân biệt được với ô chưa có dữ liệu. */}
                    <span
                      className="rounded-[4px] px-[7px] py-[2px]"
                      style={
                        s.kind === "Quay lại"
                          ? { border: `1px solid #cfe3d6`, color: OK }
                          : { border: `1px solid #dfe3ea`, color: INK2 }
                      }
                    >
                      {s.kind}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-[12px] tabular-nums" style={{ color: INK2 }}>
                    {s.joinedAt}
                  </td>
                  <td className="whitespace-nowrap px-[12px] tabular-nums" style={{ color: INK2 }}>
                    {s.phone}
                  </td>
                  <td className="whitespace-nowrap px-[12px]">
                    <span className="mr-[8px] tabular-nums">
                      nộp {s.submitted}/{s.assigned}
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
                    <span className="line-clamp-2" title={s.note || undefined}>{s.note || "—"}</span>
                  </td>
                  <td
                    className="max-w-[210px] px-[12px]"
                    style={{ color: s.parentFeedback ? INK : INK3 }}
                  >
                    <span className="line-clamp-2" title={s.parentFeedback || undefined}>{s.parentFeedback || "—"}</span>
                  </td>
                  <td
                    className="sticky right-0 whitespace-nowrap px-[12px] py-[8px]"
                    style={{
                      background: i % 2 ? "#f5f8fc" : "#fff",
                      boxShadow: "-1px 0 0 0 rgba(20,28,56,0.10)",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => onOpenAssign(s)}
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

/** Trạng thái giao bài của một buổi — dùng CHỮ chứ không phải chấm tròn,
 *  vì một chấm màu không nói được "chưa giao" hay "buổi chưa tới". */
function Dot({ on }: { on: boolean | null }) {
  if (on === null)
    return (
      <span className="text-[12px]" style={{ color: INK3 }}>
        chưa tới
      </span>
    );
  return (
    <span
      className="inline-block rounded-[4px] px-[8px] py-[2px] text-[12px]"
      style={
        on
          ? { background: "#e6f5ec", color: OK }
          : { background: "#fdecea", color: DANGER, fontWeight: 600 }
      }
    >
      {on ? "đã giao" : "chưa giao"}
    </span>
  );
}

function TabSessions({ row, onAssign }: { row: ClassRow; onAssign: () => void }) {
  useOverrides();
  const nav = useNavigate();
  const { ask } = useAction();
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

      <div className="cec-scroll overflow-x-auto rounded-[8px] bg-white" style={{ border: `1px solid ${LINE}` }}>
        {/* Định chiều rộng cột — bảng thứ BA dính cùng lỗi này. Không có colgroup
            thì ở laptop/tablet cột "Phòng" bị bóp, giá trị "Chưa xếp" vỡ 2 dòng. */}
        <table className="border-collapse text-[13px]" style={{ minWidth: 1040, width: "100%" }}>
          <colgroup>
            {[64, 128, 116, 112, 190, 190, 124, 116, 132].map((w, i) => (
              <col key={i} style={{ width: w }} />
            ))}
          </colgroup>
          <thead>
            <tr style={{ background: TH_BG, color: TH_FG, borderBottom: `1px solid ${TH_LINE}` }}>
              {["Buổi", "Ngày", "Giờ", "Phòng", "Giáo viên", "Trợ giảng", "Phiếu buổi", "Đã giao bài", ""].map((h, i) => (
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
                <td className="truncate px-[12px]" style={{ color: INK2 }} title={s.room}>{s.room}</td>
                <td className="max-w-[190px] px-[12px]"><Person name={s.teacher} /></td>
                <td className="max-w-[190px] px-[12px]" style={{ color: s.ta ? INK : INK3 }}>
                  {s.ta ? <Person name={s.ta} /> : "—"}
                </td>
                {/* Phiếu nhận xét buổi: GV/TA điền, QC DUYỆT. Không có cột này thì QC
                    không biết còn phiếu nào phải đòi — PROD gọi là "Lesson Report". */}
                <td className="px-[12px]"><PhieuBuoi st={s.report} /></td>
                <td className="px-[12px]"><Dot on={s.homework} /></td>
                <td className="whitespace-nowrap px-[12px] py-[8px]">
                  {/* `pending` là việc của CHÍNH QC — đúng chỗ cần bấm nhất mà trước
                      không có nút, phải vòng qua /queue/phieu mới duyệt được. */}
                  {s.past && s.report === "pending" && (
                    <button
                      type="button"
                      onClick={() => nav({ to: "/queue/phieu" })}
                      className="mr-[6px] rounded-[6px] px-[10px] py-[5px] text-[12px] font-semibold"
                      style={{ border: `1px solid ${LINE}`, color: NAVY }}
                    >
                      Duyệt
                    </button>
                  )}
                  {s.past && s.report === "draft" && (
                    <button
                      type="button"
                      disabled={daNhac(`phieu-${row.id}-${s.no}`)}
                      onClick={() =>
                        ask({
                          title: `Đòi phiếu nhận xét buổi ${s.no}`,
                          body: `Gửi lời nhắc tới ${s.teacher}${s.ta ? ` và ${s.ta}` : ""} về phiếu nhận xét buổi ${s.no} ngày ${s.date}.`,
                          confirmLabel: "Gửi lời nhắc",
                          doneText: `Đã nhắc ${s.teacher} nộp phiếu buổi ${s.no}.`,
                          run: () => markReminded(`phieu-${row.id}-${s.no}`),
                        })
                      }
                      className="mr-[6px] rounded-[6px] px-[10px] py-[5px] text-[12px] font-semibold"
                      style={{
                        border: `1px solid ${LINE}`,
                        color: daNhac(`phieu-${row.id}-${s.no}`) ? INK3 : WARN,
                        cursor: daNhac(`phieu-${row.id}-${s.no}`) ? "default" : "pointer",
                      }}
                    >
                      {daNhac(`phieu-${row.id}-${s.no}`) ? "Đã nhắc" : "Đòi phiếu"}
                    </button>
                  )}
                  {s.past && !s.homework && (
                    <button
                      type="button"
                      onClick={onAssign}
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

/** Phiếu nhận xét buổi — ba trạng thái, không phải hai.
 *  QC cần phân biệt "GV chưa gửi" (đi đòi) với "đang chờ tôi duyệt" (tự làm). */
function PhieuBuoi({ st }: { st: "draft" | "pending" | "approved" | null }) {
  if (st === null) return <span style={{ color: INK3 }}>—</span>;
  const m = {
    draft: { t: "chưa gửi", bg: "#fdecea", fg: DANGER },
    pending: { t: "chờ tôi duyệt", bg: "#fdf3e7", fg: WARN },
    approved: { t: "đã duyệt", bg: "#e6f5ec", fg: OK },
  }[st];
  return (
    <span className="whitespace-nowrap rounded-[5px] px-[8px] py-[3px] text-[11.5px] font-medium"
      style={{ background: m.bg, color: m.fg }}>
      {m.t}
    </span>
  );
}

/**
 * Trạng thái BÀI GIAO — khác hẳn trạng thái ĐỀ, không được gộp.
 *   Bài giao : Đang mở · Đã đóng · Quá hạn   (nói về cả bài, chung cho lớp)
 *   Đề       : Đã xuất bản · Nháp · v2        (nói về đề)
 * Một bài có thể ĐÃ ĐÓNG mà vẫn còn em chưa nộp — hai thông tin cùng hiện được.
 */
function trangThaiBai(due: string, submitted: number, total: number) {
  const qua = soNgayToi(due);
  if (submitted >= total && total > 0)
    return { nhan: "Đã đóng", bg: "#eef1f7", fg: INK2, quaNgay: 0 };
  if (qua !== null && qua > 0)
    return { nhan: "Quá hạn", bg: "#fdecea", fg: DANGER, quaNgay: qua };
  return { nhan: "Đang mở", bg: "#e6f5ec", fg: OK, quaNgay: 0 };
}

/**
 * Tab Kết quả — hai chế độ xem.
 *
 * "Theo buổi" là ma trận HS x buổi đã có. "Duyệt cả lớp" là màn cuối tháng:
 * lớp 9 em mà mở 9 lần thì mất cả buổi, nên gom về một chỗ có ba cờ để QC
 * chỉ phải đọc kỹ thẻ vàng và đỏ.
 */
function KetQua(props: {
  row: ClassRow;
  openNoteKey?: string | undefined;
  openMonthKey?: string | undefined;
  onOpenNote: (key: string | null) => void;
  onOpenMonth: (key: string | null) => void;
}) {
  const { row } = props;
  const [cheDo, setCheDo] = useState<"buoi" | "thang">("buoi");

  /* Tháng có báo cáo — lấy từ chính dữ liệu, không bịa danh sách */
  const thangCo = useMemo(() => {
    const ra = new Set<string>();
    for (const s of STUDENTS[row.id] ?? [])
      for (const m of MONTHLY[s.id] ?? []) ra.add(m.month);
    return [...ra].sort((a, b) => {
      const [ma, ya] = a.split("/");
      const [mb, yb] = b.split("/");
      return Number(yb) * 100 + Number(mb) - (Number(ya) * 100 + Number(ma));
    });
  }, [row.id]);
  const [thang, setThang] = useState(thangCo[0] ?? "");

  return (
    <div className="flex flex-col gap-[12px]">
      <div className="flex flex-wrap items-center gap-[8px] text-[12.5px]">
        <span className="flex rounded-[6px] p-[2px]" style={{ background: "#eef0f5" }}>
          {(["buoi", "thang"] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCheDo(c)}
              className="rounded-[5px] px-[11px] py-[5px]"
              style={{
                background: cheDo === c ? "#fff" : "transparent",
                fontWeight: cheDo === c ? 600 : 400,
                color: cheDo === c ? INK : INK2,
                boxShadow: cheDo === c ? "0 1px 2px rgba(20,28,56,0.10)" : undefined,
              }}
            >
              {c === "buoi" ? "Điểm theo buổi" : "Báo cáo tháng — duyệt cả lớp"}
            </button>
          ))}
        </span>
        {cheDo === "thang" && thangCo.length > 0 && (
          <select
            value={thang}
            onChange={(e) => setThang(e.target.value)}
            className="rounded-[6px] px-[10px] py-[6px] text-[12.5px]"
            style={{ border: `1px solid #d9dde5`, background: "#fff", color: INK }}
          >
            {thangCo.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        )}
      </div>

      {cheDo === "buoi" ? (
        <ResultMatrix {...props} />
      ) : thangCo.length === 0 ? (
        <p className="rounded-[10px] bg-white py-[36px] text-center text-[13px]"
          style={{ border: `1px solid ${LINE}`, color: INK3 }}>
          Lớp này chưa có báo cáo tháng nào.
        </p>
      ) : (
        <MonthlyBatch row={row} month={thang} />
      )}
    </div>
  );
}

/* ---------- tab Bài tập ---------- */

function TabAssignments({ row, onAssign }: { row: ClassRow; onAssign: () => void }) {
  const { ask } = useAction();
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
          onClick={onAssign}
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
        /* Em chưa nộp phải DẪN XUẤT từ chính số bài của em (assigned > submitted),
           KHÔNG được lấy N em đầu danh sách — tên này dùng để gửi tin nhắn nhắc,
           lấy nhầm là nhắc trúng em đã nộp còn em nợ thật thì không ai nhắc. */
        const late = students
          .filter((s) => s.assigned - s.submitted > 0)
          .slice(0, missing)
          .map((s) => s.name);
        return (
          <div key={a.id} className="rounded-[8px] bg-white px-[16px] py-[13px]" style={{ border: `1px solid ${LINE}` }}>
            <div className="flex flex-wrap items-center gap-[12px]">
              <span className="text-[13.5px] font-semibold">{a.title}</span>
              {/* Trạng thái BÀI GIAO — cột riêng, không gộp với trạng thái đề */}
              {(() => {
                const tt = trangThaiBai(a.due, a.submitted, a.total);
                return (
                  <span
                    className="shrink-0 rounded-[5px] px-[8px] py-[2px] text-[11.5px] font-medium"
                    style={{ background: tt.bg, color: tt.fg }}
                    title={tt.quaNgay ? `Quá hạn ${tt.quaNgay} ngày` : undefined}
                  >
                    {tt.nhan}
                    {tt.quaNgay > 0 ? ` ${tt.quaNgay} ngày` : ""}
                  </span>
                );
              })()}
              <span className="text-[12px]" style={{ color: INK3 }}>
                Buổi {a.session} · giao {a.assigned} · hạn {a.due}
              </span>
              <span className="flex-1" />
              <span className="text-[12.5px] tabular-nums">{a.submitted}/{a.total} nộp</span>
              <Bar value={a.total ? a.submitted / a.total : 0} />
              <span className="shrink-0 text-[12px] tabular-nums" style={{ color: INK3 }}>
                chấm {a.graded}/{a.submitted}
              </span>
              {/* Chưa chấm bài nào thì hiện "—  chưa chấm", KHÔNG hiện 0 —
                  số 0 làm QC tưởng cả lớp được 0 điểm. */}
              {a.avg !== null ? (
                <span className="text-[12.5px] font-semibold tabular-nums" style={{ color: a.avg >= 7 ? OK : WARN }}>
                  TB {a.avg.toFixed(1)}
                </span>
              ) : (
                <span className="text-[12px]" style={{ color: INK3 }}>
                  TB — <span className="text-[11.5px]">chưa chấm</span>
                </span>
              )}
            </div>

            {/* Hàng việc cần xử lý — LUÔN có mặt để mọi thẻ cùng chiều cao.
                Trước đây chỉ hiện khi có việc nên thẻ so le, mắt phải quét lại từ đầu. */}
            <div
              className="mt-[10px] flex flex-wrap items-center gap-[10px] pt-[10px]"
              style={{ borderTop: "1px solid #f1f3f7", minHeight: 34 }}
            >
              {missing > 0 ? (
                <>
                  <span className="shrink-0 text-[12.5px]" style={{ color: DANGER }}>
                    {missing} em chưa nộp
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[12px]" style={{ color: INK2 }}>
                    {late.join(" · ")}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      ask({
                        title: `Nhắc ${missing} em nộp bài`,
                        body: (
                          <>
                            Gửi lời nhắc cho <strong>{missing} em</strong> chưa nộp bài{" "}
                            <strong>{a.title}</strong>: {late.join(" · ")}
                          </>
                        ),
                        confirmLabel: `Gửi cho ${missing} em`,
                        doneText: `Đã gửi lời nhắc tới ${missing} em.`,
                      })
                    }
                    className="shrink-0 rounded-[6px] px-[10px] py-[5px] text-[12px] font-semibold"
                    style={{ border: `1px solid ${LINE}`, color: NAVY }}
                  >
                    Nhắc {missing} em
                  </button>
                </>
              ) : (
                <>
                  <span className="shrink-0 text-[12.5px]" style={{ color: OK }}>
                    Cả lớp đã nộp đủ
                  </span>
                  <span className="flex-1" />
                </>
              )}

              {ungraded > 0 ? (
                <>
                  <span className="shrink-0 text-[12.5px]" style={{ color: WARN }}>
                    {ungraded} bài chờ chấm
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      ask({
                        title: "Mở màn chấm bài",
                        body: (
                          <>
                            Bài <strong>{a.title}</strong> còn <strong>{ungraded} bài</strong> chờ chấm.
                            Màn chấm bài đang được dựng — sẽ mở thẳng danh sách bài của các em.
                          </>
                        ),
                        confirmLabel: "Đã hiểu",
                        doneText: "Màn chấm bài sẽ có ở đợt sau.",
                      })
                    }
                    className="shrink-0 rounded-[6px] px-[10px] py-[5px] text-[12px] font-semibold text-white"
                    style={{ background: NAVY }}
                  >
                    Chấm bài
                  </button>
                </>
              ) : (
                <span className="shrink-0 text-[12.5px]" style={{ color: INK3 }}>
                  đã chấm xong
                </span>
              )}
            </div>
          </div>
        );
      })}
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

/* ---------- dải thông tin lớp (bám theo PROD) ---------- */

/** thẻ một người phụ trách — có nút gỡ, giống PROD cho sửa ngay tại chỗ */
function PersonChip({ name }: { name: string }) {
  const parts = name.trim().split(/\s+/);
  const ini = ((parts[0]?.[0] ?? "") + (parts.at(-1)?.[0] ?? "")).toUpperCase();
  const bg = ["#2b3f7a", "#1f6f4a", "#8a5a10", "#6b2fa0", "#136d5e", "#a03c3c"][
    [...name].reduce((a, c) => a + c.charCodeAt(0), 0) % 6
  ];
  return (
    <span
      className="inline-flex items-center gap-[6px] rounded-full bg-white py-[3px] pl-[3px] pr-[7px] text-[12.5px]"
      style={{ border: `1px solid ${LINE}` }}
    >
      <span
        className="grid h-[19px] w-[19px] place-items-center rounded-full text-[9.5px] font-semibold text-white"
        style={{ background: bg }}
      >
        {ini}
      </span>
      <span className="max-w-[132px] truncate">{name}</span>
    </span>
  );
}

/* Đã bỏ nút thêm/gỡ nhân sự: gán giáo viên không thuộc việc QC, và đặt nút ×
   ngay cạnh tên người thì bấm nhầm là gỡ giáo viên khỏi lớp thật. */

/** Viết tắt vai trò — người mới vào không đoán được EC là gì, nên có chú giải */
const ROLE_HINT: Record<string, string> = {
  GV: "Giáo viên đứng lớp",
  QC: "Người phụ trách lớp — theo sát tiến độ học sinh",
  EC: "Người chăm sóc khách hàng — học phí, hợp đồng",
};

function Role({ label, people }: { label: string; people: (string | null)[] }) {
  const list = people.filter((x): x is string => !!x);
  return (
    <span className="flex flex-wrap items-center gap-[6px]">
      <span
        className="text-[11.5px] font-semibold"
        style={{ color: INK3, cursor: "help", borderBottom: `1px dotted ${INK3}` }}
        title={ROLE_HINT[label]}
      >
        {label}
      </span>
      {list.length ? (
        list.map((n) => <PersonChip key={n} name={n} />)
      ) : (
        <span className="text-[12.5px]" style={{ color: DANGER }}>
          chưa gán
        </span>
      )}
    </span>
  );
}

function ClassMeta({ row, stats }: { row: ClassRow; stats: Stats }) {
  const sessions = SESSIONS[row.id] ?? [];
  const done = sessions.filter((x) => x.past).length;
  const pct = sessions.length ? Math.round((done / sessions.length) * 100) : 0;
  /** giờ học quy từ số buổi — mỗi buổi 1,5 giờ theo mã giáo trình CEC */
  const H = 1.5;

  return (
    <div
      className="flex flex-col gap-[10px] rounded-[8px] bg-white px-[14px] py-[11px]"
      style={{ border: `1px solid ${LINE}` }}
    >
      <div className="flex flex-wrap items-center gap-x-[16px] gap-y-[8px]">
        <span className="flex items-center gap-[7px] text-[12.5px]" style={{ color: INK2 }}>
          <IconCalendarCheck size={14} />
          bắt đầu <strong style={{ color: INK }}>{row.start}</strong>
          <span style={{ color: LINE }}>|</span>
          kết thúc <strong style={{ color: INK }}>{row.end}</strong>
        </span>
        <span className="text-[12.5px]" style={{ color: INK2 }}>
          {row.schedule ?? <span style={{ color: DANGER }}>Chưa cấu hình lịch học</span>}
        </span>

        <span className="flex-1" />

        <span className="flex items-center gap-[9px]">
          <span className="text-[11.5px] font-semibold uppercase tracking-wide" style={{ color: INK3 }}>
            Tiến độ
          </span>
          <span className="h-[6px] w-[132px] overflow-hidden rounded-full" style={{ background: "#eef0f5" }}>
            <span className="block h-full rounded-full" style={{ width: `${pct}%`, background: NAVY }} />
          </span>
          <span className="text-[12.5px] font-semibold tabular-nums" style={{ color: INK }}>
            {pct}%
          </span>
        </span>
        <span className="flex items-center gap-[6px] rounded-[6px] px-[9px] py-[4px] text-[12.5px]" style={{ background: "#f4f6fa", color: INK }}>
          <IconUsers size={14} />
          <strong className="tabular-nums">{stats.students.length}</strong> học viên
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-x-[16px] gap-y-[8px]">
        <span className="text-[12.5px]" style={{ color: INK2 }}>
          Đã học <strong style={{ color: INK }}>{(done * H).toFixed(1)} giờ</strong> / tổng{" "}
          <strong style={{ color: INK }}>{(sessions.length * H).toFixed(1)} giờ</strong>
          {" · "}còn {((sessions.length - done) * H).toFixed(1)}h
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-x-[18px] gap-y-[8px]" style={{ borderTop: `1px solid ${LINE}`, paddingTop: 10 }}>
        <Role label="GV" people={[row.teacher]} />
        <Role label="QC" people={[row.qc]} />
        <Role label="EC" people={[row.ec]} />
      </div>

      {row.note && (
        <p className="text-[12.5px]" style={{ color: INK2 }}>
          <span style={{ color: INK3 }}>Ghi chú lớp: </span>
          {row.note}
        </p>
      )}
    </div>
  );
}

/* ---------- khung ---------- */

export function ClassWorkspace({
  row,
  tab,
  onTab,
  onBack,
  openStudentId,
  onOpenStudent,
  openNoteKey,
  openMonthKey,
  onOpenNote,
  onOpenMonth,
  openAssign,
  onCloseAssign,
  assignStudentId,
}: {
  row: ClassRow;
  /** tab hiện tại do URL quyết định — để F5 và nút Back của trình duyệt chạy đúng */
  tab: Tab;
  onTab: (t: Tab) => void;
  onBack: () => void;
  /** id học sinh đang mở hồ sơ, lấy từ URL */
  openStudentId?: string | undefined;
  onOpenStudent: (id: string | null) => void;
  /** nhận xét buổi và báo cáo tháng đang mở, cũng lấy từ URL */
  openNoteKey?: string | undefined;
  openMonthKey?: string | undefined;
  onOpenNote: (key: string | null) => void;
  onOpenMonth: (key: string | null) => void;
  /** mở sẵn modal giao bài — dùng khi bấm "Giao bài" từ màn xuyên lớp */
  openAssign?: boolean;
  onCloseAssign?: () => void;
  /** giao riêng cho một em: mở modal ở chế độ "Chọn học sinh", chọn sẵn em này */
  assignStudentId?: string | undefined;
}) {
  const [assignOpenLocal, setAssignOpen] = useState(false);
  /* giao riêng cho một em: giữ id để modal mở đúng chế độ "Chọn học sinh" */
  const [assignFor, setAssignFor] = useState<string | null>(null);
  const assignOpen = assignOpenLocal || !!openAssign || !!assignFor;
  const stats = useStats(row);
  const { ask } = useAction();

  /* Hồ sơ học sinh nằm trên URL (?hs=...) chứ không phải state nội bộ,
     để F5 giữ nguyên chỗ đang xem và nút Back quay về đúng bảng học sinh. */
  const openStudent = openStudentId
    ? (stats.students.find((x) => x.id === openStudentId) ?? null)
    : null;

  if (openStudent)
    return (
      <>
        <StudentProfile
          student={openStudent}
          row={row}
          onBack={() => onOpenStudent(null)}
          onAssign={(sid) => setAssignFor(sid)}
        />
        {/* Modal phải vẽ NGAY TRONG nhánh này — hàm return sớm ở đây nên modal
            đặt dưới cuối component sẽ không bao giờ hiện khi đang xem hồ sơ HS. */}
        {assignFor && (
          <AssignDialog from={row} studentId={assignFor} onClose={() => setAssignFor(null)} />
        )}
      </>
    );

  /* Số việc còn tồn từng tab — dẫn xuất từ dữ liệu thật, không đếm rời */
  const viecTon = useMemo<Partial<Record<Tab, number>>>(() => {
    const hs = STUDENTS[row.id] ?? [];
    const buoi = SESSIONS[row.id] ?? [];
    const bai = ASSIGNMENTS[row.id] ?? [];

    /* Học sinh: em cần chú ý (nợ bài / điểm thấp / vắng nhiều) */
    const canChuY = hs.filter((s) => s.state === "Đang học" && isAtRisk(s)).length;

    /* Lịch học: buổi đã dạy mà GV chưa gửi phiếu — QC phải đi đòi */
    const phieuChuaGui = buoi.filter((b) => b.past && b.report === "draft").length;

    /* Bài tập: bài còn em chưa nộp */
    const baiConNo = bai.filter((a) => a.total - a.submitted > 0).length;

    /* Duyệt bài: bài tự luận AI chấm chờ QC xác nhận */
    const choXacNhan = choDuyetCuaLop(row.id).filter((b) => !daDuyetBai(b.id)).length;

    /* Kết quả: phiếu buổi TA đã gửi, chờ QC duyệt */
    const choDuyetPhieu = (REPORTS[row.id] ?? []).filter(
      (r) => reportStatusOf(r.id, r.status) === "pending",
    ).length;

    return {
      "Học sinh": canChuY,
      "Lịch học": phieuChuaGui,
      "Bài tập": baiConNo,
      "Duyệt bài": choXacNhan,
      "Kết quả": choDuyetPhieu,
    };
  }, [row.id]);

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
            {row.campus} · {row.course} · {row.type}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-[8px]">
          <button
            type="button"
            onClick={() =>
              ask({
                title: "Nhắc học sinh nộp bài",
                body:
                  stats.overdue > 0 ? (
                    <>
                      Lớp <strong>{row.code}</strong> còn <strong>{stats.overdue} bài</strong> chưa nộp.
                      Gửi lời nhắc cho các em còn nợ?
                    </>
                  ) : (
                    <>Lớp {row.code} hiện không em nào nợ bài.</>
                  ),
                confirmLabel: stats.overdue > 0 ? "Gửi lời nhắc" : "Đã hiểu",
                doneText:
                  stats.overdue > 0 ? "Đã gửi lời nhắc tới các em còn nợ bài." : "Không có ai cần nhắc.",
              })
            }
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

      <ClassMeta row={row} stats={stats} />

      <nav className="flex items-end gap-[3px]" style={{ borderBottom: `1px solid ${LINE}` }}>
        {TABS.map((t) => {
          const on = t === tab;
          const n = viecTon[t] ?? 0;
          return (
            <button
              key={t}
              type="button"
              onClick={() => onTab(t)}
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
              {/* Badge chỉ hiện khi CÓ việc — tab "Duyệt bài" đang 16 bài chờ mà
                  nhìn từ ngoài không biết, QC phải mở từng tab mới thấy. */}
              {n > 0 && (
                <span
                  className="ml-[6px] rounded-full px-[6px] py-[1px] text-[11px] font-semibold tabular-nums"
                  style={{ background: on ? NAVY : "#e7ebf3", color: on ? "#fff" : NAVY }}
                >
                  {n}
                </span>
              )}
            </button>
          );
        })}
      </nav>


      {tab === "Học sinh" && <TabStudents
          stats={stats}
          onOpenStudent={(st) => onOpenStudent(st.id)}
          onOpenAssign={(st) => setAssignFor(st.id)}
        />}
      {tab === "Lịch học" && <TabSessions row={row} onAssign={() => setAssignOpen(true)} />}
      {tab === "Bài tập" && <TabAssignments row={row} onAssign={() => setAssignOpen(true)} />}
      {tab === "Kết quả" && (
        <KetQua
          row={row}
          openNoteKey={openNoteKey}
          openMonthKey={openMonthKey}
          onOpenNote={onOpenNote}
          onOpenMonth={onOpenMonth}
        />
      )}
      {tab === "Duyệt bài" && <GradingQueue row={row} />}
      {tab === "Điểm kiểm tra" && <TestResults row={row} />}
      {tab === "Lịch sử" && <TabHistory row={row} />}

      {assignOpen && (
        <AssignDialog
          from={row}
          studentId={assignFor ?? assignStudentId}
          onClose={() => {
            setAssignOpen(false);
            setAssignFor(null);
            onCloseAssign?.();
          }}
        />
      )}
    </div>
  );
}
