using InvoiceWebApp.Components.Services.Interfaces;
using InvoiceWebApp.Controllers.ViewModels;

using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InvoiceWebApp.Controllers {
	[EnableCors("AllowAll")]
    [Produces("application/json")]
    [Route("api/roles")]
    public class RolesController : Controller
    {
		private readonly IRoleRepository _repo;

		public RolesController(IRoleRepository repo)
        {
			this._repo = repo;
		}

		/// <summary>
		/// Gets a list with all roles.
		/// </summary>
		[HttpGet("getAll")]
        [ProducesResponseType(typeof(IEnumerable<RoleViewModel>), 200)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetAll()
        {
            //Get data
            var data = await _repo.GetRoles();
            if (data == null)
            {
                return StatusCode(500, "User roles could not be found.");
            }

            //Convert to viewmodel
            var result = data.Select(s => new RoleViewModel
            {
                Id = s.Id,
                Type = s.Type
            });

            return Ok(result);
        }
    }
}
