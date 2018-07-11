using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using InvoiceWebApp.Components.Entities;
using InvoiceWebApp.Components.Services;
using InvoiceWebApp.Components.Services.Interfaces;
using InvoiceWebApp.Controllers.ViewModels;

using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace ShareListAPI.Controllers
{
    [EnableCors("AllowAll")]
    [Produces("application/json")]
    [Route("api/invoices")]
    public class InvoicesController : Controller
    {
        private IInvoiceRepository _repo;

        public InvoicesController()
        {
            this._repo = new InvoiceRepository();
        }

        /// <summary>
        /// Gets a list with all invoices.
        /// </summary>
        [HttpGet("getAll")]
        [ProducesResponseType(typeof(IEnumerable<InvoiceViewModel>), 200)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetAll()
        {
            //Get data
            var data = await _repo.GetInvoices();
            if (data == null)
            {
                return StatusCode(500, "Invoices could not be found.");
            }

            //Convert to viewmodel
            var result = data.Select(s => new InvoiceViewModel
            {
                InvoiceNumber = s.InvoiceNumber,
                CustomerId = s.CustomerId,
                Total = s.Total,
                Discount = s.Discount,
                Comment = s.Comment,
                CreatedOn = s.CreatedOn,
                ExpiredOn = s.ExpiredOn
            });

            return Ok(result);
        }

        /// <summary>
        /// Gets an invoice by invoice number
        /// </summary>
        /// <param name="invoice">Number of invoice</param>
        [HttpGet("getByNumber")]
        [ProducesResponseType(typeof(InvoiceViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetByNumber(string invoice)
        {
            if (String.IsNullOrEmpty(invoice))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get invoice
            var data = await _repo.GetByNumber(invoice);
            if (data == null)
            {
                return StatusCode(500, "Invoice with number " + invoice + " could not be found.");
            }

            //Convert to view model
            var result = new InvoiceViewModel();
            result.SetProperties(data);

            return Ok(result);
        }

        /// <summary>
        /// Gets an invoice by debtor id.
        /// </summary>
        /// <param name="debtor">Id of debtor</param>
        [HttpGet("getByDebtorId")]
        [ProducesResponseType(typeof(IEnumerable<InvoiceViewModel>), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetByDebtorId(string debtor)
        {
            if (String.IsNullOrEmpty(debtor))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get invoices
            var data = await _repo.GetByDebtorId(debtor);
            if (data == null)
            {
                return StatusCode(500, "Invoice with debtor id " + debtor + " could not be found.");
            }

            //Convert to view model
            var result = data.Select(s => new InvoiceViewModel
            {
                InvoiceNumber = s.InvoiceNumber,
                CustomerId = s.CustomerId,
                Total = s.Total,
                Discount = s.Discount,
                Comment = s.Comment,
                CreatedOn = s.CreatedOn,
                ExpiredOn = s.ExpiredOn
            });

            return Ok(result);
        }

        /// <summary>
        /// Gets an invoice by creation date.
        /// </summary>
        /// <param name="date">Date to search for</param>
        [HttpGet("getByCreationDate")]
        [ProducesResponseType(typeof(IEnumerable<InvoiceViewModel>), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetByCreationDate(DateTime? date)
        {
            if (!date.HasValue)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get invoices
            var data = await _repo.GetByCreationDate(date.Value);
            if (data == null)
            {
                return StatusCode(500, "Invoice with date" + date.Value.ToString("dd-MM-yyyy") + " could not be found.");
            }

            //Convert to view model
            var result = data.Select(s => new InvoiceViewModel
            {
                InvoiceNumber = s.InvoiceNumber,
                CustomerId = s.CustomerId,
                Total = s.Total,
                Discount = s.Discount,
                Comment = s.Comment,
                CreatedOn = s.CreatedOn,
                ExpiredOn = s.ExpiredOn
            });

            return Ok(result);
        }

        /// <summary>
        /// Gets all nearly expired invoices.
        /// </summary>
        [HttpGet("getNearlyExpired")]
        [ProducesResponseType(typeof(IEnumerable<InvoiceViewModel>), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetNearlyExpired()
        {
            //Get invoices
            var data = await _repo.GetNearlyExpired();
            if (data == null)
            {
                return StatusCode(500, "Nearly expired invoices could not be found.");
            }

            //Convert to view model
            var result = data.Select(s => new InvoiceViewModel
            {
                InvoiceNumber = s.InvoiceNumber,
                CustomerId = s.CustomerId,
                Total = s.Total,
                Discount = s.Discount,
                Comment = s.Comment,
                CreatedOn = s.CreatedOn,
                ExpiredOn = s.ExpiredOn
            });

            return Ok(result);
        }

        /// <summary>
        /// Creates a invoice.
        /// </summary>
        /// <param name="model">Invoice object</param>
        [HttpPost("create")]
        [ProducesResponseType(typeof(InvoiceViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Create([FromBody]InvoiceViewModel model)
        {
            if (model == null)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            Invoice invoice = new Invoice
            {
                InvoiceNumber = model.InvoiceNumber,
                CreatedOn = model.CreatedOn,
                ExpiredOn = model.ExpiredOn,
                Total = model.Total,
                Discount = model.Discount,
                Comment = model.Comment,
                CustomerId = model.CustomerId
            };

            //Insert invoice
            var result = await _repo.Insert(invoice);
            if (result == null)
            {
                return StatusCode(500, "A problem occured while saving the record. Please try again!");
            }

            return Ok(result);
        }

        /// <summary>
        /// Updates a user.
        /// </summary>
        /// <param name="model">User object</param>
        [HttpPut("update")]
        [ProducesResponseType(typeof(InvoiceViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Update([FromBody]InvoiceViewModel model)
        {
            if (model == null)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            Invoice invoice = new Invoice
            {
                InvoiceNumber = model.InvoiceNumber,
                CreatedOn = model.CreatedOn,
                ExpiredOn = model.ExpiredOn,
                Total = model.Total,
                Discount = model.Discount,
                Comment = model.Comment,
                CustomerId = model.CustomerId
            };

            //Update invoice
            var data = await _repo.Update(invoice);
            if (data == null)
            {
                return StatusCode(500, "A problem occured while updating the record. Please try again!");
            }

            var result = new InvoiceViewModel();
            result.SetProperties(data);

            return Ok(result);
        }

        /// <summary>
        /// Deletes a invoice by number
        /// </summary>
        /// <param name="invoice">Id of invoice</param>
        [HttpDelete("delete")]
        [ProducesResponseType(typeof(void), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Delete(string invoice)
        {
            if (String.IsNullOrEmpty(invoice))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Remove invoice
            var succeeded = await _repo.Delete(invoice);
            if (!succeeded)
            {
                return StatusCode(500, "A problem occured while removing the record. Please try again!");
            }

            return Ok("Success");
        }

        /// <summary>
        /// Deletes all invoices belonging to a certain debtor id
        /// </summary>
        /// <param name="debtor">Id of debtor</param>
        [HttpDelete("deleteByDebtorId")]
        [ProducesResponseType(typeof(void), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> DeleteByDebtorId(string debtor)
        {
            if (String.IsNullOrEmpty(debtor))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Remove invoice(s)
            var succeeded = await _repo.DeleteByDebtorId(debtor);
            if (!succeeded)
            {
                return StatusCode(500, "A problem occured while removing the record. Please try again!");
            }

            return Ok("Success");
        }
    }
}
