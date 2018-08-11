using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using InvoiceWebApp.Components.Entities;

namespace InvoiceWebApp.Components.Services.Interfaces
{
    public interface IInvoiceRepository
    {
        Task<int> GetCount();
        Task<ICollection<Invoice>> GetInvoices();
        Task<ICollection<Invoice>> GetByCreationDate(DateTime date);
        Task<ICollection<Invoice>> GetNearlyExpired();
        Task<ICollection<Invoice>> GetByDebtorId(string id);
        Task<Invoice> GetByNumber(string number);
        Task<Invoice> Insert(Invoice invoice);
        Task<Invoice> Update(Invoice invoice);
        Task<bool> Delete(string id);
        Task<bool> DeleteByDebtorId(string id);
    }
}
