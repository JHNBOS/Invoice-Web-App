"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var role_service_1 = require("../../../shared/services/role.service");
var user_service_1 = require("../../../shared/services/user.service");
var DetailUserComponent = /** @class */ (function () {
    function DetailUserComponent(titleService, route, userService, roleService, _sanitizer, router) {
        this.titleService = titleService;
        this.route = route;
        this.userService = userService;
        this.roleService = roleService;
        this._sanitizer = _sanitizer;
        this.router = router;
        this.roles = null;
    }
    DetailUserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.titleService.setTitle('User Details - Invoice Panel');
        this.route.params.subscribe(function (params) {
            _this.email = params['email'];
            _this.getRoles();
            _this.getUser(_this.email);
        });
    };
    DetailUserComponent.prototype.getRoles = function () {
        var _this = this;
        this.roleService.getAll().subscribe(function (response) { return _this.roles = response; }, function (error) { throw error; });
    };
    DetailUserComponent.prototype.getUser = function (email) {
        var _this = this;
        this.userService.getByEmail(email).subscribe(function (response) { return _this.currentUser = response; }, function (error) { throw error; });
    };
    DetailUserComponent = __decorate([
        core_1.Component({
            selector: 'app-detail-user',
            templateUrl: './detail-user.component.html',
            styleUrls: ['./detail-user.component.scss']
        }),
        __metadata("design:paramtypes", [platform_browser_1.Title, router_1.ActivatedRoute, user_service_1.UserService, role_service_1.RoleService, platform_browser_1.DomSanitizer, router_1.Router])
    ], DetailUserComponent);
    return DetailUserComponent;
}());
exports.DetailUserComponent = DetailUserComponent;
//# sourceMappingURL=detail-user.component.js.map