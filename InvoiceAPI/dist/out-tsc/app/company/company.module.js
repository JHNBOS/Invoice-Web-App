"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var http_1 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
var company_service_1 = require("../shared/services/company.service");
var address_service_1 = require("../shared/services/address.service");
var located_at_service_1 = require("../shared/services/located-at.service");
var company_routing_1 = require("./company.routing");
var ng2_toasty_1 = require("ng2-toasty");
var error_handler_1 = require("../shared/error-handler");
var company_component_1 = require("./company.component");
var add_company_component_1 = require("./add-company/add-company.component");
var detail_company_component_1 = require("./detail-company/detail-company.component");
var edit_company_component_1 = require("./edit-company/edit-company.component");
var import_company_component_1 = require("./import-company/import-company.component");
var CompanyModule = /** @class */ (function () {
    function CompanyModule() {
    }
    CompanyModule = __decorate([
        core_1.NgModule({
            declarations: [
                company_component_1.CompanyComponent,
                add_company_component_1.AddCompanyComponent,
                detail_company_component_1.DetailCompanyComponent,
                edit_company_component_1.EditCompanyComponent,
                import_company_component_1.ImportCompanyComponent
            ],
            imports: [
                common_1.CommonModule,
                http_1.HttpClientModule,
                forms_1.FormsModule,
                ng2_toasty_1.ToastyModule.forRoot(),
                company_routing_1.CompanyRoutingModule
            ],
            providers: [
                company_service_1.CompanyService,
                address_service_1.AddressService,
                located_at_service_1.LocatedAtService,
                { provide: core_1.ErrorHandler, useClass: error_handler_1.CustomErrorHandler }
            ],
            exports: [
                company_component_1.CompanyComponent
            ]
        })
    ], CompanyModule);
    return CompanyModule;
}());
exports.CompanyModule = CompanyModule;
//# sourceMappingURL=company.module.js.map