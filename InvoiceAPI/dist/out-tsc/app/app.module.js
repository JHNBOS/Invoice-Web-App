"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var ng2_toasty_1 = require("ng2-toasty");
var error_handler_1 = require("./shared/error-handler");
var app_component_1 = require("./app.component");
var dashboard_module_1 = require("./dashboard/dashboard.module");
var user_module_1 = require("./user/user.module");
var debtor_module_1 = require("./debtor/debtor.module");
var company_module_1 = require("./company/company.module");
var invoice_module_1 = require("./invoice/invoice.module");
var app_routing_1 = require("./app.routing");
var shared_service_1 = require("./shared/services/shared.service");
var authguard_service_1 = require("./shared/authguard.service");
var authentication_service_1 = require("./shared/authentication.service");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpClientModule,
                user_module_1.UserModule,
                dashboard_module_1.DashboardModule,
                debtor_module_1.DebtorModule,
                company_module_1.CompanyModule,
                invoice_module_1.InvoiceModule,
                ng2_toasty_1.ToastyModule.forRoot(),
                app_routing_1.AppRoutingModule
            ],
            exports: [
                ng2_toasty_1.ToastyModule
            ],
            providers: [
                shared_service_1.SharedService,
                { provide: authguard_service_1.AuthGuard, useClass: authguard_service_1.AuthGuard },
                { provide: authentication_service_1.AuthenticationService, useClass: authentication_service_1.AuthenticationService },
                { provide: core_1.ErrorHandler, useClass: error_handler_1.CustomErrorHandler }
            ],
            bootstrap: [
                app_component_1.AppComponent
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map