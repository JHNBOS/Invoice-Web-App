using System.Collections.Generic;
using System.Threading.Tasks;

using InvoiceAPI.Components.Entities;

namespace InvoiceAPI.Components.Services.Interfaces
{
    public interface IAddressRepository
    {
        Task<ICollection<Address>> GetAddresses();
        Task<ICollection<Address>> GetAddressesByCity(string city);
        Task<ICollection<Address>> GetAddressesByPostal(string postal);
        Task<Address> GetAddressByPostalAndNumber(int number, string postal);
        Task<Address> Insert(Address address);
        Task<bool> Delete(int number, string suffix, string postal);
    }
}
