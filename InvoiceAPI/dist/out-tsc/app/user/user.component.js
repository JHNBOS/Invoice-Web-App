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
var user_service_1 = require("../shared/services/user.service");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var UserComponent = /** @class */ (function () {
    function UserComponent(titleService, route, userService, router) {
        this.titleService = titleService;
        this.route = route;
        this.userService = userService;
        this.router = router;
        this.users = [];
    }
    UserComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle('Users - inVoice');
        this.getAllUsers();
    };
    UserComponent.prototype.getAllUsers = function () {
        var _this = this;
        this.userService.getAllUsers().subscribe(function (res) {
            if (res.toString() !== 'No users available!') {
                _this.users = res;
            }
        }, function (err) {
            throw (err);
        });
    };
    UserComponent.prototype.deleteUser = function (id) {
        var _this = this;
        if (confirm('Are you sure you want to delete this user?')) {
            this.userService.deleteUserById(id).subscribe(function (res) { return _this.ngOnInit(); }, function (err) {
                throw (err);
            });
        }
    };
    UserComponent = __decorate([
        core_1.Component({
            selector: 'app-user',
            templateUrl: './user.component.html',
            styleUrls: ['./user.component.scss']
        }),
        __metadata("design:paramtypes", [platform_browser_1.Title, router_1.ActivatedRoute,
            user_service_1.UserService, router_1.Router])
    ], UserComponent);
    return UserComponent;
}());
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map