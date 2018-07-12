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
var invoice_service_1 = require("../../../shared/services/invoice.service");
var invoice_item_service_1 = require("../../../shared/services/invoice_item.service");
var DetailInvoiceComponent = /** @class */ (function () {
    function DetailInvoiceComponent(invoiceService, itemService, router, route, titleService) {
        this.invoiceService = invoiceService;
        this.itemService = itemService;
        this.router = router;
        this.route = route;
        this.titleService = titleService;
    }
    DetailInvoiceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.titleService.setTitle('Invoice Details - Invoice Panel');
        this.route.params.subscribe(function (params) {
            _this.invoiceNumber = params['id'];
            _this.getInvoice(_this.invoiceNumber);
        });
    };
    DetailInvoiceComponent.prototype.getInvoice = function (invoice) {
        var _this = this;
        this.invoiceService.getByNumber(invoice).subscribe(function (response) {
            _this.invoice = response;
            _this.getItems(_this.invoiceNumber);
        }, function (error) { throw error; });
    };
    DetailInvoiceComponent.prototype.getItems = function (invoice) {
        var _this = this;
        this.itemService.getByInvoice(invoice).subscribe(function (response) { return _this.invoice.items = response; }, function (error) { throw error; });
    };
    DetailInvoiceComponent = __decorate([
        core_1.Component({
            selector: 'app-detail-invoice',
            templateUrl: './detail-invoice.component.html',
            styleUrls: ['./detail-invoice.component.scss']
        }),
        __metadata("design:paramtypes", [invoice_service_1.InvoiceService, invoice_item_service_1.InvoiceItemService, router_1.Router, router_1.ActivatedRoute,
            platform_browser_1.Title])
    ], DetailInvoiceComponent);
    return DetailInvoiceComponent;
}());
exports.DetailInvoiceComponent = DetailInvoiceComponent;
//# sourceMappingURL=detail-invoice.component.js.map