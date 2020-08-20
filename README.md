# codersX-ExpressJS-09-2
### BÀI 2
Bạn chợt nhận ra khi một người trả sách cho mình, mình không biết làm sao để đánh dấu là `transaction` đã được hoàn thành. Bạn bèn nghĩ ra việc thêm 1 `field` mới cho mỗi transaction là `isComplete` (boolean) nếu nó là `true` thì có nghĩa là `transaction` đã hoàn thành, sách đã được trả.
1) Thêm một link *Hoàn thành* ở mỗi transaction ở màn hình `/transactions`
2) Link này trỏ tới `/transactions/<id>/complete` trong đó <id> đại diện cho ID của transaction ở dòng đó
3) Bạn tự hiểu logic phải làm gì rồi đúng không?