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
    public partial class apiKTX : System.Web.UI.Page
    {


        public void list_all_ktx(string action)
        {

            string json = "";
            try
            {
         
                SqlServer db = new SqlServer();
                SqlCommand cm = db.GetCmd("SP_KTX", action);
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
            string action = Request.QueryString["action"];

            switch(action)
            {
                case "list_all_ktx":
                    list_all_ktx(action);
                    break;  
            }
        }
    }
}