import InvoiceRow from './invoice-row.model';

export default class Invoice {
    invoice_number: number;
    debtor_ssn: number;
    created_on: Date;
    expired_on: Date;
    total: number;
    discount: number;
    comment: string;
}
