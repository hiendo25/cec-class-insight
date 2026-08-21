// Bộ cắt JSON nhúng trong file .ts — dùng chung cho các script đếm.

/** Đọc một mảng/object JSON nhúng trong file .ts, đếm ngoặc và BỎ QUA ngoặc trong chuỗi. */
export function catJSON(src, tenExport, moNgoac) {
  const i = src.indexOf(tenExport);
  if (i < 0) throw new Error(`không thấy ${tenExport}`);
  // phải bắt đầu tìm SAU dấu '=' — nếu không sẽ trúng '[]' trong khai báo kiểu
  const j = src.indexOf(moNgoac, src.indexOf("=", i));
  const dong = moNgoac === "[" ? "]" : "}";
  let sau = 0, k = j, trongChuoi = false, thoat = false;
  for (; k < src.length; k++) {
    const c = src[k];
    if (trongChuoi) {
      if (thoat) thoat = false;
      else if (c === "\\") thoat = true;
      else if (c === '"') trongChuoi = false;
      continue;
    }
    if (c === '"') trongChuoi = true;
    else if (c === moNgoac) sau++;
    else if (c === dong && --sau === 0) break;
  }
  return doiSangJSON(src.slice(j, k + 1));
}

/**
 * Vài file viết dạng object literal của TS (`id: 1,` không có nháy, có dấu phẩy thừa,
 * có chú thích) chứ không phải JSON. Chuyển sang JSON hợp lệ rồi mới parse.
 */
function doiSangJSON(txt) {
  try {
    return JSON.parse(txt);
  } catch {
    /* bỏ chú thích, KHÔNG đụng nội dung trong chuỗi */
    let ra = "", trongChuoi = false, thoat = false;
    for (let i = 0; i < txt.length; i++) {
      const c = txt[i];
      if (trongChuoi) {
        ra += c;
        if (thoat) thoat = false;
        else if (c === "\\") thoat = true;
        else if (c === '"') trongChuoi = false;
        continue;
      }
      if (c === '"') { trongChuoi = true; ra += c; continue; }
      if (c === "/" && txt[i + 1] === "/") { while (i < txt.length && txt[i] !== "\n") i++; ra += "\n"; continue; }
      if (c === "/" && txt[i + 1] === "*") { i += 2; while (i < txt.length && !(txt[i] === "*" && txt[i + 1] === "/")) i++; i++; continue; }
      ra += c;
    }
    ra = ra
      .replace(/([{,]\s*)([A-Za-z_$][\w$]*|\d+)\s*:/g, '$1"$2":')  /* tên khoá (kể cả khoá SỐ như `1:`) -> có nháy */
      .replace(/,(\s*[}\]])/g, "$1");                            /* bỏ dấu phẩy thừa */
    return JSON.parse(ra);
  }
}

