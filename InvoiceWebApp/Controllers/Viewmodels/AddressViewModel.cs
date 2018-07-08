using InvoiceWebApp.Components.Entities;

using Newtonsoft.Json;

namespace InvoiceWebApp.Controllers.ViewModels
{
    public class AddressViewModel
    {
        [JsonProperty("street")]
        public string Street { get; set; }
        [JsonProperty("number")]
        public int Number { get; set; }
        [JsonProperty("suffix")]
        public string Suffix { get; set; }
        [JsonProperty("postal_code")]
        public string PostalCode { get; set; }
        [JsonProperty("city")]
        public string City { get; set; }
        [JsonProperty("country")]
        public string Country { get; set; }

        public AddressViewModel()
        {

        }

        public void SetProperties(Address model)
        {
            this.Street = model.Street;
            this.Number = model.Number;
            this.Suffix = model.Suffix;
            this.PostalCode = model.PostalCode;
            this.City = model.City;
            this.Country = model.Country;
        }
    }
}
