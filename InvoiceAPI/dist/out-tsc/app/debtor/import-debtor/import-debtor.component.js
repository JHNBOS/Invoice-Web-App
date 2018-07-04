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
var debtor_service_1 = require("../../shared/services/debtor.service");
var ng2_toasty_1 = require("ng2-toasty");
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var address_service_1 = require("../../shared/services/address.service");
var lives_at_service_1 = require("../../shared/services/lives-at.service");
var lives_at_model_1 = require("../../shared/models/lives_at.model");
var address_model_1 = require("../../shared/models/address.model");
var ImportDebtorComponent = /** @class */ (function () {
    function ImportDebtorComponent(titleService, debtorService, addressService, livesAtService, toastyService, route, router) {
        this.titleService = titleService;
        this.debtorService = debtorService;
        this.addressService = addressService;
        this.livesAtService = livesAtService;
        this.toastyService = toastyService;
        this.route = route;
        this.router = router;
        this.debtors = [];
        this.addresses = [];
        this.livesAts = [];
        this.titleService.setTitle('Import Debtors - inVoice');
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
        debtor.ssn = Number.parseInt(data[0]);
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
        var livesAt = new lives_at_model_1.default();
        livesAt.debtor_ssn = debtor.ssn;
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
            this.debtorService.createDebtor(debtor).subscribe(function (res) {
                count++;
                if (count === _this.debtors.length) {
                    _this.toastyService.success(_this.toastOptions);
                }
            }, function (err) { throw (err); });
        }
        this.createAddresses();
    };
    ImportDebtorComponent.prototype.createAddresses = function () {
        var _this = this;
        for (var i = 0; i < this.addresses.length; i++) {
            var address = this.addresses[i];
            this.addressService.createAddress(address).subscribe(function (res) { return _this.linkAddress(); }, function (err) { return console.log(err); });
        }
        setTimeout(function () {
            _this.router.navigate(['/debtors']);
        }, 3000);
    };
    ImportDebtorComponent.prototype.linkAddress = function () {
        for (var i = 0; i < this.livesAts.length; i++) {
            var livesAt = this.livesAts[i];
            this.livesAtService.createLivesAt(livesAt).subscribe(function (res) { }, function (err) { return console.log(err); });
        }
    };
    ImportDebtorComponent = __decorate([
        core_1.Component({
            selector: 'app-import-debtor',
            templateUrl: './import-debtor.component.html',
            styleUrls: ['./import-debtor.component.scss']
        }),
        __metadata("design:paramtypes", [platform_browser_1.Title, debtor_service_1.DebtorService,
            address_service_1.AddressService, lives_at_service_1.LivesAtService,
            ng2_toasty_1.ToastyService, router_1.ActivatedRoute, router_1.Router])
    ], ImportDebtorComponent);
    return ImportDebtorComponent;
}());
exports.ImportDebtorComponent = ImportDebtorComponent;
//# sourceMappingURL=import-debtor.component.js.map