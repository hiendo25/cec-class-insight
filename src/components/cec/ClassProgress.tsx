import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CLASSES } from "@/data/classes";
import { STUDENTS } from "@/data/students";
import { ASSIGNMENTS, SESSIONS } from "@/data/sessions";
import { ME } from "@/data/me";
import { IconCheck, IconClipboard, IconSearch, IconWarn } from "./icons";

const NAVY = "#1e2d5c";
const LINE = "#e6e8ee";
const INK = "#1f2430";
const INK2 = "#6b7280";
const INK3 = "#6a7386";
const DANGER = "#d4342c";
const OK = "#1f6f4a";
const WARN = "#b8791c";

import { matchCode, matchWords } from "@/lib/search";

type Row = {
  id: number;
  code: string;
  teacher: string | null;
  students: number;
  /** số bài đã giao cho lớp */
  assigned: number;
  submitted: number;
  total: number;
  grading: number;
  /** buổi đã dạy mà chưa giao bài — việc của QC */
  sessionsNoHw: number;
  owedStudents: number;
};

/**
 * Màn "Tiến độ bài tập theo lớp" — thay cho "Bài tập theo lớp" của PROD.
 *
 * PROD xếp theo mã lớp nên bốn dòng đầu đều là lớp rỗng
 * ("Chưa giao bài · 0 · 0/0 · Chưa gán"). Ở đây xếp theo SỐ VIỆC:
 * lớp nhiều việc nhất lên đầu, xử lý từ trên xuống là hết.
 */
