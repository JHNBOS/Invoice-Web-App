import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import Debtor from '../../shared/models/debtor.model';
import Invoice from '../../shared/models/invoice.model';
import InvoiceItem from '../../shared/models/invoice_item.model';
import { InvoiceService } from '../../shared/services/invoice.service';
import { InvoiceItemService } from '../../shared/services/invoice_item.service';

@Component({
    selector: 'app-create-invoice',
    templateUrl: './create-invoice.component.html',
    styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent implements OnInit {
    invoice: Invoice = new Invoice;
    items: InvoiceItem[] = [];
    debtor: Debtor;

    constructor(private titleService: Title, private route: ActivatedRoute, private invoiceService: InvoiceService, private invoiceItemService: InvoiceItemService,
        private router: Router) { }

    ngOnInit() {
        this.titleService.setTitle('Create Invoive - inVoice');

        // Add one row, at least one row is required
        const row = new InvoiceItem();
        row.invoice_number = this.invoice.invoice_number;

        this.items.push(row);
    }

    submitForm() {
        this.saveInvoice();
    }

    saveInvoice() {
        this.invoiceService.create(this.invoice).subscribe(
            res => this.saveInvoiceItems(),
            (error) => {
                console.log(error);
                return Observable.throw(error);
            }
        );
    }

    saveInvoiceItems() {
        for (var i = 0; i < this.items.length; i++) {
            let item = this.items[i];

            this.invoiceItemService.create(item).subscribe(
                res => this.router.navigate(['/invoices']),
                (error) => { throw (error); }
            );
        }
    }

    addRow() {
        const row = new InvoiceItem();
        row.invoice_number = this.invoice.invoice_number;

        this.items.push(row);
    }

    deleteRow(row: InvoiceItem) {
        this.items.splice(this.items.indexOf(row), 1);
    }

    getDebtorChoice(event: any) {
        this.debtor = event;
    }
}
