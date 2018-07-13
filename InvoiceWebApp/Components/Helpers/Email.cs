using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using InvoiceWebApp.Components.Entities;

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
                Subject = "Invoice Panel - Password Reset",
                Body = "Dear user,<br /><br />Beneath you will find your temporary password. When signed in, please change your password. <br /><br /><b>Password:<b/> " + password
            })
            {
                await smtpClient.SendMailAsync(message);
            }
        }

        public async Task SendNotification(Debtor debtor)
        {
            var smtpClient = new SmtpClient
            {
                Host = this.Host,
                Port = this.Port,
                EnableSsl = this.EnableSSL,
                Credentials = this.Credentials
            };

            using (var message = new MailMessage(this.EmailAddress, debtor.Email)
            {
                IsBodyHtml = true,
                Subject = "Invoice Panel - New Invoice",
                Body = string.Format("Dear {0}. {1},<br /><br />A new invoice is awaiting your attention.<br /><br />Kind regards,<br /><br />Invoice Panel", debtor.FirstName[0], debtor.LastName)
            })
            {
                await smtpClient.SendMailAsync(message);
            }
        }
    }
}
