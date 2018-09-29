import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Chart, ChartConfiguration } from 'chart.js';
import 'chartjs-plugin-labels';

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
                    text: 'Total paid & unpaid invoices',
                    position: 'bottom'
                },
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        display: false
                    }],
                    yAxes: [{
                        display: false
                    }],
                },
                plugins: {
                    labels: {
                        render: 'label',
                        fontColor: '#fff',
                        precision: 2,
                        arc: false
                    }
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
                        data: [this.invoice_cash[0], this.invoice_cash[1]],
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
                    text: 'Total amount cashed',
                    position: 'bottom'
                },
                legend: {
                    display: false,
                },
                scales: {
                    xAxes: [{
                        display: true,
                        maxBarThickness: 100,
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            callback: function (value, index, values) {
                                if (parseInt(value, 0) >= 1000) {
                                    let label = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

                                    const lastDot = label.lastIndexOf('.');
                                    const lastComma = ',';
                                    label = label.substring(0, lastDot) + lastComma + label.substring(lastDot + 1);

                                    return '€ ' + label;
                                } else {
                                    return '€ ' + value;
                                }
                            }
                        }
                    }]
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltip, data) {
                            if (parseInt(tooltip.yLabel.toString(), 0) >= 1000) {
                                let label = tooltip.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

                                const lastDot = label.lastIndexOf('.');
                                const lastComma = ',';
                                label = label.substring(0, lastDot) + lastComma + label.substring(lastDot + 1);

                                return ' € ' + label;
                            } else {
                                return ' € ' + tooltip.yLabel;
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

    number_format(number, decimals, dec_point, thousands_sep): any {
        number = (number + '').replace(',', '').replace(' ', '');
        const n = !isFinite(+number) ? 0 : +number;
        const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
        const sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep;
        const dec = (typeof dec_point === 'undefined') ? '.' : dec_point;
        let s = [];
        // tslint:disable-next-line:no-shadowed-variable
        const toFixedFix = function (n, prec) {
            const k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };

        // Fix for IE parseFloat(0.55).toFixed(0) = 0;
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
        if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
        }
        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dec);
    }
}
