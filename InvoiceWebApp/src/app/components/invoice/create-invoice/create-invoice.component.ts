import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

import Debtor from '../../../shared/models/debtor.model';
import Invoice from '../../../shared/models/invoice.model';
import InvoiceItem from '../../../shared/models/invoice_item.model';
import Settings from '../../../shared/models/settings.model';
import { InvoiceService } from '../../../shared/services/invoice.service';
import { InvoiceItemService } from '../../../shared/services/invoice_item.service';

@Component({
    selector: 'app-create-invoice',
    templateUrl: './create-invoice.component.html',
    styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent implements OnInit {
    settings: Settings = JSON.parse(sessionStorage.getItem('settings'));

    invoice: Invoice = new Invoice;
    debtor: Debtor;
    invoiceLength = 0;

    minDate: string = new Date().toJSON().split('T')[0];
    begin: string = this.minDate;
    expiration: string;

    showRepeat = false;
    recurring_invoice = 'Select an option';
    recurring_times = 1;

    constructor(private titleService: Title, private route: ActivatedRoute, private invoiceService: InvoiceService,
        private invoiceItemService: InvoiceItemService, private router: Router) { }

    ngOnInit() {
        this.titleService.setTitle('Create Invoice - ' + this.settings.company_name);

        this.setExpired();
        this.setInitialRow();
        this.getInvoiceCount();
    }

    setInitialRow() {
        const row = new InvoiceItem();
        row.invoice_number = this.invoice.invoice_number;

        this.invoice.items.push(row);
    }

    setExpired() {
        const date = moment(this.begin).toDate();
        const expiration = new Date(date.setDate(date.getDate() + 30));

        this.expiration = expiration.toJSON().split('T')[0];
    }

    getDebtorChoice(event: any) {
        this.debtor = event;
    }

    submitForm(concept: boolean) {
        // Set invoice properties
        this.invoice.created_on = moment(this.begin).toDate();
        this.invoice.expired_on = moment(this.expiration).toDate();
        this.invoice.customer_id = this.debtor.id;
        this.invoice.invoice_number = '-1';
        this.invoice.concept = concept;
        this.invoice.debtor = this.debtor;

        this.saveInvoice(this.invoice);

        if (this.showRepeat) {
            const previous = null;
            for (let index = 0; index < this.recurring_times; index++) {
                const element = previous == null ? this.invoice : previous;

                switch (this.recurring_invoice) {
                    case 'week':
                        element.created_on.setDate(element.created_on.getDate() + 7);
                        element.expired_on.setDate(element.expired_on.getDate() + 7);
                        break;
                    case 'month':
                        element.created_on.setMonth(element.created_on.getMonth() + 1);
                        element.expired_on.setMonth(element.expired_on.getMonth() + 1);
                        break;
                    case 'year':
                        element.created_on.setFullYear(element.created_on.getFullYear() + 1);
                        element.expired_on.setFullYear(element.expired_on.getFullYear() + 1);
                        break;
                }

                setTimeout(() => {
                    this.saveInvoice(element);
                }, 1500);
            }
        }

        this.router.navigate(['/invoices']);
    }

    saveInvoice(invoice: Invoice) {
        this.invoiceService.create(invoice).subscribe(
            (response) => {
                setTimeout(() => {
                    this.saveInvoiceItems(response.invoice_number);
                }, 250);

                return true;
            },
            (error) => { throw (error); }
        );
    }

    saveInvoiceItems(invoice: string) {
        for (let i = 0; i < this.invoice.items.length; i++) {
            const item = this.invoice.items[i];
            item.item_number = -1;
            item.invoice_number = invoice;

            this.invoiceItemService.create(item).subscribe(
                (response) => {
                    return true;
                },
                (error) => { throw (error); }
            );
        }
    }

    addRow() {
        const row = new InvoiceItem();
        this.invoice.items.push(row);
    }

    deleteRow(row: InvoiceItem) {
        this.invoice.items.splice(this.invoice.items.indexOf(row), 1);
    }

    calculatePrice(item: InvoiceItem) {
        item.total = (item.price * item.quantity);
        this.calculateTotal();
    }

    calculateTotal() {
        this.invoice.total = 0;

        for (let i = 0; i < this.invoice.items.length; i++) {
            const item = this.invoice.items[i];
            this.invoice.total += item.total;
        }

        this.invoice.total = this.invoice.total - this.invoice.discount;
    }

    getInvoiceCount() {
        this.invoiceService.getAll().subscribe(
            (response) => this.invoiceLength = response.length,
            (error) => { throw error; }
        );
    }
}
