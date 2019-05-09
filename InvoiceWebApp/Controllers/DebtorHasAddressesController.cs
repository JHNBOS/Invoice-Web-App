using InvoiceWebApp.Components.Entities;
using InvoiceWebApp.Components.Services.Interfaces;
using InvoiceWebApp.Controllers.Viewmodels;

using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InvoiceWebApp.Controllers {
	[EnableCors("AllowAll")]
    [Produces("application/json")]
    [Route("api/has_address")]
    public class DebtorHasAddressesController : Controller
    {
		private readonly IDebtorHasAddressRepository _repo;

        public DebtorHasAddressesController(IDebtorHasAddressRepository repo)
        {
			this._repo = repo;
		}

		/// <summary>
		/// Gets all relations between debtors and addresses.
		/// </summary>
		[HttpGet("getAll")]
        [ProducesResponseType(typeof(IEnumerable<DebtorHasAddressViewModel>), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetAll()
        {
            //Get debtor address link
            var data = await _repo.GetAll();
            if (data == null)
            {
                return StatusCode(500, "Debtor -> Address relations could not be found.");
            }

            //Convert to view model
            var result = data.Select(s => new DebtorHasAddressViewModel
            {
                DebtorId = s.DebtorId,
                Number = s.Number,
                PostalCode = s.PostalCode
            });

            return Ok(result);
        }

        /// <summary>
        /// Gets all relations between debtors and addresses by postal code.
        /// </summary>
        /// <param name="postal">Postal code of address</param>
        [HttpGet("getByPostalCode")]
        [ProducesResponseType(typeof(IEnumerable<DebtorHasAddressViewModel>), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetByPostalCode(string postal)
        {
            if (String.IsNullOrEmpty(postal))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get debtor address link
            var data = await _repo.GetAddressesByPostal(postal);
            if (data == null)
            {
                return StatusCode(500, "Debtor -> Address relations could not be found.");
            }

            //Convert to view model
            var result = data.Select(s => new DebtorHasAddressViewModel
            {
                DebtorId = s.DebtorId,
                Number = s.Number,
                PostalCode = s.PostalCode
            });

            return Ok(result);
        }

        /// <summary>
        /// Gets a relation between debtor and address by postal code and number.
        /// </summary>
        /// <param name="number">Number of adresss</param>
        /// <param name="postal">Postal code of address</param>
        [HttpGet("getByNumberAndPostalCode")]
        [ProducesResponseType(typeof(DebtorHasAddressViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetByNumberAndPostalCode(int? number, string postal)
        {
            if (!number.HasValue || String.IsNullOrEmpty(postal))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get debtor address link
            var data = await _repo.GetAddressByPostalAndNumber(number.Value, postal);
            if (data == null)
            {
                return StatusCode(500, "Debtor -> Address relation could not be found.");
            }

            //Convert to view model
            var result = new DebtorHasAddressViewModel();
            result.SetProperties(data);

            return Ok(result);
        }

        /// <summary>
        /// Gets a relation between debtor and address by debtor id.
        /// </summary>
        /// <param name="id">Id of debtor</param>
        [HttpGet("getByDebtorId")]
        [ProducesResponseType(typeof(DebtorHasAddressViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetByDebtorId(string id)
        {
            if (String.IsNullOrEmpty(id))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get debtor address link
            var data = await _repo.GetAddressByDebtorId(id);
            if (data == null)
            {
                return StatusCode(500, "Debtor -> Address relation could not be found.");
            }

            //Convert to view model
            var result = new DebtorHasAddressViewModel();
            result.SetProperties(data);

            return Ok(result);
        }

        /// <summary>
        /// Checks if a relation between debtor and address by debtor id exists.
        /// </summary>
        /// <param name="id">Id of debtor</param>
        [HttpGet("hasAddressExists")]
        [ProducesResponseType(typeof(bool), 200)]
        [ProducesResponseType(typeof(void), 400)]
        public async Task<IActionResult> HasAddressExists(string id)
        {
            if (String.IsNullOrEmpty(id))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get debtor address link
            var data = await _repo.GetAddressByDebtorId(id);

            var result = data != null ? true : false;
            return Ok(result);
        }

        /// <summary>
        /// Creates a relation between debtor and address.
        /// </summary>
        /// <param name="model">Debtor has Address object</param>
        [HttpPost("create")]
        [ProducesResponseType(typeof(DebtorHasAddressViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Create([FromBody]DebtorHasAddressViewModel model)
        {
            if (model == null)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            DebtorHasAddress debtorHasAddress = new DebtorHasAddress
            {
                DebtorId = model.DebtorId,
                Number = model.Number,
                PostalCode = model.PostalCode
            };

            //Insert relation between debtor and address
            var result = await _repo.Insert(debtorHasAddress);
            if (result == null)
            {
                return StatusCode(500, "A problem occured while saving the record. Please try again!");
            }

            return Ok(result);
        }


        /// <summary>
        /// Deletes a relation between debtor and address.
        /// </summary>
        /// <param name="id">Id of debtor</param>
        /// <param name="number">Number of address</param>
        /// <param name="postal">Postal code of address</param>
        [HttpDelete("delete")]
        [ProducesResponseType(typeof(void), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Delete(string id, int? number, string postal)
        {
            if (!number.HasValue || String.IsNullOrEmpty(id) || String.IsNullOrEmpty(postal))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Remove relation between debtor and address
            var succeeded = await _repo.Delete(id, number.Value, postal);
            if (!succeeded)
            {
                return StatusCode(500, "A problem occured while removing the record. Please try again!");
            }

            return Ok("Success");
        }
    }
}
