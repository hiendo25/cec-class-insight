# -*- coding: utf-8 -*-
"""Trich cau hoi THAT tu kho A1 CEC -> ngan hang cau cho app.

Man De bai truoc day: 4 phan deu ghi "Lam theo yeu cau cua de" — QC mo ra khong
doc duoc cau nao, khong thay dap an. Goc khong phai loi hien thi ma la KHONG CO
TANG DU LIEU CAU HOI: `parts` chi co `soCau` la con so.

Nguon: _ee/_a1fin.json — 442 de A1 that cua CEC, co du noi dung cau, dap an,
loi giai tieng Viet. Khong bia.
"""
import json, io, re, random

SRC = r'D:\hiendo25\Exam English\_ee\_a1fin.json'
OUT = r'D:\hiendo25\cec-class-insight\src\data\questions.ts'

def txt(n):
    if not isinstance(n, dict): return ''
    if n.get('type') == 'text': return n.get('text', '')
    if n.get('type') == 'hardBreak': return '\n'
    return ''.join(txt(c) for c in (n.get('content') or []))

def gon(s):
    return re.sub(r'[ \t]+', ' ', (s or '')).strip()

d = json.load(io.open(SRC, encoding='utf-8'))

# gom theo dang, moi dang giu toi da 60 cau sach
kho = {}
for e in d:
    for s in (e.get('sections') or []):
        for p in (s.get('parts') or []):
            dang = p.get('part_type')
            if not dang: continue
            hd = gon(txt(p.get('content_tiptap')))
            for q in (p.get('questions') or []):
                noi = gon(txt(q.get('content_tiptap')))
                giai = gon(txt(q.get('explanation_tiptap')))
                # bo cau rong hoac qua ngan (khong doc duoc gi)
                if len(noi) < 8: continue
                ca = q.get('correct_answer')
                # rut dap an ra dang doc duoc cho QC
                dap = ''
                if isinstance(ca, list) and ca:
                    v = []
                    for it in ca:
                        if isinstance(it, dict) and it.get('values'):
                            v.append(str(it['values'][0]))
                    dap = ' · '.join(v)
                elif isinstance(ca, str):
                    dap = ca
                if not dap and not giai: continue
                kho.setdefault(dang, []).append({
                    'noi': noi[:220],
                    'dap': dap[:120],
                    'giai': giai[:300],
                    'huongDan': hd[:160],
                    'choices': [gon(txt(c)) if isinstance(c, dict) else str(c)
                                for c in (q.get('choices') or [])][:6],
                })

random.seed(20260822)  # co dinh — chay lai ra y het, khong doi moi lan build
ra = {}
for k, v in kho.items():
    # loai trung theo noi dung
    seen, sach = set(), []
    for q in v:
        if q['noi'] in seen: continue
        seen.add(q['noi']); sach.append(q)
    random.shuffle(sach)
    ra[k] = sach[:60]

print('trich duoc:', {k: len(v) for k, v in sorted(ra.items())})

head = '''/**
 * Ngân hàng câu hỏi — TRÍCH TỪ KHO A1 THẬT CỦA CEC, không bịa.
 *
 * Nguồn: `Exam English/_ee/_a1fin.json` — 442 đề A1 thật, có đủ nội dung câu,
 * đáp án và lời giải tiếng Việt do giáo viên CEC viết.
 *
 * Vì sao cần file này: trước đây `ExamPart` chỉ có `soCau` là con số, không có
 * câu hỏi nào. Nên màn Đề bài hiện 4 phần đều ghi "Làm theo yêu cầu của đề" —
 * QC mở ra không đọc được câu nào, không thấy đáp án, không kiểm được gì.
 * Đó là màn Hiền bắt 22/08.
 *
 * Sinh bằng `_trichcau.py`, seed cố định 20260822 nên chạy lại ra y hệt.
 */

export type CauHoi = {
  /** nội dung câu, chỗ trống để trống như đề gốc */
  noi: string;
  /** đáp án đúng — QC cần thấy để kiểm, học sinh không thấy */
  dap: string;
  /** lời giải tiếng Việt của giáo viên */
  giai: string;
  /** hướng dẫn của phần chứa câu này */
  huongDan: string;
  choices: string[];
};

export const KHO_CAU: Record<string, CauHoi[]> = '''

io.open(OUT, 'w', encoding='utf-8').write(
    head + json.dumps(ra, ensure_ascii=False, indent=1) + ';\n')
print('ghi', OUT)
