import { useMemo, useState } from "react";
import { NAVY, LINE, INK, INK2, INK3, OK, WARN, DANGER } from "@/data/const";
import { useNavigate } from "@tanstack/react-router";
import type { Exam, ExamPart } from "@/data/exams";
import { KHO_CAU } from "@/data/questions";
import { topicFull } from "@/data/topics";
import { useAction } from "./ActionDialog";
import { TT_STYLE } from "./ExamList";
import { IconCheck, IconChevronLeft, IconClipboard, IconWarn } from "./icons";


/* KHÔNG có tab "Converter" ở đây. `Converter` là tab LỌC ở màn danh sách đề
   (`ExamList`), không phải tab trong chi tiết một đề — tôi đặt nhầm chỗ một lượt,
   tab hiện ra mà bấm vào là màn trắng. Ở chi tiết, đề do AI sinh được đánh dấu
   bằng nhãn "✦ AI Converter" cạnh tên đề. */
const TABS = ["Cấu trúc đề", "Cấu hình đề", "Lịch sử phiên bản"] as const;
type Tab = (typeof TABS)[number];

/** Một nhóm cấu hình — PROD chia 7 nhóm, không đổ 25 ô thành một khối. */
function Nhom({ ten, children }: { ten: string; children: React.ReactNode }) {
  return (
    <div className="mt-[16px] border-t pt-[13px]" style={{ borderColor: LINE }}>
      <p className="mb-[10px] text-[11.5px] font-semibold uppercase" style={{ color: INK3, letterSpacing: "0.05em" }}>
        {ten}
      </p>
      <div className="grid grid-cols-2 gap-[16px] md:grid-cols-3">{children}</div>
    </div>
  );
}

function O({ nhan, giaTri, canhBao }: { nhan: string; giaTri: string; canhBao?: string }) {
  return (
    <div className="flex flex-col gap-[3px]">
      <span className="text-[11px] uppercase tracking-wide" style={{ color: INK3 }}>
        {nhan}
      </span>
      <span className="text-[13.5px]" style={{ color: INK }}>
        {giaTri}
      </span>
      {canhBao && (
        <span className="text-[12px]" style={{ color: WARN }}>
          {canhBao}
        </span>
      )}
    </div>
  );
}

/**
 * Chi tiết một đề — bản QC dùng để KIỂM trước khi giao.
 *
 * Bỏ hết nút soạn/xuất bản/nhân bản của PROD vì không thuộc việc QC.
 * Giữ đúng ba việc QC làm: xem cấu trúc, đọc cấu hình chấm điểm, và Thử làm.
 */
