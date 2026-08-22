import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CLASSES } from "@/data/classes";
import { ASSIGNMENTS } from "@/data/sessions";
import { EXAMS } from "@/data/exams";
import { BAI_NOP, baiTroBanCu } from "@/data/submissions";
import { INK, INK2, INK3, LINE, NAVY, OK, WARN, DANGER, TODAY, parseNgay } from "@/data/const";
import { daDuyetBai, useOverrides } from "@/data/overrides";
import { useAction } from "./ActionDialog";
import { IconWarn } from "./icons";
import { xuatCSV } from "@/lib/xuatBang";

/**
 * Bài đã giao — màn THEO DÕI SAU KHI GIAO (`_BANDO_FLOW_MANHINH:381`).
 *
 * Khác "Tiến độ theo lớp": màn kia xem theo LỚP, màn này xem theo BÀI, xuyên
 * lớp. QC hỏi "bài nào đang có vấn đề" chứ không hỏi "lớp nào".
 *
 * Năm thẻ đếm theo đúng đặc tả, trong đó **"Đề có bản mới"** là thẻ riêng của
 * PROD: bài đã giao nhưng đề gốc đã xuất bản phiên bản mới, học sinh vẫn đang
 * mở bản cũ. Đây cùng một nguồn với cảnh báo ở màn "Hôm nay của tôi" — dẫn xuất
 * từ `baiTroBanCu()`, không đếm rời.
 */

type Dong = {
  id: string;
  baiTen: string;
  classId: number;
  maLop: string;
  session: number;
  assigned: string;
  due: string;
  total: number;
  submitted: number;
  graded: number;
  /** bài tự luận/nói đã nộp mà QC chưa xác nhận */
  choDuyet: number;
  troBanCu: boolean;
  quaHan: boolean;
};

type Loc = "tat-ca" | "chua-ai-nop" | "cho-cham" | "qua-han" | "ban-moi";

