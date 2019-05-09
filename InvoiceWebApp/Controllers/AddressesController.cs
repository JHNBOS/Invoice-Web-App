using InvoiceWebApp.Components.Entities;
using InvoiceWebApp.Components.Services.Interfaces;
using InvoiceWebApp.Controllers.ViewModels;

using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InvoiceWebApp.Controllers {
	[EnableCors("AllowAll")]
    [Produces("application/json")]
    [Route("api/address")]
    public class AddressesController : Controller
    {
		private readonly IAddressRepository _repo;

		public AddressesController(IAddressRepository repo)
        {
            this._repo = repo;
        }

        /// <summary>
        /// Gets a list with all addresses.
        /// </summary>
        [HttpGet("getAll")]
        [ProducesResponseType(typeof(IEnumerable<AddressViewModel>), 200)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetAll()
        {
            //Get data
            var data = await _repo.GetAddresses();
            if (data == null)
            {
                return StatusCode(500, "Addresses could not be found.");
            }

            //Convert to viewmodel
            var result = data.Select(s => new AddressViewModel
            {
                Street = s.Street,
                Number = s.Number,
                Suffix = s.Suffix,
                PostalCode = s.PostalCode,
                City = s.City,
                Country = s.Country
            });

            return Ok(result);
        }

        /// <summary>
        /// Gets a list with all addresses by city.
        /// </summary>
        /// <param name="city">Name of city</param>
        [HttpGet("getByCity")]
        [ProducesResponseType(typeof(IEnumerable<AddressViewModel>), 200)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetByCity(string city)
        {
            if (String.IsNullOrEmpty(city))
            {
                return StatusCode(400, "Invalid parameter(s).");

            }
            //Get data
            var data = await _repo.GetAddressesByCity(city);
            if (data == null)
            {
                return StatusCode(500, "Addresses could not be found in '" + city + "'.");
            }

            //Convert to viewmodel
            var result = data.Select(s => new AddressViewModel
            {
                Street = s.Street,
                Number = s.Number,
                Suffix = s.Suffix,
                PostalCode = s.PostalCode,
                City = s.City,
                Country = s.Country
            });

            return Ok(result);
        }

        /// <summary>
        /// Gets a list with all addresses by postal code.
        /// </summary>
        /// <param name="postal">Postal code of addresses</param>
        [HttpGet("getByPostal")]
        [ProducesResponseType(typeof(IEnumerable<AddressViewModel>), 200)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetByPostal(string postal)
        {
            if (String.IsNullOrEmpty(postal))
            {
                return StatusCode(400, "Invalid parameter(s).");

            }
            //Get data
            var data = await _repo.GetAddressesByPostal(postal);
            if (data == null)
            {
                return StatusCode(500, "Addresses could not be found with postal code '" + postal + "'.");
            }

            //Convert to viewmodel
            var result = data.Select(s => new AddressViewModel
            {
                Street = s.Street,
                Number = s.Number,
                Suffix = s.Suffix,
                PostalCode = s.PostalCode,
                City = s.City,
                Country = s.Country
            });

            return Ok(result);
        }

        /// <summary>
        /// Gets a address by number and postal code.
        /// </summary>
        /// <param name="number">Number of adresss</param>
        /// <param name="postal">Postal code of address</param>
        [HttpGet("getByNumberAndPostalCode")]
        [ProducesResponseType(typeof(AddressViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetByNumberAndPostalCode(int? number, string postal)
        {
            if (!number.HasValue || String.IsNullOrEmpty(postal))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get address
            var data = await _repo.GetAddressByPostalAndNumber(number.Value, postal);
            if (data == null)
            {
                return StatusCode(500, "User could not be found.");
            }

            //Convert to view model
            var result = new AddressViewModel();
            result.SetProperties(data);

            return Ok(result);
        }

        /// <summary>
        /// Checks if an address by number and postal code exists.
        /// </summary>
        /// <param name="number">Number of adresss</param>
        /// <param name="postal">Postal code of address</param>
        [HttpGet("addressExists")]
        [ProducesResponseType(typeof(bool), 200)]
        [ProducesResponseType(typeof(void), 400)]
        public async Task<IActionResult> AddressExists(int? number, string postal)
        {
            if (!number.HasValue || String.IsNullOrEmpty(postal))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get address
            var data = await _repo.GetAddressByPostalAndNumber(number.Value, postal);

            var result = data != null ? true : false;
            return Ok(result);
        }

        /// <summary>
        /// Creates a address.
        /// </summary>
        /// <param name="model">Address object</param>
        [HttpPost("create")]
        [ProducesResponseType(typeof(AddressViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Create([FromBody]AddressViewModel model)
        {
            if (model == null)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            Address address = new Address
            {
                Street = model.Street,
                Number = model.Number,
                Suffix = model.Suffix,
                PostalCode = model.PostalCode,
                City = model.City,
                Country = model.Country
            };

            //Insert address
            var result = await _repo.Insert(address);
            if (result == null)
            {
                return StatusCode(500, "A problem occured while saving the record. Please try again!");
            }

            return Ok(result);
        }


        /// <summary>
        /// Deletes a address.
        /// </summary>
        /// <param name="number">Number of address</param>
        /// <param name="suffix">Number suffix of address</param>
        /// <param name="postal">Postal code of address</param>
        [HttpDelete("delete")]
        [ProducesResponseType(typeof(void), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Delete(int? number, string suffix, string postal)
        {
            if (!number.HasValue || String.IsNullOrEmpty(postal))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Remove address
            var succeeded = await _repo.Delete(number.Value, suffix, postal);
            if (!succeeded)
            {
                return StatusCode(500, "A problem occured while removing the record. Please try again!");
            }

            return Ok("Success");
        }
    }
}
