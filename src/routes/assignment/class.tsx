import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/cec/Shell";
import { ClassProgress } from "@/components/cec/ClassProgress";

export const Route = createFileRoute("/assignment/class")({
  head: () => ({ meta: [{ title: "Tiến độ bài tập theo lớp — CEC Academic" }] }),
  component: () => (
    <Shell
      crumbs={[{ label: "Bài tập" }, { label: "Tiến độ theo lớp" }]}
      title="Tiến độ bài tập theo lớp"
      desc="Lớp nhiều việc nhất xếp lên đầu — buổi chưa giao bài, em nợ bài, bài chờ chấm."
    >
      <ClassProgress />
    </Shell>
  ),
});
