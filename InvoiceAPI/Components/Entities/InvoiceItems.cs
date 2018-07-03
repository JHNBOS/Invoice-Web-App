namespace InvoiceAPI.Components.Entities
{
    public partial class InvoiceItem
    {
        public int InvoiceNumber { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
        public int ItemNumber { get; set; }

        public virtual Invoice Invoice { get; set; }
    }
}
