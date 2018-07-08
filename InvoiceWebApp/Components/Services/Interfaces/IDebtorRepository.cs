using System.Collections.Generic;
using System.Threading.Tasks;

using InvoiceWebApp.Components.Entities;

namespace InvoiceWebApp.Components.Services.Interfaces
{
    public interface IDebtorRepository
    {
        Task<ICollection<Debtor>> GetDebtors();
        Task<Debtor> GetDebtorByEmail(string email);
        Task<Debtor> GetDebtorByID(string id);
        Task<Debtor> Insert(Debtor debtor);
        Task<Debtor> Update(Debtor debtor);
        Task<bool> Delete(string id);
    }
}
