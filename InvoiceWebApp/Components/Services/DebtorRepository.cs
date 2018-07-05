using System.Collections.Generic;
using System.Threading.Tasks;

using InvoiceAPI.Components.DataContext;
using InvoiceAPI.Components.Entities;
using InvoiceAPI.Components.Services.Interfaces;

using Microsoft.EntityFrameworkCore;

namespace InvoiceAPI.Components.Services
{
    public class DebtorRepository : IDebtorRepository
    {
        private InvoiceContext _context = new InvoiceContext();

        public async Task<ICollection<Debtor>> GetDebtors()
        {
            var response = await _context.Debtors.ToListAsync();
            return response;
        }

        public async Task<Debtor> GetDebtorByEmail(string email)
        {
            var response = await _context.Debtors.FirstOrDefaultAsync(q => q.Email.ToLower() == email.ToLower());
            return response;
        }

        public async Task<Debtor> GetDebtorByID(string id)
        {
            var response = await _context.Debtors.FirstOrDefaultAsync(q => q.Id == id);
            return response;
        }

        public async Task<Debtor> Insert(Debtor debtor)
        {
            var response = await _context.Debtors.AddAsync(debtor);
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
