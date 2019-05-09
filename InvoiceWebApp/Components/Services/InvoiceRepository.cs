using InvoiceWebApp.Components.DataContext;
using InvoiceWebApp.Components.Entities;
using InvoiceWebApp.Components.Services.Interfaces;

using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InvoiceWebApp.Components.Services {
	public class InvoiceRepository : IInvoiceRepository
    {
		private readonly InvoiceContext _context;

		public InvoiceRepository(InvoiceContext context) {
			this._context = context;
		}

		public async Task<int> GetCount()
        {
            var response = await _context.Invoices.CountAsync();
            return response;
        }

        public async Task<ICollection<Invoice>> GetInvoices()
        {
            var response = await _context.Invoices.Include(i => i.Items).Include(i => i.Debtor).OrderBy(o => o.ExpiredOn).ToListAsync();
            return response;
        }

        public async Task<ICollection<Invoice>> GetNearlyExpired()
        {
            var response = await _context.Invoices.Include(i => i.Items).Include(i => i.Debtor).Where(q => (q.ExpiredOn - DateTime.Now).TotalDays <= 30)
                .OrderBy(o => o.ExpiredOn).ToListAsync();
            return response;
        }

        public async Task<ICollection<Invoice>> GetByCreationDate(DateTime date)
        {
            var response = await _context.Invoices.Include(i => i.Items).Include(i => i.Debtor).Where(q => q.CreatedOn >= date).ToListAsync();
            return response;
        }

        public async Task<ICollection<Invoice>> GetByDebtorId(string id)
        {
            var response = await _context.Invoices.Include(i => i.Items).Include(i => i.Debtor).Where(q => q.CustomerId == id).OrderBy(o => o.ExpiredOn).ToListAsync();
            return response;
        }

        public async Task<Invoice> GetByNumber(string number)
        {
            var response = await _context.Invoices.Include(i => i.Items).Include(i => i.Debtor).FirstOrDefaultAsync(q => q.InvoiceNumber == number);
            return response;
        }

        public async Task<Invoice> Insert(Invoice invoice)
        {
            invoice.Debtor = null;

            var response = _context.Invoices.Add(invoice);
            await _context.SaveChangesAsync();

            return response.Entity;
        }

        public async Task<Invoice> Update(Invoice invoice)
        {
            invoice.Debtor = null;

            var invoiceBeforeUpdate = await _context.Invoices.FindAsync(invoice.InvoiceNumber);
            if (invoiceBeforeUpdate == null)
            {
                return null;
            }

            _context.Entry(invoiceBeforeUpdate).CurrentValues.SetValues(invoice);
            await _context.SaveChangesAsync();

            return invoice;
        }

        public async Task<bool> Delete(string id)
        {
            Invoice invoice = await _context.Invoices.FirstOrDefaultAsync(q => q.InvoiceNumber == id);
            _context.Invoices.Remove(invoice);

            var result = await _context.SaveChangesAsync();
            return result == 1 ? true : false;
        }

        public async Task<bool> DeleteByDebtorId(string id)
        {
            List<Invoice> invoices = await _context.Invoices.Where(q => q.CustomerId == id).ToListAsync();
            _context.Invoices.RemoveRange(invoices);

            var result = await _context.SaveChangesAsync();
            return result == 1 ? true : false;
        }
    }
}
