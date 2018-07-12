"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var invoice_service_1 = require("../../shared/services/invoice.service");
var debtor_service_1 = require("../../shared/services/debtor.service");
var InvoiceComponent = /** @class */ (function () {
    function InvoiceComponent(titleService, route, invoiceService, debtorService, router) {
        this.titleService = titleService;
        this.route = route;
        this.invoiceService = invoiceService;
        this.debtorService = debtorService;
        this.router = router;
        this.invoices = [];
    }
    InvoiceComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle('Invoices - Invoice Panel');
        this.getAllInvoices();
    };
    InvoiceComponent.prototype.getAllInvoices = function () {
        var _this = this;
        this.invoiceService.getAll().subscribe(function (response) { return _this.invoices = response; }, function (error) { throw error; });
    };
    InvoiceComponent.prototype.deleteInvoice = function (id) {
        var _this = this;
        if (confirm('Are you sure you want to delete this invoice?')) {
            this.invoiceService.delete(id).subscribe(function (response) { return _this.ngOnInit(); }, function (error) { throw error; });
        }
    };
    InvoiceComponent = __decorate([
        core_1.Component({
            selector: 'app-invoice',
            templateUrl: './invoice.component.html',
            styleUrls: ['./invoice.component.scss']
        }),
        __metadata("design:paramtypes", [platform_browser_1.Title, router_1.ActivatedRoute, invoice_service_1.InvoiceService, debtor_service_1.DebtorService, router_1.Router])
    ], InvoiceComponent);
    return InvoiceComponent;
}());
exports.InvoiceComponent = InvoiceComponent;
//# sourceMappingURL=invoice.component.js.map