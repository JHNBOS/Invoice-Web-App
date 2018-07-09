using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace InvoiceWebApp.Components.Helpers
{
    public class Email
    {
        private string Host;
        private int Port;
        private bool EnableSSL;
        private string EmailAddress;
        private string Password;
        private NetworkCredential Credentials;

        public Email()
        {
            this.EmailAddress = "bosbosjohan@gmail.com";
            this.Password = "";
            this.Host = "smtp.gmail.com";
            this.Port = 587;
            this.EnableSSL = true;
            this.Credentials = new NetworkCredential(this.EmailAddress, this.Password);
        }

        public async Task SendPasswordResetEmail(string toEmail, string password)
        {
            var smtpClient = new SmtpClient
            {
                Host = this.Host,
                Port = this.Port,
                EnableSsl = this.EnableSSL,
                Credentials = this.Credentials
            };

            using (var message = new MailMessage(this.EmailAddress, toEmail)
            {
                IsBodyHtml = true,
                Subject = "inVoice - Password Reset",
                Body = "Dear user,<br /><br />Beneath you will find your temporary password. When signed in, please change your password. <br /><br /><b>Password:<b/> " + password
            })
            {
                await smtpClient.SendMailAsync(message);
            }
        }
    }
}
