import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/cec/Shell";
import { OwedStudents } from "@/components/cec/OwedStudents";

export const Route = createFileRoute("/assignment/student")({
  head: () => ({ meta: [{ title: "Học sinh nợ bài — CEC Academic" }] }),
  component: () => (
    <Shell
      crumbs={[{ label: "Bài tập" }, { label: "Học sinh nợ bài" }]}
      title="Học sinh nợ bài"
      desc="Xuyên lớp: em nào đang nợ bài, nợ bao lâu, bỏ dở bài nào."
    >
      <OwedStudents />
    </Shell>
  ),
});
