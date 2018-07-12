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
var ng2_toasty_1 = require("ng2-toasty");
var address_model_1 = require("../../../shared/models/address.model");
var debtor_model_1 = require("../../../shared/models/debtor.model");
var debtor_has_address_model_1 = require("../../../shared/models/debtor_has_address.model");
var address_service_1 = require("../../../shared/services/address.service");
var debtor_service_1 = require("../../../shared/services/debtor.service");
var debtor_has_address_service_1 = require("../../../shared/services/debtor_has_address.service");
var ImportDebtorComponent = /** @class */ (function () {
    function ImportDebtorComponent(titleService, debtorService, addressService, debtorHasAddressService, toastyService, route, router) {
        this.titleService = titleService;
        this.debtorService = debtorService;
        this.addressService = addressService;
        this.debtorHasAddressService = debtorHasAddressService;
        this.toastyService = toastyService;
        this.route = route;
        this.router = router;
        this.debtors = [];
        this.addresses = [];
        this.livesAts = [];
        this.titleService.setTitle('Import Debtors - Invoice Panel');
        this.toastOptions = {
            title: 'Success',
            msg: 'Debtor(s) have been successfully added!',
            theme: ' bootstrap',
            showClose: true,
            timeout: 4000
        };
    }
    ImportDebtorComponent.prototype.ngOnInit = function () { };
    ImportDebtorComponent.prototype.upload = function (event) {
        this.extractData(event.target);
    };
    ImportDebtorComponent.prototype.mapToDebtor = function (data) {
        var debtor = new debtor_model_1.default();
        debtor.id = data[0];
        debtor.first_name = data[1];
        debtor.last_name = data[2];
        debtor.email = data[3];
        debtor.phone = data[4];
        debtor.bank_account = data[5];
        var address = new address_model_1.default();
        address.street = data[6];
        address.number = Number.parseInt(data[7]);
        address.suffix = data[8];
        address.postal_code = data[9];
        address.city = data[10];
        address.country = data[11];
        var livesAt = new debtor_has_address_model_1.default();
        livesAt.debtor_id = debtor.id;
        livesAt.address_postal = address.postal_code;
        livesAt.address_number = address.number;
        this.debtors.push(debtor);
        this.addresses.push(address);
        this.livesAts.push(livesAt);
    };
    ImportDebtorComponent.prototype.extractData = function (fileInput) {
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
                    _this.mapToDebtor(tarr);
                }
            }
            _this.saveDebtors();
        };
    };
    ImportDebtorComponent.prototype.saveDebtors = function () {
        var _this = this;
        var count = 0;
        for (var i = 0; i < this.debtors.length; i++) {
            var debtor = this.debtors[i];
            this.debtorService.create(debtor).subscribe(function (res) {
                count++;
                if (count === _this.debtors.length) {
                    _this.toastyService.success(_this.toastOptions);
                }
            }, function (error) { throw error; });
        }
        this.createAddresses();
    };
    ImportDebtorComponent.prototype.createAddresses = function () {
        var _this = this;
        for (var i = 0; i < this.addresses.length; i++) {
            var address = this.addresses[i];
            this.addressService.create(address).subscribe(function (res) { return _this.linkAddress(); }, function (error) { throw error; });
        }
        setTimeout(function () {
            _this.router.navigate(['/debtors']);
        }, 3000);
    };
    ImportDebtorComponent.prototype.linkAddress = function () {
        for (var i = 0; i < this.livesAts.length; i++) {
            var livesAt = this.livesAts[i];
            this.debtorHasAddressService.create(livesAt).subscribe(function (res) { }, function (error) { throw error; });
        }
    };
    ImportDebtorComponent = __decorate([
        core_1.Component({
            selector: 'app-import-debtor',
            templateUrl: './import-debtor.component.html',
            styleUrls: ['./import-debtor.component.scss']
        }),
        __metadata("design:paramtypes", [platform_browser_1.Title, debtor_service_1.DebtorService, address_service_1.AddressService,
            debtor_has_address_service_1.DebtorHasAddressService, ng2_toasty_1.ToastyService, router_1.ActivatedRoute, router_1.Router])
    ], ImportDebtorComponent);
    return ImportDebtorComponent;
}());
exports.ImportDebtorComponent = ImportDebtorComponent;
//# sourceMappingURL=import-debtor.component.js.map