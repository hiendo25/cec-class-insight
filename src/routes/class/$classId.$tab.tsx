import { createFileRoute, useNavigate, notFound } from "@tanstack/react-router";
import { Shell } from "@/components/cec/Shell";
import { ClassWorkspace, type Tab } from "@/components/cec/ClassWorkspace";
import { CLASSES } from "@/data/classes";

/** Ánh xạ tên tab trên URL (không dấu, dễ đọc) sang nhãn hiển thị */
export const TAB_SLUG: Record<string, Tab> = {
  "hoc-sinh": "Học sinh",
  "lich-hoc": "Lịch học",
  "bai-tap": "Bài tập",
  "ket-qua": "Kết quả",
  "lich-su": "Lịch sử",
};
export const slugOf = (label: Tab) =>
  Object.entries(TAB_SLUG).find(([, v]) => v === label)?.[0] ?? "hoc-sinh";

export const Route = createFileRoute("/class/$classId/$tab")({
  loader: ({ params }) => {
    const row = CLASSES.find((c) => String(c.id) === params.classId);
    if (!row || !TAB_SLUG[params.tab]) throw notFound();
    return { row };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.row.code ?? "Lớp"} — CEC Academic` }],
  }),
  component: ClassDetail,
});

function ClassDetail() {
  const { row } = Route.useLoaderData();
  const { tab } = Route.useParams();
  const navigate = useNavigate();

  return (
    <Shell
      crumbs={[
        { label: "Vận hành" },
        { label: "Lớp học", to: "/class" },
        { label: row.code },
      ]}
    >
      <ClassWorkspace
        row={row}
        tab={TAB_SLUG[tab] ?? "Học sinh"}
        onTab={(label) =>
          navigate({
            to: "/class/$classId/$tab",
            params: { classId: String(row.id), tab: slugOf(label) },
          })
        }
        onBack={() => navigate({ to: "/class" })}
      />
    </Shell>
  );
}
