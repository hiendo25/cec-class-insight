import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/cec/Shell";
import { Today } from "@/components/cec/Today";

/**
 * Trang gốc = "Hôm nay của tôi" — điểm vào chính của QC.
 *
 * Trước đây trang gốc chuyển thẳng sang danh sách lớp, nên QC vào phải tự đi tìm
 * việc của mình giữa 54 lớp. Giờ mở app là thấy ngay bốn việc phải làm.
 */
export const Route = createFileRoute("/")({
  component: () => (
    <Shell crumbs={[{ label: "Hôm nay của tôi" }]}>
      <Today />
    </Shell>
  ),
});
