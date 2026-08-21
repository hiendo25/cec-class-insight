/**
 * Tên người kèm avatar chữ cái đầu — dùng CHUNG cho mọi màn.
 *
 * PROD hiện avatar tròn có màu cho Giáo viên / QC / EC ở mọi chỗ có tên người
 * (ảnh `P01-class-list.png`). Trước đây app mình chỉ có ở bảng danh sách lớp,
 * còn tab Học sinh và tab Lịch học lại hiện tên trần — cùng một thứ mà hai kiểu.
 *
 * Màu suy từ chính tên nên một người luôn ra một màu, không đổi giữa các màn.
 */
const AV = ["#2b3f7a", "#1f6f4a", "#8a5a10", "#6b2fa0", "#136d5e", "#a03c3c"];

export function Person({ name, size = 22 }: { name: string; size?: number }) {
  const parts = name.trim().split(/\s+/);
  /* Tên rỗng thì parts[0] là chuỗi rỗng — phải chặn, không thì [0][0] ném lỗi */
  const initials = ((parts[0]?.[0] ?? "?") + (parts.length > 1 ? (parts.at(-1)?.[0] ?? "") : "")).toUpperCase();
  const bg = AV[[...name].reduce((a, c) => a + c.charCodeAt(0), 0) % AV.length];
  return (
    <span className="inline-flex min-w-0 items-center gap-[7px]">
      <span
        className="grid shrink-0 place-items-center rounded-full font-semibold text-white"
        style={{ background: bg, width: size, height: size, fontSize: Math.round(size * 0.45) }}
        aria-hidden="true"
      >
        {initials}
      </span>
      <span className="truncate">{name}</span>
    </span>
  );
}
