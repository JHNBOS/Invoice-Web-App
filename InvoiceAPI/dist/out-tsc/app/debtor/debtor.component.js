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
var debtor_service_1 = require("../shared/services/debtor.service");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var ng2_toasty_1 = require("ng2-toasty");
var DebtorComponent = /** @class */ (function () {
    function DebtorComponent(titleService, route, debtorService, router, toastyService, toastyConfig) {
        this.titleService = titleService;
        this.route = route;
        this.debtorService = debtorService;
        this.router = router;
        this.toastyService = toastyService;
        this.toastyConfig = toastyConfig;
        this.debtors = [];
        this.toastOptions = {
            title: '',
            msg: '',
            showClose: true,
            timeout: 5000,
            theme: 'default'
        };
        // Set toast theme
        this.toastyConfig.theme = 'default';
    }
    DebtorComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle('Debtors - inVoice');
        this.getAllDebtors();
    };
    DebtorComponent.prototype.getAllDebtors = function () {
        var _this = this;
        this.debtorService.getAllDebtors().subscribe(function (res) {
            if (res.toString() !== 'No debtors available!') {
                _this.debtors = res;
            }
        }, function (err) {
            _this.toastOptions.title = 'Oops, an error occured';
            _this.toastOptions.msg = 'Unable to retrieve debtors. Please try again!';
            _this.toastyService.error(_this.toastOptions);
        });
    };
    DebtorComponent.prototype.deleteDebtor = function (id) {
        var _this = this;
        if (confirm('Are you sure you want to delete this debtor?')) {
            this.debtorService.deleteDebtorById(id).subscribe(function (res) { return _this.ngOnInit(); }, function (err) {
                _this.toastOptions.title = 'Oops, an error occured';
                _this.toastOptions.msg = 'Unable to remove debtor. Please try again!';
                _this.toastyService.error(_this.toastOptions);
            });
        }
    };
    DebtorComponent = __decorate([
        core_1.Component({
            selector: 'app-debtor',
            templateUrl: './debtor.component.html',
            styleUrls: ['./debtor.component.scss']
        }),
        __metadata("design:paramtypes", [platform_browser_1.Title, router_1.ActivatedRoute,
            debtor_service_1.DebtorService, router_1.Router, ng2_toasty_1.ToastyService,
            ng2_toasty_1.ToastyConfig])
    ], DebtorComponent);
    return DebtorComponent;
}());
exports.DebtorComponent = DebtorComponent;
//# sourceMappingURL=debtor.component.js.map