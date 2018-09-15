import Debtor from './debtor.model';
import InvoiceItem from './invoice_item.model';

export default class Invoice {
    invoice_number: string = null;
    customer_id: string = null;
    created_on: Date = null;
    expired_on: Date = null;
    total: number = null;
    comment: string = null;
    items: InvoiceItem[] = [];
    discount = 0;
    is_paid = false;
    concept = false;
    debtor: Debtor = null;
}
