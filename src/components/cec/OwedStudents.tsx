import { useMemo, useState } from "react";
import { TODAY, TH_BG, TH_FG, TH_LINE, NAVY, LINE, INK, INK2, INK3, OK, WARN, DANGER } from "@/data/const";
import { useNavigate } from "@tanstack/react-router";
import { CLASSES } from "@/data/classes";
import { STUDENTS, type Student } from "@/data/students";
import { PROFILES } from "@/data/studentProfile";
import { ME } from "@/data/me";
import { IconBell, IconCheck, IconClipboard, IconSearch } from "./icons";
import { useAction } from "./ActionDialog";


import { matchCode, matchWords, noAccent } from "@/lib/search";

type Row = {
  st: Student;
  classId: number;
  classCode: string;
  /** trạng thái lớp — lớp đã kết thúc/huỷ thì không được nhắc nợ bài */
  classStatus: string;
  owed: number;
  /** bài em mở rồi bỏ giữa chừng — khác hẳn chưa mở */
  unfinished: number;
  /** số ngày kể từ lần cuối em đụng bài */
  gap: number | null;
};

const dnum = (d: string) => d.split("/").reverse().join("");

/**
 * Màn "Học sinh nợ bài" — thay cho "Bài tập theo học sinh" của PROD.
 *
 * PROD liệt kê toàn bộ 48.051 học sinh, 963 trang, phần lớn là số 0 —
 * QC phải lật hết mới tìm ra em nợ bài. Ở đây lật ngược lại: mặc định
 * CHỈ hiện em đang nợ, muốn xem đủ thì bấm "Xem tất cả".
 */
