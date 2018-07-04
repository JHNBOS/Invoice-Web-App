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
var user_component_1 = require("./user/user.component");
var login_component_1 = require("./user/login/login.component");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var debtor_component_1 = require("./debtor/debtor.component");
var company_component_1 = require("./company/company.component");
var invoice_component_1 = require("./invoice/invoice.component");
var authguard_service_1 = require("./shared/authguard.service");
var routes = [
    {
        path: '',
        component: dashboard_component_1.DashboardComponent,
        canActivate: [authguard_service_1.AuthGuard],
        data: { title: '' }
    },
    {
        path: 'users',
        component: user_component_1.UserComponent,
        canActivate: [authguard_service_1.AuthGuard],
        data: { title: 'Users' }
    },
    {
        path: 'debtors',
        component: debtor_component_1.DebtorComponent,
        canActivate: [authguard_service_1.AuthGuard],
        data: { title: 'Debtors' }
    },
    {
        path: 'companies',
        component: company_component_1.CompanyComponent,
        canActivate: [authguard_service_1.AuthGuard],
        data: { title: 'Companies' }
    },
    {
        path: 'invoices',
        component: invoice_component_1.InvoiceComponent,
        canActivate: [authguard_service_1.AuthGuard],
        data: { title: 'Invoices' }
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent,
        data: { title: 'Sign In' }
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(routes)
            ],
            exports: [
                router_1.RouterModule
            ],
            declarations: []
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app.routing.js.map