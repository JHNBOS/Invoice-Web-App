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
var invoice_model_1 = require("../../shared/models/invoice.model");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var invoice_service_1 = require("../../shared/services/invoice.service");
var Observable_1 = require("rxjs/Observable");
var invoice_row_model_1 = require("../../shared/models/invoice-row.model");
var CreateInvoiceComponent = /** @class */ (function () {
    function CreateInvoiceComponent(titleService, route, invoiceService, router) {
        this.titleService = titleService;
        this.route = route;
        this.invoiceService = invoiceService;
        this.router = router;
        this.invoice = new invoice_model_1.default;
        this.items = [];
    }
    CreateInvoiceComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle('Create Invoive - inVoice');
        // Add one row, at least one row is required
        var row = new invoice_row_model_1.default();
        row.invoice_number = this.invoice.invoice_number;
        this.items.push(row);
    };
    CreateInvoiceComponent.prototype.submitForm = function () {
        this.saveInvoice();
    };
    CreateInvoiceComponent.prototype.saveInvoice = function () {
        var _this = this;
        this.invoiceService.createInvoice(this.invoice).subscribe(function (res) { return _this.saveInvoiceItems(); }, function (error) {
            console.log(error);
            return Observable_1.Observable.throw(error);
        });
    };
    CreateInvoiceComponent.prototype.saveInvoiceItems = function () {
        var _this = this;
        this.invoiceService.insertInvoiceItems(this.items).subscribe(function (res) { return _this.router.navigate(['/invoices']); }, function (error) {
            console.log(error);
            return Observable_1.Observable.throw(error);
        });
    };
    CreateInvoiceComponent.prototype.addRow = function () {
        var row = new invoice_row_model_1.default();
        row.invoice_number = this.invoice.invoice_number;
        this.items.push(row);
    };
    CreateInvoiceComponent.prototype.deleteRow = function (row) {
        this.items.splice(this.items.indexOf(row), 1);
    };
    CreateInvoiceComponent.prototype.getDebtorChoice = function (event) {
        this.debtor = event;
    };
    CreateInvoiceComponent = __decorate([
        core_1.Component({
            selector: 'app-create-invoice',
            templateUrl: './create-invoice.component.html',
            styleUrls: ['./create-invoice.component.scss']
        }),
        __metadata("design:paramtypes", [platform_browser_1.Title, router_1.ActivatedRoute,
            invoice_service_1.InvoiceService, router_1.Router])
    ], CreateInvoiceComponent);
    return CreateInvoiceComponent;
}());
exports.CreateInvoiceComponent = CreateInvoiceComponent;
//# sourceMappingURL=create-invoice.component.js.map