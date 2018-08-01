using System.Threading.Tasks;

using InvoiceWebApp.Components.DataContext;
using InvoiceWebApp.Components.Entities;
using InvoiceWebApp.Components.Services.Interfaces;

using Microsoft.EntityFrameworkCore;

namespace InvoiceWebApp.Components.Services
{
    public class SettingRepository : ISettingRepository
    {
        private InvoiceContext _context = new InvoiceContext();

        public async Task<Settings> GetSettings()
        {
            var response = await _context.Settings.FirstOrDefaultAsync();
            return response;
        }

        public async Task<Settings> Update(Settings settings)
        {
            var settingsBeforeUpdate = await _context.Settings.FirstOrDefaultAsync();
            if (settingsBeforeUpdate == null)
            {
                return null;
            }

            _context.Entry(settingsBeforeUpdate).CurrentValues.SetValues(settings);
            var result = await _context.SaveChangesAsync();

            return result == 1 ? settings : null;
        }
    }
}
