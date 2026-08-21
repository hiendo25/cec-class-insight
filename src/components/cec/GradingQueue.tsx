import { useMemo, useState } from "react";
import type { ClassRow } from "@/data/classes";
import { choDuyetCuaLop, mayChamCuaLop, type BaiNop } from "@/data/submissions";
import { daDuyetBai, diemDaDuyet, useOverrides } from "@/data/overrides";
import { IconCheck, IconChevronDown } from "./icons";

const NAVY = "#1e2d5c";
const LINE = "#e6e8ee";
const INK = "#1f2430";
const INK2 = "#6b7280";
const INK3 = "#6a7386";
const OK = "#1f6f4a";
const WARN = "#b8791c";

const tone = (v: number) =>
  v >= 8 ? { bg: "#e6f5ec", fg: OK } : v >= 6.5 ? { bg: "#eaf1fb", fg: "#2b3f7a" }
    : v >= 5 ? { bg: "#fdf3e7", fg: WARN } : { bg: "#fdecea", fg: "#d4342c" };

/**
 * Hàng đợi duyệt bài — Hiền chốt 21/08.
 *
 * Trắc nghiệm (≈91% số part trên PROD) máy chấm xong trả điểm luôn, QC không đụng.
 * Chỉ tự luận / nói mới cần AI chấm rồi QC XÁC NHẬN. Nên vai QC ở đây là
 * NGƯỜI DUYỆT chứ không phải người chấm — khác hẳn màn "chấm bài liên tục"
 * dựng theo con số "chấm bài 50% thời gian" (con số đó sai, Hiền đã bác).
 *
 * Năm quy tắc bắt buộc:
 *  1. Hai nhóm tách biệt, nhóm chờ duyệt ở TRÊN, nhóm máy chấm thu gọn ở dưới
 *  2. Điểm AI CHƯA chính thức tới khi QC xác nhận
 *  3. QC sửa điểm thì giữ lại điểm AI gốc để đối chiếu
 *  4. Bài trắc nghiệm KHÔNG có nút xác nhận
 *  5. next/prev giữ nguyên vị trí trong hàng đợi, không quay về danh sách
 */
