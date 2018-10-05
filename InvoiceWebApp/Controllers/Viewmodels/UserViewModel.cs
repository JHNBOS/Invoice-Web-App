using InvoiceWebApp.Components.Entities;
using Newtonsoft.Json;

namespace InvoiceWebApp.Controllers.ViewModels
{
    public class UserViewModel
    {
        [JsonProperty("email")]
        public string Email { get; set; }
        [JsonProperty("password")]
        public string Password { get; set; }
        [JsonProperty("first_name")]
        public string FirstName { get; set; }
        [JsonProperty("last_name")]
        public string LastName { get; set; }
        [JsonProperty("company_name")]
        public string CompanyName { get; set; }
        [JsonProperty("role_id")]
        public int Role { get; set; }
        [JsonProperty("picture")]
        public string Picture { get; set; }
        [JsonProperty("name_label")]
        public string NameLabel { get; set; }

        public UserViewModel()
        {

        }
        public void SetProperties(User model, bool skipLabel)
        {
            this.Email = model.Email;
            this.Password = model.Password;
            this.FirstName = model.FirstName;
            this.LastName = model.LastName;
            this.CompanyName = model.CompanyName;
            this.Role = model.Role;
            this.Picture = model.Picture;

            if (!skipLabel)
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
