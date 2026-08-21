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
 *
 * GÕ CÓ DẤU thì khớp CÓ DẤU: gõ "Hà" chỉ ra Hà, không ra Hân — vì người gõ dấu
 * là đang biết rõ tên. Gõ không dấu "ha" thì ra cả Hà, Hân, Hải cho dễ tìm.
 */
const coDau = (s: string) => /[̀-ͯ]/.test(s.normalize("NFD"));

export const matchWords = (haystack: string, query: string) => {
  const q = query.trim();
  if (!q) return true;

  /* người gõ có dấu -> so nguyên văn, chỉ hạ chữ hoa */
  const chuan = (s: string) => (coDau(q) ? s.toLowerCase() : noAccent(s));
  const words = chuan(haystack).split(/\s+/).filter(Boolean);
  const keys = chuan(q).split(/\s+/).filter(Boolean);
  return keys.every((k) => words.some((w) => w.startsWith(k)));
};

/** Mã lớp, mã học sinh: khớp bất kỳ đâu vì người ta hay gõ đoạn giữa (vd "D3-25") */
export const matchCode = (code: string, query: string) =>
  code.toLowerCase().includes(noAccent(query).replace(/\s+/g, ""));
