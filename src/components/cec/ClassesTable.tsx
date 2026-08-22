import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { AssignDialog } from "./AssignDialog";
import { TH_BG, TH_FG, TH_LINE, NAVY, LINE, INK, INK2, INK3, OK, WARN, DANGER, TODAY } from "@/data/const";
import { Person } from "./Person";
import { MaHS } from "./MaHS";
import { CLASSES, STATUS_ORDER, type ClassRow, type Status } from "@/data/classes";
import { ME } from "@/data/me";
import { STUDENTS } from "@/data/students";
import { homNayChoTen, xuatCSV } from "@/lib/xuatBang";
import { markReminded } from "@/data/overrides";
import { useAction } from "./ActionDialog";
import { Modal } from "./Modal";
import {
  IconCheck,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconColumns,
  IconDots,
  IconRefresh,
  IconSearch,
  IconTray,
  IconWarn,
  IconX,
  IconUsers,
  IconUserOne,
  IconRefreshSmall,
  IconMonitor,
  IconClipboard,
  IconCalendarCheck,
  IconBell,
  IconExternal,
  IconBookmark,
  IconChart,
} from "./icons";
import {
  loadViews,
  saveView,
  removeView,
  getDefaultViewId,
  setDefaultViewId,
  sameState,
  type SavedView,
  type ViewState,
} from "./savedViews";

/* ---------- helpers ---------- */


const warnLabel = (r: ClassRow) =>
  r.issues === null
    ? "Chưa có dữ liệu"
    : r.issues.length > 0
      ? "Có việc cần xử lý"
      : "Ổn";

/** Sĩ số PHẢI có mẫu số — quy ước chung: mọi con số đều kèm tổng thể.
 *  capacity null thì hiện trơ, KHÔNG bịa mẫu số. */
const sizeLabel = (r: ClassRow) =>
  r.enrolled === null ? "—" : r.capacity === null ? `${r.enrolled}` : `${r.enrolled}/${r.capacity}`;

/** Tách "T2 · T4 · 18:00" hoặc "T4 17:45-19:15 / T7 17:30-19:00" thành từng buổi */
const splitSchedule = (s: string): string[] =>
  s.includes("/") ? s.split("/").map((x) => x.trim()).filter(Boolean) : [s];

/** 5 trạng thái lớp — mỗi trạng thái một màu riêng */
const STATUS_STYLE: Record<string, { bg: string; fg: string; dot: string }> = {
  "Đang diễn ra": { bg: "#e6f5ec", fg: "#1f6f4a", dot: "#0fa958" },
  "Sắp diễn ra": { bg: "#eaf1fb", fg: "#2b3f7a", dot: "#3b6bd6" },
  "Đã kết thúc": { bg: "#f0f2f6", fg: "#6b7280", dot: "#6a7386" },
  "Tạm dừng": { bg: "#fdf3e7", fg: "#8a5a10", dot: "#e0a020" },
  "Đã hủy": { bg: "#fdecea", fg: "#a82920", dot: "#d4342c" },
  default: { bg: "#f0f2f6", fg: "#6b7280", dot: "#6a7386" },
};

const TYPE_STYLE: Record<
  string,
  { bg: string; fg: string; bd: string; Icon: (p: { size?: number }) => JSX.Element }
> = {
  "Lớp thường": { bg: "#eef2fb", fg: "#2b3f7a", bd: "#d8e0f2", Icon: IconUsers },
  "Lớp bù": { bg: "#fdf3e7", fg: "#8a5a10", bd: "#f2e0c4", Icon: IconRefreshSmall },
  "Lớp 1-1": { bg: "#f6eefc", fg: "#6b2fa0", bd: "#e8d8f5", Icon: IconUserOne },
  /* Bỏ "Lớp online": CEC KHÔNG có lớp online — "trực tuyến" là HÌNH THỨC LÀM BÀI,
     khác hẳn "lớp online". Để lại thì bộ lọc có một lựa chọn không bao giờ ra kết quả.
     (PROD mắc lỗi này ở /courses: mặc định lọc "Lớp online" nên giấu mất khoá học.) */
  default: { bg: "#f0f2f6", fg: "#4b5361", bd: "#e2e5ec", Icon: IconUsers },
};

type FilterKey =
  | "code"
  | "type"
  | "campus"
  | "teacher"
  | "qc"
  | "ec"
  | "size"
  | "schedule"
  | "warn"
  | "status";

const getVal: Record<FilterKey, (r: ClassRow) => string> = {
  code: (r) => r.code,
  type: (r) => r.type,
  campus: (r) => r.campus,
  teacher: (r) => r.teacher ?? "Chưa gán",
  qc: (r) => r.qc ?? "Chưa gán",
  ec: (r) => r.ec ?? "Chưa gán",
  size: (r) => sizeLabel(r),
  schedule: (r) => r.schedule ?? "Chưa xếp lịch",
  warn: (r) => warnLabel(r),
  status: (r) => r.status,
};

type Col = {
  key: string;
  label: string;
  width: number;
  filter?: FilterKey;
  optional?: boolean;
  defaultOff?: boolean;
  align?: "left" | "center";
};

const COLS: Col[] = [
  { key: "code", label: "Lớp học", width: 138, filter: "code" },
  { key: "type", label: "Loại lớp", width: 108, filter: "type" },
  { key: "campus", label: "Cơ sở", width: 138, filter: "campus", optional: true },
  { key: "teacher", label: "Giáo viên", width: 130, filter: "teacher" },
  { key: "qc", label: "QC", width: 130, filter: "qc" },
  { key: "ec", label: "EC", width: 130, filter: "ec", optional: true },
  { key: "size", label: "Sĩ số", width: 88, filter: "size" },  /* tính cả em bảo lưu/nghỉ */
  /* Cảnh báo đặt TRƯỚC Lịch học: đây là cột QC cần nhất, bật thêm Cơ sở/EC
     làm bảng rộng ra nên nó bị đẩy khỏi màn — việc cần xử lý mà phải cuộn mới thấy. */
  { key: "warn", label: "Cảnh báo", width: 168, filter: "warn" },
  { key: "schedule", label: "Lịch học", width: 132, filter: "schedule" },
  { key: "start", label: "Ngày bắt đầu", width: 116 },
  { key: "end", label: "Ngày kết thúc", width: 116 },
  { key: "status", label: "Trạng thái", width: 118, filter: "status" },
  { key: "note", label: "Ghi chú", width: 160, optional: true },
  { key: "actions", label: "", width: 52, align: "center" },
];

type Quick = "issues" | "overdue" | "grading" | null;

