import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { NAVY, INK, INK2, OK } from "@/data/const";
import { useModal } from "@/lib/useModal";


export type ActionAsk = {
  title: string;
  /** mô tả rõ việc sắp làm — ai nhận, bao nhiêu người */
  body: ReactNode;
  confirmLabel: string;
  /** câu báo sau khi làm xong */
  doneText: string;
  danger?: boolean;
  /** việc THẬT chạy khi bấm xác nhận — không có thì hộp chỉ báo suông,
   *  mà nút báo "đã duyệt" trong khi trạng thái không đổi còn tệ hơn nút chết */
  run?: () => void;
};

type Ctx = { ask: (a: ActionAsk) => void };
const ActionCtx = createContext<Ctx>({ ask: () => undefined });

/** Dùng trong mọi nút hành động — thay cho nút bấm không ra gì */
export const useAction = () => useContext(ActionCtx);

/**
 * Hộp xác nhận + báo đã xong, dùng chung cho các nút Nhắc / Giao bài / Duyệt.
 *
 * Trước đây các nút này không nối handler nên bấm không phản hồi gì — QC không
 * biết mình đã bấm hay chưa, dễ bấm lại nhiều lần.
 */
export function ActionProvider({ children }: { children: ReactNode }) {
  const [pending, setPending] = useState<ActionAsk | null>(null);
  const [done, setDone] = useState<string | null>(null);

  const ask = useCallback((a: ActionAsk) => setPending(a), []);
  const value = useMemo(() => ({ ask }), [ask]);

  const dong = useCallback(() => setPending(null), []);

  return (
    <ActionCtx.Provider value={value}>
      {children}

      {pending && (
        <Hop
          ask={pending}
          onClose={dong}
          onDone={(t) => {
            setDone(t);
            window.setTimeout(() => setDone(null), 3200);
          }}
        />
      )}

      {/* báo đã xong — để QC biết chắc thao tác đã chạy */}
      {done && (
        <div
          className="fixed bottom-[20px] left-1/2 z-[80] -translate-x-1/2 rounded-[8px] px-[16px] py-[10px] text-[13px]"
          style={{
            background: "#e6f5ec",
            border: "1px solid #cfe3d6",
            color: OK,
            boxShadow: "0 6px 18px rgba(20,28,56,0.14)",
          }}
          role="status"
        >
          {done}
        </div>
      )}
    </ActionCtx.Provider>
  );
}

/** Tách riêng để dùng được hook bàn phím: Escape đóng, Tab quẩn trong hộp */
function Hop({
  ask,
  onClose,
  onDone,
}: {
  ask: ActionAsk;
  onClose: () => void;
  onDone: (t: string) => void;
}) {
  const ref = useModal(onClose);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center"
      style={{ background: "rgba(20,28,56,0.34)" }}
      onClick={onClose}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={ask.title}
        className="w-[420px] rounded-[12px] bg-white p-[18px]"
        style={{ boxShadow: "0 12px 32px rgba(20,28,56,0.22)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-[15px] font-semibold" style={{ color: INK }}>
          {ask.title}
        </h3>
        <div className="mb-[14px] mt-[6px] text-[13px] leading-[1.6]" style={{ color: INK2 }}>
          {ask.body}
        </div>
        <div className="flex justify-end gap-[8px]">
          <button type="button" onClick={onClose} className="cec-btn cec-btn-secondary">
            Huỷ
          </button>
          <button
            type="button"
            onClick={() => {
              ask.run?.();
              onDone(ask.doneText);
              onClose();
            }}
            className="rounded-[8px] px-[14px] py-[8px] text-[12.5px] font-semibold text-white"
            style={{ background: ask.danger ? "#d4342c" : NAVY }}
          >
            {ask.confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
