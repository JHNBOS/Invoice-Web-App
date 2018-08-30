using System.Net;

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
                .UseStartup<Startup>()
                .UseIISIntegration()
                .UseKestrel(options =>
                {
                    options.Listen(IPAddress.Any, 90);
                })
                .UseUrls("http://*:90/")
                .Build();
    }
}
