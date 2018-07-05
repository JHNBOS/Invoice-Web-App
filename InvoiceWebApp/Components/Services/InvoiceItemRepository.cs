using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using InvoiceAPI.Components.DataContext;
using InvoiceAPI.Components.Entities;
using InvoiceAPI.Components.Services.Interfaces;

using Microsoft.EntityFrameworkCore;

namespace InvoiceAPI.Components.Services
{
    public class InvoiceItemRepository : IInvoiceItemRepository
    {
        private InvoiceContext _context = new InvoiceContext();

        public async Task<ICollection<InvoiceItem>> GetByInvoiceNumber(int number)
        {
            var response = await _context.InvoiceItems.Where(q => q.InvoiceNumber == number).ToListAsync();
            return response;
        }

        public async Task<InvoiceItem> GetById(int id)
        {
            var response = await _context.InvoiceItems.FirstOrDefaultAsync(q => q.ItemNumber == id);
            return response;
        }

        public async Task<InvoiceItem> GetByName(string name)
        {
            var response = await _context.InvoiceItems.FirstOrDefaultAsync(q => q.Name.ToLower() == name.ToLower());
            return response;
        }

        public async Task<InvoiceItem> Insert(InvoiceItem item)
        {
            var response = await _context.InvoiceItems.AddAsync(item);
            await _context.SaveChangesAsync();

            return response.Entity;
        }

        public async Task<InvoiceItem> Update(InvoiceItem item)
        {
            var itemBeforeUpdate = await _context.InvoiceItems.FindAsync(item.ItemNumber);
            if (itemBeforeUpdate == null)
            {
                return null;
            }

            _context.Entry(itemBeforeUpdate).CurrentValues.SetValues(item);
            var result = await _context.SaveChangesAsync();

            return result == 1 ? item : null;
        }

        public async Task<bool> Delete(int id)
        {
            InvoiceItem item = await _context.InvoiceItems.FirstOrDefaultAsync(q => q.ItemNumber == id);
            _context.InvoiceItems.Remove(item);

            var result = await _context.SaveChangesAsync();
            return result == 1 ? true : false;
        }
    }
}
