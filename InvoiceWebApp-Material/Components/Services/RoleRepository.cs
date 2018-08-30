using System.Collections.Generic;
using System.Threading.Tasks;

using InvoiceWebApp.Components.DataContext;
using InvoiceWebApp.Components.Entities;
using InvoiceWebApp.Components.Services.Interfaces;

using Microsoft.EntityFrameworkCore;

namespace InvoiceWebApp.Components.Services
{
    public class RoleRepository : IRoleRepository
    {
        private InvoiceContext _context = new InvoiceContext();

        public async Task<ICollection<Role>> GetRoles()
        {
            var response = await _context.Roles.ToListAsync();
            return response;
        }
    }
}
