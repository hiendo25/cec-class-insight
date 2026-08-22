import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CLASSES } from "@/data/classes";
import { SESSIONS } from "@/data/sessions";
import { REPORTS } from "@/data/reports";
import { INK, INK2, INK3, LINE, NAVY, OK, WARN, DANGER, TODAY, parseNgay } from "@/data/const";
import { reportStatusOf, useOverrides } from "@/data/overrides";
import { useAction } from "./ActionDialog";
import { Person } from "./Person";
import { IconCheck, IconWarn } from "./icons";

/**
 * Lớp học trong ngày — BÀN LÀM VIỆC HẰNG NGÀY của QC (`_BANDO_FLOW_MANHINH:380`).
 *
 * Khác màn "Lớp học": màn kia là DANH SÁCH 16 lớp mình phụ trách, xem cả kỳ.
 * Màn này chỉ hỏi một câu: **hôm nay có buổi nào, buổi nào còn thiếu việc gì.**
 *
 * Ba cột theo đúng đặc tả: Báo cáo · Điểm danh · Bài tập. Đây là ba thứ phải
 * xong sau mỗi buổi; buổi nào thiếu thì QC đi đòi.
 *
 * Vì sao trước đây hoãn: `_BA_DUYET_WIREFRAME:179` ghi "thiếu trường BE". Nhưng
 * đó là ràng buộc của app cũ — ở đây `Session` đã có sẵn cả ba trường
 * `report` / `attendance` / `homework`, nên không còn lý do hoãn.
 *
 * G26 (`_BANDO_FLOW_MANHINH:549`): trên PROD cột Báo cáo 10/10 buổi đều rỗng,
 * tức quy trình báo cáo buổi không được dùng. Ở đây phải cho thấy rõ buổi nào
 * chưa có phiếu, đó chính là việc QC cần nhìn ra.
 */

