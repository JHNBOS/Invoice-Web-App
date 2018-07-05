import { Component, OnInit } from '@angular/core';
import Invoice from '../../shared/models/invoice.model';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../../shared/services/invoice.service';
import { Observable } from 'rxjs/Observable';
import { DebtorDropdownComponent } from '../../debtor/debtor-dropdown/debtor-dropdown.component';
import Debtor from '../../shared/models/debtor.model';
import InvoiceRow from '../../shared/models/invoice-row.model';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent implements OnInit {
  invoice: Invoice = new Invoice;
  items: InvoiceRow[] = [];
  debtor: Debtor;

  constructor(private titleService: Title, private route: ActivatedRoute,
    private invoiceService: InvoiceService, private router: Router) { }

  ngOnInit() {
    this.titleService.setTitle('Create Invoive - inVoice');

    // Add one row, at least one row is required
    const row = new InvoiceRow();
    row.invoice_number = this.invoice.invoice_number;

    this.items.push(row);
  }

  submitForm() {
    this.saveInvoice();
  }

  saveInvoice() {
    this.invoiceService.createInvoice(this.invoice).subscribe(
      res => this.saveInvoiceItems(),
      (error) => {
        console.log(error);
        return Observable.throw(error);
      }
    );
  }

  saveInvoiceItems() {
    this.invoiceService.insertInvoiceItems(this.items).subscribe(
      res => this.router.navigate(['/invoices']),
      (error) => {
        console.log(error);
        return Observable.throw(error);
      }
    );
  }

  addRow() {
    const row = new InvoiceRow();
    row.invoice_number = this.invoice.invoice_number;

    this.items.push(row);
  }

  deleteRow(row: InvoiceRow) {
    this.items.splice(this.items.indexOf(row), 1);
  }

  getDebtorChoice(event: any) {
    this.debtor = event;
  }

}
