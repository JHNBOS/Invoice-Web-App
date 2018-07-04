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
var DebtorService = /** @class */ (function () {
    function DebtorService(http) {
        this.http = http;
        this.apiUrl = 'http://localhost/api/debtors/';
    }
    DebtorService.prototype.getByEmail = function (email) {
        return this.http.get(this.apiUrl + 'getByEmail?email=' + email)
            .catch(this.handleError);
    };
    DebtorService.prototype.getById = function (id) {
        return this.http.get(this.apiUrl + 'getById?id=' + id)
            .catch(this.handleError);
    };
    DebtorService.prototype.getAll = function () {
        return this.http.get(this.apiUrl + 'getAll')
            .catch(this.handleError);
    };
    DebtorService.prototype.create = function (debtor) {
        return this.http.post(this.apiUrl + 'create', debtor)
            .catch(this.handleError);
    };
    DebtorService.prototype.update = function (debtor) {
        return this.http.put(this.apiUrl + 'update', debtor)
            .catch(this.handleError);
    };
    DebtorService.prototype.delete = function (id) {
        return this.http.delete(this.apiUrl + 'delete?id=' + id)
            .catch(this.handleError);
    };
    DebtorService.prototype.handleError = function (error) {
        return Observable_1.Observable.throw(error);
    };
    DebtorService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], DebtorService);
    return DebtorService;
}());
exports.DebtorService = DebtorService;
//# sourceMappingURL=debtor.service.js.map