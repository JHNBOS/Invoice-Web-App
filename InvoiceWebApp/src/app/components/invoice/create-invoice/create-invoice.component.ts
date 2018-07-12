import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import Debtor from '../../../shared/models/debtor.model';
import Invoice from '../../../shared/models/invoice.model';
import InvoiceItem from '../../../shared/models/invoice_item.model';
import { InvoiceService } from '../../../shared/services/invoice.service';
import { InvoiceItemService } from '../../../shared/services/invoice_item.service';

@Component({
    selector: 'app-create-invoice',
    templateUrl: './create-invoice.component.html',
    styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent implements OnInit {
    invoice: Invoice = new Invoice;
    debtor: Debtor;

    minDate: string = new Date().toJSON().split('T')[0];
    begin: string = this.minDate;
    expiration: string;

    constructor(private titleService: Title, private route: ActivatedRoute, private invoiceService: InvoiceService, private invoiceItemService: InvoiceItemService,
        private router: Router) { }

    ngOnInit() {
        this.titleService.setTitle('Create Invoice - Invoice Panel');

        this.setExpired();
        this.setInitialRow();
    }

    setInitialRow() {
        const row = new InvoiceItem();
        row.invoice_number = this.invoice.invoice_number;

        this.invoice.items.push(row);
    }

    setExpired() {
        let date = moment(this.begin).toDate();
        let expiration = new Date(date.setDate(date.getDate() + 30));

        this.expiration = expiration.toJSON().split('T')[0];
    }

    getDebtorChoice(event: any) {
        this.debtor = event;
    }

    submitForm() {
        this.invoice.created_on = moment(this.begin).toDate();
        this.invoice.expired_on = moment(this.expiration).toDate();
        this.invoice.customer_id = this.debtor.id;
        this.invoice.invoice_number = new Date().getFullYear().toString() + (this.getInvoiceCount() + 1) + '';

        for (var i = 0; i < this.invoice.items.length; i++) {
            let item = this.invoice.items[i];
            this.invoice.total += item.total;
        }

        this.saveInvoice();
    }

    saveInvoice() {
        this.invoiceService.create(this.invoice).subscribe(
            (response) => this.saveInvoiceItems(),
            (error) => { throw (error); }
        );
    }

    saveInvoiceItems() {
        for (var i = 0; i < this.invoice.items.length; i++) {
            let item = this.invoice.items[i];
            item.item_number = 0;
            item.invoice_number = this.invoice.invoice_number;

            this.invoiceItemService.create(item).subscribe(
                (response) => { },
                (error) => { throw (error); }
            );
        }

        this.router.navigate(['/invoices']);
    }

    addRow() {
        const row = new InvoiceItem();
        row.invoice_number = this.invoice.invoice_number;

        this.invoice.items.push(row);
    }

    deleteRow(row: InvoiceItem) {
        this.invoice.items.splice(this.invoice.items.indexOf(row), 1);
    }

    calculatePrice(item: InvoiceItem) {
        item.total = (item.price * item.quantity);
    }

    getInvoiceCount(): number {
        this.invoiceService.getByDebtorId(this.debtor.id).subscribe(
            (response) => { return response.length },
            (error) => { throw error; }
        );

        return 0;
    }
}
