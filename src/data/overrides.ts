import { useEffect, useSyncExternalStore } from "react";
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
  /** bài QC vừa giao trong phiên — trước đây nút "Giao bài" gọi onClose,
   *  tức bấm xong modal đóng mà KHÔNG giao gì, QC tưởng đã giao */
  daGiao: BaiDaGiao[];
  /** bài QC đã xác nhận: id bài nộp -> điểm chốt + điểm AI gốc + nhận xét
   *  `congBo` = QC đã bấm công bố cho học sinh thấy điểm chưa. Đề bật tự công bố
   *  thì true ngay khi xác nhận; đề tắt thì phải bấm thêm một bước. */
  duyet: Record<string, { diem: number; diemAI: number | null; nhanXet: string; congBo: boolean }>;
};

export type BaiDaGiao = {
  id: string;
  examId: string;
  examTen: string;
  classIds: number[];
  soHocSinh: number;
  hanNop: string;
  giaoLuc: string;
};

const KEY = "cec-qc-overrides";

/** Đọc lại việc QC đã làm ở lần trước — F5 mà mất sạch thì QC tưởng chưa duyệt,
 *  duyệt lại từ đầu. */
const doc = (): Store => {
  if (typeof window === "undefined") return { report: {}, monthly: {}, reminded: {}, daGiao: [], duyet: {} };
  try {
    const raw = window.localStorage.getItem(KEY);
    const j = raw ? JSON.parse(raw) : null;
    return {
      report: j?.report ?? {},
      monthly: j?.monthly ?? {},
      reminded: j?.reminded ?? {},
      daGiao: j?.daGiao ?? [],
      duyet: j?.duyet ?? {},
    };
  } catch {
    return { report: {}, monthly: {}, reminded: {}, daGiao: [], duyet: {} };
  }
};

/* Bắt đầu RỖNG để bản dựng trên máy chủ và trên trình duyệt giống nhau;
   nạp localStorage sau khi trang đã gắn xong (xem useOverrides). */
let state: Store = { report: {}, monthly: {}, reminded: {}, daGiao: [], duyet: {} };
let daNap = false;

/** Nạp việc đã lưu — gọi một lần sau khi trang gắn xong */
const napMotLan = () => {
  if (daNap || typeof window === "undefined") return;
  daNap = true;
  const luu = doc();
  if (Object.keys(luu.report).length || Object.keys(luu.monthly).length || Object.keys(luu.reminded).length || luu.daGiao.length || Object.keys(luu.duyet).length) {
    state = luu;
    subs.forEach((f) => f());
  }
};
const subs = new Set<() => void>();

const emit = () => {
  state = { ...state };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* hết dung lượng hoặc trình duyệt chặn — vẫn chạy được trong phiên */
  }
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
export const useOverrides = () => {
  useEffect(napMotLan, []);
  return useSyncExternalStore(
    subscribe,
    () => state,
    /* bản dựng trên máy chủ luôn là trạng thái rỗng */
    () => TRONG,
  );
};

const TRONG: Store = { report: {}, monthly: {}, reminded: {}, daGiao: [], duyet: {} };

/** Trạng thái thật của một phiếu, sau khi tính lớp ghi đè */
export const reportStatusOf = (id: string, goc: ReportStatus): ReportStatus =>
  state.report[id] ?? goc;

/** Trạng thái thật của một báo cáo tháng */
export const monthlyStatusOf = (key: string, goc: ReportStatus): ReportStatus =>
  state.monthly[key] ?? goc;

export const daNhac = (key: string) => !!state.reminded[key];

/** Ghi nhận một lượt giao bài THẬT. Trả về id để hoàn tác. */
export const giaoBai = (b: Omit<BaiDaGiao, "id" | "giaoLuc">) => {
  const id = "gb-" + state.daGiao.length + "-" + b.examId;
  state.daGiao = [
    ...state.daGiao,
    { ...b, id, giaoLuc: new Date().toLocaleString("vi-VN") },
  ];
  emit();
  return id;
};

/** Hoàn tác lượt giao vừa rồi — KH yêu cầu có nút Hoàn tác trong 10 giây */
export const hoanTacGiao = (id: string) => {
  state.daGiao = state.daGiao.filter((x) => x.id !== id);
  emit();
};

/** QC xác nhận một bài AI chấm. Giữ luôn điểm AI gốc để còn đối chiếu. */
export const diemDaDuyet = (
  id: string,
  diem: number,
  diemAI: number | null,
  nhanXet: string,
  congBo = false,
) => {
  state.duyet[id] = { diem, diemAI, nhanXet, congBo };
  emit();
};

/** Công bố điểm cho học sinh thấy — bước thứ hai với đề tắt tự công bố */
export const congBoDiem = (id: string) => {
  const cu = state.duyet[id];
  if (!cu) return;
  state.duyet[id] = { ...cu, congBo: true };
  emit();
};
export const daCongBo = (id: string) => !!state.duyet[id]?.congBo;
export const daDuyetBai = (id: string) => !!state.duyet[id];
export const ketQuaDuyet = (id: string) => state.duyet[id];

export const baiDaGiao = () => state.daGiao;
export const soBaiDaGiaoCuaLop = (classId: number) =>
  state.daGiao.filter((b) => b.classIds.includes(classId)).length;
