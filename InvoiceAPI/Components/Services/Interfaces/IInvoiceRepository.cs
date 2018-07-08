using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using InvoiceAPI.Components.Entities;

namespace InvoiceAPI.Components.Services.Interfaces
{
    public interface IInvoiceRepository
    {
        Task<ICollection<Invoice>> GetInvoices();
        Task<ICollection<Invoice>> GetByCreationDate(DateTime date);
        Task<ICollection<Invoice>> GetNearlyExpired();
        Task<ICollection<Invoice>> GetByDebtorId(string id);
        Task<Invoice> GetByNumber(int number);
        Task<Invoice> Insert(Invoice invoice);
        Task<Invoice> Update(Invoice invoice);
        Task<bool> Delete(int id);
        Task<bool> DeleteByDebtorId(string id);
    }
}
