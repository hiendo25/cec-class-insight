import fs from 'fs';

/* Tôi tự gây ra ở đợt trước: khi sinh lại MONTHLY, vòng lặp quên lọc theo
   studentId nên `rr` là phiếu của CẢ LỚP chứ không phải của em đó — rồi lại
   ghi đè hwTotal/hwDone/avgHw bằng kết quả sai.
   Hậu quả: 693/693 báo cáo tháng mất sạch điểm (avgHw = null, hwTotal = 0).
   Đây là tờ gửi phụ huynh. Sinh lại cho đúng. */

const grabAt = (t, m) => {
  const i = t.indexOf('{', t.indexOf(m));
  let d = 0;
  for (let k = i; k < t.length; k++) {
    if (t[k] === '{') d++;
    else if (t[k] === '}') { d--; if (!d) return { obj: JSON.parse(t.slice(i, k + 1)), from: i, to: k + 1 }; }
  }
  throw new Error('khong cat duoc ' + m);
};

const txt = fs.readFileSync('src/data/reports.ts', 'utf8');
const R = grabAt(txt, 'REPORTS: Record');
const M = grabAt(txt, 'MONTHLY: Record');
const REPORTS = R.obj;
const MONTHLY = M.obj;

let sua = 0;
for (const [sid, ms] of Object.entries(MONTHLY)) {
  for (const m of ms) {
    /* LỌC ĐỦ BA ĐIỀU KIỆN: đúng em, đúng tháng, đã duyệt */
    const rr = (REPORTS[m.classId] ?? []).filter(
      (r) => r.studentId === sid
        && r.date.split('/').slice(1).join('/') === m.month
        && r.status === 'approved',
    );
    const hw = rr.filter((r) => r.hwStatus);
    const dd = rr.map((r) => r.hwScore).filter((x) => x !== null);
    const avg = dd.length ? +(dd.reduce((a, b) => a + b, 0) / dd.length).toFixed(1) : null;

    if (m.avgHw !== avg || m.hwTotal !== hw.length) sua++;
    m.avgHw = avg;
    m.hwTotal = hw.length;
    m.hwDone = hw.filter((r) => r.hwStatus !== 'missing').length;
    m.hwLate = hw.filter((r) => r.hwStatus === 'late').length;

    /* các số điểm danh cũng phải khớp chính tập phiếu này */
    const comat = rr.filter((r) => r.attendance === 'present' || r.attendance === 'late');
    m.reportCount = rr.length;
    m.present = comat.length;
    m.late = rr.filter((r) => r.attendance === 'late').length;
    m.absent = rr.filter((r) => r.attendance === 'absent').length;
    m.excused = rr.filter((r) => r.attendance === 'excused').length;
    m.attendRate = rr.length ? Math.round((comat.length / rr.length) * 100) : 0;
  }
}

fs.writeFileSync('src/data/reports.ts',
  txt.slice(0, M.from) + JSON.stringify(MONTHLY) + txt.slice(M.to));
console.log('sua', sua, 'bao cao thang');

/* đối chứng */
const all = Object.values(MONTHLY).flat();
console.log('avgHw null:', all.filter((m) => m.avgHw === null).length, '/', all.length);
console.log('hwTotal = 0:', all.filter((m) => m.hwTotal === 0).length, '/', all.length);

let lech = 0;
for (const [sid, ms] of Object.entries(MONTHLY)) {
  for (const m of ms) {
    const rr = (REPORTS[m.classId] ?? []).filter(
      (r) => r.studentId === sid
        && r.date.split('/').slice(1).join('/') === m.month
        && r.status === 'approved',
    );
    const dd = rr.map((r) => r.hwScore).filter((x) => x !== null);
    const want = dd.length ? +(dd.reduce((a, b) => a + b, 0) / dd.length).toFixed(1) : null;
    if (want !== m.avgHw || rr.length !== m.reportCount) lech++;
  }
}
console.log('doi chung doc lap: lech', lech, '/', all.length);

const vd = all.find((m) => m.avgHw !== null);
console.log('vi du:', vd.month, '| avgHw', vd.avgHw, '| bai', `${vd.hwDone}/${vd.hwTotal}`,
  '| diem danh', `${vd.present}/${vd.reportCount}`, `${vd.attendRate}%`);
