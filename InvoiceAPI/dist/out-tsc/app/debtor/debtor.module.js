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
var debtor_service_1 = require("../shared/services/debtor.service");
var address_service_1 = require("../shared/services/address.service");
var lives_at_service_1 = require("../shared/services/lives-at.service");
var debtor_routing_1 = require("./debtor.routing");
var ng2_toasty_1 = require("ng2-toasty");
var error_handler_1 = require("../shared/error-handler");
var debtor_component_1 = require("./debtor.component");
var add_debtor_component_1 = require("./add-debtor/add-debtor.component");
var detail_debtor_component_1 = require("./detail-debtor/detail-debtor.component");
var edit_debtor_component_1 = require("./edit-debtor/edit-debtor.component");
var import_debtor_component_1 = require("./import-debtor/import-debtor.component");
var DebtorModule = /** @class */ (function () {
    function DebtorModule() {
    }
    DebtorModule = __decorate([
        core_1.NgModule({
            declarations: [
                debtor_component_1.DebtorComponent,
                add_debtor_component_1.AddDebtorComponent,
                detail_debtor_component_1.DetailDebtorComponent,
                edit_debtor_component_1.EditDebtorComponent,
                import_debtor_component_1.ImportDebtorComponent
            ],
            imports: [
                common_1.CommonModule,
                http_1.HttpClientModule,
                forms_1.FormsModule,
                ng2_toasty_1.ToastyModule.forRoot(),
                debtor_routing_1.DebtorRoutingModule
            ],
            providers: [
                debtor_service_1.DebtorService,
                address_service_1.AddressService,
                lives_at_service_1.LivesAtService,
                { provide: core_1.ErrorHandler, useClass: error_handler_1.CustomErrorHandler }
            ],
            exports: [
                debtor_component_1.DebtorComponent
            ]
        })
    ], DebtorModule);
    return DebtorModule;
}());
exports.DebtorModule = DebtorModule;
//# sourceMappingURL=debtor.module.js.map