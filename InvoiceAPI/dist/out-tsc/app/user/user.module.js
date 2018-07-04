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
var user_service_1 = require("../shared/services/user.service");
var user_routing_1 = require("./user.routing");
var ng2_toasty_1 = require("ng2-toasty");
var error_handler_1 = require("../shared/error-handler");
var user_component_1 = require("./user.component");
var edit_user_component_1 = require("./edit-user/edit-user.component");
var add_user_component_1 = require("./add-user/add-user.component");
var detail_user_component_1 = require("./detail-user/detail-user.component");
var import_user_component_1 = require("./import-user/import-user.component");
var login_component_1 = require("./login/login.component");
var UserModule = /** @class */ (function () {
    function UserModule() {
    }
    UserModule = __decorate([
        core_1.NgModule({
            declarations: [
                user_component_1.UserComponent,
                edit_user_component_1.EditUserComponent,
                add_user_component_1.AddUserComponent,
                detail_user_component_1.DetailUserComponent,
                import_user_component_1.ImportUserComponent,
                login_component_1.LoginComponent
            ],
            imports: [
                common_1.CommonModule,
                http_1.HttpClientModule,
                forms_1.FormsModule,
                ng2_toasty_1.ToastyModule.forRoot(),
                user_routing_1.UserRoutingModule
            ],
            providers: [
                user_service_1.UserService,
                { provide: core_1.ErrorHandler, useClass: error_handler_1.CustomErrorHandler }
            ],
            exports: [
                user_component_1.UserComponent
            ]
        })
    ], UserModule);
    return UserModule;
}());
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map