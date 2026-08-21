import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

const NAVY = "#1e2d5c";
const LINE = "#e6e8ee";
const INK = "#1f2430";
const INK2 = "#6b7280";
const OK = "#1f6f4a";

export type ActionAsk = {
  title: string;
  /** mô tả rõ việc sắp làm — ai nhận, bao nhiêu người */
  body: ReactNode;
  confirmLabel: string;
  /** câu báo sau khi làm xong */
  doneText: string;
  danger?: boolean;
};

type Ctx = { ask: (a: ActionAsk) => void };
const ActionCtx = createContext<Ctx>({ ask: () => undefined });

/** Dùng trong mọi nút hành động — thay cho nút bấm không ra gì */
export const useAction = () => useContext(ActionCtx);

/**
 * Hộp xác nhận + báo đã xong, dùng chung cho các nút Nhắc / Giao bài / Chấm bài.
 *
 * Trước đây các nút này không nối handler nên bấm không phản hồi gì — QC không
 * biết mình đã bấm hay chưa, dễ bấm lại nhiều lần.
 */
export function ActionProvider({ children }: { children: ReactNode }) {
  const [pending, setPending] = useState<ActionAsk | null>(null);
  const [done, setDone] = useState<string | null>(null);

  const ask = useCallback((a: ActionAsk) => setPending(a), []);
  const value = useMemo(() => ({ ask }), [ask]);

  return (
    <ActionCtx.Provider value={value}>
      {children}

      {pending && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center"
          style={{ background: "rgba(20,28,56,0.34)" }}
          onClick={() => setPending(null)}
        >
          <div
            className="w-[420px] rounded-[10px] bg-white p-[18px]"
            style={{ boxShadow: "0 12px 32px rgba(20,28,56,0.22)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-[15px] font-semibold" style={{ color: INK }}>
              {pending.title}
            </h3>
            <div className="mb-[14px] mt-[6px] text-[13px] leading-[1.6]" style={{ color: INK2 }}>
              {pending.body}
            </div>
            <div className="flex justify-end gap-[8px]">
              <button type="button" onClick={() => setPending(null)} className="cec-btn cec-btn-secondary">
                Huỷ
              </button>
              <button
                type="button"
                onClick={() => {
                  setDone(pending.doneText);
                  setPending(null);
                  window.setTimeout(() => setDone(null), 3200);
                }}
                className="rounded-[6px] px-[14px] py-[8px] text-[12.5px] font-semibold text-white"
                style={{ background: pending.danger ? "#d4342c" : NAVY }}
              >
                {pending.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* báo đã xong — để QC biết chắc thao tác đã chạy */}
      {done && (
        <div
          className="fixed bottom-[20px] left-1/2 z-[80] -translate-x-1/2 rounded-[8px] px-[16px] py-[10px] text-[13px]"
          style={{ background: "#e6f5ec", border: `1px solid #cfe3d6`, color: OK, boxShadow: "0 6px 18px rgba(20,28,56,0.14)" }}
          role="status"
        >
          {done}
        </div>
      )}
    </ActionCtx.Provider>
  );
}