export function GradingQueue({ row }: { row: ClassRow }) {
  useOverrides();
  const cho = useMemo(() => choDuyetCuaLop(row.id), [row.id]);
  const may = useMemo(() => mayChamCuaLop(row.id), [row.id]);

  /* Chỉ những bài CHƯA duyệt mới nằm trong hàng đợi */
  const conLai = cho.filter((b) => !daDuyetBai(b.id));
  const [idx, setIdx] = useState(0);
  const [moMayCham, setMoMayCham] = useState(false);

  /* Vị trí có thể vượt quá sau khi duyệt bớt — kẹp lại thay vì để undefined */
  const viTri = Math.min(idx, Math.max(0, conLai.length - 1));
  const bai = conLai[viTri];

  const daXong = cho.length - conLai.length;

  return (
    <div className="flex flex-col gap-[14px]">
      {/* tóm tắt hai nhóm */}
      <div className="flex flex-wrap items-center gap-[10px] text-[12.5px]">
        <span
          className="rounded-[6px] px-[11px] py-[6px] font-semibold"
          style={{ background: conLai.length ? "#fdf3e7" : "#e6f5ec", color: conLai.length ? WARN : OK }}
        >
          {conLai.length ? `Chờ tôi xác nhận: ${conLai.length}` : "Đã duyệt hết"}
        </span>
        <span style={{ color: INK3 }}>Máy đã chấm: {may.length} bài — không cần duyệt</span>
        {daXong > 0 && (
          <span style={{ color: OK }}>· phiên này đã xác nhận {daXong} bài</span>
        )}
      </div>

      {/* ---- nhóm 1: chờ xác nhận ---- */}
      {bai ? (
        <BaiDuyet
          bai={bai}
          viTri={viTri}
          tong={conLai.length}
          onTruoc={() => setIdx((n) => Math.max(0, n - 1))}
          onSau={() => setIdx((n) => Math.min(conLai.length - 1, n + 1))}
        />
      ) : (
        <div
          className="rounded-[8px] bg-white py-[36px] text-center text-[13px]"
          style={{ border: `1px solid ${LINE}`, color: INK3 }}
        >
          {cho.length === 0
            ? "Lớp này chưa có bài tự luận hay bài nói nào cần duyệt."
            : "Đã xác nhận hết bài trong hàng đợi."}
        </div>
      )}

      {/* ---- nhóm 2: máy đã chấm, thu gọn ---- */}
      <section className="rounded-[8px] bg-white" style={{ border: `1px solid ${LINE}` }}>
        <button
          type="button"
          onClick={() => setMoMayCham((v) => !v)}
          className="flex w-full items-center gap-[9px] px-[14px] py-[11px] text-left text-[13px]"
        >
          <span style={{ transform: moMayCham ? "rotate(0deg)" : "rotate(-90deg)", display: "inline-flex" }}>
            <IconChevronDown size={13} />
          </span>
          <span className="font-semibold" style={{ color: INK }}>
            Máy đã chấm ({may.length})
          </span>
          <span className="text-[12px]" style={{ color: INK3 }}>
            — điểm chính thức ngay, QC chỉ xem
          </span>
        </button>

        {moMayCham && (
          <div className="cec-scroll max-h-[320px] overflow-y-auto" style={{ borderTop: `1px solid ${LINE}` }}>
            <table className="w-full border-collapse text-[12.5px]">
              <thead>
                <tr style={{ background: "#f5f7fb" }}>
                  {["Học sinh", "Bài", "Dạng", "Điểm", "Nộp lúc"].map((h) => (
                    <th key={h} className="px-[12px] py-[8px] text-left font-semibold" style={{ color: INK2 }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {may.slice(0, 120).map((b, i) => (
                  <tr key={b.id} style={{ background: i % 2 ? "#f9fbfd" : "#fff", borderTop: "1px solid #eef0f5" }}>
                    <td className="px-[12px] py-[7px]">
                      {b.studentName}{" "}
                      <span className="tabular-nums text-[11px]" style={{ color: INK3 }}>{b.studentCode}</span>
                    </td>
                    <td className="px-[12px]" style={{ color: INK2 }}>{b.baiTen}</td>
                    <td className="px-[12px]" style={{ color: INK3 }}>{b.dangTen}</td>
                    <td className="px-[12px]">
                      {b.diemMay !== null && (
                        <span
                          className="inline-block min-w-[42px] rounded-[5px] px-[7px] py-[2px] text-center font-semibold tabular-nums"
                          style={{ background: tone(b.diemMay).bg, color: tone(b.diemMay).fg }}
                        >
                          {b.diemMay.toFixed(1)}
                        </span>
                      )}
                    </td>
                    <td className="px-[12px] tabular-nums" style={{ color: INK3 }}>{b.nopLuc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {may.length > 120 && (
              <p className="px-[14px] py-[9px] text-[12px]" style={{ color: INK3 }}>
                Hiện 120 trong {may.length} bài máy đã chấm.
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

/** Một bài chờ xác nhận — bài làm bên trái, đề xuất của AI bên phải */
function BaiDuyet({
  bai, viTri, tong, onTruoc, onSau,
}: {
  bai: BaiNop;
  viTri: number;
  tong: number;
  onTruoc: () => void;
  onSau: () => void;
}) {
  const [suaDiem, setSuaDiem] = useState(false);
  const [diem, setDiem] = useState<string>(String(bai.diemAI ?? ""));
  const [nx, setNx] = useState(bai.nhanXetAI ?? "");

  /* Đổi bài thì nạp lại giá trị của bài mới — nếu không QC sẽ thấy điểm bài trước */
  const [dangXem, setDangXem] = useState(bai.id);
  if (dangXem !== bai.id) {
    setDangXem(bai.id);
    setDiem(String(bai.diemAI ?? ""));
    setNx(bai.nhanXetAI ?? "");
    setSuaDiem(false);
  }

  const soDiem = Number(diem);
  const hopLe = diem.trim() !== "" && !Number.isNaN(soDiem) && soDiem >= 0 && soDiem <= 10;
  const daSua = hopLe && soDiem !== bai.diemAI;

  return (
    <section className="rounded-[8px] bg-white" style={{ border: `1px solid ${LINE}` }}>
      {/* thanh điều hướng — next/prev giữ nguyên vị trí, không quay về danh sách */}
      <div
        className="flex flex-wrap items-center gap-[10px] px-[14px] py-[10px]"
        style={{ borderBottom: `1px solid ${LINE}`, background: "#fbfcfe" }}
      >
        <span className="text-[13px] font-semibold" style={{ color: INK }}>
          {bai.studentName}
        </span>
        <span className="tabular-nums text-[11.5px]" style={{ color: INK3 }}>{bai.studentCode}</span>
        <span className="rounded-[4px] px-[7px] py-[2px] text-[11.5px]" style={{ background: "#eef1f7", color: NAVY }}>
          {bai.dangTen}
        </span>
        <span className="text-[12.5px]" style={{ color: INK2 }}>· {bai.baiTen}</span>

        <span className="flex-1" />

        <span className="tabular-nums text-[12.5px]" style={{ color: INK2 }}>
          Bài {viTri + 1}/{tong}
        </span>
        <button
          type="button"
          onClick={onTruoc}
          disabled={viTri === 0}
          className="rounded-[6px] px-[10px] py-[6px] text-[12.5px]"
          style={{
            border: `1px solid ${viTri === 0 ? "#e3e6ec" : "#d9dde5"}`,
            color: viTri === 0 ? "#b9c0cc" : INK,
            cursor: viTri === 0 ? "not-allowed" : "pointer",
          }}
        >
          ‹ Trước
        </button>
        <button
          type="button"
          onClick={onSau}
          disabled={viTri >= tong - 1}
          className="rounded-[6px] px-[10px] py-[6px] text-[12.5px]"
          style={{
            border: `1px solid ${viTri >= tong - 1 ? "#e3e6ec" : "#d9dde5"}`,
            color: viTri >= tong - 1 ? "#b9c0cc" : INK,
            cursor: viTri >= tong - 1 ? "not-allowed" : "pointer",
          }}
        >
          Sau ›
        </button>
      </div>

      <div className="grid gap-[1px] md:grid-cols-2" style={{ background: LINE }}>
        {/* bài làm của em */}
        <div className="bg-white px-[14px] py-[12px]">
          <p className="mb-[8px] text-[12px] font-semibold uppercase tracking-[0.04em]" style={{ color: INK3 }}>
            Bài làm của em
          </p>
          <div
            className="rounded-[6px] px-[12px] py-[11px] text-[13px] leading-[1.65]"
            style={{ background: "#f8f9fc", border: `1px solid ${LINE}`, color: INK }}
          >
            {bai.noiDung ?? (
              <span style={{ color: INK3 }}>
                {bai.dang === "speaking" || bai.dang === "pronunciation"
                  ? "Bài ghi âm — cần chỗ nghe lại. Trường chứa file audio hiện chưa có ở bảng bài nộp, đã ghi vào danh sách yêu cầu BE."
                  : "Nội dung bài làm lấy từ máy chủ khi nối API thật."}
              </span>
            )}
          </div>
          <p className="mt-[8px] text-[11.5px]" style={{ color: INK3 }}>
            Nộp lúc {bai.nopLuc}
          </p>
        </div>

        {/* AI đề xuất */}
        <div className="bg-white px-[14px] py-[12px]">
          <p className="mb-[8px] text-[12px] font-semibold uppercase tracking-[0.04em]" style={{ color: INK3 }}>
            AI đề xuất — chưa chính thức
          </p>

          <div className="flex items-center gap-[10px]">
            <span className="text-[12.5px]" style={{ color: INK2 }}>Điểm:</span>
            {suaDiem ? (
              <input
                value={diem}
                onChange={(e) => setDiem(e.target.value)}
                inputMode="decimal"
                className="w-[74px] rounded-[6px] px-[9px] py-[5px] text-[13px] tabular-nums outline-none"
                style={{ border: `1px solid ${hopLe ? NAVY : "#d4342c"}` }}
              />
            ) : (
              <span
                className="inline-block min-w-[48px] rounded-[5px] px-[9px] py-[3px] text-center text-[13px] font-semibold tabular-nums"
                style={{ background: tone(soDiem).bg, color: tone(soDiem).fg }}
              >
                {hopLe ? soDiem.toFixed(1) : "—"}
              </span>
            )}
            <button
              type="button"
              onClick={() => setSuaDiem((v) => !v)}
              className="text-[12.5px] font-medium hover:underline"
              style={{ color: NAVY }}
            >
              {suaDiem ? "Xong" : "Sửa điểm"}
            </button>
            {/* giữ điểm AI gốc để đối chiếu — quy tắc 3 */}
            {daSua && (
              <span className="text-[11.5px]" style={{ color: WARN }}>
                AI chấm {bai.diemAI?.toFixed(1)}
              </span>
            )}
          </div>

          <p className="mb-[6px] mt-[11px] text-[12.5px]" style={{ color: INK2 }}>Nhận xét:</p>
          <textarea
            value={nx}
            onChange={(e) => setNx(e.target.value)}
            rows={5}
            className="w-full rounded-[6px] px-[11px] py-[9px] text-[12.5px] leading-[1.6] outline-none"
            style={{ border: `1px solid #d9dde5`, color: INK }}
          />
          {nx !== (bai.nhanXetAI ?? "") && (
            <p className="mt-[5px] text-[11.5px]" style={{ color: WARN }}>
              Đã sửa so với bản AI soạn.
            </p>
          )}
        </div>
      </div>

      <div
        className="flex flex-wrap items-center gap-[10px] px-[14px] py-[11px]"
        style={{ borderTop: `1px solid ${LINE}`, background: "#fbfcfe" }}
      >
        <span className="text-[12px]" style={{ color: INK3 }}>
          Điểm chỉ chính thức sau khi bạn xác nhận.
        </span>
        <span className="flex-1" />
        <button
          type="button"
          disabled={!hopLe}
          onClick={() => {
            diemDaDuyet(bai.id, soDiem, bai.diemAI, nx);
            /* ở nguyên vị trí: bài vừa duyệt rời hàng đợi, bài kế tiếp trượt vào đúng chỗ này */
          }}
          className="flex items-center gap-[7px] rounded-[6px] px-[15px] py-[8px] text-[12.5px] font-semibold text-white"
          style={{ background: hopLe ? NAVY : "#b9c0cc", cursor: hopLe ? "pointer" : "not-allowed" }}
          title={hopLe ? undefined : "Điểm phải trong khoảng 0 đến 10"}
        >
          <IconCheck size={13} />
          Xác nhận &amp; bài kế tiếp
        </button>
      </div>
    </section>
  );
}
