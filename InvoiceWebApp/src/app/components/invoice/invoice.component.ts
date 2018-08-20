import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
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

    constructor(private titleService: Title, private route: ActivatedRoute, private invoiceService: InvoiceService, private debtorService: DebtorService, private router: Router) { }

    ngOnInit() {
        this.titleService.setTitle('Invoices - ' + this.settings.company_name);

        if (this.currentUser.role_id == 2) {
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

    getLocaleString(total: number): string {
        return total.toLocaleString('nl-NL', { style: 'currency', currency: 'EUR' });
    }
}
