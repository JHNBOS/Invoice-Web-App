using System.Net;

using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace InvoiceAPI
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
                    options.Listen(IPAddress.Any, 89);
                })
                .UseUrls("http://*:89/")
                .Build();
    }
}
