import InvoiceItem from './invoice_item.model';

export default class Invoice {
    invoice_number: number;
    customer_id: string;
    created_on: Date;
    expired_on: Date;
    total: number;
    discount: number;
    comment: string;
    items: InvoiceItem[] = [];
}
