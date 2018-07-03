using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using InvoiceAPI.Components.DataContext;
using InvoiceAPI.Components.Entities;
using InvoiceAPI.Components.Helpers;
using InvoiceAPI.Components.Services.Interfaces;

using Microsoft.EntityFrameworkCore;

namespace InvoiceAPI.Components.Services
{
    public class DebtorHasAddressRepository : IDebtorHasAddressRepository
    {
        private InvoiceContext _context = new InvoiceContext();
        private Encryptor _encryptor = new Encryptor();
        private Random random = new Random();

        public async Task<ICollection<DebtorHasAddress>> GetAll()
        {
            var response = await _context.DebtorHasAddresses.ToListAsync();
            return response;
        }

        public async Task<DebtorHasAddress> GetAddressByDebtorId(string id)
        {
            var response = await _context.DebtorHasAddresses.FirstOrDefaultAsync(q => q.DebtorId == id);
            return response;
        }

        public async Task<ICollection<DebtorHasAddress>> GetAddressesByPostal(string postal)
        {
            var response = await _context.DebtorHasAddresses.Where(q => q.PostalCode.ToLower() == postal.ToLower()).ToListAsync();
            return response;
        }

        public async Task<DebtorHasAddress> GetAddressByPostalAndNumber(int number, string postal)
        {
            var response = await _context.DebtorHasAddresses.FirstOrDefaultAsync(q => q.PostalCode.ToLower() == postal.ToLower() && q.Number == number);
            return response;
        }

        public async Task<DebtorHasAddress> Insert(DebtorHasAddress debtorHasAddress)
        {
            var response = await _context.DebtorHasAddresses.AddAsync(debtorHasAddress);
            await _context.SaveChangesAsync();

            return response.Entity;
        }

        public async Task<bool> Delete(string id, int number, string postal)
        {
            DebtorHasAddress address = await _context.DebtorHasAddresses.FirstOrDefaultAsync(q => q.PostalCode.ToLower() == postal.ToLower() && q.Number == number
                    && q.DebtorId == id);
            _context.DebtorHasAddresses.Remove(address);

            var result = await _context.SaveChangesAsync();
            return result == 1 ? true : false;
        }
    }
}
