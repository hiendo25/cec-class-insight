import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CLASSES } from "@/data/classes";
import { MONTHLY, coCuaBaoCao } from "@/data/reports";
import { STUDENTS } from "@/data/students";
import { INK, INK2, INK3, LINE, NAVY, OK, WARN, DANGER, TH_BG, TH_FG, TH_LINE } from "@/data/const";
import { monthlyStatusOf, useOverrides } from "@/data/overrides";
import { IconWarn } from "./icons";

/**
 * Báo cáo tháng — màn gom XUYÊN LỚP.
 *
 * Trước đây báo cáo tháng chỉ vào được khi đã ở trong một lớp cụ thể
 * (`/class/2/ket-qua`), còn mục "Báo cáo" ở sidebar ghi "sắp có".
 * Nghĩa là luồng QC làm hàng tháng cho MỌI lớp lại KHÔNG CÓ ĐƯỜNG BẮT ĐẦU —
 * QC phải nhớ từng lớp rồi mở lần lượt.
 *
 * Màn này trả lời đúng một câu: "tháng này còn lớp nào chưa xong báo cáo".
 */
export function MonthlyHub() {
  useOverrides();
  const navigate = useNavigate();
  const [chiCuaToi, setChiCuaToi] = useState(true);

  /* Tháng có dữ liệu — lấy từ chính MONTHLY, không bịa danh sách */
  const thangCo = useMemo(() => {
    const ra = new Set<string>();
    for (const list of Object.values(MONTHLY)) for (const m of list) ra.add(m.month);
    return [...ra].sort((a, b) => {
      const [ma, ya] = a.split("/");
      const [mb, yb] = b.split("/");
      return Number(yb) * 100 + Number(mb) - (Number(ya) * 100 + Number(ma));
    });
  }, []);
  const [thang, setThang] = useState(thangCo[0] ?? "");

  const dong = useMemo(() => {
    const ra: {
      id: number; code: string; campus: string; mine: boolean;
      tong: number; duyet: number; nhap: number;
      /* số bản mang từng cờ — 🔴 nghi trùng · 🟡 thiếu nguồn · 🟢 đủ nguồn */
      do_: number; vang: number; xanh: number;
    }[] = [];
    for (const c of CLASSES) {
      let tong = 0, duyet = 0, nhap = 0, do_ = 0, vang = 0, xanh = 0;
      for (const s of STUDENTS[c.id] ?? []) {
        const bc = (MONTHLY[s.id] ?? []).find((m) => m.month === thang);
        if (!bc) continue;
        tong++;
        const st = monthlyStatusOf(`${s.id}:${thang}`, bc.status);
        if (st === "approved") duyet++;
        else if (st === "draft") nhap++;
        /* Ba cờ đếm ngay ở đây bằng HÀM CHUNG `coCuaBaoCao` — cùng hàm màn duyệt
           hàng loạt dùng, nên hai màn không thể ra hai số cho cùng một thứ. */
        const { co } = coCuaBaoCao(bc);
        if (co === "do") do_++;
        else if (co === "vang") vang++;
        else xanh++;
      }
      if (tong === 0) continue;
      ra.push({ id: c.id, code: c.code, campus: c.campus, mine: c.mine, tong, duyet, nhap, do_, vang, xanh });
    }
    /* lớp còn nhiều việc lên trước */
    return ra.sort((a, b) => (b.tong - b.duyet) - (a.tong - a.duyet));
  }, [thang]);

  /* Lọc theo cờ — Hiền: "cho phép lọc theo từng cờ".
     Lọc ở mức LỚP: giữ lớp nào còn ít nhất một bản mang cờ đó. */
  const [locCo, setLocCo] = useState<"" | "do" | "vang" | "xanh">("");
  /* `dongLoc` = đã lọc "lớp của tôi" nhưng CHƯA lọc cờ — số trên nút lọc phải
     đếm từ đây, nếu đếm từ `list` thì bấm một cờ là ba nút kia về 0. */
  const dongLoc = chiCuaToi ? dong.filter((d) => d.mine) : dong;
  const list = dongLoc.filter((d) =>
    locCo === "do" ? d.do_ > 0 : locCo === "vang" ? d.vang > 0 : locCo === "xanh" ? d.xanh > 0 : true,
  );
  const chuaXong = list.filter((d) => d.duyet < d.tong);
  const tongBan = list.reduce((a, b) => a + b.tong, 0);
  const tongDuyet = list.reduce((a, b) => a + b.duyet, 0);

  return (
    <div className="flex flex-col gap-[13px]">
      <div className="flex flex-wrap items-center gap-[10px] text-[12.5px]">
        <select
          value={thang}
          onChange={(e) => setThang(e.target.value)}
          className="rounded-[8px] px-[11px] py-[7px] text-[13px] font-semibold"
          style={{ border: `1px solid ${NAVY}`, background: "#fff", color: NAVY }}
        >
          {thangCo.map((m) => (
            <option key={m} value={m}>Tháng {m}</option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => setChiCuaToi((v) => !v)}
          className="rounded-[8px] px-[11px] py-[6px]"
          style={{
            border: `1px solid ${chiCuaToi ? NAVY : "#d9dde5"}`,
            background: chiCuaToi ? "#eef1f7" : "#fff",
            color: chiCuaToi ? NAVY : INK,
            fontWeight: chiCuaToi ? 600 : 400,
          }}
        >
          {chiCuaToi ? "✓ Lớp của tôi" : "Đang xem tất cả lớp"}
        </button>

        <span className="flex-1" />
        <span
          className="rounded-[8px] px-[11px] py-[6px] font-semibold"
          style={{
            background: chuaXong.length ? "#fdf3e7" : "#e6f5ec",
            color: chuaXong.length ? WARN : OK,
          }}
        >
          {chuaXong.length
            ? `Còn ${chuaXong.length}/${list.length} lớp chưa xong`
            : `Đã duyệt hết ${list.length} lớp`}
        </span>
        <span style={{ color: INK3 }}>
          {tongDuyet}/{tongBan} bản đã duyệt
        </span>

        {/* Lọc theo cờ — Hiền: "cho phép lọc theo từng cờ".
            Số trên nút là số LỚP còn bản mang cờ đó, không phải số bản: đây là
            màn danh sách lớp nên đơn vị phải là lớp. */}
        <span className="flex flex-wrap items-center gap-[6px]">
          {([
            { k: "", t: "Tất cả", bg: "#eef0f4", fg: INK, n: dongLoc.length },
            { k: "do", t: "Nghi trùng", bg: "#fdecea", fg: DANGER, n: dongLoc.filter((d) => d.do_ > 0).length },
            { k: "vang", t: "Thiếu nguồn", bg: "#fdf3e7", fg: WARN, n: dongLoc.filter((d) => d.vang > 0).length },
            { k: "xanh", t: "Đủ nguồn", bg: "#e6f5ec", fg: OK, n: dongLoc.filter((d) => d.xanh > 0).length },
          ] as const).map((c) => {
            const on = locCo === c.k;
            return (
              <button
                key={c.t}
                type="button"
                onClick={() => setLocCo(c.k)}
                className="rounded-[6px] px-[9px] py-[4px] text-[12px] font-medium tabular-nums"
                style={{
                  background: on ? c.bg : "transparent",
                  color: on ? c.fg : INK2,
                  border: `1px solid ${on ? c.fg : LINE}`,
                }}
              >
                {c.t} {c.n}
              </button>
            );
          })}
        </span>
      </div>

      {list.length === 0 ? (
        <p className="rounded-[12px] bg-white py-[40px] text-center text-[13px]"
          style={{ border: `1px solid ${LINE}`, color: INK3 }}>
          {chiCuaToi ? (
            <>
              Không có lớp nào của bạn có báo cáo tháng {thang}.{" "}
              <button type="button" onClick={() => setChiCuaToi(false)}
                className="font-semibold underline" style={{ color: NAVY }}>
                Xem tất cả lớp
              </button>
            </>
          ) : (
            `Chưa có báo cáo tháng ${thang} ở lớp nào.`
          )}
        </p>
      ) : (
        <div className="cec-scroll overflow-x-auto rounded-[8px] bg-white" style={{ border: `1px solid ${LINE}` }}>
          <table className="border-collapse text-[13px]" style={{ minWidth: 760, width: "100%" }}>
            <colgroup>
              {[150, 150, 84, 104, 168, 150, 120].map((w, i) => <col key={i} style={{ width: w }} />)}
            </colgroup>
            <thead>
              <tr style={{ background: TH_BG, color: TH_FG, borderBottom: `1px solid ${TH_LINE}` }}>
                {["Lớp học", "Cơ sở", "Số em", "Đã duyệt", "Tiến độ", "Cờ", ""].map((h) => (
                  <th key={h} className="whitespace-nowrap px-[12px] py-[10px] text-left text-[12.5px] font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map((d, i) => {
                const xong = d.duyet >= d.tong;
                const pct = d.tong ? Math.round((d.duyet / d.tong) * 100) : 0;
                return (
                  <tr key={d.id} style={{ background: "#fff", borderBottom: "1px solid rgba(16,24,40,0.06)" }}>
                    <td className="px-[12px] py-[9px] font-medium" style={{ color: INK }}>{d.code}</td>
                    <td className="truncate px-[12px]" style={{ color: INK2 }} title={d.campus}>{d.campus}</td>
                    <td className="px-[12px] tabular-nums" style={{ color: INK2 }}>{d.tong}</td>
                    <td className="px-[12px] tabular-nums font-semibold" style={{ color: xong ? OK : WARN }}>
                      {d.duyet}/{d.tong}
                    </td>
                    <td className="px-[12px]">
                      <span className="flex items-center gap-[8px]">
                        <span className="h-[6px] flex-1 overflow-hidden rounded-full" style={{ background: "#eceef3" }}>
                          <span className="block h-full rounded-full"
                            style={{ width: `${pct}%`, background: xong ? OK : pct > 0 ? WARN : DANGER }} />
                        </span>
                        <span className="w-[34px] shrink-0 text-right tabular-nums text-[11.5px]" style={{ color: INK3 }}>
                          {pct}%
                        </span>
                      </span>
                      {d.nhap > 0 && (
                        <span className="mt-[3px] flex items-center gap-[4px] text-[11px]" style={{ color: INK3 }}>
                          <IconWarn size={11} /> {d.nhap} bản còn là nháp
                        </span>
                      )}
                    </td>
                    {/* Ba cờ NGAY TRÊN DÒNG LỚP. Trước đây chỉ có một câu chữ mô tả
                        ở đầu màn, còn cờ thật nằm trong màn duyệt hàng loạt — QC phải
                        mở từng lớp mới biết lớp nào cần đọc kỹ. */}
                    <td className="px-[12px] py-[7px]">
                      <span className="flex flex-wrap items-center gap-[5px]">
                        {([
                          { n: d.do_, bg: "#fdecea", fg: DANGER, t: "nghi trùng tháng trước" },
                          { n: d.vang, bg: "#fdf3e7", fg: WARN, t: "thiếu nguồn" },
                          { n: d.xanh, bg: "#e6f5ec", fg: OK, t: "đủ nguồn" },
                        ] as const)
                          .filter((c) => c.n > 0)
                          .map((c) => (
                            <span
                              key={c.t}
                              title={`${c.n} bản ${c.t}`}
                              className="rounded-[4px] px-[6px] py-[2px] text-[11.5px] font-semibold tabular-nums"
                              style={{ background: c.bg, color: c.fg }}
                            >
                              {c.n}
                            </span>
                          ))}
                      </span>
                    </td>
                    <td className="px-[12px] py-[7px]">
                      <button
                        type="button"
                        onClick={() =>
                          navigate({ to: "/class/$classId/$tab", params: { classId: String(d.id), tab: "ket-qua" } })
                        }
                        className="rounded-[8px] px-[11px] py-[5px] text-[12px] font-semibold"
                        style={{ border: `1px solid ${LINE}`, color: xong ? INK2 : NAVY }}
                      >
                        {xong ? "Xem lại" : d.duyet === 0 ? "Soạn cả lớp" : "Tiếp tục"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-[12px]" style={{ color: INK3 }}>
        Bấm một lớp để mở màn duyệt hàng loạt.
      </p>
    </div>
  );
}
