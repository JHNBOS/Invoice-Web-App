﻿using InvoiceWebApp.Components.Entities;
using InvoiceWebApp.Components.Services.Interfaces;
using InvoiceWebApp.Controllers.ViewModels;

using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace InvoiceWebApp.Controllers {
	[EnableCors("AllowAll")]
    [Produces("application/json")]
    [Route("api/debtors")]
    public class DebtorsController : Controller
    {
		private readonly IDebtorRepository _repo;
		private readonly IDebtorHasAddressRepository _debtorHasAddressRepo;
		private readonly IAddressRepository _addressRepository;

		public DebtorsController(IDebtorRepository repo, IDebtorHasAddressRepository debtorHasAddressRepo, IAddressRepository addressRepository)
        {
			this._repo = repo;
			this._debtorHasAddressRepo = debtorHasAddressRepo;
            this._addressRepository = addressRepository;
        }

        /// <summary>
        /// Debtor pagination.
        /// </summary>
        /// <param name="page">Page</param>
        /// <param name="pageSize">Amount of items on one page</param>
        [HttpGet("index")]
        [ProducesResponseType(typeof(PaginationResult<DebtorViewModel>), 200)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Index(int? page, int? pageSize)
        {
            if (!page.HasValue || !pageSize.HasValue)
            {
                return StatusCode(400, String.Format("Invalid parameter(s)."));
            }

            //Get data
            var data = await _repo.GetDebtors();
            if (data == null)
            {
                return StatusCode(500, "Debtors could not be found.");
            }

            //Convert to viewmodel
            var result = new List<DebtorViewModel>();
            foreach (var debtor in data)
            {
                //Debtor --> Address
                var hasAddress = debtor.Addresses.ToList()[0];
                var address = await _addressRepository.GetAddressByPostalAndNumber(hasAddress.Number, hasAddress.PostalCode);

                //Address model
                var addressViewModel = new AddressViewModel();
                addressViewModel.SetProperties(address);

                //Debtor model
                var debtorModel = new DebtorViewModel();
                debtorModel.Address = addressViewModel;
                debtorModel.SetProperties(debtor, false, false);

                result.Add(debtorModel);
            }

            var totalPages = ((result.Count() - 1) / pageSize.Value) + 1;
            var requestedData = result.Skip((page.Value - 1) * pageSize.Value).Take(pageSize.Value).ToList();

            var paging = new PaginationResult<DebtorViewModel>(page.Value, totalPages, requestedData);
            var pagingResult = new PaginationResultViewModel<DebtorViewModel>
            {
                Data = paging.Data,
                TotalPages = paging.TotalPages,
                CurrentPage = paging.CurrentPage
            };

            return Ok(pagingResult);
        }

        /// <summary>
        /// Gets a list with all debtors.
        /// </summary>
        [HttpGet("getAll")]
        [ProducesResponseType(typeof(IEnumerable<DebtorViewModel>), 200)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetAll()
        {
            //Get data
            var data = await _repo.GetDebtors();
            if (data == null)
            {
                return StatusCode(500, "Debtors could not be found.");
            }

            //Convert to viewmodel
            var result = new List<DebtorViewModel>();
            foreach (var debtor in data)
            {
                //Debtor --> Address
                var hasAddress = debtor.Addresses.ToList()[0];
                var address = await _addressRepository.GetAddressByPostalAndNumber(hasAddress.Number, hasAddress.PostalCode);

                //Address model
                var addressViewModel = new AddressViewModel();
                addressViewModel.SetProperties(address);

                //Debtor model
                var debtorModel = new DebtorViewModel();
                debtorModel.Address = addressViewModel;
                debtorModel.SetProperties(debtor, false, false);

                result.Add(debtorModel);
            }

            return Ok(result);
        }

        /// <summary>
        /// Gets a debtor by email.
        /// </summary>
        /// <param name="email">Email of debtor</param>
        [HttpGet("getByEmail")]
        [ProducesResponseType(typeof(UserViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetByEmail(string email)
        {
            if (String.IsNullOrEmpty(email))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            // Check if email address is valid
            if (!Regex.Match(email, @"^([\w\.\-]+)@((?!\.|\-)[\w\-]+)((\.(\w){2,3})+)$").Success)
            {
                return StatusCode(400, "This e-mail address is not valid.");
            }

            //Get debtor
            var data = await _repo.GetDebtorByEmail(email);
            if (data == null)
            {
                return StatusCode(500, "Debtor could not be found.");
            }

            //Debtor --> Address
            var hasAddress = data.Addresses.ToList()[0];
            var address = await _addressRepository.GetAddressByPostalAndNumber(hasAddress.Number, hasAddress.PostalCode);

            //Address model
            var addressViewModel = new AddressViewModel();
            addressViewModel.SetProperties(address);

            //Debtor model
            var result = new DebtorViewModel();
            result.Address = addressViewModel;
            result.SetProperties(data, false, false);

            return Ok(result);
        }

        /// <summary>
        /// Gets a debtor by id.
        /// </summary>
        /// <param name="id">Id of debtor</param>
        [HttpGet("getById")]
        [ProducesResponseType(typeof(UserViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetById(string id)
        {
            if (String.IsNullOrEmpty(id))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get user
            var data = await _repo.GetDebtorByID(id);
            if (data == null)
            {
                return StatusCode(500, "Debtor could not be found.");
            }

            //Debtor --> Address
            var hasAddress = data.Addresses.ToList()[0];
            var address = await _addressRepository.GetAddressByPostalAndNumber(hasAddress.Number, hasAddress.PostalCode);

            //Address model
            var addressViewModel = new AddressViewModel();
            addressViewModel.SetProperties(address);

            //Debtor model
            var result = new DebtorViewModel();
            result.Address = addressViewModel;
            result.SetProperties(data, false, false);

            return Ok(result);
        }

        /// <summary>
        /// Creates a debtor.
        /// </summary>
        /// <param name="model">Debtor object</param>
        [HttpPost("create")]
        [ProducesResponseType(typeof(DebtorViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Create([FromBody]DebtorViewModel model)
        {
            if (model == null)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            Debtor debtor = new Debtor
            {
                Id = model.Id,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                BankAccount = model.BankAccount,
                Phone = model.Phone,
                CompanyName = model.CompanyName
            };

            //Insert debtor
            var data = await _repo.Insert(debtor);
            if (data == null)
            {
                return StatusCode(500, "A problem occured while saving the record. Please try again!");
            }

            var result = new DebtorViewModel();
            result.SetProperties(data, true, true);

            return Ok(result);
        }

        /// <summary>
        /// Updates a debtor.
        /// </summary>
        /// <param name="model">Debtor object</param>
        [HttpPut("update")]
        [ProducesResponseType(typeof(DebtorViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Update([FromBody]DebtorViewModel model)
        {
            if (model == null)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            Debtor debtor = new Debtor
            {
                Id = model.Id,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                BankAccount = model.BankAccount,
                Phone = model.Phone,
                CompanyName = model.CompanyName
            };

            //Update debtor
            var data = await _repo.Update(debtor);
            if (data == null)
            {
                return StatusCode(500, "A problem occured while updating the record. Please try again!");
            }

            var result = new DebtorViewModel();
            result.SetProperties(data, false, false);

            return Ok(result);
        }

        /// <summary>
        /// Deletes a debtor.
        /// </summary>
        /// <param name="id">Id of debtor</param>
        [HttpDelete("delete")]
        [ProducesResponseType(typeof(void), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Delete(string id)
        {
            if (String.IsNullOrEmpty(id))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Remove debtor
            var succeeded = await _repo.Delete(id);
            if (!succeeded)
            {
                return StatusCode(500, "A problem occured while removing the record. Please try again!");
            }

            return Ok("Success");
        }

        #region Private Methods

        private async Task<Address> GetAddress(string debtorId)
        {
            var debtorHasAddress = await this._debtorHasAddressRepo.GetAddressByDebtorId(debtorId);
            var address = await this._addressRepository.GetAddressByPostalAndNumber(debtorHasAddress.Number, debtorHasAddress.PostalCode);

            return address;
        }

        #endregion
    }
}
