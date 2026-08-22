import { useNavigate } from "@tanstack/react-router";
import { INK3, NAVY } from "@/data/const";

/**
 * Mã học sinh — BẤM ĐƯỢC để mở hồ sơ em đó.
 *
 * Hiền hỏi: *"nhấn vào student code ra gì?"* — trước đó mã HS hiện ở khắp nơi
 * (danh sách lớp, hàng đợi duyệt, báo cáo tháng, hộp thoại nhắc bài) nhưng
 * đều là CHỮ CHẾT. QC nhìn thấy mã mà muốn xem em đó thì phải tự đi tìm lại
 * trong danh sách lớp.
 *
 * Cần `classId` vì hồ sơ HS mở bằng `?hs=` trong ngữ cảnh một lớp.
 * Không có classId thì chỉ hiện chữ — không vẽ ra liên kết dẫn đi đâu cả.
 */
export function MaHS({
  ma,
  studentId,
  classId,
  size = 11.5,
}: {
  ma: string;
  studentId?: string | undefined;
  classId?: number | undefined;
  /** cỡ chữ, khớp với chỗ đang dùng */
  size?: number;
}) {
  const navigate = useNavigate();
  const moDuoc = !!studentId && !!classId;

  if (!moDuoc)
    return (
      <span className="tabular-nums" style={{ color: INK3, fontSize: size }}>
        {ma}
      </span>
    );

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        navigate({
          to: "/class/$classId/$tab",
          params: { classId: String(classId), tab: "hoc-sinh" },
          search: { hs: studentId },
        });
      }}
      className="tabular-nums hover:underline"
      style={{ color: NAVY, fontSize: size }}
      title={`Mở hồ sơ học sinh ${ma}`}
    >
      {ma}
    </button>
  );
}
