# codersX-ExpressJS-16-2
### BÀI 2
Người tính không bằng trời tính. Bạn gái của bạn thông minh hơn bạn tưởng. Cô ấy không thèm hack db của bạn, mà cô ấy sử dụng brute-force để dò ra mật khẩu của bạn (sau khi đã dòm được email đăng nhập của bạn).
Bạn nhận ra rằng, thuật toán của md5 khá là cùi bắp vì nó chạy nhanh -> chỉ cần ít phút để có thể brute-force ra kết quả.
Một lý do nữa là bạn quên implement rate limiter để tránh bị brute-force nữa.
1) Sử dụng bcrypt để hash password của người dùng (google trước đã nhé)
2) Lưu lại số lần login sai của 1 người dùng vào field `wrongLoginCount` để nếu họ nhập sai lần thứ 4 trở đi, hệ thống sẽ không check hash nữa mà báo lỗi luôn (cái này không phải là rate limit)

