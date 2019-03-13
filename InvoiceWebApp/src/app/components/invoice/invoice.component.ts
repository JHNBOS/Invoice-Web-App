import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
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
    href: string;

    query = '';
    originalData: Invoice[];
    pagedResult: PaginationResult<Invoice>;
    isDesc = false;
    column: string;

    selectedRows: string[] = [];

    constructor(private titleService: Title, private route: ActivatedRoute, private invoiceService: InvoiceService,
        private debtorService: DebtorService, private router: Router) { }

    ngOnInit() {
        this.titleService.setTitle('Invoices - ' + this.settings.company_name);

        this.href = window.location.origin;

        if (this.currentUser.role_id === 2) {
            this.getDebtor();
        } else {
            this.getPage(1);
        }
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

    search() {
        this.pagedResult.data = this.originalData;
        let results: Invoice[] = [];

        if (this.pagedResult) {
            this.pagedResult.data.forEach(f => {
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
        }

        this.pagedResult.data = results;
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

    selectAll(event: any) {
        if (event.target.checked) {
            this.pagedResult.data.forEach(invoice => {
                invoice.selected = true;
                this.selectedRows.push(invoice.invoice_number);
            });
        } else {
            this.pagedResult.data.forEach(invoice => {
                invoice.selected = false;
            });

            this.selectedRows.splice(0, this.selectedRows.length);
        }
    }

    selected(invoice: Invoice, event: any) {
        if (event.target.checked) {
            if (this.selectedRows.length === this.pagedResult.data.length - 1 && this.selectedRows.indexOf(invoice.invoice_number) === -1) {
                let selectAllBox = <HTMLInputElement>document.querySelector('#selectAll');
                selectAllBox.checked = true;
            }

            invoice.selected = true;
            this.selectedRows.push(invoice.invoice_number);
        } else {
            if (this.selectedRows.length === 1 && this.selectedRows.indexOf(invoice.invoice_number) !== -1) {
                let selectAllBox = <HTMLInputElement>document.querySelector('#selectAll');
                selectAllBox.checked = false;
            }

            invoice.selected = false;
            this.selectedRows.splice(this.selectedRows.indexOf(invoice.invoice_number), 1);
        }
    }

    deleteSelected(id?: string) {
        if (id) {
            this.invoiceService.delete(id).subscribe(
                () => this.ngOnInit(),
                (error) => { throw error; }
            );

            if (confirm('Are you sure you want to delete this invoice?')) {
                this.invoiceService.delete(id).subscribe(
                    (response) => this.ngOnInit(),
                    (error) => { throw error; }
                );
            }
        } else {
            if (this.selectedRows.length == 0) {
                confirm('Please select one or more invoices.');
            } else {
                let confirmText = '';
                if (this.selectedRows.length === 1) {
                    confirmText = 'Are you sure you want to delete this invoice?';
                } else if (this.selectedRows.length > 1) {
                    confirmText = 'Are you sure you want to delete these invoices?';
                }

                if (confirm(confirmText)) {
                    this.selectedRows.forEach(row => {
                        this.invoiceService.delete(row).subscribe(
                            () => this.ngOnInit(),
                            (error) => { throw error; }
                        );
                    });
                }
            }
        }
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
