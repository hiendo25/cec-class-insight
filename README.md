# Lớp Học today

hiết kế màn **Danh sách Lớp học** cho hệ thống quản trị nội bộ **CEC Academic** — trung tâm tiếng Anh tại Việt Nam. Giao diện tiếng Việt, dữ liệu dày, dùng vận hành hằng ngày.




Đây là màn **thiết kế lại** một màn đã tồn tại, không phải làm mới từ đầu. Người dùng đã quen hệ thống cũ, nên phải giữ những gì họ quen và chỉ cải tiến chỗ thật sự thiếu.




## 1. Người dùng và mục đích




**QC (Class Admin)** — phụ trách khoảng 8–12 lớp, mở màn này nhiều lần mỗi ngày.




Ba câu hỏi họ cần trả lời trong 5 giây:

1. Lớp nào tôi phụ trách đang có vấn đề cần xử lý?

2. Lớp nào có buổi học hôm nay?

3. Mở đúng lớp cần vào.




Đây **không phải** màn báo cáo hay dashboard. Nó là **bàn tra cứu và mở lớp**.




## 2. Bộ nhận diện — bám theo hệ thống hiện có




Lấy từ giao diện thật, không sáng tạo bảng màu mới:




| Thành phần | Giá trị |

|---|---|

| Sidebar | Nền navy đặc `#1e2d5c` **một màu từ trên xuống dưới** — không chuyển sắc, không hoạ tiết. Chữ trắng. Mục đang chọn nền `rgba(255,255,255,0.14)`, bo góc 6px |

| Nền trang | `#f7f8fa` |

| Thẻ / bảng | Trắng `#ffffff`, viền `#e6e8ee`, bo góc 8px |

| **Header bảng** | **Nền navy đậm `#1e2d5c`, chữ trắng** — đây là đặc trưng của hệ thống, giữ nguyên |

| Dòng bảng | **Kẻ sọc**: dòng lẻ trắng, dòng chẵn `#f5f8fc` |

| Chữ chính | `#1f2430` · phụ `#6b7280` · mờ `#9aa1ae` |

| Nút chính | Nền `#1e2d5c`, chữ trắng, cao 32px, bo góc 6px |

| Nút phụ | Nền trắng, viền `#d9dde5`, chữ `#1f2430` |

| Chip trạng thái tốt | Nền `#e6f5ec`, chữ `#1f6f4a` |

| Màu cảnh báo | Đỏ `#d4342c` · Vàng `#b8791c` · Xanh lá `#1f6f4a` |

| Phông chữ | Sans-serif hệ thống (`-apple-system, "Segoe UI", system-ui`) |

| Cỡ chữ | Tiêu đề trang 20px · nội dung bảng 13px · chữ phụ 12px |

| Chiều cao dòng | 44–48px |




**Không dùng:** emoji làm biểu tượng (vẽ SVG nét mảnh 1.9–2px, cỡ 16–20px) · nền chuyển sắc · thẻ bo góc lớn có vạch màu bên trái · màu tím / cam pastel.




Khổ thiết kế: **1440 × 900** và kiểm lại ở **1280 × 800**.




## 3. Bố cục




```

┌─────────┬──────────────────────────────────────────────┐

│ Sidebar │  Breadcrumb · Tiêu đề trang                   │

│ 232px   │  Hàng bộ lọc + chip đang lọc                 │

│ navy    │  Tab trạng thái (có số đếm)                  │

│         │  Dải tóm tắt MỘT DÒNG                        │

│         │  BẢNG LỚP HỌC                                │

│         │  Phân trang                                   │

└─────────┴──────────────────────────────────────────────┘

```




### Sidebar — 5 mục, dùng chung cho mọi màn




```

[logo CEC]        ← dùng file logo gốc, không vẽ lại

🏠 Tổng quan

📚 Lớp học        ← đang chọn

📝 Assignment

📊 Báo cáo

⚙️ Cấu hình

─────────────

[avatar] Tên người dùng

         CEC Văn quán 2

```




Menu bám sát trên, khối tài khoản bám sát đáy, khoảng giữa để trống trơn — **không lấp bằng hoạ tiết**.




## 4. Tab trạng thái — quan trọng nhất




```

[Đang diễn ra 8] [Sắp diễn ra 2] [Đã kết thúc 1] [Đã huỷ 1] [Tạm dừng 0] [Tất cả 12]

        ▲ mặc định

```




| Yêu cầu | Chi tiết |

|---|---|

| Thứ tự | Đúng thứ tự trên — theo mức QC quan tâm |

| Mặc định | **"Đang diễn ra"**, không phải "Tất cả" |

| Bấm được | Bấm là lọc bảng ngay, tab đó nổi lên (gạch chân navy + chữ đậm) |

