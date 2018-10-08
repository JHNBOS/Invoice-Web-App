import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Chart } from 'chart.js';
import 'chartjs-plugin-labels';
import Debtor from '../../shared/models/debtor.model';
import Settings from '../../shared/models/settings.model';
import User from '../../shared/models/user.model';
import { DebtorService } from '../../shared/services/debtor.service';
import { InvoiceService } from '../../shared/services/invoice.service';
import { UserService } from '../../shared/services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    settings: Settings = JSON.parse(sessionStorage.getItem('settings'));
    currentUser: User = JSON.parse(sessionStorage.getItem('signedInUser'));

    admin_invoice_count: number[] = [];
    admin_invoice_cash: number[] = [];

    debtor_invoice_count: number[] = [];
    debtor_invoice_cash: number[] = [];

    chartOne: any = null;
    chartTwo: any = null;

    constructor(private titleService: Title, private userService: UserService, private invoiceService: InvoiceService,
        private debtorService: DebtorService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.titleService.setTitle('Home - ' + this.settings.company_name);
        this.route.params.subscribe((params: Params) => {
            if (params != null && params['reload'] === '1') {
                location.reload(true);
                this.router.navigate(['/']);
            }
        });

        if (this.currentUser.role_id === 1) {
            this.getAdminChartData();
        } else if (this.currentUser.role_id === 2) {
            this.getDebtor();
        }
    }

    getAdminChartData() {
        this.invoiceService.getAll().subscribe(
            (response) => {
                this.admin_invoice_count[0] = response.filter(f => f.is_paid === false).length;
                this.admin_invoice_count[1] = response.filter(f => f.is_paid === true).length;
                this.admin_invoice_cash[0] = response.reduce((a, b) => a + b.total, 0);
                this.admin_invoice_cash[1] = response.filter(f => f.is_paid === true).reduce((a, b) => a + b.total, 0);

                setTimeout(() => { this.createAdminCharts(); }, 250);
            },
            (error) => { throw error; }
        );
    }

    getDebtor() {
        return this.debtorService.getByEmail(this.currentUser.email).subscribe(
            (response) => { this.getDebtorChartData(response); },
            (error) => { throw error; }
        );
    }

    getDebtorChartData(debtor: Debtor) {
        this.invoiceService.getByDebtorId(debtor.id).subscribe(
            (response) => {
                this.debtor_invoice_count[0] = response.filter(f => f.is_paid === false).length;
                this.debtor_invoice_count[1] = response.filter(f => f.is_paid === true).length;
                this.debtor_invoice_cash[0] = response.reduce((a, b) => a + b.total, 0);
                this.debtor_invoice_cash[1] = response.filter(f => f.is_paid === true).reduce((a, b) => a + b.total, 0);

                setTimeout(() => { this.createDebtorCharts(); }, 250);
            },
            (error) => { throw error; }
        );
    }

    createAdminCharts() {
        this.createAdminChartOne();
        this.createAdminChartTwo();
    }

    createDebtorCharts() {
        this.createDebtorChartOne();
        this.createDebtorChartTwo();
    }

    // Admin Charts
    createAdminChartOne() {
        const canvas = <HTMLCanvasElement>document.getElementById('chart-one');
        const ctx = canvas.getContext('2d');

        this.chartOne = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Unpaid', 'Paid'],
                datasets: [
                    {
                        data: [this.admin_invoice_count[0], this.admin_invoice_count[1]],
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

    createAdminChartTwo() {
        const canvas = <HTMLCanvasElement>document.getElementById('chart-two');
        const ctx = canvas.getContext('2d');

        this.chartTwo = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Amount to be cashed', 'Currently cashed amount'],
                datasets: [
                    {
                        data: [this.admin_invoice_cash[0], this.admin_invoice_cash[1]],
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
                                    const lastComma = '.';
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
                                const lastComma = '.';
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

    // Debtor Charts
    createDebtorChartOne() {
        const canvas = <HTMLCanvasElement>document.getElementById('chart-one');
        const ctx = canvas.getContext('2d');

        this.chartOne = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['To be paid', 'Already paid'],
                datasets: [
                    {
                        data: [10, 20],
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
                    text: 'Total amount of money paid',
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
                tooltips: {
                    callbacks: {
                        label: function (tooltip, data) {
                            if (parseInt(data.datasets[0].data[tooltip.index].toString(), 0) >= 1000) {
                                let label = data.datasets[0].data[tooltip.index].toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                                const lastDot = label.lastIndexOf('.');
                                const lastComma = '.';
                                label = label.substring(0, lastDot) + lastComma + label.substring(lastDot + 1);

                                return ' € ' + label;
                            } else {
                                return ' € ' + data.datasets[0].data[tooltip.index];
                            }
                        }
                    }
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

    createDebtorChartTwo() {
        const canvas = <HTMLCanvasElement>document.getElementById('chart-two');
        const ctx = canvas.getContext('2d');

        this.chartTwo = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: ['Paid Invoices', 'Unpaid Invoices'],
                datasets: [
                    {
                        data: [this.debtor_invoice_count[0], this.debtor_invoice_count[1]],
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
                    text: 'Total invoices',
                    position: 'bottom'
                },
                legend: {
                    display: false,
                },
                scales: {
                    xAxes: [{
                        display: true,
                        maxBarThickness: 100,
                        ticks: {
                            beginAtZero: true,
                            min: 0,
                            autoSkip: true,
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                        }
                    }]
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
