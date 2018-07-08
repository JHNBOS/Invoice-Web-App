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

        public DebtorViewModel()
        {

        }

        public void SetProperties(Debtor model)
        {
            this.Email = model.Email;
            this.Id = model.Id;
            this.FirstName = model.FirstName;
            this.LastName = model.LastName;
            this.CompanyName = model.CompanyName;
            this.BankAccount = model.BankAccount;
            this.Phone = model.Phone;
        }
    }
}
