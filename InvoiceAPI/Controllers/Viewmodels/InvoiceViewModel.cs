using System;
using InvoiceAPI.Components.Entities;
using Newtonsoft.Json;

namespace InvoiceAPI.Controllers.ViewModels
{
    public class InvoiceViewModel
    {
        [JsonProperty("invoice_number")]
        public int InvoiceNumber { get; set; }
        [JsonProperty("customer_id")]
        public string CustomerId { get; set; }
        [JsonProperty("created_on")]
        public DateTime CreatedOn { get; set; }
        [JsonProperty("expired_on")]
        public DateTime ExpiredOn { get; set; }
        [JsonProperty("tax")]
        public int Tax { get; set; }
        [JsonProperty("total")]
        public double Total { get; set; }
        [JsonProperty("comment")]
        public string Comment { get; set; }
        [JsonProperty("discount")]
        public int Discount { get; set; }

        public InvoiceViewModel()
        {

        }
        public void SetProperties(Invoice model)
        {
            this.InvoiceNumber = model.InvoiceNumber;
            this.CustomerId = model.CustomerId;
            this.CreatedOn = model.CreatedOn;
            this.ExpiredOn = model.ExpiredOn;
            this.Tax = model.Tax;
            this.Total = model.Total;
            this.Comment = model.Comment;
            this.Discount = model.Discount;
        }
    }
}
