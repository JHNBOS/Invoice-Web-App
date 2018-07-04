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
var company_component_1 = require("./company.component");
var add_company_component_1 = require("./add-company/add-company.component");
var authguard_service_1 = require("../shared/authguard.service");
var detail_company_component_1 = require("./detail-company/detail-company.component");
var edit_company_component_1 = require("./edit-company/edit-company.component");
var import_company_component_1 = require("./import-company/import-company.component");
var routes = [
    {
        path: 'companies',
        children: [
            { path: '', component: company_component_1.CompanyComponent, canActivate: [authguard_service_1.AuthGuard], data: { title: 'Companies' } },
            { path: 'add', component: add_company_component_1.AddCompanyComponent, canActivate: [authguard_service_1.AuthGuard], data: { title: 'Add Company' } },
            { path: 'details/:id', component: detail_company_component_1.DetailCompanyComponent, canActivate: [authguard_service_1.AuthGuard], data: { title: 'Company Details' } },
            { path: 'edit/:id', component: edit_company_component_1.EditCompanyComponent, canActivate: [authguard_service_1.AuthGuard], data: { title: 'Edit Company' } },
            { path: 'import', component: import_company_component_1.ImportCompanyComponent, canActivate: [authguard_service_1.AuthGuard], data: { title: 'Import Companies' } },
        ]
    },
];
var CompanyRoutingModule = /** @class */ (function () {
    function CompanyRoutingModule() {
    }
    CompanyRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(routes)
            ],
            exports: [
                router_1.RouterModule
            ],
            declarations: []
        })
    ], CompanyRoutingModule);
    return CompanyRoutingModule;
}());
exports.CompanyRoutingModule = CompanyRoutingModule;
//# sourceMappingURL=company.routing.js.map