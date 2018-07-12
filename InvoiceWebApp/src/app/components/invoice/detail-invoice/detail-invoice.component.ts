import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import Invoice from '../../../shared/models/invoice.model';
import { InvoiceService } from '../../../shared/services/invoice.service';
import { InvoiceItemService } from '../../../shared/services/invoice_item.service';

@Component({
    selector: 'app-detail-invoice',
    templateUrl: './detail-invoice.component.html',
    styleUrls: ['./detail-invoice.component.scss']
})
export class DetailInvoiceComponent implements OnInit {
    invoiceNumber: string;
    invoice: Invoice;

    constructor(private invoiceService: InvoiceService, private itemService: InvoiceItemService, private router: Router, private route: ActivatedRoute,
        private titleService: Title) { }

    ngOnInit() {
        this.titleService.setTitle('Invoice Details - Invoice Panel');
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
}
