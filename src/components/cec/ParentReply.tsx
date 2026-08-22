import { useMemo, useState } from "react";
import type { Student } from "@/data/students";
import type { ClassRow } from "@/data/classes";
import { MONTHLY, REPORTS } from "@/data/reports";
import { SCORES, TESTS } from "@/data/tests";
import { INK, INK2, INK3, LINE, NAVY, OK } from "@/data/const";
import { useModal } from "@/lib/useModal";
import { IconCheck } from "./icons";

const TINH_HUONG = [
  "Con học thế nào",
  "Sao con điểm thấp",
  "Con có tiến bộ không",
  "Sao con bị nhắc nợ bài",
] as const;
type TinhHuong = (typeof TINH_HUONG)[number];

/**
 * Soạn câu trả lời phụ huynh (WF-11, tính năng T10).
 *
 * Phụ huynh gọi là QC phải trả lời NGAY, không kịp mở 4 màn để ghép số.
 * Chỗ này gom sẵn số thật của em rồi soạn thành đoạn văn — QC sửa lại rồi gửi.
 *
 * MỌI con số trong bản nháp đều DẪN từ dữ liệu có thật, không bịa:
 * thiếu nguồn nào thì bỏ hẳn câu đó, không viết chung chung cho đủ đoạn.
 */
