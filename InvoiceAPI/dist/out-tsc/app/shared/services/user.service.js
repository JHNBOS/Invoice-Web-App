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
var http_1 = require("@angular/common/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
require("rxjs/add/observable/throw");
require("rxjs/add/operator/share");
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
        this.apiUrl = 'http://localhost/api/users/';
    }
    UserService.prototype.getByEmail = function (email) {
        return this.http.get(this.apiUrl + 'getByEmail?email=' + email)
            .catch(this.handleError);
    };
    UserService.prototype.getAll = function () {
        return this.http.get(this.apiUrl + 'getAll')
            .catch(this.handleError);
    };
    UserService.prototype.checkCredentials = function (email, password) {
        return this.http.get(this.apiUrl + 'authenticate?email=' + email + '&password=' + password)
            .catch(this.handleError);
    };
    UserService.prototype.create = function (user) {
        return this.http.post(this.apiUrl + 'create', user)
            .catch(this.handleError);
    };
    UserService.prototype.update = function (user) {
        return this.http.put(this.apiUrl + 'update', user)
            .catch(this.handleError);
    };
    UserService.prototype.delete = function (email) {
        return this.http.delete(this.apiUrl + 'delete?email=' + email)
            .catch(this.handleError);
    };
    UserService.prototype.handleError = function (error) {
        return Observable_1.Observable.throw(error);
    };
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map