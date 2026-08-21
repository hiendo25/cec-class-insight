import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/cec/Shell";
import { ExamList } from "@/components/cec/ExamList";

export const Route = createFileRoute("/exam/")({
  head: () => ({ meta: [{ title: "Kho đề — CEC Academic" }] }),
  component: () => (
    <Shell
      crumbs={[{ label: "Ngân hàng nội dung" }, { label: "Đề bài" }]}
      title="Kho đề"
      desc="Tra cứu và kiểm đề trước khi giao cho học sinh."
    >
      <ExamList />
    </Shell>
  ),
});
