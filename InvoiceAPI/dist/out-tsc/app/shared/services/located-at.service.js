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
var http_2 = require("@angular/http");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
require("rxjs/add/observable/throw");
require("rxjs/add/operator/share");
var LocatedAtService = /** @class */ (function () {
    function LocatedAtService(http) {
        this.http = http;
        this.apiUrl = 'http://jhnbos.nl/invoice-api/located_at/';
    }
    LocatedAtService.prototype.getLocatedAt = function (postal, number) {
        return this.http.get(this.apiUrl + 'read.php?postal=' + postal + '&number=' + number)
            .map(function (res) { return res[0]; })
            .share()
            .catch(this.handleError);
    };
    LocatedAtService.prototype.getLocatedAtByCompany = function (id) {
        return this.http.get(this.apiUrl + 'read.php?id=' + id)
            .map(function (res) { return res[0]; })
            .share()
            .catch(this.handleError);
    };
    LocatedAtService.prototype.getAllLocatedAt = function () {
        return this.http.get(this.apiUrl + 'readAll.php')
            .map(function (res) { return res; })
            .share()
            .catch(this.handleError);
    };
    LocatedAtService.prototype.createLocatedAt = function (located_at) {
        var headers = new http_1.HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.apiUrl + 'create.php', located_at)
            .map(function (res) { return res; })
            .share()
            .catch(this.handleError);
    };
    LocatedAtService.prototype.deleteLocatedAt = function (postal, number) {
        return this.http.post(this.apiUrl + 'delete.php?postal=' + postal + '&number=' + number, {})
            .map(function (res) { return res; })
            .share()
            .catch(this.handleError);
    };
    LocatedAtService.prototype.deleteLivesAtByCompany = function (id) {
        return this.http.post(this.apiUrl + 'delete.php?id=' + id, {})
            .map(function (res) { return res; })
            .share()
            .catch(this.handleError);
    };
    LocatedAtService.prototype.handleError = function (error) {
        // In a real world app, you might use a remote logging infrastructure
        var errMsg;
        if (error instanceof http_2.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.log(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    LocatedAtService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], LocatedAtService);
    return LocatedAtService;
}());
exports.LocatedAtService = LocatedAtService;
//# sourceMappingURL=located-at.service.js.map