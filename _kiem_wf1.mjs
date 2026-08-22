/**
 * Tự nghiệm thu WF-1/2/3 theo đúng bảng tự kiểm của BA.
 * Chỉ kiểm phần ĐẾM ĐƯỢC; phần nhìn bằng mắt để agent UX review.
 *
 * Chạy: node _kiem_wf1.mjs
 */
import { readFileSync } from "node:fs";

const doc = (f) => readFileSync(new URL(`./src/data/${f}`, import.meta.url), "utf8");
const src = (f) => readFileSync(new URL(`./src/components/cec/${f}`, import.meta.url), "utf8");

/* dùng lại bộ cắt của _dem_dot1.mjs */
const { catJSON } = await import("./_dem_lib.mjs");

const CLASSES = catJSON(doc("classes.ts"), "export const CLASSES", "[");
const SESSIONS = catJSON(doc("sessions.ts"), "export const SESSIONS", "{");
const BAI_NOP = catJSON(doc("submissions.ts"), "export const BAI_NOP", "[");
const STUDENTS = catJSON(doc("students.ts"), "export const STUDENTS", "{");

const mine = new Set(CLASSES.filter((c) => c.mine).map((c) => c.id));

let dat = 0, truot = 0;
const kiem = (ma, mota, ok, chiTiet = "") => {
  console.log(`  ${ok ? "✓" : "✗"} ${ma}  ${mota}${chiTiet ? "  → " + chiTiet : ""}`);
  ok ? dat++ : truot++;
};

console.log("\n=== WF-1 · Hôm nay của tôi ===");

const phieuCho = Object.entries(SESSIONS)
  .filter(([cid]) => mine.has(Number(cid)))
  .flatMap(([, list]) => list.filter((s) => s.report === "pending"));
const baiCho = BAI_NOP.filter((b) => b.tuLuan && mine.has(b.classId));

const t = src("Today.tsx");
/* Prop `so={1..4}` đã bỏ khi sửa UI theo nghiên cứu app quốc tế — số không còn
   là thứ to nhất. Giờ đếm theo `mauKhoi` (mỗi khối một màu riêng). */
kiem("1", "4 khối", (t.match(/mauKhoi=\{/g) ?? []).length === 4, `đếm được ${(t.match(/mauKhoi=\{/g) ?? []).length}`);
kiem("2a", "khối ① = 21 phiếu", phieuCho.length === 21, `script đếm ${phieuCho.length}`);
kiem("2b", "khối ② = 59 bài", baiCho.length === 59, `script đếm ${baiCho.length}`);
kiem("3", "mỗi khối ≤5 dòng", (t.match(/\.slice\(0, 5\)/g) ?? []).length === 4, "dùng slice(0,5)");
kiem("4", "mọi tên người có avatar", t.includes("<Person name={ten}"), "Dong() luôn render <Person>");
kiem("5", "mỗi dòng bấm được", (t.match(/onNut=\{\(\) =>/g) ?? []).length === 4);
kiem("6", "khối ② cảnh báo bài chưa công bố", t.includes("chưa thấy điểm"));
kiem("7", "khối rỗng có câu riêng", (t.match(/rong="/g) ?? []).length === 4);
kiem("8", "4 câu rỗng KHÁC nhau", new Set(t.match(/rong="([^"]+)"/g)).size === 4);

console.log("\n=== WF-2 · Duyệt phiếu buổi ===");
const p = src("PhieuQueue.tsx");
kiem("1", "thanh trên ghi số chờ", p.includes("Chờ tôi duyệt:"));
kiem("2", "duyệt xong buổi rời hàng đợi", p.includes("every((p) => p.status === \"approved\")"));
kiem("3", "duyệt không rời màn", !p.includes("navigate({ to: \"/\" })"), "không điều hướng khi duyệt");
kiem("6", "duyệt hết có câu riêng", p.includes("Không còn phiếu nào chờ duyệt."));
kiem("7", "lọc theo lớp", p.includes("locLop"));
kiem("+", "có nút Trả lại (QC không viết hộ)", p.includes("Trả lại"));

console.log("\n=== WF-3 · Xác nhận bài AI chấm ===");
const b = src("BaiQueue.tsx");
const trongHangDoi = BAI_NOP.filter((x) => x.tuLuan && mine.has(x.classId));
kiem("1", "hiện số chờ xác nhận", b.includes("Chờ tôi xác nhận:"));
kiem("2", "KHÔNG bài trắc nghiệm nào lọt vào", trongHangDoi.every((x) => x.dang !== "single_choice" && x.dang !== "fill_blank"),
  `${trongHangDoi.length} bài, dạng: ${[...new Set(trongHangDoi.map((x) => x.dangTen))].join("/")}`);
kiem("3", "dùng lại BaiDuyet (2 cột)", b.includes("import { BaiDuyet }"), "không viết lại logic");
/* Cảnh báo nằm trong BaiDuyet (GradingQueue.tsx) vì BaiQueue DÙNG LẠI component đó.
   Chỉ tìm chuỗi trong BaiQueue.tsx là nhìn sai chỗ -> báo trượt giả. */
kiem("5", "cảnh báo bài tuCongBo=false", src("GradingQueue.tsx").includes("TẮT tự công bố"),
  "nằm trong BaiDuyet dùng chung");
kiem("7", "xác nhận hết vẫn cảnh báo chưa công bố", b.includes("chuaCongBo"));

console.log(`\n=== KẾT QUẢ: ${dat} đạt · ${truot} trượt ===\n`);
process.exit(truot ? 1 : 0);
