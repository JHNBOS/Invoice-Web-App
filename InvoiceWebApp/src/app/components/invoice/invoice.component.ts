import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import Debtor from '../../shared/models/debtor.model';
import Invoice from '../../shared/models/invoice.model';
import Settings from '../../shared/models/settings.model';
import User from '../../shared/models/user.model';
import { DebtorService } from '../../shared/services/debtor.service';
import { InvoiceService } from '../../shared/services/invoice.service';

@Component({
    selector: 'app-invoice',
    templateUrl: './invoice.component.html',
    styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
    settings: Settings = JSON.parse(sessionStorage.getItem('settings'));
    currentUser: User = JSON.parse(sessionStorage.getItem('signedInUser'));

    debtor: Debtor = null;
    invoices: Invoice[] = [];
    href: string;

    query = '';

    constructor(private titleService: Title, private route: ActivatedRoute, private invoiceService: InvoiceService,
        private debtorService: DebtorService, private router: Router) { }

    ngOnInit() {
        this.titleService.setTitle('Invoices - ' + this.settings.company_name);

        this.href = window.location.origin;

        if (this.currentUser.role_id === 2) {
            this.getDebtor();
        } else {
            this.getAllInvoices();
        }
    }

    getAllInvoices() {
        this.invoiceService.getAll().subscribe(
            (response) => this.invoices = response,
            (error) => { throw error; }
        );
    }

    getInvoicesByDebtor() {
        this.invoiceService.getByDebtorId(this.debtor.id).subscribe(
            (response) => this.invoices = response,
            (error) => { throw error; }
        );
    }

    getDebtor() {
        this.debtorService.getByEmail(this.currentUser.email).subscribe(
            (response) => {
                this.debtor = response;
                this.getInvoicesByDebtor();
            },
            (error) => { throw error; }
        );
    }

    deleteInvoice(invoice: string) {
        if (confirm('Are you sure you want to delete this invoice?')) {
            this.invoiceService.delete(invoice).subscribe(
                (response) => this.ngOnInit(),
                (error) => { throw error; }
            );
        }
    }

    search() {
        return this.invoices.filter(f => f.customer_id.includes(this.query)
            || f.invoice_number.includes(this.query)
            || f.debtor.id.includes(this.query) || f.debtor.first_name != null ? f.debtor.first_name.includes(this.query) : null
                || f.debtor.last_name != null ? f.debtor.last_name.includes(this.query) : null
                    || f.debtor.company_name != null ? f.debtor.company_name.includes(this.query) : null
                    || f.expired_on.toLocaleDateString().includes(this.query)
                    || f.created_on.toLocaleDateString().includes(this.query));
    }

    getLocaleString(total: number): string {
        return total.toLocaleString('nl-NL', { style: 'currency', currency: 'EUR' });
    }

    isExpirationExpired(invoice: Invoice): boolean {
        return moment(invoice.expired_on).isBefore(moment(new Date()));
    }

    differenceInDays(date: Date) {
        const difference = Math.abs(date.getTime() - new Date().getTime());
        const differenceInDays = Math.ceil(difference / (1000 * 3600 * 24));

        return differenceInDays;
    }
}
