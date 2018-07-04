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
var user_model_1 = require("../../shared/models/user.model");
var router_1 = require("@angular/router");
var user_service_1 = require("../../shared/services/user.service");
var platform_browser_1 = require("@angular/platform-browser");
var Observable_1 = require("rxjs/Observable");
var AddUserComponent = /** @class */ (function () {
    function AddUserComponent(titleService, route, userService, router) {
        this.titleService = titleService;
        this.route = route;
        this.userService = userService;
        this.router = router;
        this.currentUser = new user_model_1.default;
    }
    AddUserComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle('Create User - inVoice');
    };
    AddUserComponent.prototype.submitForm = function () {
        var _this = this;
        this.userService.createUser(this.currentUser).subscribe(function (res) { _this.router.navigate(['/users']); }, function (error) {
            console.log(error);
            return Observable_1.Observable.throw(error);
        });
    };
    AddUserComponent = __decorate([
        core_1.Component({
            selector: 'app-add-user',
            templateUrl: './add-user.component.html',
            styleUrls: ['./add-user.component.scss']
        }),
        __metadata("design:paramtypes", [platform_browser_1.Title, router_1.ActivatedRoute, user_service_1.UserService,
            router_1.Router])
    ], AddUserComponent);
    return AddUserComponent;
}());
exports.AddUserComponent = AddUserComponent;
//# sourceMappingURL=add-user.component.js.map