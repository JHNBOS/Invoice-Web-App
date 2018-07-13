using System;
using System.Collections.Generic;

namespace InvoiceWebApp.Components.Entities
{
    public partial class Invoice
    {
        public Invoice()
        {
            this.Items = new HashSet<InvoiceItem>();
        }

        public string InvoiceNumber { get; set; }
        public string CustomerId { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ExpiredOn { get; set; }
        public decimal Total { get; set; }
        public int Discount { get; set; }
        public string Comment { get; set; }
        public bool IsPaid { get; set; }
        public bool Concept { get; set; }

        public virtual ICollection<InvoiceItem> Items { get; set; }
        public virtual Debtor Debtor { get; set; }
    }
}
