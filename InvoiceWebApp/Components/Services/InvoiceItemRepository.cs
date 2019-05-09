using InvoiceWebApp.Components.DataContext;
using InvoiceWebApp.Components.Entities;
using InvoiceWebApp.Components.Services.Interfaces;

using Microsoft.EntityFrameworkCore;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InvoiceWebApp.Components.Services {
	public class InvoiceItemRepository : IInvoiceItemRepository
    {
		private readonly InvoiceContext _context;

		public InvoiceItemRepository(InvoiceContext context) {
			this._context = context;
		}

		public async Task<ICollection<InvoiceItem>> GetByInvoiceNumber(string number)
        {
            var response = await _context.InvoiceItems.Include(i => i.Invoice).Where(q => q.InvoiceNumber == number).ToListAsync();
            return response;
        }

        public async Task<InvoiceItem> GetById(int id)
        {
            var response = await _context.InvoiceItems.Include(i => i.Invoice).FirstOrDefaultAsync(q => q.ItemNumber == id);
            return response;
        }

        public async Task<InvoiceItem> GetByName(string name)
        {
            var response = await _context.InvoiceItems.Include(i => i.Invoice).FirstOrDefaultAsync(q => q.Name.ToLower() == name.ToLower());
            return response;
        }

        public async Task<InvoiceItem> Insert(InvoiceItem item)
        {
            var response = _context.InvoiceItems.Add(item);
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
            await _context.SaveChangesAsync();

            return item;
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
