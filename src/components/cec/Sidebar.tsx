import {
  IconBook,
  IconChart,
  IconGear,
  IconHome,
  IconTask,
} from "./icons";
import { Logo } from "./Logo";

const items = [
  { label: "Tổng quan", Icon: IconHome },
  { label: "Lớp học", Icon: IconBook, active: true },
  { label: "Assignment", Icon: IconTask },
  { label: "Báo cáo", Icon: IconChart },
  { label: "Cấu hình", Icon: IconGear },
];

export function Sidebar() {
  return (
    <aside
      className="flex w-[232px] shrink-0 flex-col text-white"
      style={{ background: "#1e2d5c" }}
    >
      <div className="flex h-[72px] items-center px-4 text-white">
        <Logo width={92} />
      </div>

      <nav className="mt-1 flex flex-col gap-[2px] px-3">
        {items.map(({ label, Icon, active }) => (
          <button
            key={label}
            type="button"
            className="flex h-9 items-center gap-[10px] rounded-[6px] px-3 text-[13px]"
            style={{
              background: active ? "rgba(255,255,255,0.14)" : "transparent",
              fontWeight: active ? 600 : 400,
              color: active ? "#fff" : "rgba(255,255,255,0.82)",
            }}
          >
            <Icon size={17} />
            <span className="truncate">{label}</span>
          </button>
        ))}
      </nav>

      <div className="flex-1" />

      <div
        className="flex items-center gap-[10px] px-4 py-4"
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
            CEC Văn quán 2
          </div>
        </div>
      </div>
    </aside>
  );
}