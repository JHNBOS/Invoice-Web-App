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
var moment = require("moment");
var invoice_model_1 = require("../../../shared/models/invoice.model");
var invoice_item_model_1 = require("../../../shared/models/invoice_item.model");
var invoice_service_1 = require("../../../shared/services/invoice.service");
var invoice_item_service_1 = require("../../../shared/services/invoice_item.service");
var CreateInvoiceComponent = /** @class */ (function () {
    function CreateInvoiceComponent(titleService, route, invoiceService, invoiceItemService, router) {
        this.titleService = titleService;
        this.route = route;
        this.invoiceService = invoiceService;
        this.invoiceItemService = invoiceItemService;
        this.router = router;
        this.invoice = new invoice_model_1.default;
        this.invoiceLength = 0;
        this.minDate = new Date().toJSON().split('T')[0];
        this.begin = this.minDate;
    }
    CreateInvoiceComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle('Create Invoice - Invoice Panel');
        this.setExpired();
        this.setInitialRow();
    };
    CreateInvoiceComponent.prototype.setInitialRow = function () {
        var row = new invoice_item_model_1.default();
        row.invoice_number = this.invoice.invoice_number;
        this.invoice.items.push(row);
    };
    CreateInvoiceComponent.prototype.setExpired = function () {
        var date = moment(this.begin).toDate();
        var expiration = new Date(date.setDate(date.getDate() + 30));
        this.expiration = expiration.toJSON().split('T')[0];
    };
    CreateInvoiceComponent.prototype.getDebtorChoice = function (event) {
        this.debtor = event;
    };
    CreateInvoiceComponent.prototype.submitForm = function () {
        // Get invoice count
        this.getInvoiceCount();
        //Set invoice properties
        this.invoice.created_on = moment(this.begin).toDate();
        this.invoice.expired_on = moment(this.expiration).toDate();
        this.invoice.customer_id = this.debtor.id;
        this.invoice.invoice_number = new Date().getFullYear().toString() + new Date().getMonth().toString() + '-' + (this.invoiceLength + 1);
        for (var i = 0; i < this.invoice.items.length; i++) {
            var item = this.invoice.items[i];
            this.invoice.total += item.total;
        }
        this.saveInvoice();
    };
    CreateInvoiceComponent.prototype.saveInvoice = function () {
        var _this = this;
        this.invoiceService.create(this.invoice).subscribe(function (response) {
            setTimeout(function () {
                _this.saveInvoiceItems();
            }, 1000);
        }, function (error) { throw (error); });
    };
    CreateInvoiceComponent.prototype.saveInvoiceItems = function () {
        for (var i = 0; i < this.invoice.items.length; i++) {
            var item = this.invoice.items[i];
            item.item_number = 0;
            item.invoice_number = this.invoice.invoice_number;
            this.invoiceItemService.create(item).subscribe(function (response) { }, function (error) { throw (error); });
        }
        this.router.navigate(['/invoices']);
    };
    CreateInvoiceComponent.prototype.addRow = function () {
        var row = new invoice_item_model_1.default();
        row.invoice_number = this.invoice.invoice_number;
        this.invoice.items.push(row);
    };
    CreateInvoiceComponent.prototype.deleteRow = function (row) {
        this.invoice.items.splice(this.invoice.items.indexOf(row), 1);
    };
    CreateInvoiceComponent.prototype.calculatePrice = function (item) {
        item.total = (item.price * item.quantity);
    };
    CreateInvoiceComponent.prototype.getInvoiceCount = function () {
        var _this = this;
        this.invoiceService.getAll().subscribe(function (response) { return _this.invoiceLength = response.length; }, function (error) { throw error; });
    };
    CreateInvoiceComponent = __decorate([
        core_1.Component({
            selector: 'app-create-invoice',
            templateUrl: './create-invoice.component.html',
            styleUrls: ['./create-invoice.component.scss']
        }),
        __metadata("design:paramtypes", [platform_browser_1.Title, router_1.ActivatedRoute, invoice_service_1.InvoiceService, invoice_item_service_1.InvoiceItemService,
            router_1.Router])
    ], CreateInvoiceComponent);
    return CreateInvoiceComponent;
}());
exports.CreateInvoiceComponent = CreateInvoiceComponent;
//# sourceMappingURL=create-invoice.component.js.map