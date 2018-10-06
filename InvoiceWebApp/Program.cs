using System.IO;
using System.Net;
using InvoiceWebApp.Components.DataContext;
using InvoiceWebApp.Components.Services;
using InvoiceWebApp.Components.Services.Interfaces;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace InvoiceWebApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseKestrel(options =>
                {
                    options.Listen(IPAddress.Any, 90);
                })
                .UseUrls("http://*:90/")
                .UseStartup<Startup>()
                .Build();
    }
}
