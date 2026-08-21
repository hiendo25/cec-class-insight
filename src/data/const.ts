/**
 * Hằng số dùng chung — MỘT nguồn duy nhất.
 *
 * Trước đây `TODAY` khai báo riêng ở hai file với hai giá trị khác nhau
 * (`OwedStudents.tsx` = 21/08, `StudentProfile.tsx` = 20/08), nên hai màn
 * liền nhau trong cùng một luồng cho ra số ngày nợ bài lệch nhau một ngày.
 * Màu cũng lặp ở 13 file — đổi một chỗ thì sót 12 chỗ còn lại.
 */

/** Ngày "hôm nay" của bản dựng. Nối API thật thì thay bằng new Date(). */
export const TODAY = new Date(2026, 7, 21);

/** dd/mm/yyyy (một hoặc hai chữ số) -> Date. Sai định dạng trả null chứ không NaN. */
export const parseNgay = (s: string): Date | null => {
  const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(s.trim());
  return m ? new Date(+m[3]!, +m[2]! - 1, +m[1]!) : null;
};

/** Số ngày từ `s` tới hôm nay. Dương = đã qua. null nếu ngày hỏng. */
export const soNgayToi = (s: string): number | null => {
  const d = parseNgay(s);
  return d ? Math.round((TODAY.getTime() - d.getTime()) / 86400000) : null;
};

/* ---- Bảng màu ---- */
export const NAVY = "#1e2d5c";
export const LINE = "#e6e8ee";
export const INK = "#1f2430";
export const INK2 = "#6b7280";
export const INK3 = "#6a7386";
export const OK = "#1f6f4a";
export const WARN = "#b8791c";
export const DANGER = "#d4342c";

/** Màu theo thang điểm 10 — dùng CHUNG mọi màn.
 *  Trước đây hai thang đá nhau: chỗ ngưỡng 7/5, chỗ 8/6.5/5. */
export const tone = (v: number) =>
  v >= 8
    ? { bg: "#e6f5ec", fg: OK }
    : v >= 6.5
      ? { bg: "#eaf1fb", fg: "#2b3f7a" }
      : v >= 5
        ? { bg: "#fdf3e7", fg: WARN }
        : { bg: "#fdecea", fg: DANGER };
