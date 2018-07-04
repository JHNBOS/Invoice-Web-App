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
var debtor_model_1 = require("../../shared/models/debtor.model");
var router_1 = require("@angular/router");
var debtor_service_1 = require("../../shared/services/debtor.service");
var address_model_1 = require("../../shared/models/address.model");
var lives_at_service_1 = require("../../shared/services/lives-at.service");
var lives_at_model_1 = require("../../shared/models/lives_at.model");
var platform_browser_1 = require("@angular/platform-browser");
var address_service_1 = require("../../shared/services/address.service");
var AddDebtorComponent = /** @class */ (function () {
    function AddDebtorComponent(titleService, route, debtorService, livesAtService, addressService, router) {
        this.titleService = titleService;
        this.route = route;
        this.debtorService = debtorService;
        this.livesAtService = livesAtService;
        this.addressService = addressService;
        this.router = router;
        this.debtor = new debtor_model_1.default;
        this.address = new address_model_1.default;
    }
    AddDebtorComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle('Create Debtor - inVoice');
    };
    AddDebtorComponent.prototype.submitForm = function () {
        var _this = this;
        this.debtorService.createDebtor(this.debtor).subscribe(function (res) {
            _this.createAddress();
        }, function (err) { return console.log(err); });
    };
    AddDebtorComponent.prototype.createAddress = function () {
        var _this = this;
        this.addressService.createAddress(this.address).subscribe(function (res) { return _this.linkAddress(); }, function (err) { return console.log(err); });
    };
    AddDebtorComponent.prototype.linkAddress = function () {
        var _this = this;
        var livesAt = new lives_at_model_1.default();
        livesAt.debtor_ssn = this.debtor.ssn;
        livesAt.address_postal = this.address.postal_code;
        livesAt.address_number = this.address.number;
        this.livesAtService.createLivesAt(livesAt).subscribe(function (resp) { return _this.router.navigate(['/debtors']); }, function (error) { return console.log(error); });
    };
    AddDebtorComponent = __decorate([
        core_1.Component({
            selector: 'app-add-debtor',
            templateUrl: './add-debtor.component.html',
            styleUrls: ['./add-debtor.component.scss']
        }),
        __metadata("design:paramtypes", [platform_browser_1.Title, router_1.ActivatedRoute,
            debtor_service_1.DebtorService, lives_at_service_1.LivesAtService, address_service_1.AddressService,
            router_1.Router])
    ], AddDebtorComponent);
    return AddDebtorComponent;
}());
exports.AddDebtorComponent = AddDebtorComponent;
//# sourceMappingURL=add-debtor.component.js.map