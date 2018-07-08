using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using InvoiceWebApp.Components.DataContext;
using InvoiceWebApp.Components.Entities;
using InvoiceWebApp.Components.Helpers;
using InvoiceWebApp.Components.Services.Interfaces;

using Microsoft.EntityFrameworkCore;

namespace InvoiceWebApp.Components.Services
{
    public class AddressRepository : IAddressRepository
    {
        private InvoiceContext _context = new InvoiceContext();
        private Encryptor _encryptor = new Encryptor();
        private Random random = new Random();

        public async Task<ICollection<Address>> GetAddresses()
        {
            var response = await _context.Addresses.ToListAsync();
            return response;
        }

        public async Task<ICollection<Address>> GetAddressesByCity(string city)
        {
            var response = await _context.Addresses.Where(q => q.City.ToLower() == city.ToLower()).ToListAsync();
            return response;
        }

        public async Task<ICollection<Address>> GetAddressesByPostal(string postal)
        {
            var response = await _context.Addresses.Where(q => q.PostalCode.ToLower() == postal.ToLower()).ToListAsync();
            return response;
        }

        public async Task<Address> GetAddressByPostalAndNumber(int number, string postal)
        {
            var response = await _context.Addresses.FirstOrDefaultAsync(q => q.PostalCode.ToLower() == postal.ToLower() && q.Number == number);
            return response;
        }

        public async Task<Address> Insert(Address address)
        {
            var response = _context.Addresses.Add(address);
            await _context.SaveChangesAsync();

            return response.Entity;
        }

        public async Task<bool> Delete(int number, string suffix, string postal)
        {
            Address address = null;
            if (!String.IsNullOrEmpty(suffix))
            {
                address = await _context.Addresses.FirstOrDefaultAsync(q => q.PostalCode.ToLower() == postal.ToLower() && q.Suffix.ToLower() == suffix.ToLower()
                        && q.Number == number);
            }
            else
            {
                address = await _context.Addresses.FirstOrDefaultAsync(q => q.PostalCode.ToLower() == postal.ToLower() && q.Number == number);
            }

            _context.Addresses.Remove(address);

            var result = await _context.SaveChangesAsync();
            return result == 1 ? true : false;
        }
    }
}
