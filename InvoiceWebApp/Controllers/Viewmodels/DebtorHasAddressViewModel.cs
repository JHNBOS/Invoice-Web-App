using InvoiceWebApp.Components.Entities;

using Newtonsoft.Json;

namespace InvoiceWebApp.Controllers.Viewmodels
{
    public class DebtorHasAddressViewModel
    {
        [JsonProperty("debtor_id")]
        public string DebtorId { get; set; }
        [JsonProperty("address_postal")]
        public string PostalCode { get; set; }
        [JsonProperty("address_number")]
        public int Number { get; set; }

        public DebtorHasAddressViewModel()
        {

        }

        public void SetProperties(DebtorHasAddress model)
        {
            this.DebtorId = model.DebtorId;
            this.Number = model.Number;
            this.PostalCode = model.PostalCode;
        }
    }
}
