using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Web_1_Ky_Tuc_Xa.lib;

namespace Web_1_Ky_Tuc_Xa.web_form
{
    public partial class sv_blog : System.Web.UI.Page
    {

        public string json;
        public string xxx = "jfiifjhchjchjo jjsdjosd";
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                string tieu_de = Request.Form["tieu_de"];
                string noi_dung = Request.Form["noi_dung_bv"];
                string ma_sv = Request.Form["ma_sv"];
                Boolean co_anh = false;
                Boolean co_nhac = false;
                HttpPostedFile anh_the = Request.Files["anh_the"];
                HttpPostedFile am_nhac = Request.Files["am_nhac"];
                string path_anh = "", path_nhac = "";
                if (anh_the != null && anh_the.ContentLength > 0)
                {
                    co_anh = true;
                }
                if (am_nhac != null && am_nhac.ContentLength > 0)
                {
                    co_nhac = true;
                }
                if (co_anh)
                {
                    path_anh = $"/data/blog_img/{ma_sv +"_"+ anh_the.FileName}";
                    string abs_path_anh = Server.MapPath(path_anh);
                    anh_the.SaveAs(abs_path_anh);
                }
                if (co_nhac)
                {
                    path_nhac = $"/data/blog_mp3/{ma_sv +"_"+ am_nhac.FileName}";
                    string abs_path_nhac = Server.MapPath(path_nhac);
                    am_nhac.SaveAs(abs_path_nhac);
                }
                //1. Tạo đc mã blog gồm số thứ tự blog trong DB + mã sv:
                //lấy đc số blog đang có trong db sau đó +1 => mã số blog mới
                SqlServer db = new SqlServer();
                SqlCommand cm = db.GetCmd("SP_BLOG", "id_blog_bao_nhieu"); //tạo dc 1 cm với tên proc và action tương ứng  
                string so_blog_now = (string)db.Scalar(cm);
                string ma_blog = so_blog_now + "_" + ma_sv;

                SqlCommand cm2 = db.GetCmd("SP_BLOG", "them_blog");
                cm2.Parameters.Add("@ma_sv", System.Data.SqlDbType.VarChar, 10).Value = ma_sv;
                cm2.Parameters.Add("@tieu_de", System.Data.SqlDbType.NVarChar, 500).Value = tieu_de;
                cm2.Parameters.Add("@noi_dung", System.Data.SqlDbType.NVarChar, -1).Value = noi_dung;
                cm2.Parameters.Add("@img", System.Data.SqlDbType.VarChar, 100).Value = path_anh;
                cm2.Parameters.Add("@am_nhac", System.Data.SqlDbType.VarChar, 100).Value = path_nhac;
                cm2.Parameters.Add("@id_blog", System.Data.SqlDbType.VarChar, 50).Value = ma_blog;

                json = (string)db.Scalar(cm2);

                

            }
            catch (Exception ex)
            {
                ve.InnerHtml = ex.Message;
            }
        }
    }
}