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
var ng2_toasty_1 = require("ng2-toasty");
var located_at_model_1 = require("../../shared/models/located_at.model");
var address_model_1 = require("../../shared/models/address.model");
var company_model_1 = require("../../shared/models/company.model");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var address_service_1 = require("../../shared/services/address.service");
var located_at_service_1 = require("../../shared/services/located-at.service");
var company_service_1 = require("../../shared/services/company.service");
var ImportCompanyComponent = /** @class */ (function () {
    function ImportCompanyComponent(titleService, companyService, addressService, locatedAtService, toastyService, route, router) {
        this.titleService = titleService;
        this.companyService = companyService;
        this.addressService = addressService;
        this.locatedAtService = locatedAtService;
        this.toastyService = toastyService;
        this.route = route;
        this.router = router;
        this.companies = [];
        this.addresses = [];
        this.locatedAts = [];
        this.titleService.setTitle('Import Companies - inVoice');
        this.toastOptions = {
            title: 'Success',
            msg: 'Companies have been successfully added!',
            theme: ' bootstrap',
            showClose: true,
            timeout: 4000
        };
    }
    ImportCompanyComponent.prototype.ngOnInit = function () { };
    ImportCompanyComponent.prototype.upload = function (event) {
        this.extractData(event.target);
    };
    ImportCompanyComponent.prototype.mapToCompany = function (data) {
        var company = new company_model_1.default();
        company.business_number = Number.parseInt(data[0]);
        company.company_name = data[1];
        company.email = data[2];
        company.phone = data[3];
        company.bank_account = data[4];
        var address = new address_model_1.default();
        address.street = data[5];
        address.number = Number.parseInt(data[6]);
        address.suffix = data[7];
        address.postal_code = data[8];
        address.city = data[9];
        address.country = data[10];
        var locatedAt = new located_at_model_1.default();
        locatedAt.company_number = company.business_number;
        locatedAt.address_postal = address.postal_code;
        locatedAt.address_number = address.number;
        this.companies.push(company);
        this.addresses.push(address);
        this.locatedAts.push(locatedAt);
    };
    ImportCompanyComponent.prototype.extractData = function (fileInput) {
        var _this = this;
        var fileReaded = fileInput.files[0];
        var lines = [];
        var reader = new FileReader();
        reader.readAsText(fileReaded);
        reader.onload = function (e) {
            var csv = reader.result;
            var allTextLines = csv.split(/\r|\n|\r/);
            var headers = allTextLines[0].split(',');
            for (var i = 1; i < allTextLines.length; i++) {
                // split content based on comma
                var data = allTextLines[i].split(',');
                if (data.length === headers.length) {
                    var tarr = [];
                    for (var j = 0; j < headers.length; j++) {
                        tarr.push(data[j]);
                    }
                    _this.mapToCompany(tarr);
                }
            }
            _this.saveCompanies();
        };
    };
    ImportCompanyComponent.prototype.saveCompanies = function () {
        var _this = this;
        var count = 0;
        for (var i = 0; i < this.companies.length; i++) {
            var company = this.companies[i];
            this.companyService.createCompany(company).subscribe(function (res) {
                count++;
                if (count === _this.companies.length) {
                    _this.toastyService.success(_this.toastOptions);
                }
            }, function (err) { throw (err); });
        }
        this.createAddresses();
    };
    ImportCompanyComponent.prototype.createAddresses = function () {
        var _this = this;
        for (var i = 0; i < this.addresses.length; i++) {
            var address = this.addresses[i];
            this.addressService.createAddress(address).subscribe(function (res) { return _this.linkAddress(); }, function (err) { return console.log(err); });
        }
        setTimeout(function () {
            _this.router.navigate(['/companies']);
        }, 3000);
    };
    ImportCompanyComponent.prototype.linkAddress = function () {
        for (var i = 0; i < this.locatedAts.length; i++) {
            var locatedAt = this.locatedAts[i];
            this.locatedAtService.createLocatedAt(locatedAt).subscribe(function (res) { }, function (err) { return console.log(err); });
        }
    };
    ImportCompanyComponent = __decorate([
        core_1.Component({
            selector: 'app-import-company',
            templateUrl: './import-company.component.html',
            styleUrls: ['./import-company.component.scss']
        }),
        __metadata("design:paramtypes", [platform_browser_1.Title, company_service_1.CompanyService,
            address_service_1.AddressService, located_at_service_1.LocatedAtService,
            ng2_toasty_1.ToastyService, router_1.ActivatedRoute, router_1.Router])
    ], ImportCompanyComponent);
    return ImportCompanyComponent;
}());
exports.ImportCompanyComponent = ImportCompanyComponent;
//# sourceMappingURL=import-company.component.js.map