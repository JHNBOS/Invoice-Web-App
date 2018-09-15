import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import Invoice from '../../../shared/models/invoice.model';
import Settings from '../../../shared/models/settings.model';
import User from '../../../shared/models/user.model';
import { InvoiceService } from '../../../shared/services/invoice.service';
import { InvoiceItemService } from '../../../shared/services/invoice_item.service';

@Component({
    selector: 'app-detail-invoice',
    templateUrl: './detail-invoice.component.html',
    styleUrls: ['./detail-invoice.component.scss']
})
export class DetailInvoiceComponent implements OnInit {
    currentUser: User = JSON.parse(sessionStorage.getItem('signedInUser'));
    settings: Settings = JSON.parse(sessionStorage.getItem('settings'));

    invoiceNumber: string;
    invoice: Invoice;
    show = false;

    constructor(private invoiceService: InvoiceService, private itemService: InvoiceItemService, private router: Router,
        private route: ActivatedRoute, private titleService: Title) { }

    ngOnInit() {
        this.titleService.setTitle('Invoice Details - ' + this.settings.company_name);
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

    payInvoice() {
        this.invoice.is_paid = true;
        this.invoiceService.update(this.invoice).subscribe(
            (response) => {
                this.show = true;
            },
            (error) => { throw error; }
        );
    }
}
