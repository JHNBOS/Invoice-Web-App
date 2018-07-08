using System.Collections.Generic;

namespace InvoiceWebApp.Components.Entities
{
    public partial class Address
    {
        public Address()
        {
            this.Debtors = new HashSet<DebtorHasAddress>();
        }

        public string Street { get; set; }
        public int Number { get; set; }
        public string Suffix { get; set; }
        public string PostalCode { get; set; }
        public string City { get; set; }
        public string Country { get; set; }

        public virtual ICollection<DebtorHasAddress> Debtors { get; set; }
    }
}
