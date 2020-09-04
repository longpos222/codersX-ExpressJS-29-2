# codersX-ExpressJS-29-2
### BÀI 2
Chúc mừng bạn đã gần hoàn thành khoá Express. Để bài tập thêm phần đa dạng: 
- Bạn hãy tưởng tượng có nhiều người muốn dùng hệ thống của bạn để chạy business thuê sách của họ. Bạn nghĩ tới việc cho họ đăng ký client mới (giống như Slack ấy).  
  
Hệ thống của bạn nay trở thành phức tạp hơn một chút:
  1. Bạn muốn người dùng có thể tự tạo shop
  2. Người dùng có thể đăng sách lên bán trên shop của họ
  3. Người dùng có thể gửi link tới shop của họ cho người khác vào đặt sách `/shops/<id>/books`  

========================
### Refactor lại cấu trúc app:
**Quyền hạn chế cho user (o is hide)**
 
|routes| user | shop & GOD |
| :--- | :----: | :----: |
|/[welcome page]| | | |
|---------|
|/users| | | |
|-- /profile| | | |
|-- -- /avatar| | | |
|-- /{user-id}/update|o | | |
|FUNC:| | | |
|-- delete|o | | |
|-- add|o | | |
|-- search| | | |
|---------|
|/shop/{user-name}||||
|-- ---- /{book-id}| | | |
|FUNC:| | | |
|-- add|o | | |
|-- delete|o | | |
|-- cart| | | |
|-- search| | | |
|---------|
|/books| | | |
|-- /{book-id}/detail|o | | |
|FUNC:| | | |
|-- add|o | | |
|-- delete|o | | |
|-- cart| | | |
|-- search| | | |
|---------|
|/transactions| | | |
|FUNC:| | | |
|-- add|o | | |
|-- delete|o | | |
|-- status|o | | |
|---------|
|/cart| | | |
|FUNC:| | | |
|-- add to tranx| | | |
|/auth/login| | | |

===============
