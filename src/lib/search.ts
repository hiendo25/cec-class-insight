/** Bỏ dấu tiếng Việt để gõ "ha" vẫn tìm được "Hà" */
export const noAccent = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase();

/**
 * Khớp theo ĐẦU TỪ, không khớp giữa từ.
 *
 * Trước đây dùng `includes` nên gõ "Hà" ra cả "Phạm Văn Nam" — vì bỏ dấu xong
 * "pham" có chứa "ha" ở giữa. QC gõ tên mà ra người lạ thì không tin được kết quả.
 * Giờ "ha" khớp "Hà", "Hân", "Hải" (đầu từ) nhưng không khớp "Phạm", "Phan".
 *
 * Nhiều từ khoá cách nhau bởi dấu cách thì phải khớp hết — gõ "ha hai" ra "Hà Hải".
 */
export const matchWords = (haystack: string, query: string) => {
  const words = noAccent(haystack).split(/\s+/).filter(Boolean);
  const keys = noAccent(query).split(/\s+/).filter(Boolean);
  if (!keys.length) return true;
  return keys.every((k) => words.some((w) => w.startsWith(k)));
};

/** Mã lớp, mã học sinh: khớp bất kỳ đâu vì người ta hay gõ đoạn giữa (vd "D3-25") */
export const matchCode = (code: string, query: string) =>
  code.toLowerCase().includes(noAccent(query).replace(/\s+/g, ""));
