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
    invoice_cash: number[] = [];

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
                this.invoice_cash[0] = response.reduce((a, b) => a + b.total, 0);
                this.invoice_cash[1] = response.filter(f => f.is_paid === true).reduce((a, b) => a + b.total, 0);

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
                title: {
                    display: true,
                    text: 'Total Paid/Unpaid Invoices',
                    position: 'bottom'
                },
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
            type: 'bar',
            data: {
                labels: ['Amount to be cashed', 'Currently cashed amount'],
                datasets: [
                    {
                        label: 'Amount to be cashed',
                        data: [this.invoice_cash[0]],
                        backgroundColor: ['#f4d41f'],
                        borderColor: ['#e8c620'],
                        fill: true
                    },
                    {
                        label: 'Currently cashed amount',
                        data: [this.invoice_cash[1]],
                        backgroundColor: ['#12a4e8'],
                        borderColor: ['#1095d3'],
                        fill: true
                    },
                ]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Total Amount Cashed',
                    position: 'bottom'
                },
                legend: {
                    display: true
                },
                scales: {
                    xAxes: [{
                        display: false,
                        maxBarThickness: 100,
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            callback: function (value, index, values) {
                                if (parseInt(value, 2) >= 1000) {
                                    return this.getLocaleString(value);
                                } else {
                                    return '€' + value;
                                }
                            }
                        }
                    }]
                },
                tooltips: {
                    callbacks: {
                        label: function (t, d) {
                            if (t.datasetIndex === 0) {
                                const xLabel = d.datasets[t.datasetIndex].label;
                                // tslint:disable-next-line:max-line-length
                                const yLabel = parseInt(t.yLabel, 2) >= 1000 ? this.getLocaleString(t.yLabel) : '€' + t.yLabel;
                                return xLabel + ': ' + yLabel;
                            } else if (t.datasetIndex === 1) {
                                const xLabel = d.datasets[t.datasetIndex].label;
                                // tslint:disable-next-line:max-line-length
                                const yLabel = parseInt(t.yLabel, 2) >= 1000 ? this.getLocaleString(t.yLabel) : '€' + t.yLabel;
                                return xLabel + ': ' + yLabel;
                            }
                        }
                    }
                },
            },
        });
    }

    getLocaleString(total: number): string {
        return total.toLocaleString('nl-NL', { style: 'currency', currency: 'EUR' });
    }
}
