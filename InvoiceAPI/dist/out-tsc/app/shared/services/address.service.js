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
var AddressService = /** @class */ (function () {
    function AddressService(http) {
        this.http = http;
        this.apiUrl = 'http://localhost/api/address/';
    }
    AddressService.prototype.getAll = function () {
        return this.http.get(this.apiUrl + 'getAll')
            .catch(this.handleError);
    };
    AddressService.prototype.getByCity = function (city) {
        return this.http.get(this.apiUrl + 'getByCity?city=' + city)
            .catch(this.handleError);
    };
    AddressService.prototype.getByPostal = function (postal) {
        return this.http.get(this.apiUrl + 'getByPostal?postal=' + postal)
            .catch(this.handleError);
    };
    AddressService.prototype.getAddress = function (postal, number) {
        return this.http.get(this.apiUrl + 'getByNumberAndPostalCode?number=' + number + '&postal=' + postal)
            .catch(this.handleError);
    };
    AddressService.prototype.create = function (address) {
        return this.http.post(this.apiUrl + 'create', address)
            .catch(this.handleError);
    };
    AddressService.prototype.delete = function (number, suffix, postal) {
        return this.http.delete(this.apiUrl + 'delete?number=' + number + '&suffix=' + suffix + '&postal=' + postal)
            .catch(this.handleError);
    };
    AddressService.prototype.handleError = function (error) {
        return Observable_1.Observable.throw(error);
    };
    AddressService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], AddressService);
    return AddressService;
}());
exports.AddressService = AddressService;
//# sourceMappingURL=address.service.js.map