import { useEffect, useMemo, useState } from "react";
import { NAVY, LINE, INK, INK2, INK3, OK, WARN, DANGER } from "@/data/const";
import { CLASSES, type ClassRow } from "@/data/classes";
import { STUDENTS, type Student } from "@/data/students";
import { useModal } from "@/lib/useModal";
import { giaoBai, hoanTacGiao } from "@/data/overrides";
import { EXAMS as KHO_DE, EXAM_LOAI, EXAM_KY_NANG, EXAM_CAP_DO } from "@/data/exams";
import { SESSIONS } from "@/data/sessions";
import {
  IconBookmark,
  IconCalendarCheck,
  IconCheck,
  IconChevronDown,
  IconClipboard,
  IconInfo,
  IconSearch,
  IconUserOne,
  IconUsers,
  IconWarn,
  IconX,
} from "./icons";


/** Bỏ dấu để tìm được cả khi gõ không dấu */
const noAccent = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/gi, "d").toLowerCase();

/**
 * Kho đề của modal giao bài = CHÍNH kho đề thật (180 đề), không phải danh sách riêng.
 *
 * Trước đây chỗ này là 4 đề giả cứng nên QC chỉ tìm được bằng tên. Thực tế QC giao bài
 * không nhớ tên đề — nhớ "buổi này học Present Simple, lấy đề A2 Ngữ pháp". Vì vậy
 * ô chọn đề phải lọc được theo CHỦ ĐIỂM · KỸ NĂNG · CẤP ĐỘ · LOẠI, giống kho đề.
 */
const EXAMS = KHO_DE.map((e) => ({
  id: e.id,
  name: e.ten,
  version: e.phienBan,
  latest: e.trangThai === "Đã xuất bản · đang sửa bản mới" ? "v" + (Number(e.phienBan.slice(1)) + 1) : e.phienBan,
  published: e.trangThai !== "Nháp",
  attempts: e.soLanLam,
  minutes: e.thoiGian,
  autoPublish: e.tuCongBoKetQua,
  retryAfter: e.soLanLam !== 1,
  topic: e.topic,
  kyNang: e.kyNang,
  capDo: e.capDo,
  loai: e.loai,
  soCau: e.soCau,
}));

const STUDENT_STATES = ["Đang học", "Bảo lưu", "Đã chuyển lớp", "Đã nghỉ"] as const;

type Props = {
  from: ClassRow;
  onClose: () => void;
  /** Giao riêng cho một em: mở sẵn chế độ "Chọn học sinh" và chọn sẵn em đó.
   *  Trước đây bấm "Giao bài" ở màn HS nợ bài lại mở chế độ "Cả lớp" —
   *  QC định giao 1 em mà lỡ tay giao cho cả 7 em. */
  studentId?: string | undefined;
};

/** Ô lọc nhỏ dùng trong danh sách chọn đề */
function LocDe({
  nhan, giaTri, cac, onChon,
}: { nhan: string; giaTri: string; cac: readonly string[]; onChon: (v: string) => void }) {
  return (
    <select
      value={giaTri}
      onChange={(e) => onChon(e.target.value)}
      className="rounded-[5px] px-[7px] py-[5px] text-[11.5px]"
      style={{
        border: `1px solid ${giaTri ? NAVY : "#d9dde5"}`,
        background: "#fff",
        color: giaTri ? INK : INK2,
        fontWeight: giaTri ? 600 : 400,
      }}
    >
      <option value="">{nhan}</option>
      {cac.map((v) => (
        <option key={v} value={v}>{v}</option>
      ))}
    </select>
  );
}

