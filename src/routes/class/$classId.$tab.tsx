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

/** 3 màn con mở từ trong lớp — để trên URL để F5 giữ nguyên chỗ đang xem
 *  và nút Back của trình duyệt quay về đúng bảng, không văng ra danh sách lớp. */
export type ClassSearch = {
  /** hồ sơ học sinh: mã Student.id */
  hs?: string;
  /** nhận xét buổi: "<studentId>:<số buổi>" */
  nx?: string;
  /** báo cáo tháng: "<studentId>:<MM/YYYY>" */
  bc?: string;
  /** true = mở sẵn modal giao bài, dùng khi bấm Giao bài từ màn xuyên lớp */
  giao?: boolean;
};

export const Route = createFileRoute("/class/$classId/$tab")({
  validateSearch: (raw: Record<string, unknown>): ClassSearch => ({
    ...(typeof raw["hs"] === "string" ? { hs: raw["hs"] as string } : {}),
    ...(typeof raw["nx"] === "string" ? { nx: raw["nx"] as string } : {}),
    ...(typeof raw["bc"] === "string" ? { bc: raw["bc"] as string } : {}),
    ...(raw["giao"] === true || raw["giao"] === "true" || raw["giao"] === "1" ? { giao: true } : {}),
  }),
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
  const search = Route.useSearch();
  const navigate = useNavigate();

  /** đổi tham số truy vấn mà giữ nguyên lớp và tab đang xem */
  const setSearch = (next: ClassSearch) =>
    navigate({
      to: "/class/$classId/$tab",
      params: { classId: String(row.id), tab },
      search: next,
    });

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
        openStudentId={search.hs}
        onOpenStudent={(id) => setSearch(id ? { hs: id } : {})}
        openAssign={search.giao === true}
        onCloseAssign={() => setSearch({})}
        openNoteKey={search.nx}
        openMonthKey={search.bc}
        onOpenNote={(k) => setSearch(k ? { nx: k } : {})}
        onOpenMonth={(k) => setSearch(k ? { bc: k } : {})}
        tab={TAB_SLUG[tab] ?? "Học sinh"}
        onTab={(label) =>
          navigate({
            to: "/class/$classId/$tab",
            params: { classId: String(row.id), tab: slugOf(label) },
            search: {},
          })
        }
        onBack={() => navigate({ to: "/class" })}
      />
    </Shell>
  );
}
