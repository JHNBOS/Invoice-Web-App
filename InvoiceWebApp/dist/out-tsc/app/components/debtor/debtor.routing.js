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
var add_debtor_component_1 = require("./add-debtor/add-debtor.component");
var debtor_component_1 = require("./debtor.component");
var detail_debtor_component_1 = require("./detail-debtor/detail-debtor.component");
var edit_debtor_component_1 = require("./edit-debtor/edit-debtor.component");
var import_debtor_component_1 = require("./import-debtor/import-debtor.component");
var routes = [
    {
        path: 'debtors',
        children: [
            { path: '', component: debtor_component_1.DebtorComponent, canActivate: [authguard_service_1.AuthGuard], data: { title: 'Debtors', roles: [1] } },
            { path: 'add/:company', component: add_debtor_component_1.AddDebtorComponent, canActivate: [authguard_service_1.AuthGuard], data: { title: 'Add Debtor', roles: [1] } },
            { path: 'details/:id', component: detail_debtor_component_1.DetailDebtorComponent, canActivate: [authguard_service_1.AuthGuard], data: { title: 'Debtor Details', roles: [1, 2] } },
            { path: 'edit/:id', component: edit_debtor_component_1.EditDebtorComponent, canActivate: [authguard_service_1.AuthGuard], data: { title: 'Edit Debtor', roles: [1, 2] } },
            { path: 'import', component: import_debtor_component_1.ImportDebtorComponent, canActivate: [authguard_service_1.AuthGuard], data: { title: 'Import Debtors', roles: [1] } }
        ]
    },
];
var DebtorRoutingModule = /** @class */ (function () {
    function DebtorRoutingModule() {
    }
    DebtorRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(routes)
            ],
            exports: [
                router_1.RouterModule
            ],
            declarations: []
        })
    ], DebtorRoutingModule);
    return DebtorRoutingModule;
}());
exports.DebtorRoutingModule = DebtorRoutingModule;
//# sourceMappingURL=debtor.routing.js.map