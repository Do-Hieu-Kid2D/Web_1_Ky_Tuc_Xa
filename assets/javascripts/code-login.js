$(document).ready(function () {
    function check_login() {
        // Lấy giá trị của trường input có id là "username"
        var uid = $("#username").val();

        // Lấy giá trị của trường input có id là "password"
        var pw = $("#password").val();

        // Hiển thị giá trị trong console (có thể thực hiện các xử lý khác ở đây)
        console.log(uid + ":" + pw);

        $.post(
            "./api/apiDN.aspx",
            {
                action: "login",
                uid: uid,
                pw: pw,
            },
            function (data) {
                alert(data);
                var json = JSON.parse(data);
                if (json.ok) {
                    // Lưu cookie
                    setCookie("uid", json.uid, 1);
                    setCookie("cc", json.cookie, 1);

                    // Kiểm tra vai trò người chơi và chuyển hướng
                    ban_la_ai(json);
                } else {
                    // Hiển thị thông báo đăng nhập sai
                    alert("Sai tên đăng nhập hoặc mật khẩu");
                }
            }
        );
    }

    function ban_la_ai(json) {
        if (json.role == 100) {
            // Người quản lý
            window.location.href = "quan_ly.html";
        }

        if (json.role == 1) {
            // Sinh viên
            window.location.href = "sinh_vien.html";
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
                if (json.role == 1) {
                    alert(
                        "Bạn là sinh viên mã: " +
                            json.uid +
                            " trang web tôi quá pro! bạn sẽ đến trang chủ của bạn ngay!"
                    );
                }
                if (json.role == 100) {
                    alert(
                        "Hello Quản lý siuuuuuu cấp: " +
                            json.uid +
                            " bạn sẽ vào trang quản lý ngay!"
                    );
                }
                if (json.ok) {
                    ban_la_ai(json);
                }
                if (!json.ok) {
                    alert(json.msg + " => VUI LÒNG ĐĂNG NHẬP");
                }
            }
        );
    }

    function check_input() {
        // Get input values
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        // Check if username is empty
        if (username.trim() === "" && password.trim() === "") {
            alert("Nhập thông tin đã bạn ơi!");
            return false;
        }
        if (username.trim() === "") {
            alert("Bạn chưa nhập tài khoản!");
            return false;
        }

        // Check if password is empty
        if (password.trim() === "") {
            alert("Bạn chưa nhập mật khẩu!");
            return false;
        }
        if (username.trim() !== "" && password.trim() !== "") {
            return true;
        }

        return false;
    }

    $("#cmd-login").click(function () {
        if (check_input()) {
            check_login();
        }
        var inputUsername = document.getElementById("username");
        inputUsername.focus();
    });

    // Thêm sự kiện keydown vào input và gọi hàm khi có sự kiện
    document.addEventListener("keydown", function (event) {
        // Kiểm tra xem phím nhấn có phải là phím "Enter" không
        if (event.key === "Enter") {
            // Gọi hàm khi nhấn Enter
            if (check_input()) {
                check_login();
            }
            var inputUsername = document.getElementById("username");
            inputUsername.focus();
        }
    });
    var inputUsername = document.getElementById("username");
    inputUsername.focus();

    // Gọi hàm kiểm tra CC khi trang tải xong
    check_cc();
}); // Kết thúc hàm ready
