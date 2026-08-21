import { Link, useRouterState } from "@tanstack/react-router";
import { NAVY } from "@/data/const";
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
import { ME } from "@/data/me";

/**
 * Menu bám theo CEC PROD: chia nhóm có tiêu đề, không phải một danh sách phẳng.
 * Chỉ giữ mục QC thật sự dùng. Việc của giáo viên (báo cáo buổi, điểm danh)
 * nằm ở "Lớp học trong ngày" — QC mở sang xem chứ không thao tác.
 */
type Item = {
  label: string;
  Icon: (p: { size?: number }) => ReactElement;
  /** đường dẫn thật; chưa có thì để trống và hiện nhãn "sắp có" */
  to?: string;
};

const GROUPS: { title: string; items: Item[] }[] = [
  {
    title: "Vận hành",
    items: [
      { label: "Lớp học", Icon: IconBook, to: "/class" },
      { label: "Lớp học trong ngày", Icon: IconUsers },
    ],
  },
  {
    title: "Ngân hàng nội dung",
    items: [{ label: "Đề bài", Icon: IconBook, to: "/exam" }],
  },
  {
    title: "Bài tập",
    items: [
      { label: "Học sinh nợ bài", Icon: IconClipboard, to: "/assignment/student" },
      { label: "Tiến độ theo lớp", Icon: IconTask, to: "/assignment/class" },
      { label: "Bài đã giao", Icon: IconTask },
    ],
  },
  {
    title: "Khác",
    items: [
      { label: "Báo cáo", Icon: IconChart },
    ],
  },
];

export function Sidebar() {
  const path = useRouterState({ select: (st) => st.location.pathname });

  return (
    <aside
      className="flex w-[255px] shrink-0 flex-col text-white"
      style={{ background: NAVY }}
    >
      {/* logo: PROD đặt 84×64, lề trái 20, cách trên 8 */}
      <div className="flex items-center" style={{ padding: "8px 20px 14px" }}>
        <Logo width={104} />
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
            {g.items.map(({ label, Icon, to }) => {
              const active = !!to && path.startsWith(to);
              const style = {
                padding: "8px 10px",
                background: active ? "rgba(255,255,255,0.14)" : "transparent",
                fontWeight: active ? 600 : 400,
                color: to ? (active ? "#fff" : "rgba(255,255,255,0.82)") : "rgba(255,255,255,0.38)",
              } as const;
              const cls = "flex h-[36px] items-center gap-[10px] rounded-[6px] text-[13.5px]";

              /* Mục chưa có màn thì KHÔNG cho bấm và nói rõ "sắp có" —
                 thà thiếu còn hơn bấm vào không đi đâu. */
              if (!to)
                return (
                  <span key={label} className={cls} style={{ ...style, cursor: "default" }} title="Sắp có">
                    <Icon size={17} />
                    <span className="truncate">{label}</span>
                    <span className="ml-auto text-[10px]" style={{ color: "rgba(255,255,255,0.34)" }}>
                      sắp có
                    </span>
                  </span>
                );

              return (
                <Link key={label} to={to} className={cls} style={style}>
                  <Icon size={17} />
                  <span className="truncate">{label}</span>
                </Link>
              );
            })}
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
          {ME.name.split(" ")[0]![0]}
          {ME.name.split(" ").at(-1)![0]}
        </span>
        <div className="min-w-0">
          <div className="truncate text-[13px] font-medium">{ME.name}</div>
          <div
            className="truncate text-[11px]"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            {ME.role} · {ME.campus}
          </div>
        </div>
      </div>
    </aside>
  );
}
