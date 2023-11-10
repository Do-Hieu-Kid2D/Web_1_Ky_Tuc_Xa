using System;
using System.Collections.Generic;
using System.Text;

//khai báo 2 thư viện xử lý csdl
using System.Data;
using System.Data.SqlClient; //dành riêng cho SQL Server

namespace Web_1_Ky_Tuc_Xa.lib
{
    public class SqlServer
    {
        //biến chứa chuỗi kết nối
        private static string ConnectionString;
        public static string LogFilePath = "dbLog.txt";
        public SqlServer()
        {
            SqlServer.ConnectionString = AppSettingsGet.ConnectionString;
        }

        /// <summary>
        /// Hàm tạo 1 tham số
        /// </summary>
        /// <param name="ConnectionString">Đây là chuỗi kết nối tới SQL Server</param>
        public SqlServer(string ConnectionString)
        {
            SqlServer.ConnectionString = ConnectionString;
        }

        public SqlCommand GetCmd(string sp_, string action = null, CommandType commandType = CommandType.StoredProcedure)
        {
            SqlCommand cmd = new SqlCommand(sp_);
            cmd.CommandType = commandType;
            if (action != null)
                cmd.Parameters.Add("@action", SqlDbType.NVarChar, 50).Value = action;
            return cmd;
        }

        /// <summary>
        /// hàm thực thi sql đặt trong OleDbCommand
        /// </summary>
        /// <param name="cm">đây là đối tượng chứa sql hoặc sp_</param>
        /// <returns>trả về bảng dữ liệu</returns>
        public DataTable Query(SqlCommand cm)
        {
            using (SqlConnection cn = new SqlConnection(ConnectionString))
            {
                cn.Open();
                cm.Connection = cn;
                SqlDataReader dr = cm.ExecuteReader();//thực thi SQL -> trả về dr
                DataTable dt = new DataTable();// tạo 1 bảng trống để lưu dữ liệu đọc được
                dt.Load(dr);    //Lấy hết dữ liệu trong dr vào dt
                return dt;  //trả về kq
            }
        }
        /// <summary>
        /// thực thi câu lệnh sql
        /// </summary>
        /// <param name="sql">SQL dạng select</param>
        /// <returns>Trả về bảng dữ liệu</returns>
        public DataTable Query(string sql)
        {
            //sử dụng cấu trúc điều khiển USING để giải phóng đối tượng cm sau khi kết thúc khối USING
            using (SqlCommand cm = new SqlCommand(sql))
            {
                return Query(cm);
            }
        }
        /// <summary>
        /// thực thi 1 sql không trả về dữ liệu: INSERT, UPDATE, DELETE, SP_làm các việc đó
        /// </summary>
        /// <param name="cm">OleDbCommand</param>
        /// <returns>Trả về số lượng bản ghi bị tác động</returns>
        public int RunSQL(SqlCommand cm)
        {
            using (SqlConnection cn = new SqlConnection(ConnectionString))
            {
                cn.Open();
                cm.Connection = cn;
                return cm.ExecuteNonQuery();//thực thi SQL -> trả về số dòng bị tác động
            }
        }
        /// <summary>
        /// thực thi 1 sql loại không trả về dữ liệu INSERT, UPDATE, DELETE
        /// </summary>
        /// <param name="sql">SQL trực tiếp, không chứa tham số</param>
        /// <returns>Trả về số lượng bản ghi bị tác động</returns>
        public int RunSQL(string sql)
        {
            using (SqlCommand cm = new SqlCommand(sql))
            {
                return RunSQL(cm);
            }
        }

        /// <summary>
        /// thực thi cm
        /// </summary>
        /// <param name="cm">cm chứa sql hoặc sp_, có thể có tham số</param>
        /// <returns>Trả về giá trị trong dòng 1 cột 1</returns>
        public object Scalar(SqlCommand cm)
        {
            using (SqlConnection cn = new SqlConnection(ConnectionString))
            {
                cn.Open();
                cm.Connection = cn;
                return cm.ExecuteScalar();
            }
        }
        /// <summary>
        /// thực thi SQL
        /// </summary>
        /// <param name="sql">SQL trực tiếp, không chứa tham số</param>
        /// <returns>Trả về giá trị trong dòng 1 cột 1</returns>
        public object Scalar(string sql)
        {
            using (SqlCommand cm = new SqlCommand(sql))
            {
                return Scalar(cm);
            }

        }
        private void LogFile(string fn, string msg)
        {
            string msg_log = string.Format("{0} {1}\r\n", DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"), msg);
            System.IO.File.AppendAllText(fn, msg_log);
        }
        public void LogMsg(string a, string b)
        {
            try
            {
                string sql = "SP_LOG";
                using (SqlCommand cm = new SqlCommand(sql))
                {
                    cm.CommandType = CommandType.StoredProcedure;
                    cm.Parameters.Add("@input", SqlDbType.NVarChar, 4000).Value = a;
                    cm.Parameters.Add("@output", SqlDbType.NVarChar, 4000).Value = b;
                    int n = RunSQL(cm);
                    if (n != 1) LogFile(LogFilePath, $"LogMsg Can not a={a}, b={b}");
                }

            }
            catch (Exception ex)
            {
                LogFile(LogFilePath, "LogMsg Exception: " + ex.Message);
            }
        }
    }
}