export function OwedStudents() {
  const navigate = useNavigate();
  const { ask } = useAction();
  const [mineOnly, setMineOnly] = useState(true);
  const [owedOnly, setOwedOnly] = useState(true);
  /* Lớp đã kết thúc / đã huỷ mặc định KHÔNG hiện: nhắn tin đòi bài phụ huynh
     của lớp con đã học xong là chuyện không được phép xảy ra. */
  const [keCaDongLop, setKeCaDongLop] = useState(false);
  const [q, setQ] = useState("");

  const rows = useMemo<Row[]>(() => {
    const out: Row[] = [];
    for (const cls of CLASSES) {
      for (const st of STUDENTS[cls.id] ?? []) {
        if (st.state !== "Đang học") continue;
        const p = PROFILES[st.id];
        const days = [
          ...(p?.history.flatMap((h) => h.attempts.map((a) => a.at)) ?? []),
          ...(p?.inProgress.map((x) => x.openedAt) ?? []),
        ];
        let gap: number | null = null;
        if (days.length) {
          const newest = days.sort((a, b) => (dnum(a) > dnum(b) ? -1 : 1))[0]!;
          const [d, m, y] = newest.split("/").map(Number);
          gap = Math.max(0, Math.round((TODAY.getTime() - new Date(y!, m! - 1, d!).getTime()) / 86400000));
        }
        out.push({
          st,
          classId: cls.id,
          classCode: cls.code,
          classStatus: cls.status,
          owed: st.assigned - st.submitted,
          unfinished: p?.inProgress.length ?? 0,
          gap,
        });
      }
    }
    /* nợ nhiều nhất lên đầu — QC xử lý từ trên xuống là hết việc */
    return out.sort((a, b) => b.owed - a.owed || (b.gap ?? 0) - (a.gap ?? 0));
  }, []);

  const mineRows = mineOnly
    ? rows.filter((r) => CLASSES.find((c) => c.id === r.classId)?.qc === ME.name)
    : rows;

  const dangChay = (r: Row) => r.classStatus === "Đang diễn ra";

  const list = useMemo(() => {
    return mineRows
      .filter((r) => keCaDongLop || dangChay(r))
      .filter((r) => (owedOnly ? r.owed > 0 : true))
      .filter(
        (r) =>
          !q.trim() ||
          matchWords(r.st.name, q) ||
          matchCode(r.st.code, q) ||
          matchCode(r.classCode, q),
      );
  }, [mineRows, owedOnly, q, keCaDongLop]);

  const dungDem = mineRows.filter((r) => keCaDongLop || dangChay(r));
  const tongNo = dungDem.filter((r) => r.owed > 0).length;
  const tongBai = dungDem.reduce((a, r) => a + Math.max(0, r.owed), 0);
  const soDongLop = mineRows.filter((r) => !dangChay(r) && r.owed > 0).length;

  return (
    <div className="mt-4 flex flex-col gap-[12px]">
      {/* thanh việc — nói ngay còn bao nhiêu việc, không bắt đọc bảng */}
      <div
        className="flex flex-wrap items-center gap-x-[14px] gap-y-[8px] rounded-[8px] px-[14px] py-[11px] text-[13px]"
        style={{ background: tongNo ? "#fdf8ef" : "#f1f8f3", border: `1px solid ${tongNo ? "#f0dfc0" : "#cfe3d6"}` }}
      >
        {tongNo ? (
          <span style={{ color: "#7a5410" }}>
            <strong>{tongNo} em</strong> đang nợ tổng <strong>{tongBai} bài</strong>
            {mineOnly ? " trong các lớp của bạn" : " trên toàn hệ thống"}.
          </span>
        ) : (
          <span className="flex items-center gap-[7px]" style={{ color: OK }}>
            <IconCheck size={15} /> Không em nào đang nợ bài.
          </span>
        )}
      </div>

      {/* bộ lọc */}
      <div className="flex flex-wrap items-center gap-[9px] text-[12.5px]">
        <span
          className="flex items-center gap-[7px] rounded-[6px] bg-white px-[10px] py-[7px]"
          style={{ border: `1px solid #d9dde5`, minWidth: 260 }}
        >
          <IconSearch size={14} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tìm tên, mã học sinh hoặc mã lớp"
            className="w-full text-[12.5px] outline-none"
          />
        </span>

        <button
          type="button"
          onClick={() => setMineOnly((v) => !v)}
          className={`cec-btn ${mineOnly ? "cec-btn-primary" : "cec-btn-secondary"}`}
        >
          Lớp của tôi
        </button>

        <button
          type="button"
          onClick={() => setOwedOnly((v) => !v)}
          className="rounded-[6px] px-[11px] py-[7px]"
          style={{
            border: `1px solid ${owedOnly ? WARN : LINE}`,
            background: owedOnly ? "#fdf3e7" : "#fff",
            color: owedOnly ? WARN : INK,
            fontWeight: owedOnly ? 600 : 400,
          }}
        >
          {owedOnly ? "Chỉ em đang nợ bài" : "Đang xem tất cả học sinh"}
        </button>

        {soDongLop > 0 && (
          <button
            type="button"
            onClick={() => setKeCaDongLop((v) => !v)}
            className="rounded-[6px] px-[11px] py-[7px]"
            style={{
              border: `1px solid ${keCaDongLop ? DANGER : LINE}`,
              background: keCaDongLop ? "#fdecea" : "#fff",
              color: keCaDongLop ? DANGER : INK,
              fontWeight: keCaDongLop ? 600 : 400,
            }}
          >
            {keCaDongLop
              ? `Đang hiện cả ${soDongLop} em ở lớp đã đóng`
              : `Ẩn ${soDongLop} em ở lớp đã kết thúc / huỷ`}
          </button>
        )}

        <span className="flex-1" />
        <span style={{ color: INK3 }}>
          Hiển thị {list.length}/{dungDem.length} em
        </span>
      </div>

      {list.length === 0 ? (
        <p
          className="rounded-[8px] bg-white py-[40px] text-center text-[13px]"
          style={{ border: `1px solid ${LINE}`, color: INK3 }}
        >
          Không có em nào khớp bộ lọc.
        </p>
      ) : (
        <div className="cec-scroll overflow-x-auto rounded-[8px] bg-white" style={{ border: `1px solid ${LINE}` }}>
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr style={{ background: TH_BG, color: TH_FG, borderBottom: `1px solid ${TH_LINE}` }}>
                {["Học sinh", "Lớp", "Nợ bài", "Bỏ dở", "Lần cuối làm bài", "Điểm TB", ""].map((h) => (
                  <th key={h} className="whitespace-nowrap px-[12px] py-[10px] text-left text-[12.5px] font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map((r, i) => (
                <tr
                  key={r.st.id}
                  style={{
                    background: i % 2 ? "#f5f8fc" : "#fff",
                    borderLeft: `3px solid ${r.owed >= 3 ? DANGER : r.owed > 0 ? WARN : "transparent"}`,
                    borderBottom: "1px solid #edeff4",
                  }}
                >
                  <td className="whitespace-nowrap px-[12px] py-[9px]">
                    <button
                      type="button"
                      onClick={() =>
                        navigate({
                          to: "/class/$classId/$tab",
                          params: { classId: String(r.classId), tab: "hoc-sinh" },
                        })
                      }
                      className="font-medium hover:underline"
                      style={{ color: NAVY }}
                    >
                      {r.st.name}
                    </button>
                    <span className="ml-[7px] text-[11.5px] tabular-nums" style={{ color: INK3 }}>
                      {r.st.code}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-[12px]" style={{ color: INK2 }}>
                    {r.classCode}
                    {!dangChay(r) && (
                      <span
                        className="ml-[7px] rounded-[4px] px-[6px] py-[1px] text-[11px]"
                        style={{ background: "#fdecea", color: DANGER }}
                      >
                        {r.classStatus}
                      </span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-[12px] tabular-nums">
                    {r.owed > 0 ? (
                      <span style={{ color: r.owed >= 3 ? DANGER : WARN, fontWeight: 600 }}>
                        nợ {r.owed}/{r.st.assigned} bài
                      </span>
                    ) : (
                      <span style={{ color: OK }}>nộp đủ</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-[12px]" style={{ color: r.unfinished ? WARN : INK3 }}>
                    {r.unfinished ? `${r.unfinished} bài` : ""}
                  </td>
                  <td className="whitespace-nowrap px-[12px]" style={{ color: r.gap !== null && r.gap >= 14 ? DANGER : INK2 }}>
                    {r.gap === null ? "chưa làm bài nào" : r.gap === 0 ? "hôm nay" : `${r.gap} ngày trước`}
                  </td>
                  <td
                    className="whitespace-nowrap px-[12px] font-semibold tabular-nums"
                    style={{ color: r.st.avg === null ? INK3 : r.st.avg < 5 ? DANGER : r.st.avg >= 7 ? OK : WARN }}
                  >
                    {r.st.avg ?? "—"}
                  </td>
                  <td className="whitespace-nowrap px-[12px] py-[7px]">
                    <span className="flex gap-[7px]">
                      <button
                        type="button"
                        onClick={() =>
                          ask({
                            title: `Nhắc ${r.st.name} nộp bài`,
                            body: (
                              <>
                                Gửi lời nhắc tới em <strong>{r.st.name}</strong> ({r.st.code}) lớp{" "}
                                <strong>{r.classCode}</strong> — hiện còn <strong>{r.owed} bài</strong> chưa nộp.
                                {!dangChay(r) && (
                                  <span className="mt-2 block" style={{ color: DANGER }}>
                                    Lưu ý: lớp này <strong>{r.classStatus.toLowerCase()}</strong>. Nhắc nợ bài
                                    lúc này có thể làm phụ huynh khó hiểu — cân nhắc trước khi gửi.
                                  </span>
                                )}
                              </>
                            ),
                            confirmLabel: "Gửi lời nhắc",
                            doneText: `Đã gửi lời nhắc tới ${r.st.name}.`,
                          })
                        }
                        className="flex items-center gap-[5px] rounded-[6px] px-[9px] py-[5px] text-[12px]"
                        style={{ border: `1px solid ${LINE}`, color: INK }}
                      >
                        <IconBell size={13} /> Nhắc
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          navigate({
                            to: "/class/$classId/$tab",
                            params: { classId: String(r.classId), tab: "bai-tap" },
                            search: { giaoHs: r.st.id },
                          })
                        }
                        title={`Giao bài cho lớp ${r.classCode}`}
                        className="flex items-center gap-[5px] rounded-[6px] px-[9px] py-[5px] text-[12px]"
                        style={{ border: `1px solid ${LINE}`, color: NAVY }}
                      >
                        <IconClipboard size={13} /> Giao bài
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-[12px]" style={{ color: INK3 }}>
        Màn này là nơi tra cứu em nào đang nợ. Đường chính để giao bài là từ đề —
        nút “Giao bài” ở đây chỉ là lối tắt khi bạn đang nhìn thấy em cần giao.
      </p>
    </div>
  );
}
