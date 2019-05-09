using InvoiceWebApp.Components.Entities;
using InvoiceWebApp.Components.Helpers;
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
    [Route("api/invoices")]
    public class InvoicesController : Controller
    {
		private readonly IInvoiceRepository _repo;
		private readonly ISettingRepository _settingsRepo;
		private Settings _settings;
        private Email _email;
        private PDF _pdf;

        public InvoicesController(IInvoiceRepository repo, ISettingRepository settingsRepo, Email email, PDF pdf)
        {
			this._repo = repo;
			this._settingsRepo = settingsRepo;

            this._email = email;
            this._pdf = pdf;

            Task.Run(async () => { this._settings = await this._settingsRepo.GetSettings(); }).Wait();
        }

        /// <summary>
        /// Invoice pagination.
        /// </summary>
        /// <param name="page">Page</param>
        /// <param name="pageSize">Amount of items on one page</param>
        [HttpGet("index")]
        [ProducesResponseType(typeof(PaginationResult<InvoiceViewModel>), 200)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Index(int? page, int? pageSize)
        {
            if (!page.HasValue || !pageSize.HasValue)
            {
                return StatusCode(400, String.Format("Invalid parameter(s)."));
            }

            //Get data
            var data = await _repo.GetInvoices();
            if (data == null)
            {
                return StatusCode(500, "Invoices could not be found.");
            }

            //Convert to viewmodel
            var result = new List<InvoiceViewModel>();
            foreach (var invoice in data)
            {
                var debtor = invoice.Debtor;
                var debtorModel = new DebtorViewModel();
                debtorModel.SetProperties(debtor, true, true);

                var invoiceModel = new InvoiceViewModel
                {
                    InvoiceNumber = invoice.InvoiceNumber,
                    CustomerId = invoice.CustomerId,
                    Total = invoice.Total,
                    Discount = invoice.Discount,
                    Comment = invoice.Comment,
                    CreatedOn = invoice.CreatedOn,
                    ExpiredOn = invoice.ExpiredOn,
                    Debtor = debtorModel,
                    IsPaid = invoice.IsPaid,
                    Concept = invoice.Concept
                };

                result.Add(invoiceModel);
            }

            var totalPages = ((result.Count() - 1) / pageSize.Value) + 1;
            var requestedData = result.Skip((page.Value - 1) * pageSize.Value).Take(pageSize.Value).ToList();

            var paging = new PaginationResult<InvoiceViewModel>(page.Value, totalPages, requestedData);
            var pagingResult = new PaginationResultViewModel<InvoiceViewModel>
            {
                Data = paging.Data,
                TotalPages = paging.TotalPages,
                CurrentPage = paging.CurrentPage
            };

            return Ok(pagingResult);
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
            var result = new List<InvoiceViewModel>();
            foreach (var invoice in data)
            {
                var debtor = invoice.Debtor;
                var debtorModel = new DebtorViewModel();
                debtorModel.SetProperties(debtor, true, true);

                var invoiceModel = new InvoiceViewModel
                {
                    InvoiceNumber = invoice.InvoiceNumber,
                    CustomerId = invoice.CustomerId,
                    Total = invoice.Total,
                    Discount = invoice.Discount,
                    Comment = invoice.Comment,
                    CreatedOn = invoice.CreatedOn,
                    ExpiredOn = invoice.ExpiredOn,
                    Debtor = debtorModel,
                    IsPaid = invoice.IsPaid,
                    Concept = invoice.Concept
                };

                result.Add(invoiceModel);
            }

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

            //Get debtor
            var debtor = data.Debtor;
            var debtorModel = new DebtorViewModel();
            debtorModel.SetProperties(debtor, true, true);

            //Convert to view model
            var result = new InvoiceViewModel();
            result.Debtor = debtorModel;
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

            //Convert to viewmodel
            var result = new List<InvoiceViewModel>();
            foreach (var invoice in data)
            {
                var debtors = invoice.Debtor;
                var debtorModel = new DebtorViewModel();
                debtorModel.SetProperties(debtors, true, true);

                var invoiceModel = new InvoiceViewModel
                {
                    InvoiceNumber = invoice.InvoiceNumber,
                    CustomerId = invoice.CustomerId,
                    Total = invoice.Total,
                    Discount = invoice.Discount,
                    Comment = invoice.Comment,
                    CreatedOn = invoice.CreatedOn,
                    ExpiredOn = invoice.ExpiredOn,
                    Debtor = debtorModel,
                    IsPaid = invoice.IsPaid,
                    Concept = invoice.Concept
                };

                result.Add(invoiceModel);
            }

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

            //Convert to viewmodel
            var result = new List<InvoiceViewModel>();
            foreach (var invoice in data)
            {
                var debtor = invoice.Debtor;
                var debtorModel = new DebtorViewModel();
                debtorModel.SetProperties(debtor, true, true);

                var invoiceModel = new InvoiceViewModel
                {
                    InvoiceNumber = invoice.InvoiceNumber,
                    CustomerId = invoice.CustomerId,
                    Total = invoice.Total,
                    Discount = invoice.Discount,
                    Comment = invoice.Comment,
                    CreatedOn = invoice.CreatedOn,
                    ExpiredOn = invoice.ExpiredOn,
                    Debtor = debtorModel,
                    IsPaid = invoice.IsPaid,
                    Concept = invoice.Concept
                };

                result.Add(invoiceModel);
            }

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

            //Convert to viewmodel
            var result = new List<InvoiceViewModel>();
            foreach (var invoice in data)
            {
                var debtor = invoice.Debtor;
                var debtorModel = new DebtorViewModel();
                debtorModel.SetProperties(debtor, true, true);

                var invoiceModel = new InvoiceViewModel
                {
                    InvoiceNumber = invoice.InvoiceNumber,
                    CustomerId = invoice.CustomerId,
                    Total = invoice.Total,
                    Discount = invoice.Discount,
                    Comment = invoice.Comment,
                    CreatedOn = invoice.CreatedOn,
                    ExpiredOn = invoice.ExpiredOn,
                    Debtor = debtorModel,
                    IsPaid = invoice.IsPaid,
                    Concept = invoice.Concept
                };

                result.Add(invoiceModel);
            }

            return Ok(result);
        }

        /// <summary>
        /// Returns a pdf of invoice.
        /// </summary>
        /// <param name="invoice">Number of invoice</param>
        [HttpGet("pdf")]
        [ProducesResponseType(typeof(FileContentResult), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> PDF(string invoice)
        {
            if (String.IsNullOrEmpty(invoice))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get pdf
            var data = await _pdf.CreatePDF(invoice);
            if (data == null)
            {
                return StatusCode(500, "Could not generate PDF of requested invoice.");
            }

            // Open PDF
            var contentDispositionHeader = new System.Net.Mime.ContentDisposition
            {
                Inline = true,
                FileName = String.Format("{0}_{1}.pdf", _settings.CompanyName, invoice)
            };

            Response.Headers.Add("Content-Type", "application/pdf");
            Response.Headers.Add("Content-Disposition", contentDispositionHeader.ToString());

            return File(data, System.Net.Mime.MediaTypeNames.Application.Pdf);
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
                CustomerId = model.CustomerId,
                IsPaid = model.IsPaid,
                Concept = model.Concept,
                Debtor = new Debtor
                {
                    Id = model.Debtor.Id,
                    FirstName = model.Debtor.FirstName,
                    LastName = model.Debtor.LastName,
                    Email = model.Debtor.Email,
                    BankAccount = model.Debtor.BankAccount,
                    Phone = model.Debtor.Phone,
                    CompanyName = model.Debtor.CompanyName
                }
            };

            //Set invoice number
            if (invoice.InvoiceNumber == "-1")
            {
                var today = DateTime.Now;
                var prefix = String.IsNullOrEmpty(_settings.InvoicePrefix) ? _settings.InvoicePrefix : "";

                var invoiceCount = await this._repo.GetCount();
                var leadingZeros = "";
                switch (today.Month.ToString().Length)
                {
                    case 1:
                        leadingZeros = "000";
                        break;
                    case 2:
                        leadingZeros = "00";
                        break;
                    case 3:
                        leadingZeros = "0";
                        break;
                    case 4:
                        leadingZeros = "";
                        break;
                }

                invoice.InvoiceNumber = prefix + today.Year + '-' + (leadingZeros + invoiceCount);
            }

            //Swap comma with dots
            var totalString = invoice.Total.ToString().Replace(".", ",");
            invoice.Total = Convert.ToDecimal(totalString);

            //Insert invoice
            var data = await _repo.Insert(invoice);
            if (data == null)
            {
                return StatusCode(500, "A problem occured while saving the record. Please try again!");
            }

            //Send email
            if (invoice.Concept == false)
            {
                await _email.SendNotification(new Debtor
                {
                    Id = model.Debtor.Id,
                    FirstName = model.Debtor.FirstName,
                    LastName = model.Debtor.LastName,
                    Email = model.Debtor.Email,
                    BankAccount = model.Debtor.BankAccount,
                    Phone = model.Debtor.Phone,
                    CompanyName = model.Debtor.CompanyName
                });
            }

            var result = new InvoiceViewModel();
            result.SetProperties(data);

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

            var originalInvoice = await _repo.GetByNumber(model.InvoiceNumber);

            Invoice invoice = new Invoice
            {
                InvoiceNumber = model.InvoiceNumber,
                CreatedOn = model.CreatedOn,
                ExpiredOn = model.ExpiredOn,
                Total = model.Total,
                Discount = model.Discount,
                Comment = model.Comment,
                CustomerId = model.CustomerId,
                IsPaid = model.IsPaid,
                Concept = model.Concept
            };

            //Swap comma with dots
            var totalString = invoice.Total.ToString().Replace(".", ",");
            invoice.Total = Convert.ToDecimal(totalString);

            //Update invoice
            var data = await _repo.Update(invoice);
            if (data == null)
            {
                return StatusCode(500, "A problem occured while updating the record. Please try again!");
            }

            var result = new InvoiceViewModel();
            result.SetProperties(data);

            //Send email
            if (originalInvoice.Concept == false && invoice.Concept == true)
            {
                await _email.SendNotification(invoice.Debtor);
            }

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
