using InvoiceWebApp.Components.DataContext;
using InvoiceWebApp.Components.Entities;

using System;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace InvoiceWebApp.Components.Helpers {
	public class Email
    {
        private string Host;
        private int Port;
        private bool EnableSSL;
        private string EmailAddress;
        private string Password;
        private NetworkCredential Credentials;

        private readonly InvoiceContext _context;
        private Settings Settings;

        public Email(InvoiceContext context)
        {
            _context = context;
            this.GetSettings();

            this.EmailAddress = this.Settings.Email;
            this.Password = this.Settings.Password;
            this.Host = this.Settings.SMTP;
            this.Port = this.Settings.Port;
            this.EnableSSL = true;
            this.Credentials = new NetworkCredential(this.EmailAddress, this.Password);
        }

        private void GetSettings()
        {
            this.Settings = this._context.Settings.FirstOrDefault();
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
                Subject = String.Format("{0} - Password Reset", this.Settings.CompanyName),
                Body = "Dear user,<br /><br />Beneath you will find your temporary password. When signed in, please change your password. <br /><br /><b>Password:  <b/> " + password
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
                Subject = String.Format("{0} - New Invoice", this.Settings.CompanyName),
                Body = string.Format("Dear {0}. {1},<br /><br />A new invoice is awaiting your attention.<br /><br />Kind regards,<br /><br />Invoice Panel", debtor.FirstName[0], debtor.LastName)
            })
            {
                await smtpClient.SendMailAsync(message);
            }
        }

        public async Task SendCredentials(User user)
        {
            var smtpClient = new SmtpClient
            {
                Host = this.Host,
                Port = this.Port,
                EnableSsl = this.EnableSSL,
                Credentials = this.Credentials
            };

            using (var message = new MailMessage(this.EmailAddress, user.Email)
            {
                IsBodyHtml = true,
                Subject = String.Format("{0} - Credentials", this.Settings.CompanyName),
                Body = string.Format("Dear {0}. {1},<br /><br />Below you will find your credentials. Please change after signing in."
                + "<br /><br /><b>Username:  <b/>" + user.Email
                + "<br /><b>Password:  <b/>" + user.Password
                + "<br /><br />Kind regards,<br /><br />Invoice Panel", user.FirstName[0], user.LastName)
            })
            {
                await smtpClient.SendMailAsync(message);
            }
        }
    }
}
