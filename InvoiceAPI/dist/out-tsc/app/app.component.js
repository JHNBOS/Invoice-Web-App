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
var authentication_service_1 = require("./shared/authentication.service");
var router_1 = require("@angular/router");
require("rxjs/add/operator/filter");
require("rxjs/add/operator/map");
require("rxjs/add/operator/mergeMap");
var AppComponent = /** @class */ (function () {
    function AppComponent(authService, route, router) {
        this.authService = authService;
        this.route = route;
        this.router = router;
        this.user = null;
        this.isLoggedIn = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.checkIfLoggedIn();
        this.getCurrentRouteTitle();
    };
    AppComponent.prototype.checkIfLoggedIn = function () {
        this.user = JSON.parse(localStorage.getItem('loggedInUser'));
        if (this.user != null) {
            this.isLoggedIn = true;
        }
        else {
            this.isLoggedIn = false;
        }
    };
    AppComponent.prototype.getCurrentRouteTitle = function () {
        var _this = this;
        this.router.events
            .filter(function (event) { return event instanceof router_1.NavigationEnd; })
            .map(function () { return _this.route; })
            .map(function (route) {
            while (route.firstChild) {
                route = route.firstChild;
            }
            return route;
        })
            .filter(function (route) { return route.outlet === 'primary'; })
            .mergeMap(function (route) { return route.data; })
            .subscribe(function (event) { return _this.title = event['title']; });
    };
    AppComponent.prototype.signOut = function () {
        this.authService.logout();
        this.checkIfLoggedIn();
        if (!this.isLoggedIn) {
            this.router.navigate(['/login']);
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
        }),
        __metadata("design:paramtypes", [authentication_service_1.AuthenticationService, router_1.ActivatedRoute,
            router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map