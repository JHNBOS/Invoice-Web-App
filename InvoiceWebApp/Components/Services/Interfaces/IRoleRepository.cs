using System.Collections.Generic;
using System.Threading.Tasks;

using InvoiceWebApp.Components.Entities;

namespace InvoiceWebApp.Components.Services.Interfaces
{
    public interface IRoleRepository
    {
        Task<ICollection<Role>> GetRoles();
    }
}
