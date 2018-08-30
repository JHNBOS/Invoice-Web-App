namespace InvoiceWebApp.Components.Entities
{
    public partial class DebtorHasAddress
    {
        public string DebtorId { get; set; }
        public string PostalCode { get; set; }
        public int Number { get; set; }

        public virtual Debtor Debtor { get; set; }
        public virtual Address Address { get; set; }
    }
}