export function ExamDetail({ exam }: { exam: Exam }) {
  const navigate = useNavigate();
  const { ask } = useAction();
  const [tab, setTab] = useState<Tab>("Cấu trúc đề");
  /* Bấm "Thử làm" thì mở luôn bản thử ngay trong màn — trước đây chỉ báo
     "Đang mở bản thử..." mà không mở gì, tức nút nói dối đúng ở chỗ quan trọng
     nhất của màn này. */
  const [thuLam, setThuLam] = useState(false);
  const tt = TT_STYLE[exam.trangThai] ?? TT_STYLE["Nháp"]!;

  const chuaXuatBan = exam.trangThai === "Nháp";
  /* bug đã biết trong kho: part dạng sắp xếp mà bật trộn câu là hỏng đáp án */
  const ruiRoTron = exam.tronCauHoi && exam.parts.some((p) => p.dang === "ordering");
  const chuaGanChuDiem = exam.parts.filter((p) => !p.topic).length;

  return (
    <div className="flex flex-col gap-[14px]">
      <button
        type="button"
        onClick={() => navigate({ to: "/exam" })}
        className="flex w-fit items-center gap-1 text-[13px]"
        style={{ color: NAVY }}
      >
        <IconChevronLeft size={15} /> Về kho đề
      </button>

      {/* đầu trang */}
      <div className="flex flex-wrap items-start gap-[12px] rounded-[8px] bg-white px-[16px] py-[13px]" style={{ border: `1px solid ${LINE}` }}>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-[10px]">
            <h1 className="text-[24px] font-medium" style={{ letterSpacing: "-0.02em" }}>
              {exam.ten}
            </h1>
            <span className="rounded-full px-[9px] py-[3px] text-[11.5px] font-medium" style={{ background: tt.bg, color: tt.fg }}>
              {tt.ngan}
            </span>
            <span className="rounded-[4px] px-[7px] py-[2px] text-[11.5px] font-semibold" style={{ background: "#eef1f7", color: NAVY }}>
              {exam.phienBan}
            </span>
            {/* Đề AI Converter sinh phải nhìn ra ngay — đây là loại rủi ro cao
                nhất, QC cần soi kỹ hơn đề người soạn. */}
            {exam.tuAI && (
              <span
                className="rounded-[4px] px-[7px] py-[2px] text-[11.5px] font-medium"
                style={{ background: "var(--ai-nen)", color: "var(--ai-chu)", border: "1px solid var(--ai-vien)" }}
                title="Đề do AI Converter sinh — cần rà kỹ trước khi giao"
              >
                ✦ AI Converter
              </span>
            )}
          </div>
          <p className="mt-[4px] text-[12.5px]" style={{ color: INK2 }}>
            {exam.ma} · {exam.loai} · {exam.kyNang} · {exam.capDo} · {exam.soCau} câu ·{" "}
            {exam.thoiGian} phút · {exam.coSo}
          </p>
          <p className="mt-[2px] text-[12px]" style={{ color: INK3 }}>
            Người tạo {exam.nguoiTao} · {exam.ngayTao}
            {exam.chuong ? ` · ${exam.chuong}` : ""}
            {exam.baiHoc ? ` · ${exam.baiHoc}` : ""}
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            ask({
              title: "Thử làm đề",
              body: (
                <>
                  Làm thử <strong>{exam.ten}</strong> ({exam.soCau} câu) để kiểm đáp án và máy chấm
                  trước khi giao cho học sinh. Bài thử không tính vào kết quả của em nào.
                </>
              ),
              confirmLabel: "Bắt đầu thử làm",
              doneText: `Đã mở bản thử của ${exam.ten}.`,
              run: () => setThuLam(true),
            })
          }
          className="flex shrink-0 items-center gap-[7px] rounded-[8px] px-[13px] py-[8px] text-[12.5px] font-semibold text-white"
          style={{ background: NAVY }}
        >
          <IconClipboard size={15} /> Thử làm
        </button>
      </div>

      {/* cảnh báo trước khi giao */}
      {(chuaXuatBan || ruiRoTron) && (
        <div className="flex flex-col gap-[6px]">
          {chuaXuatBan && (
            <p
              className="flex items-center gap-[8px] rounded-[8px] px-[13px] py-[9px] text-[12.5px]"
              style={{ background: "#fdecea", border: "1px solid #f3cfcb", color: DANGER }}
            >
              <IconWarn size={15} />
              Đề còn ở trạng thái <strong>Nháp</strong> — chưa xuất bản thì <strong>không giao được</strong>.
              Cần người soạn đề xuất bản trước.
            </p>
          )}
          {ruiRoTron && (
            <p
              className="flex items-center gap-[8px] rounded-[8px] px-[13px] py-[9px] text-[12.5px]"
              style={{ background: "#fdf8ef", border: "1px solid #f0dfc0", color: "#7a5410" }}
            >
              <IconWarn size={15} />
              Đề có phần <strong>sắp xếp câu</strong> mà lại bật <strong>trộn câu hỏi</strong> — trộn
              là hỏng đáp án. Báo người soạn đề tắt trộn trước khi giao.
            </p>
          )}
        </div>
      )}

      {thuLam && <ThuLam exam={exam} onDong={() => setThuLam(false)} />}

      {/* tab */}
      <nav className="flex items-end gap-[3px]" style={{ borderBottom: `1px solid ${LINE}` }}>
        {TABS.map((t) => {
          const on = t === tab;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className="rounded-t-[7px] px-[15px] py-[9px] text-[13px]"
              style={{
                background: on ? "#fff" : "transparent",
                border: on ? `1px solid ${LINE}` : "1px solid transparent",
                borderBottomColor: on ? "#fff" : LINE,
                marginBottom: -1,
                fontWeight: on ? 700 : 500,
                color: on ? INK : INK2,
              }}
            >
              {t}
            </button>
          );
        })}
      </nav>

      {tab === "Cấu trúc đề" && (
        <div className="flex flex-col gap-[10px]">
          <p className="text-[12.5px]" style={{ color: INK2 }}>
            {exam.parts.length} phần · {exam.soCau} câu · {exam.diemTong} điểm
            {chuaGanChuDiem > 0 && (
              <span style={{ color: WARN }}>
                {" "}· {chuaGanChuDiem}/{exam.parts.length} phần chưa gắn chủ điểm nên không vào được
                thống kê nhóm lỗi của học sinh
              </span>
            )}
          </p>

          {exam.parts.map((p) => (
            <section key={p.id} className="rounded-[8px] bg-white px-[14px] py-[11px]" style={{ border: `1px solid ${LINE}` }}>
              <div className="flex flex-wrap items-center gap-[10px]">
                <span className="text-[13.5px] font-semibold" style={{ color: INK }}>
                  Phần {p.no}
                </span>
                <span className="rounded-[4px] px-[7px] py-[2px] text-[11.5px]" style={{ background: "#eef1f7", color: NAVY }}>
                  {p.dangTen}
                </span>
                <span className="text-[12.5px] tabular-nums" style={{ color: INK2 }}>
                  {p.soCau} câu
                </span>
                <span className="flex-1" />
                {p.topic ? (
                  <span className="text-[12px]" style={{ color: INK2 }}>
                    {topicFull(p.topic)}
                  </span>
                ) : (
                  <span className="text-[12px]" style={{ color: WARN }}>
                    chưa gắn chủ điểm
                  </span>
                )}
              </div>
              <p className="mt-[5px] text-[12.5px]" style={{ color: INK2 }}>
                {p.huongDan}
              </p>
              <PhanCau part={p} moSan={exam.parts.length <= 2} />
            </section>
          ))}
        </div>
      )}

      {tab === "Cấu hình đề" && (
        <section className="rounded-[8px] bg-white px-[16px] py-[14px]" style={{ border: `1px solid ${LINE}` }}>
          <div className="grid grid-cols-2 gap-[16px] md:grid-cols-3">
            <O nhan="Tổng điểm" giaTri={`${exam.diemTong} điểm`} />
            <O nhan="Điểm đạt" giaTri={`${exam.diemDat} điểm`} />
            <O nhan="Thời gian làm" giaTri={`${exam.thoiGian} phút`} />
            <O
              nhan="Số lần làm"
              giaTri={
                exam.soLanLam === 0
                  ? "Không giới hạn"
                  : exam.soLanLam === 1
                    ? "1 lần — không cho làm lại"
                    : `${exam.soLanLam} lần`
              }
            />
            <O
              nhan="Trộn câu hỏi"
              giaTri={exam.tronCauHoi ? "Bật" : "Tắt"}
              {...(exam.tronCauHoi && exam.parts.some((p) => p.dang === "ordering")
                ? { canhBao: "Đề có phần sắp xếp — trộn là hỏng đáp án" }
                : {})}
            />
            <O nhan="Nộp bài giấy" giaTri={exam.nopBaiGiay ? "Có" : "Không"} />
            <O
              nhan="Tự công bố kết quả"
              giaTri={exam.tuCongBoKetQua ? "Có — học sinh thấy điểm ngay" : "Không — chờ QC duyệt"}
            />
          </div>

          {/* Trước đây màn này chỉ hiện 7/25 trường của PROD. QC không kiểm được
              đề thi đã bật chống gian lận chưa, học sinh sau khi nộp có thấy đáp
              án không, bài viết/nói có rubric để chấm không. Dữ liệu vốn đã có
              đủ ở `data/exams.ts` — chỉ thiếu lớp hiển thị. */}
          <Nhom ten="Thông tin">
            <O nhan="Nhiều phần" giaTri={exam.nhieuPhan ? "Có" : "Chỉ 1 phần"} />
            <O nhan="Chương" giaTri={exam.chuong ?? "chưa gán"} />
            <O nhan="Bài học" giaTri={exam.baiHoc ?? "chưa gán"} />
            <O nhan="Nhân bản từ" giaTri={exam.nhanBanTu ?? "—"} />
            <O nhan="Mô tả" giaTri={exam.moTa || "—"} />
          </Nhom>

          <Nhom ten="Phân loại">
            <O nhan="Kỹ năng bài tập" giaTri={exam.kyNangBai.join(" · ") || "chưa gán"} />
            <O nhan="Chủ điểm" giaTri={topicFull(exam.topic)} />
            <O nhan="Cấp độ" giaTri={exam.capDo} />
          </Nhom>

          <Nhom ten="Cấu hình làm bài">
            <O nhan="Cho làm lại" giaTri={exam.choLamLai} />
            <O nhan="Lấy điểm" giaTri={exam.layDiem} />
            <O nhan="Sau khi nộp" giaTri={exam.sauKhiNop} />
            <O
              nhan="Cho thấy điểm"
              giaTri={exam.choThayDiem ? "Có" : "Không"}
              {...(exam.choThayDiem && !exam.tuCongBoKetQua
                ? { canhBao: "Bật cho thấy điểm nhưng tắt tự công bố — HS chỉ thấy sau khi QC duyệt" }
                : {})}
            />
          </Nhom>

          <Nhom ten="Chống gian lận">
            <O nhan="Toàn màn hình" giaTri={exam.toanManHinh ? "Bật" : "Tắt"} />
            <O nhan="Chặn chuyển tab" giaTri={exam.chanChuyenTab ? "Bật" : "Tắt"} />
            <O
              nhan="Đình chỉ sau vi phạm"
              giaTri={
                exam.dinhChiSauViPham === 0 ? "Không đình chỉ" : `${exam.dinhChiSauViPham} lần`
              }
            />
          </Nhom>

          <Nhom ten="Cấu hình chấm">
            <O
              nhan="Khung chấm (rubric)"
              giaTri={exam.rubric ?? "chưa có"}
              {...(!exam.rubric && exam.parts.some((x) => x.dang === "essay" || x.dang === "speaking")
                ? { canhBao: "Đề có phần viết/nói mà chưa có khung chấm — QC không có căn cứ xác nhận điểm AI" }
                : {})}
            />
          </Nhom>

          <Nhom ten="Mặc định khi giao bài">
            <O nhan="Thời gian" giaTri={`${exam.macDinhThoiGian} phút`} />
            <O nhan="Số lần làm" giaTri={exam.macDinhSoLan} />
            <O nhan="Hạn nộp" giaTri={`${exam.macDinhHanNopGio} giờ sau khi giao`} />
          </Nhom>

          <p className="mt-[14px] flex items-center gap-[7px] text-[12px]" style={{ color: INK3 }}>
            <IconCheck size={13} />
            Đây là cấu hình mặc định của đề. Khi giao bài, QC được đổi riêng cho từng lớp mà không
            ảnh hưởng đề gốc.
          </p>
        </section>
      )}

      {tab === "Lịch sử phiên bản" && (
        <section className="rounded-[8px] bg-white" style={{ border: `1px solid ${LINE}` }}>
          {[
            { v: exam.phienBan, ngay: exam.ngayTao, ai: exam.nguoiTao, mo: "Bản đang dùng" },
            ...(exam.phienBan === "v2"
              ? [{ v: "v1", ngay: exam.ngayTao, ai: exam.nguoiTao, mo: "Bản đã xuất bản trước đó" }]
              : []),
          ].map((x, i) => (
            <div
              key={x.v}
              className="flex flex-wrap items-center gap-[12px] px-[16px] py-[11px] text-[13px]"
              style={{ borderTop: i ? `1px solid ${LINE}` : undefined }}
            >
              <span className="rounded-[4px] px-[8px] py-[2px] text-[12px] font-semibold" style={{ background: "#eef1f7", color: NAVY }}>
                {x.v}
              </span>
              <span style={{ color: INK }}>{x.mo}</span>
              <span className="flex-1" />
              <span style={{ color: INK2 }}>{x.ai}</span>
              <span className="tabular-nums" style={{ color: INK3 }}>{x.ngay}</span>
            </div>
          ))}
          <p className="px-[16px] py-[10px] text-[12px]" style={{ color: INK3, borderTop: `1px solid ${LINE}` }}>
            Dùng để truy vết khi điểm học sinh có vấn đề: bài em làm thuộc phiên bản nào, ai sửa,
            sửa lúc nào.
          </p>
        </section>
      )}
    </div>
  );
}

