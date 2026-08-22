/**
 * Xuất bảng đang xem ra file CSV — mở được bằng Excel.
 *
 * App cũ có nút xuất ở hầu hết bảng (`Download file excel`,
 * `Export Class Recording Table`); app mình trước đó không có chỗ nào.
 * QC hay gửi bảng cho phụ huynh và quản lý, thiếu thì phải chép tay.
 *
 * Xuất ĐÚNG cái đang nhìn thấy — đã lọc, đã sắp xếp. Xuất toàn bộ dữ liệu
 * trong khi màn đang lọc là đưa cho người đọc một tập khác với cái họ vừa xem.
 */

/** Bọc một ô cho đúng luật CSV: nhân đôi dấu nháy, bọc nếu chứa , " hoặc xuống dòng */
const o = (v: unknown): string => {
  const s = v === null || v === undefined ? "" : String(v);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

/**
 * @param tenFile  không cần đuôi .csv
 * @param cot      tiêu đề cột, đúng thứ tự đang hiển thị
 * @param dong     mảng các hàng, mỗi hàng là mảng ô cùng thứ tự với `cot`
 */
export function xuatCSV(tenFile: string, cot: string[], dong: unknown[][]) {
  const noiDung = [cot.map(o).join(","), ...dong.map((d) => d.map(o).join(","))].join("\r\n");

  /* BOM để Excel trên Windows đọc đúng tiếng Việt — thiếu nó thì mở ra toàn ký tự lạ */
  const blob = new Blob(["﻿" + noiDung], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${tenFile}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/** dd/mm/yyyy của hôm nay, dùng đặt tên file cho khỏi trùng */
export const homNayChoTen = (d: Date) =>
  `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
