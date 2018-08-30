using System.Collections.Generic;

namespace InvoiceWebApp.Components.Entities
{
    public partial class Debtor
    {
        public Debtor()
        {
            this.Addresses = new HashSet<DebtorHasAddress>();
            this.Invoices = new HashSet<Invoice>();
        }

        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CompanyName { get; set; }
        public string Email { get; set; }
        public string BankAccount { get; set; }
        public string Phone { get; set; }

        public virtual ICollection<DebtorHasAddress> Addresses { get; set; }
        public virtual ICollection<Invoice> Invoices { get; set; }
    }
}