/** ngày -> chuỗi dd/mm/yyyy đúng kiểu dữ liệu đang dùng (không đệm số 0) */
const dmy = (d: Date) => `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

/** "5/8/2026" -> số so sánh được. Sai định dạng trả null chứ không NaN. */
const moc = (s: string): number | null => {
  const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(s.trim());
  return m ? +m[3]! * 10000 + +m[2]! * 100 + +m[1]! : null;
};

/** Mọi ngày CÓ BUỔI, tính một lần ở module — dữ liệu tĩnh, không phụ thuộc state. */
const NGAY_CO_BUOI: string[] = (() => {
  const t = new Set<string>();
  for (const c of CLASSES) for (const s of SESSIONS[c.id] ?? []) t.add(s.date);
  return [...t].sort((a, b) => (moc(a) ?? 0) - (moc(b) ?? 0));
})();

type Buoi = {
  classId: number;
  maLop: string;
  coSo: string;
  no: number;
  time: string;
  room: string;
  teacher: string;
  ta: string | null;
  report: "draft" | "pending" | "approved" | null;
  attendance: boolean | null;
  homework: boolean | null;
  past: boolean;
};

export function DailyClasses() {
  useOverrides();
  const navigate = useNavigate();
  const { ask } = useAction();
  const [dauX, setDauX] = useState(0);

  /* Lịch lớp thật không phải ngày nào cũng có buổi — 21/08 là ngày trống trong
     khi 20/08 có 4 buổi và 23/08 có 3. Nếu chỉ cho lùi/tiến từng ngày lịch thì
     QC bấm mãi vẫn ra màn rỗng, tưởng app hỏng.
     Mặc định mở đúng hôm nay nếu hôm nay có buổi; không thì nhảy tới ngày GẦN
     NHẤT SẮP TỚI, hết rồi thì lùi về ngày cuối cùng có buổi. */
  const ngayCoBuoi = NGAY_CO_BUOI;
  const [nhan, setNhan] = useState(() => {
    const hn = dmy(TODAY);
    if (NGAY_CO_BUOI.includes(hn)) return hn;
    const m0 = moc(hn) ?? 0;
    return NGAY_CO_BUOI.find((d) => (moc(d) ?? 0) > m0) ?? NGAY_CO_BUOI.at(-1) ?? hn;
  });

  const viTri = ngayCoBuoi.indexOf(nhan);
  const homNay = dmy(TODAY);

  /* Buổi của NGÀY ĐANG XEM, chỉ lớp QC phụ trách.
     `report` dẫn xuất từ REPORTS qua reportStatusOf — không đọc thẳng cờ tĩnh,
     nếu không QC duyệt xong màn vẫn hiện "chưa có phiếu". */
  const buoi = useMemo<Buoi[]>(() => {
    void dauX;
    const ra: Buoi[] = [];
    for (const c of CLASSES) {
      for (const s of SESSIONS[c.id] ?? []) {
        if (s.date !== nhan) continue;
        const hs = (REPORTS[c.id] ?? []).filter((r) => r.session === s.no);
        /* Phiếu của buổi: lấy trạng thái THẤP NHẤT trong các phiếu học sinh —
           còn một em chưa duyệt thì cả buổi coi như chưa xong. */
        let rp: Buoi["report"] = s.report;
        if (hs.length) {
          const tt = hs.map((r) => reportStatusOf(r.id, r.status));
          rp = tt.includes("draft") ? "draft" : tt.includes("pending") ? "pending" : "approved";
        }
        ra.push({
          classId: c.id,
          maLop: c.code,
          coSo: c.campus,
          no: s.no,
          time: s.time,
          room: s.room,
          teacher: s.teacher,
          ta: s.ta,
          report: rp,
          attendance: s.attendance,
          homework: s.homework,
          past: s.past,
        });
      }
    }
    return ra.sort((a, b) => a.time.localeCompare(b.time));
  }, [nhan, dauX]);

  /* Buổi ĐÃ DIỄN RA mà còn thiếu việc — đây mới là thứ QC phải xử lý.
     Buổi chưa diễn ra thì thiếu là bình thường, không tính. */
  const thieu = buoi.filter(
    (b) => b.past && (b.report !== "approved" || !b.attendance || !b.homework),
  );

  return (
    <div className="flex flex-col gap-[14px]">
      {/* chọn ngày */}
      <div className="flex flex-wrap items-center gap-[10px]">
        {/* Nhảy giữa các ngày CÓ BUỔI, không lùi/tiến từng ngày lịch —
            bấm một cái là tới buổi tiếp theo, không rơi vào ngày trống. */}
        <div className="flex items-center gap-[6px]">
          <button
            type="button"
            disabled={viTri <= 0}
            onClick={() => setNhan(ngayCoBuoi[viTri - 1] ?? nhan)}
            className="rounded-[6px] px-[10px] py-[6px] text-[12.5px] disabled:opacity-40"
            style={{ border: `1px solid ${LINE}`, background: "#fff", color: INK }}
          >
            ‹ Ngày có buổi trước
          </button>
          <select
            value={nhan}
            onChange={(e) => setNhan(e.target.value)}
            className="rounded-[6px] px-[10px] py-[6px] text-[12.5px]"
            style={{ border: `1px solid ${LINE}`, background: "#fff", color: INK }}
          >
            {ngayCoBuoi.map((d) => (
              <option key={d} value={d}>
                {d}
                {d === homNay ? " — hôm nay" : ""}
              </option>
            ))}
          </select>
          <button
            type="button"
            disabled={viTri < 0 || viTri >= ngayCoBuoi.length - 1}
            onClick={() => setNhan(ngayCoBuoi[viTri + 1] ?? nhan)}
            className="rounded-[6px] px-[10px] py-[6px] text-[12.5px] disabled:opacity-40"
            style={{ border: `1px solid ${LINE}`, background: "#fff", color: INK }}
          >
            Ngày có buổi sau ›
          </button>
        </div>
        <span className="text-[13px]" style={{ color: INK2 }}>
          {buoi.length} buổi
          {nhan !== homNay && (
            <span style={{ color: INK3 }}>
              {" "}— hôm nay {homNay} không có buổi nào
            </span>
          )}
        </span>
        {thieu.length > 0 && (
          <span
            className="flex items-center gap-[6px] rounded-[6px] px-[9px] py-[4px] text-[12px] font-medium"
            style={{ background: "#fdf3e7", color: WARN }}
          >
            <IconWarn size={13} />
            {thieu.length} buổi đã diễn ra còn thiếu việc
          </span>
        )}
      </div>

      {buoi.length === 0 ? (
        <div
          className="rounded-[12px] bg-white px-[16px] py-[40px] text-center text-[13px]"
          style={{ border: `1px solid ${LINE}`, color: INK3 }}
        >
          Không có buổi nào của bạn trong ngày {nhan}.
        </div>
      ) : (
        <div className="cec-scroll overflow-x-auto rounded-[12px] bg-white" style={{ border: `1px solid ${LINE}` }}>
          <table className="border-collapse text-[13px]" style={{ minWidth: 1080, width: "100%" }}>
            <colgroup>
              {[104, 132, 150, 168, 150, 150, 150, 96].map((w, i) => (
                <col key={i} style={{ width: w }} />
              ))}
            </colgroup>
            <thead>
              <tr style={{ background: "#f7f8fa", borderBottom: `1px solid ${LINE}` }}>
                {["Giờ", "Lớp", "Cơ sở · Phòng", "Giáo viên · TA", "Báo cáo", "Điểm danh", "Bài tập", ""].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-[11px] py-[9px] text-left text-[11.5px] font-semibold uppercase"
                      style={{ color: INK3, letterSpacing: "0.04em" }}
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {buoi.map((b) => (
                <tr key={`${b.classId}-${b.no}`} style={{ borderBottom: `1px solid #f0f2f6` }}>
                  <td className="px-[11px] py-[10px] tabular-nums" style={{ color: INK }}>
                    {b.time}
                  </td>
                  <td className="px-[11px] py-[10px]">
                    <button
                      type="button"
                      onClick={() =>
                        navigate({
                          to: "/class/$classId/$tab",
                          params: { classId: String(b.classId), tab: "lich-hoc" },
                        })
                      }
                      className="font-medium hover:underline"
                      style={{ color: NAVY }}
                    >
                      {b.maLop}
                    </button>
                    <div className="text-[11.5px]" style={{ color: INK3 }}>
                      Buổi {b.no}
                    </div>
                  </td>
                  <td className="px-[11px] py-[10px]" style={{ color: INK2 }}>
                    {b.coSo}
                    <div className="text-[11.5px]" style={{ color: INK3 }}>
                      {b.room}
                    </div>
                  </td>
                  <td className="px-[11px] py-[10px]">
                    <Person name={b.teacher} size={20} />
                    <div className="mt-[3px] text-[11.5px]" style={{ color: INK3 }}>
                      {b.ta ? `TA ${b.ta}` : "chưa có TA"}
                    </div>
                  </td>

                  {/* ---- Báo cáo: cột G26 nêu đích danh ---- */}
                  <td className="px-[11px] py-[10px]">
                    <O
                      trangThai={
                        !b.past
                          ? "chua-dien-ra"
                          : b.report === "approved"
                            ? "xong"
                            : b.report === "pending"
                              ? "cho-toi"
                              : b.report === "draft"
                                ? "gv-dang-soan"
                                : "trong"
                      }
                      nhanCho="chờ tôi duyệt"
                      {...(b.past
                        ? {
                            /* Mọi trạng thái đã diễn ra đều mở được, không chỉ
                               `pending`. Đã duyệt cũng cần xem lại được. */
                            onBam: () =>
                              void navigate({
                                to: "/class/$classId/$tab",
                                params: { classId: String(b.classId), tab: "ket-qua" },
                              }),
                          }
                        : {})}
                    />
                  </td>

                  <td className="px-[11px] py-[10px]">
                    <O
                      trangThai={!b.past ? "chua-dien-ra" : b.attendance ? "xong" : "trong"}
                      {...(b.past
                        ? {
                            onBam: () =>
                              void navigate({
                                to: "/class/$classId/$tab",
                                params: { classId: String(b.classId), tab: "hoc-sinh" },
                              }),
                          }
                        : {})}
                    />
                  </td>
                  <td className="px-[11px] py-[10px]">
                    <O
                      trangThai={!b.past ? "chua-dien-ra" : b.homework ? "xong" : "trong"}
                      {...(b.past
                        ? {
                            onBam: () =>
                              void navigate({
                                to: "/class/$classId/$tab",
                                params: { classId: String(b.classId), tab: "bai-tap" },
                              }),
                          }
                        : {})}
                    />
                  </td>

                  <td className="px-[11px] py-[10px]">
                    {b.past && (b.report !== "approved" || !b.attendance || !b.homework) ? (
                      <button
                        type="button"
                        onClick={() => {
                          const con: string[] = [];
                          if (b.report !== "approved") con.push("phiếu nhận xét");
                          if (!b.attendance) con.push("điểm danh");
                          if (!b.homework) con.push("giao bài về nhà");
                          ask({
                            title: `Nhắc buổi ${b.no} lớp ${b.maLop}?`,
                            body: (
                              <>
                                <p style={{ marginBottom: 8 }}>
                                  Nhắc {b.teacher}
                                  {b.ta ? ` và TA ${b.ta}` : ""} hoàn thành {con.length} việc còn
                                  thiếu của buổi {b.no} ({nhan}):
                                </p>
                                <ul style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                  {con.map((c) => (
                                    <li key={c} style={{ fontSize: 12.5 }}>
                                      {c}
                                    </li>
                                  ))}
                                </ul>
                              </>
                            ),
                            confirmLabel: "Gửi lời nhắc",
                            doneText: `Đã nhắc ${b.teacher} về buổi ${b.no} lớp ${b.maLop}.`,
                            run: () => setDauX((n) => n + 1),
                          });
                        }}
                        className="rounded-[6px] px-[10px] py-[5px] text-[12px] font-medium"
                        style={{ border: `1px solid ${LINE}`, color: INK, background: "#fff" }}
                      >
                        Nhắc
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/** Một ô trạng thái — nói RÕ đang thiếu gì, không dùng dấu tích trần.
 *  "trống" khác "chưa diễn ra": buổi chưa tới thì thiếu là bình thường. */
function O({
  trangThai,
  nhanCho = "chờ tôi",
  onBam,
}: {
  trangThai: "xong" | "cho-toi" | "gv-dang-soan" | "trong" | "chua-dien-ra";
  nhanCho?: string;
  onBam?: () => void;
}) {
  const M = {
    xong: { t: "xong", fg: OK, bg: "#e6f5ec", icon: true },
    "cho-toi": { t: nhanCho, fg: WARN, bg: "#fdf3e7", icon: false },
    "gv-dang-soan": { t: "GV đang soạn", fg: INK2, bg: "#f0f2f6", icon: false },
    trong: { t: "chưa có", fg: DANGER, bg: "#fdecea", icon: false },
    "chua-dien-ra": { t: "chưa diễn ra", fg: INK3, bg: "transparent", icon: false },
  } as const;
  const m = M[trangThai];

  const noi = (
    <span
      className="inline-flex items-center gap-[5px] rounded-[6px] px-[8px] py-[3px] text-[12px] font-medium"
      style={{ background: m.bg, color: m.fg }}
    >
      {m.icon && <IconCheck size={12} />}
      {m.t}
    </span>
  );

  /* Ô bấm được phải NHÌN RA là bấm được — gạch chân khi rê chuột chưa đủ,
     QC không rê từng ô để dò. Thêm mũi tên nhỏ. */
  return onBam ? (
    <button
      type="button"
      onClick={onBam}
      className="inline-flex items-center gap-[3px] hover:underline"
      title="Mở màn xử lý"
    >
      {noi}
      <span style={{ color: INK3, fontSize: 11 }}>›</span>
    </button>
  ) : (
    noi
  );
}
