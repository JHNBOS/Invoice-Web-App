using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using InvoiceAPI.Components.Entities;
using InvoiceAPI.Components.Services;
using InvoiceAPI.Components.Services.Interfaces;
using InvoiceAPI.Controllers.ViewModels;

using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace ShareListAPI.Controllers
{
    [EnableCors("AllowAll")]
    [Produces("application/json")]
    [Route("api/address")]
    public class AddressesController : Controller
    {
        private IAddressRepository _repo;

        public AddressesController()
        {
            this._repo = new AddressRepository();
        }

        /// <summary>
        /// Gets a list with all addresses.
        /// </summary>
        [HttpGet("getAddresses")]
        [ProducesResponseType(typeof(IEnumerable<AddressViewModel>), 200)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetAddresses()
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
        [HttpGet("getAddressesByCity")]
        [ProducesResponseType(typeof(IEnumerable<AddressViewModel>), 200)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetAddressesByCity(string city)
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
        [HttpGet("getAddressesByCity")]
        [ProducesResponseType(typeof(IEnumerable<AddressViewModel>), 200)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetAddressesByPostal(string postal)
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
        [ProducesResponseType(typeof(UserViewModel), 200)]
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
        /// <param name="email">Id of user</param>
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
