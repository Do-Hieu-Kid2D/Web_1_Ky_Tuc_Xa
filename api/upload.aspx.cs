using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Web_1_Ky_Tuc_Xa.lib;

namespace Web_1_Ky_Tuc_Xa.api
{
    public partial class upload : System.Web.UI.Page
    {
        void edit_anh_sv(string action)
        {
            try
            {
                //lấy đc thông tin gửi lên
                HttpPostedFile anh_the = Request.Files[0];
                string ma_sv = Request["ma_sv"];
                //đường dẫn tương đối : để lưu dv
                //đường dẫn này có thể truy cập trực tiếp từ URL
                //thư mục: /anh_the : nằm ở server, truy xuất từ gốc /

                // anh_the.FileName: tên file người dùng gửi như này!
                // Làm sao chế đc tên file đánh dấu đc người gửi mà k trùng!
                string name_file_in_sever = ma_sv + "_" + anh_the.FileName;

                // Đường dẫn sever trong mục data tính từ file index đi vô!
                string path = $"/data/img_sv/{name_file_in_sever}";

                // MapPath(path) tạo đừng dẫn tuyệt đối! đường dẫn tuyệt đối trên server : để lưu file bằng lệnh save_as
                string abs_path = Server.MapPath(path);
                anh_the.SaveAs(abs_path);
                // => đến đây là lưu đc rồi đấy! 

                // Tiếp theo là lưu dường dẫn ảnh vào DB 
                //SqlServer db = new SqlServer();
                //SqlCommand cm = db.GetCmd("SP_SINH_VIEN", action);
                //cm.Parameters.Add("@hinh_anh", System.Data.SqlDbType.VarChar, 50).Value = path;
                //cm.Parameters.Add("@ma_sv", System.Data.SqlDbType.VarChar, 10).Value = ma_sv;
                //string json = (string) db.Scalar(cm);

                SqlServer db = new SqlServer();
                SqlCommand cm = db.GetCmd("SP_SINH_VIEN", action); //tạo dc 1 cm với tên proc và action tương ứng  
                cm.Parameters.Add("@ma_sv", SqlDbType.NVarChar, 10).Value = Request["ma_sv"];
                cm.Parameters.Add("@hinh_anh",SqlDbType.VarChar, 50).Value = path;
                string json = (string)db.Scalar(cm);

                Response.Write(json);
            }
            catch (Exception ex)
            {
                Response.Write(ex.Message);
            }
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            string action = Request.QueryString["action"];

            switch (action)
            {
                case "edit_anh_sv":
                    edit_anh_sv(action);
                    break;
            }

        }
    }
}