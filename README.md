# codersX-ExpressJS-12-1
###  BÀI 1

Cuối cùng bạn quyết định implement phần validation cho trang web của mình. Bạn nghĩ trong đầu: 
Nếu ai đó mở `/transactions/<id>/complete`, với `<id>` là một giá trị không tồn tại trong db của mình thì chuyện gì sẽ xảy ra.
Bạn thử và thấy một đống lỗi lòi ra. Bạn quyết định kiểm tra xem `transaction` có `ID` như vậy có tồn tại hay không trước khi set nó thành complete.