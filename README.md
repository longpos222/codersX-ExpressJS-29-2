# codersX-ExpressJS-08-2
### BÀI 3
Bạn chợt nhận ra là giả sử bây giờ có một người đến thuê, làm thế nào để biết ai đang thuê cuốn nào? Bạn cần phải có thêm 1 collection chứa các transaction của việc thuê sách. Mỗi object trong collection này sẽ chứa: userId, bookId, tất nhiên chúng sẽ có 1 property id riêng của mình.
1) Update lại file db json của bạn
2) Thêm route /transactions hiển thị các transactions đã tạo. 3) Thêm trạng /transactions/create chứa form gồm 2 field là 2 dropdown (sử dụng select và option để giải quyết). Một dropdown dành cho các user, 1 dropdown dành cho việc chọn sách. Đừng quên nút Create để tạo mới.
4) Action của form trên có thể để /transactions/create (hoặc để trống sẽ tự hiểu là POST lên URL hiện tại) và method là POST (of course)