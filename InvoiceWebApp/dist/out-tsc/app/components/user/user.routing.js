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
var add_user_component_1 = require("./add-user/add-user.component");
var detail_user_component_1 = require("./detail-user/detail-user.component");
var edit_user_component_1 = require("./edit-user/edit-user.component");
var import_user_component_1 = require("./import-user/import-user.component");
var user_component_1 = require("./user.component");
var routes = [
    {
        path: 'users',
        children: [
            { path: '', component: user_component_1.UserComponent, canActivate: [authguard_service_1.AuthGuard], data: { title: 'Users', roles: [1] } },
            { path: 'edit/:email', component: edit_user_component_1.EditUserComponent, canActivate: [authguard_service_1.AuthGuard], data: { title: 'Edit User', roles: [1, 2] } },
            { path: 'add', component: add_user_component_1.AddUserComponent, canActivate: [authguard_service_1.AuthGuard], data: { title: 'Add User', roles: [1] } },
            { path: 'details/:email', component: detail_user_component_1.DetailUserComponent, canActivate: [authguard_service_1.AuthGuard], data: { title: 'User Details', roles: [1, 2] } },
            { path: 'import', component: import_user_component_1.ImportUserComponent, canActivate: [authguard_service_1.AuthGuard], data: { title: 'Import Users', roles: [1] } }
        ]
    },
];
var UserRoutingModule = /** @class */ (function () {
    function UserRoutingModule() {
    }
    UserRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(routes)
            ],
            exports: [
                router_1.RouterModule
            ],
            declarations: []
        })
    ], UserRoutingModule);
    return UserRoutingModule;
}());
exports.UserRoutingModule = UserRoutingModule;
//# sourceMappingURL=user.routing.js.map