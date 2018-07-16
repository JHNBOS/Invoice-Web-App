using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

using InvoiceWebApp.Components.Entities;
using InvoiceWebApp.Components.Helpers;
using InvoiceWebApp.Components.Services;
using InvoiceWebApp.Components.Services.Interfaces;
using InvoiceWebApp.Controllers.ViewModels;

using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;

using Newtonsoft.Json;

namespace ShareListAPI.Controllers
{
    [EnableCors("AllowAll")]
    [Produces("application/json")]
    [Route("api/users")]
    public class UsersController : Controller
    {
        private IUserRepository _repo;
        private Email _email;

        public UsersController()
        {
            this._repo = new UserRepository();
            this._email = new Email();
        }

        /// <summary>
        /// Gets a list with all users.
        /// </summary>
        [HttpGet("getAll")]
        [ProducesResponseType(typeof(IEnumerable<UserViewModel>), 200)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetAll()
        {
            //Get data
            var data = await _repo.GetUsers();
            if (data == null)
            {
                return StatusCode(500, "Users could not be found.");
            }

            //Convert to viewmodel
            var result = data.Select(s => new UserViewModel
            {
                Email = s.Email,
                Password = s.Password,
                FirstName = s.FirstName,
                LastName = s.LastName,
                Role = s.Role,
                Picture = s.Picture
            });

            return Ok(result);
        }

        /// <summary>
        /// Gets a user by email.
        /// </summary>
        /// <param name="email">Email of user</param>
        [HttpGet("getByEmail")]
        [ProducesResponseType(typeof(UserViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetByEmail(string email)
        {
            if (String.IsNullOrEmpty(email))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            // Check if email address is valid
            if (!Regex.Match(email, @"^([\w\.\-]+)@((?!\.|\-)[\w\-]+)((\.(\w){2,3})+)$").Success)
            {
                return StatusCode(400, "This e-mail address is not valid.");
            }

            //Get user
            var data = await _repo.GetUserByEmail(email);
            if (data == null)
            {
                return StatusCode(500, "User could not be found.");
            }

            //Convert to view model
            var result = new UserViewModel();
            result.SetProperties(data);

            return Ok(result);
        }

        /// <summary>
        /// Checks if given email and password match a user.
        /// </summary>
        /// <param name="email">Email of user</param>
        /// <param name="password">Password of user</param>
        [HttpGet("authenticate")]
        [ProducesResponseType(typeof(UserViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Authenticate(string email, string password)
        {
            if (String.IsNullOrEmpty(email) || String.IsNullOrEmpty(password))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Check if email address is valid
            if (!Regex.Match(email, @"^([\w\.\-]+)@((?!\.|\-)[\w\-]+)((\.(\w){2,3})+)$").Success)
            {
                return StatusCode(400, "This e-mail address is not valid.");
            }

            //Get user
            var data = await _repo.Authenticate(email, password);
            if (data == null)
            {
                return StatusCode(500, "Invalid credentials.");
            }

            //Convert to view model
            var result = new UserViewModel();
            result.SetProperties(data);

            return Ok(result);
        }

        /// <summary>
        /// Creates a user.
        /// </summary>
        /// <param name="model">User object</param>
        [HttpPost("create")]
        [ProducesResponseType(typeof(UserViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Create([FromBody]UserViewModel model)
        {
            if (model == null)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            User user = new User
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                Password = model.Password,
                Role = model.Role,
                Picture = model.Picture
            };

            // Check if email address is valid
            if (!Regex.Match(user.Email, @"^([\w\.\-]+)@((?!\.|\-)[\w\-]+)((\.(\w){2,3})+)$").Success)
            {
                return StatusCode(400, "This e-mail address is not valid.");
            }

            //Add default picture when none is uploaded
            if (String.IsNullOrEmpty(user.Picture))
            {
                user.Picture = "data:image/jpg;base64,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";
            }

            //If password is empty, then add
            if (String.IsNullOrEmpty(user.Password))
            {
                user.Password = String.Format("{0}{1}{2}", user.LastName, user.FirstName[0], DateTime.Now.Minute);
            }

            //Insert user
            var data = await _repo.Insert(user);
            if (data == null)
            {
                return StatusCode(500, "A problem occured while saving the record. Please try again!");
            }

            var result = new UserViewModel();
            result.SetProperties(data);

            //Send email with credentials
            await _email.SendCredentials(user);

            return Ok(result);
        }

        /// <summary>
        /// Updates a user.
        /// </summary>
        /// <param name="model">User object</param>
        [HttpPut("update")]
        [ProducesResponseType(typeof(UserViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Update([FromBody]UserViewModel model)
        {
            if (model == null)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            User user = new User
            {
                Email = model.Email,
                Password = model.Password,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Role = model.Role,
                Picture = model.Picture
            };

            //Update user
            var data = await _repo.Update(user);
            if (data == null)
            {
                return StatusCode(500, "A problem occured while updating the record. Please try again!");
            }

            var result = new UserViewModel();
            result.SetProperties(data);

            return Ok(result);
        }

        /// <summary>
        /// Deletes a user.
        /// </summary>
        /// <param name="email">Id of user</param>
        [HttpDelete("delete")]
        [ProducesResponseType(typeof(void), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Delete(string email)
        {
            if (String.IsNullOrEmpty(email))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            // Check if email address is valid
            if (!Regex.Match(email, @"^([\w\.\-]+)@((?!\.|\-)[\w\-]+)((\.(\w){2,3})+)$").Success)
            {
                return StatusCode(400, "This e-mail address is not valid.");
            }

            //Remove user
            var succeeded = await _repo.Delete(email);
            if (!succeeded)
            {
                return StatusCode(500, "A problem occured while removing the record. Please try again!");
            }

            return Ok("Success");
        }

        /// <summary>
        /// Uploads an image and adds path to user
        /// </summary>
        [HttpPost("upload")]
        [ProducesResponseType(typeof(UserViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Upload()
        {
            StringValues json;
            Request.Form.TryGetValue("model", out json);

            var file = Request.Form.Files.FirstOrDefault();
            var model = JsonConvert.DeserializeObject<UserViewModel>(json);

            if (model == null || file == null)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            if (file.Length == 0)
            {
                return StatusCode(400, "File is empty.");
            }

            // Get user
            var userToUpdate = await _repo.GetUserByEmail(model.Email);

            // Add image to user
            var extension = file.FileName.Split(".")[1];
            string imageBinary;

            using (var ms = new MemoryStream())
            {
                file.CopyTo(ms);
                var fileBytes = ms.ToArray();
                imageBinary = Convert.ToBase64String(fileBytes);
            }

            // Update user
            userToUpdate.Picture = "data:image/" + extension + ";base64," + imageBinary;
            await _repo.Update(userToUpdate);

            return Ok(model);
        }

        /// <summary>
        /// Resets a users password and sends an email.
        /// </summary>
		/// <param name="email">Email of user</param>
        [HttpGet("resetPassword")]
        [ProducesResponseType(typeof(void), 200)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> ResetPassword(string email)
        {
            if (String.IsNullOrEmpty(email))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            // Check if email address is valid
            if (!Regex.Match(email, @"^([\w\.\-]+)@((?!\.|\-)[\w\-]+)((\.(\w){2,3})+)$").Success)
            {
                return StatusCode(400, "This e-mail address is not valid.");
            }

            // Reset password
            var data = await _repo.ResetPassword(email);
            if (String.IsNullOrEmpty(data))
            {
                return StatusCode(404, String.Format("Unable to reset your password."));
            }
            else if (!String.IsNullOrEmpty(data))
            {
                await _email.SendPasswordResetEmail(email, data);
            }

            return Ok();
        }
    }
}
