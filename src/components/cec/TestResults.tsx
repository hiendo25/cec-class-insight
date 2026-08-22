import { useMemo, useState } from "react";
import { TH_BG, TH_FG, TH_LINE, NAVY, LINE, INK, INK2, INK3, OK, WARN, DANGER } from "@/data/const";
import { useNavigate } from "@tanstack/react-router";
import type { ClassRow } from "@/data/classes";
import { STUDENTS } from "@/data/students";
import { SCORES, TESTS } from "@/data/tests";
import { IconCheck, IconWarn } from "./icons";


const tone = (v: number) =>
  v >= 8 ? { bg: "#e6f5ec", fg: OK } : v >= 6.5 ? { bg: "#eaf1fb", fg: "#2b3f7a" }
    : v >= 5 ? { bg: "#fdf3e7", fg: WARN } : { bg: "#fdecea", fg: DANGER };

/**
 * Điểm kiểm tra định kỳ — gộp hai tab của app cũ vào một màn:
 *   TEST AND EXAM SCHEDULE (lịch thi) + EXAM RESULT (bảng điểm).
 *
 * Tách hai tab như app cũ bắt QC nhảy qua lại để trả lời một câu hỏi của phụ
 * huynh ("con thi hôm nào, được mấy điểm"). Ở đây một bảng trả lời cả hai.
 */
