import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/cec/Shell";
import { MonthlyHub } from "@/components/cec/MonthlyHub";

/** Báo cáo tháng — đường vào cấp menu cho luồng QC làm hàng tháng.
 *  Trước đây chỉ vào được từ trong một lớp cụ thể, tức luồng không có điểm bắt đầu. */
export const Route = createFileRoute("/report/")({
  component: () => (
    <Shell crumbs={[{ label: "Báo cáo tháng" }]}
      title="Báo cáo tháng"
      desc="Tháng này còn lớp nào chưa xong báo cáo — bấm vào lớp để duyệt hàng loạt.">
      <MonthlyHub />
    </Shell>
  ),
});
