namespace InvoiceWebApp.Components.Entities
{
    public partial class User
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CompanyName { get; set; }
        public string Picture { get; set; }
        public int Role { get; set; }
    }
}
