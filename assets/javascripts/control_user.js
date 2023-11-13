$(document).ready(function () {
    // function check_login() {
    //     // Lấy giá trị của trường input có id là "username"
    //     var uid = $("#username").val();

    //     // Lấy giá trị của trường input có id là "password"
    //     var pw = $("#password").val();

    //     // Hiển thị giá trị trong console (có thể thực hiện các xử lý khác ở đây)
    //     console.log(uid + ":" + pw);

    //     $.post(
    //         "./api/apiDN.aspx",
    //         {
    //             action: "login",
    //             uid: uid,
    //             pw: pw,
    //         },
    //         function (data) {
    //             alert(data);
    //             var json = JSON.parse(data);
    //             if (json.ok) {
    //                 // Lưu cookie
    //                 setCookie("uid", json.uid, 1);
    //                 setCookie("cc", json.cookie, 1);

    //                 // Kiểm tra vai trò người chơi và chuyển hướng
    //                 ban_la_ai(json);
    //             } else {
    //                 // Hiển thị thông báo đăng nhập sai
    //                 alert("Sai tên đăng nhập hoặc mật khẩu");
    //             }
    //         }
    //     );
    // }

    function ban_la_ai(json) {
        if (json.role == 100) {
            // Người quản lý
            var currentURL = window.location.href;
            if (!currentURL.endsWith("/quan_ly.html")) {
                window.location.href = "/quan_ly.html";
            }
        }

        if (json.role == 1) {
            // Sinh viên
            var currentURL2 = window.location.href;
            if (!currentURL2.endsWith("/sinh_vien.html")) {
                window.location.href = "/sinh_vien.html";
            }
        }
    }

    function check_cc() {
        console.log("Check CC trên API xem CC này OK không?");
        $.post(
            "./api/apiDN.aspx",
            {
                action: "check_cc",
            },
            function (data) {
                var json = JSON.parse(data);
                if (json.ok) {
                    ban_la_ai(json);
                }
                if (!json.ok) {
                    // alert(json.msg + " => VUI LÒNG ĐĂNG NHẬP");
                    window.location.href = "index.html";
                }
            }
        );
    }
    // Gọi hàm kiểm tra CC khi trang tải xong
    check_cc();
}); // Kết thúc hàm ready
