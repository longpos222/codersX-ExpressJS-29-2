# codersX-ExpressJS-21
### BÀI 1
- Khách hàng bắt đầu than phiền vì họ không được up avatar. Bạn quyết định làm tính năng upload avatar cho user.
- Bạn nghe những người xung quanh đồn thổi về một dịch vụ up ảnh lên cloud gọi là Cloudinary. Bạn quyết định đăng ký tài khoản và dùng thử nó. Nó có hỗ trợ API cho Node để có thể tải ảnh lên.
- Hãy làm một trang update profile cho user của bạn `/profile`, trong đó có form update thông tin người dùng, avatar hiện tại (nếu không có thì hiển thị 1 default avatar, bạn có thể tìm trên google image cả lố) và một đường link dẫn tới trang update avatar `/profile/avatar`.
- Trang update avatar có chứa avatar hiện tại và 1 form có file input để upload avatar mới, kèm theo nút `Submit`.
- Khi submit, file sẽ được gửi lên server, sau đó server sẽ upload lên Cloudinary (để tránh bị lộ service đang được dùng cho user, thêm nữa trong tương lai bạn có đổi dịch vụ không dùng Cloudinary nữa thì không phải update lại code phía client).
- Bạn lưu đường dẫn trả về từ Cloudinary vào 1 field `avatarUrl`