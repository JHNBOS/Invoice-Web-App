using InvoiceWebApp.Components.Entities;

using Newtonsoft.Json;

namespace InvoiceWebApp.Controllers.ViewModels
{
    public class DebtorViewModel
    {
        [JsonProperty("id")]
        public string Id { get; set; }
        [JsonProperty("first_name")]
        public string FirstName { get; set; }
        [JsonProperty("last_name")]
        public string LastName { get; set; }
        [JsonProperty("company_name")]
        public string CompanyName { get; set; }
        [JsonProperty("email")]
        public string Email { get; set; }
        [JsonProperty("bank_account")]
        public string BankAccount { get; set; }
        [JsonProperty("phone")]
        public string Phone { get; set; }
        [JsonProperty("address")]
        public AddressViewModel Address { get; set; }
        [JsonProperty("label")]
        public string Label { get; set; }
        [JsonProperty("name_label")]
        public string NameLabel { get; set; }

        public DebtorViewModel()
        {

        }

        public void SetProperties(Debtor model, bool skipLabel, bool skipNameLabel)
        {
            this.Email = model.Email;
            this.Id = model.Id;
            this.FirstName = model.FirstName;
            this.LastName = model.LastName;
            this.CompanyName = model.CompanyName;
            this.BankAccount = model.BankAccount;
            this.Phone = model.Phone;

            if (!skipLabel)
            {
                if (this.CompanyName != null || !string.IsNullOrEmpty(this.CompanyName))
                {
                    this.Label = string.Format("{0} - {1} in {2}, {3}", this.Id, this.CompanyName, this.Address.City, this.Address.Country);
                }

                this.Label = string.Format("{0} - {1} {2} from {3}, {4}", this.Id, this.FirstName, this.LastName, this.Address.City, this.Address.Country);
            }

            if (!skipNameLabel)
            {
                if (this.CompanyName != null || !string.IsNullOrEmpty(this.CompanyName))
                {
                    this.NameLabel = string.Format("{0}", this.CompanyName);
                }

                this.NameLabel = string.Format("{0} {1}", this.FirstName, this.LastName);
            }
        }
    }
}
