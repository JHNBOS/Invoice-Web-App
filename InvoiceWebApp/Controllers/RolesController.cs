using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using InvoiceWebApp.Components.Services;
using InvoiceWebApp.Components.Services.Interfaces;
using InvoiceWebApp.Controllers.ViewModels;

using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace ShareListAPI.Controllers
{
    [EnableCors("AllowAll")]
    [Produces("application/json")]
    [Route("api/roles")]
    public class RolesController : Controller
    {
        private IRoleRepository _repo;

        public RolesController()
        {
            this._repo = new RoleRepository();
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
