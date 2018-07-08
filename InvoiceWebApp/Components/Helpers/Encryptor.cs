using System.Security.Cryptography;
using System.Text;

namespace InvoiceWebApp.Components.Helpers
{
    public class Encryptor
    {
        public string Encrypt(string text)
        {
            //Get MD5 crypto service
            MD5 md5 = new MD5CryptoServiceProvider();

            //Compute hash from the bytes of text
            md5.ComputeHash(ASCIIEncoding.ASCII.GetBytes(text));

            //Get hash result
            byte[] result = md5.Hash;

            StringBuilder strBuilder = new StringBuilder();
            for (int i = 0; i < result.Length; i++)
            {
                //Foreach byte, change it into 2 hexadecimal digits
                strBuilder.Append(result[i].ToString("x2"));
            }

            return strBuilder.ToString();
        }
    }
}
