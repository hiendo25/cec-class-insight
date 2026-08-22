import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/cec/Shell";
import { AssignedWork } from "@/components/cec/AssignedWork";

/** Bài đã giao — theo dõi sau khi giao, xem theo BÀI xuyên lớp.
 *  Khác "Tiến độ theo lớp" (xem theo lớp): ở đây QC hỏi "bài nào đang có vấn đề". */
export const Route = createFileRoute("/assignment/")({
  component: () => (
    <Shell
      crumbs={[{ label: "Bài tập" }, { label: "Bài đã giao" }]}
      title="Bài đã giao"
      desc="Bài nào chưa ai nộp, đang chờ chấm, quá hạn, hoặc đề đã có bản mới."
    >
      <AssignedWork />
    </Shell>
  ),
});
