import type { ReactElement } from "react";
import {
  IconBook,
  IconChart,
  IconClipboard,
  IconGear,
  IconHome,
  IconTask,
  IconUsers,
} from "./icons";
import { Logo } from "./Logo";

/**
 * Menu bám theo CEC PROD: chia nhóm có tiêu đề, không phải một danh sách phẳng.
 * Chỉ giữ mục QC thật sự dùng. Việc của giáo viên (báo cáo buổi, điểm danh)
 * nằm ở "Lớp học trong ngày" — QC mở sang xem chứ không thao tác.
 */
type Item = { label: string; Icon: (p: { size?: number }) => ReactElement; active?: boolean };

const GROUPS: { title: string; items: Item[] }[] = [
  {
    title: "Vận hành",
    items: [
      { label: "Tổng quan", Icon: IconHome },
      { label: "Lớp học", Icon: IconBook, active: true },
      { label: "Lớp học trong ngày", Icon: IconUsers },
    ],
  },
  {
    title: "Bài tập",
    items: [
      { label: "Bài đã giao", Icon: IconTask },
      { label: "Bài tập theo học sinh", Icon: IconClipboard },
      { label: "Bài tập theo lớp", Icon: IconClipboard },
    ],
  },
  {
    title: "Khác",
    items: [
      { label: "Báo cáo", Icon: IconChart },
      { label: "Cấu hình", Icon: IconGear },
    ],
  },
];

export function Sidebar() {
  return (
    <aside
      className="flex w-[255px] shrink-0 flex-col text-white"
      style={{ background: "#1e2d5c" }}
    >
      {/* logo: PROD đặt 84×64, lề trái 20, cách trên 8 */}
      <div className="flex items-center" style={{ padding: "8px 20px 14px" }}>
        <Logo width={84} />
      </div>

      <nav className="flex flex-col gap-[18px] px-[18px]">
        {GROUPS.map((g) => (
          <div key={g.title} className="flex flex-col gap-[2px]">
            <span
              className="px-[10px] pb-[6px] text-[10.5px] font-semibold uppercase"
              style={{ color: "rgba(255,255,255,0.42)", letterSpacing: "0.06em" }}
            >
              {g.title}
            </span>
            {g.items.map(({ label, Icon, active }) => (
              <button
                key={label}
                type="button"
                className="flex h-[36px] items-center gap-[10px] rounded-[6px] text-[13.5px]"
                style={{
                  padding: "8px 10px",
                  background: active ? "rgba(255,255,255,0.14)" : "transparent",
                  fontWeight: active ? 600 : 400,
                  color: active ? "#fff" : "rgba(255,255,255,0.82)",
                }}
              >
                <Icon size={17} />
                <span className="truncate">{label}</span>
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className="flex-1" />

      <div
        className="flex items-center gap-[10px] px-[18px] py-[14px]"
        style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}
      >
        <span
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[12px] font-semibold"
          style={{ background: "rgba(255,255,255,0.18)" }}
        >
          DĐ
        </span>
        <div className="min-w-0">
          <div className="truncate text-[13px] font-medium">Dương Viết Đạt</div>
          <div
            className="truncate text-[11px]"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            QC · CEC Văn quán 2
          </div>
        </div>
      </div>
    </aside>
  );
}
