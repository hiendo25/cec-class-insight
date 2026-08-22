/**
 * Tên người kèm avatar chữ cái đầu — dùng CHUNG cho mọi màn.
 *
 * PROD hiện avatar tròn có màu cho Giáo viên / QC / EC ở mọi chỗ có tên người
 * (ảnh `P01-class-list.png`). Trước đây app mình chỉ có ở bảng danh sách lớp,
 * còn tab Học sinh và tab Lịch học lại hiện tên trần — cùng một thứ mà hai kiểu.
 *
 * Màu suy từ chính tên nên một người luôn ra một màu, không đổi giữa các màn.
 */
/* MỘT màu cho mọi avatar, không phải 6 màu ngẫu nhiên.
   Màu ngẫu nhiên đỏ/cam/tím/xanh là thứ NỔI NHẤT trên màn "Hôm nay của tôi"
   nhưng không mang thông tin gì — nó ăn hết chú ý đáng lẽ dành cho chữ đỏ
   "quá 334 ngày". Học Google Classroom: đúng 1 màu nhấn mang đúng 1 nghĩa.
   Chữ đầu tên vẫn phân biệt được người; màu thì không cần gánh việc đó. */
const AV_NEN = "#e8ecf6";
const AV_CHU = "#2b3f7a";

export function Person({ name, size = 22 }: { name: string; size?: number }) {
  const parts = name.trim().split(/\s+/);
  /* Tên rỗng thì parts[0] là chuỗi rỗng — phải chặn, không thì [0][0] ném lỗi */
  const initials = ((parts[0]?.[0] ?? "?") + (parts.length > 1 ? (parts.at(-1)?.[0] ?? "") : "")).toUpperCase();

  return (
    <span className="inline-flex min-w-0 items-center gap-[7px]">
      <span
        className="grid shrink-0 place-items-center rounded-full font-semibold"
        style={{
          background: AV_NEN,
          color: AV_CHU,
          width: size,
          height: size,
          fontSize: Math.round(size * 0.45),
        }}
        aria-hidden="true"
      >
        {initials}
      </span>
      <span className="truncate">{name}</span>
    </span>
  );
}
