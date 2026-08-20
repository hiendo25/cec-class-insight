import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@/components/cec/Sidebar";
import { ClassesTable } from "@/components/cec/ClassesTable";

const TITLE = "Quản lý Lớp học — CEC Academic";
const DESC = "Theo dõi lớp, thấy việc cần xử lý và xử lý ngay trong dòng.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div
      className="flex min-h-screen"
      style={{ background: "#f7f8fa", color: "#1f2430" }}
    >
      <Sidebar />

      <main className="flex min-w-0 flex-1 flex-col px-5 pb-6 pt-4">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-[6px] text-[12px]"
          style={{ color: "#9aa1ae" }}
        >
          <span>Trang chủ</span>
          <span aria-hidden="true">/</span>
          <span style={{ color: "#6b7280" }}>Lớp học</span>
        </nav>

        <header className="mt-2 flex flex-col gap-[3px]">
          <h1
            className="text-[20px] font-bold"
            style={{ letterSpacing: "-0.2px" }}
          >
            Quản lý Lớp học
          </h1>
          <p className="text-[12px]" style={{ color: "#6b7280" }}>
            {DESC}
          </p>
        </header>

        <ClassesTable />
      </main>
    </div>
  );
}