const QUICK_LABEL: Record<Exclude<Quick, null>, string> = {
  issues: "Cần xử lý",
  overdue: "Có bài quá hạn",
  grading: "Có bài chờ chấm",
};

const matchQuick = (r: ClassRow, q: Quick) => {
  if (!q) return true;
  if (q === "issues") return !!r.issues && r.issues.length > 0;
  if (q === "overdue") return r.overdue > 0;
  return r.grading > 0;
};

/* ---------- tiny UI bits ---------- */

function Dot({ on }: { on: boolean | null }) {
  if (on === null) return <span style={{ color: INK3 }}>—</span>;
  return (
    <span
      className="inline-block h-[10px] w-[10px] rounded-full align-middle"
      style={{
        background: on ? "#0fa958" : "#c4c4c4",
        boxShadow: on ? "none" : "inset 0 0 0 1px #b6b6b6",
      }}
      title={on ? "Đã xong" : "Chưa làm"}
    />
  );
}

function Tick({
  checked,
  onChange,
  indeterminate,
}: {
  checked: boolean;
  onChange: () => void;
  indeterminate?: boolean;
}) {
  return (
    <span
      role="checkbox"
      aria-checked={indeterminate ? "mixed" : checked}
      tabIndex={0}
      onClick={(e) => {
        e.stopPropagation();
        onChange();
      }}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          onChange();
        }
      }}
      className="inline-grid h-[15px] w-[15px] cursor-pointer place-items-center rounded-[3px] align-middle"
      style={{
        border: `1px solid ${checked || indeterminate ? NAVY : "#c3c9d6"}`,
        background: checked || indeterminate ? NAVY : "#fff",
        color: "#fff",
      }}
    >
      {indeterminate ? (
        <span className="h-[2px] w-[7px] rounded-full bg-white" />
      ) : checked ? (
        <IconCheck size={11} />
      ) : null}
    </span>
  );
}

/* ---------- column filter dropdown ---------- */

