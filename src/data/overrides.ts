import { useSyncExternalStore } from "react";
import type { ReportStatus } from "./reports";

/**
 * Lưu các thay đổi QC vừa làm trong phiên: duyệt phiếu, duyệt báo cáo, gửi lời nhắc.
 *
 * Trước đây nút `Duyệt phiếu` bung hộp xác nhận, báo "Đã duyệt..." nhưng trạng thái
 * KHÔNG đổi — chip vẫn ghi 32 phiếu chờ duyệt, tải lại trang là về nguyên trạng.
 * Nút "nói dối" nguy hơn nút chết: QC tưởng đã xong việc rồi bỏ đi.
 *
 * Đây là lớp ghi đè tạm cho bản dựng; khi nối API thật thì thay bằng lệnh gọi máy chủ.
 */

type Store = {
  /** trạng thái phiếu nhận xét buổi đã đổi, theo StudentReport.id */
  report: Record<string, ReportStatus>;
  /** trạng thái báo cáo tháng đã đổi, theo "<studentId>:<MM/YYYY>" */
  monthly: Record<string, ReportStatus>;
  /** đã gửi lời nhắc cho ai — để nút đổi thành "Đã nhắc" thay vì nhắc lại */
  reminded: Record<string, true>;
};

let state: Store = { report: {}, monthly: {}, reminded: {} };
const subs = new Set<() => void>();

const emit = () => {
  state = { ...state };
  subs.forEach((f) => f());
};

export const setReportStatus = (id: string, st: ReportStatus) => {
  state.report[id] = st;
  emit();
};

export const setMonthlyStatus = (key: string, st: ReportStatus) => {
  state.monthly[key] = st;
  emit();
};

export const markReminded = (key: string) => {
  state.reminded[key] = true;
  emit();
};

const subscribe = (f: () => void) => {
  subs.add(f);
  return () => void subs.delete(f);
};

/** Đọc lớp ghi đè; component nào dùng sẽ tự vẽ lại khi có thay đổi */
export const useOverrides = () =>
  useSyncExternalStore(
    subscribe,
    () => state,
    () => state,
  );

/** Trạng thái thật của một phiếu, sau khi tính lớp ghi đè */
export const reportStatusOf = (id: string, goc: ReportStatus): ReportStatus =>
  state.report[id] ?? goc;

/** Trạng thái thật của một báo cáo tháng */
export const monthlyStatusOf = (key: string, goc: ReportStatus): ReportStatus =>
  state.monthly[key] ?? goc;

export const daNhac = (key: string) => !!state.reminded[key];
