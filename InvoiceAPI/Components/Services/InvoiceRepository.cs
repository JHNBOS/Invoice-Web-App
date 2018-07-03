using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using InvoiceAPI.Components.DataContext;
using InvoiceAPI.Components.Entities;
using InvoiceAPI.Components.Services.Interfaces;

using Microsoft.EntityFrameworkCore;

namespace InvoiceAPI.Components.Services
{
    public class InvoiceRepository : IInvoiceRepository
    {
        private InvoiceContext _context = new InvoiceContext();

        public async Task<ICollection<Invoice>> GetInvoices()
        {
            var response = await _context.Invoices.ToListAsync();
            return response;
        }

        public async Task<ICollection<Invoice>> GetNearlyExpired()
        {
            var response = await _context.Invoices.Where(q => (q.ExpiredOn - DateTime.Now).TotalDays <= 30).ToListAsync();
            return response;
        }

        public async Task<ICollection<Invoice>> GetByCreationDate(DateTime date)
        {
            var response = await _context.Invoices.Where(q => q.CreatedOn >= date).ToListAsync();
            return response;
        }

        public async Task<ICollection<Invoice>> GetByDebtorId(string id)
        {
            var response = await _context.Invoices.Where(q => q.CustomerId == id).ToListAsync();
            return response;
        }

        public async Task<Invoice> GetByNumber(int number)
        {
            var response = await _context.Invoices.FirstOrDefaultAsync(q => q.InvoiceNumber == number);
            return response;
        }

        public async Task<Invoice> Insert(Invoice invoice)
        {
            var response = await _context.Invoices.AddAsync(invoice);
            await _context.SaveChangesAsync();

            return response.Entity;
        }

        public async Task<Invoice> Update(Invoice invoice)
        {
            var invoiceBeforeUpdate = await _context.Invoices.FindAsync(invoice.InvoiceNumber);
            if (invoiceBeforeUpdate == null)
            {
                return null;
            }

            _context.Entry(invoiceBeforeUpdate).CurrentValues.SetValues(invoice);
            var result = await _context.SaveChangesAsync();

            return result == 1 ? invoice : null;
        }

        public async Task<bool> Delete(int id)
        {
            Invoice invoice = await _context.Invoices.FirstOrDefaultAsync(q => q.InvoiceNumber == id);
            _context.Invoices.Remove(invoice);

            var result = await _context.SaveChangesAsync();
            return result == 1 ? true : false;
        }
    }
}
