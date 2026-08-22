/**
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

export const KHO_CAU: Record<string, CauHoi[]> = {
 "fill_blank": [
  {
   "noi": "Beth takes photos of wild animals.\nPhủ định: Beth photos of wild animals.\nCâu hỏi: Beth photos of wild animals?\nNo, .",
   "dap": "doesn’t take · Does · take · she doesn’t",
   "giai": "✅ Đáp án đúng: doesn’t take - Does - take - she doesn’t - Beth doesn’t take photos of wild animals. / Does Beth take photos of wild animals? - No, she doesn’t . = Beth không chụp ảnh động vật hoang dã. / Beth có chụp ảnh động vật hoang dã không? - Không.📘 Ngữ cảnh: Chủ ngữ Beth là tên riêng của một ",
   "huongDan": "Change the following affirmative sentences into negative sentences and questions.",
   "choices": []
  },
  {
   "noi": "Cats like chasing (mouse).",
   "dap": "mice",
   "giai": "✅ Đáp án đúng: mice\nCâu hoàn chỉnh: Cats like chasing mice (mouse).📘 Ngữ cảnh:\nBài yêu cầu: Complete the sentences using the correct form of the nouns in brackets.\nCâu cần hoàn thành: Cats like chasing ___ (mouse).\nTừ trong ngoặc là \"mouse\", phải chia về đúng dạng.🏗️ Cấu trúc: Cách tạo danh từ số nh",
   "huongDan": "Complete the sentences using the correct form of the nouns in brackets.",
   "choices": []
  },
  {
   "noi": "I’m sorry. I help you.\nThat’s OK. I can do it myself.",
   "dap": "can’t",
   "giai": "✅ Đáp án đúng: can’t = Xin lỗi, tôi không giúp bạn được. - Không sao. Tôi tự làm được.📘 Ngữ cảnh: Câu bắt đầu bằng I’m sorry (xin lỗi) - người nói đang từ chối, tức là không giúp được.🏗️ Cấu trúc: \nS + can / can’t + V (nguyên thể)\nSoi vào câu này: I + can’t + help you\ncan = làm được | can’t = không ",
   "huongDan": "Complete the conversations with can or can’t.",
   "choices": []
  },
  {
   "noi": "I / you / we / they: wake up\nshe / he / it:",
   "dap": "wakes up",
   "giai": "✅ Đáp án đúng: wakes up - she / he / it wakes up = thức dậy📘 Ngữ cảnh: Đề cho động từ wake up (thức dậy) ở dạng dùng với I / you / we / they. Việc cần làm là đổi sang dạng dùng với she / he / it - tức chủ ngữ số ít ngôi thứ ba.🏗️ Cấu trúc: \nS + V (-s / -es) + O (thì hiện tại đơn)\nSoi vào câu này: sh",
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
   "giai": "✅ Đáp án đúng: can’t ride a horse - Fatimah can’t ride a horse. = Fatimah không cưỡi ngựa được.📘 Ngữ cảnh: Nhìn tranh xem Fatimah có đang cưỡi ngựa được hay không. Trong tranh, bạn ấy KHÔNG làm được việc ride a horse, nên câu phải dùng can’t.🏗️ Cấu trúc: \nS + can / can’t + V (nguyên thể)\nSoi vào câu",
   "huongDan": "Look at the picture and write sentences using can or can’t.",
   "choices": []
  },
  {
   "noi": "Jun get up early?\nYes, .",
   "dap": "Does · he does",
   "giai": "✅ Đáp án đúng: Does - he does - Does Jun get up early? Yes, he does . = Jun có dậy sớm không? - Có.📘 Ngữ cảnh: Chủ ngữ Jun là tên riêng của một người → số ít. Câu trả lời bắt đầu bằng Yes.🏗️ Cấu trúc: \nPhủ định: S + don’t / doesn’t + V (nguyên thể)\nNghi vấn: Do / Does + S + V (nguyên thể) ?\nSoi vào ",
   "huongDan": "Read and write. Complete the question and the short answer.",
   "choices": []
  },
  {
   "noi": "shop at the supermarket\nI like / love / hate .",
   "dap": "shopping at the supermarket",
   "giai": "✅ Đáp án đúng: shopping at the supermarket - I like / love / hate shopping at the supermarket. = Tôi thích / rất thích / ghét đi siêu thị.📘 Ngữ cảnh: Gợi ý cho cụm shop at the supermarket ở dạng nguyên thể. Sau like / love / hate thì động từ phải chuyển sang dạng -ing, còn phần còn lại của cụm giữ n",
   "huongDan": "Write sentences about you for each hobby with like, love or hate. (Example: dance → I love dancing.)",
   "choices": []
  },
  {
   "noi": "I am 8 years old. James is ten years old.\nHe is older than .",
   "dap": "me",
   "giai": "✅ Đáp án đúng: me - I am 8 years old. James is ten years old. He is older than me. = Cậu ấy lớn tuổi hơn tôi.📘 Ngữ cảnh: Câu so tuổi hai người: người nói (I) 8 tuổi, James 10 tuổi → James nhiều tuổi hơn.\nCâu cuối He is older than … = \"Cậu ấy lớn hơn ai?\" → hơn chính người nói. Người nói là I, nhưng ",
   "huongDan": "Look at the pictures. Identify the person or thing, then complete the sentences with the correct object pronoun.",
   "choices": []
  },
  {
   "noi": "the new Iphone have better games?\nYes, it .",
   "dap": "Does · does",
   "giai": "✅ Đáp án đúng: Does / does📘 Ngữ cảnh: Câu hỏi chiếc iPhone mới có trò chơi hay hơn không, và câu trả lời là Yes.🏗️ Cấu trúc:Does + it + have …?Ví dụ: Does the new iPhone have better games?Trả lời: Yes, it does.🔍 Giải thích chi tiết: The new iPhone là một đồ vật, thuộc nhóm it, nên dùng Does. Câu trả",
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
   "giai": "✅ Đáp án đúng: Where - Where are the clothes? → on the floor📘 Ngữ cảnh: Câu trả lời là on the floor - lại là nơi chốn, lần này của quần áo.🏗️ Cấu trúc: \nTừ để hỏi + do / does / be + S + V ... ?\nSoi vào câu này: Where + are + the clothes ?\nBảng từ để hỏi:\nWhat = cái gì | Who = ai | Where = ở đâu\nWhen",
   "huongDan": "Look at the pictures. Write the question word, then write one-word answers.",
   "choices": []
  },
  {
   "noi": "S / L: \nManchester is big, but London is .",
   "dap": "S · bigger",
   "giai": "✅ Đáp án đúng: S - bigger - Manchester is big, but London is bigger . = Manchester thì lớn, nhưng London còn lớn hơn.📘 Ngữ cảnh: Câu so sánh hai vật bằng but: vế đầu nêu tính chất, vế sau nêu mức hơn. Tính từ cần biến đổi là big (tính từ NGẮN).🏗️ Cấu trúc: \nA + be + tính từ so sánh hơn + than + B\nSo",
   "huongDan": "Circle S (short adjective) or L (long adjective). Then complete the sentence with the correct comparative adjective.",
   "choices": []
  },
  {
   "noi": "Watch out! The owl !",
   "dap": "is hunting",
   "giai": "✅ Đáp án đúng: is hunting - Watch out! The owl is hunting!📘 Ngữ cảnh: Câu cảnh báo Watch out! cho biết hành động đang xảy ra. Chủ ngữ The owl là một con cú → số ít.🏗️ Cấu trúc: \nKhẳng định: S + am / is / are + V-ing + ...\nPhủ định: S + am / is / are + not + V-ing + ...\nNghi vấn: Am / Is / Are + S + ",
   "huongDan": "Look at the picture. Write the correct verb form using present continuous.",
   "choices": []
  },
  {
   "noi": "Ann/ Dax\nAnn is Dax.",
   "dap": "more intelligent than",
   "giai": "✅ Đáp án đúng: more intelligent than - Ann is more intelligent than Dax. = Ann thông minh hơn Dax.📘 Ngữ cảnh: Gợi ý nêu hai cái tên → dạng hơn. Tính từ intelligent có 4 âm tiết - tính từ dài.🏗️ Cấu trúc: \nA + be + tính từ so sánh hơn + than + B\nSoi vào câu này: Ann + is + more intelligent + than + D",
   "huongDan": "Look at the table and write sentences. Use the comparative or the superlative form of the adjectives.",
   "choices": []
  },
  {
   "noi": "There is orange picture on the wall.",
   "dap": "",
   "giai": "✅ Đáp án đúng: an\nCâu hoàn chỉnh: There is an orange picture on the wall.📘 Ngữ cảnh:\nBài yêu cầu: Fill in the blanks with a, an, some or any.\nCâu cần hoàn thành: There is ___ orange picture on the wall.\nChỗ trống cần một mạo từ đứng trước danh từ \"orange picture\" - đây là danh từ đếm được số ít.🏗️ C",
   "huongDan": "Fill in the blanks with a, an, some or any.",
   "choices": []
  },
  {
   "noi": "Translate into English: Đây là một cuốn sách cũ.",
   "dap": "This is an old book.",
   "giai": "✅ Đáp án đúng: This is an old book.📘 Ngữ cảnh: Giới thiệu một đồ vật: \"Đây là một cuốn sách cũ.\"🏗️ Cấu trúc:Giới thiệu một vật ở gầnThis is + a / an + tính từ + danh từ.Trước ÂM nguyên âm dùng anan old book.🔍 Giải thích chi tiết: - Đây là: dùng This is.- một: danh từ số ít nên cần a hoặc an.- Chọn a",
   "huongDan": "Complete each sentence with the correct form of the word in brackets. For the last two, translate the sentence into English.",
   "choices": []
  },
  {
   "noi": "Kim studied hard, she didn’t get high scores.",
   "dap": "",
   "giai": "✅ Đáp án đúng: but - Kim studied hard, but she didn’t get high scores.📘 Ngữ cảnh: Vế đầu học chăm nhưng vế sau không được điểm cao - trái với mong đợi.🏗️ Cấu trúc: \nvế 1 + liên từ + vế 2\nSoi vào câu này: Kim studied hard, but she didn’t get high scores.\nBảng 4 liên từ - nhìn QUAN HỆ giữa hai vế:\nand",
   "huongDan": "Complete the sentence with the correct conjunction and, but, or, so.",
   "choices": []
  },
  {
   "noi": "My cousins (not) a TV in their bedroom.",
   "dap": "don’t have",
   "giai": "✅ Đáp án đúng: don’t have (câu 10)📘 Ngữ cảnh: Ở câu My cousins … (not) a TV in their bedroom., My cousins là số nhiều nên phủ định là don’t have.🏗️ Cấu trúc: \nhave / has ở hiện tại đơn:\nI / you / we / they → have he / she / it → has\nPhủ định: don’t have doesn’t have (sau doesn’t dùng have, không dùn",
   "huongDan": "Fill in the blank with the correct form of have / has / don't have / doesn't have.",
   "choices": []
  },
  {
   "noi": "Look up in sky! I see moon.",
   "dap": "",
   "giai": "✅ Đáp án đúng: the - the📘 Ngữ cảnh: Nhìn lên trời: \"Nhìn lên bầu trời kìa! Tôi thấy mặt trăng.\"🏗️ Cấu trúc:Vật DUY NHẤT trên đời luôn dùng thethe sun, the moon, the sky.🔍 Giải thích chi tiết: - Cả hai ô: sky và moon là những thứ chỉ có một trên đời nên luôn dùng the, không dùng a / an.Vì vậy câu đún",
   "huongDan": "Complete the sentences with a, an or the.",
   "choices": []
  },
  {
   "noi": "We often (play) football after school, but today we (study) for a test.",
   "dap": "play · are studying",
   "giai": "✅ Đáp án đúng: play - are studying - We often play football after school, but today we are studying for a test.📘 Ngữ cảnh: Vế đầu có often (thói quen), vế sau có today (giai đoạn hiện tại).🏗️ Cấu trúc: \nHiện tại ĐƠN: S + V (-s / -es) → việc lặp đi lặp lại, sự thật\nHiện tại TIẾP DIỄN: S + am / is / a",
   "huongDan": "Complete the sentences with correct tense of the verbs in brackets.",
   "choices": []
  },
  {
   "noi": "it speaking English?\nYes, it is. / No, it isn’t.\n→",
   "dap": "Is · Yes, it is.",
   "giai": "✅ Đáp án đúng: Is - Is it speaking English? → Yes, it is.📘 Ngữ cảnh: Chủ ngữ là it - dùng cho con vật hoặc đồ vật, số ít.🏗️ Cấu trúc: \nKhẳng định: S + am / is / are + V-ing + ...\nPhủ định: S + am / is / are + not + V-ing + ...\nNghi vấn: Am / Is / Are + S + V-ing ... ?\nSoi vào câu này: it + is + spea",
   "huongDan": "Look and write. Then write the correct short answer (Yes, ... / No, ...).",
   "choices": []
  },
  {
   "noi": "She is a teacher.\nNegative: She a teacher.\nQuestion: a teacher?\nShort answer: Yes, .",
   "dap": "isn’t · Is she · she is",
   "giai": "✅ Đáp án đúng: isn’t / Is she / she is📘 Ngữ cảnh: Đổi câu kể sang phủ định, câu hỏi và trả lời ngắn: \"Cô ấy là giáo viên.\"🏗️ Cấu trúc:she đi với isphủ định là isn’t.Short answer khẳng địnhYes, + chủ ngữ + is.🔍 Giải thích chi tiết: - Negative (phủ định): She isn’t a teacher.- Question (câu hỏi): đưa ",
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
   "giai": "✅ Đáp án đúng: better / worse - computer games and books (good/ bad) → better / worse = so sánh trò chơi điện tử và sách📘 Ngữ cảnh: Đề cho chủ đề so sánh trò chơi điện tử và sách cùng hai tính từ trong ngoặc: good và bad. Việc cần làm là viết dạng so sánh hơn của từng tính từ.🏗️ Cấu trúc: \nA + be + ",
   "huongDan": "Write the comparative form of the two adjectives in brackets.",
   "choices": []
  },
  {
   "noi": "Her children (not be) at home yesterday morning.\nThey (be) in the park.",
   "dap": "weren’t · were",
   "giai": "✅ Đáp án đúng: weren’t - were📘 Ngữ cảnh: Cụm yesterday morning → quá khứ đơn. Ngoặc ghi be nên dùng dạng quá khứ của be. Chủ ngữ Her children số nhiều.🏗️ Cấu trúc: \nKhẳng định: S + was / were + ...\nPhủ định: S + wasn’t / weren’t + ...\nNghi vấn: Was / Were + S + ... ?\nSoi vào câu này: S + was / were ",
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
   "giai": "✅ Đáp án đúng: isn’t - Is he - he is\nCâu hoàn chỉnh: He is on the sofa. / (-) He isn’t on the sofa. / (?) Is he on the sofa? / Yes, he is.📘 Ngữ cảnh:\nBài yêu cầu: Change the following affirmative sentences into negative sentences and questions.\nCâu cần hoàn thành: He is on the sofa. / (-) He ___ on ",
   "huongDan": "Change the following affirmative sentences into negative sentences and questions.",
   "choices": []
  },
  {
   "noi": "There aren’t bananas on the plate.",
   "dap": "",
   "giai": "✅ Đáp án đúng: any\nCâu hoàn chỉnh: There aren’t any bananas on the plate.📘 Ngữ cảnh:\nBài yêu cầu: Fill in the blanks with a, an, some or any.\nCâu cần hoàn thành: There aren’t ___ bananas on the plate.\nChỗ trống chọn giữa some và any. Đây là câu PHỦ ĐỊNH.🏗️ Cấu trúc: some và any đều nghĩa là \"một ít ",
   "huongDan": "Fill in the blanks with a, an, some or any.",
   "choices": []
  },
  {
   "noi": "Sam in an apartment.\nHe in a house.",
   "dap": "lives · doesn’t live",
   "giai": "✅ Đáp án đúng: lives - doesn’t live - Sam lives in an apartment. / He doesn’t live in a house. = Sam sống trong một căn hộ. / Cậu ấy không sống trong nhà riêng.📘 Ngữ cảnh: Tranh cho thấy Sam ở chung cư chứ không ở nhà riêng. Chủ ngữ Sam / He ở số ít.🏗️ Cấu trúc: \nPhủ định: S + don’t / doesn’t + V (n",
   "huongDan": "Look at the pictures and write. Use the affirmative and the negative form.",
   "choices": []
  },
  {
   "noi": "We live in London withthree dogs.",
   "dap": "our",
   "giai": "✅ Đáp án đúng: our📘 Ngữ cảnh: \"Chúng tôi sống ở London với ba chú chó của mình.\"🏗️ Cấu trúc: we → our (+ danh từ).\nVí dụ: We love our city.🔍 Giải thích chi tiết: Người sở hữu là \"We\" nên tính từ sở hữu là \"our\". Không dùng \"my\" (chỉ một người) vì chủ ngữ là số nhiều \"we\". Vậy: We live in London with",
   "huongDan": "Fill in the blank with the correct word or phrase.",
   "choices": []
  },
  {
   "noi": "My friends/ love/ skate /?\n?",
   "dap": "Do your friends love skating",
   "giai": "✅ Đáp án đúng: Do your friends love skating - Do your friends love skating? = Bạn bè của bạn có thích trượt băng không?📘 Ngữ cảnh: Gợi ý kết thúc bằng dấu ? nên phải viết thành câu hỏi. Động từ cảm xúc là love, hoạt động là skate.🏗️ Cấu trúc: \nS + like / love / hate + V-ing\nSoi vào câu này: Do your ",
   "huongDan": "Write the sentences. Use the words given.",
   "choices": []
  },
  {
   "noi": "Does Vadim like playing football?",
   "dap": "No, he doesn’t.",
   "giai": "✅ Đáp án đúng: No, he doesn’t. - Does Vadim like playing football? No, he doesn’t. = Vadim có thích chơi bóng đá không? - Không.📘 Ngữ cảnh: Câu hỏi dùng Does (động từ thường like) với chủ ngữ Vadim - một bạn nam. Theo bài, Vadim thích cắm trại và nấu ăn ngoài trời, không phải bóng đá.🏗️ Cấu trúc: \nP",
   "huongDan": "Read the text. Write the missing word(s), then answer the questions.",
   "choices": []
  },
  {
   "noi": "Josh listen to the radio?\nNo, .",
   "dap": "Does · he doesn’t",
   "giai": "✅ Đáp án đúng: Does - he doesn’t - Does Josh listen to the radio? No, he doesn’t . = Josh có nghe đài không? - Không.📘 Ngữ cảnh: Chủ ngữ Josh là một người → số ít. Câu trả lời bắt đầu bằng No.🏗️ Cấu trúc: \nPhủ định: S + don’t / doesn’t + V (nguyên thể)\nNghi vấn: Do / Does + S + V (nguyên thể) ?\nSoi ",
   "huongDan": "Read and write. Complete the question and the short answer.",
   "choices": []
  },
  {
   "noi": "We aren’t ; we are smiling.",
   "dap": "",
   "giai": "✅ Đáp án đúng: sad (câu 8)📘 Ngữ cảnh: Ở câu We aren’t …; we are smiling., đang cười nên vế trước phải phủ định sad.🏗️ Cấu trúc: \nĐộng từ to be ở hiện tại:\nI am he / she / it is you / we / they are\nPhủ định: am not isn’t aren’t Câu hỏi: đảo Am / Is / Are lên trước chủ ngữ\nTrả lời ngắn: Yes, we are. N",
   "huongDan": "Drag the correct word into each blank to complete the sentences about 'We're' and 'We aren't'.",
   "choices": []
  },
  {
   "noi": "Janet and Paul have two daughters.older daughter is at college, and the younger daughter goes to secondary school.",
   "dap": "Their",
   "giai": "✅ Đáp án đúng: Their📘 Ngữ cảnh: Nói về con gái của Janet và Paul.🏗️ Cấu trúc: they → their (+ danh từ); viết hoa khi đầu câu.\nVí dụ: Their daughter is a doctor.🔍 Giải thích chi tiết: \"Janet and Paul\" là hai người (= they) nên tính từ sở hữu là \"their\" (viết hoa \"Their\" vì đứng đầu câu). Vậy: Their o",
   "huongDan": "Fill in the blank with the correct word or phrase.",
   "choices": []
  },
  {
   "noi": "it a funny movie?\nNo, it .",
   "dap": "Is · isn’t",
   "giai": "✅ Đáp án đúng: Is - isn’t - Is it a funny movie? No, it isn’t .📘 Ngữ cảnh: Câu hỏi về một bộ phim nên chủ ngữ it ở số ít. Câu trả lời bắt đầu bằng No nên phần sau phải mang not.🏗️ Cấu trúc: \nKhẳng định: S + be + ...\nPhủ định: S + be + not + ...\nNghi vấn: Be + S + ...?\nSoi vào câu này: it + is → it +",
   "huongDan": "Look at the pictures and write is / isn’t, are / aren’t, am / ’m not.",
   "choices": []
  },
  {
   "noi": "Diana/ at the theatre?\n Diana at the theatre?",
   "dap": "Was · No, she wasn’t.",
   "giai": "✅ Đáp án đúng: Was - No, she wasn’t. - Was Diana at the theatre? No, she wasn’t. = Diana có ở nhà hát không? - Không.📘 Ngữ cảnh: Tra tranh: Diana ở rạp xiếc (circus), không phải nhà hát (theatre) - hai chỗ khác nhau, dễ nhầm. Chủ ngữ Diana ở số ít.🏗️ Cấu trúc: \nKhẳng định: S + was / were + ...\nPhủ đ",
   "huongDan": "Now, write the questions and the short answers.",
   "choices": []
  },
  {
   "noi": "Mary and John have a swimming pool?",
   "dap": "Do",
   "giai": "✅ Đáp án đúng: Do (câu 11)📘 Ngữ cảnh: Ở câu … Mary and John have a swimming pool?, Mary and John là số nhiều nên câu hỏi dùng Do.🏗️ Cấu trúc: \nhave / has ở hiện tại đơn:\nI / you / we / they → have he / she / it → has\nPhủ định: don’t have doesn’t have (sau doesn’t dùng have, không dùng has)\nCâu hỏi: ",
   "huongDan": "Fill in the blank with the correct form of have / has / don't have / doesn't have.",
   "choices": []
  },
  {
   "noi": "That is Ann’s car toy.\n car toy is that?",
   "dap": "Whose",
   "giai": "✅ Đáp án đúng: Whose - Whose car toy is that?📘 Ngữ cảnh: Phần gạch chân Ann’s có dấu sở hữu ’s - đang nói chiếc ô tô đồ chơi của ai → hỏi bằng Whose.🏗️ Cấu trúc: \nTừ để hỏi + do / does / be + S + V ... ?\nSoi vào câu này: Whose + is + that car toy ?\nBảng từ để hỏi:\nWhat = cái gì | Who = ai | Where = ",
   "huongDan": "Write a question for the underlined word.",
   "choices": []
  },
  {
   "noi": "My name (1) Josh. I (2) twelve years old and I (3) from London.There (4) four people in my family. My dad (his name (5) Peter), my mum (her name (6) Julie) and my little sister Jessica.She (7) nearly seven. Her birthday ",
   "dap": "is · am · am · are · is · is · is · is · are · is",
   "giai": "✅ Đáp án đúng: (1) is - (2) am - (3) am - (4) are - (5) is - (6) is - (7) is - (8) is - (9) are - (10) is📘 Ngữ cảnh: Đây là đoạn Josh tự giới thiệu, có 10 chỗ trống. Cả đoạn chỉ dùng một điểm ngữ pháp: chia động từ be theo chủ ngữ. Với mỗi ô, tìm chủ ngữ đứng ngay trước rồi tra bảng.🏗️ Cấu trúc: \nKh",
   "huongDan": "Read Josh’s short text about himself. Then write the missing words in each blank.",
   "choices": []
  },
  {
   "noi": "The cowboy . → \nIt .",
   "dap": "can play the guitar · B · can’t play the guitar",
   "giai": "✅ Đáp án đúng: can play the guitar - B - can’t play the guitar - The cowboy can play the guitar. → B / It can’t play the guitar. = Chàng cao bồi có thể chơi đàn ghi-ta. / Chàng cao bồi không thể chơi đàn ghi-ta.📘 Ngữ cảnh: Bài có hai bức tranh: ban đêm đồ chơi sống dậy và làm được mọi thứ, ban sáng ",
   "huongDan": "Look at the two pictures and write. In the night picture, write what each thing can do and match it with the correct letter. In the morning picture, write what ",
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
   "giai": "✅ Đáp án đúng: an - the📘 Ngữ cảnh: Tả bức tranh: nhìn thấy igloo, rồi nói tiếp về chính igloo đó.🏗️ Cấu trúc:Nhắc lần ĐẦUa / an + danh từ số ít.Trước âm nguyên âm dùng an.Nhắc LẠI thứ vừa nói dùng the.🔍 Giải thích chi tiết: - Ô 1: igloo xuất hiện lần đầu nên dùng mạo từ; từ này bắt đầu bằng âm nguyê",
   "huongDan": "Choose the correct article to complete each sentence.",
   "choices": []
  },
  {
   "noi": "My name (1) Nam. (2) 8 years old.\n(3) a student.\nMy dad (4) 40 years old. He (5) a doctor.\nHis name (6) Minh.\nMy mom (7) 36 years old. (8) a vet.\nHer name (9) An.\nMy sister (10) 6 years old. (11) a student, too. Her name",
   "dap": "is · I am · I am · is · is · is · is · She is a vet. · is · is · She is · is · are",
   "giai": "✅ Đáp án đúng: is - I am - I am - is - is - is - is - She is a vet. - is - is - She is - is - are\nCâu hoàn chỉnh: My name (1) is Nam. (2) I am 8 years old. / (3) I am a student. / My dad (4) is 40 years old. He (5) is a doctor. / His name (6) is Minh. / My mom (7) is 36 years old. (8) She is a vet. ",
   "huongDan": "Read and fill in the blanks to complete Nam’s introduction about his family.",
   "choices": []
  },
  {
   "noi": "My friends often (go) camping.",
   "dap": "go",
   "giai": "✅ Đáp án đúng: go - My friends often go camping. = Các bạn tôi thường đi cắm trại.📘 Ngữ cảnh: Động từ trong ngoặc là go. Chủ ngữ của câu là My friends - số nhiều. Dấu hiệu often xác nhận đây là việc lặp lại thường xuyên.🏗️ Cấu trúc: \nS + V (-s / -es) + O (thì hiện tại đơn)\nSoi vào câu này: My friend",
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
   "giai": "✅ Đáp án đúng: got up - get up → got up = thức dậy📘 Ngữ cảnh: Đề cho động từ get up (thức dậy) ở dạng nguyên thể. Đây là động từ BẤT QUY TẮC nên không thêm -ed mà phải nhớ dạng riêng.🏗️ Cấu trúc: \nS + V2 (cột 2 - quá khứ) + O (động từ BẤT QUY TẮC)\nSoi vào câu này: get up → got up (đổi e → o ở động t",
   "huongDan": "Write the past form of the verb.",
   "choices": []
  },
  {
   "noi": "I’d like to go to Paris Spring.",
   "dap": "",
   "giai": "✅ Đáp án đúng: in - I’d like to go to Paris in Spring.📘 Ngữ cảnh: Từ Spring (mùa xuân) là một mùa trong năm.🏗️ Cấu trúc: \nin / on / at + cụm chỉ thời gian\nSoi vào câu này: Spring là mùa → dùng in\nBảng chọn giới từ - nhìn từ đứng SAU ô trống:\nin → khoảng thời gian DÀI: năm (in 2023) - tháng (in June)",
   "huongDan": "Complete the sentence with in, at or on.",
   "choices": []
  },
  {
   "noi": "Where does he usually go at weekends?\nHe usually goes to .",
   "dap": "expensive restaurants",
   "giai": "✅ Đáp án đúng: expensive restaurants - He usually goes to expensive restaurants .📘 Ngữ cảnh: Câu hỏi Where hỏi nơi đến. Bài đọc viết At weekends, he usually goes to expensive restaurants with his friends.🏗️ Cấu trúc: \nCách trả lời câu hỏi đọc hiểu:\n1. Đọc câu hỏi, xác định từ để hỏi (Who / Where / W",
   "huongDan": "Read the text and answer the questions.Michael JohnsonThis is Michael Johnson. He is a famous rock star. He lives in America.He travels all around the world and",
   "choices": []
  },
  {
   "noi": "The kid (feed) the cat one hour ago.",
   "dap": "fed",
   "giai": "✅ Đáp án đúng: fed - The kid fed the cat one hour ago. = Cậu bé đã cho mèo ăn cách đây một tiếng.📘 Ngữ cảnh: Động từ cho sẵn là feed, chủ ngữ là The kid. Cụm one hour ago là dấu hiệu quá khứ. Câu này ở dạng khẳng định.🏗️ Cấu trúc: \nS + V2 (cột 2 - quá khứ) + O (động từ BẤT QUY TẮC)\nSoi vào câu này: ",
   "huongDan": "Put the verbs in brackets into the past simple.",
   "choices": []
  },
  {
   "noi": "Her town a big shopping center.",
   "dap": "doesn’t have",
   "giai": "✅ Đáp án đúng: doesn’t have - Her town doesn’t have a big shopping center. = Thị trấn của cô ấy không có trung tâm mua sắm lớn.📘 Ngữ cảnh: Câu ở dạng phủ định. Chủ ngữ là Her town - chỉ một người/vật nên là số ít.🏗️ Cấu trúc: \nS + have / has + O\nSoi vào câu này: Her town + doesn’t have + a big shopp",
   "huongDan": "Fill in the blanks with don’t have or doesn’t have.",
   "choices": []
  },
  {
   "noi": "→ better →",
   "dap": "good · the best",
   "giai": "✅ Đáp án đúng: good - the best - good → better → the best (tốt, giỏi)📘 Ngữ cảnh: Cột này cho sẵn dạng hơn better - một dạng bất quy tắc, nhìn không ra tính từ gốc nếu chưa học thuộc.🏗️ Cấu trúc: \nA + be + the + tính từ so sánh nhất + in / of + phạm vi\nSoi vào câu này: Cái này / người này + is + the ",
   "huongDan": "Write the missing words.",
   "choices": []
  },
  {
   "noi": "Ben is sleeping on his .",
   "dap": "desk",
   "giai": "✅ Đáp án đúng: desk📘 Ngữ cảnh: Tranh 2: Ben đang ngủ trên bàn học của mình.🏗️ Cấu trúc: \nTân ngữ đứng SAU động từ:\nS + is / are + V-ing + O\nSoi vào câu này: Ben is sleeping on his desk.\nis + sleeping là phần đã cho sẵn (một bạn nên chủ ngữ ở số ít), chỗ trống nằm cuối câu.\nChỗ trống nằm ở vị trí O (",
   "huongDan": "Now complete the sentences. Write one-word answers about picture 2.",
   "choices": []
  },
  {
   "noi": "What did they do when they knew how to make fire?\nThey the meat and plants.",
   "dap": "cooked",
   "giai": "✅ Đáp án đúng: cooked - What did they do when they knew how to make fire? → They cooked the meat and plants. = Họ đã làm gì khi biết tạo ra lửa? - Họ nấu thịt và rau.📘 Ngữ cảnh: Bài viết: when they knew how to make fire, they cooked the meat and plants.🏗️ Cấu trúc: \nS + V2 (cột 2 - quá khứ) + O (độn",
   "huongDan": "Now answer the questions about the text.Many, many years ago people did not have houses. They lived in caves. They got their food from animals and collected fru",
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
   "giai": "✅ Đáp án đúng: She\nCâu hoàn chỉnh: My sister → She📘 Ngữ cảnh:\nBài yêu cầu: Match the subject pronouns with the correct noun. (Choose the correct pronoun for each noun.).\nCâu cần hoàn thành: My sister → ___\nChỗ trống cần một đại từ thay cho \"My sister\".🏗️ Cấu trúc: Đại từ nhân xưng thay cho danh từ đ",
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
   "giai": "✅ Đáp án đúng: F - The racket is on the shelf.📘 Ngữ cảnh: Câu nói cây vợt đặt trên kệ.🏗️ Cấu trúc: \nS + be + giới từ chỉ vị trí + danh từ\nSoi vào câu này: cây vợt + on + cái kệ → KHÔNG khớp với tranh → F\nBảng giới từ chỉ vị trí:\nin = bên TRONG (hồ, hộp, phòng) | on = TRÊN và có CHẠM bề mặt\nabove = p",
   "huongDan": "Look at the picture. Write T (true) or F (false).",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "Peter is sitting his mother and father. They are watching TV.",
   "dap": "",
   "giai": "✅ Đáp án đúng: between - Peter is sitting between his mother and father. They are watching TV.📘 Ngữ cảnh: Câu nêu hai người: his mother and his father - Peter ngồi ở giữa hai người đó.🏗️ Cấu trúc: \nS + be + giới từ chỉ vị trí + danh từ\nSoi vào câu này: Peter + between + bố và mẹ\nBảng giới từ chỉ vị ",
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
   "giai": "✅ Đáp án đúng: It’s (câu 6)📘 Ngữ cảnh: Ở câu A: What colour is the cat? B: … black and white., the cat là một con nên trả lời bằng It’s.🏗️ Cấu trúc: \nCâu hỏi về màu sắc:\nWhat colour + is + danh từ số ít? What colour + are + danh từ số nhiều?\n What colour is the pen? What colour are your eyes?\nWhat h",
   "huongDan": "Choose the correct answer to complete the sentence or question.",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "My brother breakfast at 7 a.m. every day.",
   "dap": "",
   "giai": "✅ Đáp án đúng: has (câu 12)📘 Ngữ cảnh: Ở câu My brother … breakfast at 7 a.m. every day., My brother là số ít nên dùng has.🏗️ Cấu trúc: \nhave / has ở hiện tại đơn:\nI / you / we / they → have he / she / it → has\nPhủ định: don’t have doesn’t have (sau doesn’t dùng have, không dùng has)\nCâu hỏi: Do + I",
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
   "giai": "✅ Đáp án đúng: Were - (4) Were you alone?📘 Ngữ cảnh: Đây là câu hỏi với chủ ngữ you, vẫn trong mạch chuyện quá khứ.🏗️ Cấu trúc: \nKhẳng định: S + was / were + ...\nPhủ định: S + wasn’t / weren’t + ...\nNghi vấn: Was / Were + S + ... ?\nSoi vào câu này: you + were → you + weren’t → Were + you ... ?\nBảng ",
   "huongDan": "Read the dialogue and choose the correct answer.Tom: Where (1) … you last night?Nick: I (2) … in an old house. It (3) … cold and dark.Tom: Where? In an old hous",
   "choices": [
    "",
    "",
    ""
   ]
  },
  {
   "noi": "Is that your friend?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Yes, she is. - Is that your friend? Yes, she is. = Kia là bạn của bạn phải không? - Đúng vậy.📘 Ngữ cảnh: Câu hỏi về người (your friend) nên trả lời ngắn dùng he / she, không dùng it.🏗️ Cấu trúc: \nKhẳng định: S + be + ...\nPhủ định: S + be + not + ...\nNghi vấn: Be + S + ...?\nSoi vào câu",
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
   "giai": "✅ Đáp án đúng: said - (3) I said goodbye to my parents. = Tôi đã chào tạm biệt bố mẹ.📘 Ngữ cảnh: Chỗ trống đi với goodbye - cụm chỉ lời chào.🏗️ Cấu trúc: \nS + V2 (cột 2 - quá khứ) + O (động từ BẤT QUY TẮC)\nSoi vào câu này: say → said\nĐộng từ bất quy tắc KHÔNG thêm -ed - phải học thuộc từng từ.\nBảng ",
   "huongDan": "Read and circle the correct answer.I got up and I (1) … a shower. I (2) … on my clothes and went downstairs to the kitchen. I had breakfast with my family. Then",
   "choices": [
    "",
    "",
    ""
   ]
  },
  {
   "noi": "they have an English book?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Do (câu 10)📘 Ngữ cảnh: Ở câu … they have an English book?, chủ ngữ they nên câu hỏi dùng Do.🏗️ Cấu trúc: \nhave / has ở hiện tại đơn:\nI / you / we / they → have he / she / it → has\nPhủ định: don’t have doesn’t have (sau doesn’t dùng have, không dùng has)\nCâu hỏi: Do + I/you/we/they + h",
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
   "giai": "✅ Đáp án đúng: to gnaw at something - In this story, scrape means … .📘 Ngữ cảnh: Câu hỏi về nghĩa của từ scrape trong bài. Bài viết They wet the food and scrape at it with their jaws (hàm).🏗️ Cấu trúc: \nCách làm bài đọc hiểu trắc nghiệm:\n1. Đọc câu hỏi, gạch chân từ khoá\n2. Tìm đúng câu chứa từ khoá",
   "huongDan": "Read the story and answer the questions.MillipedesThe millipede is small but strong. It can have between 80 and 400 legs!Millipedes walk slowly, but they can di",
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
   "giai": "✅ Đáp án đúng: There are\nCâu hoàn chỉnh: There are some apples in the fridge.📘 Ngữ cảnh:\nBài yêu cầu: Circle the correct answer.\nCâu cần hoàn thành: ___ some apples in the fridge.\nChỗ trống cần There + to be. Danh từ theo sau là \"apples\" - đây là danh từ số nhiều.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" t",
   "huongDan": "Circle the correct answer.",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "a tree →",
   "dap": "",
   "giai": "✅ Đáp án đúng: It\nCâu hoàn chỉnh: a tree → It📘 Ngữ cảnh:\nBài yêu cầu: Write the suitable pronoun for each noun.\nCâu cần hoàn thành: a tree → ___\nChỗ trống cần một đại từ thay cho \"a tree\".🏗️ Cấu trúc: Đại từ nhân xưng thay cho danh từ đã nhắc tới, khỏi phải lặp lại:\nI = người đang nói\nYou = người ng",
   "huongDan": "Write the suitable pronoun for each noun.",
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
   "noi": "Ann: Was there a party yesterday?\nBob: .",
   "dap": "",
   "giai": "✅ Đáp án đúng: Yes, there was - Ann: Was there a party yesterday? Bob: Yes, there was . = Hôm qua có tiệc không? - Có.📘 Ngữ cảnh: Câu hỏi dùng Was there...? nên câu trả lời cũng phải lặp lại cấu trúc there + be.🏗️ Cấu trúc: \nKhẳng định: S + was / were + ...\nPhủ định: S + wasn’t / weren’t + ...\nNghi ",
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
   "giai": "✅ Đáp án đúng: an\nCâu hoàn chỉnh: There is an onion on the basket.📘 Ngữ cảnh:\nBài yêu cầu: Circle the correct answer.\nCâu cần hoàn thành: There is ___ onion on the basket.\nChỗ trống cần một mạo từ đứng trước \"onion\".🏗️ Cấu trúc: Mạo từ đứng trước danh từ:\na + danh từ đếm được SỐ ÍT, bắt đầu bằng âm ",
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
   "giai": "✅ Đáp án đúng: their - John and Peter share their bedroom.📘 Ngữ cảnh: Chủ điểm: Tính từ sở hữu. Trước danh từ bedroom cần một từ chỉ của ai. Chủ ngữ John and Peter là hai người.🏗️ Cấu trúc: \nBài ôn tổng hợp - nhận diện chủ điểm trước khi chọn:\nThere is / are: is cho danh từ không đếm được và số ít |",
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
   "giai": "✅ Đáp án đúng: on - There is some tea and cakes on it.📘 Ngữ cảnh: Trà và bánh đặt chạm lên mặt bàn. Đại từ it thay cho the coffee table ở câu trước.🏗️ Cấu trúc: \nS + be + giới từ chỉ vị trí + danh từ\nSoi vào câu này: trà và bánh + on + mặt bàn\nBảng giới từ chỉ vị trí:\nin = bên TRONG (hồ, hộp, phòng)",
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
   "giai": "✅ Đáp án đúng: between - Annie’s school is between a museum and a park.📘 Ngữ cảnh: Chủ điểm: Giới từ vị trí. Câu nêu hai địa điểm: a museum and a park.🏗️ Cấu trúc: \nBài ôn tổng hợp - nhận diện chủ điểm trước khi chọn:\nMạo từ: a (phụ âm) - an (nguyên âm) - the (duy nhất / đã nhắc tới)\nSome / Any: som",
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
   "giai": "✅ Đáp án đúng: các hành động xảy ra liên tiếp trong quá khứ - He opened the door, walked in, and turned on the lights. = Anh ấy mở cửa, bước vào rồi bật đèn.📘 Ngữ cảnh: Câu có ba động từ nối tiếp (opened → walked → turned on) theo đúng trình tự.🏗️ Cấu trúc: \nThì quá khứ đơn dùng cho 3 trường hợp:\n1)",
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
   "giai": "✅ Đáp án đúng: Yes, it is. - Is that your ruler? Yes, it is. = Kia là thước kẻ của bạn phải không? - Đúng vậy.📘 Ngữ cảnh: Câu hỏi dùng that và hỏi về đồ vật nên trả lời ngắn dùng it.🏗️ Cấu trúc: \nS + like / love / hate + V-ing\nSoi vào câu này: (chủ ngữ) + like / love / hate + V-ing\nChủ ngữ he / she ",
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
   "giai": "✅ Đáp án đúng: doesn’t rain - It doesn’t rain a lot in the summer. = Trời không mưa nhiều vào mùa hè.📘 Ngữ cảnh: Chủ ngữ It dùng cho thời tiết và luôn ở số ít.🏗️ Cấu trúc: \nPhủ định: S + don’t / doesn’t + V (nguyên thể)\nNghi vấn: Do / Does + S + V (nguyên thể) ?\nSoi vào câu này: It + doesn’t + rain\n",
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
   "giai": "✅ Đáp án đúng: isn’t raining - Let’s go to the park. It isn’t raining at the moment.📘 Ngữ cảnh: Cụm at the moment là dấu hiệu hiện tại tiếp diễn. Chủ ngữ It dùng cho thời tiết.🏗️ Cấu trúc: \nHiện tại ĐƠN: S + V (-s / -es) → việc lặp đi lặp lại, sự thật\nHiện tại TIẾP DIỄN: S + am / is / are + V-ing → ",
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
   "giai": "✅ Đáp án đúng: some\nCâu hoàn chỉnh: Dad often drinks some beer with his friends.📘 Ngữ cảnh:\nBài yêu cầu: Circle the correct answer.\nCâu cần hoàn thành: Dad often drinks ___ beer with his friends.\nChỗ trống cần một mạo từ đứng trước \"beer\".🏗️ Cấu trúc: Mạo từ đứng trước danh từ:\na + danh từ đếm được ",
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
   "giai": "✅ Đáp án đúng: A: Present simple - động từ play📘 Ngữ cảnh: Trạng từ always (luôn luôn) cho biết đây là thói quen lặp đi lặp lại, không phải việc đang xảy ra.🏗️ Cấu trúc: \nHiện tại ĐƠN: S + V (-s / -es) → việc lặp đi lặp lại, sự thật\nHiện tại TIẾP DIỄN: S + am / is / are + V-ing → việc đang xảy ra lú",
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
   "giai": "✅ Đáp án đúng: They are cats. - What are these animals?📘 Ngữ cảnh: Từ để hỏi là What (cái gì) - hỏi về sự vật. Động từ trong câu hỏi là are vì these animals ở số nhiều.🏗️ Cấu trúc: \nTừ để hỏi + do / does / be + S + V ... ?\nSoi vào câu này: What + are + these animals ?\nBảng từ để hỏi:\nWhat = cái gì |",
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
   "giai": "✅ Đáp án đúng: plays - My brother plays with toy cars. = Anh trai tôi chơi với những chiếc ô tô đồ chơi.📘 Ngữ cảnh: Chủ ngữ My brother chỉ một người → số ít. Đây là câu khẳng định (không có dấu hiệu phủ định nào).🏗️ Cấu trúc: \nS + V (-s / -es) + O (thì hiện tại đơn)\nSoi vào câu này: My brother + pla",
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
   "giai": "✅ Đáp án đúng: so - Today is Sunday, so we aren’t going to school.📘 Ngữ cảnh: Chủ điểm: Liên từ. Vế đầu hôm nay là Chủ nhật là nguyên nhân, vế sau không đi học là kết quả.🏗️ Cấu trúc: \nBài ôn tổng hợp - nhận diện chủ điểm trước khi chọn:\nThere is / are: is cho danh từ không đếm được và số ít | are c",
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
   "giai": "✅ Đáp án đúng: Suki wrote back to her friend.📘 Ngữ cảnh: Bài viết liệt kê các việc theo đúng thứ tự: got an e-mail → went to talk to her mom → looked at the calendar → wrote back.🏗️ Cấu trúc: \nCách làm câu hỏi đọc hiểu suy luận:\n1) liệt kê các hành động trong bài theo đúng thứ tự\n2) với câu hỏi what",
   "huongDan": "Read and choose the correct answer.You’ve got mail!Suki got an e-mail from her friend, Annie. The e-mail made Suki happy. She went to talk to her mom. Then she ",
   "choices": [
    "",
    "",
    ""
   ]
  },
  {
   "noi": "One boy is wearing a long coat.",
   "dap": "",
   "giai": "✅ Đáp án đúng: No - One boy is wearing a long coat.📘 Ngữ cảnh: Câu nói có một bạn trai đang mặc áo khoác dài. Chú ý cụm a long coat.🏗️ Cấu trúc: \nĐối chiếu câu với tranh theo 3 bước:\n1. Ai / cái gì? → tìm đúng chủ ngữ trong tranh\n2. Đang làm gì? → xét động từ V-ing\n3. Ở đâu / như thế nào? → xét phần",
   "huongDan": "Look and read. Write Yes or No.",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "Anteaters climb trees using their .",
   "dap": "",
   "giai": "✅ Đáp án đúng: claws - Anteaters climb trees using their … .📘 Ngữ cảnh: Câu hỏi về bộ phận dùng để trèo cây. Bài viết Anteaters have sharp claws. They can climb trees.🏗️ Cấu trúc: \nCách làm bài đọc hiểu trắc nghiệm:\n1. Đọc câu hỏi, gạch chân từ khoá\n2. Tìm đúng câu chứa từ khoá đó trong bài\n3. So từ",
   "huongDan": "Read and choose the correct answer.AnteaterWhat animal likes to eat ants? An anteater, of course!Anteaters like swamps and forests. They live in South America. ",
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
   "giai": "✅ Đáp án đúng: Yes - The children are playing in a park.📘 Ngữ cảnh: Câu nói bọn trẻ đang chơi trong công viên. Cần kiểm tra cả hành động (playing) lẫn địa điểm (in a park) trên tranh.🏗️ Cấu trúc: \nĐối chiếu câu với tranh theo 3 bước:\n1. Ai / cái gì? → tìm đúng chủ ngữ trong tranh\n2. Đang làm gì? → x",
   "huongDan": "Look and read. Write Yes or No.",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "The pillow is behind the sofa.",
   "dap": "",
   "giai": "✅ Đáp án đúng: F - The pillow is behind the sofa.📘 Ngữ cảnh: Câu nói cái gối phía sau ghế sofa.🏗️ Cấu trúc: \nS + be + giới từ chỉ vị trí + danh từ\nSoi vào câu này: cái gối + behind + ghế sofa → KHÔNG khớp với tranh → F\nBảng giới từ chỉ vị trí:\nin = bên TRONG (hồ, hộp, phòng) | on = TRÊN và có CHẠM b",
   "huongDan": "Look at the picture. Write T (true) or F (false).",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "My sister drinks milk for breakfast.",
   "dap": "",
   "giai": "✅ Đáp án đúng: often - My sister often drinks milk for breakfast. = Chị tôi thường uống sữa vào bữa sáng.📘 Ngữ cảnh: Biểu đồ cho thấy mức khoảng 70% - thường xuyên nhưng chưa tới mức usually.🏗️ Cấu trúc: \nS + trạng từ tần suất + V (động từ thường)\nS + be + trạng từ tần suất (đứng SAU be)\nSoi vào câu",
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
   "giai": "✅ Đáp án đúng: do - Where do Kyle and his mom live?📘 Ngữ cảnh: Sau chỗ trống là động từ thường live. Chủ ngữ Kyle and his mom gồm hai người nối bằng and → số nhiều.🏗️ Cấu trúc: \nPhủ định: S + don’t / doesn’t + V (nguyên thể)\nNghi vấn: Do / Does + S + V (nguyên thể) ?\nSoi vào câu này: Kyle and his mo",
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
   "giai": "✅ Đáp án đúng: Those - Those are her dad’s cars. = Kia là những chiếc ô tô của bố cô ấy.📘 Ngữ cảnh: Chỗ trống ở đầu câu, đi với động từ are và danh từ cars ở số nhiều.🏗️ Cấu trúc: \nThis / That + is + danh từ SỐ ÍT\nThese / Those + are + danh từ SỐ NHIỀU\nthis / these = ở gần | that / those = ở xa\nSoi ",
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
   "giai": "✅ Đáp án đúng: They aren’t\nCâu hoàn chỉnh: They aren’t foxes. They are cats.📘 Ngữ cảnh:\nBài yêu cầu: Choose the correct answer.\nCâu cần hoàn thành: ___ foxes. They are cats.\nChỗ trống cần There + to be. Danh từ theo sau là \"foxes\" - đây là danh từ số nhiều.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng",
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
   "giai": "✅ Đáp án đúng: No, she doesn't.📘 Ngữ cảnh: Trả lời ngắn cho câu hỏi \"Does ... ?\".🏗️ Cấu trúc: Trả lời ngắn cho câu hỏi với Does:\nYes, he/she/it + does. / No, he/she/it + doesn't.\nVí dụ: Does she work here? – Yes, she does. / No, she doesn't.🔍 Giải thích chi tiết: Câu hỏi bắt đầu bằng \"Does your sist",
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
   "giai": "✅ Đáp án đúng: This is my mother.📘 Ngữ cảnh: Tìm câu mà \"is\" (dạng số ít) điền vào hợp lý.🏗️ Cấu trúc: \"is\" dùng cho chủ ngữ số ít: He/She/It + is; This/That + is.\n\"are\" dùng cho số nhiều: We/You/They + are; These/Those + are.\nVí dụ: This is my book. / These are my books.🔍 Giải thích chi tiết: \"is\" ",
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
   "giai": "✅ Đáp án đúng: writing - He likes (6) writing emails in English for practice. = Cậu ấy thích viết email bằng tiếng Anh để luyện tập.📘 Ngữ cảnh: Cả ba lựa chọn đều đã đúng dạng V-ing, nên phải chọn theo nghĩa: động từ nào đi được với danh từ emails?🏗️ Cấu trúc: \nS + like / love / hate + V-ing\nSoi vào",
   "huongDan": "Read about Luciano and circle the correct answer.Luciano is thirteen years old and he lives in Rome. He’s very good at making friends and telling jokes. He (1) ",
   "choices": [
    "",
    "",
    ""
   ]
  },
  {
   "noi": "She two brothers.",
   "dap": "",
   "giai": "✅ Đáp án đúng: has (câu 2)📘 Ngữ cảnh: Ở câu She … two brothers., chủ ngữ She dùng has.🏗️ Cấu trúc: \nhave / has ở hiện tại đơn:\nI / you / we / they → have he / she / it → has\nPhủ định: don’t have doesn’t have (sau doesn’t dùng have, không dùng has)\nCâu hỏi: Do + I/you/we/they + have…? Does + he/she/i",
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
   "giai": "✅ Đáp án đúng: because it has tunnels to dig - Why should you never step on or hurt a millipede?📘 Ngữ cảnh: Câu hỏi Why hỏi lý do. Bài viết Never step on or hurt a millipede. It has places to go and tunnels to dig!🏗️ Cấu trúc: \nCách làm bài đọc hiểu trắc nghiệm:\n1. Đọc câu hỏi, gạch chân từ khoá\n2. ",
   "huongDan": "Read the story and answer the questions.MillipedesThe millipede is small but strong. It can have between 80 and 400 legs!Millipedes walk slowly, but they can di",
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
   "giai": "✅ Đáp án đúng: Countable (C)📘 Ngữ cảnh: Xếp loại danh từ television.🏗️ Cấu trúc:Đếm được (C)đếm được 1, 2, 3 và có số nhiều.Không đếm được (U)chất lỏng, thịt, đá, bột - phải đong bằng cốc, lát, cân.🔍 Giải thích chi tiết: television đếm được: two televisions nên là danh từ đếm được. Vì vậy đáp án là:",
   "huongDan": "Look at the word list. Put them into two groups: countable nouns (C) or uncountable nouns (U).",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "you and your dad →",
   "dap": "",
   "giai": "✅ Đáp án đúng: You\nCâu hoàn chỉnh: you and your dad → You📘 Ngữ cảnh:\nBài yêu cầu: Write the suitable pronoun for each noun.\nCâu cần hoàn thành: you and your dad → ___\nChỗ trống cần một đại từ thay cho \"you and your dad\".🏗️ Cấu trúc: Đại từ nhân xưng thay cho danh từ đã nhắc tới, khỏi phải lặp lại:\nI",
   "huongDan": "Write the suitable pronoun for each noun.",
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
   "noi": "We play under big tree near the house.",
   "dap": "",
   "giai": "✅ Đáp án đúng: Countable📘 Ngữ cảnh: Xét danh từ trong câu: \"We play under a big tree near the house.\"🏗️ Cấu trúc:Đếm đượcđếm được 1, 2, 3 và có số nhiều (apple -> apples).Không đếm đượcchất lỏng, bột, thức ăn cắt lát - không đếm bằng số, không có số nhiều.🔍 Giải thích chi tiết: tree đếm được: nói đư",
   "huongDan": "Is the noun in each sentence countable or uncountable?",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "aren’t tall trees.",
   "dap": "",
   "giai": "✅ Đáp án đúng: Those - Those aren’t tall trees. = Kia không phải là những cây cao.📘 Ngữ cảnh: Động từ là aren’t và danh từ trees ở số nhiều.🏗️ Cấu trúc: \nS + like / love / hate + V-ing\nSoi vào câu này: (chủ ngữ) + like / love / hate + V-ing\nChủ ngữ he / she / it và danh từ số ít → động từ cảm xúc th",
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
   "giai": "✅ Đáp án đúng: doesn’t have📘 Ngữ cảnh: Câu nói về khu vườn kia. Chủ ngữ là một khu vườn, tức là số ít.🏗️ Cấu trúc:it + doesn’t haveVí dụ: That garden doesn’t have beautiful flowers.🔍 Giải thích chi tiết: That garden là một khu vườn nên thuộc nhóm it, phải dùng doesn’t. Đáp án have thiếu phần phủ địn",
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
   "giai": "✅ Đáp án đúng: Is Ox hiding in the bushes📘 Ngữ cảnh: Câu trả lời No, he isn’t cho biết câu hỏi phải dùng động từ be ở dạng số ít (is), chủ ngữ là Ox.🏗️ Cấu trúc: \nKhẳng định: S + am / is / are + V-ing + ...\nPhủ định: S + am / is / are + not + V-ing + ...\nNghi vấn: Am / Is / Are + S + V-ing ... ?\nSoi",
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
   "giai": "✅ Đáp án đúng: There is📘 Ngữ cảnh: Nói có gì ở đâu, danh từ là an orange computer.🏗️ Cấu trúc:There is + danh từ số ít hoặc không đếm được.There are + danh từ số nhiều.🔍 Giải thích chi tiết: an orange computer là số ít nên dùng There is. Vì vậy câu đúng là: There is an orange computer in her bedroom",
   "huongDan": "Circle the correct answer.",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "The food very good, but the drink was nice.",
   "dap": "",
   "giai": "✅ Đáp án đúng: wasn’t - The food wasn’t very good, but the drink was nice. = Món ăn không ngon lắm, nhưng đồ uống thì ngon.📘 Ngữ cảnh: Chữ but nối hai vế trái dấu: vế sau khen đồ uống was nice → vế trước phải chê món ăn.🏗️ Cấu trúc: \nKhẳng định: S + was / were + ...\nPhủ định: S + wasn’t / weren’t + ",
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
   "giai": "✅ Đáp án đúng: am doing - I am doing my homework now, so I can’t go out.📘 Ngữ cảnh: Từ now là dấu hiệu hiện tại tiếp diễn. Chủ ngữ là I.🏗️ Cấu trúc: \nHiện tại ĐƠN: S + V (-s / -es) → việc lặp đi lặp lại, sự thật\nHiện tại TIẾP DIỄN: S + am / is / are + V-ing → việc đang xảy ra lúc này\nBảng dấu hiệu n",
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
   "giai": "✅ Đáp án đúng: Are you\nCâu hoàn chỉnh: Are you students? / Yes, we are.📘 Ngữ cảnh:\nBài yêu cầu: Choose the correct answer.\nCâu cần hoàn thành: ___ students? / Yes, we are.\nChỗ trống cần There + to be. Danh từ theo sau là \"students\" - đây là danh từ số nhiều.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùn",
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
   "giai": "✅ Đáp án đúng: Did - wash - A: Did - wash you … the dishes after dinner? B: Yes, I did. = Bạn có rửa bát sau bữa tối không? - Có.📘 Ngữ cảnh: Câu trả lời cho sẵn là Yes, I did → câu hỏi phải dùng Did.🏗️ Cấu trúc: \nPhủ định: S + didn’t + V (nguyên thể)\nNghi vấn: Did + S + V (nguyên thể) ?\nSoi vào câu ",
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
   "giai": "✅ Đáp án đúng: the coolest - Ann: Yes, but it’s also the coolest T-shirt in the shop. = Ann: Đúng vậy, nhưng nó cũng là chiếc áo ngầu nhất trong cửa hàng.📘 Ngữ cảnh: Câu cũng có in the shop nên vẫn là so sánh nhất, lần này với tính từ cool - tính từ ngắn.🏗️ Cấu trúc: \nA + be + the + tính từ so sánh ",
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
   "giai": "✅ Đáp án đúng: No - The boy with the glasses is looking at the computer.📘 Ngữ cảnh: Cụm with the glasses dùng để chỉ đúng bạn nào - phải tìm bạn đeo kính trước rồi mới xét hành động.🏗️ Cấu trúc: \nĐối chiếu câu với tranh theo 3 bước:\n1. Ai / cái gì? → tìm đúng chủ ngữ trong tranh\n2. Đang làm gì / thế",
   "huongDan": "Look and read. Write Yes or No.",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "We need sugar to make the cake.",
   "dap": "",
   "giai": "✅ Đáp án đúng: Uncountable📘 Ngữ cảnh: Xét danh từ trong câu: \"We need some sugar to make the cake.\"🏗️ Cấu trúc:Đếm đượcđếm được 1, 2, 3 và có số nhiều (apple -> apples).Không đếm đượcchất lỏng, bột, thức ăn cắt lát - không đếm bằng số, không có số nhiều.🔍 Giải thích chi tiết: sugar không đếm được: k",
   "huongDan": "Is the noun in each sentence countable or uncountable?",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "Dax and Fluffy were in the living room at 8. They weren’t in the park.",
   "dap": "",
   "giai": "✅ Đáp án đúng: True - Dax and Fluffy were in the living room at 8. They weren’t in the park.📘 Ngữ cảnh: Bảng cho biết lúc 8 giờ Dax và Fluffy ở in the living room; in the park là chỗ của chúng lúc 4 giờ.🏗️ Cấu trúc: \nKhẳng định: S + was / were + ...\nPhủ định: S + wasn’t / weren’t + ...\nNghi vấn: Was",
   "huongDan": "Look at the table and write T (True) or F (False).Where were they on Saturday?Ted: at 4.00 in his room | at 6.00 in the garage | at 8.00 at the cinemaDax and Fl",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "I see old picture on the wall.",
   "dap": "",
   "giai": "✅ Đáp án đúng: an\nCâu hoàn chỉnh: I see an old picture on the wall.📘 Ngữ cảnh:\nBài yêu cầu: Circle the correct answer.\nCâu cần hoàn thành: I see ___ old picture on the wall.\nChỗ trống cần một mạo từ đứng trước \"old\" (cả cụm là \"old picture\").🏗️ Cấu trúc: Mạo từ đứng trước danh từ:\na + danh từ đếm đư",
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
   "giai": "✅ Đáp án đúng: watchs → watches - câu đúng: Tim watches TV with his sister after school. = Tim xem TV cùng chị gái sau giờ học.📘 Ngữ cảnh: Câu khẳng định với chủ ngữ Tim (số ít) nên động từ phải thêm đuôi - nhưng câu viết là watchs, sai chính tả.🏗️ Cấu trúc: \nS + V (-s / -es) + O (thì hiện tại đơn)\n",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "He is funnyer than his brother.",
   "dap": "funnyer",
   "giai": "✅ Đáp án đúng: funnyer → funnier - câu đúng: He is funnier than his brother. = Cậu ấy hài hước hơn anh trai mình.📘 Ngữ cảnh: Câu so sánh hơn dùng tính từ funny. Dạng so sánh viết là funnyer - vẫn giữ nguyên chữ y.🏗️ Cấu trúc: \nA + be + tính từ so sánh hơn + than + B\nSoi vào câu này: He + is + funnie",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Does Sophie and Ruby study English at school?",
   "dap": "Does",
   "giai": "✅ Đáp án đúng: Does → Do - câu đúng: Do Sophie and Ruby study English at school? = Sophie và Ruby có học tiếng Anh ở trường không?📘 Ngữ cảnh: Chủ ngữ Sophie and Ruby gồm hai người nối bằng and → số nhiều, nhưng câu hỏi lại mở đầu bằng Does.🏗️ Cấu trúc: \nPhủ định: S + don’t / doesn’t + V (nguyên thể)",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Sarah wanted to go to the movies, so Sam wanted to go to the park.",
   "dap": "so",
   "giai": "✅ Đáp án đúng: so → but - Sarah wanted to go to the movies, but Sam wanted to go to the park.📘 Ngữ cảnh: Sarah muốn đi xem phim, còn Sam muốn đi công viên - hai ý muốn khác nhau.🏗️ Cấu trúc: \nvế 1 + liên từ + vế 2\nSoi vào câu này: Sarah wanted to go to the movies, so Sam wanted to go to the park.\nsử",
   "huongDan": "Underline the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Do James have a pretty painting?",
   "dap": "Do",
   "giai": "✅ Đáp án đúng: Do → Does - câu đúng: Does James have a pretty painting? = James có một bức tranh đẹp không?📘 Ngữ cảnh: Chủ ngữ James là tên riêng của một người → số ít ngôi 3, nhưng câu lại dùng Do.🏗️ Cấu trúc: \nS + have / has + O\nSoi vào câu này: Does James + have + a pretty painting\nBảng chia:\nI -",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Mom is more busy than Dad.",
   "dap": "more busy",
   "giai": "✅ Đáp án đúng: more busy → busier - câu đúng: Mom is busier than Dad. = Mẹ bận hơn bố.📘 Ngữ cảnh: Câu so sánh hơn dùng tính từ busy. Câu dùng more như với tính từ dài, nhưng busy lại là tính từ ngắn.🏗️ Cấu trúc: \nA + be + tính từ so sánh hơn + than + B\nSoi vào câu này: Mom + is + busier + than + Dad",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Her birthday is in April 24.",
   "dap": "in",
   "giai": "✅ Đáp án đúng: in → on - Her birthday is on April 24.📘 Ngữ cảnh: Cụm April 24 là một ngày cụ thể (có cả tháng và số ngày).🏗️ Cấu trúc: \nin / on / at + cụm chỉ thời gian\nSoi vào câu này: Her birthday is in April 24.\nphần sau giới từ là ngày cụ thể → sửa in thành on\nBảng chọn giới từ - nhìn từ đứng SA",
   "huongDan": "Underline the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "My new neighbor not friendly.",
   "dap": "not",
   "giai": "✅ Đáp án đúng: not → isn’t - câu đúng: My new neighbor isn’t friendly. = Người hàng xóm mới của tôi không thân thiện.📘 Ngữ cảnh: Câu này thiếu hẳn động từ be: chỉ có chủ ngữ My new neighbor, rồi tới thẳng not friendly.🏗️ Cấu trúc: \nKhẳng định: S + be + ...\nPhủ định: S + be + not + ...\nNghi vấn: Be +",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "They are waiting on front of the restaurant.",
   "dap": "on",
   "giai": "✅ Đáp án đúng: on → in - They are waiting in front of the restaurant.📘 Ngữ cảnh: Cụm chỉ vị trí \"phía trước\" là một cụm cố định gồm 3 từ.🏗️ Cấu trúc: \nin / on / at + cụm chỉ thời gian\nSoi vào câu này: They are waiting on front of the restaurant.\nphần sau giới từ là cụm cố định in front of → sửa on t",
   "huongDan": "Underline the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Is she go to school by bus every day?",
   "dap": "Is",
   "giai": "✅ Đáp án đúng: Is → Does📘 Ngữ cảnh: Cụm every day là dấu hiệu thói quen → hiện tại đơn, và động từ go đang ở nguyên thể.🏗️ Cấu trúc: \nHiện tại ĐƠN: S + V (-s / -es) → việc lặp đi lặp lại, sự thật\nHiện tại TIẾP DIỄN: S + am / is / are + V-ing → việc đang xảy ra lúc này\nBảng dấu hiệu nhận biết:\nĐƠN: e",
   "huongDan": "Find the mistake in each of the sentences and correct it.",
   "choices": []
  },
  {
   "noi": "Is the bus slowwing down at the moment?",
   "dap": "slowwing",
   "giai": "✅ Đáp án đúng: slowwing → slowing (lỗi: gấp đôi thừa)📘 Ngữ cảnh: Cụm at the moment xác nhận thì đúng rồi, câu hỏi cũng đảo Is đúng chỗ → lỗi ở chính tả đuôi -ing.🏗️ Cấu trúc: \nKhẳng định: S + am / is / are + V-ing + ...\nPhủ định: S + am / is / are + not + V-ing + ...\nNghi vấn: Am / Is / Are + S + V-",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Can you see a baby at the desk? He is cute.",
   "dap": "a",
   "giai": "✅ Đáp án đúng: sửa \"a\" thành \"the\"\nCâu đúng: Can you see the baby at the desk? He is cute.📘 Ngữ cảnh:\nBài yêu cầu: Find and correct the mistake in each of the sentences.\nCâu đã cho: Can you see a baby at the desk? He is cute.\nViệc cần làm: tìm đúng MỘT chỗ sai trong câu rồi sửa lại.🏗️ Cấu trúc: Mạo ",
   "huongDan": "Find and correct the mistake in each of the sentences.",
   "choices": []
  },
  {
   "noi": "Can you playing soccer?",
   "dap": "playing",
   "giai": "✅ Đáp án đúng: playing → play - câu đúng: Can you play soccer? = Bạn chơi bóng đá được không?📘 Ngữ cảnh: Câu hỏi với Can nhưng động từ lại ở dạng -ing.🏗️ Cấu trúc: \nS + like / love / hate + V-ing\nSoi vào câu này: (chủ ngữ) + like / love / hate + V-ing\nChủ ngữ he / she / it và danh từ số ít → động từ",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "James and Annie often go jogging on the morning.",
   "dap": "on",
   "giai": "✅ Đáp án đúng: on → in - James and Annie often go jogging in the morning.📘 Ngữ cảnh: Cụm the morning là một buổi trong ngày.🏗️ Cấu trúc: \nin / on / at + cụm chỉ thời gian\nSoi vào câu này: James and Annie often go jogging on the morning.\nphần sau giới từ là buổi trong ngày → sửa on thành in\nBảng chọn",
   "huongDan": "Underline the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Our children is happy.",
   "dap": "is",
   "giai": "✅ Đáp án đúng: is → are - câu đúng: Our children are happy. = Các con của chúng tôi rất vui.📘 Ngữ cảnh: Chủ ngữ Our children ở số nhiều (children là số nhiều bất quy tắc của child) nhưng động từ lại là is.🏗️ Cấu trúc: \nKhẳng định: S + be + ...\nPhủ định: S + be + not + ...\nNghi vấn: Be + S + ...?\nSoi",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "My computer are faster than your computer.",
   "dap": "are",
   "giai": "✅ Đáp án đúng: are → is - câu đúng: My computer is faster than your computer. = Máy tính của tôi nhanh hơn máy tính của bạn.📘 Ngữ cảnh: Lỗi không nằm ở dạng so sánh (faster than đã đúng) mà ở động từ: chủ ngữ My computer ở số ít nhưng dùng are.🏗️ Cấu trúc: \nA + be + tính từ so sánh hơn + than + B\nSo",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Dan went to the supermarket and forgot his wallet.",
   "dap": "and",
   "giai": "✅ Đáp án đúng: and → but - Dan went to the supermarket but forgot his wallet.📘 Ngữ cảnh: Dan đã đến siêu thị nhưng quên ví - đây là sự cố ngoài ý muốn, không phải việc làm tiếp theo.🏗️ Cấu trúc: \nvế 1 + liên từ + vế 2\nSoi vào câu này: Dan went to the supermarket and forgot his wallet.\nsửa and thành ",
   "huongDan": "Underline the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "He’s the goodest Dad in the world.",
   "dap": "goodest",
   "giai": "✅ Đáp án đúng: goodest → best - câu đúng: He’s the best Dad in the world. = Anh ấy là người bố tuyệt nhất trên đời.📘 Ngữ cảnh: Câu dùng tính từ good với đuôi -est, nhưng good là tính từ bất quy tắc.🏗️ Cấu trúc: \nA + be + the + tính từ so sánh nhất + in / of + phạm vi\nSoi vào câu này: He + is + the b",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Ann is a honest girl.",
   "dap": "a",
   "giai": "✅ Đáp án đúng: sửa \"a\" thành \"an\"\nCâu đúng: Ann is an honest girl.📘 Ngữ cảnh:\nBài yêu cầu: Find the mistake in each sentence and correct it.\nCâu đã cho: Ann is a honest girl.\nViệc cần làm: tìm đúng MỘT chỗ sai trong câu rồi sửa lại.🏗️ Cấu trúc: Mạo từ đứng trước danh từ:\na + danh từ đếm được SỐ ÍT, ",
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
   "giai": "✅ Đáp án đúng: write → writing - câu đúng: Does she like writing letters? = Cô ấy có thích viết thư không?📘 Ngữ cảnh: Câu hỏi đã đúng phần Does she like, nhưng động từ sau like vẫn ở nguyên thể.🏗️ Cấu trúc: \nS + like / love / hate + V-ing\nSoi vào câu này: Does she + like + writing + letters\nChủ ngữ ",
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
   "giai": "✅ Đáp án đúng: have → has - câu đúng: My town has four primary schools. = Thị trấn của tôi có bốn trường tiểu học.📘 Ngữ cảnh: Chủ ngữ My town là danh từ số ít (một thị trấn) nhưng động từ lại là have.🏗️ Cấu trúc: \nS + have / has + O\nSoi vào câu này: My town + has + four primary schools\nBảng chia:\nI ",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Are there some books in the bag?",
   "dap": "some",
   "giai": "✅ Đáp án đúng: sửa \"some\" thành \"any\"\nCâu đúng: Are there any books in the bag?📘 Ngữ cảnh:\nBài yêu cầu: Find the mistake in each sentence and correct it.\nCâu đã cho: Are there some books in the bag?\nViệc cần làm: tìm đúng MỘT chỗ sai trong câu rồi sửa lại.🏗️ Cấu trúc: Mạo từ đứng trước danh từ:\na + ",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Her dad get up at 6 o’clock every morning.",
   "dap": "get up",
   "giai": "✅ Đáp án đúng: get up → gets up - câu đúng: Her dad gets up at 6 o’clock every morning. = Bố cô ấy dậy lúc 6 giờ mỗi sáng.📘 Ngữ cảnh: Chủ ngữ Her dad chỉ một người → số ít, và đây là câu khẳng định nên động từ phải thêm đuôi - nhưng câu lại để nguyên thể.🏗️ Cấu trúc: \nS + V (-s / -es) + O (thì hiện ",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Is they your cousins?",
   "dap": "Is",
   "giai": "✅ Đáp án đúng: Is → Are - câu đúng: Are they your cousins? = Họ là anh chị em họ của bạn phải không?📘 Ngữ cảnh: Chủ ngữ they luôn ở số nhiều nhưng câu hỏi lại mở đầu bằng Is - dạng của số ít.🏗️ Cấu trúc: \nKhẳng định: S + be + ...\nPhủ định: S + be + not + ...\nNghi vấn: Be + S + ...?\nSoi vào câu này: ",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Have you got any homework? Yes, I do.",
   "dap": "do",
   "giai": "✅ Đáp án đúng: do → have - câu đúng: Have you got any homework? Yes, I have. = Bạn có bài tập về nhà không? - Có.📘 Ngữ cảnh: Câu hỏi dùng Have ... got? nhưng câu trả lời lại dùng do của cấu trúc have.🏗️ Cấu trúc: \nS + have / has + O\nSoi vào câu này: Have you got any homework? Yes, I have + have / ha",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Was Ted and you in the laboratory yesterday afternoon?",
   "dap": "Was",
   "giai": "✅ Đáp án đúng: Was → Were - câu đúng: Were Ted and you in the laboratory yesterday afternoon? = Ted và bạn có ở phòng thí nghiệm chiều qua không?📘 Ngữ cảnh: Chủ ngữ Ted and you gồm hai người nối bằng and → số nhiều, nhưng câu hỏi lại mở đầu bằng Was.🏗️ Cấu trúc: \nKhẳng định: S + was / were + ...\nPhủ",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "The man isn’tn my teacher.",
   "dap": "isn’tn",
   "giai": "✅ Đáp án đúng: sửa isn’tn thành isn’t\nCâu đúng: The man isn’t my teacher.📘 Ngữ cảnh: Yêu cầu của phần này: gạch chân chỗ sai trong câu rồi sửa lại cho đúng. Câu đã cho: The man isn’tn my teacher. Chủ ngữ The man là danh từ số ít nên to be là is. Chỗ sai ở đây là lỗi CHÍNH TẢ của dạng phủ định.🏗️ Cấu",
   "huongDan": "Underline the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "My mom and I was in the supermarket two weeks ago.",
   "dap": "was",
   "giai": "✅ Đáp án đúng: was → were - câu đúng: My mom and I were in the supermarket two weeks ago. = Mẹ và tôi đã ở siêu thị cách đây hai tuần.📘 Ngữ cảnh: Chủ ngữ My mom and I gồm hai người → số nhiều, nhưng câu dùng was.🏗️ Cấu trúc: \nKhẳng định: S + was / were + ...\nPhủ định: S + wasn’t / weren’t + ...\nNghi",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "They doesn’t like doing the housework.",
   "dap": "doesn’t",
   "giai": "✅ Đáp án đúng: doesn’t → don’t - câu đúng: They don’t like doing the housework. = Họ không thích làm việc nhà.📘 Ngữ cảnh: Chủ ngữ They ở số nhiều nhưng câu dùng doesn’t - trợ động từ dành cho số ít ngôi 3.🏗️ Cấu trúc: \nS + like / love / hate + V-ing\nSoi vào câu này: They + don’t like + doing + the h",
   "huongDan": "Find and correct the mistake in each sentence.",
   "choices": []
  },
  {
   "noi": "Sarah bought a new dress but went to the party.",
   "dap": "but",
   "giai": "✅ Đáp án đúng: but → and - Sarah bought a new dress and went to the party.📘 Ngữ cảnh: Sarah mua váy mới rồi đi dự tiệc - hai việc cùng chiều, việc trước phục vụ việc sau.🏗️ Cấu trúc: \nvế 1 + liên từ + vế 2\nSoi vào câu này: Sarah bought a new dress but went to the party.\nsửa but thành and\nBảng 4 liên",
   "huongDan": "Underline the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Look! The zoo-keepers train a big elephant.",
   "dap": "train",
   "giai": "✅ Đáp án đúng: train → are training (lỗi: thiếu cả be lẫn -ing)📘 Ngữ cảnh: Từ Look! ở đầu câu là dấu hiệu bắt buộc dùng hiện tại tiếp diễn, nhưng động từ train đang ở dạng hiện tại đơn.🏗️ Cấu trúc: \nKhẳng định: S + am / is / are + V-ing + ...\nPhủ định: S + am / is / are + not + V-ing + ...\nNghi vấn:",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "My brother has the doll. The doll is pretty.",
   "dap": "the",
   "giai": "✅ Đáp án đúng: the -> a📘 Ngữ cảnh: Nói về búp bê của anh trai: \"Anh trai tôi có một con búp bê. Con búp bê đó xinh.\"🏗️ Cấu trúc:Nhắc lần ĐẦUa + danh từ số ít.Trước ÂM phụ âmdùng a (a doll).🔍 Giải thích chi tiết: Câu đầu nhắc con búp bê lần đầu nên phải dùng a, không dùng the. doll bắt đầu bằng âm ph",
   "huongDan": "Find the mistake and correct it.",
   "choices": []
  },
  {
   "noi": "Last night I sleept for 10 hours.",
   "dap": "sleept",
   "giai": "✅ Đáp án đúng: sleept → slept - câu đúng: Last night I slept for 10 hours. = Tối qua tôi đã ngủ 10 tiếng.📘 Ngữ cảnh: Cụm Last night cho biết quá khứ. Người viết đã cố chia quá khứ nhưng sai chính tả.🏗️ Cấu trúc: \nS + V2 (cột 2 - quá khứ) + O (động từ BẤT QUY TẮC)\nSoi vào câu này: sleep → slept\nĐộng ",
   "huongDan": "Underline the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "What are you like doing at the weekend?",
   "dap": "are",
   "giai": "✅ Đáp án đúng: are → do - câu đúng: What do you like doing at the weekend? = Bạn thích làm gì vào cuối tuần?📘 Ngữ cảnh: Câu hỏi dùng động từ like - đây là động từ thường, nhưng câu lại dùng trợ động từ are của động từ be.🏗️ Cấu trúc: \nS + like / love / hate + V-ing\nSoi vào câu này: you + like + doin",
   "huongDan": "Find and correct the mistake in each sentence.",
   "choices": []
  },
  {
   "noi": "Look at a boy! He has a ball.",
   "dap": "a",
   "giai": "✅ Đáp án đúng: sửa \"a\" thành \"the\"\nCâu đúng: Look at the boy! He has a ball.📘 Ngữ cảnh:\nBài yêu cầu: Find and correct the mistake in each of the sentences.\nCâu đã cho: Look at a boy! He has a ball.\nViệc cần làm: tìm đúng MỘT chỗ sai trong câu rồi sửa lại.🏗️ Cấu trúc: Mạo từ đứng trước danh từ:\na + d",
   "huongDan": "Find and correct the mistake in each of the sentences.",
   "choices": []
  },
  {
   "noi": "Tammy is goes to the cinema every Saturday.",
   "dap": "is goes",
   "giai": "✅ Đáp án đúng: is goes → goes - câu đúng: Tammy goes to the cinema every Saturday. = Tammy đi xem phim vào mỗi thứ Bảy.📘 Ngữ cảnh: Câu có hai động từ đứng cạnh nhau: is (động từ be) và goes (động từ thường). Một câu khẳng định ở hiện tại đơn chỉ cần một động từ.🏗️ Cấu trúc: \nS + V (-s / -es) + O (th",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "He isn’t understand the lesson.",
   "dap": "isn’t understand",
   "giai": "✅ Đáp án đúng: isn’t understand → doesn’t understand📘 Ngữ cảnh: Động từ understand (hiểu) diễn tả trạng thái nhận thức, luôn dùng hiện tại đơn, không dùng tiếp diễn.🏗️ Cấu trúc: \nHiện tại ĐƠN: S + V (-s / -es) → việc lặp đi lặp lại, sự thật\nHiện tại TIẾP DIỄN: S + am / is / are + V-ing → việc đang x",
   "huongDan": "Find the mistake in each of the sentences and correct it.",
   "choices": []
  },
  {
   "noi": "Ann is often reads books at night.",
   "dap": "is often",
   "giai": "✅ Đáp án đúng: is often → often - câu đúng: Ann often reads books at night. = Ann thường đọc sách vào buổi tối.📘 Ngữ cảnh: Câu có hai động từ cùng lúc: is (động từ be) và reads (động từ thường). Một câu ở thì hiện tại đơn chỉ cần một động từ.🏗️ Cấu trúc: \nS + trạng từ tần suất + V (động từ thường)\nS",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "He is the most smartest student in the class.",
   "dap": "most smartest",
   "giai": "✅ Đáp án đúng: most smartest → smartest - câu đúng: He is the smartest student in the class. = Cậu ấy là học sinh thông minh nhất lớp.📘 Ngữ cảnh: Câu dùng cả most lẫn đuôi -est (most smartest) - cũng là lỗi so sánh kép, lần này ở dạng nhất.🏗️ Cấu trúc: \nA + be + the + tính từ so sánh nhất + in / of ",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Look! The baby cries in his room.",
   "dap": "cries",
   "giai": "✅ Đáp án đúng: cries → is crying📘 Ngữ cảnh: Từ Look! báo hiệu việc đang xảy ra trước mắt → phải dùng hiện tại tiếp diễn.🏗️ Cấu trúc: \nHiện tại ĐƠN: S + V (-s / -es) → việc lặp đi lặp lại, sự thật\nHiện tại TIẾP DIỄN: S + am / is / are + V-ing → việc đang xảy ra lúc này\nBảng dấu hiệu nhận biết:\nĐƠN: e",
   "huongDan": "Find the mistake in each of the sentences and correct it.",
   "choices": []
  },
  {
   "noi": "We isn’t ready for the test.",
   "dap": "isn’t",
   "giai": "✅ Đáp án đúng: isn’t → aren’t - câu đúng: We aren’t ready for the test. = Chúng tôi chưa sẵn sàng cho bài kiểm tra.📘 Ngữ cảnh: Chủ ngữ We luôn ở số nhiều nhưng câu lại dùng isn’t - dạng của số ít.🏗️ Cấu trúc: \nKhẳng định: S + be + ...\nPhủ định: S + be + not + ...\nNghi vấn: Be + S + ...?\nSoi vào câu ",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "My mom don’t like cooking.",
   "dap": "don’t",
   "giai": "✅ Đáp án đúng: don’t → doesn’t - câu đúng: My mom doesn’t like cooking. = Mẹ tôi không thích nấu ăn.📘 Ngữ cảnh: Chủ ngữ My mom chỉ một người → số ít, nhưng câu lại dùng don’t.🏗️ Cấu trúc: \nPhủ định: S + don’t / doesn’t + V (nguyên thể)\nNghi vấn: Do / Does + S + V (nguyên thể) ?\nSoi vào câu này: My m",
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
   "giai": "✅ Đáp án đúng: puting → putting (lỗi: quên gấp đôi phụ âm)📘 Ngữ cảnh: Câu đã có đủ are và đuôi -ing, nên lỗi ở cách viết đuôi -ing.🏗️ Cấu trúc: \nKhẳng định: S + am / is / are + V-ing + ...\nPhủ định: S + am / is / are + not + V-ing + ...\nNghi vấn: Am / Is / Are + S + V-ing ... ?\nSoi vào câu này: The ",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "We are waveing to our friends at the airport.",
   "dap": "waveing",
   "giai": "✅ Đáp án đúng: waveing → waving (lỗi: thêm -ing sai chính tả)📘 Ngữ cảnh: Câu đã có đủ are và động từ dạng -ing, nên lỗi nằm ở cách viết đuôi -ing.🏗️ Cấu trúc: \nKhẳng định: S + am / is / are + V-ing + ...\nPhủ định: S + am / is / are + not + V-ing + ...\nNghi vấn: Am / Is / Are + S + V-ing ... ?\nSoi và",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Where was your classmates yesterday?",
   "dap": "was",
   "giai": "✅ Đáp án đúng: was → were - câu đúng: Where were your classmates yesterday? = Các bạn cùng lớp của bạn đã ở đâu hôm qua?📘 Ngữ cảnh: Chủ ngữ your classmates có đuôi -s → số nhiều, nhưng câu dùng was.🏗️ Cấu trúc: \nKhẳng định: S + was / were + ...\nPhủ định: S + wasn’t / weren’t + ...\nNghi vấn: Was / We",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Foxes isn’t in the cage.",
   "dap": "isn’t",
   "giai": "✅ Đáp án đúng: sửa isn’t thành aren’t\nCâu đúng: Foxes aren’t in the cage.📘 Ngữ cảnh: Yêu cầu của phần này: gạch chân chỗ sai trong câu rồi sửa lại cho đúng. Câu đã cho: Foxes isn’t in the cage. Chủ ngữ là Foxes - danh từ có đuôi -es nên là số nhiều, thay được bằng They.🏗️ Cấu trúc: Động từ to be chi",
   "huongDan": "Underline the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "An Earth goes round the Sun.",
   "dap": "An",
   "giai": "✅ Đáp án đúng: sửa \"An\" thành \"The\"\nCâu đúng: The Earth goes round the Sun.📘 Ngữ cảnh:\nBài yêu cầu: Find the mistake in each sentence and correct it.\nCâu đã cho: An Earth goes round the Sun.\nViệc cần làm: tìm đúng MỘT chỗ sai trong câu rồi sửa lại.🏗️ Cấu trúc: Mạo từ đứng trước danh từ:\na + danh từ ",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Do your parents work at the bank? No, they doesn’t.",
   "dap": "doesn’t",
   "giai": "✅ Đáp án đúng: doesn’t → don’t - câu đúng: Do your parents work at the bank? No, they don’t. = Bố mẹ bạn có làm ở ngân hàng không? - Không.📘 Ngữ cảnh: Câu hỏi dùng Do với chủ ngữ your parents (số nhiều), nhưng câu trả lời ngắn lại dùng doesn’t - dạng của số ít.🏗️ Cấu trúc: \nPhủ định: S + don’t / doe",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "An is the goodest student in my class.",
   "dap": "goodest",
   "giai": "✅ Đáp án đúng: goodest → best - câu đúng: An is the best student in my class. = An là học sinh giỏi nhất lớp tôi.📘 Ngữ cảnh: Câu dùng tính từ good với đuôi -est, nhưng good cũng là tính từ bất quy tắc.🏗️ Cấu trúc: \nA + be + the + tính từ so sánh nhất + in / of + phạm vi\nSoi vào câu này: An + is + th",
   "huongDan": "Find and correct the mistake in each sentence.",
   "choices": []
  },
  {
   "noi": "Jane is the taller student in my class.",
   "dap": "taller",
   "giai": "✅ Đáp án đúng: taller → tallest - câu đúng: Jane is the tallest student in my class. = Jane là học sinh cao nhất lớp tôi.📘 Ngữ cảnh: Câu có the và cụm in my class (phạm vi cả lớp) → phải dùng dạng nhất, nhưng lại viết taller là dạng hơn.🏗️ Cấu trúc: \nA + be + the + tính từ so sánh nhất + in / of + p",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Did Sam and her mom travel to London last summer? Yes, they didn’t.",
   "dap": "didn’t",
   "giai": "✅ Đáp án đúng: didn’t → did - câu đúng: Did Sam and her mom travel to London last summer? Yes, they did. = Hè năm ngoái Sam và mẹ có đi London không? - Có.📘 Ngữ cảnh: Câu trả lời bắt đầu bằng Yes nhưng phần sau lại mang not - hai thứ mâu thuẫn nhau.🏗️ Cấu trúc: \nPhủ định: S + didn’t + V (nguyên thể)",
   "huongDan": "Underline the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "These aren’t rose.",
   "dap": "rose",
   "giai": "✅ Đáp án đúng: rose → roses - câu đúng: These aren’t roses. = Đây không phải là những bông hoa hồng.📘 Ngữ cảnh: Chủ ngữ là These (số nhiều) nhưng danh từ phía sau lại là rose ở số ít - không khớp.🏗️ Cấu trúc: \nThis / That + is + danh từ SỐ ÍT\nThese / Those + are + danh từ SỐ NHIỀU\nthis / these = ở g",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "Does he like do these exercises?",
   "dap": "do",
   "giai": "✅ Đáp án đúng: do → doing - câu đúng: Does he like doing these exercises? = Cậu ấy có thích làm những bài tập này không?📘 Ngữ cảnh: Câu hỏi đã dùng đúng trợ động từ Does, nhưng động từ sau like vẫn để nguyên thể.🏗️ Cấu trúc: \nS + like / love / hate + V-ing\nSoi vào câu này: he + like + doing + these ",
   "huongDan": "Find and correct the mistake in each sentence.",
   "choices": []
  },
  {
   "noi": "She don’t like milk, but she is drinking it now.",
   "dap": "don’t",
   "giai": "✅ Đáp án đúng: don’t → doesn’t📘 Ngữ cảnh: Vế đầu là hiện tại đơn (nói về sở thích chung), chủ ngữ She là ngôi thứ ba số ít.🏗️ Cấu trúc: \nHiện tại ĐƠN: S + V (-s / -es) → việc lặp đi lặp lại, sự thật\nHiện tại TIẾP DIỄN: S + am / is / are + V-ing → việc đang xảy ra lúc này\nBảng dấu hiệu nhận biết:\nĐƠN",
   "huongDan": "Find the mistake in each of the sentences and correct it.",
   "choices": []
  },
  {
   "noi": "She is the niceest person in my class.",
   "dap": "niceest",
   "giai": "✅ Đáp án đúng: niceest → nicest - câu đúng: She is the nicest person in my class. = Cô ấy là người tốt bụng nhất lớp tôi.📘 Ngữ cảnh: Câu so sánh nhất dùng tính từ nice. Dạng viết niceest thừa một chữ e.🏗️ Cấu trúc: \nA + be + the + tính từ so sánh nhất + in / of + phạm vi\nSoi vào câu này: She + is + ",
   "huongDan": "Find and correct the mistake in each sentence.",
   "choices": []
  },
  {
   "noi": "The children is in the dining room.",
   "dap": "is",
   "giai": "✅ Đáp án đúng: sửa is thành are\nCâu đúng: The children are in the dining room.📘 Ngữ cảnh: Yêu cầu của phần này: gạch chân chỗ sai trong câu rồi sửa lại cho đúng. Câu đã cho: The children is in the dining room. Chủ ngữ là The children. Đây là danh từ số nhiều BẤT QUY TẮC nên không có đuôi -s.🏗️ Cấu t",
   "huongDan": "Underline the mistake in each sentence and correct it.",
   "choices": []
  },
  {
   "noi": "The blue motorbike is the most expensivest one.",
   "dap": "expensivest",
   "giai": "✅ Đáp án đúng: expensivest → expensive - câu đúng: The blue motorbike is the most expensive one. = Chiếc xe máy xanh dương là chiếc đắt nhất.📘 Ngữ cảnh: Vẫn là so sánh kép: vừa the most vừa đuôi -est (the most expensivest).🏗️ Cấu trúc: \nA + be + the + tính từ so sánh nhất + in / of + phạm vi\nSoi vào",
   "huongDan": "Find the mistake in each sentence and correct it.",
   "choices": []
  }
 ],
 "ordering": [
  {
   "noi": "We/ have lunch/ at 12.30 every day/ .",
   "dap": "",
   "giai": "✅ Đáp án đúng: We have lunch at 12.30 every day.📘 Ngữ cảnh: Cụm every day → thói quen → hiện tại đơn. Chủ ngữ We số nhiều.🏗️ Cấu trúc: \nHiện tại ĐƠN: S + V (-s / -es) → việc lặp đi lặp lại, sự thật\nHiện tại TIẾP DIỄN: S + am / is / are + V-ing → việc đang xảy ra lúc này\nBảng dấu hiệu nhận biết:\nĐƠN:",
   "huongDan": "Write sentences. Use the present simple or present continuous form of the verbs.",
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
   "noi": "not/ I/ at school/ am/ .",
   "dap": "",
   "giai": "✅ Đáp án đúng: I am not at school.📘 Ngữ cảnh: Yêu cầu của phần này: xếp lại các mảnh cho sẵn thành một câu đúng. Các mảnh: I / am / not / at / school. Đây là một phủ định. Các mảnh cho sẵn có I (chủ ngữ), am (to be) và not (từ phủ định).🏗️ Cấu trúc: Trật tự từ của câu có to be:\nCâu kể: S + am / is /",
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
   "giai": "✅ Đáp án đúng: Does your grandfather work at a garage? = Ông của bạn có làm việc ở gara không?📘 Ngữ cảnh: Trong đống từ có dấu ? và từ does → đây là câu hỏi.🏗️ Cấu trúc: \nPhủ định: S + don’t / doesn’t + V (nguyên thể)\nNghi vấn: Do / Does + S + V (nguyên thể) ?\nSoi vào câu này: your grandfather + Doe",
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
   "noi": "visited/ grandma/ Amy/ her/ last Sunday/ .",
   "dap": "",
   "giai": "✅ Đáp án đúng: Amy visited her grandma last Sunday. = Amy đã đến thăm bà vào Chủ nhật tuần trước.📘 Ngữ cảnh: Trong đống từ có visited ở dạng quá khứ và last Sunday - dấu hiệu quá khứ. Câu khẳng định.🏗️ Cấu trúc: \nS + V-ed + O (quá khứ đơn - động từ có quy tắc)\nSoi vào câu này: visit + đuôi → visited",
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
   "giai": "✅ Đáp án đúng: There is a plum in her pocket.📘 Ngữ cảnh: Dãy từ there / plum / a / is / in / her pocket /. tạo thành câu khẳng định số ít.🏗️ Cấu trúc: \nTrật tự câu There is / There are:\nKhẳng định: There is / There are + (a / some) + N + nơi chốn .\nPhủ định: There isn’t / There aren’t + any + N + nơ",
   "huongDan": "Order the words to make correct sentences.",
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
   "noi": "Did/ 2 days/ spaghetti/ ago/ eat/ you/ ?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Did you eat spaghetti 2 days ago? = Cách đây hai ngày bạn có ăn mì Ý không?📘 Ngữ cảnh: Trong đống từ có dấu ? và Did → câu hỏi; động từ eat ở nguyên thể.🏗️ Cấu trúc: \nPhủ định: S + didn’t + V (nguyên thể)\nNghi vấn: Did + S + V (nguyên thể) ?\nSoi vào câu này: you + Did + eat\ndidn’t / D",
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
   "noi": "in the fridge/ isn’t/ the milk/ .",
   "dap": "",
   "giai": "✅ Đáp án đúng: The milk isn’t in the fridge.📘 Ngữ cảnh: Yêu cầu của phần này: xếp lại các mảnh cho sẵn thành một câu đúng. Các mảnh: The / milk / isn’t / in / the / fridge. Đây là một phủ định. Các mảnh cho sẵn có the milk (chủ ngữ) và isn’t - dạng phủ định đã rút gọn sẵn.🏗️ Cấu trúc: Trật tự từ của",
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
   "giai": "✅ Đáp án đúng: Are there any books on the desk?📘 Ngữ cảnh: Yêu cầu của phần này: xếp các mảnh cho sẵn thành một câu đúng. Các mảnh: any / the / are / desk/ there / books/ on /? Dấu hỏi ở cuối cho biết đây là câu hỏi, và danh từ chính là books - danh từ số nhiều.🏗️ Cấu trúc: Trật tự từ của câu There ",
   "huongDan": "Order the words to make correct sentences.",
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
   "noi": "my hair/ wash/ every day/ don’t/ I/ .",
   "dap": "",
   "giai": "✅ Đáp án đúng: I don’t wash my hair every day. = Tôi không gội đầu mỗi ngày.📘 Ngữ cảnh: Trong đống từ có don’t và chủ ngữ I - hai thứ luôn đi cùng nhau.🏗️ Cấu trúc: \nPhủ định: S + don’t / doesn’t + V (nguyên thể)\nNghi vấn: Do / Does + S + V (nguyên thể) ?\nSoi vào câu này: I + don’t + wash\nBảng chọn ",
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
   "noi": "sometimes/ My uncle / to work/ drives/ .",
   "dap": "",
   "giai": "✅ Đáp án đúng: My uncle sometimes drives to work.📘 Ngữ cảnh: Trạng từ sometimes là dấu hiệu của hiện tại đơn. Chủ ngữ My uncle là một người.🏗️ Cấu trúc: \nHiện tại ĐƠN: S + V (-s / -es) → việc lặp đi lặp lại, sự thật\nHiện tại TIẾP DIỄN: S + am / is / are + V-ing → việc đang xảy ra lúc này\nBảng dấu hi",
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
   "giai": "✅ Đáp án đúng: Does Jo like reading?📘 Ngữ cảnh: Các từ cho sẵn có dấu hỏi ở cuối, nên đây là một câu hỏi.🏗️ Cấu trúc:Does + chủ ngữ + động từ nguyên thể …?Ví dụ: Does Jo like reading?🔍 Giải thích chi tiết: Thấy dấu ? thì biết phải xếp thành câu hỏi, mà câu hỏi luôn mở đầu bằng Does (viết hoa vì đứng",
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
   "giai": "✅ Đáp án đúng: When does the movie start?📘 Ngữ cảnh: Từ cho sẵn có When và trợ động từ does - hỏi giờ chiếu phim.🏗️ Cấu trúc: \nTừ để hỏi + do / does / be + S + V ... ?\nSoi vào câu này: When + does + the movie + start ?\nBảng từ để hỏi:\nWhat = cái gì | Who = ai | Where = ở đâu\nWhen = khi nào | Why = t",
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
   "giai": "✅ Đáp án đúng: There isn’t any milk in the cup.📘 Ngữ cảnh: Yêu cầu của phần này: xếp các mảnh cho sẵn thành một câu đúng. Các mảnh: isn’t/ the cup/ milk/ in/ there/ any/ . Dấu chấm ở cuối cho biết đây là câu phủ định, và danh từ chính là milk - danh từ KHÔNG đếm được.🏗️ Cấu trúc: Trật tự từ của câu ",
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
   "noi": "(the toys you have)",
   "dap": "",
   "giai": "✅ Đáp án đúng: I have three toy trains📘 Ngữ cảnh:\nBài yêu cầu: Rearrange the words to write your own sentence.\nCác mảnh cho sẵn: I / have / three / toy / trains\nViệc cần làm: xếp lại thành một câu đúng ngữ pháp và đúng trật tự từ.🏗️ Cấu trúc: Trật tự từ cơ bản của câu tiếng Anh:\nS + V + O + (nơi chố",
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
   "giai": "✅ Đáp án đúng: Cindy is more beautiful than her sisters. = Cindy xinh hơn các chị em gái của cô ấy.📘 Ngữ cảnh: Trong đống từ xáo trộn có more beautiful và từ than nên đây là câu so sánh hơn. Hai đối tượng đem so sánh là Cindy và her sisters.🏗️ Cấu trúc: \nA + be + tính từ so sánh hơn + than + B\nSoi v",
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
   "noi": "is / most / expensive / the red car / the / .",
   "dap": "",
   "giai": "✅ Đáp án đúng: The red car is the most expensive. = Chiếc xe màu đỏ là chiếc đắt nhất.📘 Ngữ cảnh: Trong đống từ xáo trộn có the và most, nên đây là câu so sánh nhất.🏗️ Cấu trúc: \nA + be + the + tính từ so sánh nhất + in / of + phạm vi\nSoi vào câu này: The red car + is + the most expensive\nBảng biến ",
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
   "noi": "wrote/ yesterday/ letter/ ./ a/ Sam",
   "dap": "",
   "giai": "✅ Đáp án đúng: Sam wrote a letter yesterday. = Sam đã viết một lá thư hôm qua.📘 Ngữ cảnh: Trong đống từ có wrote đã chia quá khứ và yesterday - dấu hiệu quá khứ. Câu khẳng định.🏗️ Cấu trúc: \nS + V2 (cột 2 - quá khứ) + O (động từ BẤT QUY TẮC)\nSoi vào câu này: write → wrote\nĐộng từ bất quy tắc KHÔNG t",
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
   "giai": "✅ Đáp án đúng: Dinosaurs are the most dangerous animal. = Khủng long là loài vật nguy hiểm nhất.📘 Ngữ cảnh: Trong đống từ xáo trộn có the và most, nên đây là câu so sánh nhất, và còn một danh từ animal phải đặt ngay sau tính từ.🏗️ Cấu trúc: \nA + be + the + tính từ so sánh nhất + in / of + phạm vi\nSo",
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
   "giai": "✅ Đáp án đúng: There aren’t any men in the mall.📘 Ngữ cảnh: Dãy từ the mall / aren’t / men/ in / there / any /. tạo thành câu phủ định số nhiều.🏗️ Cấu trúc: \nTrật tự câu There is / There are:\nKhẳng định: There is / There are + (a / some) + N + nơi chốn .\nPhủ định: There isn’t / There aren’t + any + ",
   "huongDan": "Order the words to make correct sentences.",
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
   "noi": "can’t / the boy / sing / but / loves / he / songs / writing / . /",
   "dap": "",
   "giai": "✅ Đáp án đúng: The boy can’t sing but he loves writing songs. = Cậu bé không hát được nhưng cậu ấy rất thích sáng tác bài hát.📘 Ngữ cảnh: Đống từ có cả can’t lẫn loves, nối bằng but - câu gồm hai vế trái ngược: một vế nói về khả năng, một vế nói về sở thích.🏗️ Cấu trúc: \nS + can / can’t + V (nguyên ",
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
   "noi": "Amy/ at the library/ ./ work/ doesn’t",
   "dap": "",
   "giai": "✅ Đáp án đúng: Amy doesn’t work at the library. = Amy không làm việc ở thư viện.📘 Ngữ cảnh: Có doesn’t nên là câu phủ định; chủ ngữ Amy ở số ít.🏗️ Cấu trúc: \nPhủ định: S + don’t / doesn’t + V (nguyên thể)\nNghi vấn: Do / Does + S + V (nguyên thể) ?\nSoi vào câu này: Amy + doesn’t + work\nBảng chọn trợ ",
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
   "giai": "✅ Đáp án đúng: A car is more expensive than a bike. = Ô tô thì đắt hơn xe đạp.📘 Ngữ cảnh: Trong đống từ xáo trộn có more expensive và từ than, nên đây là câu so sánh hơn. Hai đối tượng được đem ra so sánh là A car và a bike.🏗️ Cấu trúc: \nA + be + tính từ so sánh hơn + than + B\nSoi vào câu này: A car",
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
   "noi": "there / orange/ an / is / chair / on/ the /.",
   "dap": "",
   "giai": "✅ Đáp án đúng: There is an orange on the chair.📘 Ngữ cảnh: Yêu cầu của phần này: xếp các mảnh cho sẵn thành một câu đúng. Các mảnh: there / orange/ an / is / chair / on/ the /. Dấu chấm ở cuối cho biết đây là câu kể, và danh từ chính là orange - danh từ đếm được số ít.🏗️ Cấu trúc: Trật tự từ của câu",
   "huongDan": "Order the words to make correct sentences.",
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
   "noi": "is / teacher / Mr Harris / the / nicest / .",
   "dap": "",
   "giai": "✅ Đáp án đúng: Mr Harris is the nicest teacher. = Thầy Harris là giáo viên tốt bụng nhất.📘 Ngữ cảnh: Trong đống từ xáo trộn có the và dạng nicest, nên đây là câu so sánh nhất, và còn một danh từ teacher phải đặt ngay sau tính từ.🏗️ Cấu trúc: \nA + be + the + tính từ so sánh nhất + in / of + phạm vi\nS",
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
   "giai": "✅ Đáp án đúng: This is mom’s computer. = Đây là máy tính của mẹ.📘 Ngữ cảnh: Các từ cho sẵn có phần ‘s tách riêng ra thành một mảnh - đây là điểm đặc biệt của câu này: phải ghép ‘s vào ngay sau mom.🏗️ Cấu trúc: \nngười/vật sở hữu + ’s + thứ được sở hữu\nSoi vào câu này: mom’s + computer\nQuy tắc đặt dấu",
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
   "giai": "✅ Đáp án đúng: I am taller than my friends. = Tôi cao hơn các bạn của tôi.📘 Ngữ cảnh: Trong đống từ xáo trộn có taller và từ than nên đây là câu so sánh hơn. Hai đối tượng đem so sánh là I và my friends.🏗️ Cấu trúc: \nA + be + tính từ so sánh hơn + than + B\nSoi vào câu này: I + is + taller + than + m",
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
   "giai": "✅ Đáp án đúng: Amy is younger than Mike. = Amy trẻ hơn Mike.📘 Ngữ cảnh: Trong đống từ xáo trộn có younger và từ than nên đây là câu so sánh hơn. Hai đối tượng đem so sánh là Amy và Mike.🏗️ Cấu trúc: \nA + be + tính từ so sánh hơn + than + B\nSoi vào câu này: Amy + is + younger + than + Mike\nBảng biến ",
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
   "giai": "✅ Đáp án đúng: December is the coldest month. = Tháng Mười Hai là tháng lạnh nhất.📘 Ngữ cảnh: Trong đống từ xáo trộn có the và dạng coldest, nên đây là câu so sánh nhất, kèm danh từ month phải đặt ngay sau tính từ.🏗️ Cấu trúc: \nA + be + the + tính từ so sánh nhất + in / of + phạm vi\nSoi vào câu này:",
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
   "giai": "✅ Đáp án đúng: There is a book in the bag.📘 Ngữ cảnh: Yêu cầu của phần này: xếp các mảnh cho sẵn thành một câu đúng. Các mảnh: in/ is/ book/ the bag/ there/ a/ . Dấu chấm ở cuối cho biết đây là câu kể, và danh từ chính là book - danh từ đếm được số ít.🏗️ Cấu trúc: Trật tự từ của câu There is / There",
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
   "noi": "have/ I/ new/ some/ friends/ .",
   "dap": "",
   "giai": "✅ Đáp án đúng: I have some new friends.📘 Ngữ cảnh: Các từ cho sẵn không có từ phủ định hay dấu hỏi, nên đây là câu khẳng định.🏗️ Cấu trúc:Chủ ngữ + have / has + tân ngữVí dụ: I have some new friends.🔍 Giải thích chi tiết: Câu bắt đầu bằng chủ ngữ I, mà I luôn đi với have. Phần tân ngữ xếp theo thứ t",
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
   "giai": "✅ Đáp án đúng: Lily is my kindest girl. = Lily là cô bé tốt bụng nhất của tôi.📘 Ngữ cảnh: Trong đống từ xáo trộn có từ sở hữu my và dạng kindest, nên đây là câu so sánh nhất, kèm danh từ girl phải đặt ngay sau tính từ.🏗️ Cấu trúc: \nA + be + the + tính từ so sánh nhất + in / of + phạm vi\nSoi vào câu ",
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
   "giai": "✅ Đáp án đúng: Jean doesn’t play tennis on Saturday mornings.📘 Ngữ cảnh: Cụm on Saturday mornings → thói quen → hiện tại đơn. Có not → phủ định.🏗️ Cấu trúc: \nHiện tại ĐƠN: S + V (-s / -es) → việc lặp đi lặp lại, sự thật\nHiện tại TIẾP DIỄN: S + am / is / are + V-ing → việc đang xảy ra lúc này\nBảng dấ",
   "huongDan": "Write sentences. Use the present simple or present continuous form of the verbs.",
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
   "noi": "Dad/ in the kitchen/ at the moment/ making coffee/ is/ .",
   "dap": "",
   "giai": "✅ Đáp án đúng: Dad is making coffee in the kitchen at the moment.📘 Ngữ cảnh: Có is, making và at the moment → câu khẳng định ở hiện tại tiếp diễn.🏗️ Cấu trúc: \nHiện tại ĐƠN: S + V (-s / -es) → việc lặp đi lặp lại, sự thật\nHiện tại TIẾP DIỄN: S + am / is / are + V-ing → việc đang xảy ra lúc này\nBảng ",
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
   "noi": "Amy and her friends/ dance/ on the stage/ .",
   "dap": "",
   "giai": "✅ Đáp án đúng: Amy and her friends are dancing on the stage.📘 Ngữ cảnh: Chủ ngữ Amy and her friends gồm nhiều người nối bằng and → số nhiều.🏗️ Cấu trúc: \nKhẳng định: S + am / is / are + V-ing + ...\nPhủ định: S + am / is / are + not + V-ing + ...\nNghi vấn: Am / Is / Are + S + V-ing ... ?\nSoi vào câu ",
   "huongDan": "Look at the picture. Make sentences from the words. Use present continuous tense.",
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
   "noi": "Sally and her family/ camping/ in the forest/ Sunday/ on/ went/ .",
   "dap": "",
   "giai": "✅ Đáp án đúng: Sally and her family went camping in the forest on Sunday. = Sally và gia đình đã đi cắm trại trong rừng vào Chủ nhật.📘 Ngữ cảnh: Trong đống từ có went đã chia quá khứ. Câu khẳng định với chủ ngữ dài.🏗️ Cấu trúc: \nS + V2 (cột 2 - quá khứ) + O (động từ BẤT QUY TẮC)\nSoi vào câu này: go ",
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
   "noi": "students/ English/ yesterday/ The/ study/ ./ didn’t",
   "dap": "",
   "giai": "✅ Đáp án đúng: The students didn’t study English yesterday. = Các bạn học sinh đã không học tiếng Anh hôm qua.📘 Ngữ cảnh: Trong đống từ có didn’t → đây là câu phủ định, và động từ study đang ở nguyên thể.🏗️ Cấu trúc: \nPhủ định: S + didn’t + V (nguyên thể)\nNghi vấn: Did + S + V (nguyên thể) ?\nSoi vào",
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
   "giai": "✅ Đáp án đúng: Tokyo is the biggest city. = Tokyo là thành phố lớn nhất.📘 Ngữ cảnh: Trong đống từ xáo trộn có the và dạng biggest, nên đây là câu so sánh nhất, kèm danh từ city phải đặt ngay sau tính từ.🏗️ Cấu trúc: \nA + be + the + tính từ so sánh nhất + in / of + phạm vi\nSoi vào câu này: Tokyo + is",
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
   "giai": "✅ Đáp án đúng: Ann is tired so she goes to bed early.📘 Ngữ cảnh: Liên từ so nối nguyên nhân → kết quả: Ann mệt nên đi ngủ sớm.🏗️ Cấu trúc: \nvế 1 + liên từ + vế 2\nSoi vào câu này: is/ Ann/ tired/ goes/ so/ she/ to bed/ early/ .\n→ Ann is tired so she goes to bed early. (liên từ so)\nBảng 4 liên từ - nh",
   "huongDan": "Reorder the words to make sentences.",
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
   "noi": "isn’t / milk / fridge / any/ in / there / the",
   "dap": "",
   "giai": "✅ Đáp án đúng: There isn’t any milk in the fridge.📘 Ngữ cảnh: Yêu cầu của phần này: xếp các mảnh cho sẵn thành một câu đúng. Các mảnh: isn’t / milk / fridge / any/ in / there / the Dấu chấm ở cuối cho biết đây là câu phủ định, và danh từ chính là milk - danh từ KHÔNG đếm được.🏗️ Cấu trúc: Trật tự từ",
   "huongDan": "Order the words to make correct sentences.",
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
   "noi": "mother/ yesterday/ the/ cleaned/ windows/ My/ .",
   "dap": "",
   "giai": "✅ Đáp án đúng: My mother cleaned the windows yesterday. = Mẹ tôi đã lau cửa sổ hôm qua.📘 Ngữ cảnh: Trong đống từ có cleaned đã ở dạng quá khứ và yesterday - dấu hiệu quá khứ. Đây là câu khẳng định.🏗️ Cấu trúc: \nS + V-ed + O (quá khứ đơn - động từ có quy tắc)\nSoi vào câu này: clean + đuôi → cleaned (",
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
   "giai": "✅ Đáp án đúng: Are you doing your homework at the moment?📘 Ngữ cảnh: Cụm at the moment → hiện tại tiếp diễn; dấu ? cho biết là câu hỏi. Chủ ngữ you.🏗️ Cấu trúc: \nHiện tại ĐƠN: S + V (-s / -es) → việc lặp đi lặp lại, sự thật\nHiện tại TIẾP DIỄN: S + am / is / are + V-ing → việc đang xảy ra lúc này\nBản",
   "huongDan": "Write sentences. Use the present simple or present continuous form of the verbs.",
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
   "noi": "running/ I/ is/ think/ than/ walking/ easier/ .",
   "dap": "",
   "giai": "✅ Đáp án đúng: I think walking is easier than running. = Tôi nghĩ đi bộ dễ hơn chạy.📘 Ngữ cảnh: Trong đống từ xáo trộn có easier và từ than nên đây là câu so sánh hơn. Hai đối tượng đem so sánh là walking và running.🏗️ Cấu trúc: \nA + be + tính từ so sánh hơn + than + B\nSoi vào câu này: walking + is ",
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
   "noi": "do/ How/ you/ to/ go/ school/?",
   "dap": "",
   "giai": "✅ Đáp án đúng: How do you go to school? = Bạn đi học bằng cách nào?📘 Ngữ cảnh: Trong đống từ có How (hỏi cách thức/phương tiện), do, động từ go và cụm to school.🏗️ Cấu trúc: \nTừ để hỏi + do / does / be + S + V ... ?\nSoi vào câu này: How + do + you ?\nBảng từ để hỏi:\nWhat = cái gì | Who = ai | Where =",
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
   "giai": "✅ Đáp án đúng: My sister can draw beautiful pictures. = Chị tôi vẽ được những bức tranh đẹp.📘 Ngữ cảnh: Trong đống từ có can nên đây là câu nói về khả năng. Còn có tính từ beautiful phải đặt trước danh từ pictures.🏗️ Cấu trúc: \nS + can / can’t + V (nguyên thể)\nSoi vào câu này: My sister + can + draw",
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
   "giai": "✅ Đáp án đúng: Sam is the best singer. = Sam là ca sĩ hát hay nhất.📘 Ngữ cảnh: Trong đống từ xáo trộn có the và dạng best, nên đây là câu so sánh nhất, và còn một danh từ singer phải đặt ngay sau tính từ.🏗️ Cấu trúc: \nA + be + the + tính từ so sánh nhất + in / of + phạm vi\nSoi vào câu này: Sam + is ",
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
   "giai": "✅ Đáp án đúng: I have some noodles for breakfast📘 Ngữ cảnh:\nBài yêu cầu: Rearrange the words to write your own sentence.\nCác mảnh cho sẵn: I / have / some / noodles / for / breakfast\nViệc cần làm: xếp lại thành một câu đúng ngữ pháp và đúng trật tự từ.🏗️ Cấu trúc: Trật tự từ cơ bản của câu tiếng Anh",
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
   "giai": "✅ Đáp án đúng: The little boy is hiding behind the bushes.📘 Ngữ cảnh: Từ gợi ý cho sẵn theo đúng thứ tự, chỉ cần chia động từ hide sang hiện tại tiếp diễn. Chủ ngữ The little boy là một bạn → số ít.🏗️ Cấu trúc: \nKhẳng định: S + am / is / are + V-ing + ...\nPhủ định: S + am / is / are + not + V-ing + ",
   "huongDan": "Look at the picture. Make sentences from the words. Use present continuous tense.",
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
   "noi": "at home/ yesterday/ dinner/ eat/ Did/ they/ ?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Did they eat dinner at home yesterday? = Hôm qua họ có ăn tối ở nhà không?📘 Ngữ cảnh: Có dấu ? và từ Did → câu hỏi; động từ eat ở nguyên thể.🏗️ Cấu trúc: \nPhủ định: S + didn’t + V (nguyên thể)\nNghi vấn: Did + S + V (nguyên thể) ?\nSoi vào câu này: they + Did + eat\ndidn’t / Did dùng cho",
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
   "noi": "yesterday/ book/ read/ didn’t/ Karen/ a/ .",
   "dap": "",
   "giai": "✅ Đáp án đúng: Karen didn’t read a book yesterday. = Karen đã không đọc sách hôm qua.📘 Ngữ cảnh: Trong đống từ có didn’t → câu phủ định, và động từ read đang ở nguyên thể.🏗️ Cấu trúc: \nPhủ định: S + didn’t + V (nguyên thể)\nNghi vấn: Did + S + V (nguyên thể) ?\nSoi vào câu này: Karen + didn’t + read\nd",
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
   "giai": "✅ Đáp án đúng: These aren’t our parents’ cars. = Đây không phải là những chiếc xe của bố mẹ chúng tôi.📘 Ngữ cảnh: Các từ cho sẵn gồm these, aren’t và cụm sở hữu our parents’ (chú ý dấu nháy đặt sau chữ s) cùng danh từ cars.🏗️ Cấu trúc: \nngười/vật sở hữu + ’s + thứ được sở hữu\nSoi vào câu này: our pa",
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
   "giai": "✅ Đáp án đúng: David is the tallest student. = David là học sinh cao nhất.📘 Ngữ cảnh: Trong đống từ xáo trộn có the và dạng tallest, nên đây là câu so sánh nhất, kèm danh từ student phải đặt ngay sau tính từ.🏗️ Cấu trúc: \nA + be + the + tính từ so sánh nhất + in / of + phạm vi\nSoi vào câu này: David",
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
   "giai": "✅ Đáp án đúng: This book is the most interesting. = Quyển sách này là thú vị nhất.📘 Ngữ cảnh: Trong đống từ xáo trộn có the và chữ most, nên đây là câu so sánh nhất.🏗️ Cấu trúc: \nA + be + the + tính từ so sánh nhất + in / of + phạm vi\nSoi vào câu này: This book + is + the most interesting\nBảng biến ",
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
   "giai": "✅ Đáp án đúng: John doesn’t go to school on Wednesday afternoons.📘 Ngữ cảnh: Cụm on Wednesday afternoons (vào các chiều thứ Tư) là thói quen lặp lại → hiện tại đơn. Có not → phủ định.🏗️ Cấu trúc: \nHiện tại ĐƠN: S + V (-s / -es) → việc lặp đi lặp lại, sự thật\nHiện tại TIẾP DIỄN: S + am / is / are + V",
   "huongDan": "Write sentences. Use the present simple or present continuous form of the verbs.",
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
   "noi": "reading / likes / my friend / interesting / books /.",
   "dap": "",
   "giai": "✅ Đáp án đúng: My friend likes reading interesting books. = Bạn tôi thích đọc những quyển sách thú vị.📘 Ngữ cảnh: Trong đống từ có likes (đã chia sẵn -s) và reading (đã ở dạng V-ing) - hai dấu hiệu của cấu trúc like + V-ing.🏗️ Cấu trúc: \nS + like / love / hate + V-ing\nSoi vào câu này: My friend + li",
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
   "giai": "✅ Đáp án đúng: How does your mom go to work?📘 Ngữ cảnh: Từ cho sẵn có How và does - hỏi mẹ đi làm bằng cách nào.🏗️ Cấu trúc: \nTừ để hỏi + do / does / be + S + V ... ?\nSoi vào câu này: How + does + your mom + go ?\nBảng từ để hỏi:\nWhat = cái gì | Who = ai | Where = ở đâu\nWhen = khi nào | Why = tại sao",
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
   "noi": "bike/ didn’t/ his/ ride/ yesterday/ He",
   "dap": "",
   "giai": "✅ Đáp án đúng: He didn’t ride his bike yesterday. = Cậu ấy đã không đạp xe hôm qua.📘 Ngữ cảnh: Trong đống từ có didn’t → câu phủ định, động từ ride ở nguyên thể.🏗️ Cấu trúc: \nPhủ định: S + didn’t + V (nguyên thể)\nNghi vấn: Did + S + V (nguyên thể) ?\nSoi vào câu này: He + didn’t + ride\ndidn’t / Did d",
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
   "giai": "✅ Đáp án đúng: This book is more interesting than that book. = Quyển sách này thú vị hơn quyển sách kia.📘 Ngữ cảnh: Trong đống từ xáo trộn có more interesting và từ than, nên đây là câu so sánh hơn. Hai đối tượng được đem ra so sánh là This book và that book.🏗️ Cấu trúc: \nA + be + tính từ so sánh hơ",
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
   "noi": "the sun/ shine/ now/ ?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Is the sun shining now?📘 Ngữ cảnh: Từ now → hiện tại tiếp diễn; dấu ? → câu hỏi. Chủ ngữ the sun số ít.🏗️ Cấu trúc: \nHiện tại ĐƠN: S + V (-s / -es) → việc lặp đi lặp lại, sự thật\nHiện tại TIẾP DIỄN: S + am / is / are + V-ing → việc đang xảy ra lúc này\nBảng dấu hiệu nhận biết:\nĐƠN: eve",
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
   "giai": "✅ Đáp án đúng: Sao Beach is the most beautiful beach. = Bãi Sao là bãi biển đẹp nhất.📘 Ngữ cảnh: Trong đống từ xáo trộn có the và chữ most, nên đây là câu so sánh nhất, kèm danh từ beach phải đặt ngay sau tính từ.🏗️ Cấu trúc: \nA + be + the + tính từ so sánh nhất + in / of + phạm vi\nSoi vào câu này: ",
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
   "noi": "those/ are/ books/ her/ ?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Are those her books? = Kia có phải là những quyển sách của cô ấy không?📘 Ngữ cảnh: Các từ cho sẵn có dấu ? ở cuối nên đây là câu hỏi. Gồm those, are, tính từ sở hữu her và danh từ books.🏗️ Cấu trúc: \nThis / That + is + danh từ SỐ ÍT\nThese / Those + are + danh từ SỐ NHIỀU\nthis / these ",
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
   "giai": "✅ Đáp án đúng: I’m very tired, but I can’t sleep. ↔ Đưa ra thông tin trái ngược📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: I’m very tired, but I can’t sleep.\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Bốn liên từ cơ bản:\na",
   "huongDan": "Underline the conjunction in each sentence. Then match it with its meaning.",
   "choices": []
  },
  {
   "noi": "Do Ben and Ken play the violin?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Do Ben and Ken play the violin? ↔ No, they don’t.📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: Do Ben and Ken play the violin?\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Trả lời ngắn cho câu hỏi thì hiện tại đ",
   "huongDan": "Look at the picture, read and match each question with the correct answer.",
   "choices": []
  },
  {
   "noi": "My sister’s room",
   "dap": "",
   "giai": "✅ Đáp án đúng: My sister’s room ↔ D📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: My sister’s room\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Sở hữu cách:\ndanh từ SỐ ÍT + ’s (the boy’s shoes = giày của MỘT bạn nam)\ndanh từ số",
   "huongDan": "Look at the picture and match each phrase with the correct letter.",
   "choices": []
  },
  {
   "noi": "There are",
   "dap": "",
   "giai": "✅ Đáp án đúng: two dogs in the yard. ↔ There are📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: two dogs in the yard.\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + d",
   "huongDan": "Match the halves.",
   "choices": []
  },
  {
   "noi": "Does Willy listen to the radio?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Does Willy listen to the radio? ↔ Yes, he does.📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: Does Willy listen to the radio?\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Trả lời ngắn cho câu hỏi thì hiện tại đơn",
   "huongDan": "Look at the picture, read and match each question with the correct answer.",
   "choices": []
  },
  {
   "noi": "Whose shoes are these?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Whose shoes are these? ↔ My dad’s.📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: Whose shoes are these?\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Phân biệt câu hỏi thì hiện tại đơn và hiện tại tiếp diễn:\nAm / ",
   "huongDan": "Match the question with the correct answer.",
   "choices": []
  },
  {
   "noi": "Our party is on",
   "dap": "",
   "giai": "✅ Đáp án đúng: Our party is on ↔ April 24.📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: Our party is on\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Giới từ chỉ thời gian:\non + thứ, ngày cụ thể (on Monday, on April 24)\nat + gi",
   "huongDan": "Match the phrases with the time expressions.",
   "choices": []
  },
  {
   "noi": "The bus leaves at",
   "dap": "",
   "giai": "✅ Đáp án đúng: The bus leaves at ↔ 9 o’clock.📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: The bus leaves at\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Giới từ chỉ thời gian:\non + thứ, ngày cụ thể (on Monday, on April 24)\nat",
   "huongDan": "Match the phrases with the time expressions.",
   "choices": []
  },
  {
   "noi": "Do we have science on",
   "dap": "",
   "giai": "✅ Đáp án đúng: Do we have science on ↔ Tuesday?📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: Do we have science on\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Giới từ chỉ thời gian:\non + thứ, ngày cụ thể (on Monday, on April ",
   "huongDan": "Match the phrases with the time expressions.",
   "choices": []
  },
  {
   "noi": "The monkeys’ tree",
   "dap": "",
   "giai": "✅ Đáp án đúng: The monkeys’ tree ↔ F📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: The monkeys’ tree\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Sở hữu cách:\ndanh từ SỐ ÍT + ’s (the boy’s shoes = giày của MỘT bạn nam)\ndanh từ ",
   "huongDan": "Look at the picture and match each phrase with the correct letter.",
   "choices": []
  },
  {
   "noi": "Does Lucy live in a house?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Does Lucy live in a house? ↔ Yes, she does.📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: Does Lucy live in a house?\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Trả lời ngắn cho câu hỏi thì hiện tại đơn:\nDoes + ",
   "huongDan": "Look at the picture, read and match each question with the correct answer.",
   "choices": []
  },
  {
   "noi": "the women’s cars",
   "dap": "",
   "giai": "✅ Đáp án đúng: the women’s cars ↔ E📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: the women’s cars\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Sở hữu cách:\ndanh từ SỐ ÍT + ’s (the boy’s shoes = giày của MỘT bạn nam)\ndanh từ số",
   "huongDan": "Look at the picture and match each phrase with the correct letter.",
   "choices": []
  },
  {
   "noi": "The leopard is fast and strong.",
   "dap": "",
   "giai": "✅ Đáp án đúng: The leopard is fast and strong. ↔ Nối thông tin tương đương📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: The leopard is fast and strong.\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Bốn liên từ cơ bản:\nand → nối",
   "huongDan": "Underline the conjunction in each sentence. Then match it with its meaning.",
   "choices": []
  },
  {
   "noi": "Are Zoe and Kyle running in the park at the moment?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Are Zoe and Kyle running in the park at the moment? ↔ No, they aren’t.📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: Are Zoe and Kyle running in the park at the moment?\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc",
   "huongDan": "Match the question with the correct answer.",
   "choices": []
  },
  {
   "noi": "I was very tired, so I went to sleep very early.",
   "dap": "",
   "giai": "✅ Đáp án đúng: I was very tired, so I went to sleep very early. ↔ Diễn tả kết quả📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: I was very tired, so I went to sleep very early.\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Bốn l",
   "huongDan": "Underline the conjunction in each sentence. Then match it with its meaning.",
   "choices": []
  },
  {
   "noi": "How often do the children visit the city zoo?",
   "dap": "",
   "giai": "✅ Đáp án đúng: How often do the children visit the city zoo? ↔ Every Sunday.📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: How often do the children visit the city zoo?\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Phân biệt câu",
   "huongDan": "Match the question with the correct answer.",
   "choices": []
  },
  {
   "noi": "the boy’s shoes",
   "dap": "",
   "giai": "✅ Đáp án đúng: the boy’s shoes ↔ C📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: the boy’s shoes\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Sở hữu cách:\ndanh từ SỐ ÍT + ’s (the boy’s shoes = giày của MỘT bạn nam)\ndanh từ số n",
   "huongDan": "Look at the picture and match each phrase with the correct letter.",
   "choices": []
  },
  {
   "noi": "the woman’s cars",
   "dap": "",
   "giai": "✅ Đáp án đúng: the woman’s cars ↔ B📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: the woman’s cars\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Sở hữu cách:\ndanh từ SỐ ÍT + ’s (the boy’s shoes = giày của MỘT bạn nam)\ndanh từ số",
   "huongDan": "Look at the picture and match each phrase with the correct letter.",
   "choices": []
  },
  {
   "noi": "The weather is great in",
   "dap": "",
   "giai": "✅ Đáp án đúng: The weather is great in ↔ the summer.📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: The weather is great in\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Giới từ chỉ thời gian:\non + thứ, ngày cụ thể (on Monday, on",
   "huongDan": "Match the phrases with the time expressions.",
   "choices": []
  },
  {
   "noi": "There aren’t",
   "dap": "",
   "giai": "✅ Đáp án đúng: any chairs in the room. ↔ There aren’t📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: any chairs in the room.\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere",
   "huongDan": "Match the halves.",
   "choices": []
  },
  {
   "noi": "There isn’t",
   "dap": "",
   "giai": "✅ Đáp án đúng: any juice in the fridge. ↔ There isn’t📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: any juice in the fridge.\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nTher",
   "huongDan": "Match the halves.",
   "choices": []
  },
  {
   "noi": "Do Ben and Ken have a pet?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Do Ben and Ken have a pet? ↔ Yes, they do.📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: Do Ben and Ken have a pet?\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Trả lời ngắn cho câu hỏi thì hiện tại đơn:\nDoes + h",
   "huongDan": "Look at the picture, read and match each question with the correct answer.",
   "choices": []
  },
  {
   "noi": "My sisters’ room",
   "dap": "",
   "giai": "✅ Đáp án đúng: My sisters’ room ↔ G📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: My sisters’ room\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Sở hữu cách:\ndanh từ SỐ ÍT + ’s (the boy’s shoes = giày của MỘT bạn nam)\ndanh từ số",
   "huongDan": "Look at the picture and match each phrase with the correct letter.",
   "choices": []
  },
  {
   "noi": "Does Willy have a pet?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Does Willy have a pet? ↔ No, he doesn’t.📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: Does Willy have a pet?\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Trả lời ngắn cho câu hỏi thì hiện tại đơn:\nDoes + he / sh",
   "huongDan": "Look at the picture, read and match each question with the correct answer.",
   "choices": []
  },
  {
   "noi": "Is John gardening with his mom now?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Is John gardening with his mom now? ↔ Yes, he is.📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: Is John gardening with his mom now?\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Phân biệt câu hỏi thì hiện tại đơn ",
   "huongDan": "Match the question with the correct answer.",
   "choices": []
  },
  {
   "noi": "Where do you go at",
   "dap": "",
   "giai": "✅ Đáp án đúng: Where do you go at ↔ lunch time?📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: Where do you go at\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Giới từ chỉ thời gian:\non + thứ, ngày cụ thể (on Monday, on April 24)",
   "huongDan": "Match the phrases with the time expressions.",
   "choices": []
  },
  {
   "noi": "Do you make your bed in",
   "dap": "",
   "giai": "✅ Đáp án đúng: Do you make your bed in ↔ the morning?📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: Do you make your bed in\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Giới từ chỉ thời gian:\non + thứ, ngày cụ thể (on Monday, o",
   "huongDan": "Match the phrases with the time expressions.",
   "choices": []
  },
  {
   "noi": "Do they play the piano on Saturdays?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Do they play the piano on Saturdays? ↔ No, they don’t.📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: Do they play the piano on Saturdays?\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Phân biệt câu hỏi thì hiện tạ",
   "huongDan": "Match the question with the correct answer.",
   "choices": []
  },
  {
   "noi": "The monkey’s tree",
   "dap": "",
   "giai": "✅ Đáp án đúng: The monkey’s tree ↔ A📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: The monkey’s tree\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Sở hữu cách:\ndanh từ SỐ ÍT + ’s (the boy’s shoes = giày của MỘT bạn nam)\ndanh từ ",
   "huongDan": "Look at the picture and match each phrase with the correct letter.",
   "choices": []
  },
  {
   "noi": "There is",
   "dap": "",
   "giai": "✅ Đáp án đúng: an elephant in the classroom. ↔ There is📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: an elephant in the classroom.\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There ar",
   "huongDan": "Match the halves.",
   "choices": []
  },
  {
   "noi": "Do you want a cookie or a cupcake for dessert?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Do you want a cookie or a cupcake for dessert? ↔ Đưa ra sự lựa chọn📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: Do you want a cookie or a cupcake for dessert?\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Bốn li",
   "huongDan": "Underline the conjunction in each sentence. Then match it with its meaning.",
   "choices": []
  },
  {
   "noi": "Who is mowing the lawn in the garden?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Who is mowing the lawn in the garden? ↔ My dad.📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: Who is mowing the lawn in the garden?\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Phân biệt câu hỏi thì hiện tại đơn ",
   "huongDan": "Match the question with the correct answer.",
   "choices": []
  },
  {
   "noi": "Does Lucy listen to the radio?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Does Lucy listen to the radio? ↔ No, she doesn’t.📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: Does Lucy listen to the radio?\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Trả lời ngắn cho câu hỏi thì hiện tại đơ",
   "huongDan": "Look at the picture, read and match each question with the correct answer.",
   "choices": []
  },
  {
   "noi": "Does Ted take the bus to work every morning?",
   "dap": "",
   "giai": "✅ Đáp án đúng: Does Ted take the bus to work every morning? ↔ Yes, he does.📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: Does Ted take the bus to work every morning?\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Phân biệt câu h",
   "huongDan": "Match the question with the correct answer.",
   "choices": []
  },
  {
   "noi": "the boys’ shoes",
   "dap": "",
   "giai": "✅ Đáp án đúng: the boys’ shoes ↔ H📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: the boys’ shoes\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Sở hữu cách:\ndanh từ SỐ ÍT + ’s (the boy’s shoes = giày của MỘT bạn nam)\ndanh từ số n",
   "huongDan": "Look at the picture and match each phrase with the correct letter.",
   "choices": []
  },
  {
   "noi": "When do the children visit their grandma?",
   "dap": "",
   "giai": "✅ Đáp án đúng: When do the children visit their grandma? ↔ On Sundays.📘 Ngữ cảnh:\nBài yêu cầu: nối mỗi ý ở cột trái với ý phù hợp ở cột phải.\nÝ cần nối: When do the children visit their grandma?\nViệc cần làm: tìm trong cột phải ý ghép vào thành câu / ý hoàn chỉnh.🏗️ Cấu trúc: Phân biệt câu hỏi thì h",
   "huongDan": "Match the question with the correct answer.",
   "choices": []
  }
 ],
 "true_false": [
  {
   "noi": "In the picture: students.",
   "dap": "",
   "giai": "✅ Đáp án đúng: True📘 Ngữ cảnh: Yêu cầu của phần này: nhìn tranh rồi cho biết mỗi ý là đúng hay sai. Ý cần xét ở câu này là students. Việc cần làm là tìm trong tranh xem có students hay không.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít / danh từ KHÔNG đế",
   "huongDan": "Look at the picture. Are these sentences true or false?",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "There’s a helmet next to the bike.",
   "dap": "",
   "giai": "✅ Đáp án đúng: Yes📘 Ngữ cảnh: Yêu cầu của phần này: nhìn tranh rồi viết Yes nếu câu mô tả đúng, No nếu sai. Câu cần xét: There’s a helmet next to the bike. Danh từ chính của câu là helmet - danh từ đếm được số ít.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số",
   "huongDan": "Look and write Yes or No.",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "There are three girls in the playground.",
   "dap": "",
   "giai": "✅ Đáp án đúng: No📘 Ngữ cảnh: Yêu cầu của phần này: nhìn tranh rồi viết Yes nếu câu mô tả đúng, No nếu sai. Câu cần xét: There are three girls in the playground. Danh từ chính của câu là girls - danh từ số nhiều.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số í",
   "huongDan": "Look and write Yes or No.",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "In the picture: books.",
   "dap": "",
   "giai": "✅ Đáp án đúng: True📘 Ngữ cảnh: Yêu cầu của phần này: nhìn tranh rồi cho biết mỗi ý là đúng hay sai. Ý cần xét ở câu này là books. Việc cần làm là tìm trong tranh xem có books hay không.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít / danh từ KHÔNG đếm được",
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
   "giai": "✅ Đáp án đúng: True📘 Ngữ cảnh: Yêu cầu của phần này: nhìn tranh rồi cho biết mỗi ý là đúng hay sai. Ý cần xét ở câu này là clock. Việc cần làm là tìm trong tranh xem có clock hay không.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít / danh từ KHÔNG đếm được",
   "huongDan": "Look at the picture. Are these sentences true or false?",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "I can say: ‘an oranges’.",
   "dap": "",
   "giai": "✅ Đáp án đúng: FALSE📘 Ngữ cảnh: Xét câu: \"I can say: ‘an oranges’.\"🏗️ Cấu trúc:Đếm đượcđi với a / an, có số nhiều thêm -s.Không đếm đượcđi với some, không thêm -s.🔍 Giải thích chi tiết: an chỉ đi với danh từ số ít, mà oranges đang ở số nhiều; phải nói an orange hoặc some oranges. Vì vậy câu này là F",
   "huongDan": "Write T (True) or F (False).",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "In the picture: pen.",
   "dap": "",
   "giai": "✅ Đáp án đúng: True📘 Ngữ cảnh: Yêu cầu của phần này: nhìn tranh rồi cho biết mỗi ý là đúng hay sai. Ý cần xét ở câu này là pen. Việc cần làm là tìm trong tranh xem có pen hay không.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít / danh từ KHÔNG đếm được (Th",
   "huongDan": "Look at the picture. Are these sentences true or false?",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "There aren’t two balls in the playground.",
   "dap": "",
   "giai": "✅ Đáp án đúng: Yes📘 Ngữ cảnh: Yêu cầu của phần này: nhìn tranh rồi viết Yes nếu câu mô tả đúng, No nếu sai. Câu cần xét: There aren’t two balls in the playground. Danh từ chính của câu là balls - danh từ số nhiều.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số",
   "huongDan": "Look and write Yes or No.",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "There’s some sand on the ground.",
   "dap": "",
   "giai": "✅ Đáp án đúng: Yes📘 Ngữ cảnh: Yêu cầu của phần này: nhìn tranh rồi viết Yes nếu câu mô tả đúng, No nếu sai. Câu cần xét: There’s some sand on the ground. Danh từ chính của câu là sand - danh từ KHÔNG đếm được.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít ",
   "huongDan": "Look and write Yes or No.",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "There is some water in the pool.",
   "dap": "",
   "giai": "✅ Đáp án đúng: Yes📘 Ngữ cảnh: Yêu cầu của phần này: nhìn tranh rồi viết Yes nếu câu mô tả đúng, No nếu sai. Câu cần xét: There is some water in the pool. Danh từ chính của câu là water - danh từ KHÔNG đếm được.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít",
   "huongDan": "Look and write Yes or No.",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "In the picture: board.",
   "dap": "",
   "giai": "✅ Đáp án đúng: False📘 Ngữ cảnh: Yêu cầu của phần này: nhìn tranh rồi cho biết mỗi ý là đúng hay sai. Ý cần xét ở câu này là board. Việc cần làm là tìm trong tranh xem có board hay không.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít / danh từ KHÔNG đếm đượ",
   "huongDan": "Look at the picture. Are these sentences true or false?",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "In the picture: ruler.",
   "dap": "",
   "giai": "✅ Đáp án đúng: False📘 Ngữ cảnh: Yêu cầu của phần này: nhìn tranh rồi cho biết mỗi ý là đúng hay sai. Ý cần xét ở câu này là ruler. Việc cần làm là tìm trong tranh xem có ruler hay không.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít / danh từ KHÔNG đếm đượ",
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
   "giai": "✅ Đáp án đúng: Yes📘 Ngữ cảnh: Yêu cầu của phần này: nhìn tranh rồi viết Yes nếu câu mô tả đúng, No nếu sai. Câu cần xét: There are some trees around the playground. Danh từ chính của câu là trees - danh từ số nhiều.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ ",
   "huongDan": "Look and write Yes or No.",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "There aren’t any boys in the playground.",
   "dap": "",
   "giai": "✅ Đáp án đúng: No📘 Ngữ cảnh: Yêu cầu của phần này: nhìn tranh rồi viết Yes nếu câu mô tả đúng, No nếu sai. Câu cần xét: There aren’t any boys in the playground. Danh từ chính của câu là boys - danh từ số nhiều.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít",
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
   "giai": "✅ Đáp án đúng: False📘 Ngữ cảnh: Yêu cầu của phần này: nhìn tranh rồi cho biết mỗi ý là đúng hay sai. Ý cần xét ở câu này là chalks. Việc cần làm là tìm trong tranh xem có chalks hay không.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít / danh từ KHÔNG đếm đ",
   "huongDan": "Look at the picture. Are these sentences true or false?",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "There isn’t a boat in the pool.",
   "dap": "",
   "giai": "✅ Đáp án đúng: No📘 Ngữ cảnh: Yêu cầu của phần này: nhìn tranh rồi viết Yes nếu câu mô tả đúng, No nếu sai. Câu cần xét: There isn’t a boat in the pool. Danh từ chính của câu là boat - danh từ đếm được số ít.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít / ",
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
   "giai": "✅ Đáp án đúng: True📘 Ngữ cảnh: Yêu cầu của phần này: nhìn tranh rồi cho biết mỗi ý là đúng hay sai. Ý cần xét ở câu này là map. Việc cần làm là tìm trong tranh xem có map hay không.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít / danh từ KHÔNG đếm được (Th",
   "huongDan": "Look at the picture. Are these sentences true or false?",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "In the picture: backpack.",
   "dap": "",
   "giai": "✅ Đáp án đúng: True📘 Ngữ cảnh: Yêu cầu của phần này: nhìn tranh rồi cho biết mỗi ý là đúng hay sai. Ý cần xét ở câu này là backpack. Việc cần làm là tìm trong tranh xem có backpack hay không.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít / danh từ KHÔNG đế",
   "huongDan": "Look at the picture. Are these sentences true or false?",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "In the picture: teacher.",
   "dap": "",
   "giai": "✅ Đáp án đúng: True📘 Ngữ cảnh: Yêu cầu của phần này: nhìn tranh rồi cho biết mỗi ý là đúng hay sai. Ý cần xét ở câu này là teacher. Việc cần làm là tìm trong tranh xem có teacher hay không.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít / danh từ KHÔNG đếm ",
   "huongDan": "Look at the picture. Are these sentences true or false?",
   "choices": [
    "",
    ""
   ]
  },
  {
   "noi": "In the picture: eraser.",
   "dap": "",
   "giai": "✅ Đáp án đúng: False📘 Ngữ cảnh: Yêu cầu của phần này: nhìn tranh rồi cho biết mỗi ý là đúng hay sai. Ý cần xét ở câu này là eraser. Việc cần làm là tìm trong tranh xem có eraser hay không.🏗️ Cấu trúc: Nói \"có cái gì ở đâu\" thì dùng There is / There are:\nThere is + danh từ số ít / danh từ KHÔNG đếm đ",
   "huongDan": "Look at the picture. Are these sentences true or false?",
   "choices": [
    "",
    ""
   ]
  }
 ]
};
