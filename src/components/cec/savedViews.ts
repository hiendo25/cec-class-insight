import type { Status } from "@/data/classes";

/** Toàn bộ trạng thái lọc của màn Lớp học — đủ để khôi phục y nguyên */
export type ViewState = {
  tab: Status | "Tất cả";
  quick: string | null;
  mineOnly: boolean;
  search: string;
  filters: Record<string, string[]>;
  /** cột đang ẩn */
  hiddenCols: string[];
  pageSize: number;
};

export type SavedView = {
  id: string;
  name: string;
  /** view dựng sẵn — không cho xoá/sửa */
  builtIn?: boolean;
  state: ViewState;
};

const KEY = "cec.classes.views";
const DEFAULT_KEY = "cec.classes.defaultView";

const base: ViewState = {
  tab: "Đang diễn ra",
  quick: null,
  mineOnly: true,
  search: "",
  filters: {},
  hiddenCols: ["campus", "ec", "note"],
  pageSize: 100,
};

/** Ba bộ lọc dựng sẵn, dùng được ngay không cần tự tạo */
export const BUILT_IN: SavedView[] = [
  {
    id: "mine",
    name: "Lớp của tôi",
    builtIn: true,
    state: { ...base },
  },
  {
    id: "todo",
    name: "Lớp cần xử lý",
    builtIn: true,
    state: { ...base, quick: "action" },
  },
  {
    id: "unassigned",
    name: "Chưa gán giáo viên",
    builtIn: true,
    state: {
      ...base,
      mineOnly: false,
      filters: { teacher: ["Chưa gán"] },
      hiddenCols: ["note"],
    },
  },
];

const read = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key: string, value: unknown) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* hết dung lượng hoặc bị chặn — bỏ qua, view chỉ là tiện ích */
  }
};

export const loadViews = (): SavedView[] => [
  ...BUILT_IN,
  ...read<SavedView[]>(KEY, []),
];

export const saveView = (name: string, state: ViewState): SavedView => {
  const custom = read<SavedView[]>(KEY, []);
  const view: SavedView = {
    id: `v${Date.now().toString(36)}`,
    name: name.trim() || "Bộ lọc chưa đặt tên",
    state,
  };
  write(KEY, [...custom, view]);
  return view;
};

export const removeView = (id: string) => {
  write(
    KEY,
    read<SavedView[]>(KEY, []).filter((v) => v.id !== id),
  );
  if (getDefaultViewId() === id) setDefaultViewId(null);
};

export const renameView = (id: string, name: string) => {
  write(
    KEY,
    read<SavedView[]>(KEY, []).map((v) =>
      v.id === id ? { ...v, name: name.trim() || v.name } : v,
    ),
  );
};

export const getDefaultViewId = (): string | null =>
  read<string | null>(DEFAULT_KEY, null);

export const setDefaultViewId = (id: string | null) => write(DEFAULT_KEY, id);

/** So sánh để biết trạng thái hiện tại có khớp view nào không */
export const sameState = (a: ViewState, b: ViewState) =>
  a.tab === b.tab &&
  a.quick === b.quick &&
  a.mineOnly === b.mineOnly &&
  a.search.trim() === b.search.trim() &&
  a.pageSize === b.pageSize &&
  JSON.stringify([...a.hiddenCols].sort()) ===
    JSON.stringify([...b.hiddenCols].sort()) &&
  JSON.stringify(
    Object.entries(a.filters)
      .filter(([, v]) => v.length)
      .sort(),
  ) ===
    JSON.stringify(
      Object.entries(b.filters)
        .filter(([, v]) => v.length)
        .sort(),
    );
