using System;
using System.Collections.Generic;

namespace InvoiceAPI.Components.Entities
{
    public partial class Invoice
    {
        public Invoice()
        {
            this.Items = new HashSet<InvoiceItem>();
        }

        public int InvoiceNumber { get; set; }
        public string CustomerId { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ExpiredOn { get; set; }
        public int Tax { get; set; }
        public double Total { get; set; }
        public string Comment { get; set; }
        public int Discount { get; set; }

        public virtual ICollection<InvoiceItem> Items { get; set; }
    }
}
