import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/cec/Shell";
import { DailyClasses } from "@/components/cec/DailyClasses";

/** Lớp học trong ngày — bàn làm việc hằng ngày của QC.
 *  Khác màn "Lớp học" (danh sách cả kỳ): màn này chỉ hỏi hôm nay có buổi nào,
 *  buổi nào còn thiếu phiếu / điểm danh / bài tập. */
export const Route = createFileRoute("/daily/")({
  component: () => (
    <Shell
      crumbs={[{ label: "Vận hành" }, { label: "Lớp học trong ngày" }]}
      title="Lớp học trong ngày"
      desc="Buổi nào hôm nay còn thiếu phiếu nhận xét, điểm danh hoặc bài về nhà."
    >
      <DailyClasses />
    </Shell>
  ),
});
