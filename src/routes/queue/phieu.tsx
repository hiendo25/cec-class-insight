import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/cec/Shell";
import { PhieuQueue } from "@/components/cec/PhieuQueue";

/** Hàng đợi duyệt phiếu buổi — XUYÊN LỚP.
 *  QC 16 lớp trước đây phải mở 16 lượt cho cùng một thao tác. */
export const Route = createFileRoute("/queue/phieu")({
  component: () => (
    <Shell crumbs={[{ label: "Hôm nay của tôi", to: "/" }, { label: "Duyệt phiếu buổi" }]}>
      <PhieuQueue />
    </Shell>
  ),
});