export function ClassProgress() {
  const navigate = useNavigate();
  const [mineOnly, setMineOnly] = useState(true);
  const [todoOnly, setTodoOnly] = useState(true);
  const [q, setQ] = useState("");

  const rows = useMemo<Row[]>(() => {
    return CLASSES.filter((c) => c.status === "Đang diễn ra").map((c) => {
      const list = ASSIGNMENTS[c.id] ?? [];
      const students = (STUDENTS[c.id] ?? []).filter((s) => s.state === "Đang học");
      const sess = SESSIONS[c.id] ?? [];
      return {
        id: c.id,
        code: c.code,
        teacher: c.teacher,
        students: students.length,
        assigned: list.length,
        submitted: list.reduce((a, x) => a + x.submitted, 0),
        total: list.reduce((a, x) => a + x.total, 0),
        grading: list.reduce((a, x) => a + (x.submitted - x.graded), 0),
        sessionsNoHw: sess.filter((s) => s.past && !s.homework).length,
        owedStudents: students.filter((s) => s.assigned - s.submitted > 0).length,
      };
    });
  }, []);

  /** số việc cần xử lý của một lớp — dùng để xếp thứ tự */
  const workload = (r: Row) => r.sessionsNoHw * 2 + r.owedStudents + (r.grading ? 1 : 0);

  const mineRows = mineOnly
    ? rows.filter((r) => CLASSES.find((c) => c.id === r.id)?.qc === ME.name)
    : rows;

  const list = useMemo(() => {
    return mineRows
      .filter((r) => (todoOnly ? workload(r) > 0 : true))
      .filter((r) => !q.trim() || matchCode(r.code, q) || matchWords(r.teacher ?? "", q))
      .sort((a, b) => workload(b) - workload(a) || a.code.localeCompare(b.code));
  }, [mineRows, todoOnly, q]);

  const tongViec = mineRows.filter((r) => workload(r) > 0).length;
  const tongChuaGiao = mineRows.reduce((a, r) => a + r.sessionsNoHw, 0);
  const tongChoCham = mineRows.reduce((a, r) => a + r.grading, 0);

  return (
    <div className="mt-4 flex flex-col gap-[12px]">
      <div
        className="flex flex-wrap items-center gap-x-[14px] gap-y-[8px] rounded-[8px] px-[14px] py-[11px] text-[13px]"
        style={{ background: tongViec ? "#fdf8ef" : "#f1f8f3", border: `1px solid ${tongViec ? "#f0dfc0" : "#cfe3d6"}` }}
      >
        {tongViec ? (
          <span style={{ color: "#7a5410" }}>
            <strong>{tongViec} lớp</strong> đang có việc — {tongChuaGiao} buổi đã dạy chưa giao bài,{" "}
            {tongChoCham} bài chờ chấm.
          </span>
        ) : (
          <span className="flex items-center gap-[7px]" style={{ color: OK }}>
            <IconCheck size={15} /> Các lớp đều đã giao bài đầy đủ.
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-[9px] text-[12.5px]">
        <span
          className="flex items-center gap-[7px] rounded-[6px] bg-white px-[10px] py-[7px]"
          style={{ border: `1px solid #d9dde5`, minWidth: 240 }}
        >
          <IconSearch size={14} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tìm mã lớp hoặc giáo viên"
            className="w-full text-[12.5px] outline-none"
          />
        </span>

        <button
          type="button"
          onClick={() => setMineOnly((v) => !v)}
          className={`cec-btn ${mineOnly ? "cec-btn-primary" : "cec-btn-secondary"}`}
        >
          Lớp của tôi
        </button>

        <button
          type="button"
          onClick={() => setTodoOnly((v) => !v)}
          className="rounded-[6px] px-[11px] py-[7px]"
          style={{
            border: `1px solid ${todoOnly ? WARN : LINE}`,
            background: todoOnly ? "#fdf3e7" : "#fff",
            color: todoOnly ? WARN : INK,
            fontWeight: todoOnly ? 600 : 400,
          }}
        >
          {todoOnly ? "Chỉ lớp có việc" : "Đang xem tất cả lớp"}
        </button>

        <span className="flex-1" />
        <span style={{ color: INK3 }}>
          Hiển thị {list.length}/{mineRows.length} lớp
        </span>
      </div>

      {list.length === 0 ? (
        <p
          className="rounded-[8px] bg-white py-[40px] text-center text-[13px]"
          style={{ border: `1px solid ${LINE}`, color: INK3 }}
        >
          Không có lớp nào khớp bộ lọc.
        </p>
      ) : (
        <div className="cec-scroll overflow-x-auto rounded-[8px] bg-white" style={{ border: `1px solid ${LINE}` }}>
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr style={{ background: NAVY, color: "#fff" }}>
                {["Lớp", "Giáo viên", "Sĩ số", "Việc cần xử lý", "Tình hình nộp", "Chờ chấm", ""].map((h) => (
                  <th key={h} className="whitespace-nowrap px-[12px] py-[10px] text-left text-[12.5px] font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map((r, i) => {
                const rate = r.total ? Math.round((r.submitted / r.total) * 100) : null;
                return (
                  <tr
                    key={r.id}
                    style={{
                      background: i % 2 ? "#f5f8fc" : "#fff",
                      borderLeft: `3px solid ${r.sessionsNoHw ? DANGER : workload(r) ? WARN : "transparent"}`,
                      borderBottom: "1px solid #edeff4",
                    }}
                  >
                    <td className="whitespace-nowrap px-[12px] py-[9px]">
                      <button
                        type="button"
                        onClick={() =>
                          navigate({
                            to: "/class/$classId/$tab",
                            params: { classId: String(r.id), tab: "bai-tap" },
                          })
                        }
                        className="font-medium hover:underline"
                        style={{ color: NAVY }}
                      >
                        {r.code}
                      </button>
                    </td>
                    <td className="whitespace-nowrap px-[12px]" style={{ color: r.teacher ? INK2 : INK3 }}>
                      {r.teacher ?? "Chưa gán"}
                    </td>
                    <td className="px-[12px] tabular-nums" style={{ color: INK2 }}>
                      {r.students}
                    </td>
                    <td className="px-[12px]">
                      <span className="flex flex-wrap items-center gap-[6px]">
                        {r.sessionsNoHw > 0 && (
                          <span
                            className="inline-flex items-center gap-[5px] rounded-[4px] px-[7px] py-[2px] text-[12px] font-medium"
                            style={{ background: "#fdecea", color: DANGER }}
                          >
                            <IconWarn size={12} /> {r.sessionsNoHw} buổi chưa giao bài
                          </span>
                        )}
                        {r.owedStudents > 0 && (
                          <span
                            className="rounded-[4px] px-[7px] py-[2px] text-[12px]"
                            style={{ background: "#fdf3e7", color: WARN }}
                          >
                            {r.owedStudents} em nợ bài
                          </span>
                        )}
                        {workload(r) === 0 && <span style={{ color: OK }}>ổn</span>}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-[12px] tabular-nums" style={{ color: INK2 }}>
                      {r.assigned === 0 ? (
                        <span style={{ color: INK3 }}>chưa giao bài nào</span>
                      ) : (
                        <>
                          {r.submitted}/{r.total} bài{" "}
                          {rate !== null && (
                            <span
                              className="ml-[8px]"
                              style={{ color: rate >= 80 ? OK : rate >= 50 ? WARN : DANGER }}
                            >
                              {rate}%
                            </span>
                          )}
                        </>
                      )}
                    </td>
                    <td className="px-[12px] tabular-nums" style={{ color: r.grading ? WARN : INK3 }}>
                      {r.grading || ""}
                    </td>
                    <td className="whitespace-nowrap px-[12px] py-[7px]">
                      <button
                        type="button"
                        className="flex items-center gap-[5px] rounded-[6px] px-[9px] py-[5px] text-[12px]"
                        style={{ border: `1px solid ${LINE}`, color: NAVY }}
                      >
                        <IconClipboard size={13} /> Giao bài
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-[12px]" style={{ color: INK3 }}>
        Lớp nhiều việc nhất xếp lên đầu — xử lý từ trên xuống là hết việc trong ngày.
      </p>
    </div>
  );
}
