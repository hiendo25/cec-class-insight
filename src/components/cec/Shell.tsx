import type { ReactNode } from "react";
import { INK2, INK3 } from "@/data/const";
import { Link } from "@tanstack/react-router";
import { Sidebar } from "./Sidebar";
import { ActionProvider } from "./ActionDialog";


export type Crumb = { label: string; to?: string };

/**
 * Khung chung cho mọi màn: sidebar + breadcrumb + tiêu đề.
 * Tách ra để mỗi màn là một route thật, có URL riêng — trước đây cả app
 * nằm trong một route "/" nên F5 là văng về danh sách và không gửi link được.
 */
export function Shell({
  crumbs,
  title,
  desc,
  actions,
  children,
}: {
  crumbs: Crumb[];
  title?: string;
  desc?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <ActionProvider>
    <div className="flex min-h-screen" style={{ background: "#f7f8fa", color: "#1f2430" }}>
      <Sidebar />

      <main className="flex min-w-0 flex-1 flex-col px-5 pb-6 pt-4">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-[6px] text-[12px]"
          style={{ color: INK3 }}
        >
          {crumbs.map((c, i) => (
            <span key={`${c.label}-${i}`} className="flex items-center gap-[6px]">
              {i > 0 && <span aria-hidden="true">/</span>}
              {c.to && i < crumbs.length - 1 ? (
                <Link to={c.to} style={{ color: INK3 }} className="hover:underline">
                  {c.label}
                </Link>
              ) : (
                <span style={{ color: i === crumbs.length - 1 ? INK2 : INK3 }}>{c.label}</span>
              )}
            </span>
          ))}
        </nav>

        {title && (
          <div className="mt-2 flex items-start justify-between gap-[16px]">
            <header className="flex flex-col gap-[3px]">
              <h1 className="text-[20px] font-bold" style={{ letterSpacing: "-0.2px" }}>
                {title}
              </h1>
              {desc && (
                <p className="text-[12px]" style={{ color: INK2 }}>
                  {desc}
                </p>
              )}
            </header>
            {actions}
          </div>
        )}

        {children}
      </main>
    </div>
    </ActionProvider>
  );
}