| Số đếm | Luôn hiện, cập nhật theo bộ lọc khác |




## 5. Dải tóm tắt — MỘT DÒNG




```

Hôm nay: 2 buổi ›   ·   3 lớp cần xử lý ›   ·   12 bài quá hạn ›   ·   8 bài chờ chấm ›

```




Một dòng chữ. **Không dùng 4 thẻ có biểu tượng tròn màu** — kiểu đó chiếm 1/3 màn hình và trông như template có sẵn.




Mỗi con số bấm được → lọc bảng, hiện chip đang lọc kèm nút bỏ lọc. Bấm số **không được đổi tab trạng thái** đang chọn, chỉ lọc thêm trong phạm vi đó.




## 6. Bảng — 16 cột




**Nguyên tắc cứng:** cột nào hệ thống hiện có đang hiển thị mặc định thì bản mới cũng hiển thị mặc định. Ba cột mới là **chèn thêm**, không thay chỗ cột cũ. "Chọn cột hiển thị" chỉ để người dùng tự tắt bớt, **không phải chỗ để giấu sẵn cột**.




| # | Cột | Kiểu | Ví dụ |

|---|---|---|---|

| 1 | Số thứ tự | số | `1` |

| 2 | **Lớp học** | liên kết, **cố định khi cuộn ngang** | `VQ2-D4-2501` |

| 3 | Loại lớp | chip trung tính | `Lớp thường` |

| 4 | Cơ sở | chữ | `CEC Văn quán 2` |

| 5 | Giáo viên | chữ / `Chưa gán` in nghiêng mờ | `Trần Minh Đức` |

| 6 | QC | chữ / `Chưa gán` | `Dương Viết Đạt` |

| 7 | EC | chữ / `Chưa gán` | `Nguyễn Thị Vân` |

| 8 | Sĩ số | **phân số** | `14/14 HS` |

| 9 | Lịch học | chữ | `T2 · T4 · 18:00` hoặc `Chưa xếp lịch` (chữ cam) |

| 10 | **Báo cáo** ⭐ | dấu tròn | 🟢 xong · ⚪ chưa |

| 11 | **Điểm danh** ⭐ | dấu tròn | 🟢 · ⚪ |

| 12 | **Cảnh báo** ⭐ | chữ + biểu tượng | `⚠ 2 việc` · `✓ Ổn` · `—` |

| 13 | **Buổi tới** ⭐ | ngày giờ | `Hôm nay · 19:00` (in đậm nếu hôm nay) |

| 14 | **Tiến độ** ⭐ | phân số | `5/8 buổi đã giao` |

| 15 | Bắt đầu | ngày | `18/08/2026` |

| 16 | Kết thúc | ngày | `11/10/2026` |

| 17 | Trạng thái | chip | `Đang diễn ra` |

| 18 | Thao tác | nút `⋯` | |




Thêm cột **ô tick** ở đầu để chọn nhiều dòng, và cột **Ghi chú** trong danh sách chọn cột.




⭐ = cột lấy từ mô hình vận hành hiện có (`Báo cáo`, `Điểm danh`) hoặc cột mới thêm.




**Bảng sẽ tràn màn và phải cuộn ngang — chấp nhận được.** Hệ thống cũ cũng vậy và người dùng đã quen. Chỉ cần cột `Lớp học` cố định khi cuộn.




## 7. Ba dấu tròn `Báo cáo · Điểm danh · Cảnh báo`




Đây là mô hình người dùng đã quen: quét dọc ba cột là biết buổi nào còn việc gì.




| Hiển thị | Nghĩa | Màu |

|---|---|---|

| 🟢 | Đã xong | `#0fa958` |

| ⚪ | Chưa làm | `#c4c4c4` |

| `⚠ 2 việc` | Có việc cần xử lý | chữ đỏ `#d4342c` |

| `✓ Ổn` | Không có việc | chữ xanh `#1f6f4a`, nhạt |

| `—` | Chưa có dữ liệu | chữ mờ |




## 8. Filter trên cột — làm đúng mẫu hệ thống cũ




Đây là yêu cầu quan trọng nhất của khách hàng.




**Cấu trúc: một hàng riêng ngay dưới header**, luôn hiện, mỗi cột một ô `Tất cả ▾`:




```

├──────────┬───────────┬─────────┬──────────┐

│ Lớp học  │ Loại lớp  │ Cơ sở   │ Giáo viên│  ← header NAVY, chữ trắng

├──────────┼───────────┼─────────┼──────────┤

│ Tất cả ▾ │ Tất cả ▾  │Tất cả ▾ │ Tất cả ▾ │  ← HÀNG FILTER, nền trắng

├──────────┼───────────┼─────────┼──────────┤

```