export function AssignDialog({ from, onClose, studentId }: Props) {
  const modalRef = useModal(onClose);
  const [classIds, setClassIds] = useState<number[]>([from.id]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickQuery, setPickQuery] = useState("");
  const [mineOnly, setMineOnly] = useState(true);

  /* Lọc đề theo CHỦ ĐIỂM · CẤP ĐỘ · KỸ NĂNG — QC chọn đề theo đó, không nhớ tên đề */
  const [fTopic, setFTopic] = useState("");
  const [fKyNang, setFKyNang] = useState("");
  const [fCapDo, setFCapDo] = useState("");
  const [fLoai, setFLoai] = useState("");

  const [mode, setMode] = useState<"class" | "students">(studentId ? "students" : "class");
  const [states, setStates] = useState<string[]>(["Đang học"]);
  const [pickedStudents, setPickedStudents] = useState<string[]>(studentId ? [studentId] : []);

  const [examOpen, setExamOpen] = useState(false);
  const [examQuery, setExamQuery] = useState("");
  const [examId, setExamId] = useState<string | null>(null);
  const exam = EXAMS.find((e) => e.id === examId) ?? null;
  const [useLatest, setUseLatest] = useState(true);

  const [bindSession, setBindSession] = useState(true);
  const [sessionBy, setSessionBy] = useState<Record<number, number>>({});
  /* Màn xác nhận trung gian: hiện MỌI thứ đáng ngờ trước khi bấm giao thật */
  const [dangXacNhan, setDangXacNhan] = useState(false);

  /* Đã giao xong -> giữ id để còn hoàn tác. KH yêu cầu có nút Hoàn tác 10 giây. */
  const [daGiaoId, setDaGiaoId] = useState<string | null>(null);
  const [conLai, setConLai] = useState(10);

  const [dueMode, setDueMode] = useState<"bySession" | "same">("bySession");
  const [dueSame, setDueSame] = useState("");

  const [moreOpen, setMoreOpen] = useState(false);
  const [attempts, setAttempts] = useState<number | null>(null);
  const [minutes, setMinutes] = useState<number | null>(null);
  const [lockAfterDue, setLockAfterDue] = useState(true);

  const picked = classIds.map((id) => CLASSES.find((c) => c.id === id)!).filter(Boolean);

  /** Toàn bộ học sinh kèm lớp, để tra theo mã hoặc tên — không giới hạn trong một lớp,
   *  vì giao học sinh lẻ là giao cho em bất kỳ, có thể em ở lớp khác. */
  const allStudents = useMemo(
    () =>
      Object.entries(STUDENTS).flatMap(([cid, list]) => {
        const cls = CLASSES.find((c) => String(c.id) === cid);
        return list.map((st) => ({ st, cls }));
      }),
    [],
  );

  const [stuQuery, setStuQuery] = useState("");
  const stuHits = useMemo(() => {
    const q = noAccent(stuQuery.trim());
    if (!q) return [];
    return allStudents
      .filter(
        ({ st }) =>
          !pickedStudents.includes(st.id) &&
          (noAccent(st.name).includes(q) || st.code.toLowerCase().includes(q)),
      )
      .slice(0, 8);
  }, [stuQuery, pickedStudents, allStudents]);

  const pickedStudentRows = pickedStudents
    .map((id) => allStudents.find((x) => x.st.id === id))
    .filter((x): x is { st: Student; cls: ClassRow | undefined } => !!x);

  /* ---- đếm học sinh theo tình trạng ---- */
  const countByState = useMemo(() => {
    const m: Record<string, number> = {};
    STUDENT_STATES.forEach((s) => (m[s] = 0));
    picked.forEach((c) => {
      const list = STUDENTS[c.id] ?? [];
      // Tình trạng học lấy từ trường state THẬT của học sinh.
      // Trước đây suy từ chỉ số i % 11 / i % 13 vì lúc viết chưa có trường này —
      // nhưng students.ts đã có state từ lâu, và chính file này dòng dưới đã dùng.
      list.forEach((s) => {
        const st = s.state;
        m[st] = (m[st] ?? 0) + 1;
      });
    });
    return m;
  }, [classIds]);

  const totalStudents =
    mode === "students"
      ? pickedStudents.length
      : states.reduce((a, s) => a + (countByState[s] ?? 0), 0);

  /** số em THỰC SỰ nhận bài ở một lớp, theo đúng tình trạng đang tích.
   *  Trước đây chip ghi sĩ số lớp (9 em) trong khi chỉ giao cho 7 em đang học. */
  const willReceive = (classId: number) => {
    const list = STUDENTS[classId] ?? [];
    return list.filter((s) => states.includes(s.state)).length;
  };

  /* ---- lời nhắc, không chặn ---- */
  const notes: string[] = [];
  picked.forEach((c) => {
    if (!c.schedule) notes.push(`${c.code} chưa xếp lịch — bài sẽ không gắn buổi nào.`);
    if ((c.enrolled ?? 0) === 0) notes.push(`${c.code} chưa có học sinh.`);
  });
  if (exam && exam.latest !== exam.version && !useLatest)
    notes.push(`Đề đã có bản ${exam.latest} mới hơn bản đang chọn (${exam.version}).`);
  if (picked.length > 1) notes.push("Học sinh học nhiều lớp sẽ nhận bài ở từng lớp.");
  if (exam) notes.push(`Mỗi lần giao tạo một bài giao mới, không cộng dồn vào bài cũ.`);

  /* ---- chặn ---- */
  const blocks: string[] = [];
  if (exam && !exam.published) blocks.push("Đề chưa xuất bản — học sinh sẽ không mở được bài.");
  if (dueMode === "same" && dueSame && bindSession) {
    const bad = picked.filter((c) => {
      const s = (SESSIONS[c.id] ?? []).find((x) => x.no === sessionBy[c.id]);
      if (!s) return false;
      const [dd, mm, yy] = s.date.split("/").map(Number);
      const [dd2, mm2, yy2] = dueSame.split("/").map(Number);
      return yy2 * 10000 + mm2 * 100 + dd2 < yy * 10000 + mm * 100 + dd;
    });
    if (bad.length)
      blocks.push(
        `Hạn nộp trước ngày học của ${bad.map((c) => c.code).join(", ")} — học sinh không kịp nộp.`,
      );
  }

  /* Kiểm tra 4: em Bảo lưu / Đã nghỉ lọt vào danh sách nhận bài.
     Đo trên dữ liệu thật: bài chỉ giao cho em Đang học, em bảo lưu không nhận bài.
     Đây là CẢNH BÁO chứ không chặn cứng — QC có thể cố ý giao bù. */
  const emKhongDangHoc = useMemo(() => {
    if (mode !== "class") return [];
    const ra: { id: string; name: string; code: string; state: string; classCode: string }[] = [];
    for (const c of picked) {
      for (const st of STUDENTS[c.id] ?? []) {
        if (st.state === "Đang học") continue;
        if (!states.includes(st.state)) continue;
        ra.push({ id: st.id, name: st.name, code: st.code, state: st.state, classCode: c.code });
      }
    }
    return ra;
  }, [picked, states, mode]);

  /* Đếm ngược cửa sổ hoàn tác; hết giờ thì đóng modal */
  useEffect(() => {
    if (!daGiaoId) return;
    if (conLai <= 0) {
      onClose();
      return;
    }
    const t = setTimeout(() => setConLai((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [daGiaoId, conLai, onClose]);

  const canSubmit = !!exam && classIds.length > 0 && totalStudents > 0 && blocks.length === 0;

  /* ---- bảng chọn lớp ---- */
  const pickList = CLASSES.filter((c) => {
    if (c.status !== "Đang diễn ra") return false; // không lẫn lớp đã kết thúc
    if (mineOnly && !c.mine) return false;
    if (!pickQuery.trim()) return true;
    const q = noAccent(pickQuery);
    return noAccent(c.code).includes(q) || noAccent(c.teacher ?? "").includes(q);
  });

  /* Danh sách chủ điểm có thật trong kho, để QC chọn thay vì gõ mò */
  const topicList = useMemo(
    () => [...new Set(EXAMS.map((e) => e.topic).filter(Boolean))].sort((a, b) => a.localeCompare(b, "vi")),
    [],
  );

  const examList = EXAMS.filter((e) => {
    const q = examQuery.trim();
    /* tìm được cả bằng tên LẪN chủ điểm — QC hay nhớ chủ điểm hơn nhớ tên đề */
    if (q && !noAccent(e.name).includes(noAccent(q)) && !noAccent(e.topic).includes(noAccent(q)))
      return false;
    if (fTopic && e.topic !== fTopic) return false;
    if (fKyNang && e.kyNang !== fKyNang) return false;
    if (fCapDo && e.capDo !== fCapDo) return false;
    if (fLoai && e.loai !== fLoai) return false;
    return true;
  });

  const row = "flex gap-[14px] py-[11px]";
  const label = "w-[112px] shrink-0 pt-[6px] text-[12.5px]";

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto py-[36px]"
      style={{ background: "rgba(20,28,56,0.42)" }}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label="Giao bài tập"
        className="w-[720px] rounded-[10px] bg-white shadow-[0_20px_60px_rgba(20,28,56,0.28)]"
        onClick={(e) => e.stopPropagation()}
      >
        <header
          className="flex items-center gap-[10px] px-[20px] py-[15px]"
          style={{ borderBottom: `1px solid ${LINE}` }}
        >
          <IconClipboard size={17} />
          <h2 className="flex-1 text-[15px] font-bold">Giao bài tập</h2>
          <button type="button" onClick={onClose} style={{ color: INK3 }} aria-label="Đóng">
            <IconX size={17} />
          </button>
        </header>

        <div className="px-[20px] py-[6px]">
          {/* ---- giao cho ---- */}
          <div className={row} style={{ borderBottom: `1px solid #f1f3f7` }}>
            <span className={label} style={{ color: INK2 }}>
              Giao cho
            </span>
            <div className="min-w-0 flex-1 pt-[2px]">
              <div className="mb-[9px] flex gap-[16px] text-[13px]">
                {(
                  [
                    ["class", "Cả lớp", IconUsers],
                    ["students", "Chọn học sinh", IconUserOne],
                  ] as const
                ).map(([v, t, Ico]) => (
                  <label key={v} className="flex cursor-pointer items-center gap-[7px]">
                    <input
                      type="radio"
                      checked={mode === v}
                      onChange={() => setMode(v)}
                      style={{ accentColor: NAVY }}
                    />
                    <Ico size={14} />
                    {t}
                  </label>
                ))}
              </div>

              {mode === "students" ? (
                <div className="flex flex-col gap-[9px]">
                  <div className="relative">
                    <span className="pointer-events-none absolute left-[11px] top-[10px]" style={{ color: INK3 }}>
                      <IconSearch size={14} />
                    </span>
                    <input
                      value={stuQuery}
                      onChange={(e) => setStuQuery(e.target.value)}
                      placeholder="Gõ mã học sinh hoặc tên, ví dụ 43064HN hoặc Hà Hải"
                      className="w-full rounded-[6px] py-[8px] pl-[32px] pr-[11px] text-[13px]"
                      style={{ border: `1px solid #d9dde5`, color: INK }}
                    />
                    {stuHits.length > 0 && (
                      <div
                        className="absolute left-0 right-0 top-[40px] z-[5] overflow-hidden rounded-[8px]"
                        style={{ border: `1px solid ${LINE}`, background: "#fff", boxShadow: "0 6px 18px rgba(20,28,56,0.12)" }}
                      >
                        {stuHits.map(({ st, cls }) => (
                          <button
                            key={st.id}
                            type="button"
                            onClick={() => {
                              setPickedStudents((v) => [...v, st.id]);
                              setStuQuery("");
                            }}
                            className="flex w-full items-center gap-[9px] px-[11px] py-[8px] text-left text-[13px] hover:bg-[#f4f6fa]"
                          >
                            <span className="font-medium" style={{ color: INK }}>{st.name}</span>
                            <span className="tabular-nums" style={{ color: INK3 }}>{st.code}</span>
                            <span className="flex-1" />
                            <span style={{ color: INK2 }}>{cls?.code ?? "—"}</span>
                            <span
                              className="rounded-full px-[7px] py-[1px] text-[11.5px]"
                              style={{
                                background: st.state === "Đang học" ? "#e6f5ec" : "#f0f2f6",
                                color: st.state === "Đang học" ? "#1f6f4a" : INK2,
                              }}
                            >
                              {st.state}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {pickedStudentRows.length > 0 ? (
                    <div className="flex flex-wrap items-center gap-[7px]">
                      {pickedStudentRows.map(({ st, cls }) => (
                        <span
                          key={st.id}
                          className="inline-flex items-center gap-[7px] rounded-[14px] py-[4px] pl-[10px] pr-[6px] text-[12.5px]"
                          style={{ background: "#eef1f7", border: `1px solid #dde2ec` }}
                        >
                          {st.name}
                          <span className="tabular-nums" style={{ color: INK3 }}>
                            {st.code} · {cls?.code ?? "—"}
                          </span>
                          <button
                            type="button"
                            onClick={() => setPickedStudents((v) => v.filter((x) => x !== st.id))}
                            style={{ color: INK3 }}
                            aria-label={`Bỏ ${st.name}`}
                          >
                            <IconX size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[12.5px]" style={{ color: INK3 }}>
                      Chưa chọn em nào. Gõ mã hoặc tên để tìm — tìm được cả em ở lớp khác.
                    </p>
                  )}
                </div>
              ) : (
              <>
              <div className="flex flex-wrap items-center gap-[7px]">
                {picked.map((c) => (
                  <span
                    key={c.id}
                    className="inline-flex items-center gap-[7px] rounded-[14px] py-[4px] pl-[10px] pr-[6px] text-[12.5px]"
                    style={{ background: "#eef1f7", border: `1px solid #dde2ec` }}
                  >
                    {c.code}
                    <span style={{ color: INK3 }}>
                      {willReceive(c.id)}/{c.enrolled ?? 0} em nhận
                    </span>
                    {classIds.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setClassIds((v) => v.filter((x) => x !== c.id))}
                        style={{ color: INK2 }}
                        aria-label={`Bỏ ${c.code}`}
                      >
                        <IconX size={12} />
                      </button>
                    )}
                  </span>
                ))}
                <button
                  type="button"
                  onClick={() => setPickerOpen((o) => !o)}
                  className="rounded-[14px] px-[11px] py-[5px] text-[12.5px] font-medium"
                  style={{ border: `1px dashed #c3cad8`, color: NAVY }}
                >
                  + Thêm lớp
                </button>
              </div>

              {pickerOpen && (
                <div
                  className="mt-[9px] rounded-[8px]"
                  style={{ border: `1px solid ${LINE}`, background: "#fbfcfe" }}
                >
                  <div className="flex items-center gap-[8px] px-[10px] py-[8px]">
                    <span
                      className="flex flex-1 items-center gap-[7px] rounded-[6px] bg-white px-[9px] py-[6px]"
                      style={{ border: `1px solid #d9dde5` }}
                    >
                      <IconSearch size={13} />
                      <input
                        value={pickQuery}
                        onChange={(e) => setPickQuery(e.target.value)}
                        placeholder="Tìm mã lớp hoặc giáo viên (gõ có dấu hoặc không dấu)"
                        className="w-full text-[12.5px] outline-none"
                      />
                    </span>
                    <button
                      type="button"
                      onClick={() => setMineOnly((v) => !v)}
                      className="flex items-center gap-[6px] rounded-[6px] px-[10px] py-[6px] text-[12.5px]"
                      style={{
                        border: `1px solid ${mineOnly ? NAVY : "#d9dde5"}`,
                        background: mineOnly ? NAVY : "#fff",
                        color: mineOnly ? "#fff" : INK,
                      }}
                    >
                      <IconBookmark size={13} />
                      Lớp của tôi
                    </button>
                  </div>
                  <div className="max-h-[190px] overflow-y-auto px-[6px] pb-[6px]">
                    {pickList.length === 0 && (
                      <p className="px-[8px] py-[12px] text-[12.5px]" style={{ color: INK3 }}>
                        Không tìm thấy lớp đang diễn ra nào khớp.
                      </p>
                    )}
                    {pickList.map((c) => {
                      const on = classIds.includes(c.id);
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() =>
                            setClassIds((v) => (on ? v.filter((x) => x !== c.id) : [...v, c.id]))
                          }
                          className="flex w-full items-center gap-[9px] rounded-[5px] px-[8px] py-[7px] text-left text-[12.5px] hover:bg-white"
                        >
                          <span
                            className="grid h-[15px] w-[15px] shrink-0 place-items-center rounded-[3px]"
                            style={{
                              border: `1px solid ${on ? NAVY : "#c3cad8"}`,
                              background: on ? NAVY : "#fff",
                              color: "#fff",
                            }}
                          >
                            {on && <IconCheck size={11} />}
                          </span>
                          <span className="font-medium">{c.code}</span>
                          <span style={{ color: INK3 }}>{c.teacher ?? "Chưa gán"}</span>
                          <span className="flex-1" />
                          <span style={{ color: INK3 }}>
                            {willReceive(c.id)}/{c.enrolled ?? 0} em nhận
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              </>
              )}

              {mode === "class" && (
                <div className="mt-[10px] flex flex-wrap gap-[14px] text-[12.5px]">
                  {STUDENT_STATES.map((st) => {
                    const n = countByState[st] ?? 0;
                    const on = states.includes(st);
                    return (
                      <label
                        key={st}
                        className="flex items-center gap-[6px]"
                        style={{ color: n ? INK : INK3, cursor: n ? "pointer" : "default" }}
                      >
                        <input
                          type="checkbox"
                          checked={on}
                          disabled={!n}
                          onChange={() =>
                            setStates((v) => (on ? v.filter((x) => x !== st) : [...v, st]))
                          }
                          style={{ accentColor: NAVY }}
                        />
                        {st} ({n})
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* ---- chọn đề ---- */}
          <div className={row} style={{ borderBottom: `1px solid #f1f3f7` }}>
            <span className={label} style={{ color: INK2 }}>
              Chọn đề
            </span>
            <div className="min-w-0 flex-1">
              <button
                type="button"
                onClick={() => setExamOpen((o) => !o)}
                className="flex w-full items-center gap-[9px] rounded-[6px] px-[11px] py-[8px] text-left text-[13px]"
                style={{ border: `1px solid ${exam ? NAVY : "#d9dde5"}` }}
              >
                <IconSearch size={14} />
                <span className="flex-1 truncate" style={{ color: exam ? INK : INK3 }}>
                  {exam ? exam.name : "Tìm đề theo tên, chủ điểm…"}
                </span>
                {exam && (
                  <span
                    className="rounded-[4px] px-[7px] py-[2px] text-[11.5px] font-semibold"
                    style={{ background: "#eef1f7", color: NAVY }}
                  >
                    {useLatest ? exam.latest : exam.version}
                  </span>
                )}
                <IconChevronDown size={13} />
              </button>

              {examOpen && (
                <div
                  className="mt-[7px] rounded-[8px]"
                  style={{ border: `1px solid ${LINE}`, background: "#fbfcfe" }}
                >
                  <div className="px-[10px] py-[8px]">
                    <span
                      className="flex items-center gap-[7px] rounded-[6px] bg-white px-[9px] py-[6px]"
                      style={{ border: `1px solid #d9dde5` }}
                    >
                      <IconSearch size={13} />
                      <input
                        value={examQuery}
                        onChange={(e) => setExamQuery(e.target.value)}
                        placeholder="Tìm theo tên đề hoặc chủ điểm"
                        className="w-full text-[12.5px] outline-none"
                      />
                    </span>

                    {/* Lọc theo đúng các chiều kho đề — QC nhớ chủ điểm/kỹ năng, không nhớ tên */}
                    <div className="mt-[7px] flex flex-wrap items-center gap-[6px]">
                      <LocDe nhan="Chủ điểm" giaTri={fTopic} cac={topicList} onChon={setFTopic} />
                      <LocDe nhan="Cấp độ" giaTri={fCapDo} cac={EXAM_CAP_DO} onChon={setFCapDo} />
                      <LocDe nhan="Kỹ năng" giaTri={fKyNang} cac={EXAM_KY_NANG} onChon={setFKyNang} />
                      <LocDe nhan="Loại đề" giaTri={fLoai} cac={EXAM_LOAI} onChon={setFLoai} />
                      <span className="flex-1" />
                      <span className="text-[11.5px]" style={{ color: INK3 }}>
                        {examList.length} đề
                      </span>
                    </div>
                  </div>
                  <div className="max-h-[170px] overflow-y-auto px-[6px] pb-[6px]">
                    {examList.length === 0 && (
                      <p className="px-[8px] py-[16px] text-center text-[12px]" style={{ color: INK3 }}>
                        Không có đề nào khớp bộ lọc. Bỏ bớt chủ điểm hoặc cấp độ.
                      </p>
                    )}
                    {examList.map((e) => (
                      <button
                        key={e.id}
                        type="button"
                        onClick={() => {
                          setExamId(e.id);
                          setUseLatest(true);
                          setAttempts(null);
                          setMinutes(null);
                          setExamOpen(false);
                        }}
                        className="flex w-full items-center gap-[9px] rounded-[5px] px-[8px] py-[7px] text-left text-[12.5px] hover:bg-white"
                      >
                        <span className="min-w-0 flex-1">
                          <span className="block truncate">{e.name}</span>
                          <span className="block truncate text-[11.5px]" style={{ color: INK3 }}>
                            {e.topic} · {e.kyNang} · {e.capDo} · {e.soCau} câu
                          </span>
                        </span>
                        {!e.published && (
                          <span style={{ color: WARN }} className="shrink-0 text-[11.5px]">
                            chưa xuất bản
                          </span>
                        )}
                        <span className="shrink-0" style={{ color: INK3 }}>{e.latest}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {exam && exam.latest !== exam.version && (
                <label className="mt-[8px] flex items-center gap-[7px] text-[12.5px]">
                  <input
                    type="checkbox"
                    checked={useLatest}
                    onChange={() => setUseLatest((v) => !v)}
                    style={{ accentColor: NAVY }}
                  />
                  Dùng bản mới nhất {exam.latest}{" "}
                  <span style={{ color: INK3 }}>(bản đang gắn: {exam.version})</span>
                </label>
              )}
            </div>
          </div>

          {/* ---- gắn buổi ---- */}
          <div className={row} style={{ borderBottom: `1px solid #f1f3f7` }}>
            <span className={label} style={{ color: INK2 }}>
              Gắn với buổi
            </span>
            <div className="min-w-0 flex-1">
              <label className="flex items-center gap-[7px] text-[13px]">
                <input
                  type="checkbox"
                  checked={bindSession}
                  onChange={() => setBindSession((v) => !v)}
                  style={{ accentColor: NAVY }}
                />
                <IconCalendarCheck size={14} />
                Gắn bài với buổi học
              </label>

              {bindSession && (
                <div className="mt-[8px] flex flex-col gap-[7px]">
                  {picked.map((c) => {
                    /* Cho chọn cả buổi ĐÃ DẠY mà chưa giao bài — đó chính là
                       buổi QC đang nợ, không được bỏ ra khỏi danh sách. */
                    const all = SESSIONS[c.id] ?? [];
                    const noBai = all.filter((s) => s.past && !s.homework);
                    const sapToi = all.filter((s) => !s.past);
                    const list = [...noBai, ...sapToi];
                    const cur = sessionBy[c.id] ?? list[0]?.no;
                    return (
                      <div key={c.id} className="flex items-center gap-[10px] text-[12.5px]">
                        <span className="w-[132px] shrink-0">{c.code}</span>
                        {list.length === 0 ? (
                          <span style={{ color: WARN }}>Lớp chưa xếp buổi nào phía trước</span>
                        ) : (
                          <select
                            value={cur}
                            onChange={(e) =>
                              setSessionBy((v) => ({ ...v, [c.id]: Number(e.target.value) }))
                            }
                            className="rounded-[6px] px-[9px] py-[6px] text-[12.5px]"
                            style={{ border: `1px solid #d9dde5` }}
                          >
                            {list.map((s) => (
                              <option key={s.no} value={s.no}>
                                Buổi {s.no} · {s.day} {s.date} · {s.time}
                                {s.past ? " — đã dạy, đang nợ bài" : ""}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* ---- hạn nộp ---- */}
          <div className={row} style={{ borderBottom: `1px solid #f1f3f7` }}>
            <span className={label} style={{ color: INK2 }}>
              Hạn nộp
            </span>
            <div className="min-w-0 flex-1 pt-[2px] text-[13px]">
              <label className="flex cursor-pointer items-center gap-[7px]">
                <input
                  type="radio"
                  checked={dueMode === "bySession"}
                  onChange={() => setDueMode("bySession")}
                  style={{ accentColor: NAVY }}
                />
                Theo buổi của từng lớp
                <span style={{ color: INK3 }}>· mỗi lớp một hạn riêng</span>
              </label>
              <label className="mt-[7px] flex cursor-pointer items-center gap-[7px]">
                <input
                  type="radio"
                  checked={dueMode === "same"}
                  onChange={() => setDueMode("same")}
                  style={{ accentColor: NAVY }}
                />
                Cùng một ngày
                <input
                  value={dueSame}
                  onChange={(e) => setDueSame(e.target.value)}
                  onFocus={() => setDueMode("same")}
                  placeholder="dd/mm/yyyy"
                  className="w-[124px] rounded-[6px] px-[9px] py-[5px] text-[12.5px]"
                  style={{ border: `1px solid #d9dde5` }}
                />
              </label>
            </div>
          </div>

          {/* ---- kế thừa từ đề ---- */}
          <div className={row}>
            <span className={label} style={{ color: INK2 }}>
              Theo cấu hình đề
            </span>
            <div className="min-w-0 flex-1">
              {!exam ? (
                <p className="pt-[5px] text-[12.5px]" style={{ color: INK3 }}>
                  Chọn đề để xem cấu hình.
                </p>
              ) : (
                <>
                  <div className="flex flex-col gap-[7px] text-[12.5px]">
                    <InheritRow
                      name="Số lần làm"
                      fromExam={exam.attempts === 1 ? "1 lần" : `${exam.attempts} lần`}
                      value={attempts === null ? null : `${attempts} lần`}
                      onEdit={() => setAttempts(exam.attempts)}
                      onReset={() => setAttempts(null)}
                      editor={
                        <input
                          type="number"
                          min={1}
                          value={attempts ?? 1}
                          onChange={(e) => setAttempts(Math.max(1, Number(e.target.value) || 1))}
                          className="w-[74px] rounded-[6px] px-[8px] py-[4px]"
                          style={{ border: `1px solid #d9dde5` }}
                        />
                      }
                    />
                    <InheritRow
                      name="Thời gian làm"
                      fromExam={exam.minutes ? `${exam.minutes} phút` : "Không giới hạn"}
                      value={minutes === null ? null : `${minutes} phút`}
                      onEdit={() => setMinutes(exam.minutes ?? 30)}
                      onReset={() => setMinutes(null)}
                      editor={
                        <input
                          type="number"
                          min={1}
                          value={minutes ?? 30}
                          onChange={(e) => setMinutes(Math.max(1, Number(e.target.value) || 1))}
                          className="w-[74px] rounded-[6px] px-[8px] py-[4px]"
                          style={{ border: `1px solid #d9dde5` }}
                        />
                      }
                    />
                    <p style={{ color: INK3 }}>
                      Tự công bố kết quả: {exam.autoPublish ? "Bật" : "Tắt"} · Cho làm lại sau khi
                      có kết quả: {exam.retryAfter ? "Bật" : "Tắt"}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setMoreOpen((o) => !o)}
                    className="mt-[9px] flex items-center gap-[6px] text-[12.5px] font-medium"
                    style={{ color: NAVY }}
                  >
                    Tuỳ chọn khác
                    <span style={{ transform: moreOpen ? "rotate(180deg)" : undefined, display: "inline-flex" }}>
                      <IconChevronDown size={12} />
                    </span>
                  </button>

                  {moreOpen && (
                    <label className="mt-[8px] flex items-center gap-[7px] text-[12.5px]">
                      <input
                        type="checkbox"
                        checked={lockAfterDue}
                        onChange={() => setLockAfterDue((v) => !v)}
                        style={{ accentColor: NAVY }}
                      />
                      Khoá nộp bài sau hạn
                      <span style={{ color: INK3 }}>· tắt thì học sinh vẫn nộp muộn được</span>
                    </label>
                  )}
                </>
              )}
            </div>
          </div>

          {/* ---- nhắc & chặn ---- */}
          {(notes.length > 0 || blocks.length > 0) && (
            <div className="flex flex-col gap-[5px] pb-[10px]">
              {blocks.map((b) => (
                <p key={b} className="flex items-start gap-[7px] text-[12.5px]" style={{ color: DANGER }}>
                  <IconWarn size={14} />
                  {b}
                </p>
              ))}
              {notes.map((n) => (
                <p key={n} className="flex items-start gap-[7px] text-[12.5px]" style={{ color: INK2 }}>
                  <IconInfo size={14} />
                  {n}
                </p>
              ))}
            </div>
          )}
        </div>

        {dangXacNhan && !daGiaoId && (
          <div
            className="flex flex-col gap-[10px] px-[20px] py-[13px]"
            style={{ background: "#fdf7ee", borderTop: `1px solid #f0dcc0` }}
          >
            <p className="text-[13px] font-semibold" style={{ color: WARN }}>
              Kiểm tra trước khi giao
            </p>

            {emKhongDangHoc.length > 0 && (
              <div className="text-[12.5px]" style={{ color: INK }}>
                <p style={{ color: WARN }}>
                  Có {emKhongDangHoc.length} em không ở trạng thái Đang học trong danh sách nhận:
                </p>
                <ul className="mt-[5px] flex flex-col gap-[3px]">
                  {emKhongDangHoc.slice(0, 5).map((e) => (
                    <li key={e.id} className="flex flex-wrap items-center gap-[7px]">
                      <span style={{ color: INK }}>{e.name}</span>
                      <span className="tabular-nums text-[11.5px]" style={{ color: INK3 }}>{e.code}</span>
                      <span
                        className="rounded-[4px] px-[6px] py-[1px] text-[11px]"
                        style={{ background: "#f0f2f6", color: INK2 }}
                      >
                        {e.state}
                      </span>
                      <span className="text-[11.5px]" style={{ color: INK3 }}>{e.classCode}</span>
                    </li>
                  ))}
                  {emKhongDangHoc.length > 5 && (
                    <li className="text-[11.5px]" style={{ color: INK3 }}>
                      … {emKhongDangHoc.length - 5} em nữa
                    </li>
                  )}
                </ul>
                <button
                  type="button"
                  onClick={() => setStates(["Đang học"])}
                  className="mt-[7px] rounded-[6px] px-[11px] py-[6px] text-[12px] font-semibold"
                  style={{ border: `1px solid #d9dde5`, background: "#fff", color: NAVY }}
                >
                  Chỉ giao cho em đang học
                </button>
              </div>
            )}

            {notes.length > 0 && (
              <ul className="flex flex-col gap-[3px] text-[12.5px]" style={{ color: INK2 }}>
                {notes.map((n) => (
                  <li key={n}>· {n}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {daGiaoId && (
          <div
            className="flex flex-wrap items-center gap-[12px] px-[20px] py-[12px] text-[12.5px]"
            style={{ background: "#e6f5ec", borderTop: `1px solid #cbe6d6`, color: "#1f6f4a" }}
          >
            <b>Đã giao {exam?.name}</b> cho {picked.length} lớp · {totalStudents} học sinh.
            <span className="flex-1" />
            <button
              type="button"
              onClick={() => {
                hoanTacGiao(daGiaoId);
                setDaGiaoId(null);
              }}
              className="rounded-[6px] px-[12px] py-[6px] font-semibold"
              style={{ border: `1px solid #1f6f4a`, background: "#fff", color: "#1f6f4a" }}
            >
              Hoàn tác ({conLai}s)
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-[6px] px-[12px] py-[6px] font-semibold text-white"
              style={{ background: "#1f6f4a" }}
            >
              Xong
            </button>
          </div>
        )}

        <footer
          className="flex items-center gap-[12px] px-[20px] py-[13px]"
          style={{ borderTop: `1px solid ${LINE}`, background: "#fbfcfe" }}
        >
          <span className="min-w-0 flex-1 text-[12.5px]" style={{ color: INK }}>
            {exam && (
              <>
                Giao <b>{exam.name}</b> cho {picked.length} lớp ·{" "}
                <b>{totalStudents}</b> học sinh
              </>
            )}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-[6px] px-[14px] py-[8px] text-[12.5px]"
            style={{ border: `1px solid #d9dde5`, color: INK }}
          >
            Huỷ
          </button>
          {/* lý do chưa giao được phải nằm NGAY CẠNH nút, không để tít bên trái */}
          {!canSubmit && (
            <span className="shrink-0 text-[12.5px] font-medium" style={{ color: WARN }}>
              {!exam ? "Chọn đề trước" : totalStudents === 0 ? "Chưa có em nào nhận bài" : "Chưa đủ điều kiện"}
            </span>
          )}
          <button
            type="button"
            disabled={!canSubmit}
            onClick={() => {
              if (!exam) return;
              /* Có gì đáng ngờ thì hỏi lại trước, không giao thẳng */
              if (!dangXacNhan && (emKhongDangHoc.length > 0 || notes.length > 2)) {
                setDangXacNhan(true);
                return;
              }
              /* Ghi nhận THẬT — trước đây nút này gọi onClose, y hệt nút Huỷ:
                 modal đóng, QC tưởng đã giao mà thực tế không giao gì. */
              const id = giaoBai({
                examId: exam.id,
                examTen: exam.name,
                classIds: picked.map((c) => c.id),
                soHocSinh: totalStudents,
                hanNop: dueMode === "same" && dueSame ? dueSame : "theo buổi của từng lớp",
              });
              setDaGiaoId(id);
              setConLai(10);
            }}
            title={
              canSubmit
                ? undefined
                : !exam
                  ? "Chọn đề trước khi giao"
                  : "Chưa có em nào nhận bài"
            }
            className="rounded-[6px] px-[16px] py-[8px] text-[12.5px] font-semibold text-white"
            style={{ background: canSubmit ? NAVY : "#b9c0cc", cursor: canSubmit ? "pointer" : "not-allowed" }}
          >
            {dangXacNhan ? `Vẫn giao cho ${totalStudents} em` : "Giao bài"}
          </button>
        </footer>
      </div>
    </div>
  );
}

/** Một dòng cấu hình kế thừa từ đề — đọc là chính, bấm Đổi mới sửa */
function InheritRow({
  name,
  fromExam,
  value,
  editor,
  onEdit,
  onReset,
}: {
  name: string;
  fromExam: string;
  value: string | null;
  editor: React.ReactNode;
  onEdit: () => void;
  onReset: () => void;
}) {
  const changed = value !== null;
  return (
    <div className="flex items-center gap-[10px]">
      <span className="w-[104px] shrink-0" style={{ color: INK2 }}>
        {name}
      </span>
      {changed ? (
        <>
          {editor}
          <span style={{ color: WARN }}>khác đề ({fromExam})</span>
          <button type="button" onClick={onReset} style={{ color: NAVY }} className="font-medium">
            Về theo đề
          </button>
        </>
      ) : (
        <>
          <span className="font-medium">{fromExam}</span>
          <span
            className="rounded-[4px] px-[6px] py-[1px] text-[11px]"
            style={{ background: "#eef1f7", color: INK2 }}
          >
            theo đề
          </span>
          <button type="button" onClick={onEdit} style={{ color: NAVY }} className="font-medium">
            Đổi
          </button>
        </>
      )}
    </div>
  );
}
