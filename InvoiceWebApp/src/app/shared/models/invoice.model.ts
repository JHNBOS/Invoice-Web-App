import InvoiceItem from './invoice_item.model';

export default class Invoice {
    invoice_number: string = null;
    customer_id: string = null;
    created_on: Date = null;
    expired_on: Date = null;
    total: number = null;
    comment: string = null;
    items: InvoiceItem[] = [];
    discount: number = null;

    public isValid(): boolean {
        if (this.customer_id != null && this.expired_on != null && this.created_on != null && this.total != null) {
            return true;
        }
        return false;
    }
}
