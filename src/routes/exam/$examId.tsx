import { createFileRoute, notFound } from "@tanstack/react-router";
import { Shell } from "@/components/cec/Shell";
import { ExamDetail } from "@/components/cec/ExamDetail";
import { EXAMS } from "@/data/exams";

export const Route = createFileRoute("/exam/$examId")({
  loader: ({ params }) => {
    const exam = EXAMS.find((e) => e.id === params.examId);
    if (!exam) throw notFound();
    return { exam };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.exam.ten ?? "Đề bài"} — CEC Academic` }],
  }),
  component: Chi,
});

function Chi() {
  const { exam } = Route.useLoaderData();
  return (
    <Shell
      crumbs={[
        { label: "Ngân hàng nội dung" },
        { label: "Đề bài", to: "/exam" },
        { label: exam.ten },
      ]}
    >
      <ExamDetail exam={exam} />
    </Shell>
  );
}
