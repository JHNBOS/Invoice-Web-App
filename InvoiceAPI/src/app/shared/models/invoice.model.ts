import InvoiceItem from './invoice_item.model';

export default class Invoice {
    invoice_number: number = null;
    customer_id: string = null;
    created_on: Date = null;
    expired_on: Date = null;
    total: number = null;
    discount: number = null;
    comment: string = null;
    items: InvoiceItem[] = [];

    public isValid(): boolean {
        if (this.customer_id != null && this.expired_on != null && this.created_on != null && this.total != null && this.discount != null) {
            return true;
        }
        return false;
    }
}