export function TestResults({ row }: { row: ClassRow }) {
  const navigate = useNavigate();
  const tests = TESTS[row.id] ?? [];
  const students = STUDENTS[row.id] ?? [];
  const [chiDangHoc, setChiDangHoc] = useState(true);

  const list = useMemo(
    () => (chiDangHoc ? students.filter((s) => s.state === "Đang học") : students),
    [students, chiDangHoc],
  );

  if (!tests.length)
    return (
      <p className="py-[40px] text-center text-[13px]" style={{ color: INK3 }}>
        Lớp chưa có bài kiểm tra định kỳ nào trong lịch.
      </p>
    );

  const daBoBot = students.length - list.length;
  const daThi = tests.filter((t) => t.daThi);
  const sapThi = tests.filter((t) => !t.daThi);

  /* trung bình một em qua các bài đã thi */
  const tbCua = (sid: string) => {
    const m = SCORES[sid] ?? {};
    const d = daThi.map((t) => m[t.id]).filter((x): x is number => typeof x === "number");
    return d.length ? +(d.reduce((a, b) => a + b, 0) / d.length).toFixed(1) : null;
  };

  const tbLop = (t: string) => {
    const d = list.map((s) => SCORES[s.id]?.[t]).filter((x): x is number => typeof x === "number");
    return d.length ? +(d.reduce((a, b) => a + b, 0) / d.length).toFixed(1) : null;
  };

  return (
    <div className="flex flex-col gap-[12px]">
      {/* bài sắp thi — QC cần báo phụ huynh trước */}
      {sapThi.length > 0 && (
        <div
          className="flex flex-wrap items-center gap-x-[14px] gap-y-[6px] rounded-[8px] px-[14px] py-[10px] text-[12.5px]"
          style={{ background: "#eef1f7", border: "1px solid #dde2ec", color: NAVY }}
        >
          <strong>Sắp thi:</strong>
          {sapThi.map((t) => (
            <span key={t.id}>
              {t.ten} · buổi {t.buoi} · {t.ngay}
            </span>
          ))}
          <span className="flex-1" />
          <span style={{ color: INK2 }}>Nhớ báo phụ huynh trước ngày thi.</span>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-[10px] text-[12.5px]">
        {/* Bộ lọc này BẬT SẴN nên phải nói thẳng là bảng đang loại bao nhiêu em —
            nếu không QC đọc "Trung bình lớp" cho phụ huynh mà không biết số đó
            đã bỏ 2 em, và con số trông hoàn toàn hợp lý. */}
        <button
          type="button"
          onClick={() => setChiDangHoc((v) => !v)}
          className="rounded-[6px] px-[11px] py-[6px]"
          style={{
            border: `1px solid ${chiDangHoc ? NAVY : LINE}`,
            background: chiDangHoc ? "#eef1f7" : "#fff",
            color: chiDangHoc ? NAVY : INK,
            fontWeight: chiDangHoc ? 600 : 400,
          }}
        >
          {chiDangHoc ? "✓ Chỉ em đang học" : "Đang xem cả em đã nghỉ"}
        </button>
        <span style={{ color: INK3 }}>
          {daThi.length} bài đã thi · {sapThi.length} bài sắp thi
        </span>
        <span style={{ color: daBoBot > 0 ? WARN : INK3, fontWeight: daBoBot > 0 ? 600 : 400 }}>
          {daBoBot > 0
            ? `Bảng đang tính trên ${list.length}/${students.length} em — đã bỏ ${daBoBot} em bảo lưu hoặc đã nghỉ`
            : `${list.length} học sinh`}
        </span>
      </div>

      <div className="cec-scroll overflow-x-auto rounded-[8px] bg-white" style={{ border: `1px solid ${LINE}` }}>
        {/* w-full để lớp ít bài không bỏ trống nửa màn bên phải */}
        <table className="w-full border-collapse text-[12.5px]">
          <thead>
            <tr style={{ background: TH_BG, color: TH_FG, borderBottom: `1px solid ${TH_LINE}` }}>
              <th
                className="sticky left-0 z-[3] whitespace-nowrap px-[12px] py-[9px] text-left text-[12.5px] font-semibold"
                style={{ background: TH_BG, width: 200, minWidth: 200, maxWidth: 200 }}
              >
                Học sinh
              </th>
              {tests.map((t) => (
                <th
                  key={t.id}
                  className="whitespace-nowrap px-[9px] py-[9px] text-center text-[11.5px] font-medium"
                  style={{ minWidth: 104, opacity: t.daThi ? 1 : 0.66 }}
                  title={`${t.ten} · buổi ${t.buoi} · ${t.ngay} · ${t.testType} · ${t.category}`}
                >
                  {t.ten}
                  <br />
                  <span style={{ opacity: 0.75 }}>
                    buổi {t.buoi} · {t.ngay.split("/").slice(0, 2).join("/")}
                  </span>
                </th>
              ))}
              <th className="whitespace-nowrap px-[10px] py-[9px] text-center text-[11.5px] font-semibold" style={{ background: TH_BG, minWidth: 74 }}>
                TB
              </th>
            </tr>
          </thead>
          <tbody>
            {list.map((s, i) => {
              const bg = i % 2 ? "#f5f8fc" : "#fff";
              const tb = tbCua(s.id);
              return (
                <tr key={s.id} style={{ borderBottom: "1px solid #edeff4" }}>
                  <td
                    className="sticky left-0 z-[2] px-[12px] py-[7px]"
                    style={{ background: bg, width: 200, minWidth: 200, maxWidth: 200, boxShadow: "1px 0 0 0 rgba(20,28,56,0.10)" }}
                  >
                    <span className="block truncate font-medium" style={{ color: INK }}>{s.name}</span>
                    <span className="text-[11px] tabular-nums" style={{ color: INK3 }}>{s.code}</span>
                  </td>
                  {tests.map((t) => {
                    const v = SCORES[s.id]?.[t.id];
                    if (!t.daThi)
                      return <td key={t.id} className="px-[6px] text-center" style={{ background: bg, color: INK3 }}>—</td>;
                    if (v === null)
                      return (
                        <td key={t.id} className="px-[6px] text-center" style={{ background: bg }}>
                          <span className="rounded-[5px] px-[7px] py-[3px] text-[11.5px] italic" style={{ background: "#eceef3", color: INK2 }}>
                            vắng
                          </span>
                        </td>
                      );
                    if (v === undefined)
                      return <td key={t.id} className="px-[6px] text-center" style={{ background: bg, color: INK3 }}>—</td>;
                    const c = tone(v);
                    return (
                      <td key={t.id} className="px-[6px] py-[5px] text-center" style={{ background: bg }}>
                        <span
                          className="inline-block min-w-[46px] rounded-[5px] px-[7px] py-[3px] font-semibold tabular-nums"
                          style={{ background: c.bg, color: c.fg }}
                        >
                          {v.toFixed(1)}
                        </span>
                      </td>
                    );
                  })}
                  <td
                    className="px-[10px] text-center font-semibold tabular-nums"
                    style={{ background: "#f8f9fc", color: tb === null ? INK3 : tone(tb).fg }}
                  >
                    {tb === null ? "—" : tb.toFixed(1)}
                  </td>
                </tr>
              );
            })}

            {/* trung bình lớp từng bài — để QC biết em tụt so với lớp hay cả lớp cùng khó */}
            <tr style={{ background: "#eef1f7", borderTop: `2px solid ${LINE}` }}>
              <td
                className="sticky left-0 z-[2] px-[12px] py-[8px] font-semibold"
                style={{ background: "#eef1f7", width: 200, minWidth: 200, maxWidth: 200, color: NAVY, boxShadow: "1px 0 0 0 rgba(20,28,56,0.10)" }}
              >
                Trung bình lớp
                <span className="ml-[6px] text-[11px] font-normal" style={{ color: INK2 }}>
                  ({list.length} em)
                </span>
              </td>
              {tests.map((t) => (
                <td key={t.id} className="px-[6px] text-center font-semibold tabular-nums" style={{ color: NAVY }}>
                  {t.daThi ? (tbLop(t.id)?.toFixed(1) ?? "—") : "—"}
                </td>
              ))}
              <td style={{ background: "#e4e9f3" }} />
            </tr>
          </tbody>
        </table>
      </div>

      {/* lịch thi kèm đề dùng — nối về kho đề */}
      <section className="rounded-[8px] bg-white" style={{ border: `1px solid ${LINE}` }}>
        <div className="px-[14px] pb-[8px] pt-[11px] text-[13px] font-semibold" style={{ color: INK }}>
          Lịch kiểm tra và đề dùng
          <span className="ml-[8px] text-[12px] font-normal" style={{ color: INK3 }}>
            — buổi nào thi, nhóm bài gì, dạng gì, dùng đề nào
          </span>
        </div>
        {tests.map((t) => (
          <div
            key={t.id}
            className="flex flex-wrap items-center gap-x-[12px] gap-y-[4px] px-[14px] py-[8px] text-[12.5px]"
            style={{ borderTop: `1px solid ${LINE}` }}
          >
            <span className="w-[150px] shrink-0 font-medium" style={{ color: INK }}>{t.ten}</span>
            <span className="w-[128px] shrink-0 tabular-nums" style={{ color: INK2 }}>
              buổi {t.buoi} · {t.ngay}
            </span>
            {/* App cũ tách hai thứ: Test category (nhóm bài) và Test type (dạng bài).
                Gộp làm một thì QC không lọc được "cho tôi xem mọi bài Summative". */}
            <span className="shrink-0 rounded-[4px] px-[7px] py-[1px] text-[11.5px]" style={{ background: "#eef1f7", color: NAVY }}>
              {t.category}
            </span>
            <span className="shrink-0 rounded-[4px] px-[7px] py-[1px] text-[11.5px]" style={{ background: "#f0f2f6", color: INK2 }}>
              {t.testType}
            </span>
            <span className="min-w-0 flex-1" />
            {t.examId ? (
              <button
                type="button"
                onClick={() => navigate({ to: "/exam/$examId", params: { examId: t.examId! } })}
                className="max-w-[300px] truncate text-[12.5px] font-medium hover:underline"
                style={{ color: NAVY }}
                title={`Mở đề: ${t.examTen}`}
              >
                {t.examTen} ›
              </button>
            ) : (
              <span className="flex items-center gap-[5px]" style={{ color: WARN }}>
                <IconWarn size={13} /> chưa gắn đề
              </span>
            )}
            {t.daThi ? (
              <span className="flex w-[92px] shrink-0 items-center justify-end gap-[5px]" style={{ color: OK }}>
                <IconCheck size={13} /> đã thi
              </span>
            ) : (
              <span className="w-[92px] shrink-0 text-right" style={{ color: INK3 }}>chưa thi</span>
            )}
          </div>
        ))}
      </section>

      <p className="text-[12px]" style={{ color: INK3 }}>
        Bài kiểm tra chính là một đề trong kho được giao theo lịch — bấm tên đề để xem cấu trúc và
        thử làm. Dòng cuối bảng là trung bình lớp, để biết em tụt riêng hay cả lớp cùng khó.
      </p>
    </div>
  );
}
