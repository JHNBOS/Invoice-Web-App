using InvoiceWebApp.Components.Entities;

using Newtonsoft.Json;

namespace InvoiceWebApp.Controllers.ViewModels
{
    public class RoleViewModel
    {
        [JsonProperty("id")]
        public int Id { get; set; }
        [JsonProperty("type")]
        public string Type { get; set; }

        public RoleViewModel()
        {

        }

        public void SetProperties(Role model)
        {
            this.Id = model.Id;
            this.Type = model.Type;
        }
    }
}
