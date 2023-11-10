using System.Configuration;
namespace Web_1_Ky_Tuc_Xa.lib
{
    public static class AppSettingsGet
    {
        // I also get my connection string from here
        public static string ConnectionString
        {
            get { 
                return ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString; 
            }
        }
        
    }
}