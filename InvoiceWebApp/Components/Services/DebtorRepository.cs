using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using InvoiceWebApp.Components.DataContext;
using InvoiceWebApp.Components.Entities;
using InvoiceWebApp.Components.Services.Interfaces;

using Microsoft.EntityFrameworkCore;

namespace InvoiceWebApp.Components.Services
{
    public class DebtorRepository : IDebtorRepository
    {
        private InvoiceContext _context = new InvoiceContext();

        public async Task<ICollection<Debtor>> GetDebtors()
        {
            var response = await _context.Debtors.Include(i => i.Addresses).Include(i => i.Invoices).ToListAsync();
            return response;
        }

        public async Task<Debtor> GetDebtorByEmail(string email)
        {
            var response = await _context.Debtors.Include(i => i.Addresses).Include(i => i.Invoices).FirstOrDefaultAsync(q => q.Email.ToLower() == email.ToLower());
            return response;
        }

        public async Task<Debtor> GetDebtorByID(string id)
        {
            var response = await _context.Debtors.Include(i => i.Addresses).Include(i => i.Invoices).FirstOrDefaultAsync(q => q.Id == id);
            return response;
        }

        public async Task<Debtor> Insert(Debtor debtor)
        {
            var response = _context.Debtors.Add(debtor);
            await _context.SaveChangesAsync();

            return response.Entity;
        }

        public async Task<Debtor> Update(Debtor debtor)
        {
            var debtorBeforeUpdate = await _context.Debtors.FindAsync(debtor.Id);
            if (debtorBeforeUpdate == null)
            {
                return null;
            }

            _context.Entry(debtorBeforeUpdate).CurrentValues.SetValues(debtor);
            var result = await _context.SaveChangesAsync();

            return result == 1 ? debtor : null;
        }

        public async Task<bool> Delete(string id)
        {
            Debtor debtor = await _context.Debtors.FirstOrDefaultAsync(q => q.Id == id);
            _context.Debtors.Remove(debtor);

            var result = await _context.SaveChangesAsync();
            return result == 1 ? true : false;
        }
    }
}
