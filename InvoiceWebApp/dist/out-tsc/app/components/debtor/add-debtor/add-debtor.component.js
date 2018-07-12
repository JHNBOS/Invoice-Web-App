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
var address_model_1 = require("../../../shared/models/address.model");
var debtor_model_1 = require("../../../shared/models/debtor.model");
var debtor_has_address_model_1 = require("../../../shared/models/debtor_has_address.model");
var address_service_1 = require("../../../shared/services/address.service");
var debtor_service_1 = require("../../../shared/services/debtor.service");
var debtor_has_address_service_1 = require("../../../shared/services/debtor_has_address.service");
var AddDebtorComponent = /** @class */ (function () {
    function AddDebtorComponent(titleService, route, debtorService, debtorHasAddressService, addressService, router) {
        this.titleService = titleService;
        this.route = route;
        this.debtorService = debtorService;
        this.debtorHasAddressService = debtorHasAddressService;
        this.addressService = addressService;
        this.router = router;
        this.forCompany = false;
        this.debtor = new debtor_model_1.default;
        this.address = new address_model_1.default;
    }
    AddDebtorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.titleService.setTitle('Create Debtor - Invoice Panel');
        this.route.params.subscribe(function (params) {
            _this.forCompany = params['company'] == 'yes' ? true : false;
        });
    };
    AddDebtorComponent.prototype.submitForm = function () {
        var _this = this;
        this.debtorService.create(this.debtor).subscribe(function (response) {
            if ((_this.debtor.address.postal_code != _this.address.postal_code) && (_this.debtor.address.number != _this.address.number)) {
                _this.createAddress();
            }
            else {
                _this.router.navigate(['/debtors']);
            }
        }, function (error) { throw error; });
    };
    AddDebtorComponent.prototype.createAddress = function () {
        var _this = this;
        var exists = this.addressService.getAddress(this.address.postal_code, this.address.number).subscribe(function (response) {
            if (response != null) {
                true;
            }
            else {
                false;
            }
        }, function (error) { });
        if (exists) {
            this.linkAddress();
        }
        else {
            this.addressService.create(this.address).subscribe(function (response) { return _this.linkAddress(); }, function (error) { throw error; });
        }
    };
    AddDebtorComponent.prototype.linkAddress = function () {
        var _this = this;
        var exists = this.debtorHasAddressService.getByDebtorId(this.debtor.id).subscribe(function (response) {
            if (response != null) {
                true;
            }
            else {
                false;
            }
        }, function (error) { });
        if (exists) {
            this.debtorHasAddressService.deleteDebtorHasAddress(this.debtor.id, this.address.postal_code, this.address.number).subscribe(function (response) { }, function (error) { });
        }
        var debtorAddressLink = new debtor_has_address_model_1.default();
        debtorAddressLink.debtor_id = this.debtor.id;
        debtorAddressLink.address_postal = this.address.postal_code;
        debtorAddressLink.address_number = this.address.number;
        this.debtorHasAddressService.create(debtorAddressLink).subscribe(function (response) { return _this.router.navigate(['/debtors']); }, function (error) { throw error; });
    };
    AddDebtorComponent = __decorate([
        core_1.Component({
            selector: 'app-add-debtor',
            templateUrl: './add-debtor.component.html',
            styleUrls: ['./add-debtor.component.scss']
        }),
        __metadata("design:paramtypes", [platform_browser_1.Title, router_1.ActivatedRoute, debtor_service_1.DebtorService,
            debtor_has_address_service_1.DebtorHasAddressService, address_service_1.AddressService, router_1.Router])
    ], AddDebtorComponent);
    return AddDebtorComponent;
}());
exports.AddDebtorComponent = AddDebtorComponent;
//# sourceMappingURL=add-debtor.component.js.map