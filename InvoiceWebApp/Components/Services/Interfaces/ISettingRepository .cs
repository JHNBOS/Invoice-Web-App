using System.Threading.Tasks;

using InvoiceWebApp.Components.Entities;

namespace InvoiceWebApp.Components.Services.Interfaces
{
    public interface ISettingRepository
    {
        Task<Settings> GetSettings();
        Task<Settings> Update(Settings settings);
    }
}
