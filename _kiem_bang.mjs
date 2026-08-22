/**
 * Cổng chặn: mọi bảng phải định chiều rộng cột.
 *
 * Cùng một lỗi phải sửa BA lượt mới hết (ExamList → bảng Học sinh → bảng Lịch học)
 * vì mỗi lần chỉ grep chỗ đang nhìn. Ép bằng script để lần sau không sót:
 * thêm bảng mới mà quên colgroup thì script này báo ngay.
 *
 * Chạy: node _kiem_bang.mjs
 */
import { readFileSync, readdirSync } from "node:fs";

const DIR = new URL("./src/components/cec/", import.meta.url);

/** Bảng ít cột, nội dung ngắn đều nhau thì chia đều vẫn ổn — miễn trừ có lý do. */
const MIEN_TRU = {
  "GradingQueue.tsx": "bảng máy đã chấm: 5 cột, nội dung ngắn đều",
  "ClassProgress.tsx": "bảng tiến độ: 4 cột số",
  "MonthlyReport.tsx": "bảng trong modal, bề ngang cố định",
  "OwedStudents.tsx": "6 cột, đã có max-w cho cột dài",
  "ResultMatrix.tsx": "ma trận: số cột thay đổi theo dữ liệu, không định trước được",
  "TestResults.tsx": "ma trận điểm: số cột theo số bài kiểm tra",
};

let loi = 0;
for (const f of readdirSync(DIR)) {
  if (!f.endsWith(".tsx")) continue;
  const src = readFileSync(new URL(f, DIR), "utf8");
  const soBang = (src.match(/<table/g) ?? []).length;
  if (!soBang) continue;

  const soCol = (src.match(/<colgroup/g) ?? []).length;
  const thieu = soBang - soCol;
  if (thieu <= 0) {
    console.log(`  ✓ ${f.padEnd(22)} ${soBang} bảng, đủ colgroup`);
    continue;
  }
  if (MIEN_TRU[f]) {
    console.log(`  – ${f.padEnd(22)} ${thieu} bảng không colgroup — miễn trừ: ${MIEN_TRU[f]}`);
    continue;
  }
  console.log(`  ✗ ${f.padEnd(22)} ${thieu} bảng THIẾU colgroup — cột sẽ bị bóp ở laptop/tablet`);
  loi++;
}

/* Chữ trắng trên nền sáng = vô hình. Chỉ hợp lệ khi cùng dòng có nền đậm. */
console.log("");
let mo = 0;
for (const f of readdirSync(DIR)) {
  if (!f.endsWith(".tsx")) continue;
  const src = readFileSync(new URL(f, DIR), "utf8");
  src.split("\n").forEach((d, i) => {
    if (!/color:\s*"#fff"|text-white/.test(d)) return;
    /* Nền thường khai ở dòng NGAY SAU className — cửa sổ chỉ nhìn về trước
       thì báo lỗi giả. Quét cả hai chiều. */
    const quanh = src.split("\n").slice(Math.max(0, i - 5), i + 6).join(" ");
    /* `background:` hay đi kèm biểu thức ba ngôi (`dem > 0 ? NAVY : "#b9c0cc"`),
       nên không neo ngay sau dấu hai chấm — tìm tên màu đậm ở bất kỳ đâu trong
       khối `background`. */
    const coNenDam =
      /background:[^;}]*\b(NAVY|OK|WARN|DANGER)\b/.test(quanh) ||
      /background:[^;}]*"#(1|2|d4|8a|6b|13|a0)/.test(quanh) ||
      /bg-\[#/.test(quanh) ||
      /* nền lấy từ biến bảng màu (avatar chọn màu theo tên) — script không suy
         được giá trị, đã soi tay 4 chỗ này, tất cả đều là màu đậm */
      /background:\s*bg\b/.test(quanh);
    if (!coNenDam) {
      console.log(`  ✗ ${f}:${i + 1} chữ trắng, không thấy nền đậm quanh đó`);
      mo++;
    }
  });
}
if (!mo) console.log("  ✓ không có chữ trắng nào nằm trên nền sáng");

console.log(`\n=== ${loi + mo === 0 ? "ĐẠT" : `✗ ${loi + mo} lỗi`} ===\n`);
process.exit(loi + mo ? 1 : 0);
