/**
 * Logo CEC — dùng đúng file gốc lấy từ CEC PROD (/cec-white-logo.png).
 * Chữ CEC màu trắng nên chỉ đặt trên nền tối (sidebar navy).
 */
export function Logo({ width = 104 }: { width?: number }) {
  return (
    <img
      src="/cec-white-logo.png"
      alt="CEC"
      width={width}
      style={{ width, height: "auto", display: "block", imageRendering: "auto" }}
    />
  );
}
