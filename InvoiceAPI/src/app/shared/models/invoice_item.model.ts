export default class InvoiceItem {
    item_number: number = null;
    invoice_number: number = null;
    name: string = null;
    description: string = null;
    tax: number = null;
    price: number = null;
    quantity: number = null;

    public isValid(): boolean {
        if (this.item_number != null && this.invoice_number != null && this.name != null && this.tax != null && this.price != null && this.quantity != null) {
            return true;
        }
        return false;
    }
}
