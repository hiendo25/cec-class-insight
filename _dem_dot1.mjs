/**
 * Script đếm chuẩn cho Đợt 1 — NGUỒN SỰ THẬT DUY NHẤT cho mọi con số.
 *
 * Vì sao cần: bảng tự kiểm của BA có 6 dòng ghi "so với script đếm" mà script
 * không tồn tại, nên hai người đếm tay ra hai kết quả (draft 123 vs 122).
 * Từ giờ mọi con số trong tài liệu và trong bảng nghiệm thu đều lấy từ đây.
 *
 * Chạy: node _dem_dot1.mjs
 */
import { readFileSync } from "node:fs";

import { catJSON } from "./_dem_lib.mjs";

const doc = (f) => readFileSync(new URL(`./src/data/${f}`, import.meta.url), "utf8");

/* ---- nguồn ---- */
const sClasses = doc("classes.ts");
const sSessions = doc("sessions.ts");
const sReports = doc("reports.ts");
const sSubs = doc("submissions.ts");
const sExams = doc("exams.ts");
const sStudents = doc("students.ts");

const CLASSES = catJSON(sClasses, "export const CLASSES", "[");
const REPORTS = catJSON(sReports, "export const REPORTS", "{");
const MONTHLY = catJSON(sReports, "export const MONTHLY", "{");
const BAI_NOP = catJSON(sSubs, "export const BAI_NOP", "[");
const EXAMS = catJSON(sExams, "export const EXAMS", "[");
const STUDENTS = catJSON(sStudents, "export const STUDENTS", "{");

/* SESSIONS khai báo Record nên cắt riêng phần thân */
const SESSIONS = catJSON(sSessions, "export const SESSIONS", "{");

const dem = (arr, f) => arr.filter(f).length;
const bang = (nhan, val) => console.log(`  ${nhan.padEnd(42)} ${String(val).padStart(6)}`);

console.log("\n=== LỚP ===");
bang("tổng số lớp", CLASSES.length);
bang("lớp của tôi (mine)", dem(CLASSES, (c) => c.mine));
bang("đang diễn ra", dem(CLASSES, (c) => c.status === "Đang diễn ra"));
bang("có capacity (sĩ số vẽ được mẫu số)", dem(CLASSES, (c) => c.capacity !== null));
bang("lớp 1-1", dem(CLASSES, (c) => c.type === "Lớp 1-1"));

console.log("\n=== HỌC SINH ===");
const hsAll = Object.values(STUDENTS).flat();
bang("tổng học sinh", hsAll.length);
for (const st of ["Đang học", "Bảo lưu", "Đã chuyển lớp", "Đã nghỉ"])
  bang(`  ${st}`, dem(hsAll, (s) => s.state === st));

console.log("\n=== PHIẾU NHẬN XÉT BUỔI (Session.report) ===");
const buoi = Object.values(SESSIONS).flat();
bang("tổng buổi", buoi.length);
for (const st of ["draft", "pending", "approved"])
  bang(`  ${st}`, dem(buoi, (s) => s.report === st));
bang("  null (chưa diễn ra)", dem(buoi, (s) => s.report === null));

console.log("\n=== PHIẾU TỪNG HỌC SINH (REPORTS) ===");
const rp = Object.values(REPORTS).flat();
bang("tổng phiếu", rp.length);
for (const st of ["draft", "pending", "approved"])
  bang(`  ${st}`, dem(rp, (r) => r.status === st));

console.log("\n=== BÀI NỘP ===");
bang("tổng bài nộp", BAI_NOP.length);
bang("tự luận/nói — CHỜ QC XÁC NHẬN", dem(BAI_NOP, (b) => b.tuLuan));
bang("máy chấm — không cần duyệt", dem(BAI_NOP, (b) => !b.tuLuan));
bang("đề TẮT tự công bố (duyệt xong HS chưa thấy điểm)", dem(BAI_NOP, (b) => !b.tuCongBo));

console.log("\n=== BÁO CÁO THÁNG ===");
const mt = Object.values(MONTHLY).flat();
bang("tổng bản báo cáo", mt.length);
bang("học sinh có báo cáo", Object.keys(MONTHLY).length);
bang("HS có ≥2 tháng (so được tháng trước)", dem(Object.values(MONTHLY), (v) => v.length >= 2));
for (const st of ["draft", "pending", "approved"])
  bang(`  ${st}`, dem(mt, (m) => m.status === st));

console.log("\n=== ĐỀ BÀI ===");
bang("tổng đề", EXAMS.length);
for (const st of ["Nháp", "Đã xuất bản", "Đã xuất bản · đang sửa bản mới"])
  bang(`  ${st}`, dem(EXAMS, (e) => e.trangThai === st));

/* ---- cổng chặn: dữ liệu tự mâu thuẫn thì báo ngay ---- */
console.log("\n=== CỔNG CHẶN ===");
const loi = [];
for (const c of CLASSES) {
  if (c.capacity === null) loi.push(`${c.code}: capacity null`);
  else if (c.enrolled !== null && c.enrolled > c.capacity)
    loi.push(`${c.code}: sĩ số ${c.enrolled} > sức chứa ${c.capacity}`);
  if (c.type === "Lớp 1-1" && (c.enrolled ?? 0) > 1)
    loi.push(`${c.code}: lớp 1-1 mà có ${c.enrolled} HS`);
}
console.log(loi.length ? `  ✗ ${loi.length} lỗi:` : "  ✓ không có mâu thuẫn");
loi.slice(0, 8).forEach((x) => console.log("    " + x));
console.log("");
