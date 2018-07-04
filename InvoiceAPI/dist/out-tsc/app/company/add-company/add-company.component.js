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
var company_model_1 = require("../../shared/models/company.model");
var router_1 = require("@angular/router");
var company_service_1 = require("../../shared/services/company.service");
var address_model_1 = require("../../shared/models/address.model");
var located_at_service_1 = require("../../shared/services/located-at.service");
var located_at_model_1 = require("../../shared/models/located_at.model");
var platform_browser_1 = require("@angular/platform-browser");
var address_service_1 = require("../../shared/services/address.service");
var AddCompanyComponent = /** @class */ (function () {
    function AddCompanyComponent(titleService, route, companyService, locatedAtService, addressService, router) {
        this.titleService = titleService;
        this.route = route;
        this.companyService = companyService;
        this.locatedAtService = locatedAtService;
        this.addressService = addressService;
        this.router = router;
        this.company = new company_model_1.default;
        this.address = new address_model_1.default;
    }
    AddCompanyComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle('Create Company - inVoice');
    };
    AddCompanyComponent.prototype.submitForm = function () {
        var _this = this;
        this.companyService.createCompany(this.company).subscribe(function (res) {
            _this.createAddress();
        }, function (err) { return console.log(err); });
    };
    AddCompanyComponent.prototype.createAddress = function () {
        var _this = this;
        this.addressService.createAddress(this.address).subscribe(function (res) { return _this.linkAddress(); }, function (err) { return console.log(err); });
    };
    AddCompanyComponent.prototype.linkAddress = function () {
        var _this = this;
        var locatedAt = new located_at_model_1.default();
        locatedAt.company_number = this.company.business_number;
        locatedAt.address_postal = this.address.postal_code;
        locatedAt.address_number = this.address.number;
        this.locatedAtService.createLocatedAt(locatedAt).subscribe(function (resp) { return _this.router.navigate(['/companies']); }, function (error) { return console.log(error); });
    };
    AddCompanyComponent = __decorate([
        core_1.Component({
            selector: 'app-add-company',
            templateUrl: './add-company.component.html',
            styleUrls: ['./add-company.component.scss']
        }),
        __metadata("design:paramtypes", [platform_browser_1.Title, router_1.ActivatedRoute,
            company_service_1.CompanyService, located_at_service_1.LocatedAtService, address_service_1.AddressService,
            router_1.Router])
    ], AddCompanyComponent);
    return AddCompanyComponent;
}());
exports.AddCompanyComponent = AddCompanyComponent;
//# sourceMappingURL=add-company.component.js.map