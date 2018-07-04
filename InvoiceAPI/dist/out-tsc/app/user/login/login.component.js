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
var user_service_1 = require("../../shared/services/user.service");
var authentication_service_1 = require("../../shared/authentication.service");
var Observable_1 = require("rxjs/Observable");
var ng2_toasty_1 = require("ng2-toasty");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(titleService, route, userService, router, authenticationService, toastyService) {
        this.titleService = titleService;
        this.route = route;
        this.userService = userService;
        this.router = router;
        this.authenticationService = authenticationService;
        this.toastyService = toastyService;
        this.email = '';
        this.password = '';
        this.toastOptions = {
            title: 'Oops',
            msg: 'You\'ve entered the wrong credentials, please try again!',
            theme: ' bootstrap',
            showClose: true,
            timeout: 4000
        };
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle('Sign In - inVoice');
        // reset login status
        this.authenticationService.logout();
    };
    LoginComponent.prototype.checkCredentials = function () {
        var _this = this;
        this.authenticationService.login(this.email, this.password)
            .subscribe(function (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user[0]));
            _this.router.navigate(['/']);
        }, function (error) {
            _this.toastyService.warning(_this.toastOptions);
            return Observable_1.Observable.throw(error);
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss']
        }),
        __metadata("design:paramtypes", [platform_browser_1.Title, router_1.ActivatedRoute, user_service_1.UserService,
            router_1.Router, authentication_service_1.AuthenticationService, ng2_toasty_1.ToastyService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map