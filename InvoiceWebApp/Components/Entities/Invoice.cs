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
        public double Total { get; set; }
        public double Discount { get; set; }
        public string Comment { get; set; }

        public virtual ICollection<InvoiceItem> Items { get; set; }
    }
}
