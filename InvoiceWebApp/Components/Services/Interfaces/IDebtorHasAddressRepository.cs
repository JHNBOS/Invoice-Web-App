using System.Collections.Generic;
using System.Threading.Tasks;

using InvoiceWebApp.Components.Entities;

namespace InvoiceWebApp.Components.Services.Interfaces
{
    public interface IDebtorHasAddressRepository
    {
        Task<ICollection<DebtorHasAddress>> GetAll();
        Task<DebtorHasAddress> GetAddressByDebtorId(string id);
        Task<ICollection<DebtorHasAddress>> GetAddressesByPostal(string postal);
        Task<DebtorHasAddress> GetAddressByPostalAndNumber(int number, string postal);
        Task<DebtorHasAddress> Insert(DebtorHasAddress debtorHasAddress);
        Task<bool> Delete(string id, int number, string postal);
    }
}
