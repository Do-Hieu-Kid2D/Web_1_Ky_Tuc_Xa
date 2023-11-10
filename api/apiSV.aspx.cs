using System;
using Web_1_Ky_Tuc_Xa.lib;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Data;
using Newtonsoft.Json;

namespace Web_1_Ky_Tuc_Xa.api
{
    public partial class apiSV : System.Web.UI.Page
    {

        class SV
        {
            public string ma_sv, ho_ten, lop, CCCD, sdt, hinh_anh;
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

        protected void Page_Load(object sender, EventArgs e)
        {
            string action = Request["action"];
            switch (action)
            {
                case "list_all_sv":
                    list_all_sv(action);
                    break;

            }
        }
    }
}