export function ParentReply({
  student, row, onClose, onLuu,
}: {
  student: Student;
  row: ClassRow;
  onClose: () => void;
  onLuu: (text: string) => void;
}) {
  const modalRef = useModal(onClose);
  const [tinhHuong, setTinhHuong] = useState<TinhHuong>("Con học thế nào");
  const [daChep, setDaChep] = useState(false);

  /* Gom nguyên liệu — chỉ lấy cái CÓ THẬT */
  const lieu = useMemo(() => {
    const phieu = (REPORTS[row.id] ?? []).filter((r) => r.studentId === student.id);
    const daDuyet = phieu.filter((r) => r.status === "approved");
    const nhanXet = daDuyet.map((r) => r.comment).filter((c): c is string => !!c);

    const bcs = MONTHLY[student.id] ?? [];
    const nay = bcs[0];
    const truoc = bcs[1];

    const ts = (TESTS[row.id] ?? []).filter((t) => t.daThi);
    const diemTest = ts
      .map((t) => ({ ten: t.ten, diem: SCORES[student.id]?.[t.id] }))
      .filter((x): x is { ten: string; diem: number } => typeof x.diem === "number");

    /* Kỹ năng tiến bộ nhất / tụt nhất trong tháng */
    const kn = (nay?.skills ?? []).filter((k) => k.delta !== null && k.delta !== 0);
    const len = [...kn].sort((a, b) => (b.delta ?? 0) - (a.delta ?? 0))[0];
    const xuong = [...kn].sort((a, b) => (a.delta ?? 0) - (b.delta ?? 0))[0];

    return { phieu, daDuyet, nhanXet, nay, truoc, diemTest, len, xuong };
  }, [row.id, student.id]);

  const noBai = student.assigned - student.submitted;

  const banNhap = useMemo(() => {
    const ten = student.name.split(/\s+/).at(-1) ?? student.name;
    const c: string[] = [`Chào anh/chị, em xin cập nhật tình hình cháu ${ten}.`];

    if (tinhHuong === "Sao con bị nhắc nợ bài") {
      c.push(
        noBai > 0
          ? `Cháu đã nộp ${student.submitted}/${student.assigned} bài, còn ${noBai} bài chưa nộp. Mong anh/chị nhắc cháu hoàn thành giúp em.`
          : `Cháu đã nộp đủ ${student.submitted}/${student.assigned} bài. Nếu anh/chị nhận được tin nhắn nhắc thì có thể do hệ thống gửi trước khi cháu nộp.`,
      );
    } else if (tinhHuong === "Sao con điểm thấp") {
      if (student.avg !== null) c.push(`Điểm trung bình bài tập của cháu hiện là ${student.avg.toFixed(1)}.`);
      if (lieu.xuong && lieu.xuong.delta !== null)
        c.push(`Kỹ năng ${lieu.xuong.name} tháng này giảm ${Math.abs(lieu.xuong.delta).toFixed(1)} điểm so với tháng trước — em sẽ lưu ý kèm thêm phần này.`);
      if (noBai > 0) c.push(`Cháu còn ${noBai} bài chưa nộp, việc này cũng ảnh hưởng tới điểm trung bình.`);
    } else if (tinhHuong === "Con có tiến bộ không") {
      if (lieu.len && lieu.len.delta !== null)
        c.push(`Kỹ năng ${lieu.len.name} của cháu tăng ${lieu.len.delta.toFixed(1)} điểm so với tháng trước.`);
      if (lieu.nay && lieu.truoc)
        c.push(`Chuyên cần tháng này ${lieu.nay.attendRate}%, tháng trước ${lieu.truoc.attendRate}%.`);
      if (!lieu.len && !lieu.truoc)
        c.push(`Cháu mới học nên chưa đủ dữ liệu hai tháng để so sánh tiến bộ. Em sẽ cập nhật anh/chị vào cuối tháng.`);
    } else {
      if (lieu.nay)
        c.push(`Cháu đi học ${lieu.nay.present}/${lieu.nay.sessionTotal} buổi trong tháng${lieu.nay.absent > 0 ? `, nghỉ ${lieu.nay.absent} buổi` : ""}.`);
      else if (student.absent > 0) c.push(`Cháu nghỉ ${student.absent} buổi.`);
      if (student.avg !== null) c.push(`Điểm trung bình bài tập ${student.avg.toFixed(1)}.`);
      c.push(
        noBai > 0
          ? `Cháu đã nộp ${student.submitted}/${student.assigned} bài, còn ${noBai} bài quá hạn.`
          : `Cháu nộp đủ ${student.submitted}/${student.assigned} bài.`,
      );
      if (lieu.diemTest.length)
        c.push(`Điểm kiểm tra định kỳ: ${lieu.diemTest.map((t) => `${t.ten} ${t.diem.toFixed(1)}`).join(", ")}.`);
    }

    /* Nhận xét của giáo viên — chỉ lấy phiếu ĐÃ DUYỆT, tránh trích bản nháp */
    if (lieu.nhanXet.length) c.push(`Giáo viên nhận xét: "${lieu.nhanXet[0]}"`);

    return c.join(" ");
  }, [tinhHuong, student, lieu, noBai]);

  const [text, setText] = useState(banNhap);
  const [dangXem, setDangXem] = useState(tinhHuong);
  if (dangXem !== tinhHuong) {
    setDangXem(tinhHuong);
    setText(banNhap);
  }

  const nguon = [
    `${lieu.daDuyet.length} phiếu buổi đã duyệt`,
    `${student.assigned} bài tập`,
    lieu.diemTest.length ? `${lieu.diemTest.length} bài kiểm tra` : null,
    lieu.nay ? `báo cáo tháng ${lieu.nay.month}` : null,
  ].filter(Boolean).join(" · ");

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto py-[40px]"
      style={{ background: "rgba(20,28,56,0.42)" }} onClick={onClose}>
      <div ref={modalRef} onClick={(e) => e.stopPropagation()}
        className="w-[640px] max-w-[94vw] rounded-[12px] bg-white"
        style={{ border: `1px solid ${LINE}`, boxShadow: "0 18px 48px rgba(20,28,56,0.22)" }}>
        <header className="flex items-center gap-[10px] px-[20px] py-[14px]" style={{ borderBottom: `1px solid ${LINE}` }}>
          <span className="text-[14px] font-semibold" style={{ color: INK }}>
            Soạn câu trả lời phụ huynh · {student.name}
          </span>
          <span className="flex-1" />
          <button type="button" onClick={onClose} style={{ color: INK3 }} aria-label="Đóng">✕</button>
        </header>

        <div className="flex flex-col gap-[12px] px-[20px] py-[14px]">
          <div>
            <p className="mb-[7px] text-[12.5px]" style={{ color: INK2 }}>Phụ huynh hỏi gì?</p>
            <div className="flex flex-wrap gap-[7px]">
              {TINH_HUONG.map((t) => (
                <button key={t} type="button" onClick={() => setTinhHuong(t)}
                  className="rounded-[8px] px-[11px] py-[6px] text-[12.5px]"
                  style={{
                    border: `1px solid ${t === tinhHuong ? NAVY : "#d9dde5"}`,
                    background: t === tinhHuong ? "#eef1f7" : "#fff",
                    color: t === tinhHuong ? NAVY : INK2,
                    fontWeight: t === tinhHuong ? 600 : 400,
                  }}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <textarea value={text} onChange={(e) => { setText(e.target.value); setDaChep(false); }}
            rows={8}
            className="w-full rounded-[8px] px-[13px] py-[11px] text-[13px] leading-[1.7] outline-none"
            style={{ border: `1px solid #d9dde5`, color: INK }} />

          <div className="flex flex-wrap items-center gap-[8px] text-[11.5px]" style={{ color: INK3 }}>
            <span className="rounded-[4px] px-[7px] py-[2px]" style={{ background: "#eef1f7", color: NAVY }}>
              AI soạn — sửa được
            </span>
            <span>Dựa trên: {nguon}</span>
          </div>
          {text !== banNhap && (
            <p className="-mt-[6px] text-[11.5px]" style={{ color: OK }}>Bạn đã sửa so với bản AI soạn.</p>
          )}
        </div>

        <footer className="flex flex-wrap items-center gap-[10px] px-[20px] py-[13px]"
          style={{ borderTop: `1px solid ${LINE}`, background: "#fbfcfe" }}>
          <span className="text-[12px]" style={{ color: INK3 }}>
            Mọi con số lấy từ hồ sơ của em, không tự sinh.
          </span>
          <span className="flex-1" />
          <button type="button"
            onClick={() => { void navigator.clipboard?.writeText(text); setDaChep(true); }}
            className="rounded-[8px] px-[13px] py-[8px] text-[12.5px] font-semibold"
            style={{ border: `1px solid #d9dde5`, color: daChep ? OK : INK }}>
            {daChep ? "Đã sao chép" : "Sao chép"}
          </button>
          <button type="button" onClick={() => { onLuu(text); onClose(); }}
            className="flex items-center gap-[7px] rounded-[8px] px-[15px] py-[8px] text-[12.5px] font-semibold text-white"
            style={{ background: NAVY }}>
            <IconCheck size={13} />
            Lưu vào Phản hồi phụ huynh
          </button>
        </footer>
      </div>
    </div>
  );
}
