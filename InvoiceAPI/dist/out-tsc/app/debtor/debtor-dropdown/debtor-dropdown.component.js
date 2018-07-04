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
var debtor_service_1 = require("../../shared/services/debtor.service");
var Observable_1 = require("rxjs/Observable");
var lives_at_service_1 = require("../../shared/services/lives-at.service");
var address_service_1 = require("../../shared/services/address.service");
var debtor_viewmodel_1 = require("../../shared/models/viewmodels/debtor.viewmodel");
var DebtorDropdownComponent = /** @class */ (function () {
    function DebtorDropdownComponent(debtorService, livesAtService, addressService) {
        this.debtorService = debtorService;
        this.livesAtService = livesAtService;
        this.addressService = addressService;
        this.debtors = [];
        this.livesAts = [];
        this.locations = [];
        this.isReady = false;
        this.chosenDebtor = new core_1.EventEmitter();
    }
    DebtorDropdownComponent.prototype.ngOnInit = function () {
        this.getAllDebtors();
    };
    DebtorDropdownComponent.prototype.setAddress = function () {
        var _this = this;
        this.debtors.forEach(function (debtor) {
            var lives_at = _this.livesAtService.getLivesAtByDebtor(debtor.ssn).subscribe(function (res) {
                var address = _this.addressService.getAddress(res.address_postal, res.address_number).subscribe(function (result) {
                    debtor.street = result.street;
                    debtor.number = result.number;
                    debtor.suffix = result.suffix;
                    debtor.postal_code = result.postal_code;
                    debtor.city = result.city;
                    debtor.country = result.country;
                    debtor.setDebtorString();
                    _this.isReady = true;
                });
            }, function (error) {
                console.log(error);
                return Observable_1.Observable.throw(error);
            });
        });
    };
    DebtorDropdownComponent.prototype.setDebtor = function (event) {
        this.selectedDebtor = event;
        this.chosenDebtor.emit(this.selectedDebtor);
    };
    DebtorDropdownComponent.prototype.getAllDebtors = function () {
        var _this = this;
        this.debtorService.getAllDebtors().subscribe(function (values) {
            values.forEach(function (debtor) {
                // tslint:disable-next-line:prefer-const
                var debtorViewModel = new debtor_viewmodel_1.default();
                debtorViewModel.ssn = debtor.ssn;
                debtorViewModel.first_name = debtor.first_name;
                debtorViewModel.last_name = debtor.last_name;
                debtorViewModel.bank_account = debtor.bank_account;
                debtorViewModel.email = debtor.email;
                debtorViewModel.phone = debtor.phone;
                _this.debtors.push(debtorViewModel);
            });
            _this.setAddress();
        }, function (error) {
            console.log(error);
            return Observable_1.Observable.throw(error);
        });
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], DebtorDropdownComponent.prototype, "chosenDebtor", void 0);
    DebtorDropdownComponent = __decorate([
        core_1.Component({
            selector: 'app-debtor-dropdown',
            templateUrl: './debtor-dropdown.component.html',
            styleUrls: ['./debtor-dropdown.component.scss']
        }),
        __metadata("design:paramtypes", [debtor_service_1.DebtorService, lives_at_service_1.LivesAtService,
            address_service_1.AddressService])
    ], DebtorDropdownComponent);
    return DebtorDropdownComponent;
}());
exports.DebtorDropdownComponent = DebtorDropdownComponent;
//# sourceMappingURL=debtor-dropdown.component.js.map