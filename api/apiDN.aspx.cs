using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Web_1_Ky_Tuc_Xa.lib;

namespace Web_1_Ky_Tuc_Xa.api
{
    public partial class apiDN : System.Web.UI.Page
    {
        void login()
        {
            string json = "";
            try
            {
                string uid = this.Request["uid"];
                string pw = this.Request["pw"];

                //truy van db
                string sql = "SP_LOGIN";
                SqlServer db = new SqlServer();
                SqlCommand cm = db.GetCmd(sql, "login");
                cm.Parameters.AddWithValue("uid", uid);
                cm.Parameters.AddWithValue("pw", pw);
                json =  (string)db.Scalar(cm);
            }
            catch (Exception ex)
            {
              json = ex.Message;
            }
            this.Response.Write(json);
        }
        void check_cc()
        {
            string json = "";
            try
            {
                string uid = this.Request["uid"];
                string cc = this.Request["cc"];

                //truy van db
                string sql = "SP_LOGIN";
                SqlServer db = new SqlServer();
                SqlCommand cm = db.GetCmd(sql, "check_cc");
                cm.Parameters.AddWithValue("uid", uid);
                cm.Parameters.AddWithValue("cc", cc);
                json = (string)db.Scalar(cm);
            }
            catch (Exception ex)
            {
                json = ex.Message;
            }
            this.Response.Write(json);
        }
        protected void Page_Load(object sender, EventArgs e)
        {
            string action = this.Request["action"];
            switch (action)
            {
                case "login":
                    login();
                    break;
                case "check_cc":
                    check_cc();
                    break;
            }

        }
    }
}