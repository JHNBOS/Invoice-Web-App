import { Component, OnInit } from '@angular/core';
import Invoice from '../shared/models/invoice.model';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../shared/services/invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  invoices: Invoice[] = [];
  toastOptions: ToastOptions = {
    title: '',
    msg: '',
    showClose: true,
    timeout: 5000,
    theme: 'default'
  };

  constructor(private titleService: Title, private route: ActivatedRoute,
    private invoiceService: InvoiceService, private router: Router, private toastyService: ToastyService,
    private toastyConfig: ToastyConfig) {

    // Set toast theme
    this.toastyConfig.theme = 'default';
  }

  ngOnInit() {
    this.titleService.setTitle('Invoices - inVoice');
    this.getAllInvoices();
  }

  getAllInvoices() {
    this.invoiceService.getAllInvoices().subscribe(
      res => {
        if (res.toString() !== 'No invoices available!') {
          this.invoices = res;
        }
      },
      (err) => {
        this.toastOptions.title = 'Oops, an error occured';
        this.toastOptions.msg = 'Unable to retrieve invoices. Please try again!';
        this.toastyService.error(this.toastOptions);
      }
    );
  }

  deleteInvoice(id: number) {
    if (confirm('Are you sure you want to delete this invoice?')) {
      this.invoiceService.deleteInvoiceByNumber(id).subscribe(
        res => this.ngOnInit(),
        (err) => {
          this.toastOptions.title = 'Oops, an error occured';
          this.toastOptions.msg = 'Unable to remove invoice. Please try again!';
          this.toastyService.error(this.toastOptions);
        });
    }
  }

}
