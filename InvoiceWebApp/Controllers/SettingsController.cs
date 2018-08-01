using System.Collections.Generic;
using System.Threading.Tasks;

using InvoiceWebApp.Components.Entities;
using InvoiceWebApp.Components.Services;
using InvoiceWebApp.Components.Services.Interfaces;
using InvoiceWebApp.Controllers.ViewModels;

using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace InvoiceWebApp.Controllers
{
    [EnableCors("AllowAll")]
    [Produces("application/json")]
    [Route("api/settings")]
    public class SettingsController : Controller
    {
        private ISettingRepository _repo;

        public SettingsController()
        {
            this._repo = new SettingRepository();
        }

        /// <summary>
        /// Gets all settings
        /// </summary>
        [HttpGet("get")]
        [ProducesResponseType(typeof(IEnumerable<SettingsViewModel>), 200)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Get()
        {
            //Get data
            var data = await _repo.GetSettings();
            if (data == null)
            {
                return StatusCode(500, "Settings could not be found.");
            }

            //Convert to viewmodel
            var result = new SettingsViewModel();
            result.SetProperties(data);

            return Ok(result);
        }

        /// <summary>
        /// Updates settings.
        /// </summary>
        /// <param name="model">Settings object</param>
        [HttpPut("update")]
        [ProducesResponseType(typeof(SettingsViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Update([FromBody]SettingsViewModel model)
        {
            if (model == null)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            Settings settings = new Settings
            {
                Id = model.Id,
                CompanyName = model.CompanyName,
                Website = model.Website,
                Phone = model.Phone,
                Address = model.Address,
                PostalCode = model.PostalCode,
                City = model.City,
                Country = model.Country,
                Email = model.Email,
                Password = model.Password,
                SMTP = model.SMTP,
                Port = model.Port,
                BusinessNumber = model.BusinessNumber,
                VAT = model.VAT,
                Logo = model.Logo,
                ShowLogo = model.ShowLogo,
                ShowLogoInPDF = model.ShowLogoInPDF,
                Bank = model.Bank,
                BankAccount = model.BankAccount,
                InvoicePrefix = model.InvoicePrefix
            };

            //Update settings
            var data = await _repo.Update(settings);
            if (data == null)
            {
                return StatusCode(500, "A problem occured while updating the record. Please try again!");
            }

            var result = new SettingsViewModel();
            result.SetProperties(data);

            return Ok(result);
        }
    }
}
