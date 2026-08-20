/**
 * Tên tiếng Việt của các chủ điểm ngữ pháp.
 *
 * Bám quy ước của CEC PROD: bảng kỹ năng trên PROD dùng tiếng Việt
 * ("Phát âm · Nói · Đọc · Viết · Ngữ pháp · Từ vựng · Nghe"), còn cấp độ thì
 * giữ mã quốc tế ("Cambridge Flyers / A2", "IELTS 5.0 - 5.5").
 * Chủ điểm là tên gọi nội dung nên theo vế thứ nhất — nhất là vì nó lọt vào
 * báo cáo tháng gửi cho phụ huynh, người không đọc thuật ngữ tiếng Anh.
 *
 * Giữ kèm tên tiếng Anh trong ngoặc để giáo viên vẫn đối chiếu được với giáo trình.
 */
const VI: Record<string, string> = {
  Tenses: "Thì động từ",
  Articles: "Mạo từ",
  Prepositions: "Giới từ",
  Conditionals: "Câu điều kiện",
  "Passive voice": "Câu bị động",
  "Relative clauses": "Mệnh đề quan hệ",
  "Reported speech": "Câu tường thuật",
  Comparison: "So sánh",
  Vocabulary: "Từ vựng",
  "Word form": "Dạng từ",
};

/** Tên hiển thị cho QC — ngắn, dùng trong bảng và biểu đồ */
export const topicVi = (t: string) => VI[t] ?? t;

/** Tên đầy đủ cho báo cáo gửi phụ huynh — kèm tên tiếng Anh để đối chiếu giáo trình */
export const topicFull = (t: string) => (VI[t] ? `${VI[t]} (${t})` : t);