export function AssignedWork() {
  useOverrides();
  const navigate = useNavigate();
  const { ask } = useAction();
  const [loc, setLoc] = useState<Loc>("tat-ca");
  const [tim, setTim] = useState("");
  /* 269 bài đổ một trang thì cuộn mãi không hết — QC không đọc nổi.
     Cùng cách phân trang với màn Lớp học để hai màn dùng giống nhau. */
  const [coTrang, setCoTrang] = useState(50);
  const [trang, setTrang] = useState(1);

  /* PHẢI lọc `c.mine` như màn "Hôm nay của tôi", không lấy cả 16 lớp.
     Không lọc thì thẻ "Đề có bản mới" ra 28 trong khi màn Hôm nay báo 6 — cùng
     một thứ hai chỗ hai số. Chú thích ở Today.tsx:33 đã ghi rõ "mọi con số phải
     cùng một phạm vi", đây đúng là lỗi đó. */
  const lopCuaToi = useMemo(() => CLASSES.filter((c) => c.mine), []);
  const idCuaToi = useMemo(() => new Set(lopCuaToi.map((c) => c.id)), [lopCuaToi]);

  /* Tập bài trỏ bản cũ — DẪN XUẤT từ cùng một hàm với màn Hôm nay và lọc cùng
     phạm vi, không đếm lại theo cách khác. */
  const banCu = useMemo(
    () =>
      new Set(
        baiTroBanCu(EXAMS)
          .filter((b) => idCuaToi.has(b.classId))
          .map((b) => b.assignmentId),
      ),
    [idCuaToi],
  );

  const dong = useMemo<Dong[]>(() => {
    const ra: Dong[] = [];
    for (const c of lopCuaToi) {
      for (const a of ASSIGNMENTS[c.id] ?? []) {
        /* Chờ duyệt = bài tự luận/nói đã nộp mà QC chưa xác nhận.
           Trắc nghiệm máy chấm xong trả điểm luôn, không nằm ở đây. */
        const choDuyet = BAI_NOP.filter(
          (b) => b.assignmentId === a.id && b.tuLuan && !daDuyetBai(b.id),
        ).length;
        const han = parseNgay(a.due);
        ra.push({
          id: a.id,
          baiTen: a.title,
          classId: c.id,
          maLop: c.code,
          session: a.session,
          assigned: a.assigned,
          due: a.due,
          total: a.total,
          submitted: a.submitted,
          graded: a.graded,
          choDuyet,
          troBanCu: banCu.has(a.id),
          quaHan: !!han && han < TODAY && a.submitted < a.total,
        });
      }
    }
    return ra.sort((a, b) => (parseNgay(b.due)?.getTime() ?? 0) - (parseNgay(a.due)?.getTime() ?? 0));
  }, [lopCuaToi, banCu]);

  const the = useMemo(
    () => ({
      "tat-ca": dong.length,
      "chua-ai-nop": dong.filter((d) => d.submitted === 0).length,
      "cho-cham": dong.filter((d) => d.choDuyet > 0).length,
      "qua-han": dong.filter((d) => d.quaHan).length,
      "ban-moi": dong.filter((d) => d.troBanCu).length,
    }),
    [dong],
  );

  const hien = useMemo(() => {
    let r = dong;
    if (loc === "chua-ai-nop") r = r.filter((d) => d.submitted === 0);
    else if (loc === "cho-cham") r = r.filter((d) => d.choDuyet > 0);
    else if (loc === "qua-han") r = r.filter((d) => d.quaHan);
    else if (loc === "ban-moi") r = r.filter((d) => d.troBanCu);
    const q = tim.trim().toLowerCase();
    if (q) r = r.filter((d) => `${d.baiTen} ${d.maLop}`.toLowerCase().includes(q));
    return r;
  }, [dong, loc, tim]);

  const soTrang = Math.max(1, Math.ceil(hien.length / coTrang));
  const trangHT = Math.min(trang, soTrang);
  const dongTrang = hien.slice((trangHT - 1) * coTrang, trangHT * coTrang);

  const THE: { key: Loc; nhan: string; mau?: string }[] = [
    { key: "tat-ca", nhan: "Bài đã giao" },
    { key: "chua-ai-nop", nhan: "Chưa ai nộp" },
    { key: "cho-cham", nhan: "Chờ chấm", mau: WARN },
    { key: "qua-han", nhan: "Quá hạn còn thiếu", mau: DANGER },
    { key: "ban-moi", nhan: "Đề có bản mới", mau: DANGER },
  ];

  return (
    <div className="flex flex-col gap-[14px]">
      {/* 5 thẻ đếm — bấm được, đây là bộ lọc chứ không phải số trang trí */}
      <div className="grid gap-[10px] sm:grid-cols-3 lg:grid-cols-5">
        {THE.map((t) => {
          const on = loc === t.key;
          const so = the[t.key];
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => { setLoc(t.key); setTrang(1); }}
              className="flex flex-col items-start gap-[2px] rounded-[12px] px-[14px] py-[11px] text-left"
              style={{
                background: "#fff",
                border: `1px solid ${on ? NAVY : LINE}`,
                boxShadow: on ? `inset 0 0 0 1px ${NAVY}` : undefined,
              }}
            >
              <span className="text-[12px]" style={{ color: INK2 }}>
                {t.nhan}
              </span>
              <span
                className="text-[24px] font-medium leading-none tabular-nums"
                style={{
                  color: so === 0 ? "#a8b0be" : (t.mau ?? INK),
                  letterSpacing: "-0.02em",
                }}
              >
                {so}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-[10px]">
        <input
          value={tim}
          onChange={(e) => { setTim(e.target.value); setTrang(1); }}
          placeholder="Tìm tên bài, mã lớp…"
          className="rounded-[8px] px-[11px] py-[7px] text-[12.5px]"
          style={{ border: `1px solid ${LINE}`, background: "#fff", color: INK, minWidth: 240 }}
        />
        <span className="text-[12.5px]" style={{ color: INK3 }}>
          {hien.length} bài
        </span>
        <span className="flex-1" />
        <button
          type="button"
          disabled={hien.length === 0}
          onClick={() =>
            xuatCSV(
              `bai-da-giao-${loc}`,
              ["Bài", "Lớp", "Buổi", "Giao", "Hạn", "Đã nộp", "Sĩ số", "Chờ chấm", "Đề có bản mới"],
              hien.map((d) => [
                d.baiTen,
                d.maLop,
                String(d.session),
                d.assigned,
                d.due,
                String(d.submitted),
                String(d.total),
                String(d.choDuyet),
                d.troBanCu ? "có" : "",
              ]),
            )
          }
          className="rounded-[8px] px-[12px] py-[7px] text-[12.5px] font-medium disabled:opacity-40"
          style={{ border: `1px solid ${LINE}`, background: "#fff", color: INK }}
        >
          Xuất Excel
        </button>
      </div>

      {hien.length === 0 ? (
        <div
          className="rounded-[12px] bg-white px-[16px] py-[40px] text-center text-[13px]"
          style={{ border: `1px solid ${LINE}`, color: loc === "tat-ca" ? INK3 : OK }}
        >
          {loc === "tat-ca" ? "Chưa có bài nào được giao." : "Không có bài nào trong nhóm này."}
        </div>
      ) : (
        <div className="cec-scroll overflow-x-auto rounded-[12px] bg-white" style={{ border: `1px solid ${LINE}` }}>
          <table className="border-collapse text-[13px]" style={{ minWidth: 1120, width: "100%" }}>
            <colgroup>
              {[260, 120, 84, 120, 120, 150, 130, 136].map((w, i) => (
                <col key={i} style={{ width: w }} />
              ))}
            </colgroup>
            <thead>
              <tr style={{ background: "#f7f8fa", borderBottom: `1px solid ${LINE}` }}>
                {["Bài", "Lớp", "Buổi", "Giao ngày", "Hạn nộp", "Đã nộp", "Chờ chấm", ""].map((h) => (
                  <th
                    key={h}
                    className="px-[11px] py-[9px] text-left text-[11.5px] font-semibold uppercase"
                    style={{ color: INK3, letterSpacing: "0.04em" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dongTrang.map((d) => (
                <tr key={`${d.classId}-${d.id}`} style={{ borderBottom: "1px solid #f0f2f6" }}>
                  <td className="px-[11px] py-[10px]">
                    <span style={{ color: INK }}>{d.baiTen}</span>
                    {d.troBanCu && (
                      <span
                        className="ml-[7px] inline-flex items-center gap-[4px] rounded-[4px] px-[6px] py-[1px] text-[11px] font-medium"
                        style={{ background: "#fdecea", color: DANGER }}
                        title="Đề đã có bản mới, học sinh vẫn đang mở bản cũ"
                      >
                        <IconWarn size={11} />
                        đề có bản mới
                      </span>
                    )}
                  </td>
                  <td className="px-[11px] py-[10px]">
                    <button
                      type="button"
                      onClick={() =>
                        void navigate({
                          to: "/class/$classId/$tab",
                          params: { classId: String(d.classId), tab: "bai-tap" },
                        })
                      }
                      className="font-medium hover:underline"
                      style={{ color: NAVY }}
                    >
                      {d.maLop}
                    </button>
                  </td>
                  <td className="px-[11px] py-[10px] tabular-nums" style={{ color: INK2 }}>
                    {d.session}
                  </td>
                  <td className="px-[11px] py-[10px] tabular-nums" style={{ color: INK2 }}>
                    {d.assigned}
                  </td>
                  <td className="px-[11px] py-[10px] tabular-nums" style={{ color: d.quaHan ? DANGER : INK2 }}>
                    {d.due}
                    {d.quaHan && <div className="text-[11px]">quá hạn</div>}
                  </td>
                  <td className="px-[11px] py-[10px]">
                    <span className="tabular-nums" style={{ color: d.submitted === 0 ? DANGER : INK }}>
                      {d.submitted}/{d.total}
                    </span>
                    {d.submitted === 0 && (
                      <div className="text-[11px]" style={{ color: DANGER }}>
                        chưa ai nộp
                      </div>
                    )}
                  </td>
                  <td className="px-[11px] py-[10px]">
                    {d.choDuyet > 0 ? (
                      <button
                        type="button"
                        onClick={() => void navigate({ to: "/queue/bai" })}
                        className="rounded-[6px] px-[8px] py-[3px] text-[12px] font-medium hover:underline"
                        style={{ background: "#fdf3e7", color: WARN }}
                      >
                        {d.choDuyet} bài
                      </button>
                    ) : (
                      <span style={{ color: INK3 }}>—</span>
                    )}
                  </td>
                  <td className="px-[11px] py-[10px]">
                    {d.submitted < d.total && (
                      <button
                        type="button"
                        onClick={() =>
                          ask({
                            title: `Nhắc nộp ${d.baiTen}?`,
                            body: (
                              <>
                                Nhắc {d.total - d.submitted} em lớp <b>{d.maLop}</b> chưa nộp{" "}
                                <b>{d.baiTen}</b> (hạn {d.due}).
                                <p style={{ marginTop: 8, fontSize: 12, color: INK3 }}>
                                  Mở lớp để xem danh sách từng em.
                                </p>
                              </>
                            ),
                            confirmLabel: "Mở lớp xem danh sách",
                            doneText: "",
                            run: () =>
                              void navigate({
                                to: "/class/$classId/$tab",
                                params: { classId: String(d.classId), tab: "bai-tap" },
                              }),
                          })
                        }
                        className="rounded-[6px] px-[10px] py-[5px] text-[12px] font-medium"
                        style={{ border: `1px solid ${LINE}`, background: "#fff", color: INK }}
                      >
                        Nhắc
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {hien.length > 0 && (
        <div
          className="flex flex-wrap items-center gap-[10px] rounded-[12px] bg-white px-[14px] py-[9px] text-[12.5px]"
          style={{ border: `1px solid ${LINE}`, color: INK2 }}
        >
          <select
            value={coTrang}
            onChange={(e) => {
              setCoTrang(Number(e.target.value));
              setTrang(1);
            }}
            className="rounded-[6px] px-[9px] py-[5px] text-[12.5px]"
            style={{ border: `1px solid ${LINE}`, background: "#fff", color: INK }}
          >
            {[25, 50, 100].map((n) => (
              <option key={n} value={n}>
                {n} / trang
              </option>
            ))}
          </select>
          <span className="flex-1">
            {(trangHT - 1) * coTrang + 1}–{Math.min(trangHT * coTrang, hien.length)} trong{" "}
            {hien.length} bài
          </span>
          <button
            type="button"
            disabled={trangHT <= 1}
            onClick={() => setTrang(trangHT - 1)}
            className="rounded-[6px] px-[10px] py-[5px] disabled:opacity-40"
            style={{ border: `1px solid ${LINE}`, background: "#fff", color: INK }}
          >
            ‹
          </button>
          <span className="tabular-nums" style={{ color: INK }}>
            {trangHT} / {soTrang}
          </span>
          <button
            type="button"
            disabled={trangHT >= soTrang}
            onClick={() => setTrang(trangHT + 1)}
            className="rounded-[6px] px-[10px] py-[5px] disabled:opacity-40"
            style={{ border: `1px solid ${LINE}`, background: "#fff", color: INK }}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