/** Bản thử của đề — QC làm thử để kiểm đáp án và máy chấm trước khi giao */
function ThuLam({ exam, onDong }: { exam: Exam; onDong: () => void }) {
  const [phan, setPhan] = useState(0);
  const p = exam.parts[phan]!;

  return (
    <section className="rounded-[8px] bg-white" style={{ border: `2px solid ${NAVY}` }}>
      <div
        className="flex flex-wrap items-center gap-[10px] px-[15px] py-[10px]"
        style={{ background: "#eef1f7", borderBottom: `1px solid ${LINE}` }}
      >
        <span className="text-[13px] font-semibold" style={{ color: NAVY }}>
          Bản thử — {exam.ten}
        </span>
        <span className="text-[12px]" style={{ color: INK2 }}>
          Bài thử không tính vào kết quả của học sinh nào.
        </span>
        <span className="flex-1" />
        <button
          type="button"
          onClick={onDong}
          className="rounded-[8px] px-[11px] py-[6px] text-[12.5px]"
          style={{ border: `1px solid ${LINE}`, background: "#fff", color: INK }}
        >
          Đóng bản thử
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-[7px] px-[15px] pt-[11px] text-[12.5px]">
        {exam.parts.map((x, i) => (
          <button
            key={x.id}
            type="button"
            onClick={() => setPhan(i)}
            className="rounded-[8px] px-[10px] py-[5px]"
            style={{
              border: `1px solid ${i === phan ? NAVY : LINE}`,
              background: i === phan ? "#eef1f7" : "#fff",
              color: i === phan ? NAVY : INK2,
              fontWeight: i === phan ? 600 : 400,
            }}
          >
            Phần {x.no} · {x.dangTen}
          </button>
        ))}
      </div>

      <div className="px-[15px] py-[13px]">
        <p className="mb-[10px] text-[13px]" style={{ color: INK }}>
          {p.huongDan}
        </p>
        <div className="flex flex-col gap-[9px]">
          {Array.from({ length: Math.min(p.soCau, 5) }, (_, i) => (
            <div
              key={i}
              className="rounded-[8px] px-[12px] py-[9px] text-[13px]"
              style={{ border: `1px solid ${LINE}`, background: "#fbfcfe", color: INK2 }}
            >
              <span className="font-semibold" style={{ color: INK }}>
                Câu {i + 1}.
              </span>{" "}
              Nội dung câu hỏi lấy từ đề gốc — cần API đọc câu hỏi của bản dựng thật.
            </div>
          ))}
          {p.soCau > 5 && (
            <p className="text-[12px]" style={{ color: INK3 }}>
              … và {p.soCau - 5} câu nữa trong phần này.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}


/** Câu hỏi của một phần — MỞ RA XEM ĐƯỢC, kèm đáp án và lời giải.
 *
 *  Trước đây cả bốn phần chỉ hiện đúng một câu "Làm theo yêu cầu của đề":
 *  QC mở màn ra không đọc được câu nào, không thấy đáp án, tức không kiểm được
 *  gì — mà kiểm đề chính là việc của QC. Đó là màn Hiền bắt 22/08.
 *
 *  Gốc không phải lỗi hiển thị mà là KHÔNG CÓ TẦNG DỮ LIỆU CÂU HỎI: `ExamPart`
 *  chỉ có `soCau` là con số, nên 180 đề · 432 phần · 4.220 câu đều rỗng ruột.
 *  Câu ở đây lấy từ kho A1 thật của CEC và kho ôn luyện tak12 (`KHO_CAU`).
 *
 *  Đáp án chỉ QC thấy — đây là màn quản trị, không phải màn học sinh làm bài.
 */
function PhanCau({ part, moSan }: { part: ExamPart; moSan: boolean }) {
  const [mo, setMo] = useState(moSan);
  const [hienDap, setHienDap] = useState(true);

  /* Chọn câu ổn định theo id phần: cùng một phần luôn ra cùng bộ câu, không
     đổi mỗi lần vẽ lại. Không có Math.random ở đây là cố ý. */
  const cau = useMemo(() => {
    const kho = KHO_CAU[part.dang] ?? [];
    if (!kho.length) return [];
    let h = 0;
    for (const c of part.id) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    return Array.from({ length: Math.min(part.soCau, kho.length) }, (_, i) =>
      kho[(h + i * 7) % kho.length]!,
    );
  }, [part.id, part.dang, part.soCau]);

  if (!cau.length)
    return (
      <p className="mt-[8px] text-[12px]" style={{ color: INK3 }}>
        Chưa có nội dung câu hỏi cho dạng {part.dangTen} — cần nhập từ đề gốc.
      </p>
    );

  return (
    <div className="mt-[9px]">
      <div className="flex flex-wrap items-center gap-[10px]">
        <button
          type="button"
          onClick={() => setMo(!mo)}
          className="text-[12.5px] font-medium hover:underline"
          style={{ color: NAVY }}
        >
          {mo ? "▴ Ẩn câu hỏi" : `▾ Xem ${cau.length} câu`}
        </button>
        {mo && (
          <label className="flex items-center gap-[6px] text-[12px]" style={{ color: INK2 }}>
            <input
              type="checkbox"
              checked={hienDap}
              onChange={(e) => setHienDap(e.target.checked)}
            />
            Hiện đáp án và lời giải
          </label>
        )}
      </div>

      {mo && (
        <ol className="mt-[9px] flex flex-col gap-[9px]">
          {cau.map((q, i) => (
            <li
              key={i}
              className="rounded-[8px] px-[11px] py-[9px]"
              style={{ background: "#f9fafc", border: `1px solid ${LINE}` }}
            >
              <div className="flex gap-[9px]">
                <span
                  className="shrink-0 text-[12px] tabular-nums"
                  style={{ color: INK3, minWidth: 20 }}
                >
                  {i + 1}.
                </span>
                <div className="min-w-0 flex-1">
                  {/* Câu nhiều dòng phải xuống dòng thật — `
` trong dữ liệu gốc
                      là ngắt dòng có ý nghĩa (câu phủ định / câu hỏi / trả lời). */}
                  <p className="whitespace-pre-line text-[13px]" style={{ color: INK }}>
                    {q.noi}
                  </p>

                  {q.choices.length > 0 && (
                    <ul className="mt-[5px] flex flex-wrap gap-[6px]">
                      {q.choices.map((c, k) => (
                        <li
                          key={k}
                          className="rounded-[4px] px-[7px] py-[2px] text-[12px]"
                          style={{ background: "#fff", border: `1px solid ${LINE}`, color: INK2 }}
                        >
                          {c}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Chỉ in dòng "Đáp án" khi lời giải CHƯA tự nêu đáp án.
                      Lời giải gốc của giáo viên phần lớn đã mở đầu bằng
                      "✅ Đáp án đúng: …" — in thêm là hai dòng lặp y nhau. */}
                  {hienDap && q.dap && !/đáp án/i.test(q.giai) && (
                    <p className="mt-[5px] text-[12.5px]" style={{ color: OK }}>
                      Đáp án: <strong>{q.dap}</strong>
                    </p>
                  )}
                  {hienDap && q.giai && (
                    <p
                      className="mt-[3px] whitespace-pre-line text-[12px]"
                      style={{ color: INK2 }}
                    >
                      {q.giai}
                    </p>
                  )}
                  {hienDap && !q.dap && !q.giai && (
                    <p className="mt-[5px] text-[12px]" style={{ color: WARN }}>
                      Câu này chưa có đáp án — cần người ra đáp án trước khi giao.
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
