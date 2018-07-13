import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import Invoice from '../../../shared/models/invoice.model';
import { InvoiceService } from '../../../shared/services/invoice.service';
import { InvoiceItemService } from '../../../shared/services/invoice_item.service';
import User from '../../../shared/models/user.model';

@Component({
    selector: 'app-edit-invoice',
    templateUrl: './edit-invoice.component.html',
    styleUrls: ['./edit-invoice.component.scss']
})
export class EditInvoiceComponent implements OnInit {
    currentUser: User = JSON.parse(sessionStorage.getItem('signedInUser'));
    invoiceNumber: string;
    invoice: Invoice;

    total: number;

    constructor(private invoiceService: InvoiceService, private itemService: InvoiceItemService, private router: Router, private route: ActivatedRoute,
        private titleService: Title) { }

    ngOnInit() {
        this.titleService.setTitle('Edit Invoice - Invoice Panel');
        this.route.params.subscribe(
            (params) => {
                this.invoiceNumber = params['id'];
                this.getInvoice(this.invoiceNumber);
            }
        );
    }

    getInvoice(invoice: string) {
        this.invoiceService.getByNumber(invoice).subscribe(
            (response) => {
                this.invoice = response;
                this.total = this.invoice.total;
                this.getItems(this.invoiceNumber);
            },
            (error) => { throw error; }
        );
    }

    getItems(invoice: string) {
        this.itemService.getByInvoice(invoice).subscribe(
            (response) => this.invoice.items = response,
            (error) => { throw error; }
        );
    }

    calculateTotal() {
        this.total = this.invoice.total - this.invoice.discount;
    }

    submitForm() {
        this.invoice.total = this.total;
        this.updateInvoice();
    }

    updateInvoice() {
        this.invoiceService.update(this.invoice).subscribe(
            (response) => this.router.navigate(['/invoices']),
            (error) => { throw (error); }
        );
    }
}
