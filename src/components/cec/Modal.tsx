import type { ReactNode } from "react";
import { useModal } from "@/lib/useModal";

/**
 * Vỏ hộp thoại dùng chung: lớp phủ, chặn bấm xuyên, Escape đóng,
 * Tab quẩn trong hộp, khoá cuộn nền.
 *
 * Tách ra vì hook bàn phím phải nằm trong component của chính hộp — trước đây
 * mỗi modal tự vẽ nên có thẻ role="dialog" mà bàn phím vẫn không thoát ra được.
 */
export function Modal({
  label,
  width = 380,
  onClose,
  children,
}: {
  /** tên hộp, đọc cho trình đọc màn hình */
  label: string;
  width?: number;
  onClose: () => void;
  children: ReactNode;
}) {
  const ref = useModal(onClose);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center"
      style={{ background: "rgba(20,28,56,0.34)" }}
      onClick={onClose}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className="rounded-[12px] bg-white p-[18px]"
        style={{ width, boxShadow: "0 12px 32px rgba(20,28,56,0.22)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
