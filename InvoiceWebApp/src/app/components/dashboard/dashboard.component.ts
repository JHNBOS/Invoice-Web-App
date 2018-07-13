import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from '../../shared/services/user.service';
import User from '../../shared/models/user.model';
import { SharedService } from '../../shared/services/shared.service';
import { InvoiceService } from '../../shared/services/invoice.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    user: User = null;
    invoice_count: number = 0;

    constructor(private titleService: Title, private userService: UserService, private invoiceService: InvoiceService) { }

    ngOnInit() {
        this.titleService.setTitle('Home - Invoice Panel');
        this.getLoggedInUser();
        this.getUnpaidInvoiceCount();
    }

    getLoggedInUser() {
        this.user = JSON.parse(sessionStorage.getItem('loggedInUser'));
    }

    getUnpaidInvoiceCount() {
        this.invoiceService.getAll().subscribe(
            (response) => this.invoice_count = response.filter(f => f.is_paid == false).length,
            (error) => { throw error; }
        );
    }
}