Bấm ô → thả xuống ngay dưới, rộng ~250px, cao ~300px:




```

┌──────────────────────────┐

│ Select All  Select All Matched │   ← hai mục đầu, dạng nút chữ nhỏ

├──────────────────────────┤

│ ☐ Lớp 1-1                │

│ ☐ Lớp bù                 │

│ ☐ Lớp thường             │

└──────────────────────────┘

```




- **Tick là lọc ngay** — không nút "Áp dụng", không ô tìm kiếm

- Cột đang lọc: chấm tròn xanh nhỏ cạnh tên cột

- Nhiều cột lọc cùng lúc: AND giữa các cột, OR trong một cột

- **Cột sau thu hẹp theo cột trước** — đang lọc `Lớp thường` thì filter `Giáo viên` chỉ hiện giáo viên còn lại trong tập đã lọc

- Bộ lọc lưu vào URL để gửi link được




Các cột có filter: `Lớp học · Loại lớp · Cơ sở · Giáo viên · QC · EC · Sĩ số · Lịch học · Cảnh báo · Trạng thái`.




## 9. Cảnh báo mở ra — xử ngay trong dòng




Bấm ô cảnh báo → **dòng giãn ra**, thêm khối chi tiết bên dưới. Không được ẩn các dòng khác.




```

│ VQ2-D4-2501 │ ... │ ⚠ 2 việc ⌃ │ Hôm nay · 19:00 │ ...

├─────────────────────────────────────────────────────────

│  ⚠ Việc cần xử lý trong VQ2-D4-2501

│    · Buổi 12 chưa giao bài              [Giao bài ›]

│    · 3/14 HS chưa nộp Unit 5            [Nhắc 3 em ›]

├─────────────────────────────────────────────────────────

│ VQ2-D5-2502 │ ... │ ✓ Ổn      │ Hôm nay · 18:00 │ ...

```




**Về màu — điểm dễ làm hỏng:**




Màu cảnh báo chỉ hiệu quả khi hiếm. Đừng phủ hồng nhiều tầng.




| Chỗ | Đúng | Sai |

|---|---|---|

| Dòng có cảnh báo | Nền **trắng** như dòng thường, chỉ **vạch đỏ 3px bên trái** | Phủ hồng cả dòng |

| Ô cột Cảnh báo | `⚠` đỏ + chữ đỏ trên nền trắng, **không nền không viền** | Nền hồng + viền |

| Khối mở rộng | Nền **xám nhạt** `#f7f8fa`, vạch đỏ trái | Nền hồng đậm |

| Nút trong khối | **Nút viền**: nền trắng, viền xám, chữ navy | Nút navy đặc, to |




## 10. Chọn nhiều dòng




Ô tick ở cột đầu và ở header. Khi tick ít nhất một dòng, hiện thanh hành động trên bảng:




```

☑ Đã chọn 3 lớp    [Giao bài] [Xem báo cáo] [Bỏ chọn]

```




## 11. Phân trang — đúng mẫu hệ thống cũ




```

[100 / trang ▾]           Total: 12 classes           [‹] [1] [›]

      trái                      GIỮA                     phải

```




Mặc định **100 dòng/trang**.




## 12. Các trạng thái phải thiết kế




**Đang tải** — khung xám nhấp nháy theo hình dạng bảng, không dùng vòng xoay giữa màn.




**Không có dữ liệu** — phải nói rõ đang lọc gì:

```

        (biểu tượng khay rỗng, nét mảnh)




     Không có lớp nào trong phạm vi:

     Lớp của tôi · Đang diễn ra · Cơ sở VQ2




  [Xem tất cả lớp]  [Bỏ lọc trạng thái]  [Đặt lại bộ lọc]

```

Không dùng câu chung chung kiểu *"Hãy thử thay đổi bộ lọc hoặc tạo mới"*.




**Lỗi tải** — `Không tải được danh sách lớp.` + nút `Thử lại`.




## 13. Nguyên tắc bắt buộc




1. **Mọi con số có mẫu số** — `14/14 HS`, `5/8 buổi`, `2/7 em`. Không bao giờ hiện số trần

2. **Số 0 phải phân biệt 4 loại**: `—` chưa có dữ liệu · `Chưa giao` chưa được giao · `0/5` có 5 mà chưa làm cái nào · `n/a` không áp dụng

3. **Đếm được thì bấm được** — mọi con số dẫn tới danh sách đã lọc sẵn

4. Cột `Lớp học` cố định khi cuộn ngang

5. Nút bấm cao tối thiểu 32px

6. Không emoji làm biểu tượng — SVG nét mảnh đồng bộ

7. Chỉ **một màu nổi** (navy) — cảnh báo dùng đỏ, còn lại xám. Không xanh lá + tím + cam cùng lúc




