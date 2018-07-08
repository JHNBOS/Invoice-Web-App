using InvoiceAPI.Components.Entities;

using Newtonsoft.Json;

namespace InvoiceAPI.Controllers.ViewModels
{
    public class InvoiceItemViewModel
    {
        [JsonProperty("invoice_number")]
        public int InvoiceNumber { get; set; }
        [JsonProperty("item_number")]
        public int ItemNumber { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("description")]
        public string Description { get; set; }
        [JsonProperty("price")]
        public double Price { get; set; }
        [JsonProperty("tax")]
        public int Tax { get; set; }
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
            this.Price = model.Price;
            this.Tax = model.Tax;
            this.Quantity = model.Quantity;
        }
    }
}
