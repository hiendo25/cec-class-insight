import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CLASSES } from "@/data/classes";
import { BAI_NOP } from "@/data/submissions";
import { INK, INK2, INK3, LINE, NAVY, OK, WARN } from "@/data/const";
import { daDuyetBai, useOverrides } from "@/data/overrides";
import { BaiDuyet } from "./GradingQueue";

/**
 * Hàng đợi xác nhận bài AI chấm — XUYÊN LỚP (WF-3).
 *
 * Dùng LẠI thành phần `BaiDuyet` của tab Duyệt bài trong lớp, chỉ đổi nguồn:
 * thay vì một lớp thì gom mọi lớp QC phụ trách. Viết lại logic duyệt ở đây
 * là tạo bản sao thứ hai — sửa một chỗ sẽ sót chỗ kia.
 */
export function BaiQueue() {
  useOverrides();
  const navigate = useNavigate();
  const [locLop, setLocLop] = useState("");

  const tenLop = useMemo(() => new Map(CLASSES.map((c) => [c.id, c.code])), []);
  const idCuaToi = useMemo(() => new Set(CLASSES.filter((c) => c.mine).map((c) => c.id)), []);

  const tatCa = useMemo(
    () => BAI_NOP.filter((b) => b.tuLuan && idCuaToi.has(b.classId)),
    [idCuaToi],
  );
  const conLai = tatCa.filter((b) => !daDuyetBai(b.id));
  const chuaCongBo = tatCa.filter((b) => daDuyetBai(b.id) && !b.tuCongBo);

  const list = locLop ? conLai.filter((b) => String(b.classId) === locLop) : conLai;
  const lopCo = useMemo(
    () => [...new Set(conLai.map((b) => b.classId))].map((id) => ({ id, code: tenLop.get(id) ?? "" })),
    [conLai, tenLop],
  );

  const [idx, setIdx] = useState(0);
  const viTri = Math.min(idx, Math.max(0, list.length - 1));
  const bai = list[viTri];

  return (
    <div className="flex flex-col gap-[13px]">
      <div className="flex flex-wrap items-center gap-[10px] text-[12.5px]">
        <span
          className="rounded-[6px] px-[11px] py-[6px] font-semibold"
          style={{ background: list.length ? "#fdf3e7" : "#e6f5ec", color: list.length ? WARN : OK }}
        >
          {list.length ? `Chờ tôi xác nhận: ${list.length}` : "Đã xác nhận hết"}
        </span>
        <select
          value={locLop}
          onChange={(e) => { setLocLop(e.target.value); setIdx(0); }}
          className="rounded-[6px] px-[10px] py-[6px] text-[12.5px]"
          style={{ border: `1px solid ${locLop ? NAVY : "#d9dde5"}`, background: "#fff", color: locLop ? INK : INK2 }}
        >
          <option value="">Tất cả {lopCo.length} lớp</option>
          {lopCo.map((l) => (
            <option key={l.id} value={String(l.id)}>{l.code}</option>
          ))}
        </select>
        <span style={{ color: INK3 }}>
          Chỉ bài tự luận và bài nói — trắc nghiệm máy chấm xong trả điểm ngay
        </span>
      </div>

      {/* Ngõ cụt im lặng: xác nhận rồi mà đề tắt tự công bố thì HS vẫn trắng điểm */}
      {chuaCongBo.length > 0 && (
        <div
          className="flex flex-wrap items-center gap-[10px] rounded-[8px] px-[14px] py-[11px] text-[12.5px]"
          style={{ background: "#fdf3e7", border: "1px solid #f0dcc0", color: WARN }}
        >
          <strong>{chuaCongBo.length} bài đã xác nhận nhưng học sinh CHƯA thấy điểm.</strong>
          <span style={{ color: INK2 }}>
            Đề của các bài này tắt &ldquo;tự công bố kết quả&rdquo; — cần công bố thêm một bước.
          </span>
        </div>
      )}

      {!bai ? (
        <p
          className="rounded-[10px] bg-white py-[40px] text-center text-[13px]"
          style={{ border: `1px solid ${LINE}`, color: locLop ? INK3 : OK }}
        >
          {locLop ? (
            <>
              Lớp này không còn bài nào chờ xác nhận.{" "}
              <button type="button" onClick={() => setLocLop("")} className="font-semibold underline" style={{ color: NAVY }}>
                Bỏ lọc để xem cả {conLai.length} bài
              </button>
            </>
          ) : (
            "Không còn bài nào chờ xác nhận."
          )}
        </p>
      ) : (
        <>
          <p className="text-[12px]" style={{ color: INK3 }}>
            Đang xem bài của lớp{" "}
            <button
              type="button"
              onClick={() => navigate({ to: "/class/$classId/$tab", params: { classId: String(bai.classId), tab: "duyet-bai" } })}
              className="font-semibold hover:underline"
              style={{ color: NAVY }}
            >
              {tenLop.get(bai.classId)}
            </button>
          </p>
          <BaiDuyet
            bai={bai}
            viTri={viTri}
            tong={list.length}
            onTruoc={() => setIdx((n) => Math.max(0, n - 1))}
            onSau={() => setIdx((n) => Math.min(list.length - 1, n + 1))}
          />
        </>
      )}
    </div>
  );
}
