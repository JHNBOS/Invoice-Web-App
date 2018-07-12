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
var ng2_toasty_1 = require("ng2-toasty");
var user_service_1 = require("../../../shared/services/user.service");
var ResetPasswordComponent = /** @class */ (function () {
    function ResetPasswordComponent(userService, router, toastyService, titleService) {
        var _this = this;
        this.userService = userService;
        this.router = router;
        this.toastyService = toastyService;
        this.titleService = titleService;
        this.toastOptions = {
            title: '',
            msg: '',
            theme: ' bootstrap',
            showClose: true,
            timeout: 3000,
            onRemove: function () {
                _this.router.navigate(['/login']);
            }
        };
    }
    ResetPasswordComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle('Reset Password - Invoice Panel');
    };
    ResetPasswordComponent.prototype.showSuccess = function () {
        this.toastOptions.title = 'Success';
        this.toastOptions.msg = 'An e-mail has been sent to this e-mail address.';
        this.toastyService.success(this.toastOptions);
    };
    ResetPasswordComponent.prototype.resetPassword = function () {
        var _this = this;
        this.userService.resetPassword(this.email).subscribe(function (response) { return _this.showSuccess(); }, function (error) { throw error; });
    };
    ResetPasswordComponent = __decorate([
        core_1.Component({
            selector: 'app-reset-password',
            templateUrl: './reset-password.component.html',
            styleUrls: ['./reset-password.component.scss']
        }),
        __metadata("design:paramtypes", [user_service_1.UserService, router_1.Router, ng2_toasty_1.ToastyService, platform_browser_1.Title])
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}());
exports.ResetPasswordComponent = ResetPasswordComponent;
//# sourceMappingURL=reset-password.component.js.map