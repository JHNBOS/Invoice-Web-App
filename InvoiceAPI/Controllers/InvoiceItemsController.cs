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
    [Route("api/items")]
    public class InvoiceItemsController : Controller
    {
        private IInvoiceItemRepository _repo;

        public InvoiceItemsController()
        {
            this._repo = new InvoiceItemRepository();
        }

        /// <summary>
        /// Gets a list with all invoice items by invoice number.
        /// </summary>
        [HttpGet("getAll")]
        [ProducesResponseType(typeof(IEnumerable<InvoiceItemViewModel>), 200)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetByInvoiceNumber(int? invoice)
        {
            if (!invoice.HasValue)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get data
            var data = await _repo.GetByInvoiceNumber(invoice.Value);
            if (data == null)
            {
                return StatusCode(500, "Invoice items belonging to invoice number '" + invoice.Value + "' could not be found.");
            }

            //Convert to viewmodel
            var result = data.Select(s => new InvoiceItemViewModel
            {
                InvoiceNumber = s.InvoiceNumber,
                ItemNumber = s.ItemNumber,
                Price = s.Price,
                Tax = s.Tax,
                Name = s.Name,
                Description = s.Description,
                Quantity = s.Quantity
            });

            return Ok(result);
        }

        /// <summary>
        /// Gets an invoice item by name
        /// </summary>
        /// <param name="name">Name of invoice item</param>
        [HttpGet("getByName")]
        [ProducesResponseType(typeof(InvoiceItemViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetByName(string name)
        {
            if (String.IsNullOrEmpty(name))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get invoice
            var data = await _repo.GetByName(name);
            if (data == null)
            {
                return StatusCode(500, "Invoice item named '" + name + "' could not be found.");
            }

            //Convert to view model
            var result = new InvoiceItemViewModel();
            result.SetProperties(data);

            return Ok(result);
        }

        /// <summary>
        /// Gets an invoice item by id
        /// </summary>
        /// <param name="id">Id of invoice item</param>
        [HttpGet("geyById")]
        [ProducesResponseType(typeof(InvoiceItemViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetById(int? id)
        {
            if (!id.HasValue)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get invoice
            var data = await _repo.GetById(id.Value);
            if (data == null)
            {
                return StatusCode(500, "Invoice item with id '" + id.Value + "' could not be found.");
            }

            //Convert to view model
            var result = new InvoiceItemViewModel();
            result.SetProperties(data);

            return Ok(result);
        }

        /// <summary>
        /// Creates a invoice item
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
                ItemNumber = model.ItemNumber,
                Name = model.Name,
                Description = model.Description,
                Price = model.Price,
                Tax = model.Tax,
                Quantity = model.Quantity
            };

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
        /// Updates a user.
        /// </summary>
        /// <param name="model">User object</param>
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
                Price = model.Price,
                Tax = model.Tax,
                Quantity = model.Quantity
            };

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
        /// Deletes a invoice by number
        /// </summary>
        /// <param name="number">Id of invoice</param>
        [HttpDelete("delete")]
        [ProducesResponseType(typeof(void), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Delete(int? id)
        {
            if (!id.HasValue)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Remove invoice item
            var succeeded = await _repo.Delete(id.Value);
            if (!succeeded)
            {
                return StatusCode(500, "A problem occured while removing the record. Please try again!");
            }

            return Ok("Success");
        }
    }
}
