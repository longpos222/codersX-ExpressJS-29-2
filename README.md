# codersX-ExpressJS-03
### BÀI 1 

1) Tạo một form khác trong cùng page chứa 1 input với name=todo, nút Create
2) Khi nhấn Create, form sẽ được gửi theo method POST tới /todos/create
3) Tạo route /todos/create, khi có POST request gửi lên thì tạo một todo mới và cho vào danh sách, sau đó quay lại trang trước
Gợi ý: dùng res.redirect('back')