import { useState } from "react";
import { NAVY, LINE, INK, INK2, INK3, OK, WARN, DANGER } from "@/data/const";
import { useNavigate } from "@tanstack/react-router";
import type { Exam } from "@/data/exams";
import { topicFull } from "@/data/topics";
import { useAction } from "./ActionDialog";
import { TT_STYLE } from "./ExamList";
import { IconCheck, IconChevronLeft, IconClipboard, IconWarn } from "./icons";


const TABS = ["Cấu trúc đề", "Cấu hình chấm điểm", "Lịch sử phiên bản"] as const;
type Tab = (typeof TABS)[number];

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
            <h1 className="text-[19px] font-bold" style={{ letterSpacing: "-0.2px" }}>
              {exam.ten}
            </h1>
            <span className="rounded-full px-[9px] py-[3px] text-[11.5px] font-medium" style={{ background: tt.bg, color: tt.fg }}>
              {tt.ngan}
            </span>
            <span className="rounded-[4px] px-[7px] py-[2px] text-[11.5px] font-semibold" style={{ background: "#eef1f7", color: NAVY }}>
              {exam.phienBan}
            </span>
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
            </section>
          ))}
        </div>
      )}

      {tab === "Cấu hình chấm điểm" && (
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
