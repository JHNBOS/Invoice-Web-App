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
var company_service_1 = require("../../shared/services/company.service");
var platform_browser_1 = require("@angular/platform-browser");
var located_at_service_1 = require("../../shared/services/located-at.service");
var address_service_1 = require("../../shared/services/address.service");
var DetailCompanyComponent = /** @class */ (function () {
    function DetailCompanyComponent(titleService, route, companyService, locatedAtService, addressService, router) {
        this.titleService = titleService;
        this.route = route;
        this.companyService = companyService;
        this.locatedAtService = locatedAtService;
        this.addressService = addressService;
        this.router = router;
    }
    DetailCompanyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.titleService.setTitle('Company Details - inVoice');
        this.route.params.subscribe(function (params) {
            _this.companyNumber = +params['id'];
            _this.getCompany(_this.companyNumber);
        });
    };
    DetailCompanyComponent.prototype.getCompany = function (id) {
        var _this = this;
        this.companyService.getCompanyByNumber(id).subscribe(function (res) {
            _this.company = res;
            _this.getLocatedAt();
        }, function (err) { return console.log(err); });
    };
    DetailCompanyComponent.prototype.getAddress = function () {
        var _this = this;
        this.addressService.getAddress(this.located_at.address_postal, this.located_at.address_number).subscribe(function (res) { return _this.address = res; }, function (err) { return console.log(err); });
    };
    DetailCompanyComponent.prototype.getLocatedAt = function () {
        var _this = this;
        this.locatedAtService.getLocatedAtByCompany(this.companyNumber).subscribe(function (res) {
            _this.located_at = res;
            _this.getAddress();
        }, function (err) { return console.log(err); });
    };
    DetailCompanyComponent = __decorate([
        core_1.Component({
            selector: 'app-detail-company',
            templateUrl: './detail-company.component.html',
            styleUrls: ['./detail-company.component.scss']
        }),
        __metadata("design:paramtypes", [platform_browser_1.Title, router_1.ActivatedRoute,
            company_service_1.CompanyService, located_at_service_1.LocatedAtService, address_service_1.AddressService,
            router_1.Router])
    ], DetailCompanyComponent);
    return DetailCompanyComponent;
}());
exports.DetailCompanyComponent = DetailCompanyComponent;
//# sourceMappingURL=detail-company.component.js.map