using InvoiceWebApp.Components.Entities;

using Newtonsoft.Json;

namespace InvoiceWebApp.Controllers.ViewModels
{
    public class SettingsViewModel
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("company_name")]
        public string CompanyName { get; set; }
        [JsonProperty("website")]
        public string Website { get; set; }
        [JsonProperty("phone")]
        public string Phone { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }
        [JsonProperty("password")]
        public string Password { get; set; }
        [JsonProperty("smtp")]
        public string SMTP { get; set; }
        [JsonProperty("smtp_port")]
        public int Port { get; set; }

        [JsonProperty("address")]
        public string Address { get; set; }
        [JsonProperty("postal_code")]
        public string PostalCode { get; set; }
        [JsonProperty("city")]
        public string City { get; set; }
        [JsonProperty("country")]
        public string Country { get; set; }

        [JsonProperty("bank_account")]
        public string BankAccount { get; set; }
        [JsonProperty("bank")]
        public string Bank { get; set; }

        [JsonProperty("business_number")]
        public string BusinessNumber { get; set; }
        [JsonProperty("vat")]
        public string VAT { get; set; }

        [JsonProperty("invoice_prefix")]
        public string InvoicePrefix { get; set; }

        [JsonProperty("logo")]
        public string Logo { get; set; }
        [JsonProperty("show_logo")]
        public bool ShowLogo { get; set; }
        [JsonProperty("show_logo_in_pdf")]
        public bool ShowLogoInPDF { get; set; }
        [JsonProperty("color")]
        public string Color { get; set; }

        public SettingsViewModel()
        {

        }

        public void SetProperties(Settings model)
        {
            this.CompanyName = model.CompanyName;
            this.Website = model.Website;
            this.Phone = model.Phone;

            this.Email = model.Email;
            this.Password = model.Password;
            this.SMTP = model.SMTP;
            this.Port = model.Port;

            this.Bank = model.Bank;
            this.BankAccount = model.BankAccount;

            this.BusinessNumber = model.BusinessNumber;
            this.VAT = model.VAT;

            this.InvoicePrefix = model.InvoicePrefix;

            this.Logo = model.Logo;
            this.ShowLogo = model.ShowLogo;
            this.ShowLogoInPDF = model.ShowLogoInPDF;
            this.Color = model.Color;

            this.Address = model.Address;
            this.PostalCode = model.PostalCode;
            this.City = model.City;
            this.Country = model.Country;
        }
    }
}
