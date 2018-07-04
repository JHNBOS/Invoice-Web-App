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
var router_1 = require("@angular/router");
var user_service_1 = require("../../shared/services/user.service");
var platform_browser_1 = require("@angular/platform-browser");
var Observable_1 = require("rxjs/Observable");
var DetailUserComponent = /** @class */ (function () {
    function DetailUserComponent(titleService, route, userService, router) {
        this.titleService = titleService;
        this.route = route;
        this.userService = userService;
        this.router = router;
    }
    DetailUserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.titleService.setTitle('User Details - inVoice');
        this.route.params.subscribe(function (params) {
            _this.userId = +params['id'];
            _this.getUser(_this.userId);
        });
    };
    DetailUserComponent.prototype.getUser = function (id) {
        var _this = this;
        this.userService.getUserById(id).subscribe(function (res) { return _this.currentUser = res; }, function (error) {
            console.log(error);
            return Observable_1.Observable.throw(error);
        });
    };
    DetailUserComponent = __decorate([
        core_1.Component({
            selector: 'app-detail-user',
            templateUrl: './detail-user.component.html',
            styleUrls: ['./detail-user.component.scss']
        }),
        __metadata("design:paramtypes", [platform_browser_1.Title, router_1.ActivatedRoute, user_service_1.UserService,
            router_1.Router])
    ], DetailUserComponent);
    return DetailUserComponent;
}());
exports.DetailUserComponent = DetailUserComponent;
//# sourceMappingURL=detail-user.component.js.map