import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';
import Invoice from '../../shared/models/invoice.model';
import { InvoiceService } from '../../shared/services/invoice.service';
import { DebtorService } from '../../shared/services/debtor.service';
import Debtor from '../../shared/models/debtor.model';

@Component({
    selector: 'app-invoice',
    templateUrl: './invoice.component.html',
    styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
    invoices: Invoice[] = [];

    constructor(private titleService: Title, private route: ActivatedRoute, private invoiceService: InvoiceService, private debtorService: DebtorService, private router: Router) { }

    ngOnInit() {
        this.titleService.setTitle('Invoices - Invoice Panel');
        this.getAllInvoices();
    }

    getAllInvoices() {
        this.invoiceService.getAll().subscribe(
            (response) => this.invoices = response,
            (error) => { throw error; }
        );
    }

    deleteInvoice(id: string) {
        if (confirm('Are you sure you want to delete this invoice?')) {
            this.invoiceService.delete(id).subscribe(
                (response) => this.ngOnInit(),
                (error) => { throw error; }
            );
        }
    }

    getLocaleString(total: number): string {
        return total.toLocaleString('nl-NL', { style: 'currency', currency: 'EUR' });
    }
}
