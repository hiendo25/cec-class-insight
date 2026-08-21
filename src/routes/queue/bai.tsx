import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/cec/Shell";
import { BaiQueue } from "@/components/cec/BaiQueue";

/** Hàng đợi xác nhận bài AI chấm — XUYÊN LỚP. */
export const Route = createFileRoute("/queue/bai")({
  component: () => (
    <Shell crumbs={[{ label: "Hôm nay của tôi", to: "/" }, { label: "Xác nhận bài AI chấm" }]}>
      <BaiQueue />
    </Shell>
  ),
});
