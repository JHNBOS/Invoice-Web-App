using System.Collections.Generic;
using System.Threading.Tasks;

using InvoiceWebApp.Components.Entities;

namespace InvoiceWebApp.Components.Services.Interfaces
{
    public interface IInvoiceItemRepository
    {
        Task<ICollection<InvoiceItem>> GetByInvoiceNumber(string number);
        Task<InvoiceItem> GetById(int id);
        Task<InvoiceItem> GetByName(string name);
        Task<InvoiceItem> Insert(InvoiceItem item);
        Task<InvoiceItem> Update(InvoiceItem item);
        Task<bool> Delete(int id);
    }
}
