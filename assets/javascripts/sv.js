﻿$(document).ready(function () {
    giao_dien_animation();

    // jQuery methods go here...
    var apiSV = "../../api/apiSV.aspx"; // https://localhost:44378/api/apiSV.aspx?action=list_all_sv
    var apiUPLOAD = "../../api/upload.aspx"; // https://localhost:44378/api/apiSV.aspx?action=list_all_sv

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

    $("#dang-bai").click(function () {
        // cho nó sang bên chỗ đăng bài
        window.location.href = "./web_form/sv_blog.aspx";
    });

    // Bây giờ là render bài
    // var audio = $("#myAudio");

    // // Bắt sự kiện khi audio được tải xong
    // audio.addEventListener("loadeddata", function () {
    //     console.log("Audio is loaded and can be played");
    // });

    // // Bắt sự kiện khi audio kết thúc
    // audio.addEventListener("ended", function () {
    //     console.log("Audio playback ended");
    // });

    // // Các hàm điều khiển âm thanh
    // function playAudio() {
    //     audio.play();
    // }

    // function pauseAudio() {
    //     audio.pause();
    // }

    // function stopAudio() {
    //     audio.pause();
    //     audio.currentTime = 0;
    // }

    // Lấy block về render
    // 1. xing DB lấy json block!
    function render_5_blog_new() {
        $.post(
            apiSV,
            {
                action: "lay_blog",
            },
            function (data) {
                console.log(data);
                try {
                    let json = JSON.parse(data);
                    let data_blog = "";
                    if (json.ok) {
                        for (let blog of json.blogs) {
                            // Xử lý img và audio!

                            let img, audio;
                            if (
                                blog.img == "" ||
                                blog.img === undefined ||
                                blog.img == null ||
                                blog.img == "null"
                            ) {
                                img = `
                                <img
                                src="./data/img_sv/img_no_have.jpg"
                                alt=""
                                />`;
                            } else {
                                img = `
                                <img
                                src="${blog.img}"
                                alt=""
                            />`;
                            }

                            if (
                                blog.am_nhac == "" ||
                                blog.am_nhac === undefined ||
                                blog.am_nhac == null ||
                                blog.am_nhac == "null"
                            ) {
                                audio = "";
                            } else {
                                audio = `<audio id="myAudio" controls>
                                <source src=" ${blog.am_nhac}" type="audio/mp3">
                                Your browser does not support the audio element.
                            </audio>`;
                            }

                            data_blog += `
                    <div class="blog-item">
                        <div class="title-blog-item">
                            <i
                                class="fa-brands fa-readme"
                            ></i>
                            <h2 class="tieu-de-blog">
                                ${blog.id_blog}
                            </h2>
                        </div>
                        <div class="noi-dung-blog">
                        <div class="tren">
                            <div class="i-vi">
                            ${img}
                            ${audio}
                            </div>
                            <div class="text">
                                <h3 class="title-data-blog">
                                    ${blog.tieu_de}
                                </h3>
                                <p class="data-blog">
                                    ${blog.noi_dung}
                                </p>
                            </div>
                        </div>
                        <hr />
                        <div class="footer-blog">
                            <p class="tac-gia">
                                <span class="black"
                                    >Tác giả:</span
                                >
                                ${blog.ho_ten}
                            </p>
                            <p class="time">${blog.ngay}</p>
                        </div>
                         </div>
                    </div>`;
                        }
                    } else {
                        bao_loi(json);
                    }
                    $("#dien-blog").html(data_blog);
                } catch (e) {
                    console.log(e);
                }
            }
        );
    }

    render_5_blog_new();

    inittoatr();
    chao_hoi();
}); // end ready

function chao_hoi() {
    let chao = document.getElementById("user");
    let ten = getCookie("uid");
    if (ten != null) {
        chao.innerHTML = `Xin chào: ${ten}`;
    } else {
        chao.innerHTML = `Xin chào!`;
    }
}
// ====================================================================

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
