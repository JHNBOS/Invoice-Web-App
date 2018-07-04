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
var ng_select_1 = require("@ng-select/ng-select");
var ng2_toasty_1 = require("ng2-toasty");
var debtor_dropdown_component_1 = require("./debtor-dropdown.component");
var debtor_service_1 = require("../../shared/services/debtor.service");
var DebtorDropdownModule = /** @class */ (function () {
    function DebtorDropdownModule() {
    }
    DebtorDropdownModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                http_1.HttpClientModule,
                forms_1.FormsModule,
                ng_select_1.NgSelectModule,
                ng2_toasty_1.ToastyModule.forRoot()
            ],
            exports: [
                debtor_dropdown_component_1.DebtorDropdownComponent
            ],
            declarations: [
                debtor_dropdown_component_1.DebtorDropdownComponent
            ],
            providers: [
                debtor_service_1.DebtorService,
                { provide: common_1.LocationStrategy, useClass: common_1.PathLocationStrategy }
            ]
        })
    ], DebtorDropdownModule);
    return DebtorDropdownModule;
}());
exports.DebtorDropdownModule = DebtorDropdownModule;
//# sourceMappingURL=debtor-dropdown.module.js.map