## 14. Đừng làm mấy thứ này




Phiên bản trước mắc, tránh lặp lại:




- Bốn thẻ đếm có biểu tượng tròn màu pastel xếp ngang — chiếm 1/3 màn, trông như template

- Dòng lặp lại thông tin đã có ngay trên (`Phạm vi: Lớp của tôi · Đang diễn ra · Cập nhật ...`)

- Đếm số ở hai chỗ (`6 lớp khớp phạm vi` ở đầu bảng + `Total: 6` ở chân bảng)

- Nút to màu đậm mà bấm không ra gì

- Chú thích bằng chữ kiểu *"Bấm vào số để mở danh sách"* — giao diện tốt thì không cần dạy




## 15. Dữ liệu mẫu




Dùng đúng bộ này, tiếng Việt có dấu:




| # | Lớp học | Loại | Cơ sở | Giáo viên | QC | EC | Sĩ số | Lịch học | BC | ĐD | Cảnh báo | Buổi tới | Tiến độ | Bắt đầu | Kết thúc | Trạng thái |

|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|

| 1 | VQ2-D4-2501 | Lớp thường | CEC Văn quán 2 | Trần Minh Đức | Dương Viết Đạt | Nguyễn Thị Vân | 14/14 HS | T3·T5·19:00 | ⚪ | 🟢 | ⚠ 2 việc | **Hôm nay · 19:00** | 5/8 buổi đã giao | 18/08/2026 | 11/10/2026 | Đang diễn ra |

| 2 | VQ2-D5-2502 | Lớp thường | CEC Văn quán 2 | Nguyễn Thu Hà | Dương Viết Đạt | Nguyễn Thị Vân | 12/12 HS | T2·T4·18:00 | 🟢 | 🟢 | ✓ Ổn | **Hôm nay · 18:00** | 6/8 buổi đã giao | 18/08/2026 | 11/10/2026 | Đang diễn ra |

| 3 | VQ2-D1-2502 | Lớp bù | CEC Văn quán 2 | Lê Thanh Vân | Dương Viết Đạt | Nguyễn Thị Vân | 8/8 HS | T4·18:00 | 🟢 | 🟢 | ⚠ 1 việc | Ngày mai · 18:00 | 4/6 buổi đã giao | 18/08/2026 | 11/10/2026 | Đang diễn ra |

| 4 | VQ2-R2-2601 | Lớp thường | CEC Văn quán 2 | Nguyễn Thu Hà | Dương Viết Đạt | Đồng Thị Lệ Thu | 15/15 HS | T6·18:00 | 🟢 | 🟢 | ✓ Ổn | 22/08 · 18:00 | 7/8 buổi đã giao | 12/08/2026 | 12/12/2026 | Đang diễn ra |

| 5 | VQ2-CF-2601 | Lớp bù | CEC Văn quán 2 | Trần Minh Đức | Dương Viết Đạt | Đồng Thị Lệ Thu | 10/10 HS | T7·14:00 | 🟢 | 🟢 | ✓ Ổn | 23/08 · 14:00 | 2/4 buổi đã giao | 10/08/2026 | 10/09/2026 | Đang diễn ra |

| 6 | VQ2-GA2-2501 | Lớp thường | CEC Văn quán 2 | *Chưa gán* | Nguyễn Như Quỳnh | Đồng Thị Lệ Thu | 10/10 HS | *Chưa xếp lịch* | — | — | — | *Chưa có dữ liệu* | *Chưa có dữ liệu* | 23/08/2026 | 16/11/2026 | Sắp diễn ra |




Tiêu đề trang: **Quản lý Lớp học** · phụ đề: *Theo dõi lớp, thấy việc cần xử lý và xử lý ngay trong dòng*

Người dùng đăng nhập: **Dương Viết Đạt** — QC, CEC Văn quán 2




## 16. Cần mấy khung




| # | Khung | Nội dung |

|---|---|---|

| 1 | **Trạng thái thường** | Bảng đầy đủ, mặc định "Đang diễn ra" — khung chính |

| 2 | **Filter đang mở** | Một cột mở dropdown filter, có chip đang lọc |

| 3 | **Cảnh báo mở rộng** | Một dòng giãn ra, hiện khối việc cần xử lý |

| 4 | **Chọn nhiều** | Đã tick 3 dòng, hiện thanh hành động |

| 5 | **Không có dữ liệu** | Trạng thái rỗng nói rõ đang lọc gì |




Khung 1 là chính, để lớn. Bốn khung còn lại nhỏ hơn, xếp cạnh nhau bên dưới.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://cec-class-insight.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c4bbc56d-8adb-4173-860d-e14de2d510cd).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
