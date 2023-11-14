$(document).ready(function () {
    giao_dien_animation();

    // jQuery methods go here...
    var apiSV = "../../api/apiSV.aspx"; // https://localhost:44378/api/apiSV.aspx?action=list_all_sv
    var apiKTX = "../../api/apiKTX.aspx"; // https://localhost:44378/api/apiSV.aspx?action=list_all_sv

    function inittoatr() {
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
    }
    function do_logout() {
        eraseCookie("uid");
        eraseCookie("cc");
        window.location.href = "index.html";
    }

    $("#dang_xuat").click(function () {
        $.confirm({
            animateFromElement: false,
            typeAnimated: false,
            backgroundDismiss: true,
            closeIconClass: "fa-solid fa fa-close",
            escapeKey: "cancel",
            icon: "fa fa-warning",
            title: "Thông báo!",
            content: `<div class="tren-duoi-5 lh-14">XÁC NHẬN ĐĂNG XUẤT! <br>Bạn chắc chắn muốn đăng xuất?!</div>`, // Lưu ý: bạn cần định nghĩa biến msg trước khi sử dụng
            type: "red",
            boxWidth: "35%",
            useBootstrap: false,
            buttonsFocus: "no",
            buttons: {
                ok: {
                    text: '<i class="fa fa-circle-check"></i> Đăng xuất',
                    btnClass: "btn-red",
                    // keys: ["esc", "c", "C"],
                    action: function () {
                        do_logout();
                    },
                },
                no: {
                    text: '<i class="fa fa-circle-check"></i> Quay lại',
                    btnClass: "btn-green",
                    keys: ["esc", "c", "C"],
                },
            },
        });
    });

    function oke_top_left(msg) {
        toastr["info"]("<b>Thông báo</b><br>" + msg);
    }
    function bao_ok(json) {
        if (json.ok);
        if (json.msg != null && json.msg != "") {
            toastr["info"]("<b>Thông báo</b><br>" + json.msg);
            let msg = `<div class=" lh-14">${json.msg}</div>`;
            $.confirm({
                animateFromElement: false,
                typeAnimated: false,
                backgroundDismiss: true,
                closeIconClass: "fa-solid fa fa-close",
                escapeKey: "cancel",
                icon: "fa fa-circle-check",
                title: "Thông báo",
                content: msg,
                type: "green",
                boxWidth: "35%",
                useBootstrap: false,
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
                let msg = `<div style="line-height: 1.4;" class="lh-14" style>${json.msg}</div>`;
                $.confirm({
                    animateFromElement: false,
                    typeAnimated: false,
                    backgroundDismiss: true,
                    closeIconClass: "fa-solid fa fa-close",
                    escapeKey: "cancel",
                    icon: "fa fa-warning",
                    title: "Thông báo lỗi",
                    content: msg,
                    type: "red",
                    boxWidth: "35%",
                    useBootstrap: false,
                    autoClose: "ok|3000",
                    buttons: {
                        ok: {
                            text: '<i class="fa fa-circle-check"></i> OK',
                            btnClass: "btn-red",
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
        let img_sv_ct = "./data/img_sv/img_no_have.jpg";
        img_sv_ct =
            sv_ct.hinh_anh == ""
                ? "./data/img_sv/img_no_have.jpg"
                : sv_ct.hinh_anh;
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
                <img src="${img_sv_ct}" alt="" />
            </div>
        </div>`;

        var dialog_ctsv = $.confirm({
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
            let gt_sv = "";
            if (sv_ct.gioi_tinh == 1) {
                gt_sv = `<input type="radio" id="Nam" name="goi_tinh" value="1" checked />
                        <label class="tay" for="Nam">Nam</label> 	&nbsp; 	&nbsp;
                        <input type="radio" id="Nu" name="goi_tinh" value="0" />  
                        <label class="tay" for="Nu">Nữ</label>`;
            } else {
                gt_sv = `<input type="radio" id="Nam" name="goi_tinh" value="1" />
                        <label class="tay" for="Nam">Nam</label>     &nbsp;     &nbsp;
                        <input type="radio" id="Nu" name="goi_tinh" value="0" checked />  
                        <label class="tay" for="Nu">Nữ</label>`;
            }
            let content_edit_sv = `
            <div class="boc_ctsv">
            <table class=" tb_insert tb_sua_sv tb-border-none">
                <tr>
                    <td>
                        <label   title="Mã sinh viên không được sửa!" for="ma_sv">Mã sinh viên:&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    </td>
                    <td>
                        <input readonly title="Mã sinh viên không được sửa!" type="text" id="ma_sv" name="ma_sv" value="${sv_ct.ma_sv}" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="ho_ten">Họ tên:&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    </td>
                    <td>
                        <input type="text" id="ho_ten" name="ho_ten" value="${sv_ct.ho_ten}"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="fname">Giới tính:&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    </td>
                    <td >
                        ${gt_sv}
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="lop">Lớp:&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    </td>
                    <td>
                        <input type="text" id="lop" name="lop" value="${sv_ct.lop}"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="CCCD">Căn Cước:&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    </td>
                    <td>
                        <input type="text" id="CCCD" name="CCCD" value="${sv_ct.CCCD}"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="sdt">Số điện thoại:&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    </td>
                    <td>
                        <input type="text" id="sdt" name="sdt" value="${sv_ct.sdt}"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="mk">Mật khẩu:&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    </td>
                    <td>
                        <input type="text" id="mk" name="mk" value="${sv_ct.mk}"/>
                    </td>
                </tr>
            </table>
            <div class=" imgsuasv ">
                <input  class="chon_anh_suasv" type="file" id="chon_anh_suasv"/>
                <img id="img_sua_sv" src="${img_sv_ct}" alt="" />
            </div>
        </div>
        <script>
            $("#chon_anh_suasv").on("change", function () {
                var fileInput = document.getElementById("chon_anh_suasv");
                var file_dc_chon = fileInput.files[0];
                if (is_picture(file_dc_chon)) {
                    review_img_select(fileInput);
                } else {
                    alert("Bạn chọn file không phải ảnh!");
                     $("#img_sua_sv").attr("src", "");
                }
            });


            function review_img_select(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $("#img_sua_sv").attr("src", e.target.result);
                };

                reader.readAsDataURL(input.files[0]);
                }
            }

            function is_picture(file) {
                if (file) {
                var fileName = file.name;
                var fileExtension = fileName.split(".").pop().toLowerCase();

                var imageExtensions = ["jpg", "jpeg", "png", "gif"];

                if (imageExtensions.indexOf(fileExtension) !== -1) {
                    return true;
                } else {
                    return false;
                    }
                } else {
                    // chưa chọn file
                    return false;
                }
            }
        </script>
        `;
            var dialog_edit_sv = $.confirm({
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
                        // keys: ["esc", "c", "C"],
                        btnClass: "btn-blue",
                    },
                },
            });

            function edit_sv_now() {
                // Lấy all dữ liệu muốn edit trên form của confirm
                // gửi lên sever để edit nhận về json thông báo!
                // Nếu json oke thì gọi hàm báo oke - nếu k oke thì gọi báo lỗi ( đã viết sẵn!)
                let radioButtons = document.getElementsByName("goi_tinh");
                let ma_sv = document.getElementById("ma_sv").value;
                let ho_ten = document.getElementById("ho_ten").value;
                let gioi_tinh;
                let lop = document.getElementById("lop").value;
                let CCCD = document.getElementById("CCCD").value;
                let sdt = document.getElementById("sdt").value;
                let mk = document.getElementById("mk").value;
                for (var i = 0; i < radioButtons.length; i++) {
                    if (radioButtons[i].checked) {
                        // Nếu radio được chọn, log giá trị của nó
                        gioi_tinh = radioButtons[i].value;
                        break;
                    }
                }

                let thongtinsv = {
                    action: "edit_sv",
                    ma_sv: sv_ct.ma_sv,
                    ho_ten: ho_ten,
                    gioi_tinh: gioi_tinh,
                    lop: lop,
                    CCCD: CCCD,
                    sdt: sdt,
                    mk: mk,
                };

                $.post(apiSV, thongtinsv, function (json) {
                    let jsonOBJ = JSON.parse(json);
                    if (jsonOBJ.ok) {
                        bao_ok(jsonOBJ);
                        cap_nhat_sv();
                        dialog_edit_sv.close();
                        dialog_ctsv.close();
                    } else {
                        bao_loi(jsonOBJ);
                    }
                    // alert(json);
                });

                console.log(thongtinsv);
                // gửi ảnh đi
                // do là lập trình gà nên gửi ảnh đi riêng lẻ!           <=============
                // nói phét là có thể người dùng k chọn ảnh!
                let fileInput = document.getElementById("chon_anh_suasv");
                let file_dc_chon = fileInput.files[0];
                let flag = is_picture(file_dc_chon);
                if (flag) {
                    // Tạo đối tượng FormData để đóng gói dữ liệu form
                    let formData = new FormData();
                    formData.append("file", file_dc_chon);
                    formData.append("ma_sv", ma_sv);
                    formData.append("action", "edit_anh_sv");
                    // Gửi AJAX request
                    $.ajax({
                        url: apiSV, // Đường dẫn đến server xử lý upload
                        type: "POST",
                        data: formData,
                        contentType: false,
                        processData: false,
                        success: function (data) {
                            // Xử lý kết quả từ máy chủ
                            console.log(data);
                            try {
                                let jsonOBJ = JSON.parse(data);
                                if (jsonOBJ.ok) {
                                    //bao_ok(jsonOBJ); // cái này mà up ảnh nữa thì nó báo cả đường dẫn
                                    cap_nhat_sv();
                                    dialog_edit_sv.close();
                                    dialog_ctsv.close();
                                } else {
                                    let jsonOBJ = JSON.parse(data);
                                    bao_loi(jsonOBJ);
                                }
                            } catch (data) {
                                console.log(data.message);
                            }
                        },
                        // error: function (error) {
                        //     // Xử lý lỗi nếu c
                        //     if (error.ok) {
                        //         let jsonOBJ = JSON.parse(error);
                        //         bao_ok(jsonOBJ);
                        //         cap_nhat_sv();
                        //         dialog_edit_sv.close();
                        //         dialog_ctsv.close();
                        //     } else {
                        //         let jsonOBJ = JSON.parse(error);
                        //         bao_loi(jsonOBJ);
                        //     }
                        // },
                    });
                }
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
                            bao_ok(jsonObj);
                            cap_nhat_sv();
                            dialog_ctsv.close();
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
                                    src="./data/img_sv/sv_no_img.jpg"
                                    alt=""
                                    />`;
                let img = `<img
                                       class="img-in-table"
                                       src="${sv.hinh_anh}"
                                       alt=""
                                    />`;

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

    $("#tai_lai_ds_sv").click(() => {
        // Load lại thì easy!!
        cap_nhat_sv();
        const currentTime = getCurrentTimeFormatted();
        oke_top_left(`${currentTime}<br> Đã cập nhật danh sách sv mới nhất`);
    });

    $("#them_sv").click(() => {
        // Mở form cho iem điền rồi add vô DB thôi

        let content_add_sv = `
            <div class="boc_ctsv">
            <table class="tb_insert tb_sua_sv tb-border-none">
                <colgroup>
                    <col style="width: 30%;">
                    <!-- Đặt độ rộng cho cột đầu tiên là 30% -->
                    <col>
                    <!-- Các cột khác sẽ có độ rộng mặc định -->
                </colgroup>

                <tr>
                    <td>
                        <label for="ma_sv">Mã sinh viên:&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    </td>
                    <td>
                        <input type="text" id="ma_sv" name="ma_sv"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="ho_ten">Họ tên:&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    </td>
                    <td>
                        <input type="text" id="ho_ten" name="ho_ten"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="fname">Giới tính:&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    </td>
                    <td style="padding:10px 150px 10px 0px ;">
                        <input type="radio" id="nam" name="gioi_tinh" value="1">
                        <label for="nam">Nam</label>&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="radio" id="nu" name="gioi_tinh" value="0">
                        <label for="nu">Nữ</label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="lop">Lớp:&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    </td>
                    <td>
                        <input type="text" id="lop" name="lop" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="CCCD">Căn Cước:&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    </td>
                    <td>
                        <input type="text" id="CCCD" name="CCCD"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="sdt">Số điện thoại:&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    </td>
                    <td>
                        <input type="text" id="sdt" name="sdt" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="mk">Mật khẩu:&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    </td>
                    <td>
                        <input placeholder="Mặc định H12345678" type="text" id="mk" name="mk"/>
                    </td>
                </tr>
            </table>
            <div class=" imgsuasv ">
                <input  class="chon_anh_suasv" type="file" id="chon_anh_suasv"/>
                <img id="img_sua_sv" src="#!" alt="" />
            </div>
        </div>
        <script>
            $("#chon_anh_suasv").on("change", function () {
                var fileInput = document.getElementById("chon_anh_suasv");
                var file_dc_chon = fileInput.files[0];
                if (is_picture(file_dc_chon)) {
                    review_img_select(fileInput);
                } else {
                    alert("Bạn chọn file không phải ảnh!");
                       $("#img_sua_sv").attr("src", "");

                }
            });


            function review_img_select(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $("#img_sua_sv").attr("src", e.target.result);
                };

                reader.readAsDataURL(input.files[0]);
                }
            }

            function is_picture(file) {
                if (file) {
                var fileName = file.name;
                var fileExtension = fileName.split(".").pop().toLowerCase();

                var imageExtensions = ["jpg", "jpeg", "png", "gif"];

                if (imageExtensions.indexOf(fileExtension) !== -1) {
                    return true;
                } else {
                    return false;
                    }
                } else {
                    // chưa chọn file
                    return false;
                }
            }
        </script>
        `;

        var dialog_add_sv = $.confirm({
            title: `Thêm sinh viên`,
            content: content_add_sv,
            animateFromElement: false,
            typeAnimated: false,
            backgroundDismiss: true,
            icon: "fa-solid fa-user-plus",
            type: "green",
            closeIconClass: "fa-solid fa fa-close",
            escapeKey: "cancel",
            boxWidth: "60%",
            useBootstrap: false,
            buttons: {
                add_now: {
                    text: `<i class="fa-solid fa-user-plus"></i> Thêm`,
                    btnClass: "btn-green",
                    // Đủ dữ liệu nhập vào cac trường rồi! gọi hàm edit!
                    action: function () {
                        add_sv_now();
                        return false;
                    },
                },
                cancel: {
                    text: '<i class="fa fa-circle-xmark"></i> Thoát',
                    btnClass: "btn-blue",
                },
            },
        });

        function add_sv_now() {
            let ma_sv = $("#ma_sv").val();
            let ho_ten = $("#ho_ten").val();
            let gioi_tinh = $("input[name='gioi_tinh']:checked").val();
            let lop = $("#lop").val();
            let CCCD = $("#CCCD").val();
            let sdt = $("#sdt").val();
            let mk = $("#mk").val();
            let chon_anh_suasv = $("#chon_anh_suasv")[0].files[0];

            // Cái này chuyển đối tượng thành text rồi gửi đi thì trên sever phải chuyển lại là đối tươnhj
            //  rồi mới truy cập đc data để xử lys

            // formData.append("data_add_sv", JSON.stringify(data_add_sv));
            // let data_add_sv = {
            //     action: "add_sv",
            //     ma_sv: ma_sv,
            //     ho_ten: ho_ten,
            //     goi_tinh: gioi_tinh,
            //     lop: lop,
            //     CCCD: CCCD,
            //     sdt: sdt,
            //     mk: mk,
            //     hinh_anh: chon_anh_suasv,
            // };
            // console.log(data_add_sv);

            let formData = new FormData();

            // formData.append("file", file_dc_chon);
            formData.append("action", "add_sv");
            formData.append("ma_sv", ma_sv);
            formData.append("ho_ten", ho_ten);
            formData.append("gioi_tinh", gioi_tinh);
            formData.append("CCCD", CCCD);
            formData.append("sdt", sdt);
            formData.append("lop", lop);
            formData.append("mk", mk);
            let flaga = is_picture(chon_anh_suasv);
            if (flaga) {
                formData.append("hinh_anh", chon_anh_suasv);
            } else {
                // alert("No img");
                // formData.append("hinh_anh", $("#chon_anh_suasv")[0].files[10]);
            }

            $.ajax({
                url: apiSV,
                type: "POST",
                data: formData,
                processData: false, // Important! FormData should not be processed
                contentType: false, // Important! Tell jQuery not to set contentType

                success: function (data) {
                    // Xử lý dữ liệu nhận được từ server
                    try {
                        let jsonOBJ = JSON.parse(data);
                        if (jsonOBJ.ok) {
                            bao_ok(jsonOBJ);
                            cap_nhat_sv();
                            dialog_add_sv.close();
                        } else {
                            let jsonOBJ = JSON.parse(data);
                            bao_loi(jsonOBJ);
                        }
                    } catch (error) {
                        alert("Đã xảy ra lỗi catch: " + error.message);
                        console.log("Đã xảy ra lỗi catch:", error.message);
                    }
                    // return false;
                },
                error: function (error) {
                    // Xử lý lỗi
                    console.log(error);
                    return false;
                },
            });
        }
    });

    // KÝ TÚC XÁ

    function cap_nhat_ktx() {
        // post luôn api để lấy data về render ký túc!
        $.post(
            apiSV,
            {
                action: "list_all_ktx",
            },
            function (data) {
                // alert("ký túc:" + data);
                // Ký túc đang cố định 150 phòng!
                // for qua 50 phòng thì chuyển sang K tiếp theo.
                let du_lieu_ktx = `<div class="day-nha" id="k1">
                            <div class="title-nha">
                                <h3>Nhà K1</h3>
                            </div>
                            <div class="nha">`;
                let json = JSON.parse(data);
                if (json.ok) {
                    for (let p of json.data) {
                        du_lieu_ktx += `
                            <div data-ma="${
                                p.ma_phong
                            }" class="phong ${check_sl_nguoi(p)}">
                                    <p class="title">${p.ma_phong}</p>
                                    <p class="desc">${p.so_nguoi_dang_o}/${
                            p.so_giuong
                        }</p></div>
                        `;
                        if (p.ma_phong == "k1-510") {
                            du_lieu_ktx += "</div></div>"; // đóng div k1
                            du_lieu_ktx += `<div class="day-nha" id="k2">
                                            <div class="title-nha">
                                                <h3>Nhà K2</h3>
                                            </div>
                                            <div class="nha">`;
                        }
                        if (p.ma_phong == "k2-510") {
                            du_lieu_ktx += "</div></div>"; // đóng div k2
                            du_lieu_ktx += `<div class="day-nha" id="k3">
                                            <div class="title-nha">
                                                <h3>Nhà K3</h3>
                                            </div>
                                            <div class="nha">`;
                        }
                    } // vòng for
                    $("#nd-ki-tuc").html(du_lieu_ktx);
                    // Viết tiếp hàm sk click ở đây
                    $(".phong").click(function () {
                        // code here
                        let ma_phong = $(this).data("ma");
                        let flag_btn = 0;
                        if ($(this).hasClass("phong-thieu")) {
                            flag_btn = 1;
                        }
                        if ($(this).hasClass("phong-du")) {
                            flag_btn = 2;
                        }
                        // Tiếp tục xuống DB lấy detail phòng là chi tiết sinh viên đã ở trong phòng!
                        $.post(
                            apiSV,
                            {
                                action: "sinh_vien_trong_phong",
                                ma_phong: ma_phong,
                            },
                            function (data) {
                                // alert(data);
                                let json = JSON.parse(data);
                                if (json.ok) {
                                    let chi_tiet = ` <div class="">
                                    <div class="">
                                    <div style=" color:#2fa4e7; font-size: 28px;padding: 5px 0px 15px; font-weight: 500; text-align: center;">
                                    ${ma_phong} </div>
                                    <table   class="tb_ctsv">`;
                                    chi_tiet += `<tr>
                                                <td>Mã SV</td>
                                                <td>Họ tên</td>
                                                <td>Giới tính</td>
                                                <td>Lớp</td>
                                                <td>Số điện thoại</td>
                                                <td>Ngày vào phòng</td>
                                                <td >Xóa</td>
                                            </tr>`;
                                    for (var key in json) {
                                        if (
                                            json.hasOwnProperty(key) &&
                                            key.startsWith("sv_")
                                        ) {
                                            var sinhVien = json[key];
                                            let gt =
                                                sinhVien.gioi_tinh == 1
                                                    ? "Nam"
                                                    : "Nữ";
                                            chi_tiet += `<tr>
                                                <td  >${key}</td>
                                                <td>${sinhVien.ho_ten}</td>
                                                <td>${gt}</td>
                                                <td>${sinhVien.lop}</td>
                                                <td> 
                                                    <a href="tel:${sinhVien.sdt}">
                                                    <i 
                                                        class=" pd3 fa-solid fa-phone-volume"
                                                    ></i
                                                    >${sinhVien.sdt}</a
                                                ></td>
                                                <td>${sinhVien.ngay_vao_phong}</td>
                                                <td>
                                                <i
                                                style = "color: #ff5c33"  
                                                data-uid="${key}" 
                                                class="xoa-svp tay pd fa-solid fa-user-slash"></i>
                                                </td>
                                           `;
                                        }
                                    }
                                    chi_tiet += `</table>
                                                    </div>
                                                </div>
                                                
                                                `;
                                    //Đã có data để hiện lên
                                    var dialog_chi_tiet_phong = $.confirm({
                                        title: `Chi tiết phòng!`,
                                        content: chi_tiet,
                                        animateFromElement: false,
                                        typeAnimated: false,
                                        backgroundDismiss: true,
                                        icon: "fa-solid fa-circle-info",
                                        type: "blue",
                                        closeIconClass: "fa-solid fa fa-close",
                                        escapeKey: "cancel",
                                        boxWidth: "80%",
                                        useBootstrap: false,
                                        buttons: {
                                            add: {
                                                text: '<i class="fa-solid fa-user-plus"></i> Thêm',
                                                btnClass: "btn-green",
                                                isHidden: true,
                                                action: function () {
                                                    add_sv_to_room();
                                                    return false; //ko đóng dialog
                                                },
                                            },
                                            cancel: {
                                                text: '<i class="fa fa-circle-xmark"></i> Thoát',
                                                keys: ["esc", "c", "C"],
                                                btnClass: "btn-blue",
                                            },
                                        },
                                        onContentReady: function () {
                                            if (
                                                flag_btn == 0 ||
                                                flag_btn == 1
                                            ) {
                                                dialog_chi_tiet_phong.buttons.add.isHidden = false;
                                            }
                                            $(".xoa-svp").click(function () {
                                                // nút xóa click -> xóa thôi
                                                let ma_phong;
                                                ma_phong = $(this).data("uid");
                                                $.post(
                                                    apiSV,
                                                    {
                                                        action: "de",
                                                        ma_sv: sv_ct.ma_sv,
                                                    },
                                                    function (json) {
                                                        let jsonObj =
                                                            JSON.parse(json);
                                                        if (jsonObj.ok) {
                                                            bao_ok(jsonObj);
                                                            cap_nhat_sv();
                                                            dialog_ctsv.close();
                                                        } else {
                                                            bao_loi(jsonObj);
                                                        }
                                                    }
                                                );
                                            });
                                        },
                                    });
                                } else {
                                    alert(json.msg);
                                }
                            }
                        );
                    });
                }
            }
        );

        function check_sl_nguoi(phong) {
            if (phong.so_nguoi_dang_o == 0) {
                return "phong-trong";
            }
            if (phong.so_nguoi_dang_o == phong.so_giuong) {
                return "phong-du";
            }
            return "phong-thieu";
        }
    }

    // Cuối document.ready!
    cap_nhat_sv();
    cap_nhat_ktx();
    inittoatr();
    chao_hoi();
}); // end ready

// HẾT READY RỒI

// =====================================================================================================================

function chao_hoi() {
    let chao = document.getElementById("user-ql");
    let ten = getCookie("uid");
    if (ten != null) {
        chao.innerHTML = `Xin chào: ${ten}`;
    }
}

function giao_dien_animation() {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const tabs = $$(".tab-item");
    const panes = $$(".tab-pane");
    const panes_list = $$(".list-pane");

    tabs.forEach((tab, index) => {
        const pane = panes[index];
        const list_pane = panes_list[index];

        tab.onclick = function () {
            $(".tab-item.active").classList.remove("active");
            $(".tab-pane.active").classList.remove("active");
            $(".list-pane.active").classList.remove("active");

            this.classList.add("active");
            pane.classList.add("active");
            list_pane.classList.add("active");
        };
    });
}

function review_img_select(input) {
    // truyền vào cái input có type là : type="file" thì khi nào nó change check nó là ảnh thì review!
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        // id vùng chứa ảnh <img id="vung_anh" src="#" alt="your image" />
        reader.onload = function (e) {
            $("#img_sua_sv").attr("src", e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function is_picture(file) {
    if (file) {
        // Kiểm tra phần mở rộng của tệp tin
        var fileName = file.name;
        var fileExtension = fileName.split(".").pop().toLowerCase();

        // Mảng các phần mở rộng của file ảnh
        var imageExtensions = ["jpg", "jpeg", "png", "gif"];

        // Kiểm tra xem phần mở rộng có thuộc danh sách các phần mở rộng của file ảnh không
        if (imageExtensions.indexOf(fileExtension) !== -1) {
            // File là file ảnh
            return true;
        } else {
            // File không phải là file ảnh
            return false;
        }
    } else {
        // chưa chọn file
        return false;
    }
}

function getCurrentTimeFormatted() {
    const now = new Date();

    const seconds = now.getSeconds().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const hours = now.getHours().toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = now.getFullYear();

    const formattedTime = `${seconds}:${minutes}:${hours} ${day}/${month}/${year}`;

    return formattedTime;
}
