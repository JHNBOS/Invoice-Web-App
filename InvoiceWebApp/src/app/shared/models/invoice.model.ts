import InvoiceItem from './invoice_item.model';
import Debtor from './debtor.model';

export default class Invoice {
    invoice_number: string = null;
    customer_id: string = null;
    created_on: Date = null;
    expired_on: Date = null;
    total: number = null;
    comment: string = null;
    items: InvoiceItem[] = [];
    discount: number = 0;
    is_paid: boolean = false;
    debtor: Debtor = null;

    public isValid(): boolean {
        if (this.customer_id != null && this.expired_on != null && this.created_on != null && this.total != null) {
            return true;
        }
        return false;
    }
}
