namespace InvoiceWebApp.Components.Entities
{
    public partial class InvoiceItem
    {
        public string InvoiceNumber { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Tax { get; set; }
        public int Quantity { get; set; }
        public int ItemNumber { get; set; }

        public virtual Invoice Invoice { get; set; }
    }
}
