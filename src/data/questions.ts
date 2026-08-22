/**
 * Ngân hàng câu hỏi — TRÍCH TỪ KHO THẬT CỦA CEC, không bịa.
 *
 * Nguồn: `Exam English/_ee/_a1fin.json` (442 đề A1) và `_qldump.json`
 * (3.693 đề kho ôn luyện tak12). Có đủ nội dung câu, đáp án và lời giải tiếng
 * Việt do giáo viên CEC viết.
 *
 * Vì sao cần file này: trước đây `ExamPart` chỉ có `soCau` là con số, không có
 * câu hỏi nào. Nên màn Đề bài hiện 4 phần đều ghi "Làm theo yêu cầu của đề" —
 * QC mở ra không đọc được câu nào, không thấy đáp án, không kiểm được gì.
 * Đó là màn Hiền bắt 22/08.
 *
 * Hai lỗi đã mắc khi trích, ghi lại để khỏi lặp:
 *  1. `word_bank` và `speaking` lưu ở trường `answer_type` chứ KHÔNG phải
 *     `part_type` — tìm theo `part_type` ra 0 và tưởng kho không có.
 *  2. Trần 300 ký tự cắt cụt 301/485 lời giải giữa câu. Lời giải là thứ QC cần
 *     nhất để kiểm đề nên nới lên 1.200; giờ chỉ còn 8 câu chạm trần.
 *
 * `speaking` chỉ có 1 câu trong cả 3.693 đề — kho thật vốn rất ít bài nói, và
 * bài nói KHÔNG có đáp án là bình thường (không phải lỗi). Giữ đúng 1, không
 * bịa thêm cho đủ số.
 *
 * Seed cố định 20260822 nên chạy lại ra y hệt.
 */

export type CauHoi = {
  /** nội dung câu, chỗ trống để trống như đề gốc */
  noi: string;
  /** đáp án đúng — QC cần thấy để kiểm, học sinh không thấy. Rỗng với bài nói. */
  dap: string;
  /** lời giải tiếng Việt của giáo viên */
  giai: string;
  /** hướng dẫn của phần chứa câu này */
  huongDan: string;
  choices: string[];
};

export const KHO_CAU: Record<string, CauHoi[]> = {
 "fill_blank": [
  {
   "noi": "Beth takes photos of wild animals.\nPhủ định: Beth photos of wild animals.\nCâu hỏi: Beth photos of wild animals?\nNo, .",
   "dap": "doesn’t take · Does · take · she doesn’t",
   "giai": "✅ Đáp án đúng: doesn’t take - Does - take - she doesn’t - Beth doesn’t take photos of wild animals. / Does Beth take photos of wild animals? - No, she doesn’t . = Beth không chụp ảnh động vật hoang dã. / Beth có chụp ảnh động vật hoang dã không? - Không.📘 Ngữ cảnh: Chủ ngữ Beth là tên riêng của một người nữ → số ít.🏗️ Cấu trúc: \nPhủ định: S + don’t / doesn’t + V (nguyên thể)\nNghi vấn: Do / Does + S + V (nguyên thể) ?\nSoi vào câu này: Beth + doesn’t + take\nBảng chọn trợ động từ:\nI - you - we - they, số nhiều → do / don’t\nhe - she - it, số ít → does / doesn’t\nChủ ngữ Beth ở số ít nên dùng doesn’t.\nSau do / does / don’t / doesn’t, động từ giữ NGUYÊN THỂ - phần -s đã nằm ở does.\nTrả lời ngắn: Yes, + S + do / does. / No, + S + don’t / doesn’t.🔍 Giải thích chi tiết: Ô 1 doesn’t take, ô 2 Does, ô 3 take, ô 4 she doesn’t - Beth là người nữ nên đại từ là she. Cả ba ô đầu đều cho thấy quy tắc: có does/doesn’t thì động từ không chia.",
   "huongDan": "Change the following affirmative sentences into negative sentences and questions.",
   "choices": []
  },
  {
   "noi": "Cats like chasing (mouse).",
   "dap": "mice",
   "giai": "✅ Đáp án đúng: mice\nCâu hoàn chỉnh: Cats like chasing mice (mouse).📘 Ngữ cảnh:\nBài yêu cầu: Complete the sentences using the correct form of the nouns in brackets.\nCâu cần hoàn thành: Cats like chasing ___ (mouse).\nTừ trong ngoặc là \"mouse\", phải chia về đúng dạng.🏗️ Cấu trúc: Cách tạo danh từ số nhiều:\nthường → thêm -s (book → books)\ntận cùng -s, -x, -z, -ch, -sh, -o → thêm -es (bus → buses, fox → foxes, watch → watches)\nphụ âm + y → đổi y thành -ies (baby → babies, city → cities)\nnguyên âm + y → giữ y, thêm -s (boy → boys, key → keys)\ntận cùng -f / -fe → đổi thành -ves (leaf → leaves, knife → knives)\nBẤT QUY TẮC: child → children, man → men, woman → women, foot → feet, tooth → teeth, mouse → mice, person → people\nKHÔNG ĐỔI: sheep, fish, deer.\nSoi vào câu này: mouse → mice (bất quy tắc)🔍 Giải thích chi tiết:\nĐiền mice. mouse → mice là dạng số nhiều BẤT QUY TẮC, phải học thuộc chứ không theo quy tắc thêm đuôi nào. \nLỗi hay gặp: thêm -s cho mọi từ. Phải nhìn CHỮ CÁI CUỐI của danh từ mới biết thêm -s, thêm -es hay đổi đuôi.",
   "huongDan": "Complete the sentences using the correct form of the nouns in brackets.",
   "choices": []
  },
  {
   "noi": "I’m sorry. I help you.\nThat’s OK. I can do it myself.",
   "dap": "can’t",
   "giai": "✅ Đáp án đúng: can’t = Xin lỗi, tôi không giúp bạn được. - Không sao. Tôi tự làm được.📘 Ngữ cảnh: Câu bắt đầu bằng I’m sorry (xin lỗi) - người nói đang từ chối, tức là không giúp được.🏗️ Cấu trúc: \nS + can / can’t + V (nguyên thể)\nSoi vào câu này: I + can’t + help you\ncan = làm được | can’t = không làm được\nSau can / can’t, động từ giữ nguyên: không thêm -s, không thêm -ing.\ncan không đổi theo chủ ngữ - không có cans, không có doesn’t can.\nCâu hỏi: Can + S + V? → Trả lời: Yes, ... can. / No, ... can’t.🔍 Giải thích chi tiết: Điền can’t vì I’m sorry báo hiệu lời từ chối. Câu đáp That’s OK. I can do it myself (không sao, tôi tự làm được) cũng xác nhận điều đó. Chú ý trong câu đáp có chữ can dùng đúng - so sánh hai chỗ để thấy rõ nghĩa đối lập của can và can’t.",
   "huongDan": "Complete the conversations with can or can’t.",
   "choices": []
  },
  {
   "noi": "I / you / we / they: wake up\nshe / he / it:",
   "dap": "wakes up",
   "giai": "✅ Đáp án đúng: wakes up - she / he / it wakes up = thức dậy📘 Ngữ cảnh: Đề cho động từ wake up (thức dậy) ở dạng dùng với I / you / we / they. Việc cần làm là đổi sang dạng dùng với she / he / it - tức chủ ngữ số ít ngôi thứ ba.🏗️ Cấu trúc: \nS + V (-s / -es) + O (thì hiện tại đơn)\nSoi vào câu này: she / he / it + wakes up + ...\nBảng chia động từ:\nI - you - we - they, danh từ số nhiều → V nguyên thể (they play)\nhe - she - it, danh từ số ít → V + -s / -es (he plays)\nChủ ngữ she / he / it ở số ít ngôi thứ ba nên dùng wakes up.\nCách thêm đuôi: thường +s; tận cùng s, x, ch, sh, o → +es (watch → watches);\ntận cùng -y sau phụ âm → đổi thành -ies (study → studies), sau nguyên âm thì giữ y (play → plays).🔍 Giải thích chi tiết: Đổi wake up → wakes up: thêm thẳng -s vào động từ chính wake; tiểu từ up giữ nguyên ở cuối. Nhớ quy tắc chung: chỉ chủ ngữ he / she / it và danh từ số ít mới thêm đuôi; các chủ ngữ còn lại giữ nguyên thể. Viết wake upes là thừa - chỉ nhóm tận cùng s, x, ch, sh, o mới thêm -es.",
   "huongDan": "Write the correct verb form for she / he / it.",
   "choices": []
  },
  {
   "noi": "It a cat.",
   "dap": "",
   "giai": "✅ Đáp án đúng: is📘 Ngữ cảnh: Chọn dạng đúng của to be cho chủ ngữ It.🏗️ Cấu trúc:he / she / it và danh từ số ít đi với is.🔍 Giải thích chi tiết: It là một con vật số ít nên dùng is. Vì vậy câu đúng là: It is …",
   "huongDan": "Fill in the blanks with am, is or are.",
   "choices": []
  },
  {
   "noi": "Fatimah .",
   "dap": "can’t ride a horse",
   "giai": "✅ Đáp án đúng: can’t ride a horse - Fatimah can’t ride a horse. = Fatimah không cưỡi ngựa được.📘 Ngữ cảnh: Nhìn tranh xem Fatimah có đang cưỡi ngựa được hay không. Trong tranh, bạn ấy KHÔNG làm được việc ride a horse, nên câu phải dùng can’t.🏗️ Cấu trúc: \nS + can / can’t + V (nguyên thể)\nSoi vào câu này: Fatimah + can’t + ride a horse\ncan = làm được | can’t = không làm được\nSau can / can’t, động từ giữ nguyên: không thêm -s, không thêm -ing.\ncan không đổi theo chủ ngữ - không có cans, không có doesn’t can.\nCâu hỏi: Can + S + V? → Trả lời: Yes, ... can. / No, ... can’t.\n Ví dụ: She can ride a bike. - She can’t ride a bike.🔍 Giải thích chi tiết: Điền can’t ride a horse: động từ ride giữ nguyên thể dù chủ ngữ Fatimah là một người (số ít) - can/can’t không bao giờ thêm -s. Viết Fatimah doesn’t can ride a horse đều sai. Vì tranh cho thấy bạn ấy không làm được nên dùng can’t; bài này có cả câu can lẫn can’t nên phải nhìn kỹ từng nhân vật trong tranh.",
   "huongDan": "Look at the picture and write sentences using can or can’t.",
   "choices": []
  },
  {
   "noi": "Jun get up early?\nYes, .",
   "dap": "Does · he does",
   "giai": "✅ Đáp án đúng: Does - he does - Does Jun get up early? Yes, he does . = Jun có dậy sớm không? - Có.📘 Ngữ cảnh: Chủ ngữ Jun là tên riêng của một người → số ít. Câu trả lời bắt đầu bằng Yes.🏗️ Cấu trúc: \nPhủ định: S + don’t / doesn’t + V (nguyên thể)\nNghi vấn: Do / Does + S + V (nguyên thể) ?\nSoi vào câu này: Jun + Does + get up\nBảng chọn trợ động từ:\nI - you - we - they, số nhiều → do / don’t\nhe - she - it, số ít → does / doesn’t\nChủ ngữ Jun ở số ít nên dùng Does.\nSau do / does / don’t / doesn’t, động từ giữ NGUYÊN THỂ - phần -s đã nằm ở does.\nTrả lời ngắn: Yes, + S + do / does. / No, + S + don’t / doesn’t.🔍 Giải thích chi tiết: Ô 1 điền Does. Ô 2 điền he does - phải đổi tên riêng Jun thành đại từ he. Chú ý động từ get up trong câu hỏi giữ nguyên thể vì đã có Does.",
   "huongDan": "Read and write. Complete the question and the short answer.",
   "choices": []
  },
  {
   "noi": "shop at the supermarket\nI like / love / hate .",
   "dap": "shopping at the supermarket",
   "giai": "✅ Đáp án đúng: shopping at the supermarket - I like / love / hate shopping at the supermarket. = Tôi thích / rất thích / ghét đi siêu thị.📘 Ngữ cảnh: Gợi ý cho cụm shop at the supermarket ở dạng nguyên thể. Sau like / love / hate thì động từ phải chuyển sang dạng -ing, còn phần còn lại của cụm giữ nguyên.🏗️ Cấu trúc: \nS + like / love / hate + V-ing\nSoi vào câu này: I + like / love / hate + shopping + at the supermarket\nChủ ngữ he / she / it và danh từ số ít → động từ cảm xúc thêm -s (likes, loves, hates).\nPhủ định: S + don’t / doesn’t + like + V-ing (sau don’t/doesn’t thì không chia nữa).\nCâu hỏi: Do / Does + S + like + V-ing?\nCách thêm -ing: thường thêm thẳng (play → playing); bỏ -e (ride → riding); gấp đôi phụ âm (swim → swimming).\n Cùng nhóm gấp đôi phụ âm: swim → swimming, sit → sitting.🔍 Giải thích chi tiết: Đổi shop → shopping - gấp đôi phụ âm cuối p rồi thêm -ing - rồi giữ nguyên phần còn lại → shopping at the supermarket. Lưu ý: dù em chọn like, love hay hate thì phần sau vẫn không đổi, nên đáp án chấm là cụm shopping at the supermarket. Viết I like shop at the supermarket (để nguyên thể) hay I like to shop... đều không đúng yêu cầu của bài này.",
   "huongDan": "Write sentences about you for each hobby with like, love or hate. (Example: dance → I love dancing.)",
   "choices": []
  },
  {
   "noi": "I am 8 years old. James is ten years old.\nHe is older than .",
   "dap": "me",
   "giai": "✅ Đáp án đúng: me - I am 8 years old. James is ten years old. He is older than me. = Cậu ấy lớn tuổi hơn tôi.📘 Ngữ cảnh: Câu so tuổi hai người: người nói (I) 8 tuổi, James 10 tuổi → James nhiều tuổi hơn.\nCâu cuối He is older than … = \"Cậu ấy lớn hơn ai?\" → hơn chính người nói. Người nói là I, nhưng ở đây đứng sau than nên phải đổi dạng.🏗️ Cấu trúc: \nCâu tiếng Anh cơ bản luôn theo thứ tự:\nS + V + O\nS (chủ ngữ) = người LÀM hành động, đứng đầu câu\nV (động từ) = hành động\nO (tân ngữ) = người/vật NHẬN hành động, đứng SAU động từ\nSoi vào câu này: He + is older than + me\nChỗ trống ở vị trí O → phải dùng đại từ tân ngữ. Sau to, for, with, than cũng vậy.\nBảng đổi chủ ngữ → tân ngữ:\nS: I - you - he - she - it - we - they\nO: me - you - him - her - it - us - them🔍 Giải thích chi tiết: Sau than luôn là O. Tra bảng: I → me.\nSai: He is older than I.\nĐúng: He is older than me.\nMẹo: sau than / to / for / with luôn là me - him - her - us - them.",
   "huongDan": "Look at the pictures. Identify the person or thing, then complete the sentences with the correct object pronoun.",
   "choices": []
  },
  {
   "noi": "the new Iphone have better games?\nYes, it .",
   "dap": "Does · does",
   "giai": "✅ Đáp án đúng: Does / does📘 Ngữ cảnh: Câu hỏi chiếc iPhone mới có trò chơi hay hơn không, và câu trả lời là Yes.🏗️ Cấu trúc:Does + it + have …?Ví dụ: Does the new iPhone have better games?Trả lời: Yes, it does.🔍 Giải thích chi tiết: The new iPhone là một đồ vật, thuộc nhóm it, nên dùng Does. Câu trả lời bắt đầu bằng Yes nên dùng dạng khẳng định does. Vì vậy chỗ trống 1 điền Does, chỗ trống 2 điền does.",
   "huongDan": "Complete the sentences with do, does, don’t or doesn’t.",
   "choices": []
  },
  {
   "noi": "The fox in the forest.",
   "dap": "",
   "giai": "✅ Đáp án đúng: is📘 Ngữ cảnh: Chọn dạng đúng của to be cho chủ ngữ The fox.🏗️ Cấu trúc:he / she / it và danh từ số ít đi với is.🔍 Giải thích chi tiết: The fox là một con vật số ít nên dùng is. Vì vậy câu đúng là: The fox is …",
   "huongDan": "Underline the subject. Identify the correct verb tobe (is/ am/ are) and fill it in the blanks.",
   "choices": []
  },
  {
   "noi": "they tigers?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Are📘 Ngữ cảnh: Câu hỏi Có phải…không: \"Chúng có phải hổ không?\"🏗️ Cấu trúc:you / we / they đi với are - câu hỏi đảo thành Are…?🔍 Giải thích chi tiết: Chủ ngữ là they nên dùng are, và câu hỏi thì đưa Are lên đầu câu. Vì vậy câu đúng là: Are they tigers?",
   "huongDan": "Read and write Is, Am or Are.",
   "choices": []
  },
  {
   "noi": "She wants some (milks)",
   "dap": "milk",
   "giai": "✅ Đáp án đúng: milk📘 Ngữ cảnh: Nói về thứ cô ấy muốn: \"Cô ấy muốn một ít sữa.\"🏗️ Cấu trúc:some + danh từ KHÔNG ĐẾM ĐƯỢCsome milk (không thêm -s).🔍 Giải thích chi tiết: milk là danh từ không đếm được nên không bao giờ thêm -s, dù phía trước có some. Vì vậy câu đúng là: She wants some milk.",
   "huongDan": "Rewrite the sentences with the correct form of the word in bold.",
   "choices": []
  },
  {
   "noi": "are the clothes?\non the floor",
   "dap": "Where",
   "giai": "✅ Đáp án đúng: Where - Where are the clothes? → on the floor📘 Ngữ cảnh: Câu trả lời là on the floor - lại là nơi chốn, lần này của quần áo.🏗️ Cấu trúc: \nTừ để hỏi + do / does / be + S + V ... ?\nSoi vào câu này: Where + are + the clothes ?\nBảng từ để hỏi:\nWhat = cái gì | Who = ai | Where = ở đâu\nWhen = khi nào | Why = tại sao | How = thế nào\nWhich = cái nào (chọn trong số) | Whose = của ai\nChọn trợ động từ theo động từ chính:\nđộng từ be → đảo is / are lên ngay sau từ để hỏi (Where is your bag?)\nđộng từ thường → dùng do / does, động từ giữ nguyên thể (Where do you live?)🔍 Giải thích chi tiết: Điền Where. Đây là câu thứ hai trong bài dùng Where - cả hai đều có giới từ chỉ nơi chốn ở câu trả lời (in, on). Danh từ clothes luôn ở số nhiều nên đi với are.",
   "huongDan": "Look at the pictures. Write the question word, then write one-word answers.",
   "choices": []
  },
  {
   "noi": "S / L: \nManchester is big, but London is .",
   "dap": "S · bigger",
   "giai": "✅ Đáp án đúng: S - bigger - Manchester is big, but London is bigger . = Manchester thì lớn, nhưng London còn lớn hơn.📘 Ngữ cảnh: Câu so sánh hai vật bằng but: vế đầu nêu tính chất, vế sau nêu mức hơn. Tính từ cần biến đổi là big (tính từ NGẮN).🏗️ Cấu trúc: \nA + be + tính từ so sánh hơn + than + B\nSoi vào câu này: London + is + bigger + than + Manchester\nBảng biến đổi:\ntính từ NGẮN (1 âm tiết, hoặc 2 âm tiết đuôi -y) → thêm -er (tall → taller)\ntính từ DÀI (từ 2-3 âm tiết trở lên) → more + tính từ (more careful)\nbất quy tắc: good → better | bad → worse\nỞ đây big là tính từ NGẮN nên dùng bigger. Có than thì luôn là dạng hơn.\nTính từ ngắn (1 âm tiết, hoặc 2 âm tiết kết thúc bằng -y) thì thêm đuôi -er vào chính tính từ đó, tuỳ chữ cuối mà gấp đôi phụ âm hay đổi y → i. Cùng nhóm với big: small → smaller, thin → thinner.🔍 Giải thích chi tiết: big là tính từ ngắn (S) nên khoanh S, và dạng so sánh hơn là bigger - gấp đôi phụ âm cuối rồi thêm -er vì từ có 1 âm tiết kết thúc bằng nguyên âm + phụ âm (i-g). Viết more big là sai vì tính từ ngắn không dùng more. Nhớ: không bao giờ dùng cả hai cùng lúc (more taller là sai).",
   "huongDan": "Circle S (short adjective) or L (long adjective). Then complete the sentence with the correct comparative adjective.",
   "choices": []
  },
  {
   "noi": "Watch out! The owl !",
   "dap": "is hunting",
   "giai": "✅ Đáp án đúng: is hunting - Watch out! The owl is hunting!📘 Ngữ cảnh: Câu cảnh báo Watch out! cho biết hành động đang xảy ra. Chủ ngữ The owl là một con cú → số ít.🏗️ Cấu trúc: \nKhẳng định: S + am / is / are + V-ing + ...\nPhủ định: S + am / is / are + not + V-ing + ...\nNghi vấn: Am / Is / Are + S + V-ing ... ?\nSoi vào câu này: The owl + is + hunting + ...\nBảng chia be:\nI → am (phủ định ’m not)\nhe - she - it, danh từ số ít → is (phủ định isn’t)\nyou - we - they, danh từ số nhiều → are (phủ định aren’t)\nChủ ngữ The owl ở số ít nên dùng is.\nThiếu một trong hai phần là SAI: phải có đủ be và V-ing.\nDấu hiệu nhận biết: now, right now, at the moment, today, Look!, Listen!, Watch out!, Be quiet!\nTrả lời ngắn: Yes, + S + am / is / are. / No, + S + ’m not / isn’t / aren’t.\nÁp công thức vào câu này: Watch out! The owl + is + hunting🔍 Giải thích chi tiết: Điền is hunting. Chọn is theo The owl. hunt có hai phụ âm n, t ở cuối nên chỉ thêm -ing, không gấp đôi.",
   "huongDan": "Look at the picture. Write the correct verb form using present continuous.",
   "choices": []
  },
  {
   "noi": "Ann/ Dax\nAnn is Dax.",
   "dap": "more intelligent than",
   "giai": "✅ Đáp án đúng: more intelligent than - Ann is more intelligent than Dax. = Ann thông minh hơn Dax.📘 Ngữ cảnh: Gợi ý nêu hai cái tên → dạng hơn. Tính từ intelligent có 4 âm tiết - tính từ dài.🏗️ Cấu trúc: \nA + be + tính từ so sánh hơn + than + B\nSoi vào câu này: Ann + is + more intelligent + than + Dax\nBảng biến đổi:\ntính từ NGẮN (1 âm tiết, hoặc 2 âm tiết đuôi -y) → thêm -er (tall → taller)\ntính từ DÀI (từ 2-3 âm tiết trở lên) → more + tính từ (more careful)\nbất quy tắc: good → better | bad → worse\nỞ đây intelligent là tính từ DÀI nên dùng more intelligent. Có than thì luôn là dạng hơn.🔍 Giải thích chi tiết: Điền more intelligent than: dùng more vì tính từ dài, giữ nguyên tính từ, và có than. Viết intelligenter là sai vì tính từ dài không bao giờ thêm đuôi. Nhìn bảng thấy Ann thông minh hơn Dax. Đây là câu đầu tiên trong bài dùng tính từ dài - ba câu trước đó (strong) đều là tính từ ngắn thêm đuôi, nên phải đổi cách làm cho đúng nhóm.",
   "huongDan": "Look at the table and write sentences. Use the comparative or the superlative form of the adjectives.",
   "choices": []
  },
  {
   "noi": "There is orange picture on the wall.",
   "dap": "",
   "giai": "✅ Đáp án đúng: an\nCâu hoàn chỉnh: There is an orange picture on the wall.📘 Ngữ cảnh:\nBài yêu cầu: Fill in the blanks with a, an, some or any.\nCâu cần hoàn thành: There is ___ orange picture on the wall.\nChỗ trống cần một mạo từ đứng trước danh từ \"orange picture\" - đây là danh từ đếm được số ít.🏗️ Cấu trúc: some và any đều nghĩa là \"một ít / một vài\", khác nhau ở loại câu:\nsome → dùng trong câu KHẲNG ĐỊNH (There is some milk.)\nany → dùng trong câu PHỦ ĐỊNH và câu HỎI (There isn’t any milk. - Is there any milk?)\na / an → chỉ dùng với danh từ đếm được SỐ ÍT (a book, an apple)\nDanh từ số nhiều và danh từ không đếm được KHÔNG dùng a / an.\nSoi vào câu này: an + orange picture → There is orange picture on the wall.🔍 Giải thích chi tiết:\nĐiền an vì orange picture là danh từ đếm được số ít, và picture bắt đầu bằng nguyên âm nên dùng an.",
   "huongDan": "Fill in the blanks with a, an, some or any.",
   "choices": []
  },
  {
   "noi": "Translate into English: Đây là một cuốn sách cũ.",
   "dap": "This is an old book.",
   "giai": "✅ Đáp án đúng: This is an old book.📘 Ngữ cảnh: Giới thiệu một đồ vật: \"Đây là một cuốn sách cũ.\"🏗️ Cấu trúc:Giới thiệu một vật ở gầnThis is + a / an + tính từ + danh từ.Trước ÂM nguyên âm dùng anan old book.🔍 Giải thích chi tiết: - Đây là: dùng This is.- một: danh từ số ít nên cần a hoặc an.- Chọn a hay an: từ ngay sau mạo từ là old, bắt đầu bằng âm nguyên âm nên dùng an.Vì vậy câu đúng là: This is an old book.",
   "huongDan": "Complete each sentence with the correct form of the word in brackets. For the last two, translate the sentence into English.",
   "choices": []
  },
  {
   "noi": "Kim studied hard, she didn’t get high scores.",
   "dap": "",
   "giai": "✅ Đáp án đúng: but - Kim studied hard, but she didn’t get high scores.📘 Ngữ cảnh: Vế đầu học chăm nhưng vế sau không được điểm cao - trái với mong đợi.🏗️ Cấu trúc: \nvế 1 + liên từ + vế 2\nSoi vào câu này: Kim studied hard, but she didn’t get high scores.\nBảng 4 liên từ - nhìn QUAN HỆ giữa hai vế:\nand = và → hai vế cùng chiều, bổ sung cho nhau\n The leopard is fast and strong.\nbut = nhưng → hai vế trái ngược, vế sau ngược với điều mong đợi\n I’m very tired, but I can’t sleep.\nor = hoặc → đưa ra lựa chọn, thường trong câu hỏi\n Do you want a cookie or a cupcake?\nso = nên → vế 1 là nguyên nhân, vế 2 là kết quả\n I was tired, so I went to sleep early.\nMẹo phân biệt nhanh:\nthấy dấu ? và hai thứ để chọn → or\nvế sau phủ định hoặc ngược ý vế trước → but\nthay thử bằng vì vậy mà nghe xuôi → so; thay bằng và nghe xuôi → and🔍 Giải thích chi tiết: Điền but. Học chăm thì lẽ ra phải điểm cao; không đạt được là điều ngược dự đoán. Loại so vì nếu dùng so thì câu thành vô lý.",
   "huongDan": "Complete the sentence with the correct conjunction and, but, or, so.",
   "choices": []
  },
  {
   "noi": "My cousins (not) a TV in their bedroom.",
   "dap": "don’t have",
   "giai": "✅ Đáp án đúng: don’t have (câu 10)📘 Ngữ cảnh: Ở câu My cousins … (not) a TV in their bedroom., My cousins là số nhiều nên phủ định là don’t have.🏗️ Cấu trúc: \nhave / has ở hiện tại đơn:\nI / you / we / they → have he / she / it → has\nPhủ định: don’t have doesn’t have (sau doesn’t dùng have, không dùng has)\nCâu hỏi: Do + I/you/we/they + have…? Does + he/she/it + have…?\n⛔ Không có dạng haves.\n⛔ Không dùng to be thay cho have: is have, isn’t have đều sai.\n⛔ Danh từ số nhiều (my parents, my cousins, Mary and John) dùng have / don’t have / Do.\nSoi vào câu 10: My cousins là số nhiều nên phủ định là don’t have → don’t have🔍 Giải thích chi tiết: My cousins là số nhiều nên phủ định là don’t have, nên câu 10 điền don’t have. Chỉ cần nhìn chủ ngữ là chia được: ngôi thứ ba số ít (he, she, it, tên riêng, danh từ số ít) dùng has, còn lại dùng have. Điểm khiến nhiều người sai nằm ở phủ định và câu hỏi: khi đã có doesn’t hay Does thì động từ chính quay về have, không bao giờ là has - doesn’t have, Does she have…?. Cũng nhớ rằng have ở đây là động từ thường, nên phủ định và câu hỏi phải mượn do / does, không dùng is / are - các phương án is have, isn’t have đều là dạng không tồn tại. Cuối cùng, tiến",
   "huongDan": "Fill in the blank with the correct form of have / has / don't have / doesn't have.",
   "choices": []
  },
  {
   "noi": "Look up in sky! I see moon.",
   "dap": "",
   "giai": "✅ Đáp án đúng: the - the📘 Ngữ cảnh: Nhìn lên trời: \"Nhìn lên bầu trời kìa! Tôi thấy mặt trăng.\"🏗️ Cấu trúc:Vật DUY NHẤT trên đời luôn dùng thethe sun, the moon, the sky.🔍 Giải thích chi tiết: - Cả hai ô: sky và moon là những thứ chỉ có một trên đời nên luôn dùng the, không dùng a / an.Vì vậy câu đúng là: Look up in the sky! I see the moon.",
   "huongDan": "Complete the sentences with a, an or the.",
   "choices": []
  },
  {
   "noi": "We often (play) football after school, but today we (study) for a test.",
   "dap": "play · are studying",
   "giai": "✅ Đáp án đúng: play - are studying - We often play football after school, but today we are studying for a test.📘 Ngữ cảnh: Vế đầu có often (thói quen), vế sau có today (giai đoạn hiện tại).🏗️ Cấu trúc: \nHiện tại ĐƠN: S + V (-s / -es) → việc lặp đi lặp lại, sự thật\nHiện tại TIẾP DIỄN: S + am / is / are + V-ing → việc đang xảy ra lúc này\nBảng dấu hiệu nhận biết:\nĐƠN: every day / week - always, usually, often, sometimes, never\n on Mondays - lịch trình cố định - sự thật hiển nhiên\nTIẾP DIỄN: now - right now - at the moment - at present - today\n Look! - Listen! - Watch out! - Be quiet!\nPhủ định / nghi vấn:\nĐƠN: don’t / doesn’t + V | Do / Does + S + V ?\nTIẾP DIỄN: am / is / aren’t + V-ing | Am / Is / Are + S + V-ing ?\nLưu ý: không trộn hai thì - đã dùng be thì phải có V-ing, đã dùng do/does thì động từ để nguyên thể.\nSoi vào câu này: We often play football after school, but today we are studying for a test.🔍 Giải thích chi tiết: Ô 1 điền play (nguyên thể vì We số nhiều), ô 2 điền are studying. study tận cùng -y sau phụ âm, nhưng khi thêm -ing thì giữ nguyên y → studying. Quy tắc đổi y → ies chỉ dùng cho hiện tại đơn (studies).",
   "huongDan": "Complete the sentences with correct tense of the verbs in brackets.",
   "choices": []
  },
  {
   "noi": "it speaking English?\nYes, it is. / No, it isn’t.\n→",
   "dap": "Is · Yes, it is.",
   "giai": "✅ Đáp án đúng: Is - Is it speaking English? → Yes, it is.📘 Ngữ cảnh: Chủ ngữ là it - dùng cho con vật hoặc đồ vật, số ít.🏗️ Cấu trúc: \nKhẳng định: S + am / is / are + V-ing + ...\nPhủ định: S + am / is / are + not + V-ing + ...\nNghi vấn: Am / Is / Are + S + V-ing ... ?\nSoi vào câu này: it + is + speaking + ...\nBảng chia be:\nI → am (phủ định ’m not)\nhe - she - it, danh từ số ít → is (phủ định isn’t)\nyou - we - they, danh từ số nhiều → are (phủ định aren’t)\nChủ ngữ it ở số ít nên dùng is.\nThiếu một trong hai phần là SAI: phải có đủ be và V-ing.\nDấu hiệu nhận biết: now, right now, at the moment, today, Look!, Listen!, Watch out!, Be quiet!\nTrả lời ngắn: Yes, + S + am / is / are. / No, + S + ’m not / isn’t / aren’t.\nÁp công thức vào câu này: Is + it + speaking ... ?🔍 Giải thích chi tiết: Ô trống điền Is. Tranh đúng như câu hỏi nên trả lời Yes, it is. Nhớ rằng it đi với is giống he/she, đừng dùng are.",
   "huongDan": "Look and write. Then write the correct short answer (Yes, ... / No, ...).",
   "choices": []
  },
  {
   "noi": "She is a teacher.\nNegative: She a teacher.\nQuestion: a teacher?\nShort answer: Yes, .",
   "dap": "isn’t · Is she · she is",
   "giai": "✅ Đáp án đúng: isn’t / Is she / she is📘 Ngữ cảnh: Đổi câu kể sang phủ định, câu hỏi và trả lời ngắn: \"Cô ấy là giáo viên.\"🏗️ Cấu trúc:she đi với isphủ định là isn’t.Short answer khẳng địnhYes, + chủ ngữ + is.🔍 Giải thích chi tiết: - Negative (phủ định): She isn’t a teacher.- Question (câu hỏi): đưa is lên trước she -> Is she a teacher?- Short answer (trả lời ngắn): câu hỏi có Yes nên đáp she is, không viết gọn thành she’s.Vì vậy các câu đúng là: She isn’t a teacher. / Is she a teacher? / Yes, she is.",
   "huongDan": "Change the following affirmative sentences into negative sentences and questions.",
   "choices": []
  },
  {
   "noi": "There is sugar in the tea.",
   "dap": "",
   "giai": "✅ Đáp án đúng: some📘 Ngữ cảnh: Nói trong trà có đường: \"Trong trà có một ít đường.\"🏗️ Cấu trúc:Câu khẳng định dùng some.🔍 Giải thích chi tiết: Câu này là câu khẳng định (There is…), không có not và không phải câu hỏi, nên dùng some. Vì vậy câu đúng là: There is some sugar in the tea.",
   "huongDan": "Fill in the blanks with some or any.",
   "choices": []
  },
  {
   "noi": "She drinks lemonade in the morning",
   "dap": "",
   "giai": "✅ Đáp án đúng: some📘 Ngữ cảnh: Nói thói quen: \"Cô ấy uống nước chanh vào buổi sáng.\"🏗️ Cấu trúc:Danh từ KHÔNG ĐẾM ĐƯỢC dùng some, không dùng a / an.🔍 Giải thích chi tiết: lemonade là danh từ không đếm được nên phải dùng some. Vì vậy câu đúng là: She drinks some lemonade in the morning.",
   "huongDan": "Write a, an or some.",
   "choices": []
  },
  {
   "noi": "computer games and books (good/ bad) → /",
   "dap": "better · worse",
   "giai": "✅ Đáp án đúng: better / worse - computer games and books (good/ bad) → better / worse = so sánh trò chơi điện tử và sách📘 Ngữ cảnh: Đề cho chủ đề so sánh trò chơi điện tử và sách cùng hai tính từ trong ngoặc: good và bad. Việc cần làm là viết dạng so sánh hơn của từng tính từ.🏗️ Cấu trúc: \nA + be + tính từ so sánh hơn + than + B\nSoi vào câu này: computer games + is + better + than + books\nBảng biến đổi:\ntính từ NGẮN (1 âm tiết, hoặc 2 âm tiết đuôi -y) → thêm -er (tall → taller)\ntính từ DÀI (từ 2-3 âm tiết trở lên) → more + tính từ (more careful)\nbất quy tắc: good → better | bad → worse\nỞ đây good là tính từ BẤT QUY TẮC nên dùng better. Có than thì luôn là dạng hơn.\nÔ 2: tính từ bad thuộc nhóm bất quy tắc → worse → books is worse than computer games.🔍 Giải thích chi tiết: Chủ đề đem ra so sánh là trò chơi điện tử và sách. Ô 1: good → better (phải học thuộc, không suy ra được bằng quy tắc). Ô 2: bad → worse (cũng là bất quy tắc). Cặp good → better và bad → worse là hai từ bất quy tắc thông dụng nhất, cần thuộc lòng.",
   "huongDan": "Write the comparative form of the two adjectives in brackets.",
   "choices": []
  },
  {
   "noi": "Her children (not be) at home yesterday morning.\nThey (be) in the park.",
   "dap": "weren’t · were",
   "giai": "✅ Đáp án đúng: weren’t - were📘 Ngữ cảnh: Cụm yesterday morning → quá khứ đơn. Ngoặc ghi be nên dùng dạng quá khứ của be. Chủ ngữ Her children số nhiều.🏗️ Cấu trúc: \nKhẳng định: S + was / were + ...\nPhủ định: S + wasn’t / weren’t + ...\nNghi vấn: Was / Were + S + ... ?\nSoi vào câu này: S + was / were → S + wasn’t / weren’t → Was / Were + S ... ?\nBảng chia:\nI - he - she - it, danh từ số ít → was (phủ định wasn’t)\nyou - we - they, danh từ số nhiều → were (phủ định weren’t)\nThere was + danh từ số ít | There were + danh từ số nhiều\nDấu hiệu quá khứ: yesterday, last week / month / year, ... ago, in 2010.\nSoi câu này: Her children weren’t at home yesterday morning. They were in the park.🔍 Giải thích chi tiết: Ô 1 điền weren’t, ô 2 điền were. Với chủ ngữ số nhiều thì quá khứ của be là were (phủ định weren’t). Chú ý children không có đuôi -s nhưng vẫn là số nhiều.",
   "huongDan": "Complete the sentences by putting the verbs in brackets into the correct tense. (Past simple)",
   "choices": []
  },
  {
   "noi": "Tim and Tom are cousins.\n are cousins.",
   "dap": "",
   "giai": "✅ Đáp án đúng: They📘 Ngữ cảnh: Thay danh từ bằng đại từ: \"Tim và Tom là anh em họ.\"🏗️ Cấu trúc:Hai người khác (không có mình) thay bằng They.🔍 Giải thích chi tiết: Tim and Tom là hai người khác, không có người nói, nên thay bằng They. Vì vậy câu đúng là: They are cousins.",
   "huongDan": "Rewrite the sentences using the pronouns.",
   "choices": []
  },
  {
   "noi": "He is on the sofa.\nPhủ định: He on the sofa.\nCâu hỏi: on the sofa?\nYes, .",
   "dap": "isn’t · Is he · he is",
   "giai": "✅ Đáp án đúng: isn’t - Is he - he is\nCâu hoàn chỉnh: He is on the sofa. / (-) He isn’t on the sofa. / (?) Is he on the sofa? / Yes, he is.📘 Ngữ cảnh:\nBài yêu cầu: Change the following affirmative sentences into negative sentences and questions.\nCâu cần hoàn thành: He is on the sofa. / (-) He ___ on the sofa. / (?) ___ on the sofa? / Yes, ___.\nChỗ trống (1) là động từ to be. Chủ ngữ của câu là \"He\".\nChỗ trống (2) là phần đầu câu hỏi: to be đảo lên trước chủ ngữ he.\nChỗ trống (3) là câu trả lời ngắn cho câu hỏi \"on the sofa\".🏗️ Cấu trúc: Động từ to be chia theo chủ ngữ:\nI + am (viết tắt I’m, phủ định I’m not)\nHe - She - It, danh từ số ít + is (viết tắt ’s, phủ định isn’t)\nYou - We - They, danh từ số nhiều + are (viết tắt ’re, phủ định aren’t)\nNghi vấn: đảo be lên trước chủ ngữ - Am / Is / Are + S + … ?\nTrả lời ngắn: Yes, S + be. / No, S + be + not.\nSoi vào câu này: He + isn’t → (-) He isn’t on the sofa.\n Is he → (?) Is he on the sofa?\n he is → Yes, he is.🔍 Giải thích chi tiết:\nÔ (1) điền isn’t - dạng phủ định của is, vì is đi với He - She - It và danh từ số ít và chủ ngữ ở đây là He.\nÔ (2) điền Is he: câu hỏi phải đảo is lên trước chủ ngữ he, và is đi với He - She - It và danh từ số ",
   "huongDan": "Change the following affirmative sentences into negative sentences and questions.",
   "choices": []
  },
  {
   "noi": "There aren’t bananas on the plate.",
   "dap": "",
   "giai": "✅ Đáp án đúng: any\nCâu hoàn chỉnh: There aren’t any bananas on the plate.📘 Ngữ cảnh:\nBài yêu cầu: Fill in the blanks with a, an, some or any.\nCâu cần hoàn thành: There aren’t ___ bananas on the plate.\nChỗ trống chọn giữa some và any. Đây là câu PHỦ ĐỊNH.🏗️ Cấu trúc: some và any đều nghĩa là \"một ít / một vài\", khác nhau ở loại câu:\nsome → dùng trong câu KHẲNG ĐỊNH (There is some milk.)\nany → dùng trong câu PHỦ ĐỊNH và câu HỎI (There isn’t any milk. - Is there any milk?)\na / an → chỉ dùng với danh từ đếm được SỐ ÍT (a book, an apple)\nDanh từ số nhiều và danh từ không đếm được KHÔNG dùng a / an.\nSoi vào câu này: any + bananas → There aren’t bananas on the plate.🔍 Giải thích chi tiết:\nĐiền any vì đây là câu phủ định, mà câu phủ định và câu hỏi dùng any.\nLỗi hay gặp: Đừng nhìn some / any rồi đoán is hay are - some và any đi được với cả hai, phải nhìn DANH TỪ. Danh từ số nhiều đi với are và không dùng a / an.",
   "huongDan": "Fill in the blanks with a, an, some or any.",
   "choices": []
  },
  {
   "noi": "Sam in an apartment.\nHe in a house.",
   "dap": "lives · doesn’t live",
   "giai": "✅ Đáp án đúng: lives - doesn’t live - Sam lives in an apartment. / He doesn’t live in a house. = Sam sống trong một căn hộ. / Cậu ấy không sống trong nhà riêng.📘 Ngữ cảnh: Tranh cho thấy Sam ở chung cư chứ không ở nhà riêng. Chủ ngữ Sam / He ở số ít.🏗️ Cấu trúc: \nPhủ định: S + don’t / doesn’t + V (nguyên thể)\nNghi vấn: Do / Does + S + V (nguyên thể) ?\nSoi vào câu này: Sam / He + doesn’t + live\nBảng chọn trợ động từ:\nI - you - we - they, số nhiều → do / don’t\nhe - she - it, số ít → does / doesn’t\nChủ ngữ Sam / He ở số ít nên dùng doesn’t.\nSau do / does / don’t / doesn’t, động từ giữ NGUYÊN THỂ - phần -s đã nằm ở does.\nTrả lời ngắn: Yes, + S + do / does. / No, + S + don’t / doesn’t.🔍 Giải thích chi tiết: Ô 1 điền lives (thêm -s), ô 2 điền doesn’t live (trở về nguyên thể). Chú ý mạo từ: an apartment (âm nguyên âm) nhưng a house (âm phụ âm).",
   "huongDan": "Look at the pictures and write. Use the affirmative and the negative form.",
   "choices": []
  },
  {
   "noi": "We live in London withthree dogs.",
   "dap": "our",
   "giai": "✅ Đáp án đúng: our📘 Ngữ cảnh: \"Chúng tôi sống ở London với ba chú chó của mình.\"🏗️ Cấu trúc: we → our (+ danh từ).\nVí dụ: We love our city.🔍 Giải thích chi tiết: Người sở hữu là \"We\" nên tính từ sở hữu là \"our\". Không dùng \"my\" (chỉ một người) vì chủ ngữ là số nhiều \"we\". Vậy: We live in London with our three dogs. (Chúng tôi sống ở London với ba chú chó của mình.)",
   "huongDan": "Fill in the blank with the correct word or phrase.",
   "choices": []
  },
  {
   "noi": "My friends/ love/ skate /?\n?",
   "dap": "Do your friends love skating",
   "giai": "✅ Đáp án đúng: Do your friends love skating - Do your friends love skating? = Bạn bè của bạn có thích trượt băng không?📘 Ngữ cảnh: Gợi ý kết thúc bằng dấu ? nên phải viết thành câu hỏi. Động từ cảm xúc là love, hoạt động là skate.🏗️ Cấu trúc: \nS + like / love / hate + V-ing\nSoi vào câu này: Do your friends + Do your friends love + skating\nChủ ngữ he / she / it và danh từ số ít → động từ cảm xúc thêm -s (likes, loves, hates).\nPhủ định: S + don’t / doesn’t + like + V-ing (sau don’t/doesn’t thì không chia nữa).\nCâu hỏi: Do / Does + S + like + V-ing?\nCách thêm -ing: thường thêm thẳng (play → playing); bỏ -e (ride → riding); gấp đôi phụ âm (swim → swimming).\n Ví dụ: Do your friends love dancing?🔍 Giải thích chi tiết: Điền Do your friends love skating: dùng Do vì chủ ngữ ở số nhiều, giữ love ở nguyên thể, và đổi hoạt động thành skate → skating (bỏ -e rồi thêm -ing) → Do your friends love skating? Chú ý đề ghi My friends nhưng đáp án chuẩn là your friends vì đây là câu hỏi dành cho người khác.",
   "huongDan": "Write the sentences. Use the words given.",
   "choices": []
  },
  {
   "noi": "Does Vadim like playing football?",
   "dap": "No, he doesn’t.",
   "giai": "✅ Đáp án đúng: No, he doesn’t. - Does Vadim like playing football? No, he doesn’t. = Vadim có thích chơi bóng đá không? - Không.📘 Ngữ cảnh: Câu hỏi dùng Does (động từ thường like) với chủ ngữ Vadim - một bạn nam. Theo bài, Vadim thích cắm trại và nấu ăn ngoài trời, không phải bóng đá.🏗️ Cấu trúc: \nPhủ định: S + don’t / doesn’t + V (nguyên thể)\nNghi vấn: Do / Does + S + V (nguyên thể) ?\nSoi vào câu này: Vadim + Does + like\nBảng chọn trợ động từ:\nI - you - we - they, số nhiều → do / don’t\nhe - she - it, số ít → does / doesn’t\nChủ ngữ Vadim ở số ít nên dùng Does.\nSau do / does / don’t / doesn’t, động từ giữ NGUYÊN THỂ - phần -s đã nằm ở does.\nTrả lời ngắn: Yes, + S + do / does. / No, + S + don’t / doesn’t.🔍 Giải thích chi tiết: Trả lời No, he doesn’t. Hỏi bằng Does thì đáp bằng does / doesn’t - không dùng is/isn’t. Đây là điểm khác biệt so với hai câu trên (hỏi bằng Is / Are).",
   "huongDan": "Read the text. Write the missing word(s), then answer the questions.",
   "choices": []
  },
  {
   "noi": "Josh listen to the radio?\nNo, .",
   "dap": "Does · he doesn’t",
   "giai": "✅ Đáp án đúng: Does - he doesn’t - Does Josh listen to the radio? No, he doesn’t . = Josh có nghe đài không? - Không.📘 Ngữ cảnh: Chủ ngữ Josh là một người → số ít. Câu trả lời bắt đầu bằng No.🏗️ Cấu trúc: \nPhủ định: S + don’t / doesn’t + V (nguyên thể)\nNghi vấn: Do / Does + S + V (nguyên thể) ?\nSoi vào câu này: Josh + Does + listen\nBảng chọn trợ động từ:\nI - you - we - they, số nhiều → do / don’t\nhe - she - it, số ít → does / doesn’t\nChủ ngữ Josh ở số ít nên dùng Does.\nSau do / does / don’t / doesn’t, động từ giữ NGUYÊN THỂ - phần -s đã nằm ở does.\nTrả lời ngắn: Yes, + S + do / does. / No, + S + don’t / doesn’t.🔍 Giải thích chi tiết: Ô 1 điền Does, ô 2 điền he doesn’t. Đổi tên riêng thành đại từ he, và dùng doesn’t vì trả lời No. Đối chiếu với câu về Jun ở trên: cùng dùng Does nhưng một câu đáp does, một câu đáp doesn’t.",
   "huongDan": "Read and write. Complete the question and the short answer.",
   "choices": []
  },
  {
   "noi": "We aren’t ; we are smiling.",
   "dap": "",
   "giai": "✅ Đáp án đúng: sad (câu 8)📘 Ngữ cảnh: Ở câu We aren’t …; we are smiling., đang cười nên vế trước phải phủ định sad.🏗️ Cấu trúc: \nĐộng từ to be ở hiện tại:\nI am he / she / it is you / we / they are\nPhủ định: am not isn’t aren’t Câu hỏi: đảo Am / Is / Are lên trước chủ ngữ\nTrả lời ngắn: Yes, we are. No, we aren’t.\nNhắc tới ĐỒ VẬT: một cái → It is / It’s nhiều cái → They are / They’re\nTính từ trong tiếng Anh KHÔNG có số nhiều: They’re black, không phải blacks\n⛔ Không thêm mạo từ trước tính từ đứng một mình: It’s red, không phải It’s a red.\n⛔ Its (sở hữu) khác It’s (= it is) - chỗ này phải có dấu nháy.\nSoi vào câu 8: đang cười nên vế trước phải phủ định sad → sad🔍 Giải thích chi tiết: Đang cười nên vế trước phải phủ định sad, nên câu 8 kéo thả sad. Động từ to be chỉ có ba dạng ở hiện tại, và chọn dạng nào hoàn toàn do chủ ngữ quyết định: I đi với am, số ít đi với is, còn you / we / they và mọi danh từ số nhiều đi với are. Khi trả lời về đồ vật thì phải đếm: một cái dùng It’s, nhiều cái dùng They’re - nhìn danh từ trong câu hỏi có -s hay không là biết ngay. Hai lỗi rất hay gặp ở phần này: thêm -s vào tính từ (pinks, blacks, greens) - tính từ tiếng Anh không bao giờ chia số nhiều; và thê",
   "huongDan": "Drag the correct word into each blank to complete the sentences about 'We're' and 'We aren't'.",
   "choices": []
  },
  {
   "noi": "Janet and Paul have two daughters.older daughter is at college, and the younger daughter goes to secondary school.",
   "dap": "Their",
   "giai": "✅ Đáp án đúng: Their📘 Ngữ cảnh: Nói về con gái của Janet và Paul.🏗️ Cấu trúc: they → their (+ danh từ); viết hoa khi đầu câu.\nVí dụ: Their daughter is a doctor.🔍 Giải thích chi tiết: \"Janet and Paul\" là hai người (= they) nên tính từ sở hữu là \"their\" (viết hoa \"Their\" vì đứng đầu câu). Vậy: Their older daughter is at college, and the younger daughter goes to secondary school. (Con gái lớn của họ đang học cao đẳng...)",
   "huongDan": "Fill in the blank with the correct word or phrase.",
   "choices": []
  },
  {
   "noi": "it a funny movie?\nNo, it .",
   "dap": "Is · isn’t",
   "giai": "✅ Đáp án đúng: Is - isn’t - Is it a funny movie? No, it isn’t .📘 Ngữ cảnh: Câu hỏi về một bộ phim nên chủ ngữ it ở số ít. Câu trả lời bắt đầu bằng No nên phần sau phải mang not.🏗️ Cấu trúc: \nKhẳng định: S + be + ...\nPhủ định: S + be + not + ...\nNghi vấn: Be + S + ...?\nSoi vào câu này: it + is → it + isn’t → Is + it ... ?\nBảng chia be: I → am | he / she / it → is | you / we / they → are\nTrả lời ngắn: Yes, + S + be. / No, + S + be + not. (câu Yes không viết tắt)🔍 Giải thích chi tiết: Ô 1 điền Is (viết hoa, đầu câu) vì chủ ngữ it là số ít. Ô 2 điền isn’t vì có chữ No. Đối chiếu với câu về Kim and Tam ngay trên: câu đó đáp Yes nên giữ are, còn câu này đáp No nên phải là isn’t.",
   "huongDan": "Look at the pictures and write is / isn’t, are / aren’t, am / ’m not.",
   "choices": []
  },
  {
   "noi": "Diana/ at the theatre?\n Diana at the theatre?",
   "dap": "Was · No, she wasn’t.",
   "giai": "✅ Đáp án đúng: Was - No, she wasn’t. - Was Diana at the theatre? No, she wasn’t. = Diana có ở nhà hát không? - Không.📘 Ngữ cảnh: Tra tranh: Diana ở rạp xiếc (circus), không phải nhà hát (theatre) - hai chỗ khác nhau, dễ nhầm. Chủ ngữ Diana ở số ít.🏗️ Cấu trúc: \nKhẳng định: S + was / were + ...\nPhủ định: S + wasn’t / weren’t + ...\nNghi vấn: Was / Were + S + ... ?\nSoi vào câu này: Diana + was → Diana + wasn’t → Was + Diana ... ?\nBảng chia:\nI - he - she - it, danh từ số ít → was (phủ định wasn’t)\nyou - we - they, danh từ số nhiều → were (phủ định weren’t)\nThere was + danh từ số ít | There were + danh từ số nhiều\nDấu hiệu quá khứ: yesterday, last week / month / year, ... ago, in 2010.\nÁp công thức vào câu này: Diana + was + at the theatre🔍 Giải thích chi tiết: Ô 1 điền Was (viết hoa vì đầu câu hỏi) vì chủ ngữ ở số ít - trong câu hỏi, be đảo lên trước chủ ngữ. Ô 2 điền No, she wasn’t. vì tranh cho thấy không đúng, và câu trả lời ngắn dùng đại từ she thay cho Diana, không lặp lại phần nơi chốn.",
   "huongDan": "Now, write the questions and the short answers.",
   "choices": []
  },
  {
   "noi": "Mary and John have a swimming pool?",
   "dap": "Do",
   "giai": "✅ Đáp án đúng: Do (câu 11)📘 Ngữ cảnh: Ở câu … Mary and John have a swimming pool?, Mary and John là số nhiều nên câu hỏi dùng Do.🏗️ Cấu trúc: \nhave / has ở hiện tại đơn:\nI / you / we / they → have he / she / it → has\nPhủ định: don’t have doesn’t have (sau doesn’t dùng have, không dùng has)\nCâu hỏi: Do + I/you/we/they + have…? Does + he/she/it + have…?\n⛔ Không có dạng haves.\n⛔ Không dùng to be thay cho have: is have, isn’t have đều sai.\n⛔ Danh từ số nhiều (my parents, my cousins, Mary and John) dùng have / don’t have / Do.\nSoi vào câu 11: Mary and John là số nhiều nên câu hỏi dùng Do → Do🔍 Giải thích chi tiết: Mary and John là số nhiều nên câu hỏi dùng Do, nên câu 11 điền Do. Chỉ cần nhìn chủ ngữ là chia được: ngôi thứ ba số ít (he, she, it, tên riêng, danh từ số ít) dùng has, còn lại dùng have. Điểm khiến nhiều người sai nằm ở phủ định và câu hỏi: khi đã có doesn’t hay Does thì động từ chính quay về have, không bao giờ là has - doesn’t have, Does she have…?. Cũng nhớ rằng have ở đây là động từ thường, nên phủ định và câu hỏi phải mượn do / does, không dùng is / are - các phương án is have, isn’t have đều là dạng không tồn tại. Cuối cùng, tiếng Anh không có dạng haves, dù chủ ngữ là",
   "huongDan": "Fill in the blank with the correct form of have / has / don't have / doesn't have.",
   "choices": []
  },
  {
   "noi": "That is Ann’s car toy.\n car toy is that?",
   "dap": "Whose",
   "giai": "✅ Đáp án đúng: Whose - Whose car toy is that?📘 Ngữ cảnh: Phần gạch chân Ann’s có dấu sở hữu ’s - đang nói chiếc ô tô đồ chơi của ai → hỏi bằng Whose.🏗️ Cấu trúc: \nTừ để hỏi + do / does / be + S + V ... ?\nSoi vào câu này: Whose + is + that car toy ?\nBảng từ để hỏi:\nWhat = cái gì | Who = ai | Where = ở đâu\nWhen = khi nào | Why = tại sao | How = thế nào\nWhich = cái nào (chọn trong số) | Whose = của ai\nChọn trợ động từ theo động từ chính:\nđộng từ be → đảo is / are lên ngay sau từ để hỏi (Where is your bag?)\nđộng từ thường → dùng do / does, động từ giữ nguyên thể (Where do you live?)🔍 Giải thích chi tiết: Điền Whose. Dấu hiệu: từ để hỏi đứng ngay trước danh từ (Whose car toy). Đừng nhầm với Who - Who hỏi người làm gì và không đứng trước danh từ.",
   "huongDan": "Write a question for the underlined word.",
   "choices": []
  },
  {
   "noi": "My name (1) Josh. I (2) twelve years old and I (3) from London.There (4) four people in my family. My dad (his name (5) Peter), my mum (her name (6) Julie) and my little sister Jessica.She (7) nearly seven. Her birthday (8) in May.My school is in London. My favorite subjects (9) English and maths and my favourite sport (10) basketball.",
   "dap": "is · am · am · are · is · is · is · is · are · is",
   "giai": "✅ Đáp án đúng: (1) is - (2) am - (3) am - (4) are - (5) is - (6) is - (7) is - (8) is - (9) are - (10) is📘 Ngữ cảnh: Đây là đoạn Josh tự giới thiệu, có 10 chỗ trống. Cả đoạn chỉ dùng một điểm ngữ pháp: chia động từ be theo chủ ngữ. Với mỗi ô, tìm chủ ngữ đứng ngay trước rồi tra bảng.🏗️ Cấu trúc: \nKhẳng định: S + be + ...\nPhủ định: S + be + not + ...\nNghi vấn: Be + S + ...?\nSoi vào câu này: chủ ngữ của từng câu + am / is / are → chủ ngữ của từng câu + am not / isn’t / aren’t → Am / Is / Are + chủ ngữ của từng câu ... ?\nBảng chia be: I → am | he / she / it → is | you / we / they → are\nTrả lời ngắn: Yes, + S + be. / No, + S + be + not. (câu Yes không viết tắt)\nChủ ngữ ở đây có 3 kiểu, đừng nhầm lẫn:\nI → am | danh từ số ít (my name, her birthday) → is\ndanh từ số nhiều (my favorite subjects) → are🔍 Giải thích chi tiết: Điền lần lượt: (1) is (My name - một cái tên), (2) am và (3) am (chủ ngữ I), (4) are (There are four people - danh từ số nhiều phía sau), (5) is, (6) is (his name, her name - mỗi cái tên là số ít), (7) is (She), (8) is (Her birthday - một ngày sinh nhật), (9) are (My favorite subjects có đuôi -s → số nhiều), (10) is (my favourite sport - số ít).\nSai: My favorite subjects ",
   "huongDan": "Read Josh’s short text about himself. Then write the missing words in each blank.",
   "choices": []
  },
  {
   "noi": "The cowboy . → \nIt .",
   "dap": "can play the guitar · B · can’t play the guitar",
   "giai": "✅ Đáp án đúng: can play the guitar - B - can’t play the guitar - The cowboy can play the guitar. → B / It can’t play the guitar. = Chàng cao bồi có thể chơi đàn ghi-ta. / Chàng cao bồi không thể chơi đàn ghi-ta.📘 Ngữ cảnh: Bài có hai bức tranh: ban đêm đồ chơi sống dậy và làm được mọi thứ, ban sáng thì không làm được nữa. Ở đây nói về chàng cao bồi và hành động chơi đàn ghi-ta. Ô 1 là câu khẳng định (tranh đêm), ô 2 là chữ cái của bức tranh nhỏ tương ứng, ô 3 là câu phủ định (tranh sáng).🏗️ Cấu trúc: \nS + can / can’t + V (nguyên thể)\nSoi vào câu này: The cowboy + can + play the guitar\ncan = làm được | can’t = không làm được\nSau can / can’t, động từ giữ nguyên: không thêm -s, không thêm -ing.\ncan không đổi theo chủ ngữ - không có cans, không có doesn’t can.\nCâu hỏi: Can + S + V? → Trả lời: Yes, ... can. / No, ... can’t.\n Ví dụ: They can run fast. - They can’t run fast. Dạng phủ định viết tắt là can’t (= cannot), dùng chung cho mọi chủ ngữ.🔍 Giải thích chi tiết: Ô 1 điền can play the guitar: giữ nguyên động từ play the guitar, không viết can play the guitars hay can play the guitaring. Ô 2 là B - chữ cái của bức tranh vẽ chàng cao bồi đang chơi đàn ghi-ta. Ô 3 điền can’t play the gui",
   "huongDan": "Look at the two pictures and write. In the night picture, write what each thing can do and match it with the correct letter. In the morning picture, write what it can’t do.",
   "choices": []
  },
  {
   "noi": "I have orange.",
   "dap": "",
   "giai": "✅ Đáp án đúng: an📘 Ngữ cảnh: Nói thứ mình có: \"Tôi có một quả cam.\"🏗️ Cấu trúc:Danh từ ĐẾM ĐƯỢC số ít dùng a / an.Trước âm nguyên âm dùng an.🔍 Giải thích chi tiết: orange đếm được và chỉ có một nên dùng mạo từ; từ này bắt đầu bằng âm nguyên âm nên dùng an. Vì vậy câu đúng là: I have an orange.",
   "huongDan": "Fill in a, an or some.",
   "choices": []
  },
  {
   "noi": "John a dentist.",
   "dap": "",
   "giai": "✅ Đáp án đúng: is📘 Ngữ cảnh: Chọn dạng đúng của to be cho chủ ngữ John.🏗️ Cấu trúc:he / she / it và danh từ số ít đi với is.🔍 Giải thích chi tiết: John là tên riêng, một người nên dùng is. Vì vậy câu đúng là: John is …",
   "huongDan": "Fill in the blanks with am, is or are.",
   "choices": []
  },
  {
   "noi": "I see igloo. igloo has a flag.",
   "dap": "",
   "giai": "✅ Đáp án đúng: an - the📘 Ngữ cảnh: Tả bức tranh: nhìn thấy igloo, rồi nói tiếp về chính igloo đó.🏗️ Cấu trúc:Nhắc lần ĐẦUa / an + danh từ số ít.Trước âm nguyên âm dùng an.Nhắc LẠI thứ vừa nói dùng the.🔍 Giải thích chi tiết: - Ô 1: igloo xuất hiện lần đầu nên dùng mạo từ; từ này bắt đầu bằng âm nguyên âm nên dùng an.- Ô 2: câu sau nhắc lại đúng igloo đó nên dùng the.Vì vậy câu đúng là: I see an igloo. The igloo …",
   "huongDan": "Choose the correct article to complete each sentence.",
   "choices": []
  },
  {
   "noi": "My name (1) Nam. (2) 8 years old.\n(3) a student.\nMy dad (4) 40 years old. He (5) a doctor.\nHis name (6) Minh.\nMy mom (7) 36 years old. (8) a vet.\nHer name (9) An.\nMy sister (10) 6 years old. (11) a student, too. Her name (12) Kim.\nWe (13) a happy family!",
   "dap": "is · I am · I am · is · is · is · is · She is a vet. · is · is · She is · is · are",
   "giai": "✅ Đáp án đúng: is - I am - I am - is - is - is - is - She is a vet. - is - is - She is - is - are\nCâu hoàn chỉnh: My name (1) is Nam. (2) I am 8 years old. / (3) I am a student. / My dad (4) is 40 years old. He (5) is a doctor. / His name (6) is Minh. / My mom (7) is 36 years old. (8) She is a vet. a vet. / Her name (9) is An. / My sister (10) is 6 years old. (11) She is a student, too. Her name (12) is Kim. / We (13) are a happy family!📘 Ngữ cảnh:\nBài yêu cầu: Read and fill in the blanks to complete Nam’s introduction about his family.\nCâu cần hoàn thành: My name (1) ___ Nam. (2) ___ 8 years old. / (3) ___ a student. / My dad (4) ___ 40 years old. He (5) ___ a doctor. / His name (6) ___ Minh. / My mom (7) ___ 36 years old. (8) ___ a vet. / Her name (9) ___ An. / My sister (10) ___ 6 years old. (11) ___ a student, too. Her name (12) ___ Kim. / We (13) ___ a happy family!\nChỗ trống (1) là động từ to be. Chủ ngữ của câu là \"My name (1)\".\nChỗ trống (2) là câu trả lời ngắn cho câu hỏi \"My name (1) Nam\".\nChỗ trống (3) là câu trả lời ngắn cho câu hỏi \"8 years old\".\nChỗ trống (4) là động từ to be. Chủ ngữ của câu là \"My dad (4)\".\nChỗ trống (5) là động từ to be. Chủ ngữ của câu là \"He (5)\"",
   "huongDan": "Read and fill in the blanks to complete Nam’s introduction about his family.",
   "choices": []
  },
  {
   "noi": "My friends often (go) camping.",
   "dap": "go",
   "giai": "✅ Đáp án đúng: go - My friends often go camping. = Các bạn tôi thường đi cắm trại.📘 Ngữ cảnh: Động từ trong ngoặc là go. Chủ ngữ của câu là My friends - số nhiều. Dấu hiệu often xác nhận đây là việc lặp lại thường xuyên.🏗️ Cấu trúc: \nS + V (-s / -es) + O (thì hiện tại đơn)\nSoi vào câu này: My friends + go + ...\nBảng chia động từ:\nI - you - we - they, danh từ số nhiều → V nguyên thể (they play)\nhe - she - it, danh từ số ít → V + -s / -es (he plays)\nChủ ngữ My friends ở số nhiều nên dùng go.\nCách thêm đuôi: thường +s; tận cùng s, x, ch, sh, o → +es (watch → watches);\ntận cùng -y sau phụ âm → đổi thành -ies (study → studies), sau nguyên âm thì giữ y (play → plays).🔍 Giải thích chi tiết: Điền go: giữ nguyên thể vì My friends có đuôi -s → số nhiều. Chủ ngữ này không thêm đuôi -s cho động từ.",
   "huongDan": "Look at the pictures. Identify the subject and write the correct form of the verb in brackets.",
   "choices": []
  },
  {
   "noi": "We need apples.",
   "dap": "",
   "giai": "✅ Đáp án đúng: some📘 Ngữ cảnh: Nói thứ cần mua: \"Chúng ta cần mấy quả táo.\"🏗️ Cấu trúc:Danh từ SỐ NHIỀU dùng some, không dùng a / an.🔍 Giải thích chi tiết: apples đang ở số nhiều nên phải dùng some. Vì vậy câu đúng là: We need some apples.",
   "huongDan": "Fill in a, an or some.",
   "choices": []
  },
  {
   "noi": "get up →",
   "dap": "got up",
   "giai": "✅ Đáp án đúng: got up - get up → got up = thức dậy📘 Ngữ cảnh: Đề cho động từ get up (thức dậy) ở dạng nguyên thể. Đây là động từ BẤT QUY TẮC nên không thêm -ed mà phải nhớ dạng riêng.🏗️ Cấu trúc: \nS + V2 (cột 2 - quá khứ) + O (động từ BẤT QUY TẮC)\nSoi vào câu này: get up → got up (đổi e → o ở động từ chính, tiểu từ up giữ nguyên)\nĐộng từ bất quy tắc KHÔNG thêm -ed - phải học thuộc từng từ.\nBảng các từ hay gặp:\ngo → went | eat → ate | drink → drank | take → took\nhave → had | see → saw | write → wrote | do → did\ncome → came | ride → rode | say → said | drive → drove\nget up → got up, wake up → woke up (chỉ đổi động từ chính, tiểu từ giữ nguyên)\nread → read: viết y hệt nhưng đọc khác (/riːd/ → /red/).\nV2 dùng chung cho mọi chủ ngữ; sau didn’t / Did thì quay về NGUYÊN THỂ.🔍 Giải thích chi tiết: Đổi get up → got up: đổi e → o ở động từ chính, tiểu từ up giữ nguyên. Với cụm động từ (get up), chỉ đổi động từ chính, tiểu từ phía sau giữ nguyên - viết get upped là sai. Dạng got up dùng chung cho mọi chủ ngữ.",
   "huongDan": "Write the past form of the verb.",
   "choices": []
  },
  {
   "noi": "I’d like to go to Paris Spring.",
   "dap": "",
   "giai": "✅ Đáp án đúng: in - I’d like to go to Paris in Spring.📘 Ngữ cảnh: Từ Spring (mùa xuân) là một mùa trong năm.🏗️ Cấu trúc: \nin / on / at + cụm chỉ thời gian\nSoi vào câu này: Spring là mùa → dùng in\nBảng chọn giới từ - nhìn từ đứng SAU ô trống:\nin → khoảng thời gian DÀI: năm (in 2023) - tháng (in June)\n mùa (in the summer) - buổi trong ngày (in the morning / afternoon / evening)\non → NGÀY cụ thể: thứ (on Monday) - ngày tháng (on April 24) - on my birthday\nat → GIỜ giấc (at 6.30, at ten o’clock) - dịp lễ (at Christmas)\n và các cụm cố định: at noon - at night - at the weekend\nBẫy hay gặp: in April (chỉ có tháng) nhưng on April 24 (thêm ngày thì đổi sang on)\n in the morning nhưng at night - đây là ngoại lệ phải thuộc.🔍 Giải thích chi tiết: Điền in. Giới từ in dùng cho mùa: in Spring, in the summer. Loại on (dành cho ngày) và at (dành cho giờ).",
   "huongDan": "Complete the sentence with in, at or on.",
   "choices": []
  },
  {
   "noi": "Where does he usually go at weekends?\nHe usually goes to .",
   "dap": "expensive restaurants",
   "giai": "✅ Đáp án đúng: expensive restaurants - He usually goes to expensive restaurants .📘 Ngữ cảnh: Câu hỏi Where hỏi nơi đến. Bài đọc viết At weekends, he usually goes to expensive restaurants with his friends.🏗️ Cấu trúc: \nCách trả lời câu hỏi đọc hiểu:\n1. Đọc câu hỏi, xác định từ để hỏi (Who / Where / What)\n2. Gạch chân từ khoá trong câu hỏi, tìm đúng câu chứa nó trong bài\n3. Chép lại phần thông tin đúng loại mà từ để hỏi yêu cầu\n Who → người / nghề nghiệp | Where → nơi chốn | What ... doing → V-ing\n4. Đổi ngôi và chia lại động từ cho khớp câu trả lời (does he live → he lives)\nSoi câu này: Where does he usually go at weekends? → expensive restaurants🔍 Giải thích chi tiết: Điền expensive restaurants. Phải viết đủ cả tính từ expensive, và danh từ ở dạng số nhiều đúng như trong bài. Trạng từ usually trong câu hỏi khớp với usually trong bài - đó là manh mối tìm đúng câu.",
   "huongDan": "Read the text and answer the questions.Michael JohnsonThis is Michael Johnson. He is a famous rock star. He lives in America.He travels all around the world and sings in rock concerts. He writes his s",
   "choices": []
  },
  {
   "noi": "The kid (feed) the cat one hour ago.",
   "dap": "fed",
   "giai": "✅ Đáp án đúng: fed - The kid fed the cat one hour ago. = Cậu bé đã cho mèo ăn cách đây một tiếng.📘 Ngữ cảnh: Động từ cho sẵn là feed, chủ ngữ là The kid. Cụm one hour ago là dấu hiệu quá khứ. Câu này ở dạng khẳng định.🏗️ Cấu trúc: \nS + V2 (cột 2 - quá khứ) + O (động từ BẤT QUY TẮC)\nSoi vào câu này: feed → fed\nĐộng từ bất quy tắc KHÔNG thêm -ed - phải học thuộc từng từ.\nBảng các từ hay gặp:\ngo → went | eat → ate | drink → drank | take → took\nhave → had | see → saw | write → wrote | do → did\ncome → came | ride → rode | say → said | drive → drove\nget up → got up, wake up → woke up (chỉ đổi động từ chính, tiểu từ giữ nguyên)\nread → read: viết y hệt nhưng đọc khác (/riːd/ → /red/).\nV2 dùng chung cho mọi chủ ngữ; sau didn’t / Did thì quay về NGUYÊN THỂ.\nÁp công thức vào câu này: The kid + fed + the cat one hour ago🔍 Giải thích chi tiết: Điền fed - dạng quá khứ bất quy tắc của feed. Nhớ bộ ba: feed - fed - fed. Viết feeded là sai.",
   "huongDan": "Put the verbs in brackets into the past simple.",
   "choices": []
  },
  {
   "noi": "Her town a big shopping center.",
   "dap": "doesn’t have",
   "giai": "✅ Đáp án đúng: doesn’t have - Her town doesn’t have a big shopping center. = Thị trấn của cô ấy không có trung tâm mua sắm lớn.📘 Ngữ cảnh: Câu ở dạng phủ định. Chủ ngữ là Her town - chỉ một người/vật nên là số ít.🏗️ Cấu trúc: \nS + have / has + O\nSoi vào câu này: Her town + doesn’t have + a big shopping center\nBảng chia:\nI - you - we - they, danh từ số nhiều → have\nhe - she - it, danh từ số ít → has\nChủ ngữ Her town ở số ít nên dùng doesn’t have.\nNhớ: chia theo CHỦ NGỮ, không theo tân ngữ phía sau.\nPhủ định don’t / doesn’t have; câu hỏi Do / Does + S + have? (sau đó have giữ nguyên thể).\nSau don’t / doesn’t thì have luôn ở nguyên thể, không bao giờ là has.\n Ví dụ: This city doesn’t have a zoo.🔍 Giải thích chi tiết: Chủ ngữ Her town ở số ít nên điền doesn’t have. Viết don’t have là sai về chủ ngữ, còn viết doesn’t has là sai vì sau doesn’t phải là nguyên thể. Luôn xác định chủ ngữ trước khi chọn don’t hay doesn’t.",
   "huongDan": "Fill in the blanks with don’t have or doesn’t have.",
   "choices": []
  },
  {
   "noi": "→ better →",
   "dap": "good · the best",
   "giai": "✅ Đáp án đúng: good - the best - good → better → the best (tốt, giỏi)📘 Ngữ cảnh: Cột này cho sẵn dạng hơn better - một dạng bất quy tắc, nhìn không ra tính từ gốc nếu chưa học thuộc.🏗️ Cấu trúc: \nA + be + the + tính từ so sánh nhất + in / of + phạm vi\nSoi vào câu này: Cái này / người này + is + the best\nBảng biến đổi:\ntính từ NGẮN → the + tính từ + -est (tall → the tallest)\ntính từ DÀI → the most + tính từ (the most careful)\nbất quy tắc: good → the best | bad → the worst\nỞ đây good là tính từ BẤT QUY TẮC nên dùng the best. Luôn có the, và không có than.\nSo sánh hơn của good là better - dùng khi so 2 đối tượng, có than, và không có the.🔍 Giải thích chi tiết: Từ better suy ra gốc là good (ô 1) và dạng nhất là the best (ô 2). Không có từ gooder hay goodest. Đây là bộ ba ra đề nhiều nhất, học chung với bad - worse - the worst ở cột kế bên.",
   "huongDan": "Write the missing words.",
   "choices": []
  },
  {
   "noi": "Ben is sleeping on his .",
   "dap": "desk",
   "giai": "✅ Đáp án đúng: desk📘 Ngữ cảnh: Tranh 2: Ben đang ngủ trên bàn học của mình.🏗️ Cấu trúc: \nTân ngữ đứng SAU động từ:\nS + is / are + V-ing + O\nSoi vào câu này: Ben is sleeping on his desk.\nis + sleeping là phần đã cho sẵn (một bạn nên chủ ngữ ở số ít), chỗ trống nằm cuối câu.\nChỗ trống nằm ở vị trí O (vật nhận hành động) → điền một danh từ.\nSau a thì danh từ ở số ít; sau his / her là đồ của người đó.🔍 Giải thích chi tiết: Phần Ben is sleeping on his đã cho sẵn nên không cần chia lại động từ, chỉ còn thiếu vật được nhắc tới. Nhìn tranh 2 thấy Ben đang ngủ trên bàn học của mình → điền desk. Đề yêu cầu one-word answer (đáp án một từ) nên chỉ viết desk, không viết lại cả câu và không thêm mạo từ hay tính từ sở hữu vì đề đã in sẵn phần đầu.",
   "huongDan": "Now complete the sentences. Write one-word answers about picture 2.",
   "choices": []
  },
  {
   "noi": "What did they do when they knew how to make fire?\nThey the meat and plants.",
   "dap": "cooked",
   "giai": "✅ Đáp án đúng: cooked - What did they do when they knew how to make fire? → They cooked the meat and plants. = Họ đã làm gì khi biết tạo ra lửa? - Họ nấu thịt và rau.📘 Ngữ cảnh: Bài viết: when they knew how to make fire, they cooked the meat and plants.🏗️ Cấu trúc: \nS + V2 (cột 2 - quá khứ) + O (động từ BẤT QUY TẮC)\nSoi vào câu này: cook (có quy tắc) → cooked (thêm -ed / -d)\nĐộng từ bất quy tắc KHÔNG thêm -ed - phải học thuộc từng từ.\nBảng các từ hay gặp:\ngo → went | eat → ate | drink → drank | take → took\nhave → had | see → saw | write → wrote | do → did\ncome → came | ride → rode | say → said | drive → drove\nget up → got up, wake up → woke up (chỉ đổi động từ chính, tiểu từ giữ nguyên)\nread → read: viết y hệt nhưng đọc khác (/riːd/ → /red/).\nV2 dùng chung cho mọi chủ ngữ; sau didn’t / Did thì quay về NGUYÊN THỂ.\nÁp công thức vào câu này: They + cooked + the meat and plants🔍 Giải thích chi tiết: Điền cooked - động từ có quy tắc, thêm -ed. Mệnh đề when they knew... cũng ở quá khứ, cho thấy cả câu kể chuyện đã qua.",
   "huongDan": "Now answer the questions about the text.Many, many years ago people did not have houses. They lived in caves. They got their food from animals and collected fruit from the plants around them. They ate",
   "choices": []
  },
  {
   "noi": "My name Kim.",
   "dap": "",
   "giai": "✅ Đáp án đúng: is📘 Ngữ cảnh: Chọn dạng đúng của to be cho chủ ngữ My name.🏗️ Cấu trúc:he / she / it và danh từ số ít đi với is.🔍 Giải thích chi tiết: My name là một danh từ số ít nên dùng is. Vì vậy câu đúng là: My name is …",
   "huongDan": "Underline the subject. Identify the correct verb tobe (is/ am/ are) and fill it in the blanks.",
   "choices": []
  }
 ],
 "single_choice": [
  {
   "noi": "My sister →",
   "dap": "",
   "giai": "✅ Đáp án đúng: She\nCâu hoàn chỉnh: My sister → She📘 Ngữ cảnh:\nBài yêu cầu: Match the subject pronouns with the correct noun. (Choose the correct pronoun for each noun.).\nCâu cần hoàn thành: My sister → ___\nChỗ trống cần một đại từ thay cho \"My sister\".🏗️ Cấu trúc: Đại từ nhân xưng thay cho danh từ đã nhắc tới, khỏi phải lặp lại:\nI = người đang nói\nYou = người nghe (hoặc nhóm có người nghe)\nWe = nhóm có cả người nói (… and I)\nThey = từ hai người / vật trở lên\nHe = một người nam\nShe = một người nữ\nIt = một đồ vật hoặc một con vật\nSoi vào câu này: My sister → She → My sister → She🔍 Giải thích chi tiết:\nĐiền She vì \"My sister\" là một người nữ.\nGhép lại thành: My sister → She.\nLỗi hay gặp: Xác định giới tính qua tên riêng hoặc từ chỉ quan hệ (mom, sister, aunt, Mrs …).",
   "huongDan": "Match the subject pronouns with the correct noun. (Choose the correct pronoun for each noun.)",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "The racket is on the shelf.",
   "dap": "",
   "giai": "✅ Đáp án đúng: F - The racket is on the shelf.📘 Ngữ cảnh: Câu nói cây vợt đặt trên kệ.🏗️ Cấu trúc: \nS + be + giới từ chỉ vị trí + danh từ\nSoi vào câu này: cây vợt + on + cái kệ → KHÔNG khớp với tranh → F\nBảng giới từ chỉ vị trí:\nin = bên TRONG (hồ, hộp, phòng) | on = TRÊN và có CHẠM bề mặt\nabove = phía trên, KHÔNG chạm | under = phía DƯỚI, trong gầm\nin front of = phía TRƯỚC | behind = phía SAU\nnext to = ngay BÊN CẠNH (= beside) | opposite = ĐỐI DIỆN, nhìn sang nhau\nbetween = ở GIỮA hai vật (luôn đi với and hoặc số two)\nBa cặp đối nghĩa cần thuộc: on - under | above - under | in front of - behind\nDễ nhầm nhất: on (chạm) với above (không chạm); next to (sát cạnh) với opposite (đối diện).🔍 Giải thích chi tiết: Chọn F. Cây vợt không nằm trên kệ. Nhớ on nghĩa là chạm vào bề mặt - phải nhìn kỹ xem vợt có thật sự đặt lên kệ không.",
   "huongDan": "Look at the picture. Write T (true) or F (false).",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "Peter is sitting his mother and father. They are watching TV.",
   "dap": "",
   "giai": "✅ Đáp án đúng: between - Peter is sitting between his mother and father. They are watching TV.📘 Ngữ cảnh: Câu nêu hai người: his mother and his father - Peter ngồi ở giữa hai người đó.🏗️ Cấu trúc: \nS + be + giới từ chỉ vị trí + danh từ\nSoi vào câu này: Peter + between + bố và mẹ\nBảng giới từ chỉ vị trí:\nin = bên TRONG (hồ, hộp, phòng) | on = TRÊN và có CHẠM bề mặt\nabove = phía trên, KHÔNG chạm | under = phía DƯỚI, trong gầm\nin front of = phía TRƯỚC | behind = phía SAU\nnext to = ngay BÊN CẠNH (= beside) | opposite = ĐỐI DIỆN, nhìn sang nhau\nbetween = ở GIỮA hai vật (luôn đi với and hoặc số two)\nBa cặp đối nghĩa cần thuộc: on - under | above - under | in front of - behind\nDễ nhầm nhất: on (chạm) với above (không chạm); next to (sát cạnh) với opposite (đối diện).🔍 Giải thích chi tiết: Chọn A. between. Dấu hiệu chắc chắn: sau chỗ trống có hai đối tượng nối bằng and. Loại opposite vì đó là ngồi đối diện, quay mặt vào nhau. Loại on vì Peter không ngồi lên người bố mẹ.",
   "huongDan": "Look at the picture. Circle the correct preposition of place.",
   "choices": [
    "",
    "",
    ""
   ]
  },
  {
   "noi": "A: What colour is the cat? \n B: black and white.",
   "dap": "",
   "giai": "✅ Đáp án đúng: It’s (câu 6)📘 Ngữ cảnh: Ở câu A: What colour is the cat? B: … black and white., the cat là một con nên trả lời bằng It’s.🏗️ Cấu trúc: \nCâu hỏi về màu sắc:\nWhat colour + is + danh từ số ít? What colour + are + danh từ số nhiều?\n What colour is the pen? What colour are your eyes?\nWhat hỏi về cái gì / màu gì ⟷ How hỏi về cách thức, mức độ\nWhere hỏi về nơi chốn - không dùng để hỏi màu\nTrả lời: một cái → It’s + màu nhiều cái → They’re + màu\n⛔ Tính từ chỉ màu không thêm -s và không có mạo từ đứng trước khi đứng một mình.\nSoi vào câu 6: the cat là một con nên trả lời bằng It’s → It’s🔍 Giải thích chi tiết: the cat là một con nên trả lời bằng It’s, nên câu 6 chọn It’s. Mẫu câu hỏi màu sắc gồm hai phần cần khớp nhau: từ để hỏi và động từ to be chia theo số. Từ để hỏi phải là What vì ta đang hỏi màu gì - How hỏi cách thức hoặc mức độ, Where hỏi nơi chốn, cả hai đều không dùng ở đây. Động từ thì nhìn danh từ ngay sau: số ít dùng is, số nhiều dùng are - và ngược lại, nếu câu đã cho sẵn are thì danh từ phải ở số nhiều (the dogs, không phải the dog). Phần trả lời cũng theo đúng nguyên tắc đó: It’s cho một vật, They’re cho nhiều vật. Hai lỗi cần tránh khi viết màu: không thêm -s vào",
   "huongDan": "Choose the correct answer to complete the sentence or question.",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "My brother breakfast at 7 a.m. every day.",
   "dap": "",
   "giai": "✅ Đáp án đúng: has (câu 12)📘 Ngữ cảnh: Ở câu My brother … breakfast at 7 a.m. every day., My brother là số ít nên dùng has.🏗️ Cấu trúc: \nhave / has ở hiện tại đơn:\nI / you / we / they → have he / she / it → has\nPhủ định: don’t have doesn’t have (sau doesn’t dùng have, không dùng has)\nCâu hỏi: Do + I/you/we/they + have…? Does + he/she/it + have…?\n⛔ Không có dạng haves.\n⛔ Không dùng to be thay cho have: is have, isn’t have đều sai.\n⛔ Danh từ số nhiều (my parents, my cousins, Mary and John) dùng have / don’t have / Do.\nSoi vào câu 12: My brother là số ít nên dùng has → has🔍 Giải thích chi tiết: My brother là số ít nên dùng has, nên câu 12 chọn has. Chỉ cần nhìn chủ ngữ là chia được: ngôi thứ ba số ít (he, she, it, tên riêng, danh từ số ít) dùng has, còn lại dùng have. Điểm khiến nhiều người sai nằm ở phủ định và câu hỏi: khi đã có doesn’t hay Does thì động từ chính quay về have, không bao giờ là has - doesn’t have, Does she have…?. Cũng nhớ rằng have ở đây là động từ thường, nên phủ định và câu hỏi phải mượn do / does, không dùng is / are - các phương án is have, isn’t have đều là dạng không tồn tại. Cuối cùng, tiếng Anh không có dạng haves, dù chủ ngữ là ngôi thứ ba số ít.",
   "huongDan": "Choose the correct answer (have / has / don't have / doesn't have / Do...have? / Does...have?).",
   "choices": [
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "(4) you alone?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Were - (4) Were you alone?📘 Ngữ cảnh: Đây là câu hỏi với chủ ngữ you, vẫn trong mạch chuyện quá khứ.🏗️ Cấu trúc: \nKhẳng định: S + was / were + ...\nPhủ định: S + wasn’t / weren’t + ...\nNghi vấn: Was / Were + S + ... ?\nSoi vào câu này: you + were → you + weren’t → Were + you ... ?\nBảng chia:\nI - he - she - it, danh từ số ít → was (phủ định wasn’t)\nyou - we - they, danh từ số nhiều → were (phủ định weren’t)\nThere was + danh từ số ít | There were + danh từ số nhiều\nDấu hiệu quá khứ: yesterday, last week / month / year, ... ago, in 2010.\nÁp công thức vào câu này: (4) + Were + you alone🔍 Giải thích chi tiết: Chọn Were (viết hoa vì đầu câu). Trong câu hỏi, động từ be đảo lên trước chủ ngữ. You luôn đi với were. Chọn Are sai thì; chọn Was sai chủ ngữ.",
   "huongDan": "Read the dialogue and choose the correct answer.Tom: Where (1) … you last night?Nick: I (2) … in an old house. It (3) … cold and dark.Tom: Where? In an old house? (4) … you alone?Nick: No, I (5) … . T",
   "choices": [
    "",
    "",
    ""
   ]
  },
  {
   "noi": "Is that your friend?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Yes, she is. - Is that your friend? Yes, she is. = Kia là bạn của bạn phải không? - Đúng vậy.📘 Ngữ cảnh: Câu hỏi về người (your friend) nên trả lời ngắn dùng he / she, không dùng it.🏗️ Cấu trúc: \nKhẳng định: S + be + ...\nPhủ định: S + be + not + ...\nNghi vấn: Be + S + ...?\nSoi vào câu này: Is + is / are → Is + isn’t / aren’t → Is / Are + Is ... ?\nBảng chia be: I → am | he / she / it → is | you / we / they → are\nTrả lời ngắn: Yes, + S + be. / No, + S + be + not. (câu Yes không viết tắt)\nHỏi về người thì đáp bằng he/she; hỏi về đồ vật mới đáp bằng it. Không lặp lại that. Ví dụ: Is that your sister? - Yes, she is.🔍 Giải thích chi tiết: Chọn Yes, she is. Yes, that is sai vì lặp lại that. Yes, he isn’t mâu thuẫn giữa Yes và isn’t.",
   "huongDan": "Choose the correct answer.",
   "choices": [
    "",
    "",
    ""
   ]
  },
  {
   "noi": "(3) I goodbye to my parents.",
   "dap": "",
   "giai": "✅ Đáp án đúng: said - (3) I said goodbye to my parents. = Tôi đã chào tạm biệt bố mẹ.📘 Ngữ cảnh: Chỗ trống đi với goodbye - cụm chỉ lời chào.🏗️ Cấu trúc: \nS + V2 (cột 2 - quá khứ) + O (động từ BẤT QUY TẮC)\nSoi vào câu này: say → said\nĐộng từ bất quy tắc KHÔNG thêm -ed - phải học thuộc từng từ.\nBảng các từ hay gặp:\ngo → went | eat → ate | drink → drank | take → took\nhave → had | see → saw | write → wrote | do → did\ncome → came | ride → rode | say → said | drive → drove\nget up → got up, wake up → woke up (chỉ đổi động từ chính, tiểu từ giữ nguyên)\nread → read: viết y hệt nhưng đọc khác (/riːd/ → /red/).\nV2 dùng chung cho mọi chủ ngữ; sau didn’t / Did thì quay về NGUYÊN THỂ.\nÁp công thức vào câu này: I + said + goodbye to my parents🔍 Giải thích chi tiết: Chọn said - cụm say goodbye to somebody. Chọn had và made không ghép được với goodbye. Quá khứ của say là said (bất quy tắc, đọc /sed/).",
   "huongDan": "Read and circle the correct answer.I got up and I (1) … a shower. I (2) … on my clothes and went downstairs to the kitchen. I had breakfast with my family. Then I took my coat from the hall cupboard. ",
   "choices": [
    "",
    "",
    ""
   ]
  },
  {
   "noi": "they have an English book?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Do (câu 10)📘 Ngữ cảnh: Ở câu … they have an English book?, chủ ngữ they nên câu hỏi dùng Do.🏗️ Cấu trúc: \nhave / has ở hiện tại đơn:\nI / you / we / they → have he / she / it → has\nPhủ định: don’t have doesn’t have (sau doesn’t dùng have, không dùng has)\nCâu hỏi: Do + I/you/we/they + have…? Does + he/she/it + have…?\n⛔ Không có dạng haves.\n⛔ Không dùng to be thay cho have: is have, isn’t have đều sai.\n⛔ Danh từ số nhiều (my parents, my cousins, Mary and John) dùng have / don’t have / Do.\nSoi vào câu 10: chủ ngữ they nên câu hỏi dùng Do → Do🔍 Giải thích chi tiết: Chủ ngữ they nên câu hỏi dùng Do, nên câu 10 chọn Do. Chỉ cần nhìn chủ ngữ là chia được: ngôi thứ ba số ít (he, she, it, tên riêng, danh từ số ít) dùng has, còn lại dùng have. Điểm khiến nhiều người sai nằm ở phủ định và câu hỏi: khi đã có doesn’t hay Does thì động từ chính quay về have, không bao giờ là has - doesn’t have, Does she have…?. Cũng nhớ rằng have ở đây là động từ thường, nên phủ định và câu hỏi phải mượn do / does, không dùng is / are - các phương án is have, isn’t have đều là dạng không tồn tại. Cuối cùng, tiếng Anh không có dạng haves, dù chủ ngữ là ngôi thứ ba số ít.",
   "huongDan": "Choose the correct answer (have / has / don't have / doesn't have / Do...have? / Does...have?).",
   "choices": [
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "In this story, scrape means .",
   "dap": "",
   "giai": "✅ Đáp án đúng: to gnaw at something - In this story, scrape means … .📘 Ngữ cảnh: Câu hỏi về nghĩa của từ scrape trong bài. Bài viết They wet the food and scrape at it with their jaws (hàm).🏗️ Cấu trúc: \nCách làm bài đọc hiểu trắc nghiệm:\n1. Đọc câu hỏi, gạch chân từ khoá\n2. Tìm đúng câu chứa từ khoá đó trong bài\n3. So từng phương án với câu vừa tìm - loại dần\n4. Câu hỏi Why: lý do thường nằm ngay câu sau hoặc sau liên từ so / because\n5. Câu hỏi nghĩa của từ: nhìn các từ đứng cạnh nó để đoán\nSoi câu này: In this story, scrape means … . → to gnaw at something🔍 Giải thích chi tiết: Chọn A. to gnaw at something (gặm, nhấm). Manh mối là từ jaws (hàm) - dùng hàm tác động vào thức ăn thì là gặm. Loại drink vì bài nói wet the food chứ không phải uống. Mẹo đoán nghĩa từ mới: nhìn từ đứng cạnh nó trong câu.",
   "huongDan": "Read the story and answer the questions.MillipedesThe millipede is small but strong. It can have between 80 and 400 legs!Millipedes walk slowly, but they can dig long tunnels. They wave their legs and",
   "choices": [
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "some apples in the fridge.",
   "dap": "",
   "giai": "✅ Đáp án đúng: There are\nCâu hoàn chỉnh: There are some apples in the fridge.📘 Ngữ cảnh:\nBài yêu cầu: Circle the correct answer.\nCâu cần hoàn thành: ___ some apples in the fridge.\nChỗ trống cần There + to be. Danh từ theo sau là \"apples\" - đây là danh từ số nhiều.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít / danh từ KHÔNG đếm được (There is a book. - There is some milk.)\nThere are + danh từ số nhiều (There are three books.)\nPhủ định: There isn’t / There aren’t\nNghi vấn: Is there … ? / Are there … ? Trả lời ngắn: Yes, there is. / No, there aren’t.\nSoi vào câu này: There are + apples (danh từ số nhiều) → some apples in the fridge.🔍 Giải thích chi tiết:\nĐiền There are vì apples là danh từ số nhiều, mà are đi với danh từ số nhiều.\nLỗi hay gặp: Danh từ số nhiều đi với are và không dùng a / an.",
   "huongDan": "Circle the correct answer.",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "a tree →",
   "dap": "",
   "giai": "✅ Đáp án đúng: It\nCâu hoàn chỉnh: a tree → It📘 Ngữ cảnh:\nBài yêu cầu: Write the suitable pronoun for each noun.\nCâu cần hoàn thành: a tree → ___\nChỗ trống cần một đại từ thay cho \"a tree\".🏗️ Cấu trúc: Đại từ nhân xưng thay cho danh từ đã nhắc tới, khỏi phải lặp lại:\nI = người đang nói\nYou = người nghe (hoặc nhóm có người nghe)\nWe = nhóm có cả người nói (… and I)\nThey = từ hai người / vật trở lên\nHe = một người nam\nShe = một người nữ\nIt = một đồ vật hoặc một con vật\nSoi vào câu này: a tree → It → a tree → It🔍 Giải thích chi tiết:\nĐiền It vì \"a tree\" là một đồ vật hoặc một con vật.\nGhép lại thành: a tree → It.\nLỗi hay gặp: Đồ vật và con vật đều dùng It, không phân biệt đực cái.",
   "huongDan": "Write the suitable pronoun for each noun.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "Ann: Was there a party yesterday?\nBob: .",
   "dap": "",
   "giai": "✅ Đáp án đúng: Yes, there was - Ann: Was there a party yesterday? Bob: Yes, there was . = Hôm qua có tiệc không? - Có.📘 Ngữ cảnh: Câu hỏi dùng Was there...? nên câu trả lời cũng phải lặp lại cấu trúc there + be.🏗️ Cấu trúc: \nKhẳng định: S + was / were + ...\nPhủ định: S + wasn’t / weren’t + ...\nNghi vấn: Was / Were + S + ... ?\nSoi vào câu này: there + was → there + wasn’t → Was + there ... ?\nBảng chia:\nI - he - she - it, danh từ số ít → was (phủ định wasn’t)\nyou - we - they, danh từ số nhiều → were (phủ định weren’t)\nThere was + danh từ số ít | There were + danh từ số nhiều\nDấu hiệu quá khứ: yesterday, last week / month / year, ... ago, in 2010.\nÁp công thức vào câu này: there + was + Bob: …🔍 Giải thích chi tiết: Chọn Yes, there was. Chọn No, there weren’t sai số (a party là số ít nên phải là wasn’t) và cũng mâu thuẫn nếu muốn đáp No. Chọn Yes, it was sai vì hỏi bằng there thì phải đáp bằng there, không đổi sang it.",
   "huongDan": "Circle the correct answer.",
   "choices": [
    "",
    "",
    ""
   ]
  },
  {
   "noi": "There is onion on the basket.",
   "dap": "",
   "giai": "✅ Đáp án đúng: an\nCâu hoàn chỉnh: There is an onion on the basket.📘 Ngữ cảnh:\nBài yêu cầu: Circle the correct answer.\nCâu cần hoàn thành: There is ___ onion on the basket.\nChỗ trống cần một mạo từ đứng trước \"onion\".🏗️ Cấu trúc: Mạo từ đứng trước danh từ:\na + danh từ đếm được SỐ ÍT, bắt đầu bằng âm PHỤ ÂM (a book, a teacher)\nan + danh từ đếm được SỐ ÍT, bắt đầu bằng âm NGUYÊN ÂM (an apple, an egg, an orange)\nthe + người / vật CỤ THỂ mà người nghe đã biết là cái nào (the book on my desk)\nsome + danh từ SỐ NHIỀU hoặc danh từ KHÔNG đếm được (some books, some milk)\nXét theo ÂM ĐỌC chứ không theo chữ viết: an hour (h câm), a university (đọc /juː/).\nMạo từ đi theo từ đứng LIỀN SAU nó, kể cả khi đó là tính từ: a bike nhưng an old bike.\nSoi vào câu này: an + onion on the basket🔍 Giải thích chi tiết:\nĐiền an vì từ đứng liền sau là onion, bắt đầu bằng âm NGUYÊN ÂM nên dùng an. \nGhi nhớ: a / an chỉ dùng cho danh từ đếm được số ít; danh từ số nhiều và danh từ không đếm được thì dùng some hoặc để trần.",
   "huongDan": "Circle the correct answer.",
   "choices": [
    "",
    "",
    ""
   ]
  },
  {
   "noi": "John and Peter share bedroom.",
   "dap": "",
   "giai": "✅ Đáp án đúng: their - John and Peter share their bedroom.📘 Ngữ cảnh: Chủ điểm: Tính từ sở hữu. Trước danh từ bedroom cần một từ chỉ của ai. Chủ ngữ John and Peter là hai người.🏗️ Cấu trúc: \nBài ôn tổng hợp - nhận diện chủ điểm trước khi chọn:\nThere is / are: is cho danh từ không đếm được và số ít | are cho số nhiều\nMạo từ: a / an cho lần đầu nhắc tới | the khi đã biết là cái nào\nSome / Any: some cho câu khẳng định và câu mời mọc | any cho phủ định, nghi vấn\nSố nhiều bất quy tắc: mouse → mice | child → children | goose → geese\nTính từ sở hữu: my - your - his - her - its - our - their (đứng TRƯỚC danh từ)\nĐại từ tân ngữ: me - you - him - her - it - us - them (đứng SAU động từ / giới từ)\nSở hữu cách: số ít ’s (sister’s) | số nhiều s’ (sisters’)\nlike / love + V-ing | Liên từ: and - but - or - so\nSoi câu này: chủ điểm Tính từ sở hữu → John and Peter share their bedroom.🔍 Giải thích chi tiết: Chọn A. their. their là tính từ sở hữu (của họ), đứng trước danh từ. Loại they (đại từ chủ ngữ) và them (đại từ tân ngữ) vì hai từ đó không đứng trước danh từ được. Loại its vì dùng cho vật/con vật số ít.",
   "huongDan": "Circle the correct answer.",
   "choices": [
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "There is some tea and cakes it.",
   "dap": "",
   "giai": "✅ Đáp án đúng: on - There is some tea and cakes on it.📘 Ngữ cảnh: Trà và bánh đặt chạm lên mặt bàn. Đại từ it thay cho the coffee table ở câu trước.🏗️ Cấu trúc: \nS + be + giới từ chỉ vị trí + danh từ\nSoi vào câu này: trà và bánh + on + mặt bàn\nBảng giới từ chỉ vị trí:\nin = bên TRONG (hồ, hộp, phòng) | on = TRÊN và có CHẠM bề mặt\nabove = phía trên, KHÔNG chạm | under = phía DƯỚI, trong gầm\nin front of = phía TRƯỚC | behind = phía SAU\nnext to = ngay BÊN CẠNH (= beside) | opposite = ĐỐI DIỆN, nhìn sang nhau\nbetween = ở GIỮA hai vật (luôn đi với and hoặc số two)\nBa cặp đối nghĩa cần thuộc: on - under | above - under | in front of - behind\nDễ nhầm nhất: on (chạm) với above (không chạm); next to (sát cạnh) với opposite (đối diện).🔍 Giải thích chi tiết: Chọn A. on. Loại in vì đồ ăn không nằm bên trong cái bàn. Loại near vì near chỉ nghĩa ở gần, không nói rõ là đặt trên mặt bàn. on = chạm bề mặt.",
   "huongDan": "Look at the picture. Circle the correct preposition of place.",
   "choices": [
    "",
    "",
    ""
   ]
  },
  {
   "noi": "Annie’s school is a museum and a park.",
   "dap": "",
   "giai": "✅ Đáp án đúng: between - Annie’s school is between a museum and a park.📘 Ngữ cảnh: Chủ điểm: Giới từ vị trí. Câu nêu hai địa điểm: a museum and a park.🏗️ Cấu trúc: \nBài ôn tổng hợp - nhận diện chủ điểm trước khi chọn:\nMạo từ: a (phụ âm) - an (nguyên âm) - the (duy nhất / đã nhắc tới)\nSome / Any: some cho câu khẳng định | any cho câu phủ định, nghi vấn\nTừ chỉ định: this (ít, gần) - that (ít, xa) - these (nhiều, gần) - those (nhiều, xa)\nSo sánh: hơn = -er / more + than | nhất = the + -est / most\nlike + V-ing (love, hate, enjoy cũng vậy)\nbetween = giữa hai vật (luôn có and)\nLiên từ: and (cùng chiều) - but (ngược) - or (chọn) - so (kết quả)\nTừ để hỏi: đọc câu trả lời rồi suy ngược lại\nSoi câu này: chủ điểm Giới từ vị trí → Annie’s school is between a museum and a park.🔍 Giải thích chi tiết: Chọn C. between. Dấu hiệu chắc chắn: có hai danh từ nối bằng and. Loại next to vì đó chỉ nói sát bên cạnh một vật, không nói ở giữa hai vật.",
   "huongDan": "Circle the correct answer.",
   "choices": [
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "He opened the door, walked in, and turned on the lights.",
   "dap": "",
   "giai": "✅ Đáp án đúng: các hành động xảy ra liên tiếp trong quá khứ - He opened the door, walked in, and turned on the lights. = Anh ấy mở cửa, bước vào rồi bật đèn.📘 Ngữ cảnh: Câu có ba động từ nối tiếp (opened → walked → turned on) theo đúng trình tự.🏗️ Cấu trúc: \nThì quá khứ đơn dùng cho 3 trường hợp:\n1) hành động đã xong → James called me yesterday.\n2) thói quen trong quá khứ → I played outside every afternoon.\n3) hành động liên tiếp → She came, changed, and cooked.\nBảng dấu hiệu nhận biết:\nmột động từ + mốc cụ thể (yesterday, last week, ago) → hành động đã xong\ncó từ every + mốc quá khứ → thói quen\nnhiều động từ nối bằng dấu phẩy và and → liên tiếp\nÁp vào câu này: He opened the door, walked in, and turned on the lights. → các hành động xảy ra liên tiếp trong quá khứ🔍 Giải thích chi tiết: Chọn các hành động xảy ra liên tiếp trong quá khứ. Cùng nhóm với câu về She came home...: cứ thấy chuỗi động từ nối bằng dấu phẩy và and thì đó là hành động liên tiếp. Đổi thứ tự các động từ là đổi nghĩa cả câu.",
   "huongDan": "Match each sentence with its correct use.",
   "choices": [
    "",
    "",
    ""
   ]
  },
  {
   "noi": "Is that your ruler?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Yes, it is. - Is that your ruler? Yes, it is. = Kia là thước kẻ của bạn phải không? - Đúng vậy.📘 Ngữ cảnh: Câu hỏi dùng that và hỏi về đồ vật nên trả lời ngắn dùng it.🏗️ Cấu trúc: \nS + like / love / hate + V-ing\nSoi vào câu này: (chủ ngữ) + like / love / hate + V-ing\nChủ ngữ he / she / it và danh từ số ít → động từ cảm xúc thêm -s (likes, loves, hates).\nPhủ định: S + don’t / doesn’t + like + V-ing (sau don’t/doesn’t thì không chia nữa).\nCâu hỏi: Do / Does + S + like + V-ing?\nCách thêm -ing: thường thêm thẳng (play → playing); bỏ -e (ride → riding); gấp đôi phụ âm (swim → swimming).\nTrả lời ngắn cho đồ vật số ít: Yes, it is. / No, it isn’t. Không lặp lại that. Ví dụ: Is that your bag? - Yes, it is.🔍 Giải thích chi tiết: Chọn Yes, it is. Yes, that is sai vì lặp lại that. Yes, it isn’t mâu thuẫn giữa Yes và isn’t. So với câu ngay trên: câu đó hỏi these (số nhiều) nên đáp they, câu này hỏi that (số ít, đồ vật) nên đáp it.",
   "huongDan": "Choose the correct answer.",
   "choices": [
    "",
    "",
    ""
   ]
  },
  {
   "noi": "It a lot in the summer.",
   "dap": "",
   "giai": "✅ Đáp án đúng: doesn’t rain - It doesn’t rain a lot in the summer. = Trời không mưa nhiều vào mùa hè.📘 Ngữ cảnh: Chủ ngữ It dùng cho thời tiết và luôn ở số ít.🏗️ Cấu trúc: \nPhủ định: S + don’t / doesn’t + V (nguyên thể)\nNghi vấn: Do / Does + S + V (nguyên thể) ?\nSoi vào câu này: It + doesn’t + rain\nBảng chọn trợ động từ:\nI - you - we - they, số nhiều → do / don’t\nhe - she - it, số ít → does / doesn’t\nChủ ngữ It ở số ít nên dùng doesn’t.\nSau do / does / don’t / doesn’t, động từ giữ NGUYÊN THỂ - phần -s đã nằm ở does.\nTrả lời ngắn: Yes, + S + do / does. / No, + S + don’t / doesn’t.🔍 Giải thích chi tiết: Chọn doesn’t rain. Chọn don’t rain sai vì It thuộc nhóm he / she / it → dùng doesn’t. Chọn isn’t rain sai vì động từ be không đi cùng động từ thường ở nguyên thể.",
   "huongDan": "Circle the correct answer.",
   "choices": [
    "",
    "",
    ""
   ]
  },
  {
   "noi": "Ngoc Anh →",
   "dap": "",
   "giai": "✅ Đáp án đúng: She📘 Ngữ cảnh: Thay Ngoc Anh bằng đại từ.🏗️ Cấu trúc:Một người nữ thay bằng She.🔍 Giải thích chi tiết: Ngoc Anh là một bạn nữ nên thay bằng She. Vì vậy đáp án là: She.",
   "huongDan": "Match. (Choose the correct pronoun.)",
   "choices": [
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "Let’s go to the park. It at the moment.",
   "dap": "",
   "giai": "✅ Đáp án đúng: isn’t raining - Let’s go to the park. It isn’t raining at the moment.📘 Ngữ cảnh: Cụm at the moment là dấu hiệu hiện tại tiếp diễn. Chủ ngữ It dùng cho thời tiết.🏗️ Cấu trúc: \nHiện tại ĐƠN: S + V (-s / -es) → việc lặp đi lặp lại, sự thật\nHiện tại TIẾP DIỄN: S + am / is / are + V-ing → việc đang xảy ra lúc này\nBảng dấu hiệu nhận biết:\nĐƠN: every day / week - always, usually, often, sometimes, never\n on Mondays - lịch trình cố định - sự thật hiển nhiên\nTIẾP DIỄN: now - right now - at the moment - at present - today\n Look! - Listen! - Watch out! - Be quiet!\nPhủ định / nghi vấn:\nĐƠN: don’t / doesn’t + V | Do / Does + S + V ?\nTIẾP DIỄN: am / is / aren’t + V-ing | Am / Is / Are + S + V-ing ?\nLưu ý: không trộn hai thì - đã dùng be thì phải có V-ing, đã dùng do/does thì động từ để nguyên thể.\nSoi vào câu này: Let’s go to the park. It isn’t raining at the moment.🔍 Giải thích chi tiết: Chọn B. isn’t raining. Loại doesn’t rain vì sai thì. Loại not raining vì thiếu động từ be - phủ định phải là is + not + V-ing. Câu đầu Let’s go to the park gợi ý trời đang tạnh.",
   "huongDan": "Circle the correct answer.",
   "choices": [
    "",
    "",
    ""
   ]
  },
  {
   "noi": "Dad often drinks beer with his friends.",
   "dap": "",
   "giai": "✅ Đáp án đúng: some\nCâu hoàn chỉnh: Dad often drinks some beer with his friends.📘 Ngữ cảnh:\nBài yêu cầu: Circle the correct answer.\nCâu cần hoàn thành: Dad often drinks ___ beer with his friends.\nChỗ trống cần một mạo từ đứng trước \"beer\".🏗️ Cấu trúc: Mạo từ đứng trước danh từ:\na + danh từ đếm được SỐ ÍT, bắt đầu bằng âm PHỤ ÂM (a book, a teacher)\nan + danh từ đếm được SỐ ÍT, bắt đầu bằng âm NGUYÊN ÂM (an apple, an egg, an orange)\nthe + người / vật CỤ THỂ mà người nghe đã biết là cái nào (the book on my desk)\nsome + danh từ SỐ NHIỀU hoặc danh từ KHÔNG đếm được (some books, some milk)\nXét theo ÂM ĐỌC chứ không theo chữ viết: an hour (h câm), a university (đọc /juː/).\nMạo từ đi theo từ đứng LIỀN SAU nó, kể cả khi đó là tính từ: a bike nhưng an old bike.\nSoi vào câu này: some + beer with his friends🔍 Giải thích chi tiết:\nĐiền some vì beer là danh từ không đếm được, mà a / an chỉ dùng cho danh từ đếm được số ít.\nGhi nhớ: a / an chỉ dùng cho danh từ đếm được số ít; danh từ số nhiều và danh từ không đếm được thì dùng some hoặc để trần.",
   "huongDan": "Circle the correct answer.",
   "choices": [
    "",
    "",
    ""
   ]
  },
  {
   "noi": "The children always play football after school.",
   "dap": "",
   "giai": "✅ Đáp án đúng: A: Present simple - động từ play📘 Ngữ cảnh: Trạng từ always (luôn luôn) cho biết đây là thói quen lặp đi lặp lại, không phải việc đang xảy ra.🏗️ Cấu trúc: \nHiện tại ĐƠN: S + V (-s / -es) → việc lặp đi lặp lại, sự thật\nHiện tại TIẾP DIỄN: S + am / is / are + V-ing → việc đang xảy ra lúc này\nBảng dấu hiệu nhận biết:\nĐƠN: every day / week - always, usually, often, sometimes, never\n on Mondays - lịch trình cố định - sự thật hiển nhiên\nTIẾP DIỄN: now - right now - at the moment - at present - today\n Look! - Listen! - Watch out! - Be quiet!\nPhủ định / nghi vấn:\nĐƠN: don’t / doesn’t + V | Do / Does + S + V ?\nTIẾP DIỄN: am / is / aren’t + V-ing | Am / Is / Are + S + V-ing ?\nLưu ý: không trộn hai thì - đã dùng be thì phải có V-ing, đã dùng do/does thì động từ để nguyên thể.\nSoi vào câu này: động từ play - dấu hiệu always → A: Present simple🔍 Giải thích chi tiết: Chọn A: Present simple. Các trạng từ tần suất always, usually, often, sometimes, never luôn đi với hiện tại đơn. Động từ để nguyên thể play vì The children số nhiều.",
   "huongDan": "Underline the verb in each sentence. Write A: Present simple or B: Present continuous.",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "I see three .",
   "dap": "",
   "giai": "✅ Đáp án đúng: dogs📘 Ngữ cảnh: Nói thứ nhìn thấy: \"Tôi thấy ba con chó.\"🏗️ Cấu trúc:Số đếm lớn hơn 1 + danh từ SỐ NHIỀUthêm -s.🔍 Giải thích chi tiết: Phía trước có số three nên danh từ phải ở số nhiều, thêm -s thành dogs. Vì vậy câu đúng là: … three dogs …",
   "huongDan": "Choose the correct word.",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "What are these animals?",
   "dap": "",
   "giai": "✅ Đáp án đúng: They are cats. - What are these animals?📘 Ngữ cảnh: Từ để hỏi là What (cái gì) - hỏi về sự vật. Động từ trong câu hỏi là are vì these animals ở số nhiều.🏗️ Cấu trúc: \nTừ để hỏi + do / does / be + S + V ... ?\nSoi vào câu này: What + are + these animals ?\nBảng từ để hỏi:\nWhat = cái gì | Who = ai | Where = ở đâu\nWhen = khi nào | Why = tại sao | How = thế nào\nWhich = cái nào (chọn trong số) | Whose = của ai\nChọn trợ động từ theo động từ chính:\nđộng từ be → đảo is / are lên ngay sau từ để hỏi (Where is your bag?)\nđộng từ thường → dùng do / does, động từ giữ nguyên thể (Where do you live?)🔍 Giải thích chi tiết: Chọn They are cats. Hỏi bằng What về con vật thì câu trả lời phải nêu tên loài vật. Đại từ They thay cho these animals (số nhiều). Các đáp án khác nói về thời tiết, nơi ở, lý do - không trả lời cho What.",
   "huongDan": "Underline the question word in each question and choose the correct answer.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "Eraser →",
   "dap": "",
   "giai": "✅ Đáp án đúng: It📘 Ngữ cảnh: Thay danh từ Eraser bằng đại từ.🏗️ Cấu trúc:Một đồ vật hoặc con vật thay bằng It.🔍 Giải thích chi tiết: Eraser là một đồ vật nên thay bằng It. Vì vậy đáp án là: It.",
   "huongDan": "Replace the nouns by the correct pronouns.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "some milk in the glass.",
   "dap": "",
   "giai": "✅ Đáp án đúng: There is📘 Ngữ cảnh: Nói có gì ở đâu, danh từ là some milk.🏗️ Cấu trúc:There is + danh từ số ít hoặc không đếm được.There are + danh từ số nhiều.🔍 Giải thích chi tiết: some milk là không đếm được nên dùng There is. Vì vậy câu đúng là: There is some milk in the glass.",
   "huongDan": "Circle the correct answer.",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "My brother with toy cars.",
   "dap": "",
   "giai": "✅ Đáp án đúng: plays - My brother plays with toy cars. = Anh trai tôi chơi với những chiếc ô tô đồ chơi.📘 Ngữ cảnh: Chủ ngữ My brother chỉ một người → số ít. Đây là câu khẳng định (không có dấu hiệu phủ định nào).🏗️ Cấu trúc: \nS + V (-s / -es) + O (thì hiện tại đơn)\nSoi vào câu này: My brother + plays + ...\nBảng chia động từ:\nI - you - we - they, danh từ số nhiều → V nguyên thể (they play)\nhe - she - it, danh từ số ít → V + -s / -es (he plays)\nChủ ngữ My brother ở số ít ngôi thứ ba nên dùng plays.\nCách thêm đuôi: thường +s; tận cùng s, x, ch, sh, o → +es (watch → watches);\ntận cùng -y sau phụ âm → đổi thành -ies (study → studies), sau nguyên âm thì giữ y (play → plays).🔍 Giải thích chi tiết: Chọn plays - chủ ngữ số ít nên động từ thêm -s. Chọn not play sai vì chữ not không đứng một mình với động từ thường. Chọn doesn’t plays sai vì sau doesn’t động từ phải ở nguyên thể.",
   "huongDan": "Circle the correct answer.",
   "choices": [
    "",
    "",
    ""
   ]
  },
  {
   "noi": "Today is Sunday, we aren’t going to school.",
   "dap": "",
   "giai": "✅ Đáp án đúng: so - Today is Sunday, so we aren’t going to school.📘 Ngữ cảnh: Chủ điểm: Liên từ. Vế đầu hôm nay là Chủ nhật là nguyên nhân, vế sau không đi học là kết quả.🏗️ Cấu trúc: \nBài ôn tổng hợp - nhận diện chủ điểm trước khi chọn:\nThere is / are: is cho danh từ không đếm được và số ít | are cho số nhiều\nMạo từ: a / an cho lần đầu nhắc tới | the khi đã biết là cái nào\nSome / Any: some cho câu khẳng định và câu mời mọc | any cho phủ định, nghi vấn\nSố nhiều bất quy tắc: mouse → mice | child → children | goose → geese\nTính từ sở hữu: my - your - his - her - its - our - their (đứng TRƯỚC danh từ)\nĐại từ tân ngữ: me - you - him - her - it - us - them (đứng SAU động từ / giới từ)\nSở hữu cách: số ít ’s (sister’s) | số nhiều s’ (sisters’)\nlike / love + V-ing | Liên từ: and - but - or - so\nSoi câu này: chủ điểm Liên từ → Today is Sunday, so we aren’t going to school.🔍 Giải thích chi tiết: Chọn D. so. Chủ nhật nên mới được nghỉ - quan hệ nhân quả hợp lý. Loại but vì nghỉ học ngày Chủ nhật là chuyện đương nhiên, không hề trái ngược.",
   "huongDan": "Circle the correct answer.",
   "choices": [
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "What happened last?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Suki wrote back to her friend.📘 Ngữ cảnh: Bài viết liệt kê các việc theo đúng thứ tự: got an e-mail → went to talk to her mom → looked at the calendar → wrote back.🏗️ Cấu trúc: \nCách làm câu hỏi đọc hiểu suy luận:\n1) liệt kê các hành động trong bài theo đúng thứ tự\n2) với câu hỏi what happened last → lấy hành động cuối cùng\n3) với câu hỏi why / most likely true → tìm chi tiết gợi ý (ở đây là looked at the calendar)\n4) loại đáp án nói về thứ chỉ xuất hiện một lần hoặc không có trong bài\nÁp vào câu này: What happened last? → Suki wrote back to her friend.🔍 Giải thích chi tiết: Chọn Suki wrote back to her friend. - đây là việc cuối cùng trong chuỗi. Chọn Suki got an e-mail là việc đầu tiên; Suki talked to her mom là việc thứ hai. Với câu hỏi về trình tự, hãy đánh số các động từ quá khứ theo thứ tự xuất hiện trong bài.",
   "huongDan": "Read and choose the correct answer.You’ve got mail!Suki got an e-mail from her friend, Annie. The e-mail made Suki happy. She went to talk to her mom. Then she looked at the calendar. Suki wrote back ",
   "choices": [
    "",
    "",
    ""
   ]
  },
  {
   "noi": "One boy is wearing a long coat.",
   "dap": "",
   "giai": "✅ Đáp án đúng: No - One boy is wearing a long coat.📘 Ngữ cảnh: Câu nói có một bạn trai đang mặc áo khoác dài. Chú ý cụm a long coat.🏗️ Cấu trúc: \nĐối chiếu câu với tranh theo 3 bước:\n1. Ai / cái gì? → tìm đúng chủ ngữ trong tranh\n2. Đang làm gì? → xét động từ V-ing\n3. Ở đâu / như thế nào? → xét phần còn lại (nơi chốn, màu sắc, kích cỡ, số lượng)\nSoi câu này theo 3 bước:\n1. Ai / cái gì? one boy (một bạn trai)\n2. Đang làm gì? is wearing (đang mặc)\n3. Chi tiết còn lại: a long coat (áo khoác dài) ← bước LỆCH với tranh\nBước 3 không khớp tranh → trả lời No.\nSoi vào câu này: One boy is wearing a long coat. → No🔍 Giải thích chi tiết: Chọn No. Không có bạn nào mặc áo khoác dài trong tranh. Lưu ý wear ở đây nghĩa là đang mặc trên người, không phải hành động mặc vào.",
   "huongDan": "Look and read. Write Yes or No.",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "Anteaters climb trees using their .",
   "dap": "",
   "giai": "✅ Đáp án đúng: claws - Anteaters climb trees using their … .📘 Ngữ cảnh: Câu hỏi về bộ phận dùng để trèo cây. Bài viết Anteaters have sharp claws. They can climb trees.🏗️ Cấu trúc: \nCách làm bài đọc hiểu trắc nghiệm:\n1. Đọc câu hỏi, gạch chân từ khoá\n2. Tìm đúng câu chứa từ khoá đó trong bài\n3. So từng phương án với bài - loại dần\n4. Cẩn thận đáp án nhiễu: từ có trong bài nhưng nói về việc khác\n (vd bài có cả claws và tongues, nhưng chỉ claws dùng để trèo cây)\nSoi câu này: Anteaters climb trees using their … . → claws🔍 Giải thích chi tiết: Chọn D. claws. Hai câu liền nhau trong bài: có móng vuốt sắc → trèo được cây. Loại tongues vì lưỡi dùng để lấy thức ăn, không phải để trèo - đây là bẫy vì cả hai bộ phận đều được nhắc trong bài.",
   "huongDan": "Read and choose the correct answer.AnteaterWhat animal likes to eat ants? An anteater, of course!Anteaters like swamps and forests. They live in South America. They like hot weather.Anteaters have sha",
   "choices": [
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "The children are playing in a park.",
   "dap": "",
   "giai": "✅ Đáp án đúng: Yes - The children are playing in a park.📘 Ngữ cảnh: Câu nói bọn trẻ đang chơi trong công viên. Cần kiểm tra cả hành động (playing) lẫn địa điểm (in a park) trên tranh.🏗️ Cấu trúc: \nĐối chiếu câu với tranh theo 3 bước:\n1. Ai / cái gì? → tìm đúng chủ ngữ trong tranh\n2. Đang làm gì? → xét động từ V-ing\n3. Ở đâu / như thế nào? → xét phần còn lại (nơi chốn, màu sắc, kích cỡ, số lượng)\nSoi câu này theo 3 bước:\n1. Ai / cái gì? the children (bọn trẻ)\n2. Đang làm gì? are playing (đang chơi)\n3. Chi tiết còn lại: in a park (trong công viên)\nCả 3 bước đều khớp tranh → trả lời Yes.\nSoi vào câu này: The children are playing in a park. → Yes🔍 Giải thích chi tiết: Chọn Yes. Tranh vẽ khung cảnh công viên có cây cỏ và bọn trẻ đang chơi đùa - cả hành động và địa điểm đều khớp.",
   "huongDan": "Look and read. Write Yes or No.",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "The pillow is behind the sofa.",
   "dap": "",
   "giai": "✅ Đáp án đúng: F - The pillow is behind the sofa.📘 Ngữ cảnh: Câu nói cái gối phía sau ghế sofa.🏗️ Cấu trúc: \nS + be + giới từ chỉ vị trí + danh từ\nSoi vào câu này: cái gối + behind + ghế sofa → KHÔNG khớp với tranh → F\nBảng giới từ chỉ vị trí:\nin = bên TRONG (hồ, hộp, phòng) | on = TRÊN và có CHẠM bề mặt\nabove = phía trên, KHÔNG chạm | under = phía DƯỚI, trong gầm\nin front of = phía TRƯỚC | behind = phía SAU\nnext to = ngay BÊN CẠNH (= beside) | opposite = ĐỐI DIỆN, nhìn sang nhau\nbetween = ở GIỮA hai vật (luôn đi với and hoặc số two)\nBa cặp đối nghĩa cần thuộc: on - under | above - under | in front of - behind\nDễ nhầm nhất: on (chạm) với above (không chạm); next to (sát cạnh) với opposite (đối diện).🔍 Giải thích chi tiết: Chọn F. Gối nằm trên ghế sofa chứ không rơi ra sau lưng ghế. Cặp dễ nhầm: on (trên ghế) và behind (sau lưng ghế).",
   "huongDan": "Look at the picture. Write T (true) or F (false).",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "My sister drinks milk for breakfast.",
   "dap": "",
   "giai": "✅ Đáp án đúng: often - My sister often drinks milk for breakfast. = Chị tôi thường uống sữa vào bữa sáng.📘 Ngữ cảnh: Biểu đồ cho thấy mức khoảng 70% - thường xuyên nhưng chưa tới mức usually.🏗️ Cấu trúc: \nS + trạng từ tần suất + V (động từ thường)\nS + be + trạng từ tần suất (đứng SAU be)\nSoi vào câu này: My sister + often + drinks + ...\nThang tần suất (từ nhiều đến ít):\nalways 100% → usually ~90% → often ~70% → sometimes ~50% → never 0%\nTrong câu hỏi vị trí không đổi: Do / Does + S + trạng từ + V ?\nTrạng từ tần suất không làm đổi cách chia động từ - vẫn thêm -s cho he / she / it.🔍 Giải thích chi tiết: Chọn often (~70%). Trạng từ đứng trước động từ drinks, và động từ vẫn giữ đuôi -s vì My sister là số ít. Đây là câu để đối chiếu với sometimes (~50%) ở trên - hai mức gần nhau nên phải nhìn kỹ biểu đồ.",
   "huongDan": "Look at the chart. Then choose the correct adverb of frequency.",
   "choices": [
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "Where Kyle and his mom live?",
   "dap": "",
   "giai": "✅ Đáp án đúng: do - Where do Kyle and his mom live?📘 Ngữ cảnh: Sau chỗ trống là động từ thường live. Chủ ngữ Kyle and his mom gồm hai người nối bằng and → số nhiều.🏗️ Cấu trúc: \nPhủ định: S + don’t / doesn’t + V (nguyên thể)\nNghi vấn: Do / Does + S + V (nguyên thể) ?\nSoi vào câu này: Kyle and his mom + do + live\nBảng chọn trợ động từ:\nI - you - we - they, số nhiều → do / don’t\nhe - she - it, số ít → does / doesn’t\nChủ ngữ Kyle and his mom ở số nhiều nên dùng do.\nSau do / does / don’t / doesn’t, động từ giữ NGUYÊN THỂ - phần -s đã nằm ở does.\nTrả lời ngắn: Yes, + S + do / does. / No, + S + don’t / doesn’t.\nSoi câu này: Where do Kyle and his mom live?🔍 Giải thích chi tiết: Chọn A. do. Chủ ngữ ở số nhiều nên dùng do. Đây là bẫy: từ đứng gần chỗ trống nhất là Kyle (số ít), nhưng chủ ngữ đầy đủ là cả cụm Kyle and his mom.",
   "huongDan": "Circle the correct answer.",
   "choices": [
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "are her dad’s cars.",
   "dap": "",
   "giai": "✅ Đáp án đúng: Those - Those are her dad’s cars. = Kia là những chiếc ô tô của bố cô ấy.📘 Ngữ cảnh: Chỗ trống ở đầu câu, đi với động từ are và danh từ cars ở số nhiều.🏗️ Cấu trúc: \nThis / That + is + danh từ SỐ ÍT\nThese / Those + are + danh từ SỐ NHIỀU\nthis / these = ở gần | that / those = ở xa\nSoi vào câu này: Those + are + her dad’s cars\nTrả lời ngắn phải đổi từ chỉ định thành đại từ:\nthis / that → it | these / those → they🔍 Giải thích chi tiết: Vì có are và cars (số nhiều) nên phải chọn dạng số nhiều → Those. Chọn This hay That đều sai vì hai từ đó chỉ đi với is. Trong ba lựa chọn chỉ Those là số nhiều, nên chỉ cần nhìn động từ are là chọn được ngay. Cụm her dad’s cars đã cho sẵn và viết đúng.",
   "huongDan": "Circle the correct answer.",
   "choices": [
    "",
    "",
    ""
   ]
  },
  {
   "noi": "foxes. They are cats.",
   "dap": "",
   "giai": "✅ Đáp án đúng: They aren’t\nCâu hoàn chỉnh: They aren’t foxes. They are cats.📘 Ngữ cảnh:\nBài yêu cầu: Choose the correct answer.\nCâu cần hoàn thành: ___ foxes. They are cats.\nChỗ trống cần There + to be. Danh từ theo sau là \"foxes\" - đây là danh từ số nhiều.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít / danh từ KHÔNG đếm được (There is a book. - There is some milk.)\nThere are + danh từ số nhiều (There are three books.)\nPhủ định: There isn’t / There aren’t\nNghi vấn: Is there … ? / Are there … ? Trả lời ngắn: Yes, there is. / No, there aren’t.\nSoi vào câu này: They aren’t + foxes (danh từ số nhiều) → foxes.🔍 Giải thích chi tiết:\nĐiền They aren’t vì foxes là danh từ số nhiều, mà are đi với danh từ số nhiều - ở đây là câu phủ định nên dùng dạng rút gọn có n’t.\nLỗi hay gặp: Danh từ số nhiều đi với are và không dùng a / an.",
   "huongDan": "Choose the correct answer.",
   "choices": [
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "Which is the correct answer to this question?\nDoes your sister work here?",
   "dap": "",
   "giai": "✅ Đáp án đúng: No, she doesn't.📘 Ngữ cảnh: Trả lời ngắn cho câu hỏi \"Does ... ?\".🏗️ Cấu trúc: Trả lời ngắn cho câu hỏi với Does:\nYes, he/she/it + does. / No, he/she/it + doesn't.\nVí dụ: Does she work here? – Yes, she does. / No, she doesn't.🔍 Giải thích chi tiết: Câu hỏi bắt đầu bằng \"Does your sister...?\" nên trong câu trả lời ngắn ta dùng lại trợ động từ \"does/doesn't\" theo ngôi của \"your sister\" (= she). Vì vậy trả lời phủ định là \"No, she doesn't.\". Các phương án \"Yes, she have\" và \"Yes, she do\" đều sai vì dùng sai trợ động từ (không phải \"have/do\" mà phải là \"does\"). Vậy đáp án đúng là: No, she doesn't. (Không, cô ấy không.)",
   "huongDan": "Choose the correct answer.",
   "choices": [
    "",
    "",
    ""
   ]
  },
  {
   "noi": "In which sentence can you write is?",
   "dap": "",
   "giai": "✅ Đáp án đúng: This is my mother.📘 Ngữ cảnh: Tìm câu mà \"is\" (dạng số ít) điền vào hợp lý.🏗️ Cấu trúc: \"is\" dùng cho chủ ngữ số ít: He/She/It + is; This/That + is.\n\"are\" dùng cho số nhiều: We/You/They + are; These/Those + are.\nVí dụ: This is my book. / These are my books.🔍 Giải thích chi tiết: \"is\" chỉ đi với chủ ngữ số ít. Trong các lựa chọn, \"This\" (đây — chỉ một người/vật) là số ít nên hợp với \"is\" → \"This is my mother\". Những câu có chủ ngữ \"you/we/they\" sẽ phải dùng \"are\", còn \"I\" dùng \"am\". Vậy câu đúng là: This is my mother. (Đây là mẹ tôi.)",
   "huongDan": "Complete these sentences using the be.",
   "choices": [
    "",
    "",
    ""
   ]
  },
  {
   "noi": "He likes (6) emails in English for practice.",
   "dap": "",
   "giai": "✅ Đáp án đúng: writing - He likes (6) writing emails in English for practice. = Cậu ấy thích viết email bằng tiếng Anh để luyện tập.📘 Ngữ cảnh: Cả ba lựa chọn đều đã đúng dạng V-ing, nên phải chọn theo nghĩa: động từ nào đi được với danh từ emails?🏗️ Cấu trúc: \nS + like / love / hate + V-ing\nSoi vào câu này: He + likes + writing + emails in English (cụm cố định: write an email / take a photo / do homework)\nChủ ngữ he / she / it và danh từ số ít → động từ cảm xúc thêm -s (likes, loves, hates).\nPhủ định: S + don’t / doesn’t + like + V-ing (sau don’t/doesn’t thì không chia nữa).\nCâu hỏi: Do / Does + S + like + V-ing?\nCách thêm -ing: thường thêm thẳng (play → playing); bỏ -e (ride → riding); gấp đôi phụ âm (swim → swimming).🔍 Giải thích chi tiết: Chọn writing vì ta nói write an email (viết email). Chọn taking sai vì take đi với photo, không đi với email. Chọn doing sai vì do đi với homework, exercise. Cụm in English for practice (bằng tiếng Anh để luyện tập) càng khẳng định đây là hành động viết.",
   "huongDan": "Read about Luciano and circle the correct answer.Luciano is thirteen years old and he lives in Rome. He’s very good at making friends and telling jokes. He (1) ….. playing football and he wants to be ",
   "choices": [
    "",
    "",
    ""
   ]
  },
  {
   "noi": "She two brothers.",
   "dap": "",
   "giai": "✅ Đáp án đúng: has (câu 2)📘 Ngữ cảnh: Ở câu She … two brothers., chủ ngữ She dùng has.🏗️ Cấu trúc: \nhave / has ở hiện tại đơn:\nI / you / we / they → have he / she / it → has\nPhủ định: don’t have doesn’t have (sau doesn’t dùng have, không dùng has)\nCâu hỏi: Do + I/you/we/they + have…? Does + he/she/it + have…?\n⛔ Không có dạng haves.\n⛔ Không dùng to be thay cho have: is have, isn’t have đều sai.\n⛔ Danh từ số nhiều (my parents, my cousins, Mary and John) dùng have / don’t have / Do.\nSoi vào câu 2: chủ ngữ She dùng has → has🔍 Giải thích chi tiết: Chủ ngữ She dùng has, nên câu 2 chọn has. Chỉ cần nhìn chủ ngữ là chia được: ngôi thứ ba số ít (he, she, it, tên riêng, danh từ số ít) dùng has, còn lại dùng have. Điểm khiến nhiều người sai nằm ở phủ định và câu hỏi: khi đã có doesn’t hay Does thì động từ chính quay về have, không bao giờ là has - doesn’t have, Does she have…?. Cũng nhớ rằng have ở đây là động từ thường, nên phủ định và câu hỏi phải mượn do / does, không dùng is / are - các phương án is have, isn’t have đều là dạng không tồn tại. Cuối cùng, tiếng Anh không có dạng haves, dù chủ ngữ là ngôi thứ ba số ít.",
   "huongDan": "Choose the correct answer (have / has / don't have / doesn't have / Do...have? / Does...have?).",
   "choices": [
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "Why should you never step on or hurt a millipede?",
   "dap": "",
   "giai": "✅ Đáp án đúng: because it has tunnels to dig - Why should you never step on or hurt a millipede?📘 Ngữ cảnh: Câu hỏi Why hỏi lý do. Bài viết Never step on or hurt a millipede. It has places to go and tunnels to dig!🏗️ Cấu trúc: \nCách làm bài đọc hiểu trắc nghiệm:\n1. Đọc câu hỏi, gạch chân từ khoá\n2. Tìm đúng câu chứa từ khoá đó trong bài\n3. So từng phương án với câu vừa tìm - loại dần\n4. Câu hỏi Why: lý do thường nằm ngay câu sau hoặc sau liên từ so / because\n5. Câu hỏi nghĩa của từ: nhìn các từ đứng cạnh nó để đoán\nSoi câu này: Why should you never step on or hurt a millipede? → because it has tunnels to dig🔍 Giải thích chi tiết: Chọn C. because it has tunnels to dig. Câu ngay sau lời khuyên chính là lý do. Loại burns ants vì đó nói về nọc độc; loại lots of legs và curls into a ball vì đó là đặc điểm, không phải lý do nên tha cho nó.",
   "huongDan": "Read the story and answer the questions.MillipedesThe millipede is small but strong. It can have between 80 and 400 legs!Millipedes walk slowly, but they can dig long tunnels. They wave their legs and",
   "choices": [
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "television",
   "dap": "",
   "giai": "✅ Đáp án đúng: Countable (C)📘 Ngữ cảnh: Xếp loại danh từ television.🏗️ Cấu trúc:Đếm được (C)đếm được 1, 2, 3 và có số nhiều.Không đếm được (U)chất lỏng, thịt, đá, bột - phải đong bằng cốc, lát, cân.🔍 Giải thích chi tiết: television đếm được: two televisions nên là danh từ đếm được. Vì vậy đáp án là: Countable (C)",
   "huongDan": "Look at the word list. Put them into two groups: countable nouns (C) or uncountable nouns (U).",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "you and your dad →",
   "dap": "",
   "giai": "✅ Đáp án đúng: You\nCâu hoàn chỉnh: you and your dad → You📘 Ngữ cảnh:\nBài yêu cầu: Write the suitable pronoun for each noun.\nCâu cần hoàn thành: you and your dad → ___\nChỗ trống cần một đại từ thay cho \"you and your dad\".🏗️ Cấu trúc: Đại từ nhân xưng thay cho danh từ đã nhắc tới, khỏi phải lặp lại:\nI = người đang nói\nYou = người nghe (hoặc nhóm có người nghe)\nWe = nhóm có cả người nói (… and I)\nThey = từ hai người / vật trở lên\nHe = một người nam\nShe = một người nữ\nIt = một đồ vật hoặc một con vật\nSoi vào câu này: you and your dad → You → you and your dad → You🔍 Giải thích chi tiết:\nĐiền You vì \"you and your dad\" là người nghe (hoặc nhóm có người nghe).\nGhép lại thành: you and your dad → You.\nLỗi hay gặp: Cụm dạng You and … thay bằng You chứ không phải They, vì trong nhóm có người nghe.",
   "huongDan": "Write the suitable pronoun for each noun.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "We play under big tree near the house.",
   "dap": "",
   "giai": "✅ Đáp án đúng: Countable📘 Ngữ cảnh: Xét danh từ trong câu: \"We play under a big tree near the house.\"🏗️ Cấu trúc:Đếm đượcđếm được 1, 2, 3 và có số nhiều (apple -> apples).Không đếm đượcchất lỏng, bột, thức ăn cắt lát - không đếm bằng số, không có số nhiều.🔍 Giải thích chi tiết: tree đếm được: nói được one tree, two trees. Vì vậy đáp án là: Countable.",
   "huongDan": "Is the noun in each sentence countable or uncountable?",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "aren’t tall trees.",
   "dap": "",
   "giai": "✅ Đáp án đúng: Those - Those aren’t tall trees. = Kia không phải là những cây cao.📘 Ngữ cảnh: Động từ là aren’t và danh từ trees ở số nhiều.🏗️ Cấu trúc: \nS + like / love / hate + V-ing\nSoi vào câu này: (chủ ngữ) + like / love / hate + V-ing\nChủ ngữ he / she / it và danh từ số ít → động từ cảm xúc thêm -s (likes, loves, hates).\nPhủ định: S + don’t / doesn’t + like + V-ing (sau don’t/doesn’t thì không chia nữa).\nCâu hỏi: Do / Does + S + like + V-ing?\nCách thêm -ing: thường thêm thẳng (play → playing); bỏ -e (ride → riding); gấp đôi phụ âm (swim → swimming).\nChỉ These / Those mới đi với are / aren’t. That và It đều là số ít. Ví dụ: That isn’t a tree. - Those aren’t trees.🔍 Giải thích chi tiết: Chọn Those. That và It sai vì đi với isn’t. Trong ba lựa chọn chỉ Those là số nhiều. Đối chiếu với câu 1 trong bài: These are our new jackets (gần) và Those aren’t tall trees (xa) - cùng số nhiều, chỉ khác khoảng cách.",
   "huongDan": "Choose the correct answer.",
   "choices": [
    "",
    "",
    ""
   ]
  },
  {
   "noi": "That garden beautiful flowers.",
   "dap": "",
   "giai": "✅ Đáp án đúng: doesn’t have📘 Ngữ cảnh: Câu nói về khu vườn kia. Chủ ngữ là một khu vườn, tức là số ít.🏗️ Cấu trúc:it + doesn’t haveVí dụ: That garden doesn’t have beautiful flowers.🔍 Giải thích chi tiết: That garden là một khu vườn nên thuộc nhóm it, phải dùng doesn’t. Đáp án have thiếu phần phủ định, còn don’t have dùng cho số nhiều. Vì vậy đáp án là doesn’t have.",
   "huongDan": "Circle the correct answer.",
   "choices": [
    "",
    "",
    ""
   ]
  },
  {
   "noi": "Ann: ?\nBob: No, he isn’t. He is chasing butterflies.",
   "dap": "",
   "giai": "✅ Đáp án đúng: Is Ox hiding in the bushes📘 Ngữ cảnh: Câu trả lời No, he isn’t cho biết câu hỏi phải dùng động từ be ở dạng số ít (is), chủ ngữ là Ox.🏗️ Cấu trúc: \nKhẳng định: S + am / is / are + V-ing + ...\nPhủ định: S + am / is / are + not + V-ing + ...\nNghi vấn: Am / Is / Are + S + V-ing ... ?\nSoi vào câu này: Ox + is + hiding + ...\nBảng chia be:\nI → am (phủ định ’m not)\nhe - she - it, danh từ số ít → is (phủ định isn’t)\nyou - we - they, danh từ số nhiều → are (phủ định aren’t)\nChủ ngữ Ox ở số ít nên dùng is.\nThiếu một trong hai phần là SAI: phải có đủ be và V-ing.\nDấu hiệu nhận biết: now, right now, at the moment, today, Look!, Listen!, Watch out!, Be quiet!\nTrả lời ngắn: Yes, + S + am / is / are. / No, + S + ’m not / isn’t / aren’t.\nÁp công thức vào câu này: Ox + Is + hiding🔍 Giải thích chi tiết: Chọn C. Is Ox hiding in the bushes. Loại A. Are Ox hiding vì Ox là một con vật → dùng Is. Loại B. Does Ox hide vì đó là hiện tại đơn, không khớp với câu trả lời isn’t. Mẹo: câu trả lời ngắn dùng be nào thì câu hỏi dùng be đó.",
   "huongDan": "Circle the correct answer.",
   "choices": [
    "",
    "",
    ""
   ]
  },
  {
   "noi": "an orange computer in her bedroom.",
   "dap": "",
   "giai": "✅ Đáp án đúng: There is📘 Ngữ cảnh: Nói có gì ở đâu, danh từ là an orange computer.🏗️ Cấu trúc:There is + danh từ số ít hoặc không đếm được.There are + danh từ số nhiều.🔍 Giải thích chi tiết: an orange computer là số ít nên dùng There is. Vì vậy câu đúng là: There is an orange computer in her bedroom.",
   "huongDan": "Circle the correct answer.",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "The food very good, but the drink was nice.",
   "dap": "",
   "giai": "✅ Đáp án đúng: wasn’t - The food wasn’t very good, but the drink was nice. = Món ăn không ngon lắm, nhưng đồ uống thì ngon.📘 Ngữ cảnh: Chữ but nối hai vế trái dấu: vế sau khen đồ uống was nice → vế trước phải chê món ăn.🏗️ Cấu trúc: \nKhẳng định: S + was / were + ...\nPhủ định: S + wasn’t / weren’t + ...\nNghi vấn: Was / Were + S + ... ?\nSoi vào câu này: The food + was → The food + wasn’t → Was + The food ... ?\nBảng chia:\nI - he - she - it, danh từ số ít → was (phủ định wasn’t)\nyou - we - they, danh từ số nhiều → were (phủ định weren’t)\nThere was + danh từ số ít | There were + danh từ số nhiều\nDấu hiệu quá khứ: yesterday, last week / month / year, ... ago, in 2010.\nÁp công thức vào câu này: The food + wasn’t + very good, but the drink was nice🔍 Giải thích chi tiết: Chọn wasn’t. Chọn was sai nghĩa (hai vế sẽ cùng khen, mất tác dụng của but). Chọn weren’t sai số - food là danh từ không đếm được, chia như số ít.",
   "huongDan": "Circle the correct answer.",
   "choices": [
    "",
    "",
    ""
   ]
  },
  {
   "noi": "I my homework now, so I can’t go out.",
   "dap": "",
   "giai": "✅ Đáp án đúng: am doing - I am doing my homework now, so I can’t go out.📘 Ngữ cảnh: Từ now là dấu hiệu hiện tại tiếp diễn. Chủ ngữ là I.🏗️ Cấu trúc: \nHiện tại ĐƠN: S + V (-s / -es) → việc lặp đi lặp lại, sự thật\nHiện tại TIẾP DIỄN: S + am / is / are + V-ing → việc đang xảy ra lúc này\nBảng dấu hiệu nhận biết:\nĐƠN: every day / week - always, usually, often, sometimes, never\n on Mondays - lịch trình cố định - sự thật hiển nhiên\nTIẾP DIỄN: now - right now - at the moment - at present - today\n Look! - Listen! - Watch out! - Be quiet!\nPhủ định / nghi vấn:\nĐƠN: don’t / doesn’t + V | Do / Does + S + V ?\nTIẾP DIỄN: am / is / aren’t + V-ing | Am / Is / Are + S + V-ing ?\nLưu ý: không trộn hai thì - đã dùng be thì phải có V-ing, đã dùng do/does thì động từ để nguyên thể.\nSoi vào câu này: I am doing my homework now, so I can’t go out.🔍 Giải thích chi tiết: Chọn B. am doing. Loại do vì sai thì. Loại does vì does chỉ dùng cho he/she/it. Loại doing vì thiếu động từ be. Chủ ngữ I luôn đi với am.",
   "huongDan": "Choose the correct answer.",
   "choices": [
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "students?\nYes, we are.",
   "dap": "",
   "giai": "✅ Đáp án đúng: Are you\nCâu hoàn chỉnh: Are you students? / Yes, we are.📘 Ngữ cảnh:\nBài yêu cầu: Choose the correct answer.\nCâu cần hoàn thành: ___ students? / Yes, we are.\nChỗ trống cần There + to be. Danh từ theo sau là \"students\" - đây là danh từ số nhiều.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít / danh từ KHÔNG đếm được (There is a book. - There is some milk.)\nThere are + danh từ số nhiều (There are three books.)\nPhủ định: There isn’t / There aren’t\nNghi vấn: Is there … ? / Are there … ? Trả lời ngắn: Yes, there is. / No, there aren’t.\nSoi vào câu này: Are you + students (danh từ số nhiều) → students?🔍 Giải thích chi tiết:\nĐiền Are you vì students là danh từ số nhiều, mà are đi với danh từ số nhiều.\nLỗi hay gặp: Danh từ số nhiều đi với are và không dùng a / an.",
   "huongDan": "Choose the correct answer.",
   "choices": [
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "A: you the dishes after dinner?\nB: Yes, I did.",
   "dap": "",
   "giai": "✅ Đáp án đúng: Did - wash - A: Did - wash you … the dishes after dinner? B: Yes, I did. = Bạn có rửa bát sau bữa tối không? - Có.📘 Ngữ cảnh: Câu trả lời cho sẵn là Yes, I did → câu hỏi phải dùng Did.🏗️ Cấu trúc: \nPhủ định: S + didn’t + V (nguyên thể)\nNghi vấn: Did + S + V (nguyên thể) ?\nSoi vào câu này: you + Did + wash\ndidn’t / Did dùng cho MỌI chủ ngữ - không phân biệt số ít hay số nhiều.\nSau didn’t / Did, động từ trở về NGUYÊN THỂ - bỏ đuôi -ed.\nTrả lời ngắn: Yes, + S + did. / No, + S + didn’t.\nDấu hiệu quá khứ: yesterday, last night / week, ... ago, when I was little.\nÁp công thức vào câu này: you + Did - wash + you🔍 Giải thích chi tiết: Chọn Did - wash. Chọn Did - washed sai vì sau Did động từ về nguyên thể. Chọn Was - wash sai vì be không đi với động từ thường ở nguyên thể.",
   "huongDan": "Choose the correct answer.",
   "choices": [
    "",
    "",
    ""
   ]
  },
  {
   "noi": "Ann: Yes, but it’s also T-shirt in the shop.",
   "dap": "",
   "giai": "✅ Đáp án đúng: the coolest - Ann: Yes, but it’s also the coolest T-shirt in the shop. = Ann: Đúng vậy, nhưng nó cũng là chiếc áo ngầu nhất trong cửa hàng.📘 Ngữ cảnh: Câu cũng có in the shop nên vẫn là so sánh nhất, lần này với tính từ cool - tính từ ngắn.🏗️ Cấu trúc: \nA + be + the + tính từ so sánh nhất + in / of + phạm vi\nSoi vào câu này: it + is + the coolest + T-shirt in the shop\nBảng biến đổi:\ntính từ NGẮN → the + tính từ + -est (tall → the tallest)\ntính từ DÀI → the most + tính từ (the most careful)\nbất quy tắc: good → the best | bad → the worst\nỞ đây cool là tính từ NGẮN nên dùng the coolest. Luôn có the, và không có than.🔍 Giải thích chi tiết: Chọn the coolest. Chọn cooler sai vì đó là dạng hơn và thiếu than. Chọn the cooler sai vì dạng hơn không đi với the. Chú ý câu này dùng đuôi -est (tính từ ngắn) còn câu trên dùng the most (tính từ dài) - cùng là \"nhất\" nhưng cách viết khác nhau tuỳ độ dài tính từ.",
   "huongDan": "Read the conversation and circle the correct answer.Ann: Do you like the yellow T-shirt?",
   "choices": [
    "",
    "",
    ""
   ]
  },
  {
   "noi": "The boy with the glasses is looking at the computer.",
   "dap": "",
   "giai": "✅ Đáp án đúng: No - The boy with the glasses is looking at the computer.📘 Ngữ cảnh: Cụm with the glasses dùng để chỉ đúng bạn nào - phải tìm bạn đeo kính trước rồi mới xét hành động.🏗️ Cấu trúc: \nĐối chiếu câu với tranh theo 3 bước:\n1. Ai / cái gì? → tìm đúng chủ ngữ trong tranh\n2. Đang làm gì / thế nào? → xét động từ\n3. Ở đâu / như thế nào? → xét phần còn lại (nơi chốn, màu sắc, số lượng)\nSoi câu này theo 3 bước:\n1. Ai / cái gì? the boy with the glasses (bạn trai đeo kính)\n2. Đang làm gì? is looking (đang nhìn)\n3. Chi tiết còn lại: at the computer (máy tính) ← bước LỆCH với tranh\nBước 3 không khớp tranh → trả lời No.🔍 Giải thích chi tiết: Chọn No. Bạn trai đeo kính không nhìn vào máy tính. Đây là bẫy quen thuộc: tranh có máy tính thật, nhưng người nhìn nó lại là bạn khác.",
   "huongDan": "Look and read. Write Yes or No.",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "We need sugar to make the cake.",
   "dap": "",
   "giai": "✅ Đáp án đúng: Uncountable📘 Ngữ cảnh: Xét danh từ trong câu: \"We need some sugar to make the cake.\"🏗️ Cấu trúc:Đếm đượcđếm được 1, 2, 3 và có số nhiều (apple -> apples).Không đếm đượcchất lỏng, bột, thức ăn cắt lát - không đếm bằng số, không có số nhiều.🔍 Giải thích chi tiết: sugar không đếm được: không nói được two sugars, phải đong bằng cốc, lát, cân. Muốn đếm thì nói a spoon of sugar. Vì vậy đáp án là: Uncountable.",
   "huongDan": "Is the noun in each sentence countable or uncountable?",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "Dax and Fluffy were in the living room at 8. They weren’t in the park.",
   "dap": "",
   "giai": "✅ Đáp án đúng: True - Dax and Fluffy were in the living room at 8. They weren’t in the park.📘 Ngữ cảnh: Bảng cho biết lúc 8 giờ Dax và Fluffy ở in the living room; in the park là chỗ của chúng lúc 4 giờ.🏗️ Cấu trúc: \nKhẳng định: S + was / were + ...\nPhủ định: S + wasn’t / weren’t + ...\nNghi vấn: Was / Were + S + ... ?\nSoi vào câu này: Dax and Fluffy + were → Dax and Fluffy + weren’t → Were + Dax and Fluffy ... ?\nBảng chia:\nI - he - she - it, danh từ số ít → was (phủ định wasn’t)\nyou - we - they, danh từ số nhiều → were (phủ định weren’t)\nThere was + danh từ số ít | There were + danh từ số nhiều\nDấu hiệu quá khứ: yesterday, last week / month / year, ... ago, in 2010.\nÁp công thức vào câu này: Dax and Fluffy + were + in the living room at 8🔍 Giải thích chi tiết: Chọn True. Lúc 8 giờ chúng ở phòng khách (đúng) và không ở công viên (đúng, vì đó là lúc 4 giờ). Chủ ngữ là hai nên dùng were / weren’t.",
   "huongDan": "Look at the table and write T (True) or F (False).Where were they on Saturday?Ted: at 4.00 in his room | at 6.00 in the garage | at 8.00 at the cinemaDax and Fluffy: at 4.00 in the park | at 6.00 in t",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "I see old picture on the wall.",
   "dap": "",
   "giai": "✅ Đáp án đúng: an\nCâu hoàn chỉnh: I see an old picture on the wall.📘 Ngữ cảnh:\nBài yêu cầu: Circle the correct answer.\nCâu cần hoàn thành: I see ___ old picture on the wall.\nChỗ trống cần một mạo từ đứng trước \"old\" (cả cụm là \"old picture\").🏗️ Cấu trúc: Mạo từ đứng trước danh từ:\na + danh từ đếm được SỐ ÍT, bắt đầu bằng âm PHỤ ÂM (a book, a teacher)\nan + danh từ đếm được SỐ ÍT, bắt đầu bằng âm NGUYÊN ÂM (an apple, an egg, an orange)\nthe + người / vật CỤ THỂ mà người nghe đã biết là cái nào (the book on my desk)\nsome + danh từ SỐ NHIỀU hoặc danh từ KHÔNG đếm được (some books, some milk)\nXét theo ÂM ĐỌC chứ không theo chữ viết: an hour (h câm), a university (đọc /juː/).\nMạo từ đi theo từ đứng LIỀN SAU nó, kể cả khi đó là tính từ: a bike nhưng an old bike.\nSoi vào câu này: an + old picture on the wall🔍 Giải thích chi tiết:\nĐiền an vì từ đứng liền sau là old, bắt đầu bằng âm NGUYÊN ÂM nên dùng an. Chú ý mạo từ đi theo old chứ không theo danh từ chính picture. \nGhi nhớ: a / an chỉ dùng cho danh từ đếm được số ít; danh từ số nhiều và danh từ không đếm được thì dùng some hoặc để trần.",
   "huongDan": "Circle the correct answer.",
   "choices": [
    "",
    "",
    ""
   ]
  }
 ],
 "error_correction": [
  {
   "noi": "Tim watchs TV with his sister after school.",
   "dap": "watchs",
   "giai": "✅ Đáp án đúng: watchs → watches - câu đúng: Tim watches TV with his sister after school. = Tim xem TV cùng chị gái sau giờ học.📘 Ngữ cảnh: Câu khẳng định với chủ ngữ Tim (số ít) nên động từ phải thêm đuôi - nhưng câu viết là watchs, sai chính tả.🏗️ Cấu trúc: \nS + V (-s / -es) + O (thì hiện tại đơn)\nSoi vào câu này: Tim + watches + ...\nBảng chia động từ:\nI - you - we - they, danh từ số nhiều → V nguyên thể (they play)\nhe - she - it, danh từ số ít → V + -s / -es (he plays)\nChủ ngữ Tim ở số ít ngôi thứ ba nên dùng watches.\nCách thêm đuôi: thường +s; tận cùng s, x, ch, sh, o → +es (watch → watches);\ntận cùng -y sau phụ âm → đổi thành -ies (study → studies), sau nguyên âm thì giữ y (play → plays).🔍 Giải thích chi tiết: Sửa watchs → watches: động từ tận cùng bằng -ch thì thêm -es, không phải -s. Cùng nhóm: wash → washes, fix → fixes, go → goes, kiss → kisses. Đọc lên sẽ thấy có thêm một âm /ɪz/ ở cuối.",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "He is funnyer than his brother.",
   "dap": "funnyer",
   "giai": "✅ Đáp án đúng: funnyer → funnier - câu đúng: He is funnier than his brother. = Cậu ấy hài hước hơn anh trai mình.📘 Ngữ cảnh: Câu so sánh hơn dùng tính từ funny. Dạng so sánh viết là funnyer - vẫn giữ nguyên chữ y.🏗️ Cấu trúc: \nA + be + tính từ so sánh hơn + than + B\nSoi vào câu này: He + is + funnier + than + his brother\nBảng biến đổi:\ntính từ NGẮN (1 âm tiết, hoặc 2 âm tiết đuôi -y) → thêm -er (tall → taller)\ntính từ DÀI (từ 2-3 âm tiết trở lên) → more + tính từ (more careful)\nbất quy tắc: good → better | bad → worse\nỞ đây funny là tính từ NGẮN nên dùng funnier. Có than thì luôn là dạng hơn.🔍 Giải thích chi tiết: Sửa funnyer → funnier: bỏ chữ y rồi thêm -ier. Đây là lỗi chính tả rất phổ biến vì HS nhớ quy tắc \"thêm -er\" mà quên bước đổi y → i. Nhớ quy tắc này giống hệt cách chia số nhiều: baby → babies, city → cities - cứ trước y là phụ âm thì đổi thành i.",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Does Sophie and Ruby study English at school?",
   "dap": "Does",
   "giai": "✅ Đáp án đúng: Does → Do - câu đúng: Do Sophie and Ruby study English at school? = Sophie và Ruby có học tiếng Anh ở trường không?📘 Ngữ cảnh: Chủ ngữ Sophie and Ruby gồm hai người nối bằng and → số nhiều, nhưng câu hỏi lại mở đầu bằng Does.🏗️ Cấu trúc: \nPhủ định: S + don’t / doesn’t + V (nguyên thể)\nNghi vấn: Do / Does + S + V (nguyên thể) ?\nSoi vào câu này: Sophie and Ruby + Do + study\nBảng chọn trợ động từ:\nI - you - we - they, số nhiều → do / don’t\nhe - she - it, số ít → does / doesn’t\nChủ ngữ Sophie and Ruby ở số nhiều nên dùng Do.\nSau do / does / don’t / doesn’t, động từ giữ NGUYÊN THỂ - phần -s đã nằm ở does.\nTrả lời ngắn: Yes, + S + do / does. / No, + S + don’t / doesn’t.🔍 Giải thích chi tiết: Sửa Does → Do vì chủ ngữ ở số nhiều. Phần study đã đúng (nguyên thể sau trợ động từ) nên giữ nguyên. Dấu hiệu nhanh: có chữ and nối hai cái tên → dùng Do.",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Sarah wanted to go to the movies, so Sam wanted to go to the park.",
   "dap": "so",
   "giai": "✅ Đáp án đúng: so → but - Sarah wanted to go to the movies, but Sam wanted to go to the park.📘 Ngữ cảnh: Sarah muốn đi xem phim, còn Sam muốn đi công viên - hai ý muốn khác nhau.🏗️ Cấu trúc: \nvế 1 + liên từ + vế 2\nSoi vào câu này: Sarah wanted to go to the movies, so Sam wanted to go to the park.\nsửa so thành but\nBảng 4 liên từ - nhìn QUAN HỆ giữa hai vế:\nand = và → hai vế cùng chiều, bổ sung cho nhau\n The leopard is fast and strong.\nbut = nhưng → hai vế trái ngược, vế sau ngược với điều mong đợi\n I’m very tired, but I can’t sleep.\nor = hoặc → đưa ra lựa chọn, thường trong câu hỏi\n Do you want a cookie or a cupcake?\nso = nên → vế 1 là nguyên nhân, vế 2 là kết quả\n I was tired, so I went to sleep early.\nMẹo phân biệt nhanh:\nthấy dấu ? và hai thứ để chọn → or\nvế sau phủ định hoặc ngược ý vế trước → but\nthay thử bằng vì vậy mà nghe xuôi → so; thay bằng và nghe xuôi → and🔍 Giải thích chi tiết: Sửa so → but. Ý muốn của Sarah không phải nguyên nhân dẫn tới ý muốn của Sam nên không dùng so. Hai mong muốn đối nhau thì dùng but.",
   "huongDan": "Underline the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Do James have a pretty painting?",
   "dap": "Do",
   "giai": "✅ Đáp án đúng: Do → Does - câu đúng: Does James have a pretty painting? = James có một bức tranh đẹp không?📘 Ngữ cảnh: Chủ ngữ James là tên riêng của một người → số ít ngôi 3, nhưng câu lại dùng Do.🏗️ Cấu trúc: \nS + have / has + O\nSoi vào câu này: Does James + have + a pretty painting\nBảng chia:\nI - you - we - they, danh từ số nhiều → have\nhe - she - it, danh từ số ít → has\nChủ ngữ Does James ở số nhiều nên dùng have.\nNhớ: chia theo CHỦ NGỮ, không theo tân ngữ phía sau.\nPhủ định don’t / doesn’t have; câu hỏi Do / Does + S + have? (sau đó have giữ nguyên thể).🔍 Giải thích chi tiết: Sửa Do → Does → Does James have a pretty painting? Chú ý James có chữ s ở cuối tên nhưng đó là một phần của tên, không phải dấu hiệu số nhiều - đây chính là bẫy của câu này. Phần have giữ nguyên thể, đã đúng.",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Mom is more busy than Dad.",
   "dap": "more busy",
   "giai": "✅ Đáp án đúng: more busy → busier - câu đúng: Mom is busier than Dad. = Mẹ bận hơn bố.📘 Ngữ cảnh: Câu so sánh hơn dùng tính từ busy. Câu dùng more như với tính từ dài, nhưng busy lại là tính từ ngắn.🏗️ Cấu trúc: \nA + be + tính từ so sánh hơn + than + B\nSoi vào câu này: Mom + is + busier + than + Dad\nBảng biến đổi:\ntính từ NGẮN (1 âm tiết, hoặc 2 âm tiết đuôi -y) → thêm -er (tall → taller)\ntính từ DÀI (từ 2-3 âm tiết trở lên) → more + tính từ (more careful)\nbất quy tắc: good → better | bad → worse\nỞ đây busy là tính từ NGẮN (2 âm tiết đuôi -y) nên dùng busier. Có than thì luôn là dạng hơn.🔍 Giải thích chi tiết: Sửa more busy → busier: busy có 2 âm tiết nhưng kết thúc bằng -y nên thuộc nhóm tính từ ngắn, phải đổi thành busier. Đây là ngoại lệ quan trọng: không phải cứ 2 âm tiết là dùng more - nhóm đuôi -y luôn thêm đuôi. So sánh trong bài: interesting (4 âm tiết) mới dùng more.",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Her birthday is in April 24.",
   "dap": "in",
   "giai": "✅ Đáp án đúng: in → on - Her birthday is on April 24.📘 Ngữ cảnh: Cụm April 24 là một ngày cụ thể (có cả tháng và số ngày).🏗️ Cấu trúc: \nin / on / at + cụm chỉ thời gian\nSoi vào câu này: Her birthday is in April 24.\nphần sau giới từ là ngày cụ thể → sửa in thành on\nBảng chọn giới từ - nhìn từ đứng SAU ô trống:\nin → khoảng thời gian DÀI: năm (in 2023) - tháng (in June)\n mùa (in the summer) - buổi trong ngày (in the morning / afternoon / evening)\non → NGÀY cụ thể: thứ (on Monday) - ngày tháng (on April 24) - on my birthday\nat → GIỜ giấc (at 6.30, at ten o’clock) - dịp lễ (at Christmas)\n và các cụm cố định: at noon - at night - at the weekend\nBẫy hay gặp: in April (chỉ có tháng) nhưng on April 24 (thêm ngày thì đổi sang on)\n in the morning nhưng at night - đây là ngoại lệ phải thuộc.🔍 Giải thích chi tiết: Sửa in → on. Giới từ on dùng cho ngày cụ thể: thứ, ngày tháng. Chú ý: nếu chỉ có April (mỗi tháng) thì dùng in April; nhưng thêm số ngày April 24 thì phải đổi sang on.",
   "huongDan": "Underline the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "My new neighbor not friendly.",
   "dap": "not",
   "giai": "✅ Đáp án đúng: not → isn’t - câu đúng: My new neighbor isn’t friendly. = Người hàng xóm mới của tôi không thân thiện.📘 Ngữ cảnh: Câu này thiếu hẳn động từ be: chỉ có chủ ngữ My new neighbor, rồi tới thẳng not friendly.🏗️ Cấu trúc: \nKhẳng định: S + be + ...\nPhủ định: S + be + not + ...\nNghi vấn: Be + S + ...?\nSoi vào câu này: My new neighbor + is → My new neighbor + isn’t → Is + My new neighbor ... ?\nBảng chia be: I → am | he / she / it → is | you / we / they → are\nTrả lời ngắn: Yes, + S + be. / No, + S + be + not. (câu Yes không viết tắt)🔍 Giải thích chi tiết: Sửa not → isn’t → My new neighbor isn’t friendly. Chữ not không thể đứng một mình - nó luôn phải đi kèm động từ be (is not = isn’t). Tiếng Việt nói \"hàng xóm tôi không thân thiện\" không cần động từ nên HS hay bỏ sót is.",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "They are waiting on front of the restaurant.",
   "dap": "on",
   "giai": "✅ Đáp án đúng: on → in - They are waiting in front of the restaurant.📘 Ngữ cảnh: Cụm chỉ vị trí \"phía trước\" là một cụm cố định gồm 3 từ.🏗️ Cấu trúc: \nin / on / at + cụm chỉ thời gian\nSoi vào câu này: They are waiting on front of the restaurant.\nphần sau giới từ là cụm cố định in front of → sửa on thành in\nBảng chọn giới từ - nhìn từ đứng SAU ô trống:\nin → khoảng thời gian DÀI: năm (in 2023) - tháng (in June)\n mùa (in the summer) - buổi trong ngày (in the morning / afternoon / evening)\non → NGÀY cụ thể: thứ (on Monday) - ngày tháng (on April 24) - on my birthday\nat → GIỜ giấc (at 6.30, at ten o’clock) - dịp lễ (at Christmas)\n và các cụm cố định: at noon - at night - at the weekend\nBẫy hay gặp: in April (chỉ có tháng) nhưng on April 24 (thêm ngày thì đổi sang on)\n in the morning nhưng at night - đây là ngoại lệ phải thuộc.🔍 Giải thích chi tiết: Sửa on → in. Cụm đúng là in front of - phải viết đủ và đúng cả ba từ, không đổi in thành on. Đây là cụm HS hay viết sai nhất trong nhóm giới từ vị trí.",
   "huongDan": "Underline the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Is she go to school by bus every day?",
   "dap": "Is",
   "giai": "✅ Đáp án đúng: Is → Does📘 Ngữ cảnh: Cụm every day là dấu hiệu thói quen → hiện tại đơn, và động từ go đang ở nguyên thể.🏗️ Cấu trúc: \nHiện tại ĐƠN: S + V (-s / -es) → việc lặp đi lặp lại, sự thật\nHiện tại TIẾP DIỄN: S + am / is / are + V-ing → việc đang xảy ra lúc này\nBảng dấu hiệu nhận biết:\nĐƠN: every day / week - always, usually, often, sometimes, never\n on Mondays - lịch trình cố định - sự thật hiển nhiên\nTIẾP DIỄN: now - right now - at the moment - at present - today\n Look! - Listen! - Watch out! - Be quiet!\nPhủ định / nghi vấn:\nĐƠN: don’t / doesn’t + V | Do / Does + S + V ?\nTIẾP DIỄN: am / is / aren’t + V-ing | Am / Is / Are + S + V-ing ?\nLưu ý: không trộn hai thì - đã dùng be thì phải có V-ing, đã dùng do/does thì động từ để nguyên thể.\nSoi vào câu này: Is she go to school by bus every day?\nsửa Is → Does🔍 Giải thích chi tiết: Sửa Is → Does. Câu hỏi hiện tại đơn dùng Do/Does, không dùng be. Chủ ngữ she số ít nên chọn Does, và động từ giữ nguyên thể go.",
   "huongDan": "Find the mistake in each of the sentences and correct it.",
   "choices": []
  },
  {
   "noi": "Is the bus slowwing down at the moment?",
   "dap": "slowwing",
   "giai": "✅ Đáp án đúng: slowwing → slowing (lỗi: gấp đôi thừa)📘 Ngữ cảnh: Cụm at the moment xác nhận thì đúng rồi, câu hỏi cũng đảo Is đúng chỗ → lỗi ở chính tả đuôi -ing.🏗️ Cấu trúc: \nKhẳng định: S + am / is / are + V-ing + ...\nPhủ định: S + am / is / are + not + V-ing + ...\nNghi vấn: Am / Is / Are + S + V-ing ... ?\nSoi vào câu này: S + is + slowing + ...\nBảng chia be:\nI → am (phủ định ’m not)\nhe - she - it, danh từ số ít → is (phủ định isn’t)\nyou - we - they, danh từ số nhiều → are (phủ định aren’t)\nChủ ngữ S ở số ít nên dùng is.\nThiếu một trong hai phần là SAI: phải có đủ be và V-ing.\nDấu hiệu nhận biết: now, right now, at the moment, today, Look!, Listen!, Watch out!, Be quiet!\nTrả lời ngắn: Yes, + S + am / is / are. / No, + S + ’m not / isn’t / aren’t.🔍 Giải thích chi tiết: Sửa slowwing → slowing. Đây là lỗi ngược với câu trên: slow kết thúc bằng -w, mà w không bao giờ được gấp đôi khi thêm -ing. Chỉ gấp đôi các phụ âm như m, n, t, p, g.",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Can you see a baby at the desk? He is cute.",
   "dap": "a",
   "giai": "✅ Đáp án đúng: sửa \"a\" thành \"the\"\nCâu đúng: Can you see the baby at the desk? He is cute.📘 Ngữ cảnh:\nBài yêu cầu: Find and correct the mistake in each of the sentences.\nCâu đã cho: Can you see a baby at the desk? He is cute.\nViệc cần làm: tìm đúng MỘT chỗ sai trong câu rồi sửa lại.🏗️ Cấu trúc: Mạo từ đứng trước danh từ:\na + danh từ đếm được SỐ ÍT, bắt đầu bằng âm PHỤ ÂM (a book, a teacher)\nan + danh từ đếm được SỐ ÍT, bắt đầu bằng âm NGUYÊN ÂM (an apple, an egg, an orange)\nthe + người / vật CỤ THỂ mà người nghe đã biết là cái nào (the book on my desk)\nsome + danh từ SỐ NHIỀU hoặc danh từ KHÔNG đếm được (some books, some milk)\nNhắc tới LẦN ĐẦU thì dùng a / an, nhắc lại chính vật đó thì đổi sang the.\nXét theo ÂM ĐỌC chứ không theo chữ viết: an hour (h câm), a university (đọc /juː/).\nSoi vào câu này: a → the🔍 Giải thích chi tiết:\nChỗ sai là \"a\". Dạng đúng ở đây là \"the\".\nCách kiểm tra: đọc to danh từ đứng ngay sau mạo từ - nghe âm đầu là nguyên âm thì dùng an, phụ âm thì dùng a; còn danh từ số nhiều hoặc không đếm được thì bỏ hẳn a / an và dùng some.",
   "huongDan": "Find and correct the mistake in each of the sentences.",
   "choices": []
  },
  {
   "noi": "Can you playing soccer?",
   "dap": "playing",
   "giai": "✅ Đáp án đúng: playing → play - câu đúng: Can you play soccer? = Bạn chơi bóng đá được không?📘 Ngữ cảnh: Câu hỏi với Can nhưng động từ lại ở dạng -ing.🏗️ Cấu trúc: \nS + like / love / hate + V-ing\nSoi vào câu này: (chủ ngữ) + like / love / hate + V-ing\nChủ ngữ he / she / it và danh từ số ít → động từ cảm xúc thêm -s (likes, loves, hates).\nPhủ định: S + don’t / doesn’t + like + V-ing (sau don’t/doesn’t thì không chia nữa).\nCâu hỏi: Do / Does + S + like + V-ing?\nCách thêm -ing: thường thêm thẳng (play → playing); bỏ -e (ride → riding); gấp đôi phụ âm (swim → swimming).🔍 Giải thích chi tiết: Sửa playing → play. Nhớ cặp đối chiếu: Can you play? (nguyên thể) nhưng Do you like playing? (V-ing).",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "James and Annie often go jogging on the morning.",
   "dap": "on",
   "giai": "✅ Đáp án đúng: on → in - James and Annie often go jogging in the morning.📘 Ngữ cảnh: Cụm the morning là một buổi trong ngày.🏗️ Cấu trúc: \nin / on / at + cụm chỉ thời gian\nSoi vào câu này: James and Annie often go jogging on the morning.\nphần sau giới từ là buổi trong ngày → sửa on thành in\nBảng chọn giới từ - nhìn từ đứng SAU ô trống:\nin → khoảng thời gian DÀI: năm (in 2023) - tháng (in June)\n mùa (in the summer) - buổi trong ngày (in the morning / afternoon / evening)\non → NGÀY cụ thể: thứ (on Monday) - ngày tháng (on April 24) - on my birthday\nat → GIỜ giấc (at 6.30, at ten o’clock) - dịp lễ (at Christmas)\n và các cụm cố định: at noon - at night - at the weekend\nBẫy hay gặp: in April (chỉ có tháng) nhưng on April 24 (thêm ngày thì đổi sang on)\n in the morning nhưng at night - đây là ngoại lệ phải thuộc.🔍 Giải thích chi tiết: Sửa on → in. Các buổi trong ngày dùng in: in the morning / in the afternoon / in the evening. Ngoại lệ duy nhất là at night (không phải in the night).",
   "huongDan": "Underline the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Our children is happy.",
   "dap": "is",
   "giai": "✅ Đáp án đúng: is → are - câu đúng: Our children are happy. = Các con của chúng tôi rất vui.📘 Ngữ cảnh: Chủ ngữ Our children ở số nhiều (children là số nhiều bất quy tắc của child) nhưng động từ lại là is.🏗️ Cấu trúc: \nKhẳng định: S + be + ...\nPhủ định: S + be + not + ...\nNghi vấn: Be + S + ...?\nSoi vào câu này: Our + is / are → Our + isn’t / aren’t → Is / Are + Our ... ?\nBảng chia be: I → am | he / she / it → is | you / we / they → are\nTrả lời ngắn: Yes, + S + be. / No, + S + be + not. (câu Yes không viết tắt)🔍 Giải thích chi tiết: Sửa is → are. Bẫy: children không có -s nên nhiều bạn tưởng số ít. Tính từ happy đã đúng vị trí (sau động từ be).",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "My computer are faster than your computer.",
   "dap": "are",
   "giai": "✅ Đáp án đúng: are → is - câu đúng: My computer is faster than your computer. = Máy tính của tôi nhanh hơn máy tính của bạn.📘 Ngữ cảnh: Lỗi không nằm ở dạng so sánh (faster than đã đúng) mà ở động từ: chủ ngữ My computer ở số ít nhưng dùng are.🏗️ Cấu trúc: \nA + be + tính từ so sánh hơn + than + B\nSoi vào câu này: My computer + is + faster + than + your computer\nBảng biến đổi:\ntính từ NGẮN (1 âm tiết, hoặc 2 âm tiết đuôi -y) → thêm -er (tall → taller)\ntính từ DÀI (từ 2-3 âm tiết trở lên) → more + tính từ (more careful)\nbất quy tắc: good → better | bad → worse\nỞ đây fast là tính từ NGẮN - chú ý chủ ngữ số ít đi với is nên dùng faster. Có than thì luôn là dạng hơn.🔍 Giải thích chi tiết: Sửa are → is → My computer is faster than your computer. Danh từ computer không có -s nên là số ít. Phần faster than giữ nguyên. Bài này có 2 câu lỗi động từ (câu này và câu cuối) - phải đọc kỹ cả câu chứ không chỉ soi tính từ.",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Dan went to the supermarket and forgot his wallet.",
   "dap": "and",
   "giai": "✅ Đáp án đúng: and → but - Dan went to the supermarket but forgot his wallet.📘 Ngữ cảnh: Dan đã đến siêu thị nhưng quên ví - đây là sự cố ngoài ý muốn, không phải việc làm tiếp theo.🏗️ Cấu trúc: \nvế 1 + liên từ + vế 2\nSoi vào câu này: Dan went to the supermarket and forgot his wallet.\nsửa and thành but\nBảng 4 liên từ - nhìn QUAN HỆ giữa hai vế:\nand = và → hai vế cùng chiều, bổ sung cho nhau\n The leopard is fast and strong.\nbut = nhưng → hai vế trái ngược, vế sau ngược với điều mong đợi\n I’m very tired, but I can’t sleep.\nor = hoặc → đưa ra lựa chọn, thường trong câu hỏi\n Do you want a cookie or a cupcake?\nso = nên → vế 1 là nguyên nhân, vế 2 là kết quả\n I was tired, so I went to sleep early.\nMẹo phân biệt nhanh:\nthấy dấu ? và hai thứ để chọn → or\nvế sau phủ định hoặc ngược ý vế trước → but\nthay thử bằng vì vậy mà nghe xuôi → so; thay bằng và nghe xuôi → and🔍 Giải thích chi tiết: Sửa and → but. Quên ví là điều trái với dự tính đi mua hàng, nên dùng but. Nếu để and thì nghe như quên ví cũng là một việc bình thường trong kế hoạch.",
   "huongDan": "Underline the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "He’s the goodest Dad in the world.",
   "dap": "goodest",
   "giai": "✅ Đáp án đúng: goodest → best - câu đúng: He’s the best Dad in the world. = Anh ấy là người bố tuyệt nhất trên đời.📘 Ngữ cảnh: Câu dùng tính từ good với đuôi -est, nhưng good là tính từ bất quy tắc.🏗️ Cấu trúc: \nA + be + the + tính từ so sánh nhất + in / of + phạm vi\nSoi vào câu này: He + is + the best + Dad in the world\nBảng biến đổi:\ntính từ NGẮN → the + tính từ + -est (tall → the tallest)\ntính từ DÀI → the most + tính từ (the most careful)\nbất quy tắc: good → the best | bad → the worst\nỞ đây good là tính từ BẤT QUY TẮC nên dùng the best. Luôn có the, và không có than.🔍 Giải thích chi tiết: Sửa goodest → best → He’s the best Dad in the world. Mạo từ the và cụm in the world đều đã đúng, chỉ đổi mỗi tính từ. Cụm in the world xác nhận đây đúng là so sánh nhất chứ không phải dạng hơn. Cũng không viết the most good - good không dùng most. Đây là từ bất quy tắc ra đề nhiều nhất, đi cặp với bad → the worst.",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Ann is a honest girl.",
   "dap": "a",
   "giai": "✅ Đáp án đúng: sửa \"a\" thành \"an\"\nCâu đúng: Ann is an honest girl.📘 Ngữ cảnh:\nBài yêu cầu: Find the mistake in each sentence and correct it.\nCâu đã cho: Ann is a honest girl.\nViệc cần làm: tìm đúng MỘT chỗ sai trong câu rồi sửa lại.🏗️ Cấu trúc: Mạo từ đứng trước danh từ:\na + danh từ đếm được SỐ ÍT, bắt đầu bằng âm PHỤ ÂM (a book, a teacher)\nan + danh từ đếm được SỐ ÍT, bắt đầu bằng âm NGUYÊN ÂM (an apple, an egg, an orange)\nthe + người / vật CỤ THỂ mà người nghe đã biết là cái nào (the book on my desk)\nsome + danh từ SỐ NHIỀU hoặc danh từ KHÔNG đếm được (some books, some milk)\nNhắc tới LẦN ĐẦU thì dùng a / an, nhắc lại chính vật đó thì đổi sang the.\nXét theo ÂM ĐỌC chứ không theo chữ viết: an hour (h câm), a university (đọc /juː/).\nSoi vào câu này: a → an🔍 Giải thích chi tiết:\nChỗ sai là \"a\". Từ đứng liền sau là \"honest\", bắt đầu bằng âm NGUYÊN ÂM nên phải dùng \"an\" chứ không phải \"a\".\nCách kiểm tra: đọc to danh từ đứng ngay sau mạo từ - nghe âm đầu là nguyên âm thì dùng an, phụ âm thì dùng a; còn danh từ số nhiều hoặc không đếm được thì bỏ hẳn a / an và dùng some.",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "He is an student.",
   "dap": "an",
   "giai": "✅ Đáp án đúng: an -> a📘 Ngữ cảnh: Câu sai ở chỗ student.🏗️ Cấu trúc:Mạo từ a / an chọn theo ÂM ĐẦU của từ ngay sau.Số đếm lớn hơn 1 thì danh từ phải ở số nhiều.🔍 Giải thích chi tiết: student bắt đầu bằng âm phụ âm nên dùng a. Vì vậy câu đúng là: He is a student.",
   "huongDan": "Find the mistake and correct it.",
   "choices": []
  },
  {
   "noi": "Does she like write letters?",
   "dap": "write",
   "giai": "✅ Đáp án đúng: write → writing - câu đúng: Does she like writing letters? = Cô ấy có thích viết thư không?📘 Ngữ cảnh: Câu hỏi đã đúng phần Does she like, nhưng động từ sau like vẫn ở nguyên thể.🏗️ Cấu trúc: \nS + like / love / hate + V-ing\nSoi vào câu này: Does she + like + writing + letters\nChủ ngữ he / she / it và danh từ số ít → động từ cảm xúc thêm -s (likes, loves, hates).\nPhủ định: S + don’t / doesn’t + like + V-ing (sau don’t/doesn’t thì không chia nữa).\nCâu hỏi: Do / Does + S + like + V-ing?\nCách thêm -ing: thường thêm thẳng (play → playing); bỏ -e (ride → riding); gấp đôi phụ âm (swim → swimming).🔍 Giải thích chi tiết: Sửa write → writing. Chú ý ba động từ trong câu: Does (trợ động từ, giữ nguyên), like (nguyên thể sau Does - đúng rồi), write (hoạt động → phải thành writing).",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "I like eating cheeses.",
   "dap": "cheeses",
   "giai": "✅ Đáp án đúng: cheeses -> cheese📘 Ngữ cảnh: Nói về sở thích ăn uống: \"Tôi thích ăn phô mai.\"🏗️ Cấu trúc:Danh từ KHÔNG ĐẾM ĐƯỢC không thêm -scheese.🔍 Giải thích chi tiết: cheese là danh từ không đếm được nên không thêm -s. Vì vậy câu đúng là: I like eating cheese.",
   "huongDan": "Each sentence has one mistake. Find and correct it.",
   "choices": []
  },
  {
   "noi": "My town have four primary schools.",
   "dap": "have",
   "giai": "✅ Đáp án đúng: have → has - câu đúng: My town has four primary schools. = Thị trấn của tôi có bốn trường tiểu học.📘 Ngữ cảnh: Chủ ngữ My town là danh từ số ít (một thị trấn) nhưng động từ lại là have.🏗️ Cấu trúc: \nS + have / has + O\nSoi vào câu này: My town + has + four primary schools\nBảng chia:\nI - you - we - they, danh từ số nhiều → have\nhe - she - it, danh từ số ít → has\nChủ ngữ My town ở số ít nên dùng has.\nNhớ: chia theo CHỦ NGỮ, không theo tân ngữ phía sau.\nPhủ định don’t / doesn’t have; câu hỏi Do / Does + S + have? (sau đó have giữ nguyên thể).🔍 Giải thích chi tiết: Sửa have → has → My town has four primary schools. Lại là bẫy tân ngữ: four primary schools ở số nhiều nhưng chủ ngữ mới là thứ quyết định. Bài này có tới ba câu cùng kiểu bẫy đó (the garden, the farmer, my town).",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Are there some books in the bag?",
   "dap": "some",
   "giai": "✅ Đáp án đúng: sửa \"some\" thành \"any\"\nCâu đúng: Are there any books in the bag?📘 Ngữ cảnh:\nBài yêu cầu: Find the mistake in each sentence and correct it.\nCâu đã cho: Are there some books in the bag?\nViệc cần làm: tìm đúng MỘT chỗ sai trong câu rồi sửa lại.🏗️ Cấu trúc: Mạo từ đứng trước danh từ:\na + danh từ đếm được SỐ ÍT, bắt đầu bằng âm PHỤ ÂM (a book, a teacher)\nan + danh từ đếm được SỐ ÍT, bắt đầu bằng âm NGUYÊN ÂM (an apple, an egg, an orange)\nthe + người / vật CỤ THỂ mà người nghe đã biết là cái nào (the book on my desk)\nsome + danh từ SỐ NHIỀU hoặc danh từ KHÔNG đếm được (some books, some milk)\nNhắc tới LẦN ĐẦU thì dùng a / an, nhắc lại chính vật đó thì đổi sang the.\nXét theo ÂM ĐỌC chứ không theo chữ viết: an hour (h câm), a university (đọc /juː/).\nSoi vào câu này: some → any🔍 Giải thích chi tiết:\nChỗ sai là \"some\". \"books\" là danh từ đếm được số ít nên phải dùng mạo từ a chứ không dùng some.\nCách kiểm tra: đọc to danh từ đứng ngay sau mạo từ - nghe âm đầu là nguyên âm thì dùng an, phụ âm thì dùng a; còn danh từ số nhiều hoặc không đếm được thì bỏ hẳn a / an và dùng some.",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Her dad get up at 6 o’clock every morning.",
   "dap": "get up",
   "giai": "✅ Đáp án đúng: get up → gets up - câu đúng: Her dad gets up at 6 o’clock every morning. = Bố cô ấy dậy lúc 6 giờ mỗi sáng.📘 Ngữ cảnh: Chủ ngữ Her dad chỉ một người → số ít, và đây là câu khẳng định nên động từ phải thêm đuôi - nhưng câu lại để nguyên thể.🏗️ Cấu trúc: \nS + V (-s / -es) + O (thì hiện tại đơn)\nSoi vào câu này: Her dad + gets up + ...\nBảng chia động từ:\nI - you - we - they, danh từ số nhiều → V nguyên thể (they play)\nhe - she - it, danh từ số ít → V + -s / -es (he plays)\nChủ ngữ Her dad ở số ít ngôi thứ ba nên dùng gets up.\nCách thêm đuôi: thường +s; tận cùng s, x, ch, sh, o → +es (watch → watches);\ntận cùng -y sau phụ âm → đổi thành -ies (study → studies), sau nguyên âm thì giữ y (play → plays).🔍 Giải thích chi tiết: Sửa get up → gets up: thêm -s vào động từ chính get, còn tiểu từ up giữ nguyên ở cuối (viết get ups là sai). Cụm every morning xác nhận đây là thói quen ở thì hiện tại đơn.",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Is they your cousins?",
   "dap": "Is",
   "giai": "✅ Đáp án đúng: Is → Are - câu đúng: Are they your cousins? = Họ là anh chị em họ của bạn phải không?📘 Ngữ cảnh: Chủ ngữ they luôn ở số nhiều nhưng câu hỏi lại mở đầu bằng Is - dạng của số ít.🏗️ Cấu trúc: \nKhẳng định: S + be + ...\nPhủ định: S + be + not + ...\nNghi vấn: Be + S + ...?\nSoi vào câu này: they + are → they + aren’t → Are + they ... ?\nBảng chia be: I → am | he / she / it → is | you / we / they → are\nTrả lời ngắn: Yes, + S + be. / No, + S + be + not. (câu Yes không viết tắt)🔍 Giải thích chi tiết: Sửa Is → Are → Are they your cousins? Đại từ they chỉ đi với are/aren’t. Danh từ cousins có -s ở cuối cũng là dấu hiệu số nhiều. Nhớ trong câu hỏi thì be đứng trước chủ ngữ, nhưng vẫn phải chia theo chủ ngữ đó.",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Have you got any homework? Yes, I do.",
   "dap": "do",
   "giai": "✅ Đáp án đúng: do → have - câu đúng: Have you got any homework? Yes, I have. = Bạn có bài tập về nhà không? - Có.📘 Ngữ cảnh: Câu hỏi dùng Have ... got? nhưng câu trả lời lại dùng do của cấu trúc have.🏗️ Cấu trúc: \nS + have / has + O\nSoi vào câu này: Have you got any homework? Yes, I have + have / has + ...\nBảng chia:\nI - you - we - they, danh từ số nhiều → have\nhe - she - it, danh từ số ít → has\nChủ ngữ Have you got any homework? Yes, I have ở xem bảng dưới nên dùng have / has.\nNhớ: chia theo CHỦ NGỮ, không theo tân ngữ phía sau.\nPhủ định don’t / doesn’t have; câu hỏi Do / Does + S + have? (sau đó have giữ nguyên thể).🔍 Giải thích chi tiết: Sửa do → have → Have you got any homework? Yes, I have. Đây là câu ngược với câu trên: câu đó sửa doesn’t → hasn’t, câu này sửa do → have. Cả hai đều minh hoạ một nguyên tắc: trả lời phải khớp với trợ động từ của câu hỏi.",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Was Ted and you in the laboratory yesterday afternoon?",
   "dap": "Was",
   "giai": "✅ Đáp án đúng: Was → Were - câu đúng: Were Ted and you in the laboratory yesterday afternoon? = Ted và bạn có ở phòng thí nghiệm chiều qua không?📘 Ngữ cảnh: Chủ ngữ Ted and you gồm hai người nối bằng and → số nhiều, nhưng câu hỏi lại mở đầu bằng Was.🏗️ Cấu trúc: \nKhẳng định: S + was / were + ...\nPhủ định: S + wasn’t / weren’t + ...\nNghi vấn: Was / Were + S + ... ?\nSoi vào câu này: Ted and you + were → Ted and you + weren’t → Were + Ted and you ... ?\nBảng chia:\nI - he - she - it, danh từ số ít → was (phủ định wasn’t)\nyou - we - they, danh từ số nhiều → were (phủ định weren’t)\nThere was + danh từ số ít | There were + danh từ số nhiều\nDấu hiệu quá khứ: yesterday, last week / month / year, ... ago, in 2010.🔍 Giải thích chi tiết: Sửa Was → Were. Chữ and nối hai thành phần là dấu hiệu chắc chắn của số nhiều. Cụm yesterday afternoon đã đúng nên giữ nguyên.",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "The man isn’tn my teacher.",
   "dap": "isn’tn",
   "giai": "✅ Đáp án đúng: sửa isn’tn thành isn’t\nCâu đúng: The man isn’t my teacher.📘 Ngữ cảnh: Yêu cầu của phần này: gạch chân chỗ sai trong câu rồi sửa lại cho đúng. Câu đã cho: The man isn’tn my teacher. Chủ ngữ The man là danh từ số ít nên to be là is. Chỗ sai ở đây là lỗi CHÍNH TẢ của dạng phủ định.🏗️ Cấu trúc: Động từ to be chia theo chủ ngữ:\nI + am (phủ định: I am not - viết tắt I’m not)\nHe - She - It, danh từ số ít + is (phủ định: is not - viết tắt isn’t)\nYou - We - They, danh từ số nhiều + are (phủ định: are not - viết tắt aren’t)\nNghi vấn: đảo be lên trước chủ ngữ - Am / Is / Are + S + … ?\nSoi vào câu này: The man = He → He + is → phủ định: isn’t🔍 Giải thích chi tiết: Chỗ sai là isn’tn, phải sửa thành isn’t. Dạng viết tắt đúng là isn’t: lấy is not rồi bỏ chữ o, thay bằng dấu ’. Viết isn’tn là thừa một chữ n. Cách nhớ: dấu ’ luôn đứng đúng chỗ chữ cái bị bỏ đi.",
   "huongDan": "Underline the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "My mom and I was in the supermarket two weeks ago.",
   "dap": "was",
   "giai": "✅ Đáp án đúng: was → were - câu đúng: My mom and I were in the supermarket two weeks ago. = Mẹ và tôi đã ở siêu thị cách đây hai tuần.📘 Ngữ cảnh: Chủ ngữ My mom and I gồm hai người → số nhiều, nhưng câu dùng was.🏗️ Cấu trúc: \nKhẳng định: S + was / were + ...\nPhủ định: S + wasn’t / weren’t + ...\nNghi vấn: Was / Were + S + ... ?\nSoi vào câu này: My mom and I + were → My mom and I + weren’t → Were + My mom and I ... ?\nBảng chia:\nI - he - she - it, danh từ số ít → was (phủ định wasn’t)\nyou - we - they, danh từ số nhiều → were (phủ định weren’t)\nThere was + danh từ số ít | There were + danh từ số nhiều\nDấu hiệu quá khứ: yesterday, last week / month / year, ... ago, in 2010.\nÁp công thức vào câu này: My mom and I + were + in the supermarket two weeks ago🔍 Giải thích chi tiết: Sửa was → were. Bẫy ở đây là chữ I đứng ngay trước chỗ trống khiến nhiều bạn chọn was - nhưng chủ ngữ đầy đủ là cả cụm nối bằng and. Cụm two weeks ago đã đúng cấu trúc số + đơn vị + ago.",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "They doesn’t like doing the housework.",
   "dap": "doesn’t",
   "giai": "✅ Đáp án đúng: doesn’t → don’t - câu đúng: They don’t like doing the housework. = Họ không thích làm việc nhà.📘 Ngữ cảnh: Chủ ngữ They ở số nhiều nhưng câu dùng doesn’t - trợ động từ dành cho số ít ngôi 3.🏗️ Cấu trúc: \nS + like / love / hate + V-ing\nSoi vào câu này: They + don’t like + doing + the housework\nChủ ngữ he / she / it và danh từ số ít → động từ cảm xúc thêm -s (likes, loves, hates).\nPhủ định: S + don’t / doesn’t + like + V-ing (sau don’t/doesn’t thì không chia nữa).\nCâu hỏi: Do / Does + S + like + V-ing?\nCách thêm -ing: thường thêm thẳng (play → playing); bỏ -e (ride → riding); gấp đôi phụ âm (swim → swimming).🔍 Giải thích chi tiết: Sửa doesn’t → don’t → They don’t like doing the housework. Đây là câu ngược với câu về Alex phía trên: câu đó cần đổi do not → doesn’t (số ít), câu này cần đổi doesn’t → don’t (số nhiều). Cứ nhìn chủ ngữ trước rồi mới chọn trợ động từ.",
   "huongDan": "Find and correct the mistake in each sentence.",
   "choices": []
  },
  {
   "noi": "Sarah bought a new dress but went to the party.",
   "dap": "but",
   "giai": "✅ Đáp án đúng: but → and - Sarah bought a new dress and went to the party.📘 Ngữ cảnh: Sarah mua váy mới rồi đi dự tiệc - hai việc cùng chiều, việc trước phục vụ việc sau.🏗️ Cấu trúc: \nvế 1 + liên từ + vế 2\nSoi vào câu này: Sarah bought a new dress but went to the party.\nsửa but thành and\nBảng 4 liên từ - nhìn QUAN HỆ giữa hai vế:\nand = và → hai vế cùng chiều, bổ sung cho nhau\n The leopard is fast and strong.\nbut = nhưng → hai vế trái ngược, vế sau ngược với điều mong đợi\n I’m very tired, but I can’t sleep.\nor = hoặc → đưa ra lựa chọn, thường trong câu hỏi\n Do you want a cookie or a cupcake?\nso = nên → vế 1 là nguyên nhân, vế 2 là kết quả\n I was tired, so I went to sleep early.\nMẹo phân biệt nhanh:\nthấy dấu ? và hai thứ để chọn → or\nvế sau phủ định hoặc ngược ý vế trước → but\nthay thử bằng vì vậy mà nghe xuôi → so; thay bằng và nghe xuôi → and🔍 Giải thích chi tiết: Sửa but → and. Mua váy rồi đi tiệc là chuỗi việc hợp lý nối tiếp, chẳng có gì mâu thuẫn, nên dùng and chứ không dùng but.",
   "huongDan": "Underline the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Look! The zoo-keepers train a big elephant.",
   "dap": "train",
   "giai": "✅ Đáp án đúng: train → are training (lỗi: thiếu cả be lẫn -ing)📘 Ngữ cảnh: Từ Look! ở đầu câu là dấu hiệu bắt buộc dùng hiện tại tiếp diễn, nhưng động từ train đang ở dạng hiện tại đơn.🏗️ Cấu trúc: \nKhẳng định: S + am / is / are + V-ing + ...\nPhủ định: S + am / is / are + not + V-ing + ...\nNghi vấn: Am / Is / Are + S + V-ing ... ?\nSoi vào câu này: The zoo-keepers + are + training + ...\nBảng chia be:\nI → am (phủ định ’m not)\nhe - she - it, danh từ số ít → is (phủ định isn’t)\nyou - we - they, danh từ số nhiều → are (phủ định aren’t)\nChủ ngữ The zoo-keepers ở số nhiều nên dùng are.\nThiếu một trong hai phần là SAI: phải có đủ be và V-ing.\nDấu hiệu nhận biết: now, right now, at the moment, today, Look!, Listen!, Watch out!, Be quiet!\nTrả lời ngắn: Yes, + S + am / is / are. / No, + S + ’m not / isn’t / aren’t.🔍 Giải thích chi tiết: Sửa train → are training. Chủ ngữ The zoo-keepers có đuôi -s → số nhiều nên dùng are, và động từ phải thêm -ing. Thiếu một trong hai phần đều sai.",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "My brother has the doll. The doll is pretty.",
   "dap": "the",
   "giai": "✅ Đáp án đúng: the -> a📘 Ngữ cảnh: Nói về búp bê của anh trai: \"Anh trai tôi có một con búp bê. Con búp bê đó xinh.\"🏗️ Cấu trúc:Nhắc lần ĐẦUa + danh từ số ít.Trước ÂM phụ âmdùng a (a doll).🔍 Giải thích chi tiết: Câu đầu nhắc con búp bê lần đầu nên phải dùng a, không dùng the. doll bắt đầu bằng âm phụ âm nên là a. Câu sau nhắc lại đúng con búp bê đó nên The doll là đúng. Vì vậy câu đúng là: My brother has a doll. The doll is pretty.",
   "huongDan": "Find the mistake and correct it.",
   "choices": []
  },
  {
   "noi": "Last night I sleept for 10 hours.",
   "dap": "sleept",
   "giai": "✅ Đáp án đúng: sleept → slept - câu đúng: Last night I slept for 10 hours. = Tối qua tôi đã ngủ 10 tiếng.📘 Ngữ cảnh: Cụm Last night cho biết quá khứ. Người viết đã cố chia quá khứ nhưng sai chính tả.🏗️ Cấu trúc: \nS + V2 (cột 2 - quá khứ) + O (động từ BẤT QUY TẮC)\nSoi vào câu này: sleep → slept\nĐộng từ bất quy tắc KHÔNG thêm -ed - phải học thuộc từng từ.\nBảng các từ hay gặp:\ngo → went | eat → ate | drink → drank | take → took\nhave → had | see → saw | write → wrote | do → did\ncome → came | ride → rode | say → said | drive → drove\nget up → got up, wake up → woke up (chỉ đổi động từ chính, tiểu từ giữ nguyên)\nread → read: viết y hệt nhưng đọc khác (/riːd/ → /red/).\nV2 dùng chung cho mọi chủ ngữ; sau didn’t / Did thì quay về NGUYÊN THỂ.\nÁp công thức vào câu này: I + slept + for 10 hours🔍 Giải thích chi tiết: Sửa sleept → slept. sleep là bất quy tắc: bỏ bớt một chữ e rồi thêm -t → slept (không phải sleept hay sleeped). Cùng nhóm: keep → kept, feel → felt.",
   "huongDan": "Underline the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "What are you like doing at the weekend?",
   "dap": "are",
   "giai": "✅ Đáp án đúng: are → do - câu đúng: What do you like doing at the weekend? = Bạn thích làm gì vào cuối tuần?📘 Ngữ cảnh: Câu hỏi dùng động từ like - đây là động từ thường, nhưng câu lại dùng trợ động từ are của động từ be.🏗️ Cấu trúc: \nS + like / love / hate + V-ing\nSoi vào câu này: you + like + doing + at the weekend (câu hỏi: Do + S + like + V-ing?)\nChủ ngữ he / she / it và danh từ số ít → động từ cảm xúc thêm -s (likes, loves, hates).\nPhủ định: S + don’t / doesn’t + like + V-ing (sau don’t/doesn’t thì không chia nữa).\nCâu hỏi: Do / Does + S + like + V-ing?\nCách thêm -ing: thường thêm thẳng (play → playing); bỏ -e (ride → riding); gấp đôi phụ âm (swim → swimming).🔍 Giải thích chi tiết: Sửa are → do → What do you like doing at the weekend? Phần like doing đã đúng (sau like dùng V-ing). Lỗi này rất hay gặp vì HS quen mẫu câu What are you doing? (thì hiện tại tiếp diễn) rồi bê nguyên trợ động từ sang.",
   "huongDan": "Find and correct the mistake in each sentence.",
   "choices": []
  },
  {
   "noi": "Look at a boy! He has a ball.",
   "dap": "a",
   "giai": "✅ Đáp án đúng: sửa \"a\" thành \"the\"\nCâu đúng: Look at the boy! He has a ball.📘 Ngữ cảnh:\nBài yêu cầu: Find and correct the mistake in each of the sentences.\nCâu đã cho: Look at a boy! He has a ball.\nViệc cần làm: tìm đúng MỘT chỗ sai trong câu rồi sửa lại.🏗️ Cấu trúc: Mạo từ đứng trước danh từ:\na + danh từ đếm được SỐ ÍT, bắt đầu bằng âm PHỤ ÂM (a book, a teacher)\nan + danh từ đếm được SỐ ÍT, bắt đầu bằng âm NGUYÊN ÂM (an apple, an egg, an orange)\nthe + người / vật CỤ THỂ mà người nghe đã biết là cái nào (the book on my desk)\nsome + danh từ SỐ NHIỀU hoặc danh từ KHÔNG đếm được (some books, some milk)\nNhắc tới LẦN ĐẦU thì dùng a / an, nhắc lại chính vật đó thì đổi sang the.\nXét theo ÂM ĐỌC chứ không theo chữ viết: an hour (h câm), a university (đọc /juː/).\nSoi vào câu này: a → the🔍 Giải thích chi tiết:\nChỗ sai là \"a\". Dạng đúng ở đây là \"the\".\nCách kiểm tra: đọc to danh từ đứng ngay sau mạo từ - nghe âm đầu là nguyên âm thì dùng an, phụ âm thì dùng a; còn danh từ số nhiều hoặc không đếm được thì bỏ hẳn a / an và dùng some.",
   "huongDan": "Find and correct the mistake in each of the sentences.",
   "choices": []
  },
  {
   "noi": "Tammy is goes to the cinema every Saturday.",
   "dap": "is goes",
   "giai": "✅ Đáp án đúng: is goes → goes - câu đúng: Tammy goes to the cinema every Saturday. = Tammy đi xem phim vào mỗi thứ Bảy.📘 Ngữ cảnh: Câu có hai động từ đứng cạnh nhau: is (động từ be) và goes (động từ thường). Một câu khẳng định ở hiện tại đơn chỉ cần một động từ.🏗️ Cấu trúc: \nS + V (-s / -es) + O (thì hiện tại đơn)\nSoi vào câu này: Tammy + goes + ...\nBảng chia động từ:\nI - you - we - they, danh từ số nhiều → V nguyên thể (they play)\nhe - she - it, danh từ số ít → V + -s / -es (he plays)\nChủ ngữ Tammy ở số ít ngôi thứ ba nên dùng goes.\nCách thêm đuôi: thường +s; tận cùng s, x, ch, sh, o → +es (watch → watches);\ntận cùng -y sau phụ âm → đổi thành -ies (study → studies), sau nguyên âm thì giữ y (play → plays).🔍 Giải thích chi tiết: Sửa is goes → goes: bỏ hẳn is đi. Động từ be và động từ thường không bao giờ đứng cạnh nhau ở thì hiện tại đơn. Dạng goes đã đúng vì chủ ngữ Tammy ở số ít.",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "He isn’t understand the lesson.",
   "dap": "isn’t understand",
   "giai": "✅ Đáp án đúng: isn’t understand → doesn’t understand📘 Ngữ cảnh: Động từ understand (hiểu) diễn tả trạng thái nhận thức, luôn dùng hiện tại đơn, không dùng tiếp diễn.🏗️ Cấu trúc: \nHiện tại ĐƠN: S + V (-s / -es) → việc lặp đi lặp lại, sự thật\nHiện tại TIẾP DIỄN: S + am / is / are + V-ing → việc đang xảy ra lúc này\nBảng dấu hiệu nhận biết:\nĐƠN: every day / week - always, usually, often, sometimes, never\n on Mondays - lịch trình cố định - sự thật hiển nhiên\nTIẾP DIỄN: now - right now - at the moment - at present - today\n Look! - Listen! - Watch out! - Be quiet!\nPhủ định / nghi vấn:\nĐƠN: don’t / doesn’t + V | Do / Does + S + V ?\nTIẾP DIỄN: am / is / aren’t + V-ing | Am / Is / Are + S + V-ing ?\nLưu ý: không trộn hai thì - đã dùng be thì phải có V-ing, đã dùng do/does thì động từ để nguyên thể.\nSoi vào câu này: He isn’t understand the lesson.\nsửa isn’t understand → doesn’t understand🔍 Giải thích chi tiết: Sửa isn’t understand → doesn’t understand. Câu đang trộn be với động từ nguyên thể - sai công thức. Phủ định hiện tại đơn với He là doesn’t + V nguyên thể. Các động từ chỉ trạng thái (understand, know, like, want) không chia ở tiếp diễn.",
   "huongDan": "Find the mistake in each of the sentences and correct it.",
   "choices": []
  },
  {
   "noi": "Ann is often reads books at night.",
   "dap": "is often",
   "giai": "✅ Đáp án đúng: is often → often - câu đúng: Ann often reads books at night. = Ann thường đọc sách vào buổi tối.📘 Ngữ cảnh: Câu có hai động từ cùng lúc: is (động từ be) và reads (động từ thường). Một câu ở thì hiện tại đơn chỉ cần một động từ.🏗️ Cấu trúc: \nS + trạng từ tần suất + V (động từ thường)\nS + be + trạng từ tần suất (đứng SAU be)\nSoi vào câu này: Ann + often + reads + ...\nThang tần suất (từ nhiều đến ít):\nalways 100% → usually ~90% → often ~70% → sometimes ~50% → never 0%\nTrong câu hỏi vị trí không đổi: Do / Does + S + trạng từ + V ?\nTrạng từ tần suất không làm đổi cách chia động từ - vẫn thêm -s cho he / she / it.🔍 Giải thích chi tiết: Sửa is often → often: bỏ hẳn is, giữ lại trạng từ often đứng trước động từ thường → Ann often reads books at night. Động từ be và động từ thường không đứng cạnh nhau ở thì hiện tại đơn.",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "He is the most smartest student in the class.",
   "dap": "most smartest",
   "giai": "✅ Đáp án đúng: most smartest → smartest - câu đúng: He is the smartest student in the class. = Cậu ấy là học sinh thông minh nhất lớp.📘 Ngữ cảnh: Câu dùng cả most lẫn đuôi -est (most smartest) - cũng là lỗi so sánh kép, lần này ở dạng nhất.🏗️ Cấu trúc: \nA + be + the + tính từ so sánh nhất + in / of + phạm vi\nSoi vào câu này: He + is + the smartest + student in the class\nBảng biến đổi:\ntính từ NGẮN → the + tính từ + -est (tall → the tallest)\ntính từ DÀI → the most + tính từ (the most careful)\nbất quy tắc: good → the best | bad → the worst\nỞ đây smart là tính từ NGẮN nên dùng the smartest. Luôn có the, và không có than.🔍 Giải thích chi tiết: Sửa most smartest → smartest → He is the smartest student in the class. Bỏ most, giữ lại the smartest. Quy tắc vàng: đã thêm đuôi thì không dùng more/most, và ngược lại.",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Look! The baby cries in his room.",
   "dap": "cries",
   "giai": "✅ Đáp án đúng: cries → is crying📘 Ngữ cảnh: Từ Look! báo hiệu việc đang xảy ra trước mắt → phải dùng hiện tại tiếp diễn.🏗️ Cấu trúc: \nHiện tại ĐƠN: S + V (-s / -es) → việc lặp đi lặp lại, sự thật\nHiện tại TIẾP DIỄN: S + am / is / are + V-ing → việc đang xảy ra lúc này\nBảng dấu hiệu nhận biết:\nĐƠN: every day / week - always, usually, often, sometimes, never\n on Mondays - lịch trình cố định - sự thật hiển nhiên\nTIẾP DIỄN: now - right now - at the moment - at present - today\n Look! - Listen! - Watch out! - Be quiet!\nPhủ định / nghi vấn:\nĐƠN: don’t / doesn’t + V | Do / Does + S + V ?\nTIẾP DIỄN: am / is / aren’t + V-ing | Am / Is / Are + S + V-ing ?\nLưu ý: không trộn hai thì - đã dùng be thì phải có V-ing, đã dùng do/does thì động từ để nguyên thể.\nSoi vào câu này: Look! The baby cries in his room.\nsửa cries → is crying🔍 Giải thích chi tiết: Sửa cries → is crying. Dạng cries là hiện tại đơn (thói quen), không hợp với Look!. Chú ý: cry thành crying thì giữ nguyên y; còn cries mới đổi y → ies - hai quy tắc khác nhau.",
   "huongDan": "Find the mistake in each of the sentences and correct it.",
   "choices": []
  },
  {
   "noi": "We isn’t ready for the test.",
   "dap": "isn’t",
   "giai": "✅ Đáp án đúng: isn’t → aren’t - câu đúng: We aren’t ready for the test. = Chúng tôi chưa sẵn sàng cho bài kiểm tra.📘 Ngữ cảnh: Chủ ngữ We luôn ở số nhiều nhưng câu lại dùng isn’t - dạng của số ít.🏗️ Cấu trúc: \nKhẳng định: S + be + ...\nPhủ định: S + be + not + ...\nNghi vấn: Be + S + ...?\nSoi vào câu này: We + are → We + aren’t → Are + We ... ?\nBảng chia be: I → am | he / she / it → is | you / we / they → are\nTrả lời ngắn: Yes, + S + be. / No, + S + be + not. (câu Yes không viết tắt)🔍 Giải thích chi tiết: Sửa isn’t → aren’t vì We đi với are/aren’t. Đây là câu ngược với câu về That girl phía trên: câu đó phải đổi aren’t → isn’t, câu này đổi isn’t → aren’t. Cứ xác định chủ ngữ trước rồi mới chọn dạng của be.",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "My mom don’t like cooking.",
   "dap": "don’t",
   "giai": "✅ Đáp án đúng: don’t → doesn’t - câu đúng: My mom doesn’t like cooking. = Mẹ tôi không thích nấu ăn.📘 Ngữ cảnh: Chủ ngữ My mom chỉ một người → số ít, nhưng câu lại dùng don’t.🏗️ Cấu trúc: \nPhủ định: S + don’t / doesn’t + V (nguyên thể)\nNghi vấn: Do / Does + S + V (nguyên thể) ?\nSoi vào câu này: My mom + doesn’t + like\nBảng chọn trợ động từ:\nI - you - we - they, số nhiều → do / don’t\nhe - she - it, số ít → does / doesn’t\nChủ ngữ My mom ở số ít nên dùng doesn’t.\nSau do / does / don’t / doesn’t, động từ giữ NGUYÊN THỂ - phần -s đã nằm ở does.\nTrả lời ngắn: Yes, + S + do / does. / No, + S + don’t / doesn’t.🔍 Giải thích chi tiết: Sửa don’t → doesn’t vì chủ ngữ số ít. Phần like cooking đã đúng (sau like dùng V-ing). Nhớ: don’t cho I / you / we / they và số nhiều; doesn’t cho he / she / it và số ít.",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "They are three doctor.",
   "dap": "doctor",
   "giai": "✅ Đáp án đúng: doctor -> doctors📘 Ngữ cảnh: Câu sai ở chỗ three doctor.🏗️ Cấu trúc:Mạo từ a / an chọn theo ÂM ĐẦU của từ ngay sau.Số đếm lớn hơn 1 thì danh từ phải ở số nhiều.🔍 Giải thích chi tiết: có số three nên danh từ phải ở số nhiều. Vì vậy câu đúng là: They are three doctors.",
   "huongDan": "Find the mistake and correct it.",
   "choices": []
  },
  {
   "noi": "The firemen are puting out the fire.",
   "dap": "puting",
   "giai": "✅ Đáp án đúng: puting → putting (lỗi: quên gấp đôi phụ âm)📘 Ngữ cảnh: Câu đã có đủ are và đuôi -ing, nên lỗi ở cách viết đuôi -ing.🏗️ Cấu trúc: \nKhẳng định: S + am / is / are + V-ing + ...\nPhủ định: S + am / is / are + not + V-ing + ...\nNghi vấn: Am / Is / Are + S + V-ing ... ?\nSoi vào câu này: The firemen + is + putting + ...\nBảng chia be:\nI → am (phủ định ’m not)\nhe - she - it, danh từ số ít → is (phủ định isn’t)\nyou - we - they, danh từ số nhiều → are (phủ định aren’t)\nChủ ngữ The firemen ở số ít nên dùng is.\nThiếu một trong hai phần là SAI: phải có đủ be và V-ing.\nDấu hiệu nhận biết: now, right now, at the moment, today, Look!, Listen!, Watch out!, Be quiet!\nTrả lời ngắn: Yes, + S + am / is / are. / No, + S + ’m not / isn’t / aren’t.🔍 Giải thích chi tiết: Sửa puting → putting. Động từ put có 1 nguyên âm u + 1 phụ âm t ở cuối → phải gấp đôi t. Cùng quy tắc với swim → swimming, run → running, sit → sitting.",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "We are waveing to our friends at the airport.",
   "dap": "waveing",
   "giai": "✅ Đáp án đúng: waveing → waving (lỗi: thêm -ing sai chính tả)📘 Ngữ cảnh: Câu đã có đủ are và động từ dạng -ing, nên lỗi nằm ở cách viết đuôi -ing.🏗️ Cấu trúc: \nKhẳng định: S + am / is / are + V-ing + ...\nPhủ định: S + am / is / are + not + V-ing + ...\nNghi vấn: Am / Is / Are + S + V-ing ... ?\nSoi vào câu này: We + is + waving + ...\nBảng chia be:\nI → am (phủ định ’m not)\nhe - she - it, danh từ số ít → is (phủ định isn’t)\nyou - we - they, danh từ số nhiều → are (phủ định aren’t)\nChủ ngữ We ở số ít nên dùng is.\nThiếu một trong hai phần là SAI: phải có đủ be và V-ing.\nDấu hiệu nhận biết: now, right now, at the moment, today, Look!, Listen!, Watch out!, Be quiet!\nTrả lời ngắn: Yes, + S + am / is / are. / No, + S + ’m not / isn’t / aren’t.🔍 Giải thích chi tiết: Sửa waveing → waving. Động từ wave tận cùng bằng -e câm nên phải bỏ e trước khi thêm -ing. Cùng quy tắc với write → writing, dance → dancing.",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Where was your classmates yesterday?",
   "dap": "was",
   "giai": "✅ Đáp án đúng: was → were - câu đúng: Where were your classmates yesterday? = Các bạn cùng lớp của bạn đã ở đâu hôm qua?📘 Ngữ cảnh: Chủ ngữ your classmates có đuôi -s → số nhiều, nhưng câu dùng was.🏗️ Cấu trúc: \nKhẳng định: S + was / were + ...\nPhủ định: S + wasn’t / weren’t + ...\nNghi vấn: Was / Were + S + ... ?\nSoi vào câu này: your classmates + were → your classmates + weren’t → Were + your classmates ... ?\nBảng chia:\nI - he - she - it, danh từ số ít → was (phủ định wasn’t)\nyou - we - they, danh từ số nhiều → were (phủ định weren’t)\nThere was + danh từ số ít | There were + danh từ số nhiều\nDấu hiệu quá khứ: yesterday, last week / month / year, ... ago, in 2010.\nÁp công thức vào câu này: Where + were + your classmates yesterday🔍 Giải thích chi tiết: Sửa was → were. Trong câu hỏi có từ để hỏi, be vẫn phải chia theo chủ ngữ đứng sau nó - ở đây là classmates, không phải Where.",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Foxes isn’t in the cage.",
   "dap": "isn’t",
   "giai": "✅ Đáp án đúng: sửa isn’t thành aren’t\nCâu đúng: Foxes aren’t in the cage.📘 Ngữ cảnh: Yêu cầu của phần này: gạch chân chỗ sai trong câu rồi sửa lại cho đúng. Câu đã cho: Foxes isn’t in the cage. Chủ ngữ là Foxes - danh từ có đuôi -es nên là số nhiều, thay được bằng They.🏗️ Cấu trúc: Động từ to be chia theo chủ ngữ:\nI + am (phủ định: I am not - viết tắt I’m not)\nHe - She - It, danh từ số ít + is (phủ định: is not - viết tắt isn’t)\nYou - We - They, danh từ số nhiều + are (phủ định: are not - viết tắt aren’t)\nNghi vấn: đảo be lên trước chủ ngữ - Am / Is / Are + S + … ?\nSoi vào câu này: Foxes = They → They + are → phủ định: aren’t🔍 Giải thích chi tiết: Chỗ sai là isn’t, phải sửa thành aren’t. Dạng phủ định vẫn phải chia theo chủ ngữ. Chủ ngữ số nhiều thì dùng aren’t chứ không dùng isn’t. Chú ý fox thêm -es (chứ không phải -s) vì tận cùng bằng -x.",
   "huongDan": "Underline the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "An Earth goes round the Sun.",
   "dap": "An",
   "giai": "✅ Đáp án đúng: sửa \"An\" thành \"The\"\nCâu đúng: The Earth goes round the Sun.📘 Ngữ cảnh:\nBài yêu cầu: Find the mistake in each sentence and correct it.\nCâu đã cho: An Earth goes round the Sun.\nViệc cần làm: tìm đúng MỘT chỗ sai trong câu rồi sửa lại.🏗️ Cấu trúc: Mạo từ đứng trước danh từ:\na + danh từ đếm được SỐ ÍT, bắt đầu bằng âm PHỤ ÂM (a book, a teacher)\nan + danh từ đếm được SỐ ÍT, bắt đầu bằng âm NGUYÊN ÂM (an apple, an egg, an orange)\nthe + người / vật CỤ THỂ mà người nghe đã biết là cái nào (the book on my desk)\nsome + danh từ SỐ NHIỀU hoặc danh từ KHÔNG đếm được (some books, some milk)\nNhắc tới LẦN ĐẦU thì dùng a / an, nhắc lại chính vật đó thì đổi sang the.\nXét theo ÂM ĐỌC chứ không theo chữ viết: an hour (h câm), a university (đọc /juː/).\nSoi vào câu này: An → The🔍 Giải thích chi tiết:\nChỗ sai là \"An\". Dạng đúng ở đây là \"The\".\nCách kiểm tra: đọc to danh từ đứng ngay sau mạo từ - nghe âm đầu là nguyên âm thì dùng an, phụ âm thì dùng a; còn danh từ số nhiều hoặc không đếm được thì bỏ hẳn a / an và dùng some.",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Do your parents work at the bank? No, they doesn’t.",
   "dap": "doesn’t",
   "giai": "✅ Đáp án đúng: doesn’t → don’t - câu đúng: Do your parents work at the bank? No, they don’t. = Bố mẹ bạn có làm ở ngân hàng không? - Không.📘 Ngữ cảnh: Câu hỏi dùng Do với chủ ngữ your parents (số nhiều), nhưng câu trả lời ngắn lại dùng doesn’t - dạng của số ít.🏗️ Cấu trúc: \nPhủ định: S + don’t / doesn’t + V (nguyên thể)\nNghi vấn: Do / Does + S + V (nguyên thể) ?\nSoi vào câu này: they + don’t + work\nBảng chọn trợ động từ:\nI - you - we - they, số nhiều → do / don’t\nhe - she - it, số ít → does / doesn’t\nChủ ngữ they ở số nhiều nên dùng don’t.\nSau do / does / don’t / doesn’t, động từ giữ NGUYÊN THỂ - phần -s đã nằm ở does.\nTrả lời ngắn: Yes, + S + do / does. / No, + S + don’t / doesn’t.🔍 Giải thích chi tiết: Sửa doesn’t → don’t. Quy tắc: hỏi bằng từ nào thì đáp bằng từ đó - hỏi Do thì đáp do / don’t. Phần câu hỏi đã hoàn toàn đúng nên không sửa.",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "An is the goodest student in my class.",
   "dap": "goodest",
   "giai": "✅ Đáp án đúng: goodest → best - câu đúng: An is the best student in my class. = An là học sinh giỏi nhất lớp tôi.📘 Ngữ cảnh: Câu dùng tính từ good với đuôi -est, nhưng good cũng là tính từ bất quy tắc.🏗️ Cấu trúc: \nA + be + the + tính từ so sánh nhất + in / of + phạm vi\nSoi vào câu này: An + is + the best + in my class\nBảng biến đổi:\ntính từ NGẮN → the + tính từ + -est (tall → the tallest)\ntính từ DÀI → the most + tính từ (the most careful)\nbất quy tắc: good → the best | bad → the worst\nỞ đây good là tính từ BẤT QUY TẮC nên dùng the best. Luôn có the, và không có than.🔍 Giải thích chi tiết: Sửa goodest → best → An is the best student in my class. Đây là từ ra đề nhiều nhất trong nhóm bất quy tắc, đi cặp với bad → worst ở câu ngay trên. Mạo từ the đã có sẵn nên chỉ đổi mỗi tính từ.",
   "huongDan": "Find and correct the mistake in each sentence.",
   "choices": []
  },
  {
   "noi": "Jane is the taller student in my class.",
   "dap": "taller",
   "giai": "✅ Đáp án đúng: taller → tallest - câu đúng: Jane is the tallest student in my class. = Jane là học sinh cao nhất lớp tôi.📘 Ngữ cảnh: Câu có the và cụm in my class (phạm vi cả lớp) → phải dùng dạng nhất, nhưng lại viết taller là dạng hơn.🏗️ Cấu trúc: \nA + be + the + tính từ so sánh nhất + in / of + phạm vi\nSoi vào câu này: Jane + is + the tallest + student in my class\nBảng biến đổi:\ntính từ NGẮN → the + tính từ + -est (tall → the tallest)\ntính từ DÀI → the most + tính từ (the most careful)\nbất quy tắc: good → the best | bad → the worst\nỞ đây tall là tính từ xem bảng dưới nên dùng the tallest. Luôn có the, và không có than.🔍 Giải thích chi tiết: Sửa taller → tallest. Hai dấu hiệu cùng chỉ dạng nhất: có the và có in my class. Muốn giữ taller thì phải bỏ the và thêm than + người khác.",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Did Sam and her mom travel to London last summer? Yes, they didn’t.",
   "dap": "didn’t",
   "giai": "✅ Đáp án đúng: didn’t → did - câu đúng: Did Sam and her mom travel to London last summer? Yes, they did. = Hè năm ngoái Sam và mẹ có đi London không? - Có.📘 Ngữ cảnh: Câu trả lời bắt đầu bằng Yes nhưng phần sau lại mang not - hai thứ mâu thuẫn nhau.🏗️ Cấu trúc: \nPhủ định: S + didn’t + V (nguyên thể)\nNghi vấn: Did + S + V (nguyên thể) ?\nSoi vào câu này: they + Did + động từ nguyên thể\ndidn’t / Did dùng cho MỌI chủ ngữ - không phân biệt số ít hay số nhiều.\nSau didn’t / Did, động từ trở về NGUYÊN THỂ - bỏ đuôi -ed.\nTrả lời ngắn: Yes, + S + did. / No, + S + didn’t.\nDấu hiệu quá khứ: yesterday, last night / week, ... ago, when I was little.\nÁp công thức vào câu này: they + did🔍 Giải thích chi tiết: Sửa didn’t → did. Quy tắc: đã nói Yes thì phần sau ở dạng khẳng định (Yes, they did); đã nói No thì mới mang not (No, they didn’t). Phần câu hỏi đã hoàn toàn đúng nên không sửa.",
   "huongDan": "Underline the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "These aren’t rose.",
   "dap": "rose",
   "giai": "✅ Đáp án đúng: rose → roses - câu đúng: These aren’t roses. = Đây không phải là những bông hoa hồng.📘 Ngữ cảnh: Chủ ngữ là These (số nhiều) nhưng danh từ phía sau lại là rose ở số ít - không khớp.🏗️ Cấu trúc: \nThis / That + is + danh từ SỐ ÍT\nThese / Those + are + danh từ SỐ NHIỀU\nthis / these = ở gần | that / those = ở xa\nSoi vào câu này: These + aren’t + roses\nTrả lời ngắn phải đổi từ chỉ định thành đại từ:\nthis / that → it | these / those → they🔍 Giải thích chi tiết: Chủ ngữ These và động từ aren’t đều ở số nhiều nên danh từ phải là roses → sửa rose → roses. Cách sửa khác (đổi These aren’t thành This isn’t) cũng đúng ngữ pháp, nhưng đề yêu cầu sửa một lỗi và phần These aren’t đã viết đúng chính tả, nên ta chỉnh danh từ.",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Does he like do these exercises?",
   "dap": "do",
   "giai": "✅ Đáp án đúng: do → doing - câu đúng: Does he like doing these exercises? = Cậu ấy có thích làm những bài tập này không?📘 Ngữ cảnh: Câu hỏi đã dùng đúng trợ động từ Does, nhưng động từ sau like vẫn để nguyên thể.🏗️ Cấu trúc: \nS + like / love / hate + V-ing\nSoi vào câu này: he + like + doing + these exercises (câu hỏi: Does + S + like + V-ing?)\nChủ ngữ he / she / it và danh từ số ít → động từ cảm xúc thêm -s (likes, loves, hates).\nPhủ định: S + don’t / doesn’t + like + V-ing (sau don’t/doesn’t thì không chia nữa).\nCâu hỏi: Do / Does + S + like + V-ing?\nCách thêm -ing: thường thêm thẳng (play → playing); bỏ -e (ride → riding); gấp đôi phụ âm (swim → swimming).🔍 Giải thích chi tiết: Sửa do → doing → Does he like doing these exercises? Chú ý phân biệt hai chữ do trong câu: Does đầu câu là trợ động từ (giữ nguyên), còn do thứ hai là động từ chính nên phải đổi thành doing. Cũng để ý like sau Does giữ nguyên thể - đúng rồi, không sửa.",
   "huongDan": "Find and correct the mistake in each sentence.",
   "choices": []
  },
  {
   "noi": "She don’t like milk, but she is drinking it now.",
   "dap": "don’t",
   "giai": "✅ Đáp án đúng: don’t → doesn’t📘 Ngữ cảnh: Vế đầu là hiện tại đơn (nói về sở thích chung), chủ ngữ She là ngôi thứ ba số ít.🏗️ Cấu trúc: \nHiện tại ĐƠN: S + V (-s / -es) → việc lặp đi lặp lại, sự thật\nHiện tại TIẾP DIỄN: S + am / is / are + V-ing → việc đang xảy ra lúc này\nBảng dấu hiệu nhận biết:\nĐƠN: every day / week - always, usually, often, sometimes, never\n on Mondays - lịch trình cố định - sự thật hiển nhiên\nTIẾP DIỄN: now - right now - at the moment - at present - today\n Look! - Listen! - Watch out! - Be quiet!\nPhủ định / nghi vấn:\nĐƠN: don’t / doesn’t + V | Do / Does + S + V ?\nTIẾP DIỄN: am / is / aren’t + V-ing | Am / Is / Are + S + V-ing ?\nLưu ý: không trộn hai thì - đã dùng be thì phải có V-ing, đã dùng do/does thì động từ để nguyên thể.\nSoi vào câu này: She don’t like milk, but she is drinking it now.\nsửa don’t → doesn’t🔍 Giải thích chi tiết: Sửa don’t → doesn’t. Với he/she/it thì trợ động từ phủ định của hiện tại đơn là doesn’t, không phải don’t. Vế sau is drinking it now đã đúng - có now nên dùng tiếp diễn.",
   "huongDan": "Find the mistake in each of the sentences and correct it.",
   "choices": []
  },
  {
   "noi": "She is the niceest person in my class.",
   "dap": "niceest",
   "giai": "✅ Đáp án đúng: niceest → nicest - câu đúng: She is the nicest person in my class. = Cô ấy là người tốt bụng nhất lớp tôi.📘 Ngữ cảnh: Câu so sánh nhất dùng tính từ nice. Dạng viết niceest thừa một chữ e.🏗️ Cấu trúc: \nA + be + the + tính từ so sánh nhất + in / of + phạm vi\nSoi vào câu này: She + is + the nicest + in my class\nBảng biến đổi:\ntính từ NGẮN → the + tính từ + -est (tall → the tallest)\ntính từ DÀI → the most + tính từ (the most careful)\nbất quy tắc: good → the best | bad → the worst\nỞ đây nice là tính từ NGẮN, đã có -e ở cuối nên dùng the nicest. Luôn có the, và không có than.🔍 Giải thích chi tiết: Sửa niceest → nicest: nice sẵn có chữ e ở cuối nên chỉ cần thêm -st. Lỗi do áp dụng máy móc \"thêm -est\" mà không nhìn chữ cuối. Phần the ... person in my class đã đúng, không được sửa.",
   "huongDan": "Find and correct the mistake in each sentence.",
   "choices": []
  },
  {
   "noi": "The children is in the dining room.",
   "dap": "is",
   "giai": "✅ Đáp án đúng: sửa is thành are\nCâu đúng: The children are in the dining room.📘 Ngữ cảnh: Yêu cầu của phần này: gạch chân chỗ sai trong câu rồi sửa lại cho đúng. Câu đã cho: The children is in the dining room. Chủ ngữ là The children. Đây là danh từ số nhiều BẤT QUY TẮC nên không có đuôi -s.🏗️ Cấu trúc: Động từ to be chia theo chủ ngữ:\nI + am (phủ định: I am not - viết tắt I’m not)\nHe - She - It, danh từ số ít + is (phủ định: is not - viết tắt isn’t)\nYou - We - They, danh từ số nhiều + are (phủ định: are not - viết tắt aren’t)\nNghi vấn: đảo be lên trước chủ ngữ - Am / Is / Are + S + … ?\nSoi vào câu này: The children = They → They + are🔍 Giải thích chi tiết: Chỗ sai là is, phải sửa thành are. children là số nhiều của child, nhưng vì không có đuôi -s nên rất dễ bị nhầm là số ít. Một số danh từ số nhiều bất quy tắc cần nhớ: child - children, man - men, woman - women, foot - feet, tooth - teeth.",
   "huongDan": "Underline the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "The blue motorbike is the most expensivest one.",
   "dap": "expensivest",
   "giai": "✅ Đáp án đúng: expensivest → expensive - câu đúng: The blue motorbike is the most expensive one. = Chiếc xe máy xanh dương là chiếc đắt nhất.📘 Ngữ cảnh: Vẫn là so sánh kép: vừa the most vừa đuôi -est (the most expensivest).🏗️ Cấu trúc: \nA + be + the + tính từ so sánh nhất + in / of + phạm vi\nSoi vào câu này: The blue motorbike + is + the most expensive + one\nBảng biến đổi:\ntính từ NGẮN → the + tính từ + -est (tall → the tallest)\ntính từ DÀI → the most + tính từ (the most careful)\nbất quy tắc: good → the best | bad → the worst\nỞ đây expensive là tính từ DÀI nên dùng the most expensive. Luôn có the, và không có than.🔍 Giải thích chi tiết: Sửa expensivest → expensive → The blue motorbike is the most expensive one. Phần the most đã đúng, chỉ trả tính từ về nguyên dạng. Bài này có tới 4 câu lỗi so sánh kép (more healthier, most smartest, more difficulter, most expensivest) - đây là lỗi phổ biến nhất khi học so sánh.",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  }
 ],
 "ordering": [
  {
   "noi": "We/ have lunch/ at 12.30 every day/ .",
   "dap": "",
   "giai": "✅ Đáp án đúng: We have lunch at 12.30 every day.📘 Ngữ cảnh: Cụm every day → thói quen → hiện tại đơn. Chủ ngữ We số nhiều.🏗️ Cấu trúc: \nHiện tại ĐƠN: S + V (-s / -es) → việc lặp đi lặp lại, sự thật\nHiện tại TIẾP DIỄN: S + am / is / are + V-ing → việc đang xảy ra lúc này\nBảng dấu hiệu nhận biết:\nĐƠN: every day / week - always, usually, often, sometimes, never\n on Mondays - lịch trình cố định - sự thật hiển nhiên\nTIẾP DIỄN: now - right now - at the moment - at present - today\n Look! - Listen! - Watch out! - Be quiet!\nPhủ định / nghi vấn:\nĐƠN: don’t / doesn’t + V | Do / Does + S + V ?\nTIẾP DIỄN: am / is / aren’t + V-ing | Am / Is / Are + S + V-ing ?\nLưu ý: không trộn hai thì - đã dùng be thì phải có V-ing, đã dùng do/does thì động từ để nguyên thể.\nSoi vào câu này: We/ have lunch/ at 12.30 every day/ . → We have lunch at 12.30 every day.🔍 Giải thích chi tiết: Viết We have lunch at 12.30 every day. Giữ nguyên thể have vì We số nhiều. Đừng để mốc giờ at 12.30 đánh lừa - đi kèm every day thì đó là giờ cố định hằng ngày, không phải \"lúc này\".",
   "huongDan": "Write sentences. Use the present simple or present continuous form of the verbs.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "not/ I/ at school/ am/ .",
   "dap": "",
   "giai": "✅ Đáp án đúng: I am not at school.📘 Ngữ cảnh: Yêu cầu của phần này: xếp lại các mảnh cho sẵn thành một câu đúng. Các mảnh: I / am / not / at / school. Đây là một phủ định. Các mảnh cho sẵn có I (chủ ngữ), am (to be) và not (từ phủ định).🏗️ Cấu trúc: Trật tự từ của câu có to be:\nCâu kể: S + am / is / are + phần còn lại .\nCâu phủ định: S + am / is / are + not + phần còn lại .\nCâu hỏi: Am / Is / Are + S + phần còn lại ?\nChữ đầu câu luôn viết hoa; dấu chấm đặt cuối câu kể, dấu hỏi đặt cuối câu hỏi.\nSoi vào câu này: I + am + not + at school .🔍 Giải thích chi tiết: Xếp đúng sẽ được câu I am not at school. Chủ ngữ I luôn đi với am. Trong câu phủ định, not đứng NGAY SAU to be chứ không đứng trước. Cụm chỉ nơi chốn at school đứng cuối. Viết I not am at school là sai trật tự.",
   "huongDan": "Reorder the words to make correct sentences.",
   "choices": [
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "your grandfather/ does/ at a garage/ ?/ work",
   "dap": "",
   "giai": "✅ Đáp án đúng: Does your grandfather work at a garage? = Ông của bạn có làm việc ở gara không?📘 Ngữ cảnh: Trong đống từ có dấu ? và từ does → đây là câu hỏi.🏗️ Cấu trúc: \nPhủ định: S + don’t / doesn’t + V (nguyên thể)\nNghi vấn: Do / Does + S + V (nguyên thể) ?\nSoi vào câu này: your grandfather + Does + work\nBảng chọn trợ động từ:\nI - you - we - they, số nhiều → do / don’t\nhe - she - it, số ít → does / doesn’t\nChủ ngữ your grandfather ở số ít nên dùng Does.\nSau do / does / don’t / doesn’t, động từ giữ NGUYÊN THỂ - phần -s đã nằm ở does.\nTrả lời ngắn: Yes, + S + do / does. / No, + S + don’t / doesn’t.🔍 Giải thích chi tiết: Ghép: Does (viết hoa, đầu câu) → chủ ngữ your grandfather → động từ work → at a garage → dấu ?. Trong câu hỏi, trợ động từ luôn đứng trước chủ ngữ, và động từ chính giữ nguyên thể.",
   "huongDan": "Order the words to make sentences.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "visited/ grandma/ Amy/ her/ last Sunday/ .",
   "dap": "",
   "giai": "✅ Đáp án đúng: Amy visited her grandma last Sunday. = Amy đã đến thăm bà vào Chủ nhật tuần trước.📘 Ngữ cảnh: Trong đống từ có visited ở dạng quá khứ và last Sunday - dấu hiệu quá khứ. Câu khẳng định.🏗️ Cấu trúc: \nS + V-ed + O (quá khứ đơn - động từ có quy tắc)\nSoi vào câu này: visit + đuôi → visited (thêm thẳng -ed)\nBảng thêm đuôi -ed:\nthường → +ed (walk → walked)\ntận cùng -e → +d (like → liked)\ntận cùng -y sau phụ âm → -ied (study → studied)\n1 âm tiết, nguyên âm + phụ âm → gấp đôi phụ âm rồi +ed (stop → stopped)\nĐộng từ quá khứ KHÔNG đổi theo chủ ngữ - mọi chủ ngữ đều dùng cùng một dạng.\nÁp công thức vào câu này: Amy + visited + her grandma last Sunday🔍 Giải thích chi tiết: Ghép: Amy → visited → her grandma → last Sunday. Tính từ sở hữu her đứng liền trước danh từ grandma, và cụm thời gian last Sunday đặt ở cuối câu.",
   "huongDan": "Write the sentence in the right order.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "there / plum / a / is / in / her pocket /.",
   "dap": "",
   "giai": "✅ Đáp án đúng: There is a plum in her pocket.📘 Ngữ cảnh: Dãy từ there / plum / a / is / in / her pocket /. tạo thành câu khẳng định số ít.🏗️ Cấu trúc: \nTrật tự câu There is / There are:\nKhẳng định: There is / There are + (a / some) + N + nơi chốn .\nPhủ định: There isn’t / There aren’t + any + N + nơi chốn .\nNghi vấn: Is there / Are there + a / any + N + nơi chốn ?\nSoi vào câu này: there / plum / a / is / in / her pocket /.\n→ There is + a + ... → There is a plum in her pocket.🔍 Giải thích chi tiết: Dấu cuối dãy cho biết đây là câu khẳng định số ít, nên phần đầu câu phải là There is. Sau đó đến từ hạn định a, rồi danh từ, cuối cùng mới là cụm chỉ nơi chốn. Cụm nơi chốn (in / on + the …) luôn đứng cuối, không được đặt trước danh từ. Cả câu: There is a plum in her pocket.",
   "huongDan": "Order the words to make correct sentences.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "Did/ 2 days/ spaghetti/ ago/ eat/ you/ ?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Did you eat spaghetti 2 days ago? = Cách đây hai ngày bạn có ăn mì Ý không?📘 Ngữ cảnh: Trong đống từ có dấu ? và Did → câu hỏi; động từ eat ở nguyên thể.🏗️ Cấu trúc: \nPhủ định: S + didn’t + V (nguyên thể)\nNghi vấn: Did + S + V (nguyên thể) ?\nSoi vào câu này: you + Did + eat\ndidn’t / Did dùng cho MỌI chủ ngữ - không phân biệt số ít hay số nhiều.\nSau didn’t / Did, động từ trở về NGUYÊN THỂ - bỏ đuôi -ed.\nTrả lời ngắn: Yes, + S + did. / No, + S + didn’t.\nDấu hiệu quá khứ: yesterday, last night / week, ... ago, when I was little.\nÁp công thức vào câu này: you + Did ... eat🔍 Giải thích chi tiết: Ghép: Did → you → eat → spaghetti → 2 days ago. Chú ý cụm số + đơn vị + ago phải giữ đúng thứ tự: 2 days ago, không phải ago 2 days.",
   "huongDan": "Write the sentence in the right order.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "in the fridge/ isn’t/ the milk/ .",
   "dap": "",
   "giai": "✅ Đáp án đúng: The milk isn’t in the fridge.📘 Ngữ cảnh: Yêu cầu của phần này: xếp lại các mảnh cho sẵn thành một câu đúng. Các mảnh: The / milk / isn’t / in / the / fridge. Đây là một phủ định. Các mảnh cho sẵn có the milk (chủ ngữ) và isn’t - dạng phủ định đã rút gọn sẵn.🏗️ Cấu trúc: Trật tự từ của câu có to be:\nCâu kể: S + am / is / are + phần còn lại .\nCâu phủ định: S + am / is / are + not + phần còn lại .\nCâu hỏi: Am / Is / Are + S + phần còn lại ?\nChữ đầu câu luôn viết hoa; dấu chấm đặt cuối câu kể, dấu hỏi đặt cuối câu hỏi.\nSoi vào câu này: The milk + isn’t + in the fridge .🔍 Giải thích chi tiết: Xếp đúng sẽ được câu The milk isn’t in the fridge. milk là danh từ không đếm được nên luôn coi như số ít, đi với is - phủ định là isn’t. Vì isn’t đã gộp sẵn cả is và not nên không cần thêm not nữa.",
   "huongDan": "Reorder the words to make correct sentences.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "any / the / are / desk/ there / books/ on /?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Are there any books on the desk?📘 Ngữ cảnh: Yêu cầu của phần này: xếp các mảnh cho sẵn thành một câu đúng. Các mảnh: any / the / are / desk/ there / books/ on /? Dấu hỏi ở cuối cho biết đây là câu hỏi, và danh từ chính là books - danh từ số nhiều.🏗️ Cấu trúc: Trật tự từ của câu There is / There are:\nCâu kể: There + is / are + (some) + danh từ + nơi chốn .\nCâu phủ định: There + isn’t / aren’t + any + danh từ + nơi chốn .\nCâu hỏi: Is / Are + there + any + danh từ + nơi chốn ?\nCụm nơi chốn luôn đứng CUỐI; giới từ (in, on, under …) đi liền trước nơi chốn đó.\nSoi vào câu này: Are there any books on the desk?🔍 Giải thích chi tiết: Xếp đúng sẽ được câu Are there any books on the desk? Vì là câu hỏi nên to be (are) phải đứng TRƯỚC there, không viết There is … ? Danh từ books là danh từ số nhiều nên to be phải là are / aren’t. Từ any đứng ngay trước danh từ: any dùng cho câu phủ định và câu hỏi. Cụm chỉ nơi chốn luôn để ở CUỐI câu, sau danh từ.",
   "huongDan": "Order the words to make correct sentences.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "my hair/ wash/ every day/ don’t/ I/ .",
   "dap": "",
   "giai": "✅ Đáp án đúng: I don’t wash my hair every day. = Tôi không gội đầu mỗi ngày.📘 Ngữ cảnh: Trong đống từ có don’t và chủ ngữ I - hai thứ luôn đi cùng nhau.🏗️ Cấu trúc: \nPhủ định: S + don’t / doesn’t + V (nguyên thể)\nNghi vấn: Do / Does + S + V (nguyên thể) ?\nSoi vào câu này: I + don’t + wash\nBảng chọn trợ động từ:\nI - you - we - they, số nhiều → do / don’t\nhe - she - it, số ít → does / doesn’t\nChủ ngữ I ở ngôi thứ nhất (I) nên dùng don’t.\nSau do / does / don’t / doesn’t, động từ giữ NGUYÊN THỂ - phần -s đã nằm ở does.\nTrả lời ngắn: Yes, + S + do / does. / No, + S + don’t / doesn’t.🔍 Giải thích chi tiết: Ghép: I → don’t → wash → my hair → every day. Cụm chỉ thời gian every day đặt ở cuối câu. Chủ ngữ I không bao giờ dùng doesn’t.",
   "huongDan": "Order the words to make sentences.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "sometimes/ My uncle / to work/ drives/ .",
   "dap": "",
   "giai": "✅ Đáp án đúng: My uncle sometimes drives to work.📘 Ngữ cảnh: Trạng từ sometimes là dấu hiệu của hiện tại đơn. Chủ ngữ My uncle là một người.🏗️ Cấu trúc: \nHiện tại ĐƠN: S + V (-s / -es) → việc lặp đi lặp lại, sự thật\nHiện tại TIẾP DIỄN: S + am / is / are + V-ing → việc đang xảy ra lúc này\nBảng dấu hiệu nhận biết:\nĐƠN: every day / week - always, usually, often, sometimes, never\n on Mondays - lịch trình cố định - sự thật hiển nhiên\nTIẾP DIỄN: now - right now - at the moment - at present - today\n Look! - Listen! - Watch out! - Be quiet!\nPhủ định / nghi vấn:\nĐƠN: don’t / doesn’t + V | Do / Does + S + V ?\nTIẾP DIỄN: am / is / aren’t + V-ing | Am / Is / Are + S + V-ing ?\nLưu ý: không trộn hai thì - đã dùng be thì phải có V-ing, đã dùng do/does thì động từ để nguyên thể.\nSoi vào câu này: sometimes/ My uncle / to work/ drives/ . → My uncle sometimes drives to work.🔍 Giải thích chi tiết: Viết My uncle sometimes drives to work. Trật tự: S + trạng từ tần suất + V + phần còn lại. Trạng từ đứng trước động từ thường, và drive thêm -s vì chủ ngữ số ít.",
   "huongDan": "Reorder the words to make a correct sentence.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "like/ does/ Jo/ reading/?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Does Jo like reading?📘 Ngữ cảnh: Các từ cho sẵn có dấu hỏi ở cuối, nên đây là một câu hỏi.🏗️ Cấu trúc:Does + chủ ngữ + động từ nguyên thể …?Ví dụ: Does Jo like reading?🔍 Giải thích chi tiết: Thấy dấu ? thì biết phải xếp thành câu hỏi, mà câu hỏi luôn mở đầu bằng Does (viết hoa vì đứng đầu câu). Tiếp theo là chủ ngữ Jo, rồi động từ like giữ nguyên thể (không thêm s vì đã có Does gánh phần chia). Cuối cùng là reading. Vì vậy câu đúng là Does Jo like reading?",
   "huongDan": "Reorder the words to make sentences.",
   "choices": [
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "does/ the movie/ When/ start/ ?",
   "dap": "",
   "giai": "✅ Đáp án đúng: When does the movie start?📘 Ngữ cảnh: Từ cho sẵn có When và trợ động từ does - hỏi giờ chiếu phim.🏗️ Cấu trúc: \nTừ để hỏi + do / does / be + S + V ... ?\nSoi vào câu này: When + does + the movie + start ?\nBảng từ để hỏi:\nWhat = cái gì | Who = ai | Where = ở đâu\nWhen = khi nào | Why = tại sao | How = thế nào\nWhich = cái nào (chọn trong số) | Whose = của ai\nChọn trợ động từ theo động từ chính:\nđộng từ be → đảo is / are lên ngay sau từ để hỏi (Where is your bag?)\nđộng từ thường → dùng do / does, động từ giữ nguyên thể (Where do you live?)\nSoi câu này: does/ the movie/ When/ start/ ?\n→ When does the movie start?🔍 Giải thích chi tiết: Viết When does the movie start? Trật tự: Từ để hỏi + does + S + V nguyên thể ? Động từ start giữ nguyên thể vì phần -s đã nằm ở does. Viết When does the movie starts? là chia hai lần.",
   "huongDan": "Reorder the words to make the correct question.",
   "choices": [
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "isn’t/ the cup/ milk/ in/ there/ any/ .",
   "dap": "",
   "giai": "✅ Đáp án đúng: There isn’t any milk in the cup.📘 Ngữ cảnh: Yêu cầu của phần này: xếp các mảnh cho sẵn thành một câu đúng. Các mảnh: isn’t/ the cup/ milk/ in/ there/ any/ . Dấu chấm ở cuối cho biết đây là câu phủ định, và danh từ chính là milk - danh từ KHÔNG đếm được.🏗️ Cấu trúc: Trật tự từ của câu There is / There are:\nCâu kể: There + is / are + (some) + danh từ + nơi chốn .\nCâu phủ định: There + isn’t / aren’t + any + danh từ + nơi chốn .\nCâu hỏi: Is / Are + there + any + danh từ + nơi chốn ?\nCụm nơi chốn luôn đứng CUỐI; giới từ (in, on, under …) đi liền trước nơi chốn đó.\nSoi vào câu này: There isn’t any milk in the cup.🔍 Giải thích chi tiết: Xếp đúng sẽ được câu There isn’t any milk in the cup. Vì là câu phủ định nên dùng There isn’t, và phần phủ định n’t viết dính vào to be. Danh từ milk là danh từ KHÔNG đếm được nên to be phải là is / isn’t. Từ any đứng ngay trước danh từ: any dùng cho câu phủ định và câu hỏi. Cụm chỉ nơi chốn luôn để ở CUỐI câu, sau danh từ.",
   "huongDan": "Reorder the words to make correct sentences.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "(the toys you have)",
   "dap": "",
   "giai": "✅ Đáp án đúng: I have three toy trains📘 Ngữ cảnh:\nBài yêu cầu: Rearrange the words to write your own sentence.\nCác mảnh cho sẵn: I / have / three / toy / trains\nViệc cần làm: xếp lại thành một câu đúng ngữ pháp và đúng trật tự từ.🏗️ Cấu trúc: Trật tự từ cơ bản của câu tiếng Anh:\nS + V + O + (nơi chốn) + (thời gian) .\nMạo từ (a / an / the) và tính từ đứng TRƯỚC danh từ: a + big + dog.\nGiới từ (in, on, under …) đi liền trước cụm chỉ nơi chốn và đứng ở CUỐI câu.\nChữ đầu câu viết hoa, cuối câu có dấu chấm.\nSoi vào câu này: I have three toy trains🔍 Giải thích chi tiết:\nXếp đúng sẽ được câu: I have three toy trains\nChủ ngữ đứng đầu, động từ theo sau, cụm chỉ nơi chốn để cuối câu.\nLỗi hay gặp: đặt tính từ sau danh từ như tiếng Việt. Tiếng Anh luôn là tính từ TRƯỚC danh từ (a big dog, không phải a dog big).",
   "huongDan": "Rearrange the words to write your own sentence.",
   "choices": [
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "more/ sisters/ Cindy/ than/ is/ beautiful/ her/ .",
   "dap": "",
   "giai": "✅ Đáp án đúng: Cindy is more beautiful than her sisters. = Cindy xinh hơn các chị em gái của cô ấy.📘 Ngữ cảnh: Trong đống từ xáo trộn có more beautiful và từ than nên đây là câu so sánh hơn. Hai đối tượng đem so sánh là Cindy và her sisters.🏗️ Cấu trúc: \nA + be + tính từ so sánh hơn + than + B\nSoi vào câu này: Cindy + is + more beautiful + than + her sisters\nBảng biến đổi:\ntính từ NGẮN (1 âm tiết, hoặc 2 âm tiết đuôi -y) → thêm -er (tall → taller)\ntính từ DÀI (từ 2-3 âm tiết trở lên) → more + tính từ (more careful)\nbất quy tắc: good → better | bad → worse\nỞ đây beautiful là tính từ DÀI (3 ÂM TIẾT) nên dùng more beautiful. Có than thì luôn là dạng hơn.\nVí dụ cùng dạng: My room is more comfortable than yours. - This song is more popular than that one.🔍 Giải thích chi tiết: Ghép lần lượt: chủ ngữ → động từ be → more beautiful → than → đối tượng còn lại, được Cindy is more beautiful than her sisters. Tính từ beautiful thuộc nhóm dài (3 âm tiết) nên dạng so sánh là more beautiful (thêm more, giữ nguyên tính từ). Lỗi hay gặp: đặt than không liền sau tính từ so sánh, hoặc vừa thêm more vừa thêm -er.",
   "huongDan": "Order the words to make sentences.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "is / most / expensive / the red car / the / .",
   "dap": "",
   "giai": "✅ Đáp án đúng: The red car is the most expensive. = Chiếc xe màu đỏ là chiếc đắt nhất.📘 Ngữ cảnh: Trong đống từ xáo trộn có the và most, nên đây là câu so sánh nhất.🏗️ Cấu trúc: \nA + be + the + tính từ so sánh nhất + in / of + phạm vi\nSoi vào câu này: The red car + is + the most expensive\nBảng biến đổi:\ntính từ NGẮN → the + tính từ + -est (tall → the tallest)\ntính từ DÀI → the most + tính từ (the most careful)\nbất quy tắc: good → the best | bad → the worst\nỞ đây expensive là tính từ DÀI nên dùng the most expensive. Luôn có the, và không có than.\nVí dụ cùng dạng: This phone is the most modern. - That house is the most beautiful.🔍 Giải thích chi tiết: Ghép lần lượt: chủ ngữ The red car → động từ is → the most expensive → The red car is the most expensive. Tính từ expensive thuộc nhóm dài nên dạng nhất là most expensive. Hai lỗi hay gặp: quên the trước tính từ, và dùng more/most cùng lúc với đuôi -est.",
   "huongDan": "Put the words in order to make sentences.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "wrote/ yesterday/ letter/ ./ a/ Sam",
   "dap": "",
   "giai": "✅ Đáp án đúng: Sam wrote a letter yesterday. = Sam đã viết một lá thư hôm qua.📘 Ngữ cảnh: Trong đống từ có wrote đã chia quá khứ và yesterday - dấu hiệu quá khứ. Câu khẳng định.🏗️ Cấu trúc: \nS + V2 (cột 2 - quá khứ) + O (động từ BẤT QUY TẮC)\nSoi vào câu này: write → wrote\nĐộng từ bất quy tắc KHÔNG thêm -ed - phải học thuộc từng từ.\nBảng các từ hay gặp:\ngo → went | eat → ate | drink → drank | take → took\nhave → had | see → saw | write → wrote | do → did\ncome → came | ride → rode | say → said | drive → drove\nget up → got up, wake up → woke up (chỉ đổi động từ chính, tiểu từ giữ nguyên)\nread → read: viết y hệt nhưng đọc khác (/riːd/ → /red/).\nV2 dùng chung cho mọi chủ ngữ; sau didn’t / Did thì quay về NGUYÊN THỂ.\nÁp công thức vào câu này: Sam + wrote🔍 Giải thích chi tiết: Ghép: Sam → wrote → a letter → yesterday. wrote là quá khứ bất quy tắc của write. Cụm thời gian đặt ở cuối câu.",
   "huongDan": "Write the sentence in the right order.",
   "choices": [
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "the / dangerous / dinosaurs / most / animal / are / .",
   "dap": "",
   "giai": "✅ Đáp án đúng: Dinosaurs are the most dangerous animal. = Khủng long là loài vật nguy hiểm nhất.📘 Ngữ cảnh: Trong đống từ xáo trộn có the và most, nên đây là câu so sánh nhất, và còn một danh từ animal phải đặt ngay sau tính từ.🏗️ Cấu trúc: \nA + be + the + tính từ so sánh nhất + in / of + phạm vi\nSoi vào câu này: Dinosaurs + is + the most dangerous + animal\nBảng biến đổi:\ntính từ NGẮN → the + tính từ + -est (tall → the tallest)\ntính từ DÀI → the most + tính từ (the most careful)\nbất quy tắc: good → the best | bad → the worst\nỞ đây dangerous là tính từ DÀI nên dùng the most dangerous. Luôn có the, và không có than.\nVí dụ cùng dạng: Whales are the biggest animals. - These are the most expensive shoes.🔍 Giải thích chi tiết: Ghép lần lượt: chủ ngữ Dinosaurs → động từ are → the most dangerous → danh từ animal → Dinosaurs are the most dangerous animal. Tính từ dangerous thuộc nhóm dài nên dạng nhất là most dangerous. Hai lỗi hay gặp: quên the trước tính từ, và đặt danh từ animal sai chỗ - nó phải đứng ngay sau tính từ, không để cuối câu tách rời.",
   "huongDan": "Put the words in order to make sentences.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "the mall / aren’t / men/ in / there / any /.",
   "dap": "",
   "giai": "✅ Đáp án đúng: There aren’t any men in the mall.📘 Ngữ cảnh: Dãy từ the mall / aren’t / men/ in / there / any /. tạo thành câu phủ định số nhiều.🏗️ Cấu trúc: \nTrật tự câu There is / There are:\nKhẳng định: There is / There are + (a / some) + N + nơi chốn .\nPhủ định: There isn’t / There aren’t + any + N + nơi chốn .\nNghi vấn: Is there / Are there + a / any + N + nơi chốn ?\nSoi vào câu này: the mall / aren’t / men/ in / there / any /.\n→ There aren’t + any + ... → There aren’t any men in the mall.🔍 Giải thích chi tiết: Dấu cuối dãy cho biết đây là câu phủ định số nhiều, nên phần đầu câu phải là There aren’t. Sau đó đến từ hạn định any, rồi danh từ, cuối cùng mới là cụm chỉ nơi chốn. Cụm nơi chốn (in / on + the …) luôn đứng cuối, không được đặt trước danh từ. Cả câu: There aren’t any men in the mall.",
   "huongDan": "Order the words to make correct sentences.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "can’t / the boy / sing / but / loves / he / songs / writing / . /",
   "dap": "",
   "giai": "✅ Đáp án đúng: The boy can’t sing but he loves writing songs. = Cậu bé không hát được nhưng cậu ấy rất thích sáng tác bài hát.📘 Ngữ cảnh: Đống từ có cả can’t lẫn loves, nối bằng but - câu gồm hai vế trái ngược: một vế nói về khả năng, một vế nói về sở thích.🏗️ Cấu trúc: \nS + can / can’t + V (nguyên thể)\nSoi vào câu này: The boy + can’t + sing\ncan = làm được | can’t = không làm được\nSau can / can’t, động từ giữ nguyên: không thêm -s, không thêm -ing.\ncan không đổi theo chủ ngữ - không có cans, không có doesn’t can.\nCâu hỏi: Can + S + V? → Trả lời: Yes, ... can. / No, ... can’t.\nVế sau đổi cấu trúc: he + loves + writing + songs (sau love dùng V-ing).🔍 Giải thích chi tiết: Ghép: The boy can’t sing (sau can’t dùng nguyên thể sing) → but → he loves writing songs (sau loves dùng V-ing writing) → The boy can’t sing but he loves writing songs. Đây là câu tổng hợp cả hai điểm ngữ pháp của bài: can + nguyên thể ↔ love + V-ing. Chú ý vế sau đổi chủ ngữ thành đại từ he để khỏi lặp lại the boy.",
   "huongDan": "Put the words in order to make sentences.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "Amy/ at the library/ ./ work/ doesn’t",
   "dap": "",
   "giai": "✅ Đáp án đúng: Amy doesn’t work at the library. = Amy không làm việc ở thư viện.📘 Ngữ cảnh: Có doesn’t nên là câu phủ định; chủ ngữ Amy ở số ít.🏗️ Cấu trúc: \nPhủ định: S + don’t / doesn’t + V (nguyên thể)\nNghi vấn: Do / Does + S + V (nguyên thể) ?\nSoi vào câu này: Amy + doesn’t + work\nBảng chọn trợ động từ:\nI - you - we - they, số nhiều → do / don’t\nhe - she - it, số ít → does / doesn’t\nChủ ngữ Amy ở số ít nên dùng doesn’t.\nSau do / does / don’t / doesn’t, động từ giữ NGUYÊN THỂ - phần -s đã nằm ở does.\nTrả lời ngắn: Yes, + S + do / does. / No, + S + don’t / doesn’t.🔍 Giải thích chi tiết: Ghép: Amy → doesn’t → work → at the library. Cụm chỉ nơi chốn at the library đứng sau động từ. Động từ work giữ nguyên thể sau doesn’t.",
   "huongDan": "Order the words to make sentences.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "car/ more/ bike/ A/ expensive/ is/ than/ a/ .",
   "dap": "",
   "giai": "✅ Đáp án đúng: A car is more expensive than a bike. = Ô tô thì đắt hơn xe đạp.📘 Ngữ cảnh: Trong đống từ xáo trộn có more expensive và từ than, nên đây là câu so sánh hơn. Hai đối tượng được đem ra so sánh là A car và a bike.🏗️ Cấu trúc: \nA + be + tính từ so sánh hơn + than + B\nSoi vào câu này: A car + is + more expensive + than + a bike\nBảng biến đổi:\ntính từ NGẮN (1 âm tiết, hoặc 2 âm tiết đuôi -y) → thêm -er (tall → taller)\ntính từ DÀI (từ 2-3 âm tiết trở lên) → more + tính từ (more careful)\nbất quy tắc: good → better | bad → worse\nỞ đây expensive là tính từ DÀI nên dùng more expensive. Có than thì luôn là dạng hơn.\nVí dụ cùng dạng: A phone is more useful than a watch. - This city is more crowded than my town.🔍 Giải thích chi tiết: Ghép theo đúng trật tự: chủ ngữ A car, rồi động từ is, rồi more expensive, rồi than và đối tượng còn lại → A car is more expensive than a bike. Tính từ expensive là tính từ dài nên dùng dạng more expensive. Lỗi hay gặp: đặt than sai chỗ, hoặc quên rằng than luôn đứng ngay sau tính từ so sánh.",
   "huongDan": "Order the words to make sentences.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "there / orange/ an / is / chair / on/ the /.",
   "dap": "",
   "giai": "✅ Đáp án đúng: There is an orange on the chair.📘 Ngữ cảnh: Yêu cầu của phần này: xếp các mảnh cho sẵn thành một câu đúng. Các mảnh: there / orange/ an / is / chair / on/ the /. Dấu chấm ở cuối cho biết đây là câu kể, và danh từ chính là orange - danh từ đếm được số ít.🏗️ Cấu trúc: Trật tự từ của câu There is / There are:\nCâu kể: There + is / are + (some) + danh từ + nơi chốn .\nCâu phủ định: There + isn’t / aren’t + any + danh từ + nơi chốn .\nCâu hỏi: Is / Are + there + any + danh từ + nơi chốn ?\nCụm nơi chốn luôn đứng CUỐI; giới từ (in, on, under …) đi liền trước nơi chốn đó.\nSoi vào câu này: There is an orange on the chair.🔍 Giải thích chi tiết: Xếp đúng sẽ được câu There is an orange on the chair. Vì là câu kể nên thứ tự là There + is rồi mới tới danh từ. Danh từ orange là danh từ đếm được số ít nên to be phải là is / isn’t. Từ an đứng ngay trước danh từ: mạo từ an chỉ đi với danh từ đếm được số ít. Cụm chỉ nơi chốn luôn để ở CUỐI câu, sau danh từ.",
   "huongDan": "Order the words to make correct sentences.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "is / teacher / Mr Harris / the / nicest / .",
   "dap": "",
   "giai": "✅ Đáp án đúng: Mr Harris is the nicest teacher. = Thầy Harris là giáo viên tốt bụng nhất.📘 Ngữ cảnh: Trong đống từ xáo trộn có the và dạng nicest, nên đây là câu so sánh nhất, và còn một danh từ teacher phải đặt ngay sau tính từ.🏗️ Cấu trúc: \nA + be + the + tính từ so sánh nhất + in / of + phạm vi\nSoi vào câu này: Mr Harris + is + the nicest + teacher\nBảng biến đổi:\ntính từ NGẮN → the + tính từ + -est (tall → the tallest)\ntính từ DÀI → the most + tính từ (the most careful)\nbất quy tắc: good → the best | bad → the worst\nỞ đây nice là tính từ NGẮN nên dùng the nicest. Luôn có the, và không có than.\nVí dụ cùng dạng: She is the best singer. - This is the cheapest bag.🔍 Giải thích chi tiết: Ghép lần lượt: chủ ngữ Mr Harris → động từ is → the nicest → danh từ teacher → Mr Harris is the nicest teacher. Tính từ nice thuộc nhóm ngắn nên dạng nhất là nicest. Hai lỗi hay gặp: quên the trước tính từ, và đặt danh từ teacher sai chỗ - nó phải đứng ngay sau tính từ, không để cuối câu tách rời.",
   "huongDan": "Put the words in order to make sentences.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "mom/ this/ ‘s/ is/ computer/ .",
   "dap": "",
   "giai": "✅ Đáp án đúng: This is mom’s computer. = Đây là máy tính của mẹ.📘 Ngữ cảnh: Các từ cho sẵn có phần ‘s tách riêng ra thành một mảnh - đây là điểm đặc biệt của câu này: phải ghép ‘s vào ngay sau mom.🏗️ Cấu trúc: \nngười/vật sở hữu + ’s + thứ được sở hữu\nSoi vào câu này: mom’s + computer\nQuy tắc đặt dấu:\ndanh từ không có -s ở cuối → thêm ’s (the boy’s bag, children’s toys)\ndanh từ đã có -s ở cuối → chỉ thêm ’ (the boys’ bag, my parents’ car)\nChe phần sau dấu nháy đi, nhìn từ còn lại là biết một hay nhiều.🔍 Giải thích chi tiết: Ghép mom + ’s thành mom’s, rồi đặt câu: This is mom’s computer. Chú ý ‘s không phải là một từ riêng đứng tách ra - nếu viết This is mom ‘s computer (có dấu cách) thì sai. Cũng đừng nhầm ’s ở đây với ’s viết tắt của is (như trong He’s tall): ở câu này nó mang nghĩa sở hữu.",
   "huongDan": "Order the words to make sentences.",
   "choices": [
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "I/ taller/ am/ my friends/ than/ .",
   "dap": "",
   "giai": "✅ Đáp án đúng: I am taller than my friends. = Tôi cao hơn các bạn của tôi.📘 Ngữ cảnh: Trong đống từ xáo trộn có taller và từ than nên đây là câu so sánh hơn. Hai đối tượng đem so sánh là I và my friends.🏗️ Cấu trúc: \nA + be + tính từ so sánh hơn + than + B\nSoi vào câu này: I + is + taller + than + my friends\nBảng biến đổi:\ntính từ NGẮN (1 âm tiết, hoặc 2 âm tiết đuôi -y) → thêm -er (tall → taller)\ntính từ DÀI (từ 2-3 âm tiết trở lên) → more + tính từ (more careful)\nbất quy tắc: good → better | bad → worse\nỞ đây tall là tính từ NGẮN (1 ÂM TIẾT) nên dùng taller. Có than thì luôn là dạng hơn.\nVí dụ cùng dạng: I am busier than my sister. - We are stronger than them.🔍 Giải thích chi tiết: Ghép lần lượt: chủ ngữ → động từ be → taller → than → đối tượng còn lại, được I am taller than my friends. Tính từ tall thuộc nhóm ngắn (1 âm tiết) nên dạng so sánh là taller (thêm đuôi, không dùng more). Lỗi hay gặp: đặt than không liền sau tính từ so sánh, hoặc thêm more cho tính từ ngắn.",
   "huongDan": "Order the words to make sentences.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "Amy/ is/ than/ Mike/ younger/ .",
   "dap": "",
   "giai": "✅ Đáp án đúng: Amy is younger than Mike. = Amy trẻ hơn Mike.📘 Ngữ cảnh: Trong đống từ xáo trộn có younger và từ than nên đây là câu so sánh hơn. Hai đối tượng đem so sánh là Amy và Mike.🏗️ Cấu trúc: \nA + be + tính từ so sánh hơn + than + B\nSoi vào câu này: Amy + is + younger + than + Mike\nBảng biến đổi:\ntính từ NGẮN (1 âm tiết, hoặc 2 âm tiết đuôi -y) → thêm -er (tall → taller)\ntính từ DÀI (từ 2-3 âm tiết trở lên) → more + tính từ (more careful)\nbất quy tắc: good → better | bad → worse\nỞ đây young là tính từ NGẮN (1 ÂM TIẾT) nên dùng younger. Có than thì luôn là dạng hơn.\nVí dụ cùng dạng: My brother is older than me. - This box is lighter than that box.🔍 Giải thích chi tiết: Ghép lần lượt: chủ ngữ → động từ be → younger → than → đối tượng còn lại, được Amy is younger than Mike. Tính từ young thuộc nhóm ngắn (1 âm tiết) nên dạng so sánh là younger (thêm đuôi, không dùng more). Lỗi hay gặp: đặt than không liền sau tính từ so sánh, hoặc thêm more cho tính từ ngắn.",
   "huongDan": "Order the words to make sentences.",
   "choices": [
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "coldest / December / is / the / month / .",
   "dap": "",
   "giai": "✅ Đáp án đúng: December is the coldest month. = Tháng Mười Hai là tháng lạnh nhất.📘 Ngữ cảnh: Trong đống từ xáo trộn có the và dạng coldest, nên đây là câu so sánh nhất, kèm danh từ month phải đặt ngay sau tính từ.🏗️ Cấu trúc: \nA + be + the + tính từ so sánh nhất + in / of + phạm vi\nSoi vào câu này: December + is + the coldest + month\nBảng biến đổi:\ntính từ NGẮN → the + tính từ + -est (tall → the tallest)\ntính từ DÀI → the most + tính từ (the most careful)\nbất quy tắc: good → the best | bad → the worst\nỞ đây cold là tính từ NGẮN nên dùng the coldest. Luôn có the, và không có than.\nVí dụ cùng dạng: June is the hottest month. - Sunday is the busiest day.🔍 Giải thích chi tiết: Ghép lần lượt: chủ ngữ December → is → the coldest → month → December is the coldest month. Tính từ cold thuộc nhóm ngắn nên dạng nhất là coldest. Lỗi hay gặp: quên the, hoặc để danh từ month tách rời khỏi tính từ.",
   "huongDan": "Put the words in order to make sentences.",
   "choices": [
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "in/ is/ book/ the bag/ there/ a/ .",
   "dap": "",
   "giai": "✅ Đáp án đúng: There is a book in the bag.📘 Ngữ cảnh: Yêu cầu của phần này: xếp các mảnh cho sẵn thành một câu đúng. Các mảnh: in/ is/ book/ the bag/ there/ a/ . Dấu chấm ở cuối cho biết đây là câu kể, và danh từ chính là book - danh từ đếm được số ít.🏗️ Cấu trúc: Trật tự từ của câu There is / There are:\nCâu kể: There + is / are + (some) + danh từ + nơi chốn .\nCâu phủ định: There + isn’t / aren’t + any + danh từ + nơi chốn .\nCâu hỏi: Is / Are + there + any + danh từ + nơi chốn ?\nCụm nơi chốn luôn đứng CUỐI; giới từ (in, on, under …) đi liền trước nơi chốn đó.\nSoi vào câu này: There is a book in the bag.🔍 Giải thích chi tiết: Xếp đúng sẽ được câu There is a book in the bag. Vì là câu kể nên thứ tự là There + is rồi mới tới danh từ. Danh từ book là danh từ đếm được số ít nên to be phải là is / isn’t. Từ a đứng ngay trước danh từ: mạo từ a chỉ đi với danh từ đếm được số ít. Cụm chỉ nơi chốn luôn để ở CUỐI câu, sau danh từ.",
   "huongDan": "Reorder the words to make correct sentences.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "have/ I/ new/ some/ friends/ .",
   "dap": "",
   "giai": "✅ Đáp án đúng: I have some new friends.📘 Ngữ cảnh: Các từ cho sẵn không có từ phủ định hay dấu hỏi, nên đây là câu khẳng định.🏗️ Cấu trúc:Chủ ngữ + have / has + tân ngữVí dụ: I have some new friends.🔍 Giải thích chi tiết: Câu bắt đầu bằng chủ ngữ I, mà I luôn đi với have. Phần tân ngữ xếp theo thứ tự some rồi new rồi friends, vì từ chỉ số lượng đứng trước, tính từ đứng sau nó và ngay trước danh từ. Vì vậy câu đúng là I have some new friends.",
   "huongDan": "Reorder the words to make sentences.",
   "choices": [
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "girl / kindest / my / is / Lily / .",
   "dap": "",
   "giai": "✅ Đáp án đúng: Lily is my kindest girl. = Lily là cô bé tốt bụng nhất của tôi.📘 Ngữ cảnh: Trong đống từ xáo trộn có từ sở hữu my và dạng kindest, nên đây là câu so sánh nhất, kèm danh từ girl phải đặt ngay sau tính từ.🏗️ Cấu trúc: \nA + be + the + tính từ so sánh nhất + in / of + phạm vi\nSoi vào câu này: Lily + is + my kindest + girl\nBảng biến đổi:\ntính từ NGẮN → the + tính từ + -est (tall → the tallest)\ntính từ DÀI → the most + tính từ (the most careful)\nbất quy tắc: good → the best | bad → the worst\nỞ đây kind là tính từ NGẮN nên dùng my kindest. Luôn có the, và không có than.\nVí dụ cùng dạng: Nam is my best friend. - She is my kindest teacher.🔍 Giải thích chi tiết: Ghép lần lượt: chủ ngữ Lily → is → my kindest → girl → Lily is my kindest girl. Tính từ kind thuộc nhóm ngắn nên dạng nhất là kindest. Chú ý câu này dùng my thay cho the - khi đã có từ sở hữu thì không dùng thêm the.",
   "huongDan": "Put the words in order to make sentences.",
   "choices": [
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "Jean/ not/ play tennis/ on Saturday mornings/ .",
   "dap": "",
   "giai": "✅ Đáp án đúng: Jean doesn’t play tennis on Saturday mornings.📘 Ngữ cảnh: Cụm on Saturday mornings → thói quen → hiện tại đơn. Có not → phủ định.🏗️ Cấu trúc: \nHiện tại ĐƠN: S + V (-s / -es) → việc lặp đi lặp lại, sự thật\nHiện tại TIẾP DIỄN: S + am / is / are + V-ing → việc đang xảy ra lúc này\nBảng dấu hiệu nhận biết:\nĐƠN: every day / week - always, usually, often, sometimes, never\n on Mondays - lịch trình cố định - sự thật hiển nhiên\nTIẾP DIỄN: now - right now - at the moment - at present - today\n Look! - Listen! - Watch out! - Be quiet!\nPhủ định / nghi vấn:\nĐƠN: don’t / doesn’t + V | Do / Does + S + V ?\nTIẾP DIỄN: am / is / aren’t + V-ing | Am / Is / Are + S + V-ing ?\nLưu ý: không trộn hai thì - đã dùng be thì phải có V-ing, đã dùng do/does thì động từ để nguyên thể.\nSoi vào câu này: Jean/ not/ play tennis/ on Saturday mornings/ . → Jean doesn’t play tennis on Saturday mornings.🔍 Giải thích chi tiết: Viết Jean doesn’t play tennis on Saturday mornings. Jean là một người → dùng doesn’t, động từ nguyên thể play. Cùng mẫu với câu về John phía trên.",
   "huongDan": "Write sentences. Use the present simple or present continuous form of the verbs.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "Dad/ in the kitchen/ at the moment/ making coffee/ is/ .",
   "dap": "",
   "giai": "✅ Đáp án đúng: Dad is making coffee in the kitchen at the moment.📘 Ngữ cảnh: Có is, making và at the moment → câu khẳng định ở hiện tại tiếp diễn.🏗️ Cấu trúc: \nHiện tại ĐƠN: S + V (-s / -es) → việc lặp đi lặp lại, sự thật\nHiện tại TIẾP DIỄN: S + am / is / are + V-ing → việc đang xảy ra lúc này\nBảng dấu hiệu nhận biết:\nĐƠN: every day / week - always, usually, often, sometimes, never\n on Mondays - lịch trình cố định - sự thật hiển nhiên\nTIẾP DIỄN: now - right now - at the moment - at present - today\n Look! - Listen! - Watch out! - Be quiet!\nPhủ định / nghi vấn:\nĐƠN: don’t / doesn’t + V | Do / Does + S + V ?\nTIẾP DIỄN: am / is / aren’t + V-ing | Am / Is / Are + S + V-ing ?\nLưu ý: không trộn hai thì - đã dùng be thì phải có V-ing, đã dùng do/does thì động từ để nguyên thể.\nSoi vào câu này: Dad/ in the kitchen/ at the moment/ making coffee/ is/ . → Dad is making coffee in the kitchen at the moment.🔍 Giải thích chi tiết: Viết Dad is making coffee in the kitchen at the moment. Cụm making coffee gồm động từ và tân ngữ nên đi liền. Lại theo quy tắc nơi chốn trước thời gian: in the kitchen rồi mới at the moment.",
   "huongDan": "Reorder the words to make a correct sentence.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "Amy and her friends/ dance/ on the stage/ .",
   "dap": "",
   "giai": "✅ Đáp án đúng: Amy and her friends are dancing on the stage.📘 Ngữ cảnh: Chủ ngữ Amy and her friends gồm nhiều người nối bằng and → số nhiều.🏗️ Cấu trúc: \nKhẳng định: S + am / is / are + V-ing + ...\nPhủ định: S + am / is / are + not + V-ing + ...\nNghi vấn: Am / Is / Are + S + V-ing ... ?\nSoi vào câu này: Amy and her friends + are + dancing + ...\nBảng chia be:\nI → am (phủ định ’m not)\nhe - she - it, danh từ số ít → is (phủ định isn’t)\nyou - we - they, danh từ số nhiều → are (phủ định aren’t)\nChủ ngữ Amy and her friends ở số nhiều nên dùng are.\nThiếu một trong hai phần là SAI: phải có đủ be và V-ing.\nDấu hiệu nhận biết: now, right now, at the moment, today, Look!, Listen!, Watch out!, Be quiet!\nTrả lời ngắn: Yes, + S + am / is / are. / No, + S + ’m not / isn’t / aren’t.\nÁp công thức vào câu này: Amy and her friends + are + dancing + on the stage🔍 Giải thích chi tiết: Viết Amy and her friends are dancing on the stage. Dùng are vì chủ ngữ là cả nhóm - đừng chỉ nhìn chữ Amy rồi chọn is. dance bỏ -e câm thành dancing.",
   "huongDan": "Look at the picture. Make sentences from the words. Use present continuous tense.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "Sally and her family/ camping/ in the forest/ Sunday/ on/ went/ .",
   "dap": "",
   "giai": "✅ Đáp án đúng: Sally and her family went camping in the forest on Sunday. = Sally và gia đình đã đi cắm trại trong rừng vào Chủ nhật.📘 Ngữ cảnh: Trong đống từ có went đã chia quá khứ. Câu khẳng định với chủ ngữ dài.🏗️ Cấu trúc: \nS + V2 (cột 2 - quá khứ) + O (động từ BẤT QUY TẮC)\nSoi vào câu này: go → went\nĐộng từ bất quy tắc KHÔNG thêm -ed - phải học thuộc từng từ.\nBảng các từ hay gặp:\ngo → went | eat → ate | drink → drank | take → took\nhave → had | see → saw | write → wrote | do → did\ncome → came | ride → rode | say → said | drive → drove\nget up → got up, wake up → woke up (chỉ đổi động từ chính, tiểu từ giữ nguyên)\nread → read: viết y hệt nhưng đọc khác (/riːd/ → /red/).\nV2 dùng chung cho mọi chủ ngữ; sau didn’t / Did thì quay về NGUYÊN THỂ.\nÁp công thức vào câu này: Sally and her family + went🔍 Giải thích chi tiết: Ghép: Sally and her family → went camping → in the forest → on Sunday. Cụm go + V-ing (go camping, go swimming) dùng cho hoạt động ngoài trời; khi chia quá khứ chỉ đổi go → went, phần camping giữ nguyên.",
   "huongDan": "Write the sentence in the right order.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "students/ English/ yesterday/ The/ study/ ./ didn’t",
   "dap": "",
   "giai": "✅ Đáp án đúng: The students didn’t study English yesterday. = Các bạn học sinh đã không học tiếng Anh hôm qua.📘 Ngữ cảnh: Trong đống từ có didn’t → đây là câu phủ định, và động từ study đang ở nguyên thể.🏗️ Cấu trúc: \nPhủ định: S + didn’t + V (nguyên thể)\nNghi vấn: Did + S + V (nguyên thể) ?\nSoi vào câu này: The students + didn’t + study\ndidn’t / Did dùng cho MỌI chủ ngữ - không phân biệt số ít hay số nhiều.\nSau didn’t / Did, động từ trở về NGUYÊN THỂ - bỏ đuôi -ed.\nTrả lời ngắn: Yes, + S + did. / No, + S + didn’t.\nDấu hiệu quá khứ: yesterday, last night / week, ... ago, when I was little.\nÁp công thức vào câu này: The students + didn’t study + English yesterday🔍 Giải thích chi tiết: Ghép: The students → didn’t → study (giữ nguyên thể) → English → yesterday. Sau didn’t tuyệt đối không thêm -ed, nên trong đống từ mới cho sẵn study chứ không phải studied.",
   "huongDan": "Write the sentence in the right order.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "biggest / the / is / city / Tokyo / .",
   "dap": "",
   "giai": "✅ Đáp án đúng: Tokyo is the biggest city. = Tokyo là thành phố lớn nhất.📘 Ngữ cảnh: Trong đống từ xáo trộn có the và dạng biggest, nên đây là câu so sánh nhất, kèm danh từ city phải đặt ngay sau tính từ.🏗️ Cấu trúc: \nA + be + the + tính từ so sánh nhất + in / of + phạm vi\nSoi vào câu này: Tokyo + is + the biggest + city\nBảng biến đổi:\ntính từ NGẮN → the + tính từ + -est (tall → the tallest)\ntính từ DÀI → the most + tính từ (the most careful)\nbất quy tắc: good → the best | bad → the worst\nỞ đây big là tính từ NGẮN nên dùng the biggest. Luôn có the, và không có than.\nVí dụ cùng dạng: Hanoi is the oldest city. - This is the smallest room.🔍 Giải thích chi tiết: Ghép lần lượt: chủ ngữ Tokyo → is → the biggest → city → Tokyo is the biggest city. Tính từ big thuộc nhóm ngắn nên dạng nhất là biggest. Lỗi hay gặp: quên the, hoặc để danh từ city tách rời khỏi tính từ.",
   "huongDan": "Put the words in order to make sentences.",
   "choices": [
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "is/ Ann/ tired/ goes/ so/ she/ to bed/ early/ .",
   "dap": "",
   "giai": "✅ Đáp án đúng: Ann is tired so she goes to bed early.📘 Ngữ cảnh: Liên từ so nối nguyên nhân → kết quả: Ann mệt nên đi ngủ sớm.🏗️ Cấu trúc: \nvế 1 + liên từ + vế 2\nSoi vào câu này: is/ Ann/ tired/ goes/ so/ she/ to bed/ early/ .\n→ Ann is tired so she goes to bed early. (liên từ so)\nBảng 4 liên từ - nhìn QUAN HỆ giữa hai vế:\nand = và → hai vế cùng chiều, bổ sung cho nhau\n The leopard is fast and strong.\nbut = nhưng → hai vế trái ngược, vế sau ngược với điều mong đợi\n I’m very tired, but I can’t sleep.\nor = hoặc → đưa ra lựa chọn, thường trong câu hỏi\n Do you want a cookie or a cupcake?\nso = nên → vế 1 là nguyên nhân, vế 2 là kết quả\n I was tired, so I went to sleep early.\nMẹo phân biệt nhanh:\nthấy dấu ? và hai thứ để chọn → or\nvế sau phủ định hoặc ngược ý vế trước → but\nthay thử bằng vì vậy mà nghe xuôi → so; thay bằng và nghe xuôi → and🔍 Giải thích chi tiết: Viết Ann is tired so she goes to bed early. Trật tự: vế nguyên nhân + so + vế kết quả. Chú ý vế sau phải có chủ ngữ riêng (she), không viết so goes to bed early.",
   "huongDan": "Reorder the words to make sentences.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "isn’t / milk / fridge / any/ in / there / the",
   "dap": "",
   "giai": "✅ Đáp án đúng: There isn’t any milk in the fridge.📘 Ngữ cảnh: Yêu cầu của phần này: xếp các mảnh cho sẵn thành một câu đúng. Các mảnh: isn’t / milk / fridge / any/ in / there / the Dấu chấm ở cuối cho biết đây là câu phủ định, và danh từ chính là milk - danh từ KHÔNG đếm được.🏗️ Cấu trúc: Trật tự từ của câu There is / There are:\nCâu kể: There + is / are + (some) + danh từ + nơi chốn .\nCâu phủ định: There + isn’t / aren’t + any + danh từ + nơi chốn .\nCâu hỏi: Is / Are + there + any + danh từ + nơi chốn ?\nCụm nơi chốn luôn đứng CUỐI; giới từ (in, on, under …) đi liền trước nơi chốn đó.\nSoi vào câu này: There isn’t any milk in the fridge.🔍 Giải thích chi tiết: Xếp đúng sẽ được câu There isn’t any milk in the fridge. Vì là câu phủ định nên dùng There isn’t, và phần phủ định n’t viết dính vào to be. Danh từ milk là danh từ KHÔNG đếm được nên to be phải là is / isn’t. Từ any đứng ngay trước danh từ: any dùng cho câu phủ định và câu hỏi. Cụm chỉ nơi chốn luôn để ở CUỐI câu, sau danh từ.",
   "huongDan": "Order the words to make correct sentences.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "mother/ yesterday/ the/ cleaned/ windows/ My/ .",
   "dap": "",
   "giai": "✅ Đáp án đúng: My mother cleaned the windows yesterday. = Mẹ tôi đã lau cửa sổ hôm qua.📘 Ngữ cảnh: Trong đống từ có cleaned đã ở dạng quá khứ và yesterday - dấu hiệu quá khứ. Đây là câu khẳng định.🏗️ Cấu trúc: \nS + V-ed + O (quá khứ đơn - động từ có quy tắc)\nSoi vào câu này: clean + đuôi → cleaned (thêm thẳng -ed)\nBảng thêm đuôi -ed:\nthường → +ed (walk → walked)\ntận cùng -e → +d (like → liked)\ntận cùng -y sau phụ âm → -ied (study → studied)\n1 âm tiết, nguyên âm + phụ âm → gấp đôi phụ âm rồi +ed (stop → stopped)\nĐộng từ quá khứ KHÔNG đổi theo chủ ngữ - mọi chủ ngữ đều dùng cùng một dạng.\nÁp công thức vào câu này: My mother + cleaned + the windows yesterday🔍 Giải thích chi tiết: Ghép: chủ ngữ My mother → động từ cleaned → tân ngữ the windows → trạng ngữ yesterday. Cụm chỉ thời gian đặt ở cuối câu. Dạng cleaned dùng chung cho mọi chủ ngữ.",
   "huongDan": "Write the sentence in the right order.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "you/ do/ your homework/ at the moment/ ?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Are you doing your homework at the moment?📘 Ngữ cảnh: Cụm at the moment → hiện tại tiếp diễn; dấu ? cho biết là câu hỏi. Chủ ngữ you.🏗️ Cấu trúc: \nHiện tại ĐƠN: S + V (-s / -es) → việc lặp đi lặp lại, sự thật\nHiện tại TIẾP DIỄN: S + am / is / are + V-ing → việc đang xảy ra lúc này\nBảng dấu hiệu nhận biết:\nĐƠN: every day / week - always, usually, often, sometimes, never\n on Mondays - lịch trình cố định - sự thật hiển nhiên\nTIẾP DIỄN: now - right now - at the moment - at present - today\n Look! - Listen! - Watch out! - Be quiet!\nPhủ định / nghi vấn:\nĐƠN: don’t / doesn’t + V | Do / Does + S + V ?\nTIẾP DIỄN: am / is / aren’t + V-ing | Am / Is / Are + S + V-ing ?\nLưu ý: không trộn hai thì - đã dùng be thì phải có V-ing, đã dùng do/does thì động từ để nguyên thể.\nSoi vào câu này: you/ do/ your homework/ at the moment/ ? → Are you doing your homework at the moment?🔍 Giải thích chi tiết: Viết Are you doing your homework at the moment? Câu hỏi đảo Are lên đầu, động từ thành doing. Chủ ngữ you luôn đi với are dù chỉ một người. Nhớ dấu ?.",
   "huongDan": "Write sentences. Use the present simple or present continuous form of the verbs.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "running/ I/ is/ think/ than/ walking/ easier/ .",
   "dap": "",
   "giai": "✅ Đáp án đúng: I think walking is easier than running. = Tôi nghĩ đi bộ dễ hơn chạy.📘 Ngữ cảnh: Trong đống từ xáo trộn có easier và từ than nên đây là câu so sánh hơn. Hai đối tượng đem so sánh là walking và running.🏗️ Cấu trúc: \nA + be + tính từ so sánh hơn + than + B\nSoi vào câu này: walking + is + easier + than + running\nBảng biến đổi:\ntính từ NGẮN (1 âm tiết, hoặc 2 âm tiết đuôi -y) → thêm -er (tall → taller)\ntính từ DÀI (từ 2-3 âm tiết trở lên) → more + tính từ (more careful)\nbất quy tắc: good → better | bad → worse\nỞ đây easy là tính từ NGẮN (2 ÂM TIẾT KẾT THÚC BẰNG -Y) nên dùng easier. Có than thì luôn là dạng hơn.\nCụm I think đứng ngoài cùng, trước cả chủ ngữ của mệnh đề so sánh.\nVí dụ cùng dạng: I think Maths is harder than English. - She thinks summer is hotter than spring.🔍 Giải thích chi tiết: Ghép lần lượt: chủ ngữ → động từ be → easier → than → đối tượng còn lại, được I think walking is easier than running. Tính từ easy thuộc nhóm ngắn (2 âm tiết kết thúc bằng -y) nên dạng so sánh là easier (thêm đuôi, không dùng more). Lỗi hay gặp: đặt than không liền sau tính từ so sánh, hoặc thêm more cho tính từ ngắn.",
   "huongDan": "Order the words to make sentences.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "do/ How/ you/ to/ go/ school/?",
   "dap": "",
   "giai": "✅ Đáp án đúng: How do you go to school? = Bạn đi học bằng cách nào?📘 Ngữ cảnh: Trong đống từ có How (hỏi cách thức/phương tiện), do, động từ go và cụm to school.🏗️ Cấu trúc: \nTừ để hỏi + do / does / be + S + V ... ?\nSoi vào câu này: How + do + you ?\nBảng từ để hỏi:\nWhat = cái gì | Who = ai | Where = ở đâu\nWhen = khi nào | Why = tại sao | How = thế nào\nWhich = cái nào (chọn trong số) | Whose = của ai\nChọn trợ động từ theo động từ chính:\nđộng từ be → đảo is / are lên ngay sau từ để hỏi (Where is your bag?)\nđộng từ thường → dùng do / does, động từ giữ nguyên thể (Where do you live?)🔍 Giải thích chi tiết: Ghép: How → do → you → go → to school → ?. Chủ ngữ you luôn đi với do. Chú ý cụm go to school phải giữ nguyên giới từ to - viết go school là thiếu.",
   "huongDan": "Reorder the words to make the correct question.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "beautiful / can / my sister / draw / pictures / .",
   "dap": "",
   "giai": "✅ Đáp án đúng: My sister can draw beautiful pictures. = Chị tôi vẽ được những bức tranh đẹp.📘 Ngữ cảnh: Trong đống từ có can nên đây là câu nói về khả năng. Còn có tính từ beautiful phải đặt trước danh từ pictures.🏗️ Cấu trúc: \nS + can / can’t + V (nguyên thể)\nSoi vào câu này: My sister + can + draw beautiful pictures\ncan = làm được | can’t = không làm được\nSau can / can’t, động từ giữ nguyên: không thêm -s, không thêm -ing.\ncan không đổi theo chủ ngữ - không có cans, không có doesn’t can.\nCâu hỏi: Can + S + V? → Trả lời: Yes, ... can. / No, ... can’t.🔍 Giải thích chi tiết: Ghép: chủ ngữ My sister → can → động từ draw (nguyên thể) → cụm beautiful pictures (tính từ trước danh từ) → My sister can draw beautiful pictures. Lỗi hay gặp: đặt beautiful sau pictures theo thói quen tiếng Việt (\"tranh đẹp\").",
   "huongDan": "Put the words in order to make sentences.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "best / Sam / the / is / singer / .",
   "dap": "",
   "giai": "✅ Đáp án đúng: Sam is the best singer. = Sam là ca sĩ hát hay nhất.📘 Ngữ cảnh: Trong đống từ xáo trộn có the và dạng best, nên đây là câu so sánh nhất, và còn một danh từ singer phải đặt ngay sau tính từ.🏗️ Cấu trúc: \nA + be + the + tính từ so sánh nhất + in / of + phạm vi\nSoi vào câu này: Sam + is + the best + singer\nBảng biến đổi:\ntính từ NGẮN → the + tính từ + -est (tall → the tallest)\ntính từ DÀI → the most + tính từ (the most careful)\nbất quy tắc: good → the best | bad → the worst\nỞ đây good là tính từ BẤT QUY TẮC nên dùng the best. Luôn có the, và không có than.\nVí dụ cùng dạng: Lan is the best dancer. - This is the worst film.🔍 Giải thích chi tiết: Ghép lần lượt: chủ ngữ Sam → động từ is → the best → danh từ singer → Sam is the best singer. Tính từ good thuộc nhóm bất quy tắc nên dạng nhất là best. Hai lỗi hay gặp: quên the trước tính từ, và đặt danh từ singer sai chỗ - nó phải đứng ngay sau tính từ, không để cuối câu tách rời.",
   "huongDan": "Put the words in order to make sentences.",
   "choices": [
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "(the food you eat for breakfast)",
   "dap": "",
   "giai": "✅ Đáp án đúng: I have some noodles for breakfast📘 Ngữ cảnh:\nBài yêu cầu: Rearrange the words to write your own sentence.\nCác mảnh cho sẵn: I / have / some / noodles / for / breakfast\nViệc cần làm: xếp lại thành một câu đúng ngữ pháp và đúng trật tự từ.🏗️ Cấu trúc: Trật tự từ cơ bản của câu tiếng Anh:\nS + V + O + (nơi chốn) + (thời gian) .\nMạo từ (a / an / the) và tính từ đứng TRƯỚC danh từ: a + big + dog.\nGiới từ (in, on, under …) đi liền trước cụm chỉ nơi chốn và đứng ở CUỐI câu.\nChữ đầu câu viết hoa, cuối câu có dấu chấm.\nSoi vào câu này: I have some noodles for breakfast🔍 Giải thích chi tiết:\nXếp đúng sẽ được câu: I have some noodles for breakfast\nMạo từ \"some\" phải đứng ngay trước \"noodles\". Chủ ngữ đứng đầu, động từ theo sau, cụm chỉ nơi chốn để cuối câu.\nLỗi hay gặp: đặt tính từ sau danh từ như tiếng Việt. Tiếng Anh luôn là tính từ TRƯỚC danh từ (a big dog, không phải a dog big).",
   "huongDan": "Rearrange the words to write your own sentence.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "The little boy/ hide/ behind the bushes/ .",
   "dap": "",
   "giai": "✅ Đáp án đúng: The little boy is hiding behind the bushes.📘 Ngữ cảnh: Từ gợi ý cho sẵn theo đúng thứ tự, chỉ cần chia động từ hide sang hiện tại tiếp diễn. Chủ ngữ The little boy là một bạn → số ít.🏗️ Cấu trúc: \nKhẳng định: S + am / is / are + V-ing + ...\nPhủ định: S + am / is / are + not + V-ing + ...\nNghi vấn: Am / Is / Are + S + V-ing ... ?\nSoi vào câu này: The little boy + is + hiding + ...\nBảng chia be:\nI → am (phủ định ’m not)\nhe - she - it, danh từ số ít → is (phủ định isn’t)\nyou - we - they, danh từ số nhiều → are (phủ định aren’t)\nChủ ngữ The little boy ở số ít nên dùng is.\nThiếu một trong hai phần là SAI: phải có đủ be và V-ing.\nDấu hiệu nhận biết: now, right now, at the moment, today, Look!, Listen!, Watch out!, Be quiet!\nTrả lời ngắn: Yes, + S + am / is / are. / No, + S + ’m not / isn’t / aren’t.\nÁp công thức vào câu này: The little boy + is + hiding + behind the bushes🔍 Giải thích chi tiết: Viết The little boy is hiding behind the bushes. Thêm is trước động từ và đổi hide → hiding: hide tận cùng -e câm nên bỏ e rồi thêm -ing.",
   "huongDan": "Look at the picture. Make sentences from the words. Use present continuous tense.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "at home/ yesterday/ dinner/ eat/ Did/ they/ ?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Did they eat dinner at home yesterday? = Hôm qua họ có ăn tối ở nhà không?📘 Ngữ cảnh: Có dấu ? và từ Did → câu hỏi; động từ eat ở nguyên thể.🏗️ Cấu trúc: \nPhủ định: S + didn’t + V (nguyên thể)\nNghi vấn: Did + S + V (nguyên thể) ?\nSoi vào câu này: they + Did + eat\ndidn’t / Did dùng cho MỌI chủ ngữ - không phân biệt số ít hay số nhiều.\nSau didn’t / Did, động từ trở về NGUYÊN THỂ - bỏ đuôi -ed.\nTrả lời ngắn: Yes, + S + did. / No, + S + didn’t.\nDấu hiệu quá khứ: yesterday, last night / week, ... ago, when I was little.\nÁp công thức vào câu này: they + Did ... eat🔍 Giải thích chi tiết: Ghép: Did → they → eat → dinner → at home → yesterday. Thứ tự cuối câu: nơi chốn trước, thời gian sau (at home yesterday).",
   "huongDan": "Write the sentence in the right order.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "yesterday/ book/ read/ didn’t/ Karen/ a/ .",
   "dap": "",
   "giai": "✅ Đáp án đúng: Karen didn’t read a book yesterday. = Karen đã không đọc sách hôm qua.📘 Ngữ cảnh: Trong đống từ có didn’t → câu phủ định, và động từ read đang ở nguyên thể.🏗️ Cấu trúc: \nPhủ định: S + didn’t + V (nguyên thể)\nNghi vấn: Did + S + V (nguyên thể) ?\nSoi vào câu này: Karen + didn’t + read\ndidn’t / Did dùng cho MỌI chủ ngữ - không phân biệt số ít hay số nhiều.\nSau didn’t / Did, động từ trở về NGUYÊN THỂ - bỏ đuôi -ed.\nTrả lời ngắn: Yes, + S + did. / No, + S + didn’t.\nDấu hiệu quá khứ: yesterday, last night / week, ... ago, when I was little.\nÁp công thức vào câu này: Karen + didn’t read + a book yesterday🔍 Giải thích chi tiết: Ghép: Karen → didn’t → read (nguyên thể) → a book → yesterday. Với read, dạng nguyên thể và quá khứ viết giống nhau nên nhìn không ra - nhưng vì có didn’t nên chắc chắn đây là nguyên thể, đọc là /riːd/.",
   "huongDan": "Write the sentence in the right order.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "aren’t/ these/ our parents’/ cars.",
   "dap": "",
   "giai": "✅ Đáp án đúng: These aren’t our parents’ cars. = Đây không phải là những chiếc xe của bố mẹ chúng tôi.📘 Ngữ cảnh: Các từ cho sẵn gồm these, aren’t và cụm sở hữu our parents’ (chú ý dấu nháy đặt sau chữ s) cùng danh từ cars.🏗️ Cấu trúc: \nngười/vật sở hữu + ’s + thứ được sở hữu\nSoi vào câu này: our parents’ + cars\nQuy tắc đặt dấu:\ndanh từ không có -s ở cuối → thêm ’s (the boy’s bag, children’s toys)\ndanh từ đã có -s ở cuối → chỉ thêm ’ (the boys’ bag, my parents’ car)\nChe phần sau dấu nháy đi, nhìn từ còn lại là biết một hay nhiều.🔍 Giải thích chi tiết: Chủ ngữ These đứng đầu, rồi aren’t, rồi cụm our parents’ cars → These aren’t our parents’ cars. Hai chi tiết cần chú ý: chủ ngữ These số nhiều nên đi với aren’t (không phải isn’t), và parents’ chỉ có dấu nháy vì parents đã kết thúc bằng -s - viết parents’s là sai.",
   "huongDan": "Order the words to make sentences.",
   "choices": [
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "is / student / David / the / tallest/ .",
   "dap": "",
   "giai": "✅ Đáp án đúng: David is the tallest student. = David là học sinh cao nhất.📘 Ngữ cảnh: Trong đống từ xáo trộn có the và dạng tallest, nên đây là câu so sánh nhất, kèm danh từ student phải đặt ngay sau tính từ.🏗️ Cấu trúc: \nA + be + the + tính từ so sánh nhất + in / of + phạm vi\nSoi vào câu này: David + is + the tallest + student\nBảng biến đổi:\ntính từ NGẮN → the + tính từ + -est (tall → the tallest)\ntính từ DÀI → the most + tính từ (the most careful)\nbất quy tắc: good → the best | bad → the worst\nỞ đây tall là tính từ NGẮN nên dùng the tallest. Luôn có the, và không có than.\nVí dụ cùng dạng: Mai is the smartest girl. - He is the youngest boy.🔍 Giải thích chi tiết: Ghép lần lượt: chủ ngữ David → is → the tallest → student → David is the tallest student. Tính từ tall thuộc nhóm ngắn nên dạng nhất là tallest. Lỗi hay gặp: quên the, hoặc để danh từ student tách rời khỏi tính từ.",
   "huongDan": "Put the words in order to make sentences.",
   "choices": [
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "the / interesting / is / book / most / this / .",
   "dap": "",
   "giai": "✅ Đáp án đúng: This book is the most interesting. = Quyển sách này là thú vị nhất.📘 Ngữ cảnh: Trong đống từ xáo trộn có the và chữ most, nên đây là câu so sánh nhất.🏗️ Cấu trúc: \nA + be + the + tính từ so sánh nhất + in / of + phạm vi\nSoi vào câu này: This book + is + the most interesting\nBảng biến đổi:\ntính từ NGẮN → the + tính từ + -est (tall → the tallest)\ntính từ DÀI → the most + tính từ (the most careful)\nbất quy tắc: good → the best | bad → the worst\nỞ đây interesting là tính từ DÀI nên dùng the most interesting. Luôn có the, và không có than.\nVí dụ cùng dạng: That film is the most boring. - This game is the most exciting.🔍 Giải thích chi tiết: Ghép lần lượt: chủ ngữ This book → is → the most interesting → This book is the most interesting. Tính từ interesting thuộc nhóm dài nên dạng nhất là most interesting. Lỗi hay gặp: quên the.",
   "huongDan": "Put the words in order to make sentences.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "John/ not go/ to school/ on Wednesday afternoons/ .",
   "dap": "",
   "giai": "✅ Đáp án đúng: John doesn’t go to school on Wednesday afternoons.📘 Ngữ cảnh: Cụm on Wednesday afternoons (vào các chiều thứ Tư) là thói quen lặp lại → hiện tại đơn. Có not → phủ định.🏗️ Cấu trúc: \nHiện tại ĐƠN: S + V (-s / -es) → việc lặp đi lặp lại, sự thật\nHiện tại TIẾP DIỄN: S + am / is / are + V-ing → việc đang xảy ra lúc này\nBảng dấu hiệu nhận biết:\nĐƠN: every day / week - always, usually, often, sometimes, never\n on Mondays - lịch trình cố định - sự thật hiển nhiên\nTIẾP DIỄN: now - right now - at the moment - at present - today\n Look! - Listen! - Watch out! - Be quiet!\nPhủ định / nghi vấn:\nĐƠN: don’t / doesn’t + V | Do / Does + S + V ?\nTIẾP DIỄN: am / is / aren’t + V-ing | Am / Is / Are + S + V-ing ?\nLưu ý: không trộn hai thì - đã dùng be thì phải có V-ing, đã dùng do/does thì động từ để nguyên thể.\nSoi vào câu này: John/ not go/ to school/ on Wednesday afternoons/ . → John doesn’t go to school on Wednesday afternoons.🔍 Giải thích chi tiết: Viết John doesn’t go to school on Wednesday afternoons. Chủ ngữ John số ít nên dùng doesn’t, và động từ giữ nguyên thể go. So sánh với câu trên: cùng có not nhưng khác thì nên khác hẳn cách viết.",
   "huongDan": "Write sentences. Use the present simple or present continuous form of the verbs.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "reading / likes / my friend / interesting / books /.",
   "dap": "",
   "giai": "✅ Đáp án đúng: My friend likes reading interesting books. = Bạn tôi thích đọc những quyển sách thú vị.📘 Ngữ cảnh: Trong đống từ có likes (đã chia sẵn -s) và reading (đã ở dạng V-ing) - hai dấu hiệu của cấu trúc like + V-ing.🏗️ Cấu trúc: \nS + like / love / hate + V-ing\nSoi vào câu này: My friend + likes + reading + interesting books\nChủ ngữ he / she / it và danh từ số ít → động từ cảm xúc thêm -s (likes, loves, hates).\nPhủ định: S + don’t / doesn’t + like + V-ing (sau don’t/doesn’t thì không chia nữa).\nCâu hỏi: Do / Does + S + like + V-ing?\nCách thêm -ing: thường thêm thẳng (play → playing); bỏ -e (ride → riding); gấp đôi phụ âm (swim → swimming).🔍 Giải thích chi tiết: Ghép: My friend → likes → reading → interesting books → My friend likes reading interesting books. Chữ likes có sẵn -s xác nhận chủ ngữ là My friend (số ít ngôi 3). Tính từ interesting đứng trước danh từ books.",
   "huongDan": "Put the words in order to make sentences.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "does/ How/ your mom/ to/ go/ work/?",
   "dap": "",
   "giai": "✅ Đáp án đúng: How does your mom go to work?📘 Ngữ cảnh: Từ cho sẵn có How và does - hỏi mẹ đi làm bằng cách nào.🏗️ Cấu trúc: \nTừ để hỏi + do / does / be + S + V ... ?\nSoi vào câu này: How + does + your mom + go ?\nBảng từ để hỏi:\nWhat = cái gì | Who = ai | Where = ở đâu\nWhen = khi nào | Why = tại sao | How = thế nào\nWhich = cái nào (chọn trong số) | Whose = của ai\nChọn trợ động từ theo động từ chính:\nđộng từ be → đảo is / are lên ngay sau từ để hỏi (Where is your bag?)\nđộng từ thường → dùng do / does, động từ giữ nguyên thể (Where do you live?)\nSoi câu này: does/ How/ your mom/ to/ go/ work/?\n→ How does your mom go to work?🔍 Giải thích chi tiết: Viết How does your mom go to work? Cụm go to work phải đi liền nhau theo đúng thứ tự. Dùng does vì your mom số ít, và động từ go giữ nguyên thể.",
   "huongDan": "Reorder the words to make the correct question.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "bike/ didn’t/ his/ ride/ yesterday/ He",
   "dap": "",
   "giai": "✅ Đáp án đúng: He didn’t ride his bike yesterday. = Cậu ấy đã không đạp xe hôm qua.📘 Ngữ cảnh: Trong đống từ có didn’t → câu phủ định, động từ ride ở nguyên thể.🏗️ Cấu trúc: \nPhủ định: S + didn’t + V (nguyên thể)\nNghi vấn: Did + S + V (nguyên thể) ?\nSoi vào câu này: He + didn’t + ride\ndidn’t / Did dùng cho MỌI chủ ngữ - không phân biệt số ít hay số nhiều.\nSau didn’t / Did, động từ trở về NGUYÊN THỂ - bỏ đuôi -ed.\nTrả lời ngắn: Yes, + S + did. / No, + S + didn’t.\nDấu hiệu quá khứ: yesterday, last night / week, ... ago, when I was little.\nÁp công thức vào câu này: He + didn’t ride + his bike yesterday🔍 Giải thích chi tiết: Ghép: He → didn’t → ride → his bike → yesterday. Sau didn’t dùng nguyên thể ride, không phải dạng quá khứ rode. Tính từ sở hữu his đứng liền trước danh từ bike.",
   "huongDan": "Write the sentence in the right order.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "is/ This book/ than/ more/ interesting/ that book/ .",
   "dap": "",
   "giai": "✅ Đáp án đúng: This book is more interesting than that book. = Quyển sách này thú vị hơn quyển sách kia.📘 Ngữ cảnh: Trong đống từ xáo trộn có more interesting và từ than, nên đây là câu so sánh hơn. Hai đối tượng được đem ra so sánh là This book và that book.🏗️ Cấu trúc: \nA + be + tính từ so sánh hơn + than + B\nSoi vào câu này: This book + is + more interesting + than + that book\nBảng biến đổi:\ntính từ NGẮN (1 âm tiết, hoặc 2 âm tiết đuôi -y) → thêm -er (tall → taller)\ntính từ DÀI (từ 2-3 âm tiết trở lên) → more + tính từ (more careful)\nbất quy tắc: good → better | bad → worse\nỞ đây interesting là tính từ DÀI nên dùng more interesting. Có than thì luôn là dạng hơn.\nVí dụ cùng dạng: This film is more exciting than that film. - Maths is more difficult than English.🔍 Giải thích chi tiết: Ghép theo đúng trật tự: chủ ngữ This book, rồi động từ is, rồi more interesting, rồi than và đối tượng còn lại → This book is more interesting than that book. Tính từ interesting là tính từ dài nên dùng dạng more interesting. Lỗi hay gặp: đặt than sai chỗ, hoặc quên rằng than luôn đứng ngay sau tính từ so sánh.",
   "huongDan": "Order the words to make sentences.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "the sun/ shine/ now/ ?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Is the sun shining now?📘 Ngữ cảnh: Từ now → hiện tại tiếp diễn; dấu ? → câu hỏi. Chủ ngữ the sun số ít.🏗️ Cấu trúc: \nHiện tại ĐƠN: S + V (-s / -es) → việc lặp đi lặp lại, sự thật\nHiện tại TIẾP DIỄN: S + am / is / are + V-ing → việc đang xảy ra lúc này\nBảng dấu hiệu nhận biết:\nĐƠN: every day / week - always, usually, often, sometimes, never\n on Mondays - lịch trình cố định - sự thật hiển nhiên\nTIẾP DIỄN: now - right now - at the moment - at present - today\n Look! - Listen! - Watch out! - Be quiet!\nPhủ định / nghi vấn:\nĐƠN: don’t / doesn’t + V | Do / Does + S + V ?\nTIẾP DIỄN: am / is / aren’t + V-ing | Am / Is / Are + S + V-ing ?\nLưu ý: không trộn hai thì - đã dùng be thì phải có V-ing, đã dùng do/does thì động từ để nguyên thể.\nSoi vào câu này: the sun/ shine/ now/ ? → Is the sun shining now?🔍 Giải thích chi tiết: Viết Is the sun shining now? Đảo Is lên đầu và viết hoa chữ I. shine tận cùng -e câm nên bỏ e thành shining, không viết shineing.",
   "huongDan": "Write sentences. Use the present simple or present continuous form of the verbs.",
   "choices": [
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "is / beach / most / the / beautiful / Sao Beach / .",
   "dap": "",
   "giai": "✅ Đáp án đúng: Sao Beach is the most beautiful beach. = Bãi Sao là bãi biển đẹp nhất.📘 Ngữ cảnh: Trong đống từ xáo trộn có the và chữ most, nên đây là câu so sánh nhất, kèm danh từ beach phải đặt ngay sau tính từ.🏗️ Cấu trúc: \nA + be + the + tính từ so sánh nhất + in / of + phạm vi\nSoi vào câu này: Sao Beach + is + the most beautiful + beach\nBảng biến đổi:\ntính từ NGẮN → the + tính từ + -est (tall → the tallest)\ntính từ DÀI → the most + tính từ (the most careful)\nbất quy tắc: good → the best | bad → the worst\nỞ đây beautiful là tính từ DÀI nên dùng the most beautiful. Luôn có the, và không có than.\nVí dụ cùng dạng: Ha Long is the most famous bay. - This is the most modern city.🔍 Giải thích chi tiết: Ghép lần lượt: chủ ngữ Sao Beach → is → the most beautiful → beach → Sao Beach is the most beautiful beach. Tính từ beautiful thuộc nhóm dài nên dạng nhất là most beautiful. Lỗi hay gặp: quên the, hoặc để danh từ beach tách rời khỏi tính từ.",
   "huongDan": "Put the words in order to make sentences.",
   "choices": [
    "",
    "",
    "",
    "",
    "",
    "",
    ""
   ]
  },
  {
   "noi": "those/ are/ books/ her/ ?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Are those her books? = Kia có phải là những quyển sách của cô ấy không?📘 Ngữ cảnh: Các từ cho sẵn có dấu ? ở cuối nên đây là câu hỏi. Gồm those, are, tính từ sở hữu her và danh từ books.🏗️ Cấu trúc: \nThis / That + is + danh từ SỐ ÍT\nThese / Those + are + danh từ SỐ NHIỀU\nthis / these = ở gần | that / those = ở xa\nSoi vào câu này: those + are + her books\nTrả lời ngắn phải đổi từ chỉ định thành đại từ:\nthis / that → it | these / those → they🔍 Giải thích chi tiết: Vì là câu hỏi nên Are đứng đầu (viết hoa), rồi those, rồi her books → Are those her books? Nếu viết Those are her books? thì sai trật tự - tiếng Anh phải đảo động từ be lên trước chủ ngữ mới thành câu hỏi. Chú ý her đứng ngay trước danh từ, không tách rời.",
   "huongDan": "Order the words to make sentences.",
   "choices": [
    "",
    "",
    "",
    ""
   ]
  }
 ],
 "matching": [
  {
   "noi": "I’m very tired, but I can’t sleep.",
   "dap": "",
   "giai": "✅ Đáp án đúng: I’m very tired, but I can’t sleep. ↔ Đưa ra thông tin trái ngược📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: I’m very tired, but I can’t sleep.\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Bốn liên từ cơ bản:\nand → nối hai thông tin cùng chiều, tương đương\nbut → nối hai thông tin TRÁI NGƯỢC nhau\nor → đưa ra sự lựa chọn giữa hai khả năng\nso → diễn tả KẾT QUẢ của điều vừa nói\nSoi vào câu này: I’m very tired, but I can’t sleep. ↔ Đưa ra thông tin trái ngược🔍 Giải thích chi tiết:\nTrong câu có liên từ \"but\". Đưa ra thông tin trái ngược chính là chức năng của liên từ này. Đọc lại câu sẽ thấy rõ: I’m very tired, but I can’t sleep.\nLỗi hay gặp: nối theo cảm tính vì thấy quen mắt. Hãy đọc kỹ TỪ KHOÁ ở vế trái rồi mới tìm vế phải tương ứng.",
   "huongDan": "Underline the conjunction in each sentence. Then match it with its meaning.",
   "choices": []
  },
  {
   "noi": "Do Ben and Ken play the violin?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Do Ben and Ken play the violin? ↔ No, they don’t.📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: Do Ben and Ken play the violin?\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Trả lời ngắn cho câu hỏi thì hiện tại đơn:\nDoes + he / she / it … ? → Yes, he does. / No, he doesn’t.\nDo + I / you / we / they … ? → Yes, they do. / No, they don’t.\nCâu trả lời phải nhắc lại ĐÚNG đại từ của chủ ngữ trong câu hỏi và dùng lại chính trợ động từ đó.\nSoi vào câu này: Do Ben and Ken play the violin? ↔ No, they don’t.🔍 Giải thích chi tiết:\nCâu hỏi bắt đầu bằng \"Do\" nên câu trả lời ngắn phải dùng lại chính trợ động từ đó, và nhắc lại chủ ngữ bằng đại từ \"they\". Vì vậy đáp án là \"No, they don’t.\".\nLỗi hay gặp: nối theo cảm tính vì thấy quen mắt. Hãy đọc kỹ TỪ KHOÁ ở vế trái rồi mới tìm vế phải tương ứng.",
   "huongDan": "Look at the picture, read and match each question with the correct answer.",
   "choices": []
  },
  {
   "noi": "My sister’s room",
   "dap": "",
   "giai": "✅ Đáp án đúng: My sister’s room ↔ D📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: My sister’s room\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Sở hữu cách:\ndanh từ SỐ ÍT + ’s (the boy’s shoes = giày của MỘT bạn nam)\ndanh từ số nhiều có -s + ’ (the boys’ shoes = giày của NHIỀU bạn nam)\ndanh từ số nhiều BẤT QUY TẮC + ’s (the women’s cars = xe của nhiều người phụ nữ)\nVị trí dấu ’ quyết định số lượng người sở hữu - đọc kỹ trước hay sau chữ s.\nSoi vào câu này: My sister’s room ↔ D🔍 Giải thích chi tiết:\nCụm \"My sister’s room\": dấu ’ đứng TRƯỚC chữ s nên người sở hữu chỉ có MỘT. Hãy tìm bức tranh thể hiện đúng số lượng đó.\nLỗi hay gặp: nối theo cảm tính vì thấy quen mắt. Hãy đọc kỹ TỪ KHOÁ ở vế trái rồi mới tìm vế phải tương ứng.",
   "huongDan": "Look at the picture and match each phrase with the correct letter.",
   "choices": []
  },
  {
   "noi": "There are",
   "dap": "",
   "giai": "✅ Đáp án đúng: two dogs in the yard. ↔ There are📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: two dogs in the yard.\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít / danh từ KHÔNG đếm được\nThere are + danh từ số nhiều\nPhủ định: There isn’t / There aren’t.\nsome dùng trong câu khẳng định, any dùng trong câu phủ định và câu hỏi.\nSoi vào câu này: two dogs in the yard. ↔ There are🔍 Giải thích chi tiết:\nVế trái là \"two dogs in the yard.\" - danh từ ở đây số nhiều nên phải dùng are. Vì vậy nửa còn lại là \"There are\". Ghép lại: There are two dogs in the yard.\nLỗi hay gặp: nối theo cảm tính vì thấy quen mắt. Hãy đọc kỹ TỪ KHOÁ ở vế trái rồi mới tìm vế phải tương ứng.",
   "huongDan": "Match the halves.",
   "choices": []
  },
  {
   "noi": "Does Willy listen to the radio?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Does Willy listen to the radio? ↔ Yes, he does.📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: Does Willy listen to the radio?\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Trả lời ngắn cho câu hỏi thì hiện tại đơn:\nDoes + he / she / it … ? → Yes, he does. / No, he doesn’t.\nDo + I / you / we / they … ? → Yes, they do. / No, they don’t.\nCâu trả lời phải nhắc lại ĐÚNG đại từ của chủ ngữ trong câu hỏi và dùng lại chính trợ động từ đó.\nSoi vào câu này: Does Willy listen to the radio? ↔ Yes, he does.🔍 Giải thích chi tiết:\nCâu hỏi bắt đầu bằng \"Does\" nên câu trả lời ngắn phải dùng lại chính trợ động từ đó, và nhắc lại chủ ngữ bằng đại từ \"he\". Vì vậy đáp án là \"Yes, he does.\".\nLỗi hay gặp: nối theo cảm tính vì thấy quen mắt. Hãy đọc kỹ TỪ KHOÁ ở vế trái rồi mới tìm vế phải tương ứng.",
   "huongDan": "Look at the picture, read and match each question with the correct answer.",
   "choices": []
  },
  {
   "noi": "Whose shoes are these?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Whose shoes are these? ↔ My dad’s.📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: Whose shoes are these?\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Phân biệt câu hỏi thì hiện tại đơn và hiện tại tiếp diễn:\nAm / Is / Are + S + V-ing … ? → đang xảy ra lúc này → Yes, he is. / No, they aren’t.\nDo / Does + S + V … ? → thói quen, lặp lại → Yes, he does. / No, they don’t.\nCâu hỏi bắt đầu bằng When / How often / Whose / Who thì trả lời bằng thông tin, không phải Yes / No.\nSoi vào câu này: Whose shoes are these? ↔ My dad’s.🔍 Giải thích chi tiết:\nCâu hỏi bắt đầu bằng \"Whose\" nên KHÔNG trả lời Yes / No mà phải trả lời bằng thông tin cụ thể, ở đây là \"My dad’s.\".\nLỗi hay gặp: nối theo cảm tính vì thấy quen mắt. Hãy đọc kỹ TỪ KHOÁ ở vế trái rồi mới tìm vế phải tương ứng.",
   "huongDan": "Match the question with the correct answer.",
   "choices": []
  },
  {
   "noi": "Our party is on",
   "dap": "",
   "giai": "✅ Đáp án đúng: Our party is on ↔ April 24.📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: Our party is on\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Giới từ chỉ thời gian:\non + thứ, ngày cụ thể (on Monday, on April 24)\nat + giờ, thời điểm trong ngày (at 9 o’clock, at lunch time, at night)\nin + buổi, tháng, mùa, năm (in the morning, in July, in the summer, in 2020)\nMẹo nhớ: phạm vi thời gian càng RỘNG thì giới từ càng \"to\": at (điểm) → on (ngày) → in (khoảng dài).\nSoi vào câu này: Our party is on ↔ April 24.🔍 Giải thích chi tiết:\nVế trái kết thúc bằng giới từ \"on\", mà on đi với thứ và ngày cụ thể, nên phải ghép với \"April 24.\". Ghép hai vế lại: Our party is on April 24.\nLỗi hay gặp: nối theo cảm tính vì thấy quen mắt. Hãy đọc kỹ TỪ KHOÁ ở vế trái rồi mới tìm vế phải tương ứng.",
   "huongDan": "Match the phrases with the time expressions.",
   "choices": []
  },
  {
   "noi": "The bus leaves at",
   "dap": "",
   "giai": "✅ Đáp án đúng: The bus leaves at ↔ 9 o’clock.📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: The bus leaves at\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Giới từ chỉ thời gian:\non + thứ, ngày cụ thể (on Monday, on April 24)\nat + giờ, thời điểm trong ngày (at 9 o’clock, at lunch time, at night)\nin + buổi, tháng, mùa, năm (in the morning, in July, in the summer, in 2020)\nMẹo nhớ: phạm vi thời gian càng RỘNG thì giới từ càng \"to\": at (điểm) → on (ngày) → in (khoảng dài).\nSoi vào câu này: The bus leaves at ↔ 9 o’clock.🔍 Giải thích chi tiết:\nVế trái kết thúc bằng giới từ \"at\", mà at đi với giờ và thời điểm trong ngày, nên phải ghép với \"9 o’clock.\". Ghép hai vế lại: The bus leaves at 9 o’clock.\nLỗi hay gặp: nối theo cảm tính vì thấy quen mắt. Hãy đọc kỹ TỪ KHOÁ ở vế trái rồi mới tìm vế phải tương ứng.",
   "huongDan": "Match the phrases with the time expressions.",
   "choices": []
  },
  {
   "noi": "Do we have science on",
   "dap": "",
   "giai": "✅ Đáp án đúng: Do we have science on ↔ Tuesday?📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: Do we have science on\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Giới từ chỉ thời gian:\non + thứ, ngày cụ thể (on Monday, on April 24)\nat + giờ, thời điểm trong ngày (at 9 o’clock, at lunch time, at night)\nin + buổi, tháng, mùa, năm (in the morning, in July, in the summer, in 2020)\nMẹo nhớ: phạm vi thời gian càng RỘNG thì giới từ càng \"to\": at (điểm) → on (ngày) → in (khoảng dài).\nSoi vào câu này: Do we have science on ↔ Tuesday?🔍 Giải thích chi tiết:\nVế trái kết thúc bằng giới từ \"on\", mà on đi với thứ và ngày cụ thể, nên phải ghép với \"Tuesday?\". Ghép hai vế lại: Do we have science on Tuesday?\nLỗi hay gặp: nối theo cảm tính vì thấy quen mắt. Hãy đọc kỹ TỪ KHOÁ ở vế trái rồi mới tìm vế phải tương ứng.",
   "huongDan": "Match the phrases with the time expressions.",
   "choices": []
  },
  {
   "noi": "The monkeys’ tree",
   "dap": "",
   "giai": "✅ Đáp án đúng: The monkeys’ tree ↔ F📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: The monkeys’ tree\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Sở hữu cách:\ndanh từ SỐ ÍT + ’s (the boy’s shoes = giày của MỘT bạn nam)\ndanh từ số nhiều có -s + ’ (the boys’ shoes = giày của NHIỀU bạn nam)\ndanh từ số nhiều BẤT QUY TẮC + ’s (the women’s cars = xe của nhiều người phụ nữ)\nVị trí dấu ’ quyết định số lượng người sở hữu - đọc kỹ trước hay sau chữ s.\nSoi vào câu này: The monkeys’ tree ↔ F🔍 Giải thích chi tiết:\nCụm \"The monkeys’ tree\": dấu ’ đứng SAU chữ s nên người sở hữu là NHIỀU. Hãy tìm bức tranh thể hiện đúng số lượng đó.\nLỗi hay gặp: nối theo cảm tính vì thấy quen mắt. Hãy đọc kỹ TỪ KHOÁ ở vế trái rồi mới tìm vế phải tương ứng.",
   "huongDan": "Look at the picture and match each phrase with the correct letter.",
   "choices": []
  },
  {
   "noi": "Does Lucy live in a house?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Does Lucy live in a house? ↔ Yes, she does.📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: Does Lucy live in a house?\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Trả lời ngắn cho câu hỏi thì hiện tại đơn:\nDoes + he / she / it … ? → Yes, he does. / No, he doesn’t.\nDo + I / you / we / they … ? → Yes, they do. / No, they don’t.\nCâu trả lời phải nhắc lại ĐÚNG đại từ của chủ ngữ trong câu hỏi và dùng lại chính trợ động từ đó.\nSoi vào câu này: Does Lucy live in a house? ↔ Yes, she does.🔍 Giải thích chi tiết:\nCâu hỏi bắt đầu bằng \"Does\" nên câu trả lời ngắn phải dùng lại chính trợ động từ đó, và nhắc lại chủ ngữ bằng đại từ \"she\". Vì vậy đáp án là \"Yes, she does.\".\nLỗi hay gặp: nối theo cảm tính vì thấy quen mắt. Hãy đọc kỹ TỪ KHOÁ ở vế trái rồi mới tìm vế phải tương ứng.",
   "huongDan": "Look at the picture, read and match each question with the correct answer.",
   "choices": []
  },
  {
   "noi": "the women’s cars",
   "dap": "",
   "giai": "✅ Đáp án đúng: the women’s cars ↔ E📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: the women’s cars\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Sở hữu cách:\ndanh từ SỐ ÍT + ’s (the boy’s shoes = giày của MỘT bạn nam)\ndanh từ số nhiều có -s + ’ (the boys’ shoes = giày của NHIỀU bạn nam)\ndanh từ số nhiều BẤT QUY TẮC + ’s (the women’s cars = xe của nhiều người phụ nữ)\nVị trí dấu ’ quyết định số lượng người sở hữu - đọc kỹ trước hay sau chữ s.\nSoi vào câu này: the women’s cars ↔ E🔍 Giải thích chi tiết:\nCụm \"the women’s cars\": danh từ số nhiều BẤT QUY TẮC nên vẫn thêm ’s, và người sở hữu là NHIỀU người. Hãy tìm bức tranh thể hiện đúng số lượng đó.\nLỗi hay gặp: nối theo cảm tính vì thấy quen mắt. Hãy đọc kỹ TỪ KHOÁ ở vế trái rồi mới tìm vế phải tương ứng.",
   "huongDan": "Look at the picture and match each phrase with the correct letter.",
   "choices": []
  },
  {
   "noi": "The leopard is fast and strong.",
   "dap": "",
   "giai": "✅ Đáp án đúng: The leopard is fast and strong. ↔ Nối thông tin tương đương📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: The leopard is fast and strong.\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Bốn liên từ cơ bản:\nand → nối hai thông tin cùng chiều, tương đương\nbut → nối hai thông tin TRÁI NGƯỢC nhau\nor → đưa ra sự lựa chọn giữa hai khả năng\nso → diễn tả KẾT QUẢ của điều vừa nói\nSoi vào câu này: The leopard is fast and strong. ↔ Nối thông tin tương đương🔍 Giải thích chi tiết:\nTrong câu có liên từ \"and\". Nối thông tin tương đương chính là chức năng của liên từ này. Đọc lại câu sẽ thấy rõ: The leopard is fast and strong.\nLỗi hay gặp: nối theo cảm tính vì thấy quen mắt. Hãy đọc kỹ TỪ KHOÁ ở vế trái rồi mới tìm vế phải tương ứng.",
   "huongDan": "Underline the conjunction in each sentence. Then match it with its meaning.",
   "choices": []
  },
  {
   "noi": "Are Zoe and Kyle running in the park at the moment?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Are Zoe and Kyle running in the park at the moment? ↔ No, they aren’t.📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: Are Zoe and Kyle running in the park at the moment?\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Phân biệt câu hỏi thì hiện tại đơn và hiện tại tiếp diễn:\nAm / Is / Are + S + V-ing … ? → đang xảy ra lúc này → Yes, he is. / No, they aren’t.\nDo / Does + S + V … ? → thói quen, lặp lại → Yes, he does. / No, they don’t.\nCâu hỏi bắt đầu bằng When / How often / Whose / Who thì trả lời bằng thông tin, không phải Yes / No.\nSoi vào câu này: Are Zoe and Kyle running in the park at the moment? ↔ No, they aren’t.🔍 Giải thích chi tiết:\nCâu hỏi bắt đầu bằng \"Are\" - đây là câu hỏi thì HIỆN TẠI TIẾP DIỄN (hỏi việc đang xảy ra), nên câu trả lời ngắn phải dùng lại đúng trợ động từ đó: \"No, they aren’t.\".\nLỗi hay gặp: nối theo cảm tính vì thấy quen mắt. Hãy đọc kỹ TỪ KHOÁ ở vế trái rồi mới tìm vế phải tương ứng.",
   "huongDan": "Match the question with the correct answer.",
   "choices": []
  },
  {
   "noi": "I was very tired, so I went to sleep very early.",
   "dap": "",
   "giai": "✅ Đáp án đúng: I was very tired, so I went to sleep very early. ↔ Diễn tả kết quả📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: I was very tired, so I went to sleep very early.\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Bốn liên từ cơ bản:\nand → nối hai thông tin cùng chiều, tương đương\nbut → nối hai thông tin TRÁI NGƯỢC nhau\nor → đưa ra sự lựa chọn giữa hai khả năng\nso → diễn tả KẾT QUẢ của điều vừa nói\nSoi vào câu này: I was very tired, so I went to sleep very early. ↔ Diễn tả kết quả🔍 Giải thích chi tiết:\nTrong câu có liên từ \"so\". Diễn tả kết quả chính là chức năng của liên từ này. Đọc lại câu sẽ thấy rõ: I was very tired, so I went to sleep very early.\nLỗi hay gặp: nối theo cảm tính vì thấy quen mắt. Hãy đọc kỹ TỪ KHOÁ ở vế trái rồi mới tìm vế phải tương ứng.",
   "huongDan": "Underline the conjunction in each sentence. Then match it with its meaning.",
   "choices": []
  },
  {
   "noi": "How often do the children visit the city zoo?",
   "dap": "",
   "giai": "✅ Đáp án đúng: How often do the children visit the city zoo? ↔ Every Sunday.📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: How often do the children visit the city zoo?\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Phân biệt câu hỏi thì hiện tại đơn và hiện tại tiếp diễn:\nAm / Is / Are + S + V-ing … ? → đang xảy ra lúc này → Yes, he is. / No, they aren’t.\nDo / Does + S + V … ? → thói quen, lặp lại → Yes, he does. / No, they don’t.\nCâu hỏi bắt đầu bằng When / How often / Whose / Who thì trả lời bằng thông tin, không phải Yes / No.\nSoi vào câu này: How often do the children visit the city zoo? ↔ Every Sunday.🔍 Giải thích chi tiết:\nCâu hỏi bắt đầu bằng \"How often\" nên KHÔNG trả lời Yes / No mà phải trả lời bằng thông tin cụ thể, ở đây là \"Every Sunday.\".\nLỗi hay gặp: nối theo cảm tính vì thấy quen mắt. Hãy đọc kỹ TỪ KHOÁ ở vế trái rồi mới tìm vế phải tương ứng.",
   "huongDan": "Match the question with the correct answer.",
   "choices": []
  },
  {
   "noi": "the boy’s shoes",
   "dap": "",
   "giai": "✅ Đáp án đúng: the boy’s shoes ↔ C📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: the boy’s shoes\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Sở hữu cách:\ndanh từ SỐ ÍT + ’s (the boy’s shoes = giày của MỘT bạn nam)\ndanh từ số nhiều có -s + ’ (the boys’ shoes = giày của NHIỀU bạn nam)\ndanh từ số nhiều BẤT QUY TẮC + ’s (the women’s cars = xe của nhiều người phụ nữ)\nVị trí dấu ’ quyết định số lượng người sở hữu - đọc kỹ trước hay sau chữ s.\nSoi vào câu này: the boy’s shoes ↔ C🔍 Giải thích chi tiết:\nCụm \"the boy’s shoes\": dấu ’ đứng TRƯỚC chữ s nên người sở hữu chỉ có MỘT. Hãy tìm bức tranh thể hiện đúng số lượng đó.\nLỗi hay gặp: nối theo cảm tính vì thấy quen mắt. Hãy đọc kỹ TỪ KHOÁ ở vế trái rồi mới tìm vế phải tương ứng.",
   "huongDan": "Look at the picture and match each phrase with the correct letter.",
   "choices": []
  },
  {
   "noi": "the woman’s cars",
   "dap": "",
   "giai": "✅ Đáp án đúng: the woman’s cars ↔ B📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: the woman’s cars\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Sở hữu cách:\ndanh từ SỐ ÍT + ’s (the boy’s shoes = giày của MỘT bạn nam)\ndanh từ số nhiều có -s + ’ (the boys’ shoes = giày của NHIỀU bạn nam)\ndanh từ số nhiều BẤT QUY TẮC + ’s (the women’s cars = xe của nhiều người phụ nữ)\nVị trí dấu ’ quyết định số lượng người sở hữu - đọc kỹ trước hay sau chữ s.\nSoi vào câu này: the woman’s cars ↔ B🔍 Giải thích chi tiết:\nCụm \"the woman’s cars\": dấu ’ đứng TRƯỚC chữ s nên người sở hữu chỉ có MỘT. Hãy tìm bức tranh thể hiện đúng số lượng đó.\nLỗi hay gặp: nối theo cảm tính vì thấy quen mắt. Hãy đọc kỹ TỪ KHOÁ ở vế trái rồi mới tìm vế phải tương ứng.",
   "huongDan": "Look at the picture and match each phrase with the correct letter.",
   "choices": []
  },
  {
   "noi": "The weather is great in",
   "dap": "",
   "giai": "✅ Đáp án đúng: The weather is great in ↔ the summer.📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: The weather is great in\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Giới từ chỉ thời gian:\non + thứ, ngày cụ thể (on Monday, on April 24)\nat + giờ, thời điểm trong ngày (at 9 o’clock, at lunch time, at night)\nin + buổi, tháng, mùa, năm (in the morning, in July, in the summer, in 2020)\nMẹo nhớ: phạm vi thời gian càng RỘNG thì giới từ càng \"to\": at (điểm) → on (ngày) → in (khoảng dài).\nSoi vào câu này: The weather is great in ↔ the summer.🔍 Giải thích chi tiết:\nVế trái kết thúc bằng giới từ \"in\", mà in đi với buổi, tháng, mùa, năm, nên phải ghép với \"the summer.\". Ghép hai vế lại: The weather is great in the summer.\nLỗi hay gặp: nối theo cảm tính vì thấy quen mắt. Hãy đọc kỹ TỪ KHOÁ ở vế trái rồi mới tìm vế phải tương ứng.",
   "huongDan": "Match the phrases with the time expressions.",
   "choices": []
  },
  {
   "noi": "There aren’t",
   "dap": "",
   "giai": "✅ Đáp án đúng: any chairs in the room. ↔ There aren’t📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: any chairs in the room.\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít / danh từ KHÔNG đếm được\nThere are + danh từ số nhiều\nPhủ định: There isn’t / There aren’t.\nsome dùng trong câu khẳng định, any dùng trong câu phủ định và câu hỏi.\nSoi vào câu này: any chairs in the room. ↔ There aren’t🔍 Giải thích chi tiết:\nVế trái là \"any chairs in the room.\" - danh từ ở đây số nhiều nên phải dùng are, và có từ any nên câu phải ở dạng PHỦ ĐỊNH. Vì vậy nửa còn lại là \"There aren’t\" (dạng phủ định). Ghép lại: There aren’t any chairs in the room.\nLỗi hay gặp: nối theo cảm tính vì thấy quen mắt. Hãy đọc kỹ TỪ KHOÁ ở vế trái rồi mới tìm vế phải tương ứng.",
   "huongDan": "Match the halves.",
   "choices": []
  },
  {
   "noi": "There isn’t",
   "dap": "",
   "giai": "✅ Đáp án đúng: any juice in the fridge. ↔ There isn’t📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: any juice in the fridge.\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít / danh từ KHÔNG đếm được\nThere are + danh từ số nhiều\nPhủ định: There isn’t / There aren’t.\nsome dùng trong câu khẳng định, any dùng trong câu phủ định và câu hỏi.\nSoi vào câu này: any juice in the fridge. ↔ There isn’t🔍 Giải thích chi tiết:\nVế trái là \"any juice in the fridge.\" - danh từ ở đây số ít hoặc không đếm được nên dùng is, và có từ any nên câu phải ở dạng PHỦ ĐỊNH. Vì vậy nửa còn lại là \"There isn’t\" (dạng phủ định). Ghép lại: There isn’t any juice in the fridge.\nLỗi hay gặp: nối theo cảm tính vì thấy quen mắt. Hãy đọc kỹ TỪ KHOÁ ở vế trái rồi mới tìm vế phải tương ứng.",
   "huongDan": "Match the halves.",
   "choices": []
  },
  {
   "noi": "Do Ben and Ken have a pet?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Do Ben and Ken have a pet? ↔ Yes, they do.📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: Do Ben and Ken have a pet?\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Trả lời ngắn cho câu hỏi thì hiện tại đơn:\nDoes + he / she / it … ? → Yes, he does. / No, he doesn’t.\nDo + I / you / we / they … ? → Yes, they do. / No, they don’t.\nCâu trả lời phải nhắc lại ĐÚNG đại từ của chủ ngữ trong câu hỏi và dùng lại chính trợ động từ đó.\nSoi vào câu này: Do Ben and Ken have a pet? ↔ Yes, they do.🔍 Giải thích chi tiết:\nCâu hỏi bắt đầu bằng \"Do\" nên câu trả lời ngắn phải dùng lại chính trợ động từ đó, và nhắc lại chủ ngữ bằng đại từ \"they\". Vì vậy đáp án là \"Yes, they do.\".\nLỗi hay gặp: nối theo cảm tính vì thấy quen mắt. Hãy đọc kỹ TỪ KHOÁ ở vế trái rồi mới tìm vế phải tương ứng.",
   "huongDan": "Look at the picture, read and match each question with the correct answer.",
   "choices": []
  },
  {
   "noi": "My sisters’ room",
   "dap": "",
   "giai": "✅ Đáp án đúng: My sisters’ room ↔ G📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: My sisters’ room\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Sở hữu cách:\ndanh từ SỐ ÍT + ’s (the boy’s shoes = giày của MỘT bạn nam)\ndanh từ số nhiều có -s + ’ (the boys’ shoes = giày của NHIỀU bạn nam)\ndanh từ số nhiều BẤT QUY TẮC + ’s (the women’s cars = xe của nhiều người phụ nữ)\nVị trí dấu ’ quyết định số lượng người sở hữu - đọc kỹ trước hay sau chữ s.\nSoi vào câu này: My sisters’ room ↔ G🔍 Giải thích chi tiết:\nCụm \"My sisters’ room\": dấu ’ đứng SAU chữ s nên người sở hữu là NHIỀU. Hãy tìm bức tranh thể hiện đúng số lượng đó.\nLỗi hay gặp: nối theo cảm tính vì thấy quen mắt. Hãy đọc kỹ TỪ KHOÁ ở vế trái rồi mới tìm vế phải tương ứng.",
   "huongDan": "Look at the picture and match each phrase with the correct letter.",
   "choices": []
  },
  {
   "noi": "Does Willy have a pet?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Does Willy have a pet? ↔ No, he doesn’t.📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: Does Willy have a pet?\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Trả lời ngắn cho câu hỏi thì hiện tại đơn:\nDoes + he / she / it … ? → Yes, he does. / No, he doesn’t.\nDo + I / you / we / they … ? → Yes, they do. / No, they don’t.\nCâu trả lời phải nhắc lại ĐÚNG đại từ của chủ ngữ trong câu hỏi và dùng lại chính trợ động từ đó.\nSoi vào câu này: Does Willy have a pet? ↔ No, he doesn’t.🔍 Giải thích chi tiết:\nCâu hỏi bắt đầu bằng \"Does\" nên câu trả lời ngắn phải dùng lại chính trợ động từ đó, và nhắc lại chủ ngữ bằng đại từ \"he\". Vì vậy đáp án là \"No, he doesn’t.\".\nLỗi hay gặp: nối theo cảm tính vì thấy quen mắt. Hãy đọc kỹ TỪ KHOÁ ở vế trái rồi mới tìm vế phải tương ứng.",
   "huongDan": "Look at the picture, read and match each question with the correct answer.",
   "choices": []
  },
  {
   "noi": "Is John gardening with his mom now?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Is John gardening with his mom now? ↔ Yes, he is.📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: Is John gardening with his mom now?\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Phân biệt câu hỏi thì hiện tại đơn và hiện tại tiếp diễn:\nAm / Is / Are + S + V-ing … ? → đang xảy ra lúc này → Yes, he is. / No, they aren’t.\nDo / Does + S + V … ? → thói quen, lặp lại → Yes, he does. / No, they don’t.\nCâu hỏi bắt đầu bằng When / How often / Whose / Who thì trả lời bằng thông tin, không phải Yes / No.\nSoi vào câu này: Is John gardening with his mom now? ↔ Yes, he is.🔍 Giải thích chi tiết:\nCâu hỏi bắt đầu bằng \"Is\" - đây là câu hỏi thì HIỆN TẠI TIẾP DIỄN (hỏi việc đang xảy ra), nên câu trả lời ngắn phải dùng lại đúng trợ động từ đó: \"Yes, he is.\".\nLỗi hay gặp: nối theo cảm tính vì thấy quen mắt. Hãy đọc kỹ TỪ KHOÁ ở vế trái rồi mới tìm vế phải tương ứng.",
   "huongDan": "Match the question with the correct answer.",
   "choices": []
  },
  {
   "noi": "Where do you go at",
   "dap": "",
   "giai": "✅ Đáp án đúng: Where do you go at ↔ lunch time?📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: Where do you go at\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Giới từ chỉ thời gian:\non + thứ, ngày cụ thể (on Monday, on April 24)\nat + giờ, thời điểm trong ngày (at 9 o’clock, at lunch time, at night)\nin + buổi, tháng, mùa, năm (in the morning, in July, in the summer, in 2020)\nMẹo nhớ: phạm vi thời gian càng RỘNG thì giới từ càng \"to\": at (điểm) → on (ngày) → in (khoảng dài).\nSoi vào câu này: Where do you go at ↔ lunch time?🔍 Giải thích chi tiết:\nVế trái kết thúc bằng giới từ \"at\", mà at đi với giờ và thời điểm trong ngày, nên phải ghép với \"lunch time?\". Ghép hai vế lại: Where do you go at lunch time?\nLỗi hay gặp: nối theo cảm tính vì thấy quen mắt. Hãy đọc kỹ TỪ KHOÁ ở vế trái rồi mới tìm vế phải tương ứng.",
   "huongDan": "Match the phrases with the time expressions.",
   "choices": []
  },
  {
   "noi": "Do you make your bed in",
   "dap": "",
   "giai": "✅ Đáp án đúng: Do you make your bed in ↔ the morning?📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: Do you make your bed in\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Giới từ chỉ thời gian:\non + thứ, ngày cụ thể (on Monday, on April 24)\nat + giờ, thời điểm trong ngày (at 9 o’clock, at lunch time, at night)\nin + buổi, tháng, mùa, năm (in the morning, in July, in the summer, in 2020)\nMẹo nhớ: phạm vi thời gian càng RỘNG thì giới từ càng \"to\": at (điểm) → on (ngày) → in (khoảng dài).\nSoi vào câu này: Do you make your bed in ↔ the morning?🔍 Giải thích chi tiết:\nVế trái kết thúc bằng giới từ \"in\", mà in đi với buổi, tháng, mùa, năm, nên phải ghép với \"the morning?\". Ghép hai vế lại: Do you make your bed in the morning?\nLỗi hay gặp: nối theo cảm tính vì thấy quen mắt. Hãy đọc kỹ TỪ KHOÁ ở vế trái rồi mới tìm vế phải tương ứng.",
   "huongDan": "Match the phrases with the time expressions.",
   "choices": []
  },
  {
   "noi": "Do they play the piano on Saturdays?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Do they play the piano on Saturdays? ↔ No, they don’t.📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: Do they play the piano on Saturdays?\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Phân biệt câu hỏi thì hiện tại đơn và hiện tại tiếp diễn:\nAm / Is / Are + S + V-ing … ? → đang xảy ra lúc này → Yes, he is. / No, they aren’t.\nDo / Does + S + V … ? → thói quen, lặp lại → Yes, he does. / No, they don’t.\nCâu hỏi bắt đầu bằng When / How often / Whose / Who thì trả lời bằng thông tin, không phải Yes / No.\nSoi vào câu này: Do they play the piano on Saturdays? ↔ No, they don’t.🔍 Giải thích chi tiết:\nCâu hỏi bắt đầu bằng \"Do\" - đây là câu hỏi thì HIỆN TẠI ĐƠN (hỏi thói quen), nên câu trả lời ngắn phải dùng lại đúng trợ động từ đó: \"No, they don’t.\".\nLỗi hay gặp: nối theo cảm tính vì thấy quen mắt. Hãy đọc kỹ TỪ KHOÁ ở vế trái rồi mới tìm vế phải tương ứng.",
   "huongDan": "Match the question with the correct answer.",
   "choices": []
  },
  {
   "noi": "The monkey’s tree",
   "dap": "",
   "giai": "✅ Đáp án đúng: The monkey’s tree ↔ A📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: The monkey’s tree\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Sở hữu cách:\ndanh từ SỐ ÍT + ’s (the boy’s shoes = giày của MỘT bạn nam)\ndanh từ số nhiều có -s + ’ (the boys’ shoes = giày của NHIỀU bạn nam)\ndanh từ số nhiều BẤT QUY TẮC + ’s (the women’s cars = xe của nhiều người phụ nữ)\nVị trí dấu ’ quyết định số lượng người sở hữu - đọc kỹ trước hay sau chữ s.\nSoi vào câu này: The monkey’s tree ↔ A🔍 Giải thích chi tiết:\nCụm \"The monkey’s tree\": dấu ’ đứng TRƯỚC chữ s nên người sở hữu chỉ có MỘT. Hãy tìm bức tranh thể hiện đúng số lượng đó.\nLỗi hay gặp: nối theo cảm tính vì thấy quen mắt. Hãy đọc kỹ TỪ KHOÁ ở vế trái rồi mới tìm vế phải tương ứng.",
   "huongDan": "Look at the picture and match each phrase with the correct letter.",
   "choices": []
  },
  {
   "noi": "There is",
   "dap": "",
   "giai": "✅ Đáp án đúng: an elephant in the classroom. ↔ There is📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: an elephant in the classroom.\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít / danh từ KHÔNG đếm được\nThere are + danh từ số nhiều\nPhủ định: There isn’t / There aren’t.\nsome dùng trong câu khẳng định, any dùng trong câu phủ định và câu hỏi.\nSoi vào câu này: an elephant in the classroom. ↔ There is🔍 Giải thích chi tiết:\nVế trái là \"an elephant in the classroom.\" - danh từ ở đây số ít hoặc không đếm được nên dùng is. Vì vậy nửa còn lại là \"There is\". Ghép lại: There is an elephant in the classroom.\nLỗi hay gặp: nối theo cảm tính vì thấy quen mắt. Hãy đọc kỹ TỪ KHOÁ ở vế trái rồi mới tìm vế phải tương ứng.",
   "huongDan": "Match the halves.",
   "choices": []
  },
  {
   "noi": "Do you want a cookie or a cupcake for dessert?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Do you want a cookie or a cupcake for dessert? ↔ Đưa ra sự lựa chọn📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: Do you want a cookie or a cupcake for dessert?\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Bốn liên từ cơ bản:\nand → nối hai thông tin cùng chiều, tương đương\nbut → nối hai thông tin TRÁI NGƯỢC nhau\nor → đưa ra sự lựa chọn giữa hai khả năng\nso → diễn tả KẾT QUẢ của điều vừa nói\nSoi vào câu này: Do you want a cookie or a cupcake for dessert? ↔ Đưa ra sự lựa chọn🔍 Giải thích chi tiết:\nTrong câu có liên từ \"or\". Đưa ra sự lựa chọn chính là chức năng của liên từ này. Đọc lại câu sẽ thấy rõ: Do you want a cookie or a cupcake for dessert?\nLỗi hay gặp: nối theo cảm tính vì thấy quen mắt. Hãy đọc kỹ TỪ KHOÁ ở vế trái rồi mới tìm vế phải tương ứng.",
   "huongDan": "Underline the conjunction in each sentence. Then match it with its meaning.",
   "choices": []
  },
  {
   "noi": "Who is mowing the lawn in the garden?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Who is mowing the lawn in the garden? ↔ My dad.📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: Who is mowing the lawn in the garden?\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Phân biệt câu hỏi thì hiện tại đơn và hiện tại tiếp diễn:\nAm / Is / Are + S + V-ing … ? → đang xảy ra lúc này → Yes, he is. / No, they aren’t.\nDo / Does + S + V … ? → thói quen, lặp lại → Yes, he does. / No, they don’t.\nCâu hỏi bắt đầu bằng When / How often / Whose / Who thì trả lời bằng thông tin, không phải Yes / No.\nSoi vào câu này: Who is mowing the lawn in the garden? ↔ My dad.🔍 Giải thích chi tiết:\nCâu hỏi bắt đầu bằng \"Who\" nên KHÔNG trả lời Yes / No mà phải trả lời bằng thông tin cụ thể, ở đây là \"My dad.\".\nLỗi hay gặp: nối theo cảm tính vì thấy quen mắt. Hãy đọc kỹ TỪ KHOÁ ở vế trái rồi mới tìm vế phải tương ứng.",
   "huongDan": "Match the question with the correct answer.",
   "choices": []
  },
  {
   "noi": "Does Lucy listen to the radio?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Does Lucy listen to the radio? ↔ No, she doesn’t.📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: Does Lucy listen to the radio?\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Trả lời ngắn cho câu hỏi thì hiện tại đơn:\nDoes + he / she / it … ? → Yes, he does. / No, he doesn’t.\nDo + I / you / we / they … ? → Yes, they do. / No, they don’t.\nCâu trả lời phải nhắc lại ĐÚNG đại từ của chủ ngữ trong câu hỏi và dùng lại chính trợ động từ đó.\nSoi vào câu này: Does Lucy listen to the radio? ↔ No, she doesn’t.🔍 Giải thích chi tiết:\nCâu hỏi bắt đầu bằng \"Does\" nên câu trả lời ngắn phải dùng lại chính trợ động từ đó, và nhắc lại chủ ngữ bằng đại từ \"she\". Vì vậy đáp án là \"No, she doesn’t.\".\nLỗi hay gặp: nối theo cảm tính vì thấy quen mắt. Hãy đọc kỹ TỪ KHOÁ ở vế trái rồi mới tìm vế phải tương ứng.",
   "huongDan": "Look at the picture, read and match each question with the correct answer.",
   "choices": []
  },
  {
   "noi": "Does Ted take the bus to work every morning?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Does Ted take the bus to work every morning? ↔ Yes, he does.📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: Does Ted take the bus to work every morning?\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Phân biệt câu hỏi thì hiện tại đơn và hiện tại tiếp diễn:\nAm / Is / Are + S + V-ing … ? → đang xảy ra lúc này → Yes, he is. / No, they aren’t.\nDo / Does + S + V … ? → thói quen, lặp lại → Yes, he does. / No, they don’t.\nCâu hỏi bắt đầu bằng When / How often / Whose / Who thì trả lời bằng thông tin, không phải Yes / No.\nSoi vào câu này: Does Ted take the bus to work every morning? ↔ Yes, he does.🔍 Giải thích chi tiết:\nCâu hỏi bắt đầu bằng \"Does\" - đây là câu hỏi thì HIỆN TẠI ĐƠN (hỏi thói quen), nên câu trả lời ngắn phải dùng lại đúng trợ động từ đó: \"Yes, he does.\".\nLỗi hay gặp: nối theo cảm tính vì thấy quen mắt. Hãy đọc kỹ TỪ KHOÁ ở vế trái rồi mới tìm vế phải tương ứng.",
   "huongDan": "Match the question with the correct answer.",
   "choices": []
  },
  {
   "noi": "the boys’ shoes",
   "dap": "",
   "giai": "✅ Đáp án đúng: the boys’ shoes ↔ H📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: the boys’ shoes\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Sở hữu cách:\ndanh từ SỐ ÍT + ’s (the boy’s shoes = giày của MỘT bạn nam)\ndanh từ số nhiều có -s + ’ (the boys’ shoes = giày của NHIỀU bạn nam)\ndanh từ số nhiều BẤT QUY TẮC + ’s (the women’s cars = xe của nhiều người phụ nữ)\nVị trí dấu ’ quyết định số lượng người sở hữu - đọc kỹ trước hay sau chữ s.\nSoi vào câu này: the boys’ shoes ↔ H🔍 Giải thích chi tiết:\nCụm \"the boys’ shoes\": dấu ’ đứng SAU chữ s nên người sở hữu là NHIỀU. Hãy tìm bức tranh thể hiện đúng số lượng đó.\nLỗi hay gặp: nối theo cảm tính vì thấy quen mắt. Hãy đọc kỹ TỪ KHOÁ ở vế trái rồi mới tìm vế phải tương ứng.",
   "huongDan": "Look at the picture and match each phrase with the correct letter.",
   "choices": []
  },
  {
   "noi": "When do the children visit their grandma?",
   "dap": "",
   "giai": "✅ Đáp án đúng: When do the children visit their grandma? ↔ On Sundays.📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: When do the children visit their grandma?\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Phân biệt câu hỏi thì hiện tại đơn và hiện tại tiếp diễn:\nAm / Is / Are + S + V-ing … ? → đang xảy ra lúc này → Yes, he is. / No, they aren’t.\nDo / Does + S + V … ? → thói quen, lặp lại → Yes, he does. / No, they don’t.\nCâu hỏi bắt đầu bằng When / How often / Whose / Who thì trả lời bằng thông tin, không phải Yes / No.\nSoi vào câu này: When do the children visit their grandma? ↔ On Sundays.🔍 Giải thích chi tiết:\nCâu hỏi bắt đầu bằng \"When\" nên KHÔNG trả lời Yes / No mà phải trả lời bằng thông tin cụ thể, ở đây là \"On Sundays.\".\nLỗi hay gặp: nối theo cảm tính vì thấy quen mắt. Hãy đọc kỹ TỪ KHOÁ ở vế trái rồi mới tìm vế phải tương ứng.",
   "huongDan": "Match the question with the correct answer.",
   "choices": []
  }
 ],
 "true_false": [
  {
   "noi": "In the picture: students.",
   "dap": "",
   "giai": "✅ Đáp án đúng: True📘 Ngữ cảnh: Yêu cầu của phần này: nhìn tranh rồi cho biết mỗi ý là đúng hay sai. Ý cần xét ở câu này là students. Việc cần làm là tìm trong tranh xem có students hay không.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít / danh từ KHÔNG đếm được (There is a book. - There is some milk.)\nThere are + danh từ số nhiều (There are three books.)\nPhủ định: There isn’t / There aren’t Nghi vấn: Is there … ? / Are there … ?\nsome dùng trong câu khẳng định - any dùng trong câu phủ định và câu hỏi.\nSoi vào câu này: students là danh từ số nhiều → There are + some + students🔍 Giải thích chi tiết: Đáp án là True, tức trong tranh CÓ students. Viết thành câu đầy đủ thì là: There are some students in the picture. Ở đây students là danh từ số nhiều nên dùng There are (phủ định There aren’t). Trong câu khẳng định dùng some, câu phủ định dùng any.",
   "huongDan": "Look at the picture. Are these sentences true or false?",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "There’s a helmet next to the bike.",
   "dap": "",
   "giai": "✅ Đáp án đúng: Yes📘 Ngữ cảnh: Yêu cầu của phần này: nhìn tranh rồi viết Yes nếu câu mô tả đúng, No nếu sai. Câu cần xét: There’s a helmet next to the bike. Danh từ chính của câu là helmet - danh từ đếm được số ít.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít / danh từ KHÔNG đếm được (There is a book. - There is some milk.)\nThere are + danh từ số nhiều (There are three books.)\nPhủ định: There isn’t / There aren’t Nghi vấn: Is there … ? / Are there … ?\nsome dùng trong câu khẳng định - any dùng trong câu phủ định và câu hỏi.\nSoi vào câu này: There’s a helmet next to the bike.🔍 Giải thích chi tiết: Đáp án là Yes, tức nội dung câu KHỚP với tranh. Về mặt ngữ pháp, câu dùng ’s là đúng vì helmet là danh từ đếm được số ít. Chú ý: câu viết đúng ngữ pháp vẫn có thể SAI so với tranh - hai việc này tách rời nhau. Khi làm dạng này, hãy đọc kỹ số lượng và từ phủ định trong câu rồi mới đối chiếu với tranh.",
   "huongDan": "Look and write Yes or No.",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "There are three girls in the playground.",
   "dap": "",
   "giai": "✅ Đáp án đúng: No📘 Ngữ cảnh: Yêu cầu của phần này: nhìn tranh rồi viết Yes nếu câu mô tả đúng, No nếu sai. Câu cần xét: There are three girls in the playground. Danh từ chính của câu là girls - danh từ số nhiều.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít / danh từ KHÔNG đếm được (There is a book. - There is some milk.)\nThere are + danh từ số nhiều (There are three books.)\nPhủ định: There isn’t / There aren’t Nghi vấn: Is there … ? / Are there … ?\nsome dùng trong câu khẳng định - any dùng trong câu phủ định và câu hỏi.\nSoi vào câu này: There are three girls in the playground.🔍 Giải thích chi tiết: Đáp án là No, tức nội dung câu KHÔNG khớp với tranh. Về mặt ngữ pháp, câu dùng are là đúng vì girls là danh từ số nhiều. Chú ý: câu viết đúng ngữ pháp vẫn có thể SAI so với tranh - hai việc này tách rời nhau. Khi làm dạng này, hãy đọc kỹ số lượng và từ phủ định trong câu rồi mới đối chiếu với tranh.",
   "huongDan": "Look and write Yes or No.",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "In the picture: books.",
   "dap": "",
   "giai": "✅ Đáp án đúng: True📘 Ngữ cảnh: Yêu cầu của phần này: nhìn tranh rồi cho biết mỗi ý là đúng hay sai. Ý cần xét ở câu này là books. Việc cần làm là tìm trong tranh xem có books hay không.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít / danh từ KHÔNG đếm được (There is a book. - There is some milk.)\nThere are + danh từ số nhiều (There are three books.)\nPhủ định: There isn’t / There aren’t Nghi vấn: Is there … ? / Are there … ?\nsome dùng trong câu khẳng định - any dùng trong câu phủ định và câu hỏi.\nSoi vào câu này: books là danh từ số nhiều → There are + some + books🔍 Giải thích chi tiết: Đáp án là True, tức trong tranh CÓ books. Viết thành câu đầy đủ thì là: There are some books in the picture. Ở đây books là danh từ số nhiều nên dùng There are (phủ định There aren’t). Trong câu khẳng định dùng some, câu phủ định dùng any.",
   "huongDan": "Look at the picture. Are these sentences true or false?",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "‘sugar’ is an uncountable noun.",
   "dap": "",
   "giai": "✅ Đáp án đúng: TRUE📘 Ngữ cảnh: Xét câu: \"‘sugar’ is an uncountable noun.\"🏗️ Cấu trúc:Đếm đượcđi với a / an, có số nhiều thêm -s.Không đếm đượcđi với some, không thêm -s.🔍 Giải thích chi tiết: sugar là dạng bột, không đếm bằng số nên đúng. Vì vậy câu này là TRUE.",
   "huongDan": "Write T (True) or F (False).",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "‘some chairs’ is correct.",
   "dap": "",
   "giai": "✅ Đáp án đúng: TRUE📘 Ngữ cảnh: Xét câu: \"‘some chairs’ is correct.\"🏗️ Cấu trúc:Đếm đượcđi với a / an, có số nhiều thêm -s.Không đếm đượcđi với some, không thêm -s.🔍 Giải thích chi tiết: chair đếm được nên sau some để ở số nhiều là đúng. Vì vậy câu này là TRUE.",
   "huongDan": "Write T (True) or F (False).",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "‘Water’ is an uncountable noun.",
   "dap": "",
   "giai": "✅ Đáp án đúng: TRUE📘 Ngữ cảnh: Xét câu: \"‘Water’ is an uncountable noun.\"🏗️ Cấu trúc:Đếm đượcđi với a / an, có số nhiều thêm -s.Không đếm đượcđi với some, không thêm -s.🔍 Giải thích chi tiết: water là chất lỏng, không đếm được bằng số nên đúng. Vì vậy câu này là TRUE.",
   "huongDan": "Write T (True) or F (False).",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "I can say: ‘A bread’.",
   "dap": "",
   "giai": "✅ Đáp án đúng: FALSE📘 Ngữ cảnh: Xét câu: \"I can say: ‘A bread’.\"🏗️ Cấu trúc:Đếm đượcđi với a / an, có số nhiều thêm -s.Không đếm đượcđi với some, không thêm -s.🔍 Giải thích chi tiết: bread không đếm được nên không đi với a; phải nói some bread. Vì vậy câu này là FALSE.",
   "huongDan": "Write T (True) or F (False).",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "In the picture: clock.",
   "dap": "",
   "giai": "✅ Đáp án đúng: True📘 Ngữ cảnh: Yêu cầu của phần này: nhìn tranh rồi cho biết mỗi ý là đúng hay sai. Ý cần xét ở câu này là clock. Việc cần làm là tìm trong tranh xem có clock hay không.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít / danh từ KHÔNG đếm được (There is a book. - There is some milk.)\nThere are + danh từ số nhiều (There are three books.)\nPhủ định: There isn’t / There aren’t Nghi vấn: Is there … ? / Are there … ?\nsome dùng trong câu khẳng định - any dùng trong câu phủ định và câu hỏi.\nSoi vào câu này: clock là danh từ đếm được số ít → There is + a + clock🔍 Giải thích chi tiết: Đáp án là True, tức trong tranh CÓ clock. Viết thành câu đầy đủ thì là: There is a clock in the picture. Ở đây clock là danh từ đếm được số ít nên dùng There is (phủ định There isn’t). Danh từ đếm được số ít phải có mạo từ a đứng trước.",
   "huongDan": "Look at the picture. Are these sentences true or false?",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "I can say: ‘an oranges’.",
   "dap": "",
   "giai": "✅ Đáp án đúng: FALSE📘 Ngữ cảnh: Xét câu: \"I can say: ‘an oranges’.\"🏗️ Cấu trúc:Đếm đượcđi với a / an, có số nhiều thêm -s.Không đếm đượcđi với some, không thêm -s.🔍 Giải thích chi tiết: an chỉ đi với danh từ số ít, mà oranges đang ở số nhiều; phải nói an orange hoặc some oranges. Vì vậy câu này là FALSE.",
   "huongDan": "Write T (True) or F (False).",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "In the picture: pen.",
   "dap": "",
   "giai": "✅ Đáp án đúng: True📘 Ngữ cảnh: Yêu cầu của phần này: nhìn tranh rồi cho biết mỗi ý là đúng hay sai. Ý cần xét ở câu này là pen. Việc cần làm là tìm trong tranh xem có pen hay không.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít / danh từ KHÔNG đếm được (There is a book. - There is some milk.)\nThere are + danh từ số nhiều (There are three books.)\nPhủ định: There isn’t / There aren’t Nghi vấn: Is there … ? / Are there … ?\nsome dùng trong câu khẳng định - any dùng trong câu phủ định và câu hỏi.\nSoi vào câu này: pen là danh từ đếm được số ít → There is + a + pen🔍 Giải thích chi tiết: Đáp án là True, tức trong tranh CÓ pen. Viết thành câu đầy đủ thì là: There is a pen in the picture. Ở đây pen là danh từ đếm được số ít nên dùng There is (phủ định There isn’t). Danh từ đếm được số ít phải có mạo từ a đứng trước.",
   "huongDan": "Look at the picture. Are these sentences true or false?",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "There aren’t two balls in the playground.",
   "dap": "",
   "giai": "✅ Đáp án đúng: Yes📘 Ngữ cảnh: Yêu cầu của phần này: nhìn tranh rồi viết Yes nếu câu mô tả đúng, No nếu sai. Câu cần xét: There aren’t two balls in the playground. Danh từ chính của câu là balls - danh từ số nhiều.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít / danh từ KHÔNG đếm được (There is a book. - There is some milk.)\nThere are + danh từ số nhiều (There are three books.)\nPhủ định: There isn’t / There aren’t Nghi vấn: Is there … ? / Are there … ?\nsome dùng trong câu khẳng định - any dùng trong câu phủ định và câu hỏi.\nSoi vào câu này: There aren’t two balls in the playground.🔍 Giải thích chi tiết: Đáp án là Yes, tức nội dung câu KHỚP với tranh. Về mặt ngữ pháp, câu dùng aren’t là đúng vì balls là danh từ số nhiều. Chú ý: câu viết đúng ngữ pháp vẫn có thể SAI so với tranh - hai việc này tách rời nhau. Khi làm dạng này, hãy đọc kỹ số lượng và từ phủ định trong câu rồi mới đối chiếu với tranh.",
   "huongDan": "Look and write Yes or No.",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "There’s some sand on the ground.",
   "dap": "",
   "giai": "✅ Đáp án đúng: Yes📘 Ngữ cảnh: Yêu cầu của phần này: nhìn tranh rồi viết Yes nếu câu mô tả đúng, No nếu sai. Câu cần xét: There’s some sand on the ground. Danh từ chính của câu là sand - danh từ KHÔNG đếm được.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít / danh từ KHÔNG đếm được (There is a book. - There is some milk.)\nThere are + danh từ số nhiều (There are three books.)\nPhủ định: There isn’t / There aren’t Nghi vấn: Is there … ? / Are there … ?\nsome dùng trong câu khẳng định - any dùng trong câu phủ định và câu hỏi.\nSoi vào câu này: There’s some sand on the ground.🔍 Giải thích chi tiết: Đáp án là Yes, tức nội dung câu KHỚP với tranh. Về mặt ngữ pháp, câu dùng ’s là đúng vì sand là danh từ KHÔNG đếm được. Chú ý: câu viết đúng ngữ pháp vẫn có thể SAI so với tranh - hai việc này tách rời nhau. Khi làm dạng này, hãy đọc kỹ số lượng và từ phủ định trong câu rồi mới đối chiếu với tranh.",
   "huongDan": "Look and write Yes or No.",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "There is some water in the pool.",
   "dap": "",
   "giai": "✅ Đáp án đúng: Yes📘 Ngữ cảnh: Yêu cầu của phần này: nhìn tranh rồi viết Yes nếu câu mô tả đúng, No nếu sai. Câu cần xét: There is some water in the pool. Danh từ chính của câu là water - danh từ KHÔNG đếm được.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít / danh từ KHÔNG đếm được (There is a book. - There is some milk.)\nThere are + danh từ số nhiều (There are three books.)\nPhủ định: There isn’t / There aren’t Nghi vấn: Is there … ? / Are there … ?\nsome dùng trong câu khẳng định - any dùng trong câu phủ định và câu hỏi.\nSoi vào câu này: There is some water in the pool.🔍 Giải thích chi tiết: Đáp án là Yes, tức nội dung câu KHỚP với tranh. Về mặt ngữ pháp, câu dùng is là đúng vì water là danh từ KHÔNG đếm được. Chú ý: câu viết đúng ngữ pháp vẫn có thể SAI so với tranh - hai việc này tách rời nhau. Khi làm dạng này, hãy đọc kỹ số lượng và từ phủ định trong câu rồi mới đối chiếu với tranh.",
   "huongDan": "Look and write Yes or No.",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "In the picture: board.",
   "dap": "",
   "giai": "✅ Đáp án đúng: False📘 Ngữ cảnh: Yêu cầu của phần này: nhìn tranh rồi cho biết mỗi ý là đúng hay sai. Ý cần xét ở câu này là board. Việc cần làm là tìm trong tranh xem có board hay không.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít / danh từ KHÔNG đếm được (There is a book. - There is some milk.)\nThere are + danh từ số nhiều (There are three books.)\nPhủ định: There isn’t / There aren’t Nghi vấn: Is there … ? / Are there … ?\nsome dùng trong câu khẳng định - any dùng trong câu phủ định và câu hỏi.\nSoi vào câu này: board là danh từ đếm được số ít → There is + a + board🔍 Giải thích chi tiết: Đáp án là False, tức trong tranh KHÔNG có board. Viết thành câu đầy đủ thì là: There isn’t a board in the picture. Ở đây board là danh từ đếm được số ít nên dùng There is (phủ định There isn’t). Danh từ đếm được số ít phải có mạo từ a đứng trước.",
   "huongDan": "Look at the picture. Are these sentences true or false?",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "In the picture: ruler.",
   "dap": "",
   "giai": "✅ Đáp án đúng: False📘 Ngữ cảnh: Yêu cầu của phần này: nhìn tranh rồi cho biết mỗi ý là đúng hay sai. Ý cần xét ở câu này là ruler. Việc cần làm là tìm trong tranh xem có ruler hay không.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít / danh từ KHÔNG đếm được (There is a book. - There is some milk.)\nThere are + danh từ số nhiều (There are three books.)\nPhủ định: There isn’t / There aren’t Nghi vấn: Is there … ? / Are there … ?\nsome dùng trong câu khẳng định - any dùng trong câu phủ định và câu hỏi.\nSoi vào câu này: ruler là danh từ đếm được số ít → There is + a + ruler🔍 Giải thích chi tiết: Đáp án là False, tức trong tranh KHÔNG có ruler. Viết thành câu đầy đủ thì là: There isn’t a ruler in the picture. Ở đây ruler là danh từ đếm được số ít nên dùng There is (phủ định There isn’t). Danh từ đếm được số ít phải có mạo từ a đứng trước.",
   "huongDan": "Look at the picture. Are these sentences true or false?",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "‘Some rice’ is correct.",
   "dap": "",
   "giai": "✅ Đáp án đúng: TRUE📘 Ngữ cảnh: Xét câu: \"‘Some rice’ is correct.\"🏗️ Cấu trúc:Đếm đượcđi với a / an, có số nhiều thêm -s.Không đếm đượcđi với some, không thêm -s.🔍 Giải thích chi tiết: rice không đếm được, đi với some là đúng. Vì vậy câu này là TRUE.",
   "huongDan": "Write T (True) or F (False).",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "There are some trees around the playground.",
   "dap": "",
   "giai": "✅ Đáp án đúng: Yes📘 Ngữ cảnh: Yêu cầu của phần này: nhìn tranh rồi viết Yes nếu câu mô tả đúng, No nếu sai. Câu cần xét: There are some trees around the playground. Danh từ chính của câu là trees - danh từ số nhiều.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít / danh từ KHÔNG đếm được (There is a book. - There is some milk.)\nThere are + danh từ số nhiều (There are three books.)\nPhủ định: There isn’t / There aren’t Nghi vấn: Is there … ? / Are there … ?\nsome dùng trong câu khẳng định - any dùng trong câu phủ định và câu hỏi.\nSoi vào câu này: There are some trees around the playground.🔍 Giải thích chi tiết: Đáp án là Yes, tức nội dung câu KHỚP với tranh. Về mặt ngữ pháp, câu dùng are là đúng vì trees là danh từ số nhiều. Chú ý: câu viết đúng ngữ pháp vẫn có thể SAI so với tranh - hai việc này tách rời nhau. Khi làm dạng này, hãy đọc kỹ số lượng và từ phủ định trong câu rồi mới đối chiếu với tranh.",
   "huongDan": "Look and write Yes or No.",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "There aren’t any boys in the playground.",
   "dap": "",
   "giai": "✅ Đáp án đúng: No📘 Ngữ cảnh: Yêu cầu của phần này: nhìn tranh rồi viết Yes nếu câu mô tả đúng, No nếu sai. Câu cần xét: There aren’t any boys in the playground. Danh từ chính của câu là boys - danh từ số nhiều.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít / danh từ KHÔNG đếm được (There is a book. - There is some milk.)\nThere are + danh từ số nhiều (There are three books.)\nPhủ định: There isn’t / There aren’t Nghi vấn: Is there … ? / Are there … ?\nsome dùng trong câu khẳng định - any dùng trong câu phủ định và câu hỏi.\nSoi vào câu này: There aren’t any boys in the playground.🔍 Giải thích chi tiết: Đáp án là No, tức nội dung câu KHÔNG khớp với tranh. Về mặt ngữ pháp, câu dùng aren’t là đúng vì boys là danh từ số nhiều. Chú ý: câu viết đúng ngữ pháp vẫn có thể SAI so với tranh - hai việc này tách rời nhau. Khi làm dạng này, hãy đọc kỹ số lượng và từ phủ định trong câu rồi mới đối chiếu với tranh.",
   "huongDan": "Look and write Yes or No.",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "We can say: ‘some milks’.",
   "dap": "",
   "giai": "✅ Đáp án đúng: FALSE📘 Ngữ cảnh: Xét câu: \"We can say: ‘some milks’.\"🏗️ Cấu trúc:Đếm đượcđi với a / an, có số nhiều thêm -s.Không đếm đượcđi với some, không thêm -s.🔍 Giải thích chi tiết: milk không đếm được nên không thêm -s; phải nói some milk. Vì vậy câu này là FALSE.",
   "huongDan": "Write T (True) or F (False).",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "In the picture: chalks.",
   "dap": "",
   "giai": "✅ Đáp án đúng: False📘 Ngữ cảnh: Yêu cầu của phần này: nhìn tranh rồi cho biết mỗi ý là đúng hay sai. Ý cần xét ở câu này là chalks. Việc cần làm là tìm trong tranh xem có chalks hay không.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít / danh từ KHÔNG đếm được (There is a book. - There is some milk.)\nThere are + danh từ số nhiều (There are three books.)\nPhủ định: There isn’t / There aren’t Nghi vấn: Is there … ? / Are there … ?\nsome dùng trong câu khẳng định - any dùng trong câu phủ định và câu hỏi.\nSoi vào câu này: chalks là danh từ số nhiều → There are + some + chalks🔍 Giải thích chi tiết: Đáp án là False, tức trong tranh KHÔNG có chalks. Viết thành câu đầy đủ thì là: There aren’t any chalks in the picture. Ở đây chalks là danh từ số nhiều nên dùng There are (phủ định There aren’t). Trong câu khẳng định dùng some, câu phủ định dùng any.",
   "huongDan": "Look at the picture. Are these sentences true or false?",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "There isn’t a boat in the pool.",
   "dap": "",
   "giai": "✅ Đáp án đúng: No📘 Ngữ cảnh: Yêu cầu của phần này: nhìn tranh rồi viết Yes nếu câu mô tả đúng, No nếu sai. Câu cần xét: There isn’t a boat in the pool. Danh từ chính của câu là boat - danh từ đếm được số ít.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít / danh từ KHÔNG đếm được (There is a book. - There is some milk.)\nThere are + danh từ số nhiều (There are three books.)\nPhủ định: There isn’t / There aren’t Nghi vấn: Is there … ? / Are there … ?\nsome dùng trong câu khẳng định - any dùng trong câu phủ định và câu hỏi.\nSoi vào câu này: There isn’t a boat in the pool.🔍 Giải thích chi tiết: Đáp án là No, tức nội dung câu KHÔNG khớp với tranh. Về mặt ngữ pháp, câu dùng isn’t là đúng vì boat là danh từ đếm được số ít. Chú ý: câu viết đúng ngữ pháp vẫn có thể SAI so với tranh - hai việc này tách rời nhau. Khi làm dạng này, hãy đọc kỹ số lượng và từ phủ định trong câu rồi mới đối chiếu với tranh.",
   "huongDan": "Look and write Yes or No.",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "‘apple’ is a countable noun.",
   "dap": "",
   "giai": "✅ Đáp án đúng: TRUE📘 Ngữ cảnh: Xét câu: \"‘apple’ is a countable noun.\"🏗️ Cấu trúc:Đếm đượcđi với a / an, có số nhiều thêm -s.Không đếm đượcđi với some, không thêm -s.🔍 Giải thích chi tiết: apple đếm được: one apple, two apples nên đúng. Vì vậy câu này là TRUE.",
   "huongDan": "Write T (True) or F (False).",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "In the picture: map.",
   "dap": "",
   "giai": "✅ Đáp án đúng: True📘 Ngữ cảnh: Yêu cầu của phần này: nhìn tranh rồi cho biết mỗi ý là đúng hay sai. Ý cần xét ở câu này là map. Việc cần làm là tìm trong tranh xem có map hay không.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít / danh từ KHÔNG đếm được (There is a book. - There is some milk.)\nThere are + danh từ số nhiều (There are three books.)\nPhủ định: There isn’t / There aren’t Nghi vấn: Is there … ? / Are there … ?\nsome dùng trong câu khẳng định - any dùng trong câu phủ định và câu hỏi.\nSoi vào câu này: map là danh từ đếm được số ít → There is + a + map🔍 Giải thích chi tiết: Đáp án là True, tức trong tranh CÓ map. Viết thành câu đầy đủ thì là: There is a map in the picture. Ở đây map là danh từ đếm được số ít nên dùng There is (phủ định There isn’t). Danh từ đếm được số ít phải có mạo từ a đứng trước.",
   "huongDan": "Look at the picture. Are these sentences true or false?",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "In the picture: backpack.",
   "dap": "",
   "giai": "✅ Đáp án đúng: True📘 Ngữ cảnh: Yêu cầu của phần này: nhìn tranh rồi cho biết mỗi ý là đúng hay sai. Ý cần xét ở câu này là backpack. Việc cần làm là tìm trong tranh xem có backpack hay không.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít / danh từ KHÔNG đếm được (There is a book. - There is some milk.)\nThere are + danh từ số nhiều (There are three books.)\nPhủ định: There isn’t / There aren’t Nghi vấn: Is there … ? / Are there … ?\nsome dùng trong câu khẳng định - any dùng trong câu phủ định và câu hỏi.\nSoi vào câu này: backpack là danh từ đếm được số ít → There is + a + backpack🔍 Giải thích chi tiết: Đáp án là True, tức trong tranh CÓ backpack. Viết thành câu đầy đủ thì là: There is a backpack in the picture. Ở đây backpack là danh từ đếm được số ít nên dùng There is (phủ định There isn’t). Danh từ đếm được số ít phải có mạo từ a đứng trước.",
   "huongDan": "Look at the picture. Are these sentences true or false?",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "In the picture: teacher.",
   "dap": "",
   "giai": "✅ Đáp án đúng: True📘 Ngữ cảnh: Yêu cầu của phần này: nhìn tranh rồi cho biết mỗi ý là đúng hay sai. Ý cần xét ở câu này là teacher. Việc cần làm là tìm trong tranh xem có teacher hay không.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít / danh từ KHÔNG đếm được (There is a book. - There is some milk.)\nThere are + danh từ số nhiều (There are three books.)\nPhủ định: There isn’t / There aren’t Nghi vấn: Is there … ? / Are there … ?\nsome dùng trong câu khẳng định - any dùng trong câu phủ định và câu hỏi.\nSoi vào câu này: teacher là danh từ đếm được số ít → There is + a + teacher🔍 Giải thích chi tiết: Đáp án là True, tức trong tranh CÓ teacher. Viết thành câu đầy đủ thì là: There is a teacher in the picture. Ở đây teacher là danh từ đếm được số ít nên dùng There is (phủ định There isn’t). Danh từ đếm được số ít phải có mạo từ a đứng trước.",
   "huongDan": "Look at the picture. Are these sentences true or false?",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "In the picture: eraser.",
   "dap": "",
   "giai": "✅ Đáp án đúng: False📘 Ngữ cảnh: Yêu cầu của phần này: nhìn tranh rồi cho biết mỗi ý là đúng hay sai. Ý cần xét ở câu này là eraser. Việc cần làm là tìm trong tranh xem có eraser hay không.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít / danh từ KHÔNG đếm được (There is a book. - There is some milk.)\nThere are + danh từ số nhiều (There are three books.)\nPhủ định: There isn’t / There aren’t Nghi vấn: Is there … ? / Are there … ?\nsome dùng trong câu khẳng định - any dùng trong câu phủ định và câu hỏi.\nSoi vào câu này: eraser là danh từ đếm được số ít → There is + an + eraser🔍 Giải thích chi tiết: Đáp án là False, tức trong tranh KHÔNG có eraser. Viết thành câu đầy đủ thì là: There isn’t an eraser in the picture. Ở đây eraser là danh từ đếm được số ít nên dùng There is (phủ định There isn’t). Danh từ đếm được số ít phải có mạo từ an đứng trước.",
   "huongDan": "Look at the picture. Are these sentences true or false?",
   "choices": [
    "",
    ""
   ]
  }
 ],
 "short_answer": [
  {
   "noi": "What does she have?",
   "dap": "",
   "giai": "Câu hỏi yêu cầu người học nghe và liệt kê những thứ mà cô gái đang có. Đáp án đúng sẽ là tên của vật dụng hoặc đồ vật.",
   "huongDan": "Scan and listen. Play the video from 1:15. Listen and answer the questions.",
   "choices": []
  },
  {
   "noi": "Listen and write the sentences. (Track 22)",
   "dap": "Listen and write the sentences.",
   "giai": "This part instructs the student to listen to an audio track and write down the full sentences they hear.",
   "huongDan": "Say the time.",
   "choices": []
  },
  {
   "noi": "Tobby is taller than Luke.",
   "dap": "Tobby is taller than Luke.",
   "giai": "This is a worked example showing how to use a comparative adjective ('taller') to write a sentence describing the picture.",
   "huongDan": "Look at the picture and write sentences using the adjectives below.",
   "choices": []
  },
  {
   "noi": "my / not / mistake / this / be .",
   "dap": "This was not my mistake.",
   "giai": "Câu cần tạo thành câu phủ định ở thì quá khứ đơn. Chủ ngữ 'this' (ngôi thứ ba số ít) đi với động từ 'be' ở quá khứ là 'was', sau đó là 'not my mistake'.",
   "huongDan": "Rearrange the words and write these sentences in the Past simple.",
   "choices": []
  },
  {
   "noi": "When did Marta move?",
   "dap": "",
   "giai": "Học sinh cần nghe video để tìm thông tin về thời gian Marta chuyển đi; đáp án phải là một mốc thời gian cụ thể được nhắc đến trong bài nghe.",
   "huongDan": "Part 1: Scan. Listen to the video and answer the questions.",
   "choices": []
  },
  {
   "noi": "The coat is different. Noodles, pancakes, and soup are all food, we eat them but we don’t eat a coat.",
   "dap": "",
   "giai": "This example shows that \"coat\" is the odd one out because noodles, pancakes, and soup are types of food, whereas a coat is clothing and not eaten.",
   "huongDan": "Circle the odd one out and write sentences about why it is the odd one out.",
   "choices": []
  },
  {
   "noi": "we / not / be / at a football game / at five o’clock .",
   "dap": "We were not at a football game at five o’clock.",
   "giai": "The past simple of 'be' for the plural subject 'we' is 'were', and we add 'not' after it to form the negative sentence: We were not at a football game at five o’clock.",
   "huongDan": "Write sentences with the past simple of the verb be.",
   "choices": []
  },
  {
   "noi": "c) Answer the questions. 4. Does he have breakfast at home?",
   "dap": "Yes",
   "giai": "",
   "huongDan": "Part 1: Read the text carefully.Alfred's daily routineAlfred is an American boy. He lives in Los Angeles, California. He lives with his family in a modern house. He is eleven years old and he has got ",
   "choices": []
  },
  {
   "noi": "he / watch TV (no)",
   "dap": "Is he going to watch TV? No, he isn't.",
   "giai": "Câu mẫu này yêu cầu chuyển cụm từ \"he / watch TV\" thành câu hỏi \"Is he going to watch TV?\" và trả lời phủ định \"No, he isn't.\" theo cue (no).",
   "huongDan": "Write questions and answers with going to.",
   "choices": []
  },
  {
   "noi": "5. ………………………………",
   "dap": "Answers will vary; student should say the time shown in the corresponding picture.",
   "giai": "The student is expected to look at the fifth clock image (associated with item 5) and state the correct time.",
   "huongDan": "Say the time.",
   "choices": []
  },
  {
   "noi": "your mum / make great cakes",
   "dap": "Does your mum make great cakes? Yes, she does.",
   "giai": "Câu hỏi Yes/No ở thì hiện tại đơn với chủ ngữ 'your mum' (ngôi thứ 3 số ít) cần trợ động từ 'Does' đứng đầu. Câu trả lời ngắn khẳng định tương ứng là 'Yes, she does.'",
   "huongDan": "Write Yes / No questions in Present simple then answer.",
   "choices": []
  },
  {
   "noi": "put away",
   "dap": "I put away my toys.",
   "giai": "Students should write the phrase \"put away\" three times to practice handwriting and spelling, then compose a complete sentence using the phrase, demonstrating its meaning and correct grammatical use.",
   "huongDan": "Make a sentence with each word below.",
   "choices": []
  },
  {
   "noi": "How did Ali throw the ball the second time?",
   "dap": "",
   "giai": "Học sinh lắng nghe video để biết Ali đã ném bóng thế nào trong lần thứ hai.",
   "huongDan": "Scan and listen.Play the video from 1:28. Listen and answer the questions.",
   "choices": []
  },
  {
   "noi": "father / in / work / a / my / bank",
   "dap": "My father works in a bank.",
   "giai": "Đây là sự thật hiển nhiên về nghề nghiệp nên dùng thì hiện tại đơn; chủ ngữ 'My father' là ngôi thứ ba số ít nên động từ 'work' thêm 's' thành 'works'.",
   "huongDan": "Put the words in the right order. Change some words to make the sentences correct in present simple or present continuous.",
   "choices": []
  },
  {
   "noi": "(wear a uniform at school)",
   "dap": "You must wear a uniform at school. ",
   "giai": "Câu này là ví dụ mẫu đã được điền sẵn đáp án. Học sinh cần dùng \"You must\" vì mặc đồng phục là điều bắt buộc ở trường.",
   "huongDan": "Write sentences with You must … or You mustn’t … .",
   "choices": []
  },
  {
   "noi": "c) Answer the questions. 5. What time does he leave home?",
   "dap": "a quarter to eight",
   "giai": "",
   "huongDan": "Part 1: Read the text carefully.Alfred's daily routineAlfred is an American boy. He lives in Los Angeles, California. He lives with his family in a modern house. He is eleven years old and he has got ",
   "choices": []
  },
  {
   "noi": "I live on South Street.",
   "dap": "Where do you live?",
   "giai": "",
   "huongDan": "Write questions for the answers.",
   "choices": []
  },
  {
   "noi": "Are there any books on the desk? (No)",
   "dap": "No, there aren't",
   "giai": "Câu hỏi 'Are there...?' dùng cho danh từ số nhiều. Đáp án đúng phải là 'No, there are not' hoặc 'No, there aren't'.",
   "huongDan": "Answer the questions with a short answer.",
   "choices": []
  },
  {
   "noi": "Hector asking the sales assistant for some help.\n→",
   "dap": "Hector asked the sales assistant for some help.",
   "giai": "'Asking' là thì hiện tại tiếp diễn, không phải thì quá khứ đơn. Cần sửa thành 'asked'.",
   "huongDan": "The following sentences are about actions in the past. If the sentences are correct, copy the correct sentences; if they are not, rewrite the incorrect sentences.",
   "choices": []
  },
  {
   "noi": "Where are going to sleep at Circus Camp?",
   "dap": "In a tent",
   "giai": "The Circus Camp description states, 'You’re going to sleep in a tent...' which directly answers the question about sleeping arrangements.",
   "huongDan": "Read and answer the questions.Are you going to have fun this summer? Here are three summer camps where children learn something new!**Cooking Camp**Do you like cooking? You’re going to love MasterChef",
   "choices": []
  },
  {
   "noi": "That is the car of my father. → That is _______ car.",
   "dap": "his",
   "giai": "Ngữ cảnh: Cụm 'of my father' xác định chủ sở hữu là nam giới (ngôi thứ ba số ít).\nCấu trúc: Tính từ sở hữu dành cho chủ thể nam giới là 'his'.\nGiải thích chi tiết: Thay vì dùng cấu trúc sở hữu cách dài dòng 'the car of my father', ta sử dụng tính từ sở hữu 'his' đặt trực tiếp trước danh từ 'car' để câu gọn gàng và tự nhiên hơn ở trình độ Movers.",
   "huongDan": "Rewrite the sentences using the correct possessive adjectives (my, your, his, her, its, our, their).",
   "choices": []
  },
  {
   "noi": "[your dad / listen to the radio] [every day]",
   "dap": "How often does your dad listen to the radio? My dad listens to the radio every day.",
   "giai": "The student should form a question using 'How often' with the given prompt and then answer it, using the present simple tense for habits.",
   "huongDan": "Write questions with How often …? then answer.",
   "choices": []
  },
  {
   "noi": "Why do they use nails to attach?",
   "dap": "",
   "giai": "Câu hỏi yêu cầu giải thích lý do chọn đinh thay vì phương pháp khác; đáp án đúng nằm trong nội dung video về tính chắc chắn hoặc phù hợp của đinh.",
   "huongDan": "Part 1: Scan. Listen to the video and answer the questions.",
   "choices": []
  },
  {
   "noi": "Write one sentence using \"live\".",
   "dap": "I live with my parents and my older brother.",
   "giai": "",
   "huongDan": "Write one sentence using each word / phrase.",
   "choices": []
  },
  {
   "noi": "Write one sentence using the word “patient”.",
   "dap": "patient patient patient patient patient. My teacher is very patient with us.",
   "giai": "",
   "huongDan": "Write one sentence using each word / phrase.",
   "choices": []
  },
  {
   "noi": "you and your friends / enjoy cooking",
   "dap": "Do you and your friends enjoy cooking? Yes, we do.",
   "giai": "Chủ ngữ 'you and your friends' tương đương 'we' (số nhiều) nên dùng 'Do' để hỏi. Khi trả lời, đại từ nhân xưng chuyển thành 'we' và dùng 'Yes, we do.'",
   "huongDan": "Write Yes / No questions in Present simple then answer.",
   "choices": []
  },
  {
   "noi": "(ONE) What do we do first?",
   "dap": "We boil the kettle and get the cup ready.",
   "giai": "",
   "huongDan": "Listen to the video and answer the questions",
   "choices": []
  },
  {
   "noi": "How did you get to work last Monday?",
   "dap": "I went by bus",
   "giai": "Đáp án đúng: I went by bus / By bus. Ngữ cảnh: Hỏi về phương tiện di chuyển trong quá khứ. Cấu trúc: How + did + S + V-inf? → Trả lời: By + phương tiện. Giải thích chi tiết: 'Get' là động từ thường, quá khứ dùng 'got' nhưng khi nói về phương tiện thường dùng 'by + noun'. Lưu ý không dùng mạo từ sau 'by' (by bus, không phải by a bus).",
   "huongDan": "Trả lời các câu hỏi sau bằng tiếng Anh dựa trên thì Quá khứ đơn (Past Simple). Viết câu trả lời ngắn gọn.",
   "choices": []
  },
  {
   "noi": "your parents / work / in the garden / yesterday ?",
   "dap": "Were your parents working in the garden yesterday?",
   "giai": "Câu hỏi thì quá khứ tiếp diễn với chủ ngữ số nhiều 'your parents' cần trợ động từ 'Were' đứng đầu và động từ thêm -ing: 'working'.",
   "huongDan": "Make Past continuous questions.",
   "choices": []
  },
  {
   "noi": "Picture 10 — Phrase:",
   "dap": "food that comes from this country",
   "giai": "",
   "huongDan": "Read Part 2. Write the country names and the correct phrases under the pictures.Word bank: a beautiful city, a beach, an old building, desert, a soccer team, a lake and mountains, the capital city, a ",
   "choices": []
  },
  {
   "noi": "Is there a park in your town?",
   "dap": "Yes, there is.",
   "giai": "Ngữ cảnh: Câu hỏi xác nhận sự tồn tại của một công viên (danh từ số ít) trong thị trấn.\nCấu trúc: Is there + a/an + singular noun...? → Trả lời: Yes, there is. / No, there isn't.\nGiải thích chi tiết: Vì chủ ngữ là 'a park' (số ít), ta dùng 'Is there'. Đáp án ngắn phải giữ nguyên trợ động từ 'is' ở dạng khẳng định hoặc phủ định ('isn't').",
   "huongDan": "Answer the questions about your town using short answers with 'there is' or 'there are'.",
   "choices": []
  },
  {
   "noi": "Are you wearing a yellow T-shirt today? (No)",
   "dap": "No, I'm not.",
   "giai": "Ngữ cảnh: Hỏi người nghe có đang mặc áo thun vàng hôm nay không.\nCấu trúc: Câu hỏi 'Are you...?' → trả lời phủ định ở ngôi thứ nhất: No, I'm not.\nGiải thích chi tiết: Khi được hỏi trực tiếp 'you', người trả lời dùng 'I'. Phủ định rút gọn 'I'm not' hoặc đầy đủ 'I am not' đều chính xác.",
   "huongDan": "Answer the questions with short answers (Yes/No).",
   "choices": []
  },
  {
   "noi": "Farmers grow rice in the Mekong Delta.",
   "dap": "Rice is grown in the Mekong Delta.",
   "giai": "Ngữ cảnh: Mô tả hoạt động nông nghiệp đặc trưng của vùng.\nCấu trúc: S + am/is/are + V3/ed + (adverbial phrase).\nGiải thích chi tiết: 'Rice' là danh từ không đếm được → 'is grown'. 'Grow' là động từ bất quy tắc (grow-grew-grown). Chủ ngữ 'Farmers' chỉ người làm nghề nói chung nên lược bỏ.",
   "huongDan": "Rewrite the following sentences in the Present Passive voice. Write only the complete passive sentence.",
   "choices": []
  },
  {
   "noi": "(Part 4) What do they use to hear sound?",
   "dap": "antennae",
   "giai": "Đáp án đúng: They use the hairs on their legs to hear sound.Ngữ cảnh: Câu hỏi về bộ phận giúp loài vật nghe được âm thanh.Cấu trúc: Subject + V + object + to-infinitive (chỉ mục đích). Chủ ngữ số nhiều (They) → động từ giữ nguyên thể (use).Giải thích chi tiết: Nhện nghe âm thanh nhờ lông trên chân của chúng. Cấu trúc \"to hear sound\" diễn tả mục đích.",
   "huongDan": "Play the audio from 1:48. Listen and answer the questions.",
   "choices": []
  },
  {
   "noi": "we / interested in the exhibition ?",
   "dap": "Are we interested in the exhibition? – Yes, we are.",
   "giai": "Cụm 'interested in' đi với động từ to be. Chủ ngữ 'we' dùng 'Are'. Học sinh có thể trả lời Yes hoặc No tùy ngữ cảnh giả định.",
   "huongDan": "Make Do … ? / Does … ? / Is … ? / Are … ? / Am … ? questions then answer Yes or No.",
   "choices": []
  },
  {
   "noi": "Be / Fred / with you / at five o’clock ?",
   "dap": "Was Fred with you at five o'clock?",
   "giai": "The question form of the past simple verb 'be' for a singular subject ('Fred') uses 'was' at the beginning. The sentence structure follows standard question word order.",
   "huongDan": "Write sentences with the past simple of the verb be.",
   "choices": []
  },
  {
   "noi": "What did they bring in for the little kids?",
   "dap": "",
   "giai": "The question asks for an item or items brought specifically for the young children. Listen for nouns or descriptions of objects mentioned in the relevant part of the audio/video.",
   "huongDan": "Scan and listen. Play the video from 1:45. Listen and answer the questions.",
   "choices": []
  },
  {
   "noi": "Write one sentence using \"usually\".",
   "dap": "I usually walk to school in the morning.",
   "giai": "",
   "huongDan": "Write one sentence using each word / phrase.",
   "choices": []
  },
  {
   "noi": "Tim * play * the piano * while * his parents * listen * to it.",
   "dap": "Tim was playing the piano while his parents were listening to it.",
   "giai": "'Tim' là số ít nên dùng 'was playing', còn 'his parents' là số nhiều nên dùng 'were listening' để diễn tả hai hành động song song trong quá khứ.",
   "huongDan": "Write sentences using the given words and the verbs in Past Continuous.",
   "choices": []
  },
  {
   "noi": "Are you going to the supermarket tomorrow evening?",
   "dap": "",
   "giai": "Đây là câu hỏi Yes/No, học sinh cần trả lời bằng một câu hoàn chỉnh (ví dụ: 'Yes, I am' hoặc 'No, I'm not') để xác nhận hoặc phủ định kế hoạch đi siêu thị vào tối mai.",
   "huongDan": "Answer the questions about yourself in full sentences.",
   "choices": []
  },
  {
   "noi": "a cup of tea (what you don't need)",
   "dap": "",
   "giai": "Học sinh viết câu loại trừ các nguyên liệu không dùng khi pha trà, vận dụng cấu trúc 'I don't need... or any...'.",
   "huongDan": "You’re making these things. Write what you need and what you don’t need. Use some, any, a or an.",
   "choices": []
  },
  {
   "noi": "Jim has been working here since 1997.",
   "dap": "since 1997",
   "giai": "'Since 1997' indicates the beginning of a continuous time period, making it an adverb of time.",
   "huongDan": "Underline the adverbs of time in the sentences.",
   "choices": []
  },
  {
   "noi": "Jimmy is watching movies with his cousins. (Present simple)",
   "dap": "Jimmy watches movies with his cousins.",
   "giai": "Chuyển từ Present continuous sang Present simple: bỏ 'is ...ing', thêm 'es' vào động từ 'watch' vì chủ ngữ ngôi thứ ba số ít 'Jimmy'.",
   "huongDan": "Complete the table.",
   "choices": []
  },
  {
   "noi": "(ONE) What do some people drink in the morning?",
   "dap": "Some people drink coffee.",
   "giai": "",
   "huongDan": "Listen to the video and answer the questions",
   "choices": []
  },
  {
   "noi": "The film / not / be / very good .",
   "dap": "The film was not very good.",
   "giai": "The negative past simple form of 'be' for a singular subject ('the film') is 'was not' or the contraction 'wasn't'. The sentence expresses a negative opinion about a past event.",
   "huongDan": "Write sentences with the past simple of the verb be.",
   "choices": []
  },
  {
   "noi": "repair his bike (Nick)",
   "dap": "Nick repaired his bike.",
   "giai": "Học sinh cần chuyển động từ 'repair' sang quá khứ đơn 'repaired' và đặt chủ ngữ 'Nick' ở đầu câu để mô tả hành động đã hoàn thành trong quá khứ.",
   "huongDan": "Write what the Bell family did yesterday.",
   "choices": []
  },
  {
   "noi": "Is the dog sleeping under the table? (Yes)",
   "dap": "Yes, it is.",
   "giai": "Ngữ cảnh: Hỏi về vị trí và hành động hiện tại của con chó.\nCấu trúc: Danh từ chỉ vật/con vật số ít → đại từ 'it' + 'is'.\nGiải thích chi tiết: 'The dog' là danh từ số ít chỉ con vật, được thay thế bằng 'it' trong câu trả lời ngắn khẳng định.",
   "huongDan": "Answer the questions with short answers (Yes/No).",
   "choices": []
  },
  {
   "noi": "Why did Marta not move back there?",
   "dap": "",
   "giai": "Câu trả lời nằm ở lý do cá nhân hoặc hoàn cảnh của Marta được đề cập trong video, khác với lý do của chị gái cô ấy.",
   "huongDan": "Part 1: Scan. Listen to the video and answer the questions.Three.",
   "choices": []
  },
  {
   "noi": "I bought ……………………………………………………………………………………………………..",
   "dap": "",
   "giai": "The student should write a complete sentence stating something they bought yesterday. A good answer will use the past tense of 'buy' and include a specific item or purchase, such as 'I bought a new shirt' or 'I bought some groceries.'",
   "huongDan": "Complete the sentences about you. Yesterday,",
   "choices": []
  },
  {
   "noi": "You / look / tired, / so / I / bring / you / something / eat.",
   "dap": "You look tired, so I will bring you something to eat.",
   "giai": "Dùng 'will bring' để diễn tả quyết định tức thời hoặc lời hứa giúp đỡ khi thấy người khác mệt mỏi; thêm 'to' trước 'eat' để tạo cụm 'something to eat'.",
   "huongDan": "Part 2: Write sentences from the words below, use will / won’t and add more words.",
   "choices": []
  },
  {
   "noi": "How is poetry different from other kinds of writing?",
   "dap": "",
   "giai": "Học sinh cần chỉ ra sự khác biệt về hình thức và nội dung: thơ thường sử dụng vần điệu, nhịp điệu, ngôn từ cô đọng và giàu hình ảnh hơn so với văn xuôi thông thường.",
   "huongDan": "Answer the questions.",
   "choices": []
  },
  {
   "noi": "Does your brother have a blue bag? (No)",
   "dap": "No, he doesn't.",
   "giai": "'Your brother' tương đương đại từ 'he'. Khi trả lời cần thay thế danh từ bằng đại từ nhân xưng phù hợp: 'Yes, he does.' / 'No, he doesn't.'",
   "huongDan": "Given the Yes/No responses, write the corresponding questions.",
   "choices": []
  },
  {
   "noi": "Lily / tall / Bob",
   "dap": "Lily is taller than Bob.",
   "giai": "The student must write a sentence stating that Lily is taller than Bob, using the comparative adjective 'taller'.",
   "huongDan": "Write sentences with comparative adjectives.",
   "choices": []
  },
  {
   "noi": "Derek: travel to France for his business (x)",
   "dap": "Derek is not going to travel to France for his business.",
   "giai": "Chủ ngữ 'Derek' là ngôi thứ ba số ít nên dùng 'is not going to'. Dấu (x) thể hiện câu phủ định.",
   "huongDan": "Part 3: Write sentences with be (not) going to.",
   "choices": []
  },
  {
   "noi": "This book is more interesting than that one.\n→ That book is ____________________ this one.",
   "dap": "That book is less interesting than this one.",
   "giai": "Đáp án đúng: That book is less interesting than this one. / Ngữ cảnh: Đảo ngược chủ ngữ trong câu so sánh hơn cần đổi chiều tính từ. / Cấu trúc: S1 + be + less + adj + than + S2 (hoặc not as...as). / Giải thích chi tiết: Khi đổi chỗ hai vật so sánh, 'more interesting' chuyển thành 'less interesting' hoặc 'not as interesting as' để giữ nguyên nghĩa.",
   "huongDan": "Rewrite the sentences using comparative or superlative adjectives as indicated. Write only the rewritten sentence.",
   "choices": []
  },
  {
   "noi": "he / like / play volleyball ? (no)",
   "dap": "Does he like playing volleyball? No, he doesn't.",
   "giai": "Câu yêu cầu tạo câu hỏi về sở thích chơi bóng chuyền và trả lời phủ định. Đáp án đúng là 'Does he like playing volleyball? No, he doesn't.' vì cấu trúc tương tự với các câu trên và tuân thủ chỉ dẫn (no).",
   "huongDan": "Write questions and answers then number the pictures.",
   "choices": []
  },
  {
   "noi": "It * get * dark * while * I * talk * on the phone.",
   "dap": "It was getting dark while I was talking on the phone.",
   "giai": "'It' và 'I' đều đi với 'was'; động từ 'get' gấp đôi phụ âm 't' khi thêm -ing → 'getting', còn 'talk' chỉ cần thêm -ing bình thường.",
   "huongDan": "Write sentences using the given words and the verbs in Past Continuous.",
   "choices": []
  },
  {
   "noi": "Emily and her mom / last night.\n→",
   "dap": "Emily and her mom were at the supermarket last night.",
   "giai": "Dựa vào 'last night', Emily và mẹ cô ấy có thể đã ăn tối ở nhà hàng. Chủ ngữ số nhiều ('Emily and her mom') cần động từ 'were'.",
   "huongDan": "Where were they yesterday? Look and write.",
   "choices": []
  },
  {
   "noi": "What is the name of these animals?",
   "dap": "starfish",
   "giai": "Đáp án đúng: These animals are starfish.Ngữ cảnh: Tên của nhóm động vật số 1 trong video là sao biển.Cấu trúc: What is the name of these N? → These N + to be + danh từ tên loài.Giải thích chi tiết: \"Starfish\" là danh từ bất quy tắc: số ít và số nhiều đều viết giống nhau (one starfish / many starfish). Có thể trả lời ngắn \"Starfish.\" hoặc đầy đủ \"These animals are starfish.\"",
   "huongDan": "Listen to the video and answer the questions.",
   "choices": []
  },
  {
   "noi": "They pick apples every morning.",
   "dap": "Do they pick apples every morning?",
   "giai": "Chủ ngữ 'They' là số nhiều và động từ nguyên thể 'pick'. Trợ động từ cần dùng là 'Do'.",
   "huongDan": "Make Do … ? / Does … ? / Is … ? / Are … ? / Am … ? questions.",
   "choices": []
  }
 ],
 "essay": [
  {
   "noi": "sailboat",
   "dap": "",
   "giai": "Học sinh luyện viết từ 'sailboat' năm lần và đặt câu để củng cố vốn từ vựng về phương tiện giao thông đường thủy.",
   "huongDan": "Write each word / phrase 5 times and practice spelling it out loud. Then write one sentence using each word phrase.",
   "choices": []
  },
  {
   "noi": "Hayley found her cat in the park.",
   "dap": "",
   "giai": "Câu phủ định của thì quá khứ đơn được tạo bằng 'did not' (didn't) + động từ nguyên thể (found → find). Đáp án đúng: 'Hayley didn't find her cat in the park.'",
   "huongDan": "Rewrite the sentences in the negative form.",
   "choices": []
  },
  {
   "noi": "sunlight",
   "dap": "",
   "giai": "The spelling practice for 'sunlight' builds word recognition, and the created sentence accurately shows its role for plant life.",
   "huongDan": "Write each word / phrase 5 times and practice spelling it out loud. Then write one sentence using each word / phrase.",
   "choices": []
  },
  {
   "noi": "feel excited",
   "dap": "",
   "giai": "The student should write the phrase 'feel excited' five times and then compose a sentence, such as 'Children feel excited before a party.'",
   "huongDan": "Write each word / phrase 5 times and practice spelling it out loud. Then write one sentence using each word / phrase.",
   "choices": []
  },
  {
   "noi": "Write one sentence using the word \"grandparents\".",
   "dap": "My grandparents live with us.",
   "giai": "",
   "huongDan": "Write each word / phrase 5 times and practice spelling it out loud. Then write one sentence using each word / phrase.",
   "choices": []
  },
  {
   "noi": "patch of grass",
   "dap": "",
   "giai": "Practice spelling the phrase 'patch of grass' five times, then write a descriptive sentence that includes this phrase, such as 'The dog likes to lie on a sunny patch of grass.'",
   "huongDan": "Write each word / phrase 5 times and practice spelling it out loud. Then write one sentence using each word / phrase.",
   "choices": []
  },
  {
   "noi": "belongingsWrite each word 5 times and practice spelling it out loud. Then write one sentence using the word.",
   "dap": "",
   "giai": "Học sinh cần viết từ 'belongings' 5 lần và đặt một câu hoàn chỉnh có sử dụng từ này, ví dụ: 'She packed all her belongings into a suitcase.'",
   "huongDan": "Write each word / phrase 5 times and practice spelling it out loud. Then write one sentence using each word / phrase.",
   "choices": []
  },
  {
   "noi": "feelings",
   "dap": "",
   "giai": "The student should write the word 'feelings' five times and then create a sentence, for instance: 'It's important to talk about your feelings.'",
   "huongDan": "Write each word / phrase 5 times and practice spelling it out loud. Then write one sentence using each word / phrase.",
   "choices": []
  },
  {
   "noi": "Our teacher listens to us carefully.",
   "dap": "",
   "giai": "Động từ 'listen' là động từ có quy tắc. Dạng quá khứ đơn được tạo bằng cách thêm '-ed' vào cuối, thành 'listened'.",
   "huongDan": "Part 6: Change the verbs from present to past simple.",
   "choices": []
  },
  {
   "noi": "get married to",
   "dap": "",
   "giai": "Học sinh cần viết cụm từ 'get married to' năm lần và đặt câu với giới từ 'to' đi kèm, ví dụ: 'She got married to her childhood friend last year.'",
   "huongDan": "Part 5: Write each word / phrases 5 times and practice spelling it out loud. Then write one sentence using each word / phrases.",
   "choices": []
  },
  {
   "noi": "walk, last night",
   "dap": "",
   "giai": "Học sinh cần viết một câu hoàn chỉnh ở thì quá khứ đơn sử dụng động từ 'walk' và cụm thời gian 'last night', ví dụ: 'I walked home last night.'",
   "huongDan": "Write Past simple sentences with the following words.",
   "choices": []
  },
  {
   "noi": "Write another sentence using the word \"you\".",
   "dap": "I like you.",
   "giai": "",
   "huongDan": "Write each word / phrase 5 times and practice spelling it out loud. Then write one sentence using each word / phrase.",
   "choices": []
  },
  {
   "noi": "cafeteria",
   "dap": "",
   "giai": "For 'cafeteria', the student practices spelling by writing it five times and then writes a sentence such as 'The students eat lunch in the cafeteria.'",
   "huongDan": "Write each word / phrase 5 times and practice spelling it out loud. Then write one sentence using each word / phrase.",
   "choices": []
  },
  {
   "noi": "Write the word \"small\" 5 times, then write one sentence using it.",
   "dap": "small small small small small\nI have a small dog.",
   "giai": "",
   "huongDan": "Part 5: Write each word / phrase 5 times and practice spelling it out loud. Then write one sentence using each word / phrase.",
   "choices": []
  },
  {
   "noi": "underground ………………………………………………………………………………………………….……………………………………………………….……………………………………………………….……………………………………………………….",
   "dap": "",
   "giai": "Học sinh luyện viết từ ghép 'underground' 5 lần và vận dụng đặt câu để hiểu nghĩa 'dưới lòng đất'.",
   "huongDan": "Part 7: Write each word / phrase 5 times and practice spelling it out loud. Then write one sentence using each word / phrase.",
   "choices": []
  },
  {
   "noi": "Write one sentence using the word \"brother\".",
   "dap": "My brother is ten years old.",
   "giai": "",
   "huongDan": "Write each word / phrase 5 times and practice spelling it out loud. Then write one sentence using each word / phrase.",
   "choices": []
  },
  {
   "noi": "We / enjoy / the party, and we / not want / to go home .",
   "dap": "",
   "giai": "The sentence requires the past simple forms 'enjoyed' for the positive verb and 'didn't want' (the negative form of 'want') to correctly convey the completed action in the past.",
   "huongDan": "Complete the sentences. Write the past simple form of the verbs.",
   "choices": []
  },
  {
   "noi": "It rained last weekend.",
   "dap": "",
   "giai": "Câu này yêu cầu học sinh viết lại câu ở thể phủ định và dạng câu hỏi Yes/No (dạng quá khứ đơn). Phủ định: thêm 'did not' (didn't) trước động từ chính 'rained'. Câu hỏi: đưa 'Did' lên đầu câu, sau đó là chủ ngữ và động từ nguyên thể (rain).",
   "huongDan": "Write negative sentences and Yes / No questions.",
   "choices": []
  },
  {
   "noi": "live………………………………………………….live live live live live ……………………………………………………….……………………………………………………….I live with my parents and my older brother.……………………………………………………….……………………………………………………….",
   "dap": "",
   "giai": "Đây là ví dụ mẫu đã được điền sẵn trong đề bài để hướng dẫn học sinh cách viết từ và đặt câu.",
   "huongDan": "Write each word / phrase 5 times and practice spelling it out loud. Then write one sentence using each word / phrase.",
   "choices": []
  },
  {
   "noi": "my little sister / short / me",
   "dap": "",
   "giai": "So sánh hơn của 'short' là 'shorter'. Câu đúng sẽ là 'My little sister is shorter than me.'",
   "huongDan": "Use the words to make comparative sentences.",
   "choices": []
  },
  {
   "noi": "woodwind instrument",
   "dap": "",
   "giai": "Học sinh luyện viết cụm 'woodwind instrument' để ghi nhớ thuật ngữ chuyên ngành âm nhạc và đặt câu ví dụ về sáo, kèn oboe, v.v.",
   "huongDan": "Part 5: Write each word / phrase 5 times and practice spelling it out loud. Then write one sentence using each word / phrase.",
   "choices": []
  },
  {
   "noi": "interest (verb)",
   "dap": "",
   "giai": "Học sinh cần viết từ 'interest' đúng chính tả năm lần và tự đặt một câu hoàn chỉnh sử dụng từ này như một động từ.",
   "huongDan": "Write each word / phrase 5 times and practice spelling it out loud. Then write one sentence using each word / phrase.",
   "choices": []
  },
  {
   "noi": "Shakespeare was greater than any other English playwrights.",
   "dap": "",
   "giai": "Để viết lại câu này thành dạng so sánh nhất, 'greater than any other' trở thành 'the greatest', và danh từ phải được điều chỉnh cho hợp lý. Một đáp án đúng là 'Shakespeare was the greatest English playwright.'",
   "huongDan": "Rewrite the following sentences using adjectives in the superlative degree.",
   "choices": []
  },
  {
   "noi": "backward",
   "dap": "",
   "giai": "Học sinh cần viết từ 'backward' năm lần và luyện đánh vần thành tiếng, sau đó tự viết một câu hoàn chỉnh sử dụng từ này. Một câu ví dụ có thể là: 'He walked backward to see the view.' Bài tập này giúp củng cố chính tả và cách sử dụng từ trong văn cảnh.",
   "huongDan": "Write each word / phrase 5 times and practice spelling it out loud. Then write one sentence using each word / phrase.",
   "choices": []
  },
  {
   "noi": "pine tree …………………………………………………………………………………………………….……………………………………………………….……………………………………………………….……………………………………………………….",
   "dap": "",
   "giai": "Học sinh luyện viết cụm danh từ 'pine tree' 5 lần và đặt câu mô tả cây cối trong tự nhiên.",
   "huongDan": "Part 7: Write each word / phrase 5 times and practice spelling it out loud. Then write one sentence using each word / phrase.",
   "choices": []
  },
  {
   "noi": "it / not rain / now .",
   "dap": "",
   "giai": "Từ 'now' chỉ ra một tình huống đang diễn ra tại thời điểm nói. Vì đây là một câu phủ định diễn tả hành động không xảy ra, thì Hiện tại tiếp diễn là phù hợp.",
   "huongDan": "Write sentences and questions. Use the present simple or present continuous form of the verb.",
   "choices": []
  },
  {
   "noi": "string instrument",
   "dap": "",
   "giai": "Cụm danh từ 'string instrument' cần được viết đủ cả hai từ; việc đặt câu giúp học sinh liệt kê hoặc mô tả các loại nhạc cụ dây như guitar, violin.",
   "huongDan": "Part 5: Write each word / phrase 5 times and practice spelling it out loud. Then write one sentence using each word / phrase.",
   "choices": []
  },
  {
   "noi": "write a letter to",
   "dap": "",
   "giai": "Học sinh viết cụm từ \"write a letter to\" năm lần và sau đó viết một câu. Câu nên chỉ rõ ai là người nhận thư, như \"I will write a letter to my grandmother.\"",
   "huongDan": "Write each word / phrase 5 times and practice spelling it out loud. Then write one sentence using each word / phrase.",
   "choices": []
  },
  {
   "noi": "gerund …………….………………………………………………………………………………………….……………………………………………………….……………………………………………………….……………………………………………………….",
   "dap": "",
   "giai": "Học sinh cần viết từ 'gerund' đủ 5 lần để luyện chính tả và sau đó tự đặt một câu hoàn chỉnh có sử dụng từ này.",
   "huongDan": "Part 7: Write each word / phrase 5 times and practice spelling it out loud. Then write one sentence using each word / phrase.",
   "choices": []
  },
  {
   "noi": "joy ………….……………………………………………………………………………………………….……………………………………………………….……………………………………………………….……………………………………………………….",
   "dap": "",
   "giai": "Học sinh cần viết từ 'joy' đủ 5 lần cho chính xác và đặt một câu hoàn chỉnh có sử dụng từ này để thể hiện hiểu nghĩa.",
   "huongDan": "Part 4: Write each word / phrase 5 times and practice spelling it out loud. Then write one sentence using each word / phrase.",
   "choices": []
  },
  {
   "noi": "celebrateWrite the word \"celebrate\" 5 times and practice spelling it out loud. Then write one sentence using the word \"celebrate\".",
   "dap": "",
   "giai": "Học sinh viết đúng động từ 'celebrate' năm lần và tạo câu có nghĩa, ví dụ: 'We celebrate Christmas with our family every year.'",
   "huongDan": "Part 7: Write each word / phrase 5 times and practice spelling it out loud. Then write one sentence using each word / phrase.",
   "choices": []
  },
  {
   "noi": "wait for",
   "dap": "",
   "giai": "The student should write the phrase 'wait for' five times, then create an original sentence. A good sentence would use the phrasal verb correctly, followed by a direct object, such as 'Please wait for the bus to arrive before you cross the street.'",
   "huongDan": "Write each word / phrase 5 times and practice spelling it out loud. Then write one sentence using each word / phrase.",
   "choices": []
  },
  {
   "noi": "test score",
   "dap": "",
   "giai": "The student must write the phrase 'test score' five times and then compose one original sentence that correctly uses this term, demonstrating understanding.",
   "huongDan": "Write each word / phrase 5 times and practice spelling it out loud. Then write one sentence using each word / phrase.",
   "choices": []
  },
  {
   "noi": "old enough",
   "dap": "",
   "giai": "Học sinh cần viết cụm từ 'old enough' năm lần và đặt một câu hoàn chỉnh sử dụng cụm từ này, ví dụ: 'She is old enough to go to school.'",
   "huongDan": "Write each word / phrase 5 times and practice spelling it out loud. Then write one sentence using each word / phrase.",
   "choices": []
  },
  {
   "noi": "My Maths lesson starts at 8 am every Saturday.",
   "dap": "",
   "giai": "The subject 'My Maths lesson' is third-person singular, so we use 'Does' to form a yes/no question, and the main verb 'starts' changes to its base form 'start'.",
   "huongDan": "Write Do / Does / Is / Am / Are …? questions from the sentences.",
   "choices": []
  },
  {
   "noi": "capitalize …………………………………………………………………………………………………….……………………………………………………….……………………………………………………….……………………………………………………….",
   "dap": "",
   "giai": "Học sinh cần viết từ 'capitalize' đúng chính tả 5 lần và tự đặt một câu hoàn chỉnh có sử dụng từ này để luyện tập ghi nhớ.",
   "huongDan": "Part 5: Write each word / phrase 5 times and practice spelling it out loud. Then write one sentence using each word / phrase.",
   "choices": []
  },
  {
   "noi": "Mr. Peterson / last / year / be / teacher / school / Maths / your ?",
   "dap": "",
   "giai": "Cần sắp xếp các từ thành câu hỏi ở thì quá khứ đơn. Chủ ngữ là 'Mr. Peterson' (số ít) nên động từ 'be' chia là 'was', và câu hỏi bắt đầu với 'Was'. Thứ tự đúng là 'Was Mr. Peterson your Maths school teacher last year?'",
   "huongDan": "Rearrange the words and write sentences in the Past simple.",
   "choices": []
  },
  {
   "noi": "we / decide / to join / the pottery club",
   "dap": "",
   "giai": "Động từ 'decide' chuyển thành 'decided' ở thì quá khứ đơn, cấu trúc 'decide to do something' được giữ nguyên.",
   "huongDan": "Part 8: Make Past simple sentences. Add words if necessary.",
   "choices": []
  },
  {
   "noi": "I can count 1, 2, 3, ...Example: day",
   "dap": "photo, orange, woman, boy, mouse, sandwich, cherry, toy,baby, wife, nurse, h ouse, key",
   "giai": "",
   "huongDan": "Put the nouns into the correct groups.juicedaylemonadephotomilkorangewomanboyhomeworkbreadmoneymousesandwichsugarcherrywoodjamsouptoybabymusicwifericesandnursehousenoisemeattimeyogurtkeyrainI can coun",
   "choices": []
  },
  {
   "noi": "Write one more sentence using the word \"you\".",
   "dap": "Can you help me?",
   "giai": "",
   "huongDan": "Write each word / phrase 5 times and practice spelling it out loud. Then write one sentence using each word / phrase.",
   "choices": []
  },
  {
   "noi": "Write one more sentence using the word \"sister\".",
   "dap": "My sister sings well.",
   "giai": "",
   "huongDan": "Write each word / phrase 5 times and practice spelling it out loud. Then write one sentence using each word / phrase.",
   "choices": []
  },
  {
   "noi": "Write one sentence using the word \"friend\".",
   "dap": "[{\"values\":[\"My friend is kind.\"]}]",
   "giai": "",
   "huongDan": "Write each word / phrase 5 times and practice spelling it out loud. Then write one sentence using each word / phrase.",
   "choices": [
    "[",
    "]"
   ]
  },
  {
   "noi": "pump water ………………………………………….……………………………………………………….……………………………………………………….……………………………………………………….……………………………………………………….",
   "dap": "",
   "giai": "Học sinh thực hành viết cụm từ 'pump water' và đặt câu mô tả hoạt động bơm nước để củng cố vốn từ vựng.",
   "huongDan": "Write each word / phrase 5 times and practice spelling it out loud. Then write one sentence using each word / phrase.",
   "choices": []
  },
  {
   "noi": "by train",
   "dap": "",
   "giai": "The student should copy 'by train' five times and then create a sentence using it, such as 'I travel to work by train.'",
   "huongDan": "Write each word / phrase 5 times and practice spelling it out loud. Then write one sentence using each word / phrase.",
   "choices": []
  },
  {
   "noi": "Tea is the most popular beverage in the world.",
   "dap": "",
   "giai": "Hai cách viết lại đúng bao gồm: dùng so sánh hơn với 'more popular than any other beverage' và cấu trúc 'No other beverage in the world is as popular as tea'.",
   "huongDan": "Rewrite each sentence in two ways. There’s an example.",
   "choices": []
  },
  {
   "noi": "normal ……………………………………………………………………………………………………….……………………………………………………….……………………………………………………….……………………………………………………….……………………………………………………….",
   "dap": "",
   "giai": "Học sinh cần viết từ 'normal' đúng chính tả 5 lần và đặt một câu hoàn chỉnh có sử dụng từ này để luyện tập ghi nhớ và vận dụng.",
   "huongDan": "Write each word / phrase 5 times and practice spelling it out loud. Then write one sentence using each word / phrase.",
   "choices": []
  },
  {
   "noi": "talk, 5 minutes ago",
   "dap": "",
   "giai": "Đây là câu mẫu, thể hiện cách sử dụng từ 'talk' ở thì quá khứ đơn với cụm thời gian '5 minutes ago'. Động từ 'talk' được chuyển thành 'talked' bằng cách thêm đuôi '-ed'.",
   "huongDan": "Write Past simple sentences with the following words.",
   "choices": []
  },
  {
   "noi": "light bulb",
   "dap": "",
   "giai": "Học sinh cần viết cụm từ 'light bulb' đúng chính tả 5 lần và đặt một câu hoàn chỉnh có sử dụng cụm từ này để luyện tập ghi nhớ và cách dùng.",
   "huongDan": "Write each word / phrase 5 times and practice spelling it out loud. Then write one sentence using each word / phrase.",
   "choices": []
  },
  {
   "noi": "There isn’t any ice cream in the freezer.",
   "dap": "",
   "giai": "Replace 'isn’t' with 'is' and change 'any' to 'some' (or keep 'any' in positive sense) to form a positive existential sentence.",
   "huongDan": "Write positive sentences.",
   "choices": []
  },
  {
   "noi": "Write the word \"important\" (spelling practice line 1).",
   "dap": "important",
   "giai": "",
   "huongDan": "Part 6: Write each word / phrase 5 times and practice spelling it out loud. Then write one sentence using each word / phrase.",
   "choices": []
  },
  {
   "noi": "Amanda / come from America (no)",
   "dap": "",
   "giai": "The subject 'Amanda' is a third-person singular name, and the base verb 'come' requires 'Does' for the question: 'Does Amanda come from America?'. The negative answer is 'No, she doesn't.'",
   "huongDan": "Make Do …? / Does …? / Is …? / Am …? / Are …? questions and then answer.",
   "choices": []
  },
  {
   "noi": "… likes surfing the Internet.",
   "dap": "",
   "giai": "Đây là sở thích hiện tại, dùng thì hiện tại đơn. Có thể đặt câu hỏi Yes/No hoặc câu hỏi WH- để tìm hiểu thêm về thói quen lướt web.",
   "huongDan": "Make questions to ask someone who … .",
   "choices": []
  },
  {
   "noi": "Write another sentence using the word \"sister\".",
   "dap": "I love my sister.",
   "giai": "",
   "huongDan": "Write each word / phrase 5 times and practice spelling it out loud. Then write one sentence using each word / phrase.",
   "choices": []
  },
  {
   "noi": "Write about what you did last weekend. Write two sentences. (Example: On Saturday, I visited my grandparents. On Sunday, I played football.)",
   "dap": "",
   "giai": "Đáp án đúng: Câu trả lời ví dụ liệt kê hai hoạt động khác nhau trong hai ngày cuối tuần, đều sử dụng thì quá khứ đơn chính xác.\nNgữ cảnh: Yêu cầu viết một đoạn ngắn (2 câu) kể về các hoạt động đã diễn ra vào cuối tuần trước.\nCấu trúc: Trạng ngữ chỉ thời gian (On Saturday/Last Sunday) + S + V2 + ...\nGiải thích chi tiết: Bài viết cần có sự kết nối về thời gian (cuối tuần trước). Mỗi câu nên bắt đầu bằng một trạng ngữ chỉ thời gian cụ thể để làm rõ trình tự. Sử dụng đa dạng các động từ quá khứ đơn (cả quy tắc và bất quy tắc).",
   "huongDan": "Write sentences or short paragraphs using the prompts. Use the past simple tense.",
   "choices": []
  },
  {
   "noi": "ride along …………………………………………………………………………………………………….……………………………………………………….……………………………………………………….……………………………………………………….",
   "dap": "",
   "giai": "Học sinh cần viết cụm từ 'ride along' đúng chính tả 5 lần và đặt một câu hoàn chỉnh có sử dụng cụm từ này để luyện tập ghi nhớ và vận dụng.",
   "huongDan": "Write each word / phrase 5 times and practice spelling it out loud. Then write one sentence using each word / phrase.",
   "choices": []
  },
  {
   "noi": "Complete a letter about what you and your friend like and don’t like using but and and.",
   "dap": "",
   "giai": "A good letter should introduce yourself, describe your likes and dislikes clearly using 'and' to add similar ideas and 'but' to contrast different ones, ask about the friend's preferences, and end with a friendly closing. Use the information provided in the two pictures to inspire your writing.",
   "huongDan": "Complete a letter about what you and your friend like and don’t like using ‘but’ and ‘and’.Hi ……………………,How are you? Thank you for your letter. Your country is beautiful! I want to tell you more about ",
   "choices": []
  },
  {
   "noi": "in danger",
   "dap": "",
   "giai": "Học sinh cần viết cụm từ 'in danger' năm lần để luyện viết và đánh vần, sau đó tự viết một câu có nghĩa sử dụng cụm từ này, ví dụ: 'Some animals are in danger of extinction.'",
   "huongDan": "Write each word / phrase 5 times and practice spelling it out loud. Then write one sentence using each word / phrase.",
   "choices": []
  },
  {
   "noi": "shooting star ………………………………………………………………………………………………….……………………………………………………….……………………………………………………….……………………………………………………….",
   "dap": "",
   "giai": "Học sinh viết cụm 'shooting star' 5 lần để nhớ chính tả hai từ ghép và đặt câu liên quan đến hiện tượng thiên văn hoặc điều ước.",
   "huongDan": "Part 4: Write each word / phrase 5 times and practice spelling it out loud. Then write one sentence using each word / phrase.",
   "choices": []
  },
  {
   "noi": "go on the Internet",
   "dap": "",
   "giai": "Students must write the phrase 'go on the Internet' five times, then write a sentence showing its usage, e.g., \"I go on the Internet to watch videos and do research.\"",
   "huongDan": "Part 6: Write each word / phrase 5 times and practice spelling it out loud. Then write one sentence using each word / phrase.",
   "choices": []
  },
  {
   "noi": "fossil fuel …………………………………………………………………………………………………….……………………………………………………….……………………………………………………….……………………………………………………….",
   "dap": "",
   "giai": "Học sinh cần viết cụm từ 'fossil fuel' 5 lần và đặt một câu đúng ngữ cảnh để nắm vững cách dùng thuật ngữ này.",
   "huongDan": "Write each word / phrase 5 times and practice spelling it out loud. Then write one sentence using each word / phrase.",
   "choices": []
  }
 ],
 "word_bank": [
  {
   "noi": "Your sister is carrying two heavy bags. You her.",
   "dap": "",
   "giai": "✅ Đáp án đúng: ought to help📘 Ngữ cảnh: Chị gái đang xách hai túi nặng.🏗️ Cấu trúc:Sau should và ought to luôn là động từ nguyên thể, không thêm ing, không chia thìVí dụ: She should study, không viết should studying.🔍 Giải thích chi tiết: Thấy người khác xách nặng thì nên giúp, sau ought to giữ nguyên thể help.",
   "huongDan": "Complete each sentence with ONE phrase from the box. Use each phrase only once.",
   "choices": []
  },
  {
   "noi": "My little brother is afraid spiders and snakes.",
   "dap": "",
   "giai": "✅ Đáp án đúng: of📘 Ngữ cảnh: Tính từ trước chỗ trống là afraid.🏗️ Cấu trúc:Nhóm đi với of: afraid of, full of, proud of, tired of, fond of, kind of.Ví dụ: She is afraid of dogs.🔍 Giải thích chi tiết: Tính từ afraid luôn đi với of, nên chọn thẻ of.",
   "huongDan": "Complete each sentence with a preposition from the list. Use each one once.",
   "choices": []
  },
  {
   "noi": "My brother _____ action movies every weekend.",
   "dap": "",
   "giai": "1. Ngữ cảnh: Câu diễn tả một thói quen xem phim vào mỗi cuối tuần của 'anh trai tôi'.\n2. Cấu trúc: Thì hiện tại đơn khẳng định với chủ ngữ số ít: Subject (he/she/it) + V-s/es.\n3. Giải thích chi tiết: Chủ ngữ 'My brother' tương đương ngôi thứ ba số ít 'he', nên động từ 'watch' phải thêm '-es' thành 'watches'.",
   "huongDan": "Drag the correct verb form into each sentence to complete the Present Simple structure.",
   "choices": []
  },
  {
   "noi": "Where they sleep last night?",
   "dap": "",
   "giai": "Đây là một câu hỏi Wh- trong quá khứ với động từ thường 'sleep'. Cần trợ động từ 'Did' đảo lên trước chủ ngữ.",
   "huongDan": "Fill in the blanks with did / didn’t / was / wasn’t / were / weren’t.",
   "choices": []
  },
  {
   "noi": "By the time we reach Gstaad tonight, we for twelve hours.",
   "dap": "",
   "giai": "✅ Đáp án đúng: will have been driving📘 Ngữ cảnh: Tối nay lúc tới Gstaad là chúng tôi đã lái xe mười hai tiếng.🏗️ Cấu trúc:Mệnh đề mốc thời gian với by the time hoặc when dùng thì hiện tại đơn, vế chính mới dùng will have been + V-ingVí dụ: By the time we arrive, they will have been waiting for an hour.🔍 Giải thích chi tiết: Vế by the time we reach ở hiện tại đơn nên vế chính là will have been driving.",
   "huongDan": "Choose the correct form from the list to complete each sentence. Use each one once.",
   "choices": []
  },
  {
   "noi": "My father driving to Da Lat next Friday.",
   "dap": "",
   "giai": "✅ Đáp án đúng: is📘 Ngữ cảnh: Chủ ngữ my father là ngôi thứ ba số ít.🏗️ Cấu trúc:Câu thường có trạng từ chỉ thời gian tương lai: tomorrow, tonight, next week, on FridayVí dụ: We are flying to Hue on Friday.🔍 Giải thích chi tiết: Với chủ ngữ số ít ngôi thứ ba thì dùng is rồi tới động từ driving.",
   "huongDan": "Complete each sentence with a word from the list. Use each one once.",
   "choices": []
  },
  {
   "noi": "The you work, the sooner you will finish the homework.",
   "dap": "",
   "giai": "✅ Đáp án đúng: harder📘 Ngữ cảnh: Vế đầu cần dạng so sánh hơn của trạng từ hard.🏗️ Cấu trúc:Với trạng từ cũng dùng được mẫu càng ... càng ...Ví dụ: The harder you work, the faster you finish.🔍 Giải thích chi tiết: Từ ngắn thêm -er, nên chọn thẻ harder.",
   "huongDan": "Complete each sentence with a word or phrase from the list. Use each one once.",
   "choices": []
  },
  {
   "noi": "She lost the umbrella her mother had given her.",
   "dap": "",
   "giai": "✅ Đáp án đúng: which📘 Ngữ cảnh: Câu về chiếc ô mẹ tặng bị mất.🏗️ Cấu trúc:WHICH thay cho VẬT hoặc thay cho CẢ MỆNH ĐỀ đứng trướcSau dấu phẩy chỉ dùng which, không dùng that🔍 Giải thích chi tiết: Thay cho vật the umbrella nên dùng which.",
   "huongDan": "Complete each sentence with the correct relative word from the box. There are two extra words.",
   "choices": []
  },
  {
   "noi": "hard the task is, our team never gives up.",
   "dap": "",
   "giai": "✅ Đáp án đúng: no matter how📘 Ngữ cảnh: Nhiệm vụ khó tới đâu thì cả đội cũng không bỏ cuộc.🏗️ Cấu trúc:no matter how / what / who + mệnh đề (= however / whatever / whoever): dù thế nào đi nữaVí dụ: No matter how hard it is, I will try.🔍 Giải thích chi tiết: Trước tính từ hard phải dùng no matter how rồi mới tới mệnh đề the task is.",
   "huongDan": "Choose the connector from the list to complete each sentence. Use each one once.",
   "choices": []
  },
  {
   "noi": "My wife and I abroad for our holidays in those days.",
   "dap": "",
   "giai": "✅ Đáp án đúng: never used to go📘 Ngữ cảnh: Câu nói về kỳ nghỉ của hai vợ chồng ngày trước.🏗️ Cấu trúc:Quá khứ hoàn thành: S + had (not) + V(quá khứ phân từ)Việc xảy ra trước một mốc khác trong quá khứ🔍 Giải thích chi tiết: Phủ định thói quen cũ nên dùng never used to go.",
   "huongDan": "Choose the correct phrase from the list to complete each sentence. Use each one once.",
   "choices": []
  },
  {
   "noi": "By the time the guests arrived, my mother three different dishes.",
   "dap": "",
   "giai": "✅ Đáp án đúng: had cooked📘 Ngữ cảnh: Lúc khách tới thì mẹ tôi đã nấu xong ba món.🏗️ Cấu trúc:Quá khứ hoàn thành had + V3 nhấn vào việc ĐÃ XONG; quá khứ hoàn thành tiếp diễn nhấn vào QUÁ TRÌNHVí dụ: I had written three emails khác I had been writing emails all morning.🔍 Giải thích chi tiết: Câu nhấn vào việc đã hoàn tất nên điền had cooked chứ không dùng dạng tiếp diễn.",
   "huongDan": "Choose the correct word from the list to complete each sentence. Use each one once.",
   "choices": []
  },
  {
   "noi": "He stood by the gate, , waiting for the rain to stop.",
   "dap": "",
   "giai": "✅ Đáp án đúng: his back against the wall📘 Ngữ cảnh: Anh đứng cạnh cổng, lưng tựa tường, chờ mưa tạnh.🏗️ Cấu trúc:Mệnh đề độc lập có thể chỉ gồm danh từ + tính từ hoặc cụm giới từ, không cần động từVí dụ: A gun in his hands, he walked in.🔍 Giải thích chi tiết: Mệnh đề độc lập chỉ gồm danh từ và cụm giới từ, không cần động từ.Vì vậy, câu đúng là: his back against the wall",
   "huongDan": "Choose the absolute phrase from the list to complete each sentence. Use each one once.",
   "choices": []
  },
  {
   "noi": "I like new haircut. It really suits you.",
   "dap": "",
   "giai": "✅ Đáp án đúng: your📘 Ngữ cảnh: Chỗ trống đứng trước danh từ haircut.🏗️ Cấu trúc:Phân biệt: tính từ sở hữu + danh từ (my book) ⟷ đại từ sở hữu đứng một mình (mine)Công thức: my book = mine, your car = yours, her bag = hers🔍 Giải thích chi tiết: Trước danh từ phải dùng tính từ sở hữu, nên chọn thẻ your, không phải yours.",
   "huongDan": "Complete each sentence with a word from the list. Use each one once. Careful: some blanks need a possessive pronoun (standing alone) and some need a possessive adjective (before a noun).",
   "choices": []
  },
  {
   "noi": "Milk in the fridge, not on the table.",
   "dap": "",
   "giai": "✅ Đáp án đúng: should be kept📘 Ngữ cảnh: Đây là một lời khuyên về cách bảo quản sữa.🏗️ Cấu trúc:Bị động của should là should be kept.Công thức: S + động từ khuyết thiếu + be + V3/V-ed🔍 Giải thích chi tiết: Lời khuyên dùng should, và sữa là vật được cất giữ, nên đáp án là should be kept. V3 của keep là kept.",
   "huongDan": "Complete each sentence with a phrase from the list. Use each phrase once.",
   "choices": []
  },
  {
   "noi": "My exam results are good. They are last year.",
   "dap": "better",
   "giai": "The adjective 'good' has the irregular comparative form 'better', which is required here to show improvement from last year.",
   "huongDan": "Complete the following sentences. Use the COMPARATIVE FORM of one of these adjectives. Use each word once. Add than if necessary.",
   "choices": []
  },
  {
   "noi": "She not go to her English club yesterday.",
   "dap": "",
   "giai": "Câu này là cấu trúc phủ định của thì quá khứ đơn với động từ thường 'go'. Cần dùng trợ động từ 'did' + 'not' (didn't). Câu đã có 'not' nên chỉ cần điền 'did'.",
   "huongDan": "Fill in the blanks with did / didn’t / was / wasn’t / were / weren’t.",
   "choices": []
  },
  {
   "noi": "I 11 my uncle",
   "dap": "rang",
   "giai": "Động từ 'ring' (gọi điện) có dạng quá khứ đơn là 'rang'.",
   "huongDan": "Dear Oséias,I’m writing to tell you about something that happened yesterday. I 1 up at the usual time – about 10 am – 2 a shower and 3 breakfast. I 4 a big bowl of cereal and some toast and watched TV",
   "choices": []
  },
  {
   "noi": "I in your position, I would think twice about that decision.",
   "dap": "",
   "giai": "✅ Đáp án đúng: Were📘 Ngữ cảnh: Nếu ở vào vị trí của bạn thì tôi sẽ cân nhắc lại quyết định đó.🏗️ Cấu trúc:Đảo ngữ câu điều kiện: loại 3 dùng Had + chủ ngữ + V3, loại 2 dùng Were + chủ ngữ, loại 1 dùng Should + chủ ngữ + động từ nguyên thểVí dụ: Had I known, I would have called you.🔍 Giải thích chi tiết: Đảo ngữ điều kiện loại 2 bỏ if và đưa Were lên đầu: Were I in your position.",
   "huongDan": "Choose the word or phrase from the list to complete each sentence. Use each one once.",
   "choices": []
  },
  {
   "noi": "A: Who is that man?\nB: is my neighbour.",
   "dap": "",
   "giai": "✅ Đáp án đúng: He📘 Ngữ cảnh: Hai người đang nói về người đàn ông đứng gần đó.🏗️ Cấu trúc:Người nam dùng he / him, người nữ dùng she / herVí dụ: That is Tom. I saw him yesterday.🔍 Giải thích chi tiết: Ô trống làm chủ ngữ của is và chỉ một người nam nên chọn He.",
   "huongDan": "Choose a pronoun from the list to complete each sentence. Use each one once.",
   "choices": []
  },
  {
   "noi": "We took a photo of in front of the castle.",
   "dap": "",
   "giai": "✅ Đáp án đúng: ourselves📘 Ngữ cảnh: Chủ ngữ we chụp ảnh trước lâu đài.🏗️ Cấu trúc:Chủ ngữ we đi với đại từ phản thân ourselves.Công thức: S + V + đại từ phản thân (chủ ngữ và tân ngữ chỉ cùng một người hoặc vật)🔍 Giải thích chi tiết: Chủ ngữ we nên chọn ourselves. Cụm a photo of ourselves = bức ảnh chụp chính chúng tôi.",
   "huongDan": "Complete each sentence with a word from the list. Use each word once.",
   "choices": []
  },
  {
   "noi": "We’re going to ……………………………… at the cabin resort by the ……………………………… .",
   "dap": "",
   "giai": "The verb 'stay' is appropriate for describing accommodation at a resort, and it is available in the word bank.",
   "huongDan": "Read and complete the dialogue.",
   "choices": []
  },
  {
   "noi": "When he became famous he had people him in the street for autographs.",
   "dap": "",
   "giai": "✅ Đáp án đúng: stopping📘 Ngữ cảnh: Nổi tiếng rồi anh ấy hay bị chặn lại ngoài phố xin chữ ký.🏗️ Cấu trúc:have / get + tân ngữ + V-ing: khiến ai đó đang làm gì, hoặc phải chịu việc gì cứ diễn raVí dụ: The comedian had us all laughing.🔍 Giải thích chi tiết: have + tân ngữ + V-ing tả việc cứ lặp lại: had people stopping.",
   "huongDan": "Choose the correct form from the list to complete each sentence. Use each one once.",
   "choices": []
  },
  {
   "noi": "Do you know Americans?",
   "dap": "",
   "giai": "Đây là câu hỏi trung tính, không rõ ý định của người hỏi là gì, nên dùng \"any\" để hỏi một cách tổng quát.",
   "huongDan": "Fill in the blanks with some / any.",
   "choices": []
  },
  {
   "noi": "Try this jacket before you buy it.",
   "dap": "",
   "giai": "✅ Đáp án đúng: on📘 Ngữ cảnh: Câu nói thử chiếc áo trước khi mua.🏗️ Cấu trúc:try on: mặc thử. turn down: từ chối hoặc vặn nhỏVí dụ: Try this shirt on. She turned the job down.🔍 Giải thích chi tiết: Mặc thử là try this jacket on, nên chọn thẻ on.",
   "huongDan": "Complete each sentence with a particle from the list. Use each one once.",
   "choices": []
  },
  {
   "noi": "a big collection of comic books in his room.",
   "dap": "",
   "giai": "✅ Đáp án đúng: Tom's got📘 Ngữ cảnh: Câu nói về bộ sưu tập truyện tranh của một bạn nam tên Tom.🏗️ Cấu trúc:Chủ ngữ Tom (he) đi với has got (Tom's got).Công thức: I / you / we / they + have got và he / she / it + has got🔍 Giải thích chi tiết: Tên riêng Tom là số ít nên dùng has got, rút gọn thành Tom's got. Từ his room phía sau xác nhận chủ ngữ là Tom.",
   "huongDan": "Complete each sentence with a phrase from the list. Use each phrase once.",
   "choices": []
  },
  {
   "noi": "There are only biscuits left.",
   "dap": "a few",
   "giai": "'Biscuits' là danh từ đếm được số nhiều nên ta dùng 'a few' để chỉ còn lại một vài cái bánh.",
   "huongDan": "Part 3: Fill in the blanks with a few, a little.",
   "choices": []
  },
  {
   "noi": "happened at the end of the film?",
   "dap": "",
   "giai": "✅ Đáp án đúng: What📘 Ngữ cảnh: Ngay sau chỗ trống là động từ happened.🏗️ Cấu trúc:Cách nhận biết: nếu ngay sau Who hoặc What là ĐỘNG TỪ thì đó là câu hỏi chủ ngữNếu sau đó là trợ động từ và chủ ngữ thì là câu hỏi tân ngữ🔍 Giải thích chi tiết: Đây là câu hỏi chủ ngữ nên chỉ cần What rồi tới động từ ở quá khứ.",
   "huongDan": "Complete each question with a word or phrase from the list. Use each one once.",
   "choices": []
  },
  {
   "noi": "She asked me I had left my passport.",
   "dap": "",
   "giai": "✅ Đáp án đúng: where📘 Ngữ cảnh: Câu hỏi gián tiếp về nơi chốn để quên hộ chiếu.🏗️ Cấu trúc:wh-word + S + V: mệnh đề danh ngữ mở đầu bằng từ để hỏi (không đảo ngữ)🔍 Giải thích chi tiết: Từ where mở đầu mệnh đề chỉ nơi chốn. Vì là câu hỏi gián tiếp nên viết where I had left chứ không đảo ngữ.",
   "huongDan": "Complete each sentence with a word from the list. Use each word once.",
   "choices": []
  },
  {
   "noi": ", the offer is not as generous as it first appears.",
   "dap": "",
   "giai": "✅ Đáp án đúng: All things considered📘 Ngữ cảnh: Người nói đưa ra nhận định sau khi cân nhắc mọi mặt.🏗️ Cấu trúc:Cụm tuyệt đối cố định: weather permitting, all things considered, that being said🔍 Giải thích chi tiết: Cụm All things considered là dạng tuyệt đối cố định nghĩa là xét mọi mặt. Nó thường mở đầu cho một kết luận thận trọng.",
   "huongDan": "Complete each sentence with an absolute phrase from the list. Use each phrase once.",
   "choices": []
  },
  {
   "noi": "When I 14 this",
   "dap": "heard",
   "giai": "'Hear' (nghe được thông tin này) ở quá khứ đơn là 'heard'.",
   "huongDan": "Dear Oséias,I’m writing to tell you about something that happened yesterday. I 1 up at the usual time – about 10 am – 2 a shower and 3 breakfast. I 4 a big bowl of cereal and some toast and watched TV",
   "choices": []
  },
  {
   "noi": "There is a post office near here, ?",
   "dap": "",
   "giai": "✅ Đáp án đúng: isn’t there📘 Ngữ cảnh: Câu hỏi lại xem gần đây có bưu điện không.🏗️ Cấu trúc:Chủ ngữ there thì đuôi vẫn giữ nguyên thereThere is a bank here, isn’t there?🔍 Giải thích chi tiết: Chủ ngữ hình thức there được giữ nguyên ở phần đuôi nên là isn’t there.",
   "huongDan": "Complete each sentence with the correct question tag from the box. There are two extra tags.",
   "choices": []
  },
  {
   "noi": "Lan coming to the party. She is ill.",
   "dap": "",
   "giai": "✅ Đáp án đúng: isn't📘 Ngữ cảnh: Câu nói Lan bị ốm nên không tới dự tiệc.🏗️ Cấu trúc:Phủ định: am not, isn't hoặc aren't + động từ thêm đuôi ingVí dụ: She isn't coming to the party.🔍 Giải thích chi tiết: Phủ định với chủ ngữ số ít ngôi thứ ba là isn't rồi tới động từ coming.",
   "huongDan": "Complete each sentence with a word from the list. Use each one once.",
   "choices": []
  },
  {
   "noi": "You must be when you cross this busy road.",
   "dap": "",
   "giai": "✅ Đáp án đúng: more careful📘 Ngữ cảnh: Câu nhắc nhở khi băng qua con đường đông xe.🏗️ Cấu trúc:Tính từ dài từ hai âm tiết trở lên: dùng more đứng trước rồi tới thanVí dụ: more expensive than.🔍 Giải thích chi tiết: careful là tính từ hai âm tiết nên dùng more careful chứ không thêm đuôi er.",
   "huongDan": "Complete each sentence with ONE comparative adjective from the box. Use each one only once.",
   "choices": []
  },
  {
   "noi": "Nga always checks her work twice. She is student in the class.",
   "dap": "",
   "giai": "✅ Đáp án đúng: the most careful📘 Ngữ cảnh: Câu nói Nga cẩn thận nhất lớp vì luôn kiểm tra hai lần.🏗️ Cấu trúc:Tính từ DÀI (từ 2 âm tiết trở lên): the most + tính từVí dụ: the most expensive, the most beautiful🔍 Giải thích chi tiết: Tính từ careful có hai âm tiết và không tận cùng bằng y nên dùng the most ở trước.",
   "huongDan": "Complete each sentence with a superlative from the list. Use each one once.",
   "choices": []
  },
  {
   "noi": "Some friends yesterday evening and we had dinner together.",
   "dap": "",
   "giai": "✅ Đáp án đúng: came round📘 Ngữ cảnh: Vế sau kể cả nhóm cùng ăn tối.🏗️ Cấu trúc:set off là khởi hành, go on là tiếp tục, come round là ghé chơiVí dụ: We set off at nine.🔍 Giải thích chi tiết: Bạn bè ghé nhà chơi nên dùng come round, quá khứ là came round.",
   "huongDan": "Complete each sentence with ONE phrasal verb from the box. Use each one only once.",
   "choices": []
  },
  {
   "noi": "You get a better job if you speak English.",
   "dap": "can",
   "giai": "Đây là câu điều kiện loại 1 diễn tả khả năng ở hiện tại/tương lai ('speak' ở hiện tại đơn), nên dùng 'can'.",
   "huongDan": "Fill in the blanks with can or could.",
   "choices": []
  },
  {
   "noi": "the CD?\n under the book.",
   "dap": "Where's",
   "giai": "",
   "huongDan": "Write Where’s / Where are / It’s / They’re / She’s / He’s.",
   "choices": []
  },
  {
   "noi": "My grandparents had their house more than fifty years ago.",
   "dap": "",
   "giai": "✅ Đáp án đúng: built📘 Ngữ cảnh: Câu nói về việc xây nhà từ hơn năm mươi năm trước.🏗️ Cấu trúc:Công thức: have / get + VẬT + phân từ hai (V3) - nghĩa là nhờ / thuê người khác làm: I had my car washed.🔍 Giải thích chi tiết: Cấu trúc have + vật + V3 nên dùng thẻ built, phân từ hai của build.",
   "huongDan": "Complete each sentence with a word from the list. Use each word once.",
   "choices": []
  },
  {
   "noi": "His first book was boring but this one is .",
   "dap": "better",
   "giai": "The adjective 'good' has the irregular comparative form 'better', contrasting the quality of the second book with the first.",
   "huongDan": "Complete the following sentences. Use the COMPARATIVE FORM of one of these adjectives. Use each word once. Add than if necessary.",
   "choices": []
  },
  {
   "noi": "MATI: I’m going to go ……………………………… in the mountains with my family.",
   "dap": "",
   "giai": "The activity 'walking' fits the context of mountain recreation and is listed among the options.",
   "huongDan": "Read and complete the dialogue.",
   "choices": []
  },
  {
   "noi": "Nobody was at the bus stop, ?",
   "dap": "",
   "giai": "✅ Đáp án đúng: were they📘 Ngữ cảnh: Câu hỏi lại xem ở bến xe có ai không.🏗️ Cấu trúc:Chủ ngữ everyone, nobody, somebody thì đuôi dùng theyNobody came, did they?🔍 Giải thích chi tiết: Nobody mang nghĩa phủ định và chỉ người nên đuôi khẳng định với chủ ngữ they.",
   "huongDan": "Complete each sentence with the correct question tag from the box. There are two extra tags.",
   "choices": []
  },
  {
   "noi": "If I had gone rafting with my friends, I down the Colorado River right now.",
   "dap": "",
   "giai": "✅ Đáp án đúng: would be floating📘 Ngữ cảnh: Nếu đi vượt thác cùng bạn bè thì giờ này tôi đang trôi trên sông Colorado.🏗️ Cấu trúc:Dấu hiệu của loại 3 sang 2 là trạng từ chỉ hiện tại: now, today, this yearVí dụ: He would not be in prison now if he had told the truth.🔍 Giải thích chi tiết: Có right now nên vế chính là would be floating chứ không phải would have floated.",
   "huongDan": "Choose the correct form from the list to complete each sentence. Use each one once.",
   "choices": []
  },
  {
   "noi": "A is on a .",
   "dap": "crow",
   "giai": "Dựa vào tranh và từ trong word bank, đây là hình ảnh một con quạ đậu trên một cái cọc. Vì vậy, đáp án là 'crow' và 'pole'.",
   "huongDan": "Look at the pictures and complete the sentences.",
   "choices": []
  },
  {
   "noi": "light rain that continues for a long time (n)",
   "dap": "",
   "giai": "✅ Đáp án đúng: drizzle — mưa phùn📘 Định nghĩa: \"light rain that continues for a long time (n)\" = mưa nhẹ kéo dài.🔍 Phân tích: drizzle = mưa phùn lất phất dai dẳng → đúng (khác mưa rào ngắn).❌ Các từ khác: shower = mưa rào ngắn (ngược thời lượng); hail = mưa đá.",
   "huongDan": "WeatherWrite the correct word from the box next to the definition.",
   "choices": []
  },
  {
   "noi": "Let us take some photos. I my camera.",
   "dap": "",
   "giai": "✅ Đáp án đúng: have brought📘 Ngữ cảnh: Câu trước rủ chụp vài tấm ảnh.🏗️ Cấu trúc:He, she, it và danh từ số ít đi với has, các chủ ngữ còn lại đi với haveVí dụ: She has left.🔍 Giải thích chi tiết: Chụp được vì đã mang máy ảnh theo, chủ ngữ I đi với have brought.",
   "huongDan": "Complete each sentence with ONE phrase from the box. Use each phrase only once.",
   "choices": []
  },
  {
   "noi": "If you do not understand the lesson, you your teacher.",
   "dap": "",
   "giai": "✅ Đáp án đúng: should ask📘 Ngữ cảnh: Mệnh đề đầu nói về việc chưa hiểu bài.🏗️ Cấu trúc:Vế nêu lý do như It is bad for you hay He needs to know cho biết đây là một lời khuyênVí dụ: It is late, you should go home.🔍 Giải thích chi tiết: Chưa hiểu bài là lý do rõ ràng để khuyên hỏi thầy cô, nên chọn should ask.",
   "huongDan": "Complete each sentence with ONE phrase from the box. Use each phrase only once.",
   "choices": []
  },
  {
   "noi": "A dictionary is very when you read a difficult book.",
   "dap": "",
   "giai": "✅ Đáp án đúng: useful📘 Ngữ cảnh: Chỗ trống tả ích lợi của quyển từ điển.🏗️ Cấu trúc:Danh từ use thêm đuôi -ful thành tính từ useful.Vị trí của tính từ: đứng trước danh từ (a sunny day) hoặc sau động từ be / look / feel (It is sunny.)🔍 Giải thích chi tiết: Danh từ use thêm đuôi -ful thành useful. Từ điển giúp ích khi đọc sách khó nên là hữu ích.",
   "huongDan": "Complete each sentence with an adjective from the list. Use each adjective once.",
   "choices": []
  },
  {
   "noi": "We cycled the river for nearly an hour.",
   "dap": "",
   "giai": "✅ Đáp án đúng: along📘 Ngữ cảnh: Câu kể mọi người đạp xe gần một tiếng.🏗️ Cấu trúc:along: đi dọc theo một con đường, bờ sông hoặc hành langVí dụ: We walked along the river.🔍 Giải thích chi tiết: Chuyển động men theo chiều dài của bờ sông chứ không cắt ngang qua nó nên phải dùng along.",
   "huongDan": "Complete each sentence with ONE preposition from the box. Use each preposition only once.",
   "choices": []
  },
  {
   "noi": "Much I would like to stay, I really must go home.",
   "dap": "",
   "giai": "✅ Đáp án đúng: as📘 Ngữ cảnh: Câu nói người nói rất muốn ở lại nhưng buộc phải về.🏗️ Cấu trúc:Much as + MỆNH ĐỀ, nghĩa là dù rấtMuch as I love you, I cannot agree.🔍 Giải thích chi tiết: Cấu trúc cố định là Much as + mệnh đề nên chỗ trống điền as.",
   "huongDan": "Complete each sentence with the correct expression of contrast from the box. There are two extra expressions.",
   "choices": []
  },
  {
   "noi": "A good film gives us knowledge about the real world.",
   "dap": "",
   "giai": "The word 'educational' correctly completes the phrase meaning a film that provides knowledge, making it an appropriate choice from the given word bank.",
   "huongDan": "Listen and write. There is one example. (2018 Cambridge Flyers 1 – Test 3.2)",
   "choices": []
  },
  {
   "noi": "Where are you going to on your vacation?",
   "dap": "",
   "giai": "The sentence is 'Where are you going to ___ on your ___ vacation?' The correct word for blank 1 is 'go' (as in 'going to go'), and for blank 2 it's 'next' (referring to the upcoming vacation).",
   "huongDan": "Read and complete the dialogue.",
   "choices": []
  },
  {
   "noi": "This stone bridge more than a hundred years ago.",
   "dap": "",
   "giai": "✅ Đáp án đúng: was built📘 Ngữ cảnh: Câu nói cây cầu đá được xây từ hơn một trăm năm trước.🏗️ Cấu trúc:Bị động quá khứ đơn: S + was hoặc were + V cột 3The bridge was built in 1998.🔍 Giải thích chi tiết: Mốc a hundred years ago là quá khứ và chủ ngữ số ít nên dùng was built.",
   "huongDan": "Complete each sentence with the correct passive form from the box. There are two extra forms.",
   "choices": []
  },
  {
   "noi": "We cycled the river all the way to the old bridge.",
   "dap": "",
   "giai": "✅ Đáp án đúng: along📘 Ngữ cảnh: Câu nói đi dọc theo bờ sông.🏗️ Cấu trúc:Giới từ along = đi dọc theo một con đường hay bờ sông.Ví dụ: They walked along the river.🔍 Giải thích chi tiết: Đi dọc theo một con đường hay bờ sông thì dùng along, nên chọn thẻ along.",
   "huongDan": "Complete each sentence with a preposition from the list. Use each one once.",
   "choices": []
  },
  {
   "noi": "It is very to get lost in this part of the old town.",
   "dap": "",
   "giai": "✅ Đáp án đúng: easy📘 Ngữ cảnh: Câu nhận xét về việc bị lạc đường ở khu phố cổ.🏗️ Cấu trúc:It is + tính từ + to V dùng để đánh giá một việc: It is easy to make this cake.🔍 Giải thích chi tiết: Cấu trúc It is + tính từ + to V dùng để nhận xét, và easy hợp nghĩa ở đây.",
   "huongDan": "Complete each sentence with an adjective from the list. Use each adjective once.",
   "choices": []
  },
  {
   "noi": ", wash your hands before you touch the food.",
   "dap": "",
   "giai": "✅ Đáp án đúng: First📘 Ngữ cảnh: Câu này là việc đầu tiên trong chuỗi.🏗️ Cấu trúc:Mở đầu một chuỗi việc: First, First of all, To begin with.Ví dụ: First, wash the vegetables.🔍 Giải thích chi tiết: Việc mở đầu một chuỗi thì chọn thẻ First.",
   "huongDan": "Complete each sentence with a word or phrase from the list. Use each one once.",
   "choices": []
  },
  {
   "noi": "We stayed at home it was raining very hard.",
   "dap": "",
   "giai": "✅ Đáp án đúng: because📘 Ngữ cảnh: Vế sau nêu lý do, không phải mục đích.🏗️ Cấu trúc:Từ because nêu NGUYÊN NHÂN (vì sao đã xảy ra), khác với mục đích (làm để được gì)🔍 Giải thích chi tiết: Trời mưa to là nguyên nhân ở nhà, nên chọn thẻ because.",
   "huongDan": "Complete each sentence with a word or phrase from the list. Use each one once.",
   "choices": []
  },
  {
   "noi": "How is your little sister? She is seven.",
   "dap": "",
   "giai": "✅ Đáp án đúng: old📘 Ngữ cảnh: Câu trả lời cho biết một con số tuổi.🏗️ Cấu trúc:How old + be + chủ ngữ: hỏi tuổiVí dụ: How old is your brother?🔍 Giải thích chi tiết: Hỏi tuổi thì dùng How old, nên chọn thẻ old.",
   "huongDan": "Complete each question with a word from the list. Use each one once.",
   "choices": []
  },
  {
   "noi": "the hot pan. It can burn your hand.",
   "dap": "",
   "giai": "✅ Đáp án đúng: Do not touch📘 Ngữ cảnh: Câu cấm chạm vào một vật nóng.🏗️ Cấu trúc:Câu mệnh lệnh phủ định: Do not hoặc Don't + động từ nguyên thểVí dụ: Do not touch the glass.🔍 Giải thích chi tiết: Cấm sờ vào là Do not touch, dùng Do not trước động từ nguyên thể.",
   "huongDan": "Complete each sentence with a phrase from the list. Use each one once.",
   "choices": []
  },
  {
   "noi": "I am very you again after all these years.",
   "dap": "",
   "giai": "✅ Đáp án đúng: happy to see📘 Ngữ cảnh: Chỗ trống cần một tính từ chỉ cảm giác đi với to V.🏗️ Cấu trúc:Mẫu S + be + tính từ + to V nói cảm giác khi làm việc gì.Ví dụ: I am happy to see you again.🔍 Giải thích chi tiết: Sau tính từ chỉ cảm giác thì dùng to + động từ nguyên thể, nên chọn thẻ happy to see.",
   "huongDan": "Complete each sentence with a phrase from the list. Use each one once.",
   "choices": []
  },
  {
   "noi": "Lots of people it every year.",
   "dap": "",
   "giai": "The word 'visit' correctly describes the action of many people going to Marrakesh annually.",
   "huongDan": "Read and complete the dialogue.NARRATOR:Where does your family in Morocco?SAFIA:They live in Tangiers. It’s a near the ocean.NARRATOR:What famous cities are there in Morocco?SAFIA:Well, Marrakesh. Tha",
   "choices": []
  }
 ],
 "speaking": [
  {
   "noi": "Ann:   Do you play video games?Kim:   No, I don’t. I play the piano.Tom:   Yes, I do. Ann:   How often do you play video games, Tom?Tom:   I play video games twice a week.Ann:   Kim, how often do you play the piano?Kim:   I play the piano every evening.",
   "dap": "",
   "giai": "",
   "huongDan": "Read the dialogue.",
   "choices": []
  }
 ]
};
