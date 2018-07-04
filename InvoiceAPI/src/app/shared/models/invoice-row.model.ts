export default class InvoiceRow {
    id: number = null;
    invoice_number: number = null;
    name: string = null;
    description: string = null;
    tax: number = null;
    price: number = null;
    discount: number = null;
    quantity: number = null;

    public isValid(): boolean {
        let valid = false;
        if (this.id != null && this.name != null && this.tax != null && this.price != null && this.discount != null) {
            valid = true;
        }
        return valid;
    }
}
