export default class InvoiceItem {
    item_number: number = null;
    invoice_number: string = null;
    name: string = null;
    description: string = null;
    tax: number = 0;
    price: number = 0;
    quantity: number = 1;

    total: number = 0;

    public isValid(): boolean {
        if (this.item_number != null && this.invoice_number != null && this.name != null && this.tax != null && this.price != null && this.quantity != null) {
            return true;
        }
        return false;
    }
}
