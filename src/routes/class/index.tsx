import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Shell } from "@/components/cec/Shell";
import { ClassesTable } from "@/components/cec/ClassesTable";

const TITLE = "Quản lý Lớp học — CEC Academic";
const DESC = "Theo dõi lớp, thấy việc cần xử lý và xử lý ngay trong dòng.";

export const Route = createFileRoute("/class/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: ClassList,
});

function ClassList() {
  const navigate = useNavigate();
  return (
    <Shell
      crumbs={[{ label: "Vận hành" }, { label: "Lớp học" }]}
      title="Quản lý Lớp học"
      desc={DESC}
    >
      <ClassesTable
        onOpenClass={(row) =>
          navigate({ to: "/class/$classId/$tab", params: { classId: String(row.id), tab: "hoc-sinh" } })
        }
      />
    </Shell>
  );
}
