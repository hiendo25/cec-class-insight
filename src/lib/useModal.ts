import { useEffect, useRef } from "react";

/**
 * Bàn phím dùng được trong hộp thoại: nhấn Escape để đóng, Tab quẩn trong hộp
 * chứ không lọt ra bảng phía sau, và khoá cuộn nền.
 *
 * Trước đây các modal chỉ có role="dialog" nên người dùng bàn phím mở hộp lên
 * là mắc kẹt — Tab chạy ra sau lưng hộp, Escape không đóng.
 */
export function useModal(onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const truoc = document.activeElement as HTMLElement | null;

    /* đưa con trỏ vào trong hộp */
    const oTrong = () =>
      [...(el?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ) ?? [])].filter((x) => x.offsetParent !== null);

    oTrong()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const o = oTrong();
      if (!o.length) return;
      const dau = o[0]!;
      const cuoi = o[o.length - 1]!;
      if (e.shiftKey && document.activeElement === dau) {
        e.preventDefault();
        cuoi.focus();
      } else if (!e.shiftKey && document.activeElement === cuoi) {
        e.preventDefault();
        dau.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    const cuonCu = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = cuonCu;
      truoc?.focus?.();
    };
  }, [onClose]);

  return ref;
}
