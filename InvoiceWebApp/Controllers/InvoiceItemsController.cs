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
    [Route("api/items")]
    public class InvoiceItemsController : Controller
    {
        private readonly IInvoiceItemRepository _repo;

        public InvoiceItemsController(IInvoiceItemRepository repo)
        {
			this._repo = repo;
		}

        /// <summary>
        /// Gets a list with all invoice items by invoice number.
        /// </summary>
        [HttpGet("getByInvoice")]
        [ProducesResponseType(typeof(IEnumerable<InvoiceItemViewModel>), 200)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetByInvoice(string invoice)
        {
            if (String.IsNullOrEmpty(invoice))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get data
            var data = await _repo.GetByInvoiceNumber(invoice);
            if (data == null)
            {
                return StatusCode(500, "Invoice items belonging to invoice '" + invoice + "' could not be found.");
            }

            //Convert to viewmodel
            var result = data.Select(s => new InvoiceItemViewModel
            {
                InvoiceNumber = s.InvoiceNumber,
                Name = s.Name,
                Price = s.Price,
                Description = s.Description,
                Tax = s.Tax,
                Quantity = s.Quantity,
                ItemNumber = s.ItemNumber
            });

            return Ok(result);
        }

        /// <summary>
        /// Gets an invoice item by number.
        /// </summary>
        [HttpGet("getByNumber")]
        [ProducesResponseType(typeof(InvoiceItemViewModel), 200)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetByNumber(int? number)
        {
            if (!number.HasValue)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get data
            var data = await _repo.GetById(number.Value);
            if (data == null)
            {
                return StatusCode(500, "Invoice item with item number '" + number.Value + "' could not be found.");
            }

            //Convert to viewmodel
            var result = new InvoiceItemViewModel
            {
                InvoiceNumber = data.InvoiceNumber,
                Name = data.Name,
                Price = data.Price,
                Description = data.Description,
                Tax = data.Tax,
                Quantity = data.Quantity,
                ItemNumber = data.ItemNumber
            };

            return Ok(result);
        }

        /// <summary>
        /// Gets an invoice item by name.
        /// </summary>
        [HttpGet("getByName")]
        [ProducesResponseType(typeof(InvoiceItemViewModel), 200)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetByName(string name)
        {
            if (String.IsNullOrEmpty(name))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get data
            var data = await _repo.GetByName(name);
            if (data == null)
            {
                return StatusCode(500, "Invoice item named '" + name + "' could not be found.");
            }

            //Convert to viewmodel
            var result = new InvoiceItemViewModel
            {
                InvoiceNumber = data.InvoiceNumber,
                Name = data.Name,
                Price = data.Price,
                Description = data.Description,
                Tax = data.Tax,
                Quantity = data.Quantity,
                ItemNumber = data.ItemNumber
            };

            return Ok(result);
        }

        /// <summary>
        /// Creates a invoice item.
        /// </summary>
        /// <param name="model">Invoice item object</param>
        [HttpPost("create")]
        [ProducesResponseType(typeof(InvoiceItemViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Create([FromBody]InvoiceItemViewModel model)
        {
            if (model == null)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            InvoiceItem invoiceItem = new InvoiceItem
            {
                InvoiceNumber = model.InvoiceNumber,
                Name = model.Name,
                Description = model.Description,
                Tax = model.Tax,
                Price = model.Price,
                Quantity = model.Quantity
            };

            //Swap comma with dots
            var priceString = invoiceItem.Price.ToString().Replace(".", ",");
            invoiceItem.Price = Convert.ToDecimal(priceString);

            //Insert invoice item
            var data = await _repo.Insert(invoiceItem);
            if (data == null)
            {
                return StatusCode(500, "A problem occured while saving the record. Please try again!");
            }

            var result = new InvoiceItemViewModel();
            result.SetProperties(data);

            return Ok(result);
        }

        /// <summary>
        /// Updates a invoice item.
        /// </summary>
        /// <param name="model">Invoice item object</param>
        [HttpPut("update")]
        [ProducesResponseType(typeof(InvoiceItemViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Update([FromBody]InvoiceItemViewModel model)
        {
            if (model == null)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            InvoiceItem invoiceItem = new InvoiceItem
            {
                InvoiceNumber = model.InvoiceNumber,
                ItemNumber = model.ItemNumber,
                Name = model.Name,
                Description = model.Description,
                Tax = model.Tax,
                Price = model.Price,
                Quantity = model.Quantity
            };

            //Swap comma with dots
            var priceString = invoiceItem.Price.ToString().Replace(".", ",");
            invoiceItem.Price = Convert.ToDecimal(priceString);

            //Update invoice item
            var data = await _repo.Update(invoiceItem);
            if (data == null)
            {
                return StatusCode(500, "A problem occured while updating the record. Please try again!");
            }

            var result = new InvoiceItemViewModel();
            result.SetProperties(data);

            return Ok(result);
        }

        /// <summary>
        /// Deletes a invoice item by number
        /// </summary>
        /// <param name="number">Number of invoice item</param>
        [HttpDelete("delete")]
        [ProducesResponseType(typeof(void), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Delete(int? number)
        {
            if (!number.HasValue)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Remove invoice item
            var succeeded = await _repo.Delete(number.Value);
            if (!succeeded)
            {
                return StatusCode(500, "A problem occured while removing the record. Please try again!");
            }

            return Ok("Success");
        }
    }
}
