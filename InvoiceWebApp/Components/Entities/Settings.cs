namespace InvoiceWebApp.Components.Entities
{
    public partial class Settings
    {
        public int Id { get; set; }

        public string CompanyName { get; set; }
        public string Website { get; set; }
        public string Phone { get; set; }

        public string Email { get; set; }
        public string Password { get; set; }
        public string SMTP { get; set; }
        public int Port { get; set; }

        public string Address { get; set; }
        public string PostalCode { get; set; }
        public string City { get; set; }
        public string Country { get; set; }

        public string BankAccount { get; set; }
        public string Bank { get; set; }

        public string BusinessNumber { get; set; }
        public string VAT { get; set; }

        public string InvoicePrefix { get; set; }

        public string Logo { get; set; }
        public bool ShowLogo { get; set; }
        public bool ShowLogoInPDF { get; set; }
        public string Color { get; set; }
    }
}