function ColumnFilter({
  colKey,
  options,
  selected,
  onChange,
}: {
  colKey: FilterKey;
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  const active = selected.length > 0;
  const label = !active
    ? "Select"
    : selected.length === 1
      ? selected[0]
      : `${selected.length} mục`;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-[28px] w-full items-center gap-[6px] px-0 text-[12.5px]"
        style={{
          background: "transparent",
          borderBottom: `1px solid ${active ? NAVY : "#d9dde5"}`,
          color: active ? NAVY : INK2,
          fontWeight: active ? 600 : 400,
        }}
        data-filter={colKey}
      >
        <span className="truncate">{label}</span>
        <span
          className="shrink-0 text-[9px] leading-none"
          style={{ color: open || active ? NAVY : INK3 }}
        >
          {open ? "▼" : "▲"}
        </span>
      </button>

      {open && (
        <div
          className="absolute left-0 top-[30px] z-40 w-[250px] rounded-[6px] bg-white shadow-[0_8px_24px_rgba(20,28,56,0.16)]"
          style={{ border: `1px solid ${LINE}` }}
        >
          <div
            className="flex items-center gap-[6px] px-[10px] py-[8px]"
            style={{ borderBottom: `1px solid ${LINE}` }}
          >
            <button
              type="button"
              onClick={() => onChange([])}
              className="rounded-[4px] px-[8px] py-[3px] text-[11px]"
              style={{ border: `1px solid #d9dde5`, color: INK }}
            >
              Bỏ chọn tất cả
            </button>
            <button
              type="button"
              onClick={() => onChange(options)}
              className="rounded-[4px] px-[8px] py-[3px] text-[11px]"
              style={{ border: `1px solid #d9dde5`, color: INK }}
            >
              Chọn tất cả kết quả
            </button>
          </div>
          <div className="cec-scroll max-h-[300px] overflow-y-auto py-[4px]">
            {options.length === 0 && (
              <div className="px-[10px] py-[10px] text-[12px]" style={{ color: INK3 }}>
                Không còn giá trị trong phạm vi đang lọc
              </div>
            )}
            {options.map((opt) => {
              const on = selected.includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() =>
                    onChange(on ? selected.filter((v) => v !== opt) : [...selected, opt])
                  }
                  className="flex w-full items-center gap-[8px] px-[10px] py-[6px] text-left text-[12.5px] hover:bg-[#f5f8fc]"
                  style={{ color: INK }}
                >
                  <Tick checked={on} onChange={() => {}} />
                  <span className="truncate">{opt}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- main ---------- */

export function ClassesTable({ onOpenClass }: { onOpenClass?: (r: ClassRow) => void }) {
  const { ask } = useAction();

  const initial = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;

  const [tab, setTab] = useState<Status | "Tất cả">(
    (initial?.get("tab") as Status | "Tất cả") || "Đang diễn ra",
  );
  const [quick, setQuick] = useState<Quick>((initial?.get("q") as Quick) || null);
  const [filters, setFilters] = useState<Partial<Record<FilterKey, string[]>>>(() => {
    try {
      return JSON.parse(initial?.get("f") || "{}");
    } catch {
      return {};
    }
  });
  const [mineOnly, setMineOnly] = useState(initial?.get("mine") !== "0");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  /* Lớp đang mở modal giao bài từ cảnh báo trong dòng */
  const [giaoLop, setGiaoLop] = useState<ClassRow | null>(null);

  /**
   * Xử lý nút trong cảnh báo của dòng.
   *
   * Trước đây MỌI cảnh báo dùng chung một hộp thoại suông: bấm "Giao bài" là
   * hiện ngay "Đã giao bài cho lớp X" — không chọn đề, không chọn học sinh,
   * không hạn nộp. Nút nói dối.
   *
   * Giờ tách theo bản chất việc:
   *   - Giao bài  -> MỞ MODAL giao bài thật, QC chọn đề và người nhận
   *   - Nhắc HS   -> hộp xác nhận có TÊN + MÃ từng em, ghi nhận thật
   */
  const xuLyCanhBao = (r: ClassRow, it: { title: string; action: string }) => {
    if (/giao bài/i.test(it.action)) {
      setGiaoLop(r);
      return;
    }

    if (/nhắc/i.test(it.action)) {
      const noBai = (STUDENTS[r.id] ?? []).filter(
        (st) => st.state === "Đang học" && st.assigned - st.submitted > 0,
      );
      ask({
        title: `Nhắc ${noBai.length} học sinh — lớp ${r.code}`,
        body: (
          <>
            <p style={{ marginBottom: 8 }}>Gửi lời nhắc nộp bài tới {noBai.length} em:</p>
            <ul style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {noBai.map((st) => (
                <li key={st.id} style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
                  <span style={{ fontWeight: 500 }}>{st.name}</span>
                  <MaHS ma={st.code} studentId={st.id} classId={r.id} />
                  <span style={{ fontSize: 12, color: WARN }}>
                    còn {st.assigned - st.submitted} bài
                  </span>
                  <span style={{ fontSize: 11.5, color: INK3 }} className="tabular-nums">
                    {st.phone}
                  </span>
                </li>
              ))}
            </ul>
          </>
        ),
        confirmLabel: `Gửi lời nhắc cho ${noBai.length} em`,
        doneText: `Đã nhắc ${noBai.length} em ở lớp ${r.code}.`,
        run: () => noBai.forEach((st) => markReminded(`hs-${st.id}`)),
      });
      return;
    }

    /* Việc khác: giữ hộp xác nhận, nhưng nói rõ chưa nối hành động thật */
    ask({
      title: `${it.action} — lớp ${r.code}`,
      body: <>{it.title}</>,
      confirmLabel: it.action,
      doneText: `Đã ghi nhận: ${it.action.toLowerCase()} — lớp ${r.code}.`,
    });
  };
  const [expanded, setExpanded] = useState<number | null>(null);
  const [hiddenCols, setHiddenCols] = useState<string[]>(
    COLS.filter((c) => c.defaultOff).map((c) => c.key),
  );
  const [colsOpen, setColsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(initial?.get("error") === "1");
  const [pageSize, setPageSize] = useState(100);
  const [page, setPage] = useState(1);

  /* ---- bộ lọc đã lưu ---- */
  const [views, setViews] = useState<SavedView[]>(() => loadViews());
  const [viewsOpen, setViewsOpen] = useState(false);
  const [defaultId, setDefId] = useState<string | null>(() => getDefaultViewId());
  const viewsRef = useRef<HTMLDivElement>(null);

  const current: ViewState = {
    tab,
    quick,
    mineOnly,
    search,
    filters: filters as Record<string, string[]>,
    hiddenCols,
    pageSize,
  };
  const activeView = views.find((v) => sameState(v.state, current));

  const applyView = (v: SavedView) => {
    setTab(v.state.tab);
    setQuick(v.state.quick as Quick);
    setMineOnly(v.state.mineOnly);
    setSearch(v.state.search);
    setFilters(v.state.filters as Partial<Record<FilterKey, string[]>>);
    setHiddenCols(v.state.hiddenCols);
    setPageSize(v.state.pageSize);
    setPage(1);
    setViewsOpen(false);
  };

  // mở màn: áp bộ lọc mặc định nếu có
  useEffect(() => {
    if (!defaultId) return;
    const v = loadViews().find((x) => x.id === defaultId);
    if (v) applyView(v);
    // chỉ chạy một lần khi khởi tạo
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!viewsOpen) return;
    const h = (e: MouseEvent) => {
      if (viewsRef.current && !viewsRef.current.contains(e.target as Node))
        setViewsOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [viewsOpen]);

  /* Hộp thoại đặt tên bộ lọc — trước đây dùng window.prompt của trình duyệt,
     nó hiện chữ "cec-class-insight.lovable.app says" và lạc hẳn khỏi giao diện. */
  const [saveOpen, setSaveOpen] = useState(false);
  const [saveName, setSaveName] = useState("");

  const onSaveView = () => {
    setSaveName(activeView ? "" : "Bộ lọc của tôi");
    setSaveOpen(true);
    setViewsOpen(false);
  };

  const doSaveView = () => {
    const name = saveName.trim();
    if (!name) return;
    saveView(name, current);
    setViews(loadViews());
    setSaveOpen(false);
  };

  /* Xác nhận xoá bộ lọc — thay cho window.confirm */
  const [delView, setDelView] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(t);
  }, []);

  // URL sync (shareable link)
  useEffect(() => {
    const p = new URLSearchParams();
    p.set("tab", tab);
    if (quick) p.set("q", quick);
    if (Object.keys(filters).length) p.set("f", JSON.stringify(filters));
    if (!mineOnly) p.set("mine", "0");
    window.history.replaceState(null, "", `?${p.toString()}`);
  }, [tab, quick, filters, mineOnly]);

  const scoped = useMemo(
    () =>
      CLASSES.filter((r) => (mineOnly ? r.qc === ME.name : true)).filter(
        (r) =>
          search.trim() === "" ||
          `${r.code} ${r.teacher ?? ""} ${r.campus}`
            .toLowerCase()
            .includes(search.trim().toLowerCase()),
      ),
    [mineOnly, search],
  );

  const passesFilters = (r: ClassRow, skip?: FilterKey) =>
    (Object.entries(filters) as [FilterKey, string[]][]).every(
      ([k, vals]) => k === skip || !vals?.length || vals.includes(getVal[k](r)),
    );

  // rows used for tab counts: everything except the status tab itself
  const preTab = scoped.filter((r) => matchQuick(r, quick) && passesFilters(r));

  const rows = preTab.filter((r) => tab === "Tất cả" || r.status === tab);

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    STATUS_ORDER.forEach((s) => m.set(s, 0));
    preTab.forEach((r) => m.set(r.status, (m.get(r.status) ?? 0) + 1));
    m.set("Tất cả", preTab.length);
    return m;
  }, [preTab]);

  const summary = useMemo(() => {
    const base = scoped.filter((r) => r.status === "Đang diễn ra");
    return {
      issues: base.filter((r) => r.issues && r.issues.length > 0).length,
      overdue: base.reduce((a, r) => a + r.overdue, 0),
      grading: base.reduce((a, r) => a + r.grading, 0),
    };
  }, [scoped]);

  const optionsFor = (k: FilterKey) => {
    const pool = scoped
      .filter((r) => matchQuick(r, quick) && passesFilters(r, k))
      .filter((r) => tab === "Tất cả" || r.status === tab || k === "status");
    return Array.from(new Set(pool.map(getVal[k]))).sort((a, b) =>
      a.localeCompare(b, "vi"),
    );
  };

  const visibleCols = COLS.filter((c) => !hiddenCols.includes(c.key));
  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const pageRows = rows.slice((page - 1) * pageSize, page * pageSize);

  const activeChips: { key: string; label: string; clear: () => void }[] = [
    ...(quick
      ? [{ key: "quick", label: QUICK_LABEL[quick], clear: () => setQuick(null) }]
      : []),
    ...(Object.entries(filters) as [FilterKey, string[]][])
      .filter(([, v]) => v?.length)
      .map(([k, v]) => ({
        key: k,
        label: `${COLS.find((c) => c.filter === k)?.label}: ${v.join(", ")}`,
        clear: () => setFilters((f) => ({ ...f, [k]: [] })),
      })),
  ];

  const resetAll = () => {
    setFilters({});
    setQuick(null);
    setSearch("");
  };

  const stickyLeft: Record<string, number> = { sel: 0, code: 36 };
  // width co dinh de o ghim khong bi co, tranh de len cot ke tiep
  const isSticky = (k: string) => k in stickyLeft;

  const stickyWidth: Record<string, number> = { sel: 36, code: 138 };

  const cellStyle = (c: Col, bg: string): React.CSSProperties =>
    isSticky(c.key)
      ? {
          position: "sticky",
          left: stickyLeft[c.key],
          width: stickyWidth[c.key],
          minWidth: stickyWidth[c.key],
          maxWidth: stickyWidth[c.key],
          zIndex: 5,
          background: bg,
          boxShadow: c.key === "code" ? "1px 0 0 0 rgba(20,28,56,0.10)" : undefined,
        }
      : {};

  return (
    <div className="flex flex-col gap-[14px]">
      {/* filter row */}
      <div className="flex flex-wrap items-center gap-[8px]">
        <div
          className="flex h-8 items-center gap-[6px] rounded-[6px] bg-white px-[8px]"
          style={{ border: `1px solid #d9dde5`, width: 260 }}
        >
          <span style={{ color: INK3 }}>
            <IconSearch size={15} />
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm mã lớp, giáo viên…"
            className="w-full bg-transparent text-[13px] outline-none"
            style={{ color: INK }}
          />
        </div>

        <button
          type="button"
          onClick={() => setMineOnly((m) => !m)}
          className={`cec-btn ${mineOnly ? "cec-btn-primary" : "cec-btn-secondary"}`}
        >
          Lớp của tôi
        </button>
        <button type="button" className="cec-btn cec-btn-secondary" onClick={resetAll}>
          Đặt lại bộ lọc
        </button>

        <div ref={viewsRef} className="relative">
          <button
            type="button"
            onClick={() => setViewsOpen((o) => !o)}
            className="cec-btn cec-btn-secondary flex items-center gap-[7px]"
            style={activeView ? { borderColor: NAVY, color: NAVY, fontWeight: 600 } : undefined}
          >
            <IconBookmark size={14} />
            {activeView ? activeView.name : "Bộ lọc đã lưu"}
            <IconChevronDown size={12} />
          </button>

          {viewsOpen && (
            <div
              className="absolute left-0 top-[38px] z-40 w-[268px] rounded-[6px] bg-white py-[4px] shadow-[0_8px_24px_rgba(20,28,56,0.16)]"
              style={{ border: `1px solid ${LINE}` }}
            >
              {views.map((v) => {
                const on = activeView?.id === v.id;
                const isDefault = defaultId === v.id;
                return (
                  <div
                    key={v.id}
                    className="group flex items-center gap-[6px] px-[6px] hover:bg-[#f5f8fc]"
                  >
                    <button
                      type="button"
                      onClick={() => applyView(v)}
                      className="flex min-w-0 flex-1 items-center gap-[8px] py-[8px] pl-[6px] text-left text-[12.5px]"
                      style={{ color: on ? NAVY : INK, fontWeight: on ? 600 : 400 }}
                    >
                      <span className="w-[13px] shrink-0">{on ? "✓" : ""}</span>
                      <span className="truncate">{v.name}</span>
                      {isDefault && (
                        <span className="shrink-0 text-[10.5px]" style={{ color: INK3 }}>
                          mặc định
                        </span>
                      )}
                    </button>

                    <button
                      type="button"
                      title={isDefault ? "Bỏ đặt mặc định" : "Đặt làm mặc định"}
                      onClick={() => {
                        const id = isDefault ? null : v.id;
                        setDefaultViewId(id);
                        setDefId(id);
                      }}
                      className="shrink-0 px-[4px] text-[13px] opacity-0 group-hover:opacity-100"
                      style={{ color: isDefault ? WARN : INK3 }}
                    >
                      {isDefault ? "★" : "☆"}
                    </button>

                    {!v.builtIn && (
                      <button
                        type="button"
                        title="Xoá bộ lọc"
                        onClick={() => setDelView({ id: v.id, name: v.name })}
                        className="shrink-0 px-[6px] text-[13px] opacity-0 group-hover:opacity-100"
                        style={{ color: INK3 }}
                      >
                        ×
                      </button>
                    )}
                  </div>
                );
              })}

              <div className="my-[4px] h-[1px]" style={{ background: LINE }} />
              <button
                type="button"
                onClick={onSaveView}
                className="flex w-full items-center gap-[8px] px-[12px] py-[8px] text-left text-[12.5px] hover:bg-[#f5f8fc]"
                style={{ color: NAVY, fontWeight: 600 }}
              >
                + Lưu bộ lọc hiện tại
              </button>
            </div>
          )}
        </div>

        <div className="relative ml-auto">
          <button
            type="button"
            className="cec-btn cec-btn-secondary"
            onClick={() => setColsOpen((o) => !o)}
          >
            <IconColumns size={15} /> Chọn cột hiển thị
          </button>
          {colsOpen && (
            <div
              className="absolute right-0 top-[36px] z-40 w-[230px] rounded-[6px] bg-white py-[4px] shadow-[0_8px_24px_rgba(20,28,56,0.16)]"
              style={{ border: `1px solid ${LINE}` }}
            >
              {/* 12 cột x ~34px = ~410px nên 300px cắt cụt mất 3 mục cuối,
                  QC tưởng chỉ có bấy nhiêu cột để bật/tắt. */}
              <div className="cec-scroll max-h-[min(440px,60vh)] overflow-y-auto">
                {COLS.filter((c) => c.key !== "actions" && c.key !== "idx").map((c) => {
                  const on = !hiddenCols.includes(c.key);
                  return (
                    <button
                      key={c.key}
                      type="button"
                      onClick={() =>
                        setHiddenCols((h) =>
                          on ? [...h, c.key] : h.filter((k) => k !== c.key),
                        )
                      }
                      className="flex w-full items-center gap-[8px] px-[10px] py-[6px] text-left text-[12.5px] hover:bg-[#f5f8fc]"
                      style={{ color: INK }}
                    >
                      <Tick checked={on} onChange={() => {}} />
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {activeChips.length > 0 && (
        <div className="flex flex-wrap items-center gap-[6px]">
          {activeChips.map((c) => (
            <span
              key={c.key}
              className="inline-flex h-[26px] items-center gap-[6px] rounded-[4px] bg-white px-[8px] text-[12px]"
              style={{ border: `1px solid ${NAVY}`, color: INK }}
            >
              {c.label}
              <button type="button" onClick={c.clear} style={{ color: INK2 }}>
                <IconX size={12} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* status tabs */}
      <div className="flex items-end gap-[3px]" style={{ borderBottom: `1px solid ${LINE}` }}>
        {[...STATUS_ORDER, "Tất cả" as const].map((s) => {
          const on = tab === s;
          const n = counts.get(s) ?? 0;
          return (
            <button
              key={s}
              type="button"
              onClick={() => {
                setTab(s);
                setPage(1);
              }}
              className="relative -mb-px flex items-center gap-[7px] rounded-t-[6px] px-[14px] py-[9px] text-[13px]"
              style={{
                color: on ? NAVY : INK2,
                fontWeight: on ? 700 : 400,
                background: on ? "#fff" : "transparent",
                border: `1px solid ${on ? LINE : "transparent"}`,
                borderBottomColor: on ? "#fff" : "transparent",
              }}
            >
              {s}
              <span
                className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-[9px] px-[5px] text-[11px] font-semibold tabular-nums"
                style={{
                  background: on ? NAVY : "#eef1f7",
                  color: on ? "#fff" : INK2,
                }}
              >
                {n}
              </span>
            </button>
          );
        })}
      </div>

      {/* one-line summary */}
      <div className="flex flex-wrap items-center gap-[10px] text-[13px]" style={{ color: INK2 }}>
        {(
          [
            ["issues", `${summary.issues} lớp cần xử lý`],
            ["overdue", `${summary.overdue} bài quá hạn`],
            ["grading", `${summary.grading} bài chờ chấm`],
          ] as [Exclude<Quick, null>, string][]
        ).map(([k, label], i) => (
          <span key={k} className="flex items-center gap-[10px]">
            {i > 0 && <span style={{ color: "#cfd4de" }}>·</span>}
            <button
              type="button"
              onClick={() => setQuick(quick === k ? null : k)}
              className="underline-offset-[3px] hover:underline"
              style={{
                color: quick === k ? NAVY : INK,
                fontWeight: quick === k ? 700 : 500,
              }}
            >
              {label} ›
            </button>
          </span>
        ))}
      </div>

      {/* bulk bar */}
      {selected.length > 0 && (
        <div
          className="flex items-center gap-[10px] rounded-[6px] bg-white px-[12px] py-[8px] text-[13px]"
          style={{ border: `1px solid ${LINE}`, color: INK }}
        >
          <Tick checked onChange={() => setSelected([])} />
          <span className="font-semibold">Đã chọn {selected.length} lớp</span>
          <span className="flex-1" />
          <button
            type="button"
            onClick={() =>
              ask({
                title: `Giao bài cho ${selected.length} lớp`,
                body: (
              <>
                <p style={{ marginBottom: 6 }}>
                  Giao cùng một đề cho {selected.length} lớp:
                </p>
                <ul style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {rows.filter((r) => selected.includes(r.id)).map((r) => (
                    <li key={r.id} style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
                      <span style={{ fontWeight: 500 }}>{r.code}</span>
                      <span style={{ fontSize: 12, color: INK3 }}>
                        {r.enrolled ?? 0} học sinh · {r.campus}
                      </span>
                    </li>
                  ))}
                </ul>
                <p style={{ marginTop: 8, fontSize: 12, color: INK3 }}>
                  Bấm tiếp để chọn đề và hạn nộp cho từng lớp.
                </p>
              </>
            ),
                confirmLabel: "Chọn đề",
                doneText: "Mở màn chọn đề để giao cho nhiều lớp.",
              })
            }
            className="cec-btn cec-btn-secondary"
          >
            Giao bài
          </button>
          <button
            type="button"
            onClick={() =>
              ask({
                title: `Xuất báo cáo ${selected.length} lớp`,
                /* Nói rõ LỚP NÀO và ra FILE GÌ — trước chỉ ghi "N lớp đang chọn",
                   QC bấm xong không biết mình vừa xuất cái gì. */
                body: (
                  <>
                    <p style={{ marginBottom: 6 }}>
                      Xuất file .csv (mở bằng Excel) tiến độ của {selected.length} lớp:
                    </p>
                    <ul style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                      {rows
                        .filter((r) => selected.includes(r.id))
                        .map((r) => (
                          <li key={r.id} style={{ fontSize: 12.5 }}>
                            {r.code} — {r.enrolled ?? 0} học sinh · {r.campus}
                          </li>
                        ))}
                    </ul>
                  </>
                ),
                confirmLabel: `Xuất ${selected.length} lớp`,
                doneText: `Đã xuất file báo cáo ${selected.length} lớp.`,
                /* Làm THẬT — tải file xuống, không báo suông */
                run: () => {
                  const ds = rows.filter((r) => selected.includes(r.id));
                  xuatCSV(
                    `TienDoLop_${homNayChoTen(TODAY)}`,
                    ["Mã lớp", "Loại lớp", "Cơ sở", "Giáo viên", "QC", "Sĩ số", "Sức chứa", "Bài quá hạn", "Chờ chấm", "Trạng thái"],
                    ds.map((r) => [
                      r.code, r.type, r.campus, r.teacher ?? "Chưa gán", r.qc ?? "",
                      r.enrolled ?? 0, r.capacity ?? "", r.overdue, r.grading, r.status,
                    ]),
                  );
                },
              })
            }
            className="cec-btn cec-btn-secondary"
          >
            Xem báo cáo
          </button>
          <button
            type="button"
            className="text-[13px] underline-offset-[3px] hover:underline"
            style={{ color: INK2 }}
            onClick={() => setSelected([])}
          >
            Bỏ chọn
          </button>
        </div>
      )}

      {/* table card */}
      <div
        className="rounded-[8px] bg-white"
        style={{ border: `1px solid ${LINE}`, overflow: "hidden" }}
      >
        {error ? (
          <div className="flex flex-col items-center gap-[10px] px-6 py-[70px] text-center">
            <span style={{ color: DANGER }}>
              <IconWarn size={30} />
            </span>
            <div className="text-[14px] font-semibold" style={{ color: INK }}>
              Không tải được danh sách lớp.
            </div>
            <button
              type="button"
              className="cec-btn cec-btn-primary mt-1"
              onClick={() => {
                setError(false);
                setLoading(true);
                setTimeout(() => setLoading(false), 600);
              }}
            >
              <IconRefresh size={15} /> Thử lại
            </button>
          </div>
        ) : (
          <>
            <div className="cec-scroll overflow-x-auto">
              <table
                className="border-collapse text-[13px]"
                style={{ minWidth: "100%", color: INK }}
              >
                <colgroup>
                  <col style={{ width: 36 }} />
                  {visibleCols.map((c) => (
                    <col key={c.key} style={{ width: c.width }} />
                  ))}
                </colgroup>
                <thead>
                  <tr style={{ background: TH_BG, color: TH_FG, borderBottom: `1px solid ${TH_LINE}` }}>
                    <th
                      className="px-[10px] text-left"
                      style={{
                        height: 40,
                        position: "sticky",
                        left: 0,
                        zIndex: 6,
                        background: TH_BG,
                      }}
                    >
                      <Tick
                        checked={pageRows.length > 0 && selected.length === pageRows.length}
                        indeterminate={selected.length > 0 && selected.length < pageRows.length}
                        onChange={() =>
                          setSelected(
                            selected.length === pageRows.length
                              ? []
                              : pageRows.map((r) => r.id),
                          )
                        }
                      />
                    </th>
                    {visibleCols.map((c) => (
                      <th
                        key={c.key}
                        className="whitespace-nowrap px-[10px] text-[12.5px] font-semibold"
                        style={{
                          height: 40,
                          textAlign: c.align === "center" ? "center" : "left",
                          ...(isSticky(c.key)
                            ? {
                                position: "sticky",
                                left: stickyLeft[c.key],
                                width: stickyWidth[c.key],
                                minWidth: stickyWidth[c.key],
                                maxWidth: stickyWidth[c.key],
                                zIndex: 6,
                                background: TH_BG,
                              }
                            : {}),
                        }}
                      >
                        <span className="inline-flex items-center gap-[5px]">
                          {c.label}
                          {c.filter && filters[c.filter]?.length ? (
                            <span
                              className="inline-block h-[6px] w-[6px] rounded-full"
                              style={{ background: "#ffffff" }}
                            />
                          ) : null}
                        </span>
                      </th>
                    ))}
                  </tr>
                  <tr style={{ background: "#fff" }}>
                    <th
                      style={{
                        position: "sticky",
                        left: 0,
                        zIndex: 6,
                        background: "#fff",
                        borderBottom: `1px solid ${LINE}`,
                      }}
                    />
                    {visibleCols.map((c) => (
                      <th
                        key={c.key}
                        className="px-[6px] py-[5px]"
                        style={{
                          borderBottom: `1px solid ${LINE}`,
                          ...(isSticky(c.key)
                            ? {
                                position: "sticky",
                                left: stickyLeft[c.key],
                                zIndex: 6,
                                background: "#fff",
                              }
                            : {}),
                        }}
                      >
                        {c.filter && (
                          <ColumnFilter
                            colKey={c.filter}
                            options={optionsFor(c.filter)}
                            selected={filters[c.filter] ?? []}
                            onChange={(next) => {
                              setFilters((f) => ({ ...f, [c.filter as FilterKey]: next }));
                              setPage(1);
                            }}
                          />
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {loading &&
                    Array.from({ length: 7 }).map((_, i) => (
                      <tr key={i} style={{ background: i % 2 ? "#f5f8fc" : "#fff" }}>
                        <td style={{ height: 46 }} />
                        {visibleCols.map((c) => (
                          <td key={c.key} className="px-[10px]">
                            <span
                              className="block h-[10px] animate-pulse rounded-[3px]"
                              style={{ background: "#e9ecf3", width: "70%" }}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}

                  {!loading &&
                    pageRows.map((r, i) => {
                      const hasIssue = !!r.issues && r.issues.length > 0;
                      const bg = i % 2 ? "#f5f8fc" : "#ffffff";
                      const isOpen = expanded === r.id;
                      return (
                        <React.Fragment key={r.id}>
                          <tr style={{ background: bg }}>
                            <td
                              className="px-[10px]"
                              style={{
                                height: 46,
                                position: "sticky",
                                left: 0,
                                zIndex: 5,
                                background: bg,
                                borderBottom: `1px solid ${LINE}`,
                                borderLeft: hasIssue ? `3px solid ${DANGER}` : "3px solid transparent",
                              }}
                            >
                              <Tick
                                checked={selected.includes(r.id)}
                                onChange={() =>
                                  setSelected((s) =>
                                    s.includes(r.id)
                                      ? s.filter((x) => x !== r.id)
                                      : [...s, r.id],
                                  )
                                }
                              />
                            </td>
                            {visibleCols.map((c) => (
                              <td
                                key={c.key}
                                className="whitespace-nowrap px-[10px]"
                                style={{
                                  height: 46,
                                  borderBottom: `1px solid ${LINE}`,
                                  textAlign: c.align === "center" ? "center" : "left",
                                  ...cellStyle(c, bg),
                                }}
                              >
                                {renderCell(c.key, r, (i + 1) + (page - 1) * pageSize, {
                                  isOpen,
                                  toggle: () => setExpanded(isOpen ? null : r.id),
                                  open: () => onOpenClass?.(r),
                                })}
                              </td>
                            ))}
                          </tr>
                          {isOpen && r.issues && r.issues.length > 0 && (
                            <tr key={`${r.id}-x`}>
                              <td
                                colSpan={visibleCols.length + 1}
                                style={{
                                  background: "#f7f8fa",
                                  borderBottom: `1px solid ${LINE}`,
                                  borderLeft: `3px solid ${DANGER}`,
                                  padding: "12px 16px",
                                }}
                              >
                                <div className="flex flex-col gap-[6px]">
                                  {r.issues.map((it) => (
                                    <div
                                      key={it.title}
                                      className="flex items-center gap-[10px] text-[13px]"
                                      style={{ color: INK }}
                                    >
                                      <span style={{ color: INK3 }}>·</span>
                                      <span className="min-w-[260px]">{it.title}</span>
                                      <button
                                        type="button"
                                        onClick={() => xuLyCanhBao(r, it)}
                                        className="cec-btn cec-btn-secondary"
                                        style={{ color: NAVY }}
                                      >
                                        {it.action} ›
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                </tbody>
              </table>
            </div>

            {!loading && rows.length === 0 && (
              <div className="flex flex-col items-center gap-[12px] px-6 py-[64px] text-center">
                <span style={{ color: "#c3c9d6" }}>
                  <IconTray size={46} />
                </span>
                <div className="text-[14px] font-semibold" style={{ color: INK }}>
                  Không có lớp nào trong phạm vi:
                </div>
                <div className="text-[13px]" style={{ color: INK2 }}>
                  {[
                    mineOnly ? "Lớp của tôi" : "Tất cả lớp",
                    tab,
                    ...activeChips.map((c) => c.label),
                  ].join(" · ")}
                </div>
                <div className="mt-1 flex flex-wrap justify-center gap-[8px]">
                  <button
                    type="button"
                    className="cec-btn cec-btn-secondary"
                    onClick={() => setMineOnly(false)}
                  >
                    Xem tất cả lớp
                  </button>
                  <button
                    type="button"
                    className="cec-btn cec-btn-secondary"
                    onClick={() => setTab("Tất cả")}
                  >
                    Bỏ lọc trạng thái
                  </button>
                  <button
                    type="button"
                    className="cec-btn cec-btn-secondary"
                    onClick={resetAll}
                  >
                    Đặt lại bộ lọc
                  </button>
                </div>
              </div>
            )}

            {/* pagination */}
            <div
              className="grid grid-cols-[1fr_auto_1fr] items-center px-[12px] py-[10px] text-[12.5px]"
              style={{ borderTop: `1px solid ${LINE}`, color: INK2 }}
            >
              <div>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setPage(1);
                  }}
                  className="h-8 rounded-[6px] bg-white px-[8px] text-[12.5px]"
                  style={{ border: `1px solid #d9dde5`, color: INK }}
                >
                  {[20, 50, 100].map((n) => (
                    <option key={n} value={n}>
                      {n} / trang
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-center">Tổng {rows.length} lớp</div>
              <div className="flex items-center justify-end gap-[4px]">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="grid h-8 w-8 place-items-center rounded-[6px] bg-white"
                  style={{ border: `1px solid #d9dde5`, color: INK }}
                >
                  <IconChevronLeft />
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPage(i + 1)}
                    className="grid h-8 min-w-8 place-items-center rounded-[6px] px-[8px]"
                    style={
                      page === i + 1
                        ? { background: NAVY, color: "#fff" }
                        : { background: "#fff", border: `1px solid #d9dde5`, color: INK }
                    }
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="grid h-8 w-8 place-items-center rounded-[6px] bg-white"
                  style={{ border: `1px solid #d9dde5`, color: INK }}
                >
                  <IconChevronRight />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Đặt tên bộ lọc — hộp thoại trong app, không dùng window.prompt */}
      {saveOpen && (
        <Modal label="Lưu bộ lọc hiện tại" onClose={() => setSaveOpen(false)}>
          <>
            <h3 className="text-[15px] font-semibold" style={{ color: INK }}>
              Lưu bộ lọc hiện tại
            </h3>
            <p className="mb-[12px] mt-[4px] text-[12.5px]" style={{ color: INK2 }}>
              Đặt tên để lần sau mở lại nhanh, không phải chọn lại từ đầu.
            </p>
            <input
              autoFocus
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") doSaveView();
                if (e.key === "Escape") setSaveOpen(false);
              }}
              placeholder="Ví dụ: Lớp cần xử lý tuần này"
              className="w-full rounded-[6px] px-[11px] py-[8px] text-[13px]"
              style={{ border: `1px solid #d9dde5`, color: INK }}
            />
            <div className="mt-[14px] flex justify-end gap-[8px]">
              <button
                type="button"
                onClick={() => setSaveOpen(false)}
                className="cec-btn cec-btn-secondary"
              >
                Huỷ
              </button>
              <button
                type="button"
                onClick={doSaveView}
                disabled={!saveName.trim()}
                className="rounded-[6px] px-[14px] py-[8px] text-[12.5px] font-semibold text-white"
                style={{ background: saveName.trim() ? NAVY : "#b9c0cc" }}
              >
                Lưu bộ lọc
              </button>
            </div>
          </>
        </Modal>
      )}

      {/* Xác nhận xoá bộ lọc — thay cho window.confirm */}
      {delView && (
        <Modal label={`Xoá bộ lọc ${delView.name}`} onClose={() => setDelView(null)}>
          <>
            <h3 className="text-[15px] font-semibold" style={{ color: INK }}>
              Xoá bộ lọc “{delView.name}”?
            </h3>
            <p className="mb-[14px] mt-[4px] text-[12.5px]" style={{ color: INK2 }}>
              Chỉ xoá bộ lọc đã lưu, không ảnh hưởng tới lớp hay học sinh.
            </p>
            <div className="flex justify-end gap-[8px]">
              <button
                type="button"
                onClick={() => setDelView(null)}
                className="cec-btn cec-btn-secondary"
              >
                Huỷ
              </button>
              <button
                type="button"
                onClick={() => {
                  removeView(delView.id);
                  setViews(loadViews());
                  setDefId(getDefaultViewId());
                  setDelView(null);
                }}
                className="rounded-[6px] px-[14px] py-[8px] text-[12.5px] font-semibold text-white"
                style={{ background: DANGER }}
              >
                Xoá
              </button>
            </div>
          </>
        </Modal>
      )}

      {/* Bấm "Giao bài" trong cảnh báo phải MỞ MODAL THẬT — trước đây chỉ hiện
          toast "Đã giao bài cho lớp X" mà không chọn đề, không chọn người nhận. */}
      {giaoLop && <AssignDialog from={giaoLop} onClose={() => setGiaoLop(null)} />}
    </div>
  );
}

function RowMenu({
  row, onOpen, onGiao, onNhac,
}: { row: ClassRow; onOpen?: () => void; onGiao?: () => void; onNhac?: () => void }) {
  const nav = useNavigate();
  /* Mở đúng tab của lớp — trước đây 5/6 mục không có `run` nên bấm chỉ đóng menu */
  const moTab = (tab: string) => () =>
    nav({ to: "/class/$classId/$tab", params: { classId: String(row.id), tab } });
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  const hasIssue = !!row.issues && row.issues.length > 0;

  const items: {
    label: string;
    Icon: (p: { size?: number }) => JSX.Element;
    danger?: boolean;
    run?: (() => void) | undefined;
  }[] = [
    { label: "Mở lớp", Icon: IconExternal, run: onOpen },
    { label: "Xem học sinh", Icon: IconUsers, run: moTab("hoc-sinh") },
    { label: "Giao bài cho lớp", Icon: IconClipboard, run: onGiao },
    ...(hasIssue
      ? [{ label: "Nhắc học sinh chưa nộp", Icon: IconBell, danger: true, run: onNhac }]
      : []),
    { label: "Xem kết quả", Icon: IconChart, run: moTab("ket-qua") },
    { label: "Lịch học của lớp", Icon: IconCalendarCheck, run: moTab("lich-hoc") },
  ];

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="grid h-[26px] w-[26px] place-items-center rounded-[5px] hover:bg-[#eef1f7]"
        style={{ color: open ? NAVY : INK2 }}
        aria-label={`Thao tác với lớp ${row.code}`}
      >
        <IconDots />
      </button>

      {open && (
        <div
          className="absolute right-0 top-[30px] z-50 w-[210px] overflow-hidden rounded-[6px] bg-white py-[4px] text-left shadow-[0_8px_24px_rgba(20,28,56,0.18)]"
          style={{ border: `1px solid ${LINE}` }}
        >
          {items.map(({ label, Icon, danger, run }) => (
            <button
              key={label}
              type="button"
              onClick={() => {
                setOpen(false);
                run?.();
              }}
              className="flex w-full items-center gap-[9px] px-[11px] py-[7px] text-[12.5px] hover:bg-[#f5f8fc]"
              style={{ color: danger ? DANGER : INK }}
            >
              <Icon size={14} />
              <span className="truncate">{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function renderCell(
  key: string,
  r: ClassRow,
  idx: number,
  ctl: { isOpen: boolean; toggle: () => void; open: () => void },
) {
  const muted = (t: string) => (
    <span className="italic" style={{ color: INK3 }}>
      {t}
    </span>
  );

  switch (key) {
    case "idx":
      return <span style={{ color: INK2 }}>{idx}</span>;
    case "code":
      return (
        <button
          type="button"
          onClick={ctl.open}
          className="font-semibold underline-offset-[3px] hover:underline"
          style={{ color: NAVY }}
        >
          {r.code}
        </button>
      );
    case "type": {
      const t = TYPE_STYLE[r.type] ?? TYPE_STYLE["default"]!;
      return (
        <span
          className="inline-flex h-[22px] items-center gap-[5px] rounded-[11px] px-[8px] text-[11.5px] font-medium"
          style={{ background: t.bg, color: t.fg, border: `1px solid ${t.bd}` }}
        >
          <t.Icon size={12} />
          {r.type}
        </span>
      );
    }
    case "campus":
      return r.campus;
    case "teacher":
      return r.teacher ? <Person name={r.teacher} /> : muted("Chưa gán");
    case "qc":
      return r.qc ? <Person name={r.qc} /> : muted("Chưa gán");
    case "ec":
      return r.ec ? <Person name={r.ec} /> : muted("Chưa gán");
    case "size": {
      if (r.enrolled === null) return muted("—");
      if (r.capacity === null) return <span className="tabular-nums">{r.enrolled}</span>;
      /* gần đầy thì tô cam để QC biết lớp sắp hết chỗ */
      const day = r.enrolled >= r.capacity;
      return (
        <span className="tabular-nums" style={{ color: day ? WARN : undefined }}>
          {r.enrolled}
          <span style={{ color: INK3 }}>/{r.capacity}</span>
        </span>
      );
    }
    case "schedule": {
      if (!r.schedule) return <span style={{ color: WARN }}>Chưa xếp lịch</span>;
      const slots = splitSchedule(r.schedule);
      if (slots.length <= 1) return r.schedule;
      return (
        <span className="inline-flex flex-col gap-[1px] leading-[15px]">
          {slots.map((sl) => (
            <span key={sl}>{sl}</span>
          ))}
        </span>
      );
    }
    case "warn": {
      if (r.issues === null) return <span style={{ color: INK3 }}>—</span>;
      if (r.issues.length === 0) return null;

      // Ưu tiên việc của QC (chưa giao bài, chưa gán) trước việc của học sinh
      const isMine = (t: string) => /chưa giao|chưa gán|chưa xếp/i.test(t);
      const sorted = [...r.issues].sort(
        (a, b) => Number(isMine(b.title)) - Number(isMine(a.title)),
      );
      const top = sorted[0];
      const rest = sorted.length - 1;
      const urgent = isMine(top.title);

      // Rút gọn: "Buổi 12 chưa giao bài" -> "Chưa giao bài"
      //          "3/14 HS chưa nộp Unit 5" -> "3 HS chưa nộp"
      const short = (() => {
        const m = top.title.match(/^(\d+)\/\d+\s*HS\s*(chưa nộp)/i);
        if (m) return `${m[1]} HS chưa nộp`;
        return top.title.replace(/^Buổi\s*\d+\s*/i, "").replace(/^\w/, (c) => c.toUpperCase());
      })();

      return (
        <button
          type="button"
          onClick={ctl.toggle}
          className="inline-flex max-w-full items-center gap-[5px] text-[12.5px] font-medium"
          style={{ color: urgent ? DANGER : WARN }}
          title={`Còn ${r.issues.length} việc: ` + r.issues.map((i) => i.title).join(" · ")}
        >
          <IconWarn size={14} />
          <span className="truncate">{short}</span>
          {rest > 0 && (
            <span
              className="shrink-0 rounded-[8px] px-[5px] text-[10.5px] font-semibold"
              style={{
                background: urgent ? "#fdecea" : "#fdf3e7",
                color: urgent ? DANGER : WARN,
              }}
            >
              +{rest}
            </span>
          )}
          {rest > 0 && (
            <span className="shrink-0 truncate text-[11.5px]" style={{ color: INK2, maxWidth: 92 }}>
              · {sorted[1]?.title}
            </span>
          )}
          <span
            className="shrink-0"
            style={{ transform: ctl.isOpen ? "rotate(180deg)" : undefined, display: "inline-flex" }}
          >
            <IconChevronDown size={13} />
          </span>
        </button>
      );
    }
    case "start":
      return r.start;
    case "end":
      return r.end;
    case "status": {
      const st = STATUS_STYLE[r.status] ?? STATUS_STYLE.default;
      return (
        <span
          className="inline-flex h-[22px] items-center gap-[6px] rounded-[4px] px-[8px] text-[12px] font-medium"
          style={{ background: st.bg, color: st.fg }}
        >
          <span
            className="h-[6px] w-[6px] shrink-0 rounded-full"
            style={{ background: st.dot }}
            aria-hidden="true"
          />
          {r.status}
        </span>
      );
    }
    case "note":
      return r.note ? (
        <span className="block truncate" style={{ color: INK2 }}>
          {r.note}
        </span>
      ) : (
        <span style={{ color: INK3 }}>—</span>
      );
    case "actions":
      return (
        <RowMenu
          row={r}
          onOpen={ctl.open}
          onGiao={() => setGiaoLop(r)}
          onNhac={() =>
            xuLyCanhBao(r, { title: "Học sinh chưa nộp bài", action: "Nhắc học sinh" })
          }
        />
      );
    default:
      return null;
  }
}