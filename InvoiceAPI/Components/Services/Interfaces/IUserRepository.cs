using System.Collections.Generic;
using System.Threading.Tasks;

using InvoiceAPI.Components.Entities;

namespace InvoiceAPI.Components.Services.Interfaces
{
    public interface IUserRepository
    {
        Task<ICollection<User>> GetUsers();
        Task<User> GetUserByEmail(string email);
        Task<User> Insert(User user);
        Task<User> Update(User user);
        Task<bool> Delete(string email);
        Task<User> Authenticate(string email, string password);
    }
}
