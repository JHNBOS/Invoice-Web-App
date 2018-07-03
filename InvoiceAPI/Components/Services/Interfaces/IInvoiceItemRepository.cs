using System.Collections.Generic;
using System.Threading.Tasks;

using InvoiceAPI.Components.Entities;

namespace InvoiceAPI.Components.Services.Interfaces
{
    public interface IInvoiceItemRepository
    {
        Task<ICollection<InvoiceItem>> GetByInvoiceNumber(int number);
        Task<InvoiceItem> GetById(int id);
        Task<InvoiceItem> GetByName(string name);
        Task<InvoiceItem> Insert(InvoiceItem item);
        Task<InvoiceItem> Update(InvoiceItem item);
        Task<bool> Delete(int id);
    }
}
