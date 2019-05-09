using InvoiceWebApp.Components.DataContext;
using InvoiceWebApp.Components.Entities;
using InvoiceWebApp.Components.Services.Interfaces;

using Microsoft.EntityFrameworkCore;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace InvoiceWebApp.Components.Services {
	public class RoleRepository : IRoleRepository
    {
		private readonly InvoiceContext _context;

		public RoleRepository(InvoiceContext context) {
			this._context = context;
		}

		public async Task<ICollection<Role>> GetRoles()
        {
            var response = await _context.Roles.ToListAsync();
            return response;
        }
    }
}
