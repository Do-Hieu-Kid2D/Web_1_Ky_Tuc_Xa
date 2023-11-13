using System;
using Web_1_Ky_Tuc_Xa.lib;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Data;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Web_1_Ky_Tuc_Xa.api
{
    public partial class apiSV : System.Web.UI.Page
    {

        class SV
        {
            public string ma_sv, ho_ten, lop, CCCD, sdt, hinh_anh,mk;
            public Boolean gioi_tinh;
        }
        class reply
        {
            public Boolean ok;
            public string msg;
        }

        class repllySV : reply
        {
            public List<SV> data;
        }
        void list_all_sv(string action)
        {
            //khai báo biến db thuộc lớp SqlServer
            SqlServer db = new SqlServer();
            SqlCommand cm = db.GetCmd("SP_SINH_VIEN", action); //tạo dc 1 cm với tên proc và action tương ứng  
            repllySV repllySV = new repllySV();
            repllySV.data = new List<SV>();
            try
            {
                DataTable dt = new DataTable();
                dt = db.Query(cm);

                if (dt.Rows.Count > 0)
                {
                    foreach (DataRow dr in dt.Rows)
                    {
                        SV sv = new SV();
                        sv.ma_sv = dr["ma_sv"].ToString();
                        sv.ho_ten = dr["ho_ten"].ToString();
                        sv.lop = dr["lop"].ToString();
                        sv.CCCD = dr["CCCD"].ToString();
                        sv.sdt = dr["sdt"].ToString();
                        sv.hinh_anh = dr["hinh_anh"].ToString();
                        sv.mk = dr["mk"].ToString();
                        sv.gioi_tinh = Boolean.Parse(dr["gioi_tinh"].ToString());
                        repllySV.data.Add(sv);
                    }
                    repllySV.ok = true;
                    repllySV.msg = "OK Có sinh viên";
                }
                //chuyển obj L -> json text
                string json = JsonConvert.SerializeObject(repllySV);

                //phản hồi json text về trình duyệt
                this.Response.Write(json);
            }
            catch (Exception ex)
            {
                repllySV.ok = false;
                repllySV.msg = "CÓ lỗi khi khi list_all_sv " + ex.Message;
            }

        }
        
        void xoa_sv(string action)
        {
            string json = "";
            try
            {
            SqlServer db = new SqlServer();
            SqlCommand cm = db.GetCmd("SP_SINH_VIEN", action); //tạo dc 1 cm với tên proc và action tương ứng  
            cm.Parameters.Add("@ma_sv", SqlDbType.NVarChar, 10).Value = Request["ma_sv"];
                json = (string)db.Scalar(cm);

            }catch (Exception ex)
            {
                json = ex.Message;
            }
            Response.Write(json);
        }

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
                SqlServer db = new SqlServer();
                SqlCommand cm = db.GetCmd("SP_SINH_VIEN", action); //tạo dc 1 cm với tên proc và action tương ứng  
                cm.Parameters.Add("@ma_sv", SqlDbType.NVarChar, 10).Value = Request["ma_sv"];
                cm.Parameters.Add("@hinh_anh", SqlDbType.VarChar, 500).Value = path;
                string json = (string)db.Scalar(cm);

                Response.Write(json);
            }
            catch (Exception ex)
            {
                Response.Write(ex.Message);
            }
        }


        void edit_add_sv( string action)
        {
            string json = "";
            try
            {
                string ma_sv = Request["ma_sv"];
                SqlServer db = new SqlServer();
                SqlCommand cm = db.GetCmd("SP_SINH_VIEN", action); //tạo dc 1 cm với tên proc và action tương ứng  
                cm.Parameters.Add("@ma_sv", SqlDbType.NVarChar, 10).Value = Request["ma_sv"].Trim();
                cm.Parameters.Add("@ho_ten", SqlDbType.NVarChar, 50).Value = Request["ho_ten"].Trim();
                cm.Parameters.Add("@gioi_tinh", SqlDbType.Int).Value = Request["gioi_tinh"];
                cm.Parameters.Add("@lop", SqlDbType.VarChar, 50).Value = Request["lop"].Trim();
                cm.Parameters.Add("@CCCD", SqlDbType.VarChar, 12).Value = Request["CCCD"].Trim();
                cm.Parameters.Add("@mk", SqlDbType.NChar, 50).Value = Request["mk"].Trim();
                cm.Parameters.Add("@sdt", SqlDbType.NChar, 10).Value = Request["sdt"].Trim();
                if (action == "add_sv")
                {
                    if (Request.Files.Count > 0)
                    {
                        HttpPostedFile anh_the = Request.Files[0];
                        // Xử lý tệp ảnh anh_the ở đây
                        if (anh_the != null)
                        {
                            string name_file_in_sever = ma_sv + "_" + anh_the.FileName;
                            string path = $"/data/img_sv/{name_file_in_sever}";
                            string abs_path = Server.MapPath(path);
                            anh_the.SaveAs(abs_path);
                            cm.Parameters.Add("@hinh_anh", SqlDbType.VarChar, 500).Value = path;

                        }
                    }
                }

                json = (string)db.Scalar(cm);
            }
            catch (Exception ex)
            {
                json = ex.Message;
            }
            Response.Write(json);
        }


        protected void Page_Load(object sender, EventArgs e)
        {
            string action = Request["action"];
            switch (action)
            {
                case "list_all_sv":
                    list_all_sv(action);
                    break;
                case "delete_sv":
                    xoa_sv(action);
                    break;
                case "add_sv":
                case "edit_sv":
                    edit_add_sv(action);
                    break;
                case "edit_anh_sv":
                    edit_anh_sv(action);
                    break;
  
            }
        }

        
    }
}