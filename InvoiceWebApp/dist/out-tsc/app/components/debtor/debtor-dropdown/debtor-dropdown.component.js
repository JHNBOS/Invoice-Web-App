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
var address_service_1 = require("../../../shared/services/address.service");
var debtor_service_1 = require("../../../shared/services/debtor.service");
var debtor_has_address_service_1 = require("../../../shared/services/debtor_has_address.service");
var DebtorDropdownComponent = /** @class */ (function () {
    function DebtorDropdownComponent(debtorService, debtorHasAddressService, addressService) {
        this.debtorService = debtorService;
        this.debtorHasAddressService = debtorHasAddressService;
        this.addressService = addressService;
        this.debtors = [];
        this.isReady = false;
        this.chosenDebtor = new core_1.EventEmitter();
    }
    DebtorDropdownComponent.prototype.ngOnInit = function () {
        this.getAllDebtors();
    };
    DebtorDropdownComponent.prototype.setDebtor = function (event) {
        this.selectedDebtor = event;
        this.chosenDebtor.emit(this.selectedDebtor);
    };
    DebtorDropdownComponent.prototype.getAllDebtors = function () {
        var _this = this;
        this.debtorService.getAll().subscribe(function (response) { _this.debtors = response; _this.isReady = true; }, function (error) { throw (error); });
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
        __metadata("design:paramtypes", [debtor_service_1.DebtorService, debtor_has_address_service_1.DebtorHasAddressService, address_service_1.AddressService])
    ], DebtorDropdownComponent);
    return DebtorDropdownComponent;
}());
exports.DebtorDropdownComponent = DebtorDropdownComponent;
//# sourceMappingURL=debtor-dropdown.component.js.map