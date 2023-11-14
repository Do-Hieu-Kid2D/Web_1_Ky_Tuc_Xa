<%@ Page 
    Language="C#"
    AutoEventWireup="true"
    CodeBehind="sv_blog.aspx.cs"
    Inherits="Web_1_Ky_Tuc_Xa.web_form.sv_blog" 
    ValidateRequest="false"%>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <title>Ký túc Dkid</title>
        <link
            rel="icon"
            href="../assets/styles/img/favicon.ico"
            type="image/x-icon"
        />
        <!-- Reset CSS -->
        <!--Hiếu pro-->
        <link rel="stylesheet" href="../assets/styles/css/reset.css" />

        <!-- Front Poppins-->
        <link href="../assets/fronts/stylesheet.css" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,300;1,300;1,400;1,800&display=swap"
            rel="stylesheet"
        />

        <!-- Font_Awesome -->
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
            integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
            crossorigin="anonymous"
            referrerpolicy="no-referrer"
        />
        <!-- jquery -->
        <script src="../assets/javascripts/jqueryv371.js"></script>
        <script src="../assets/javascripts/cookie.js"></script>

        <script src="../assets/javascripts/jquery-confirm.min.js"></script>
        <link href="../assets/styles/css/jquery-confirm.min.css" rel="stylesheet" />

        <link href="../assets/styles/css/style_blog.css" rel="stylesheet" />
        <script src="../assets/javascripts/js_blog.js"></script>
    </head>
    <body>
        <header class="header">
            <h1 class="title-blog">
                Ký túc.Blog <i class="fa-solid fa-rss"></i>
            </h1>
            <p class="slogan">Chia sẻ nhiều hơn - kết nối together</p>
        </header>
        <main class="main">
            <div class="content">
                <!-- 1 tiêu đề 
                1. nội dung 
                2 hình ảnh
                3 âm thanh -->
                <div class="colunm colunm-1">
                    <form
                        enctype="multipart/form-data"
                        method="post"
                        action="sv_blog.aspx"
                        onsubmit="copy_dulieu(this)"
                    >
                        <table class="table" width="100%">
                            <tr>
                                <td>Tiêu đề:</td>
                                <td><input name="tieu_de" type="text" /></td>
                            </tr>
                            <tr>
                                <td>
                                    <button type="button">
                                        <label for="anh_the"
                                            >Chọn hình!</label
                                        ></button
                                    ><input
                                        class="gan"
                                        accept="image/*"
                                        onchange="review_anh(this)"
                                        name="anh_the"
                                        id="anh_the"
                                        type="file"
                                        alt=" "
                                        style="display: none"
                                    />
                                </td>
                                <td>
                                    <div id="chua_anh">
                                        <img id="anh_review" src="" alt="" />
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <button type="button">
                                        <label for="am_nhac"
                                            >Chọn nhạc!</label
                                        ></button
                                    ><input
                                        class="gan"
                                        accept="audio/*"
                                        name="am_nhac"
                                        id="am_nhac"
                                        type="file"
                                        style="display: none"
                                    />
                                </td>
                                <td>
                                    <audio id="nghe" controls></audio>
                                </td>
                            </tr>
                        </table>
                        <div class="viet">
                            <h2>Nội dung bài viết</h2>
                            <div
                                id="nd-bai-viet"
                                class="bai-viet"
                                contenteditable="true"
                            ></div>
                        </div>
                        <input type="hidden" name="noi_dung_bv" />
                        <input type="hidden" name="ma_sv" />
                        <button id="nut-gui" type="submit">
                            Gửi tới Ký túc.blog
                        </button>
                    </form>
                </div>

                <div runat="server" id="ve" class="colunm colunm-2">Dữ liệu về đây</div>

            </div>
        </main>

        <script>
            function copy_dulieu(f) {
                var nguon = document.getElementById("nd-bai-viet");
                f.noi_dung_bv.value = nguon.innerHTML;
                f.ma_sv.value = getCookie("uid");
            }
            function review_anh(chon_anh) {
                const [file] = chon_anh.files;
                if (file) {
                    var anh = document.getElementById("anh_review");
                    var src = URL.createObjectURL(file);
                    anh.src = src;
                    console.log(src);
                }
            }
        </script>

        <script>
            // review âm thanh!
            var audioInput = document.getElementById("am_nhac");
            var audioPlayer = document.getElementById("nghe");
            audioInput.addEventListener("change", function () {
                if (audioInput.files.length > 0) {
                    var selectedFile = audioInput.files[0];
                    var audioURL = URL.createObjectURL(selectedFile);
                    audioPlayer.src = audioURL;
                    audioPlayer.autoplay = false;
                    // audioPlayer.play();
                }
            });
        </script>

          <script>
              var json = <%=  this.json  %>;
              //$("#ve").html(json);
              alert(json);
              console.log(json);
              alert(x);
              console.log(x);

              $.confirm({
                  animateFromElement: false,
                  typeAnimated: false,
                  backgroundDismiss: true,
                  closeIconClass: "fa-solid fa fa-close",
                  escapeKey: "cancel",
                  icon: "fa fa-circle-check",
                  title: "Thông báo",
                  content: "oke",
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

          </script>


    </body>
</html>
