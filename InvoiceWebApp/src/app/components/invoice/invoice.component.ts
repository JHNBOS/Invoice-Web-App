import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import Debtor from '../../shared/models/debtor.model';
import Invoice from '../../shared/models/invoice.model';
import { PaginationResult } from '../../shared/models/pagination.result';
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
    pagedResult: PaginationResult<Invoice>;

    isDesc = false;
    column: string;

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

    async getAllInvoices() {
        await this.invoiceService.getAll().toPromise().then(
            (response) => {
                this.invoices = response;
                this.getPage(1);
            },
            (error) => { throw error; }
        );
    }

    async getDebtor() {
        await this.debtorService.getByEmail(this.currentUser.email).toPromise().then(
            (response) => {
                this.debtor = response;
                this.getPage(1);
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
        const results: Invoice[] = [];
        this.invoices.forEach(f => {
            if (f.debtor.company_name == null) {
                if (f.customer_id.toLowerCase().includes(this.query.toLowerCase())
                    || f.invoice_number.includes(this.query.toLowerCase())
                    || this.getLocaleString(f.total).toLowerCase().includes(this.query.toLowerCase())
                    || moment(f.expired_on).format('MMMM DD, YYYY').toLowerCase().includes(this.query.toLowerCase())
                    || moment(f.created_on).format('MMMM DD, YYYY').toLowerCase().includes(this.query.toLowerCase())
                    || f.debtor.email.toLowerCase().includes(this.query.toLowerCase())
                    || f.debtor.first_name.toLowerCase().includes(this.query.toLowerCase())
                    || f.debtor.last_name.toLowerCase().includes(this.query.toLowerCase())) {

                    results.push(f);
                }
            } else {
                if (f.customer_id.toLowerCase().includes(this.query.toLowerCase())
                    || f.invoice_number.includes(this.query.toLowerCase())
                    || this.getLocaleString(f.total).toLowerCase().includes(this.query.toLowerCase())
                    || moment(f.expired_on).format('MMMM DD, YYYY').toLowerCase().includes(this.query.toLowerCase())
                    || moment(f.created_on).format('MMMM DD, YYYY').toLowerCase().includes(this.query.toLowerCase())
                    || f.debtor.email.toLowerCase().includes(this.query.toLowerCase())
                    || f.debtor.company_name.toLowerCase().includes(this.query.toLowerCase())) {

                    results.push(f);
                }
            }
        });

        return results;
    }

    async getPage(page: number) {
        await this.invoiceService.index(page).toPromise().then(
            (response) => {
                if (this.currentUser.role_id === 2) {
                    response.data = response.data.filter(f => f.customer_id === this.debtor.id);
                }

                this.pagedResult = response;
            },
            (error: HttpErrorResponse) => { throw error; }
        );
    }

    sort(property: string) {
        this.isDesc = !this.isDesc;
        this.column = property;
        const direction = this.isDesc ? 1 : -1;

        this.pagedResult.data.sort(function (a, b) {
            if (a[property] < b[property]) {
                return -1 * direction;
            } else if (a[property] > b[property]) {
                return 1 * direction;
            } else {
                return 0;
            }
        });
    }

    getLocaleString(total: number): string {
        return total.toLocaleString('nl-NL', { style: 'currency', currency: 'EUR' });
    }

    isExpirationExpired(invoice: Invoice): boolean {
        return moment(invoice.expired_on).isBefore(moment(new Date()));
    }

    differenceInDays(date: Date) {
        date = new Date(date);
        const difference = Math.abs(date.getTime() - new Date().getTime());
        const differenceInDays = Math.ceil(difference / (1000 * 3600 * 24));

        return differenceInDays;
    }
}
