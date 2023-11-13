$(document).ready(function () {
    giao_dien_animation();

    function init() {
        toastr.options = {
            closeButton: true,
            debug: false,
            newestOnTop: true,
            progressBar: false,
            positionClass: "toast-top-right",
            preventDuplicates: true,
            onclick: null,
            showDuration: "300",
            hideDuration: "1000",
            timeOut: "5000",
            extendedTimeOut: "1000",
            showEasing: "swing",
            hideEasing: "linear",
            showMethod: "fadeIn",
            hideMethod: "fadeOut",
        };
        // jQuery methods go here...
        var apiSV = "../../api/apiSV.aspx"; // https://localhost:44378/api/apiSV.aspx?action=list_all_sv
        function bao_ok(json) {
            if (json.ok) alert(json.msg);
            if (json.msg != null && json.msg != "") {
                toastr["info"]("<b>Thông báo</b><br>" + json.msg);
                $.confirm({
                    animateFromElement: false,
                    typeAnimated: false,
                    icon: "fa fa-circle-check",
                    title: "Thông báo",
                    content: json.msg,
                    type: "green",
                    autoClose: "ok|3000",
                    buttons: {
                        ok: {
                            text: '<i class="fa fa-circle-check"></i> OK',
                            btnClass: "btn-green",
                        },
                    },
                });
            }
        }
        function bao_loi(json) {
            if (!json.ok)
                if (json.msg != null && json.msg != "") {
                    toastr["warning"]("<b>Thông báo lỗi</b><br>" + json.msg);
                    $.confirm({
                        animateFromElement: false,
                        typeAnimated: false,
                        icon: "fa fa-warning",
                        title: "Thông báo lỗi",
                        content: json.msg,
                        type: "red",
                        autoClose: "ok|3000",
                        buttons: {
                            ok: {
                                text: '<i class="fa fa-circle-check"></i> OK',
                                btnClass: "btn-danger",
                            },
                        },
                    });
                }
        }

        function chi_tiet_sv(idsv, json_nhan) {
            // Show 1 dialog chứa thông tin details của sinh viên!
            // bên dưới dialog có các nút action!
            let sv_ct;
            for (let sv of json_nhan.data) {
                if (sv.ma_sv == idsv) {
                    sv_ct = sv;
                    break;
                }
            }
            let nam = `Nam`;
            let nu = `Nữ`;
            let default_img_sv = `<img
                    class="img-in-table"
                    src="./assets/styles/img/sv_no_img.jpg"
                    alt=""
                    />`;
            let img_have = `<img
                    class="img-in-table"
                    src="./data/img_sv/img_have.jpg"
                    alt=""
                    />`;
            let gioitinh = sv_ct.gioi_tinh ? nam : nu;
            let chi_tiet = `        
        <div class="boc_ctsv">
            <div class="boc_tbsv">
                <table class="tb_ctsv">
                    <tr>
                        <td>Mã sinh viên</td>
                        <td>${sv_ct.ma_sv}</td>
                    </tr>
                    <tr>
                        <td>Họ tên</td>
                        <td>${sv_ct.ho_ten}</td>
                    </tr>
                    <tr>
                        <td>Giới tính</td>
                        <td>${gioitinh}</td>
                    </tr>
                    <tr>
                        <td>Lớp</td>
                        <td>${sv_ct.lop}</td>
                    </tr>
                    <tr>
                        <td>Căn Cước công dân</td>
                        <td>${sv_ct.CCCD}</td>
                    </tr>
                    <tr>
                        <td>Số điện thoại</td>
                        <td>${sv_ct.sdt}</td>
                    </tr>
                    <tr>
                        <td>Mật khẩu</td>
                        <td>${sv_ct.mk}</td>
                    </tr>
                    
                </table>
            </div>
            <div class="imgctsv">
                <img src="./data/img_sv/img_have.jpg" alt="" />
            </div>
        </div>`;

            $.confirm({
                title: `Chi tiết sinh viên!`,
                content: chi_tiet,
                animateFromElement: false,
                typeAnimated: false,
                backgroundDismiss: true,
                icon: "fa-solid fa-user-graduate",
                type: "blue",
                closeIconClass: "fa-solid fa fa-close",
                escapeKey: "cancel",
                boxWidth: "65%",
                useBootstrap: false,
                buttons: {
                    edit: {
                        text: '<i class="fa-solid fa-user-pen"></i> Chỉnh sửa',
                        btnClass: "btn-blue",
                        action: function () {
                            edit_sv();
                            return false; //ko đóng dialog
                        },
                    },
                    delete: {
                        text: `<i class="fa-solid fa-user-minus"></i> Xóa`,
                        btnClass: "btn-red",
                        action: function () {
                            delete_sv(sv_ct.ma_sv, sv_ct.ho_ten);
                            return false; //ko đóng dialog
                        },
                    },
                    cancel: {
                        text: '<i class="fa fa-circle-xmark"></i> Thoát',
                        keys: ["esc", "c", "C"],
                        btnClass: "btn-red",
                    },
                },
            });

            function edit_sv() {
                let content_edit_sv = ` về quy định liên quan "chỉ huy giao thông", Đại tướng Tô Lâm dẫn chứng bài học ở các nước. Ông cho biết khi đi công tác nước ngoài thấy các nước làm rất chuẩn theo hướng "đã ra đường chỉ có một luật và đèn đỏ phải dừng lại".

Song thực tế, ở Việt Nam, khi đèn đỏ xe ưu tiên vẫn được đi qua. "Như thế là xe ưu tiên không thực hiện luật. Quy định này rất dở, và nguyên nhân do điều hành giao thông", theo lời Đại tướng Tô Lâm.

Ông nhắc lại ở nước ngoài, dù có xe cảnh sát dẫn đường n`;
                $.confirm({
                    title: `Chỉnh sửa thông tin sinh viên`,
                    content: content_edit_sv,
                    animateFromElement: false,
                    typeAnimated: false,
                    backgroundDismiss: true,
                    icon: "fa-solid fa-user-pen",
                    type: "blue",
                    closeIconClass: "fa-solid fa fa-close",
                    escapeKey: "cancel",
                    boxWidth: "65%",
                    useBootstrap: false,
                    buttons: {
                        edit_now: {
                            text: `<i class="fa-regular fa-floppy-disk"></i> Lưu lại`,
                            btnClass: "btn-orange",
                            // Đủ dữ liệu nhập vào cac trường rồi! gọi hàm edit!
                            action: function () {
                                edit_sv_now();
                            },
                        },
                        cancel: {
                            text: '<i class="fa fa-circle-xmark"></i> Thoát',
                            keys: ["esc", "c", "C"],
                            btnClass: "btn-blue",
                        },
                    },
                });

                function edit_sv_now() {
                    // Lấy all dữ liệu muốn edit trên form của confirm
                    // gửi lên sever để edit nhận về json thông báo!
                    // Nếu json oke thì gọi hàm báo oke - nếu k oke thì gọi báo lỗi ( đã viết sẵn!)
                }
            } // edit_sv

            function delete_sv(id, ten) {
                $.confirm({
                    title: `Xóa sinh viên`,
                    content: `<div class="tren-duoi-5 lh-14"><b>XÁC NHẬN:</b><br> Bạn chắc chắn muốn xóa sinh viên: ${ten}</div>`,
                    animateFromElement: false,
                    typeAnimated: false,
                    backgroundDismiss: true,
                    icon: "fa-solid fa-user-pen",
                    type: "red",
                    closeIconClass: "fa-solid fa fa-close",
                    escapeKey: "cancel",
                    boxWidth: "35%",
                    useBootstrap: false,
                    buttons: {
                        edit_now: {
                            text: `<i class="fa-solid fa-user-minus"></i> Xóa`,
                            btnClass: "btn-orange",
                            // Đủ dữ liệu nhập vào cac trường rồi! gọi hàm edit!
                            action: function () {
                                delete_sv_now();
                            },
                        },
                        cancel: {
                            text: '<i class="fa fa-circle-xmark"></i> Thoát',
                            keys: ["esc", "c", "C"],
                            btnClass: "btn-blue",
                        },
                    },
                });

                function delete_sv_now() {
                    // Gửi mã sinh viên cho sever delete
                    // đợi nhận phản hồi json rồi thông báo!
                    // alert("Are you sure you want to delete: " + sv_ct.ma_sv);
                    $.post(
                        apiSV,
                        {
                            action: "delete_sv",
                            ma_sv: sv_ct.ma_sv,
                        },
                        function (json) {
                            let jsonObj = JSON.parse(json);
                            if (jsonObj.ok) {
                                alert(jsonObj.ok);
                                bao_ok(jsonObj);
                            } else {
                                bao_loi(jsonObj);
                            }
                        }
                    );
                }
            } // delete_sv
        }
        // END chi_tiet_sv
        function cap_nhat_sv() {
            //alert("Hàm lấy dữ liệu all sinh viên");
            let table_sv = "";
            $.get(apiSV + "?action=list_all_sv", function (json_nhandc) {
                // có json rồi nè
                let json = JSON.parse(json_nhandc);
                //Phần đầu table
                table_sv += `<div
            class="div-chua-table-sv"
            id="div-chua-table-sv"
        >
            <table id="table-sv">
                <tr>
                    <th>STT</th>
                    <th>Mã SV</th>
                    <th style="max-width: 200px">
                        Họ tên
                    </th>
                    <th>Giới tính</th>
                    <th>Lớp</th>
                    <th>Số điện thoại</th>
                    <th>avavar</th>
                    <th>
                        Chi tiết
                        <i
                            class="fa-solid fa-address-card"
                        ></i>
                    </th>
                </tr>`;

                //lặp qua để tạo các hàng trong table
                var stt = 0;
                for (var sv of json.data) {
                    let nam = `<img src="./assets/styles/img/men.png"
                        alt=""
                        class="img_gender"
                        />`;
                    let nu = `<img src="./assets/styles/img/girl-64x64.png"
                        alt=""
                        class="img_gender"
                        />`;
                    let gioitinh = sv.gioi_tinh ? nam : nu;
                    let default_img_sv = `<img
                                    class="img-in-table"
                                    src="./assets/styles/img/sv_no_img.jpg"
                                    alt=""
                                    />`;
                    //let img_sv = `<img
                    //                        class="img-in-table"
                    //                        src="./assets/styles/img/anh-2.jpg"
                    //                        alt=""
                    //                     />`;
                    let img = "Cần thay đường dẫn ảnh đúng!";

                    let img_sv = sv.hinh_anh == "" ? default_img_sv : img;

                    table_sv += `<tr>
            <td>${++stt}</td>
            <td>${sv.ma_sv}</td>
            <td style="max-width: 200px">
                ${sv.ho_ten}
            </td>
            <td>${gioitinh}</td>
            <td>${sv.lop}</td>
            <td>
                <a href="tel:${sv.sdt}">
                    <i
                        class="fa-solid fa-phone-volume"
                    ></i
                    >${sv.sdt}</a
                >
            </td>
            <td>
                ${img_sv}
            </td>

            <td>
                <button
                    class="more-info btn_more_sv"
                    data-idsv="${sv.ma_sv}"
                >
                    <i
                        class="fa-solid fa-user-gear"
                    ></i>
                </button>
            </td>
            </tr>`;
                }
                //Nối nốt vô
                table_sv += `
            </table>
            </div>`;
                //  Lấy dữ liệu song rồi này! => render kết quả
                $("#div_chua_table_sv").html(table_sv);

                $(".btn_more_sv").click(function () {
                    // click vào đây thì show detail infomation sinh viên
                    var idsv = $(this).data("idsv"); //lấy idsv

                    // Show cái dialog thông tin details của sv idsv
                    console.log(json);
                    chi_tiet_sv(idsv, json);
                });
            }); //get -func
        }

        // Cuối document.ready!
        cap_nhat_sv();
        init();
    }
}); // end ready
