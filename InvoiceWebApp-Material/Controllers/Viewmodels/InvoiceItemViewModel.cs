using InvoiceWebApp.Components.Entities;

using Newtonsoft.Json;

namespace InvoiceWebApp.Controllers.ViewModels
{
    public class InvoiceItemViewModel
    {
        [JsonProperty("item_number")]
        public int ItemNumber { get; set; }
        [JsonProperty("invoice_number")]
        public string InvoiceNumber { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("description")]
        public string Description { get; set; }
        [JsonProperty("tax")]
        public int Tax { get; set; }
        [JsonProperty("price")]
        public decimal Price { get; set; }
        [JsonProperty("quantity")]
        public int Quantity { get; set; }

        public InvoiceItemViewModel()
        {

        }
        public void SetProperties(InvoiceItem model)
        {
            this.InvoiceNumber = model.InvoiceNumber;
            this.ItemNumber = model.ItemNumber;
            this.Name = model.Name;
            this.Description = model.Description;
            this.Tax = model.Tax;
            this.Price = model.Price;
            this.Quantity = model.Quantity;
        }
    }
}
