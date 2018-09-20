import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Chart, ChartConfiguration } from 'chart.js';

import Settings from '../../shared/models/settings.model';
import User from '../../shared/models/user.model';
import { InvoiceService } from '../../shared/services/invoice.service';
import { UserService } from '../../shared/services/user.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
    settings: Settings = JSON.parse(sessionStorage.getItem('settings'));
    currentUser: User = JSON.parse(sessionStorage.getItem('signedInUser'));
    invoice_count: number[] = [];

    chartOne: any = null;
    chartTwo: any = null;

    constructor(private titleService: Title, private userService: UserService, private invoiceService: InvoiceService) { }

    ngOnInit() {
        this.titleService.setTitle('Home - ' + this.settings.company_name);
        this.getUnpaidInvoiceCount();
    }

    ngAfterViewInit() {
    }

    getUnpaidInvoiceCount() {
        this.invoiceService.getAll().subscribe(
            (response) => {
                this.invoice_count[0] = response.filter(f => f.is_paid === false).length;
                this.invoice_count[1] = response.filter(f => f.is_paid === true).length;

                setTimeout(() => { this.createChartOne(); this.createChartTwo(); }, 250);
            },
            (error) => { throw error; }
        );
    }

    createChartOne() {
        const canvas = <HTMLCanvasElement>document.getElementById('chart-one');
        const ctx = canvas.getContext('2d');

        this.chartOne = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Unpaid', 'Paid'],
                datasets: [
                    {
                        data: [this.invoice_count[0], this.invoice_count[1]],
                        backgroundColor: ['#f4d41f', '#12a4e8'],
                        borderColor: ['#e8c620', '#1095d3'],
                        fill: true
                    },
                ]
            },
            options: {
                responsive: true,
                legend: {
                    display: true
                },
                scales: {
                    xAxes: [{
                        display: false
                    }],
                    yAxes: [{
                        display: false
                    }],
                }
            },
        });
    }

    createChartTwo() {
        const canvas = <HTMLCanvasElement>document.getElementById('chart-two');
        const ctx = canvas.getContext('2d');

        this.chartTwo = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Test', 'Test', 'Test', 'Test', 'Test', 'Test', 'Test'],
                datasets: [
                    {
                        data: [0, 1, 2, 3, 4, 5, 6],
                    },
                ]
            },
            options: {
                responsive: true,
                legend: {
                    display: true
                },
                scales: {
                    xAxes: [{
                        display: true
                    }],
                    yAxes: [{
                        display: true
                    }],
                }
            },
        });
    }
}
