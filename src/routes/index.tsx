import { createFileRoute, redirect } from "@tanstack/react-router";

/** Trang gốc: đưa thẳng về danh sách lớp — màn mở đầu ngày của QC */
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/class" });
  },
});
