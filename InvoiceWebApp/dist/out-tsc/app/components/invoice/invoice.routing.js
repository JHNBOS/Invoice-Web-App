"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var authguard_service_1 = require("../../shared/authguard.service");
var create_invoice_component_1 = require("./create-invoice/create-invoice.component");
var invoice_component_1 = require("./invoice.component");
var detail_invoice_component_1 = require("./detail-invoice/detail-invoice.component");
var routes = [
    {
        path: 'invoices',
        children: [
            { path: '', component: invoice_component_1.InvoiceComponent, canActivate: [authguard_service_1.AuthGuard], data: { title: 'Invoices', roles: [1, 2] } },
            { path: 'create', component: create_invoice_component_1.CreateInvoiceComponent, canActivate: [authguard_service_1.AuthGuard], data: { title: 'Create Invoice', roles: [1] } },
            { path: 'details/:id', component: detail_invoice_component_1.DetailInvoiceComponent, canActivate: [authguard_service_1.AuthGuard], data: { title: 'Invoice Details', roles: [1, 2] } }
        ]
    },
];
var InvoiceRoutingModule = /** @class */ (function () {
    function InvoiceRoutingModule() {
    }
    InvoiceRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(routes)
            ],
            exports: [
                router_1.RouterModule
            ],
            declarations: []
        })
    ], InvoiceRoutingModule);
    return InvoiceRoutingModule;
}());
exports.InvoiceRoutingModule = InvoiceRoutingModule;
//# sourceMappingURL=invoice.routing.js.map