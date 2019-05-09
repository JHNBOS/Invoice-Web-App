using InvoiceWebApp.Components.Entities;
using InvoiceWebApp.Components.Services.Interfaces;
using InvoiceWebApp.Controllers.ViewModels;

using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;

using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace InvoiceWebApp.Controllers {
	[EnableCors("AllowAll")]
    [Produces("application/json")]
    [Route("api/settings")]
    public class SettingsController : Controller
    {
		private readonly ISettingRepository _repo;

		public SettingsController(ISettingRepository repo)
        {
			this._repo = repo;
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
                Id = 1,
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
                InvoicePrefix = model.InvoicePrefix,
                Color = model.Color
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

        /// <summary>
        /// Uploads an image and adds path to settings
        /// </summary>
        [HttpPost("upload")]
        [ProducesResponseType(typeof(SettingsViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Upload()
        {
            StringValues json;
            Request.Form.TryGetValue("model", out json);

            var file = Request.Form.Files.FirstOrDefault();
            var model = JsonConvert.DeserializeObject<SettingsViewModel>(json);

            if (model == null || file == null)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            if (file.Length == 0)
            {
                return StatusCode(400, "File is empty.");
            }

            // Get settings
            var settingsToUpdate = await _repo.GetSettings();

            // Add image to settings
            var extension = file.FileName.Split(".")[1];
            string imageBinary;

            using (var ms = new MemoryStream())
            {
                file.CopyTo(ms);
                var fileBytes = ms.ToArray();
                imageBinary = Convert.ToBase64String(fileBytes);
            }

            // Update settings
            settingsToUpdate.Logo = "data:image/" + extension + ";base64," + imageBinary;
            await _repo.Update(settingsToUpdate);

            return Ok(model);
        }
    }
}
