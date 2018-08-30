using System;
using InvoiceWebApp.Components.Entities;
using Newtonsoft.Json;

namespace InvoiceWebApp.Controllers.ViewModels
{
    public class InvoiceViewModel
    {
        [JsonProperty("invoice_number")]
        public string InvoiceNumber { get; set; }
        [JsonProperty("customer_id")]
        public string CustomerId { get; set; }
        [JsonProperty("created_on")]
        public DateTime CreatedOn { get; set; }
        [JsonProperty("expired_on")]
        public DateTime ExpiredOn { get; set; }
        [JsonProperty("total")]
        public decimal Total { get; set; }
        [JsonProperty("comment")]
        public string Comment { get; set; }
        [JsonProperty("discount")]
        public int Discount { get; set; }
        [JsonProperty("is_paid")]
        public bool IsPaid { get; set; }
        [JsonProperty("concept")]
        public bool Concept { get; set; }
        [JsonProperty("debtor")]
        public DebtorViewModel Debtor { get; set; }

        public InvoiceViewModel()
        {

        }
        public void SetProperties(Invoice model)
        {
            this.InvoiceNumber = model.InvoiceNumber;
            this.CustomerId = model.CustomerId;
            this.CreatedOn = model.CreatedOn;
            this.ExpiredOn = model.ExpiredOn;
            this.Total = model.Total;
            this.Comment = model.Comment;
            this.Discount = model.Discount;
            this.IsPaid = model.IsPaid;
            this.Concept = model.Concept;
        }
    }
}
