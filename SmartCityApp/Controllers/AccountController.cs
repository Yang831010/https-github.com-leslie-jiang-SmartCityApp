using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using HamelsApp.BusinessRules;
using isRock.Framework.WebAPI;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace SmartCityAdmin.Controllers
{
    public class AccountController : ApiController
    {
        [Route("api/Account/{sMethodName}")]
        [HttpPost]
        public async Task<IHttpActionResult> PostFormData(string sMethodName)
        {
            var oController = new BSAccount();
            bool bNewController = Request.Content.IsMimeMultipartContent();  // 新舊版Controller (舊:DATA:Object, 新:DATA:FormData)
            bool bHasFile = false;

            string sJsonData = "";

            // Cookies
            var vCookies = Request.Headers.GetCookies("accountid");
            string sAccountID = (0 < vCookies.Count) ? vCookies[0]["accountid"].Value : "";

            if (bNewController)
            {
                JObject oTempJObject = new JObject();

                var filesReadToProvider = await Request.Content.ReadAsMultipartAsync();
                foreach (var content in filesReadToProvider.Contents)
                {
                    if (!string.IsNullOrEmpty(content.Headers.ContentDisposition.FileName))
                    {
                        using (Stream stream = await content.ReadAsStreamAsync())
                        {
                            byte[] bytes = new byte[stream.Length];
                            stream.Read(bytes, 0, bytes.Length);
                        }
                    }
                    else
                    {
                        string key = content.Headers.ContentDisposition.Name.Replace(@"""", "");
                        string val = await content.ReadAsStringAsync();
                        oTempJObject.Add(new JProperty(key, val));

                        switch (key)
                        {
                            case "hasfile":
                                bHasFile = Convert.ToBoolean(val);
                                break;
                        }
                    }
                }

                // modified_user
                addDataToTempJObject(ref oTempJObject, "modified_user", sAccountID);

                sJsonData = JsonConvert.SerializeObject(oTempJObject);
            }
            else
            {
                sJsonData = Request.Content.ReadAsStringAsync().Result;

                // modified_user
                if (!sAccountID.Equals(""))
                {
                    JObject oTempJObject = JObject.Parse(sJsonData);

                    addDataToTempJObject(ref oTempJObject, "modified_user", sAccountID);

                    sJsonData = JsonConvert.SerializeObject(oTempJObject);
                }
            }

            try
            {
                AssemblyLauncher assemblyLauncher = new AssemblyLauncher();
                var ret = assemblyLauncher.ExecuteCommand(oController, sMethodName, sJsonData);

                if (bNewController && "SaveDetail" == sMethodName && bHasFile)
                {
                    var oNewData = ((ExecuteCommandDefaultResult)ret).Data;
                    var sNewID = ((JProperty)((JContainer)oNewData).First).Value;  // 第一個回傳值必須是Pkey

                    JObject oParam = new JObject();
                    oParam["mode"] = "Edit";
                    oParam["id"] = sNewID;
                    string sJsonParam = JsonConvert.SerializeObject(oParam);
                    assemblyLauncher.ExecuteCommand(new BSFile(), "FileUpload", sJsonParam);
                }

                return Ok(ret);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static void addDataToTempJObject(ref JObject oTempJObject, string sKey, string sValue)
        {
            if (!sValue.Equals("") && null == oTempJObject[sKey])
            {
                oTempJObject.Add(new JProperty(sKey, sValue));
            }
        }
    }
}