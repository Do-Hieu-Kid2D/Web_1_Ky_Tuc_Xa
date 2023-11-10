$(document).ready(function () {
    // jQuery methods go here...
    var apiSV = "../../api/apiSV.aspx"; // https://localhost:44378/api/apiSV.aspx?action=list_all_sv

    function chi_tiet_sv() {
        // Show 1 dialog chứa thông tin details của sinh viên!
        // bên dưới dialog có các nút action!
        $.confirm({
            buttons: {
                hello: function (helloButton) {
                    // shorthand method to define a button
                    // the button key will be used as button name
                },
                hey: function (heyButton) {
                    // access the button using jquery
                    this.$$hello.trigger("click"); // click the 'hello' button
                    this.$$hey.prop("disabled", true); // disable the current button using jquery method

                    // jconfirm button methods, all methods listed here
                    this.buttons.hello.setText("Helloooo"); // setText for 'hello' button
                    this.buttons.hey.disable(); // disable with button function provided by jconfirm
                    this.buttons.hey.enable(); // enable with button function provided by jconfirm
                    // the button's instance is passed as the first argument, for quick access
                    heyButton === this.buttons.hey;
                },
                heyThere: {
                    text: "Hey there!", // text for button
                    btnClass: "btn-blue", // class for the button
                    keys: ["enter", "a"], // keyboard event for button
                    isHidden: false, // initially not hidden
                    isDisabled: false, // initially not disabled
                    action: function (heyThereButton) {
                        // longhand method to define a button
                        // provides more features
                    },
                },
            },
        });

        // $.confirm({
        //     title: "Confirm!",
        //     content: "Simple confirm!",
        //     buttons: {
        //         confirm: function () {
        //             $.alert("Confirmed!");
        //         },
        //         cancel: function () {
        //             $.alert("Canceled!");
        //         },
        //         somethingElse: {
        //             text: "Something else",
        //             btnClass: "btn-blue",
        //             keys: ["enter", "shift"],
        //             action: function () {
        //                 $.alert("Something else?");
        //             },
        //         },
        //     },
        // });
    }

    function cap_nhat_sv() {
        //alert("Hàm lấy dữ liệu all sinh viên");
        var table_sv = "";
        $.get(apiSV + "?action=list_all_sv", function (json_nhandc) {
            // có json rồi nè
            var json = JSON.parse(json_nhandc);
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
                console.log(json_nhandc);
                chi_tiet_sv(idsv, json_nhandc);
            });
        }); //get -func
    }

    cap_nhat_sv();
});
