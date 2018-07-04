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
var debtor_service_1 = require("../../shared/services/debtor.service");
var router_1 = require("@angular/router");
var lives_at_service_1 = require("../../shared/services/lives-at.service");
var address_service_1 = require("../../shared/services/address.service");
var DetailDebtorComponent = /** @class */ (function () {
    function DetailDebtorComponent(titleService, route, debtorService, livesAtService, addressService, router) {
        this.titleService = titleService;
        this.route = route;
        this.debtorService = debtorService;
        this.livesAtService = livesAtService;
        this.addressService = addressService;
        this.router = router;
    }
    DetailDebtorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.titleService.setTitle('Debtor Details - inVoice');
        this.route.params.subscribe(function (params) {
            _this.debtorId = +params['id'];
            _this.getDebtor(_this.debtorId);
        });
    };
    DetailDebtorComponent.prototype.getDebtor = function (id) {
        var _this = this;
        this.debtorService.getDebtorById(id).subscribe(function (res) {
            _this.debtor = res;
            _this.getLivesAt();
        }, function (err) { return console.log(err); });
    };
    DetailDebtorComponent.prototype.getAddress = function () {
        var _this = this;
        this.addressService.getAddress(this.lives_at.address_postal, this.lives_at.address_number).subscribe(function (res) { return _this.address = res; }, function (err) { return console.log(err); });
    };
    DetailDebtorComponent.prototype.getLivesAt = function () {
        var _this = this;
        this.livesAtService.getLivesAtByDebtor(this.debtor.ssn).subscribe(function (res) {
            _this.lives_at = res;
            _this.getAddress();
        }, function (err) { return console.log(err); });
    };
    DetailDebtorComponent = __decorate([
        core_1.Component({
            selector: 'app-detail-debtor',
            templateUrl: './detail-debtor.component.html',
            styleUrls: ['./detail-debtor.component.scss']
        }),
        __metadata("design:paramtypes", [platform_browser_1.Title, router_1.ActivatedRoute,
            debtor_service_1.DebtorService, lives_at_service_1.LivesAtService, address_service_1.AddressService,
            router_1.Router])
    ], DetailDebtorComponent);
    return DetailDebtorComponent;
}());
exports.DetailDebtorComponent = DetailDebtorComponent;
//# sourceMappingURL=detail-debtor.component.js.map