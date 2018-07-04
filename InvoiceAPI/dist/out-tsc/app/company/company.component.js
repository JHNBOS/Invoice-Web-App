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
var company_service_1 = require("../shared/services/company.service");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var ng2_toasty_1 = require("ng2-toasty");
var CompanyComponent = /** @class */ (function () {
    function CompanyComponent(titleService, route, companyService, router, toastyService, toastyConfig) {
        this.titleService = titleService;
        this.route = route;
        this.companyService = companyService;
        this.router = router;
        this.toastyService = toastyService;
        this.toastyConfig = toastyConfig;
        this.companies = [];
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
    CompanyComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle('Companies - inVoice');
        this.getAllCompanies();
    };
    CompanyComponent.prototype.getAllCompanies = function () {
        var _this = this;
        this.companyService.getAllCompanies().subscribe(function (res) {
            if (res.toString() !== 'No companies available!') {
                _this.companies = res;
            }
        }, function (err) {
            _this.toastOptions.title = 'Oops, an error occured';
            _this.toastOptions.msg = 'Unable to retrieve companies. Please try again!';
            _this.toastyService.error(_this.toastOptions);
        });
    };
    CompanyComponent.prototype.deleteCompany = function (id) {
        var _this = this;
        if (confirm('Are you sure you want to delete this company?')) {
            this.companyService.deleteCompanyByNumber(id).subscribe(function (res) { return _this.ngOnInit(); }, function (err) {
                _this.toastOptions.title = 'Oops, an error occured';
                _this.toastOptions.msg = 'Unable to remove company. Please try again!';
                _this.toastyService.error(_this.toastOptions);
            });
        }
    };
    CompanyComponent = __decorate([
        core_1.Component({
            selector: 'app-company',
            templateUrl: './company.component.html',
            styleUrls: ['./company.component.scss']
        }),
        __metadata("design:paramtypes", [platform_browser_1.Title, router_1.ActivatedRoute,
            company_service_1.CompanyService, router_1.Router, ng2_toasty_1.ToastyService,
            ng2_toasty_1.ToastyConfig])
    ], CompanyComponent);
    return CompanyComponent;
}());
exports.CompanyComponent = CompanyComponent;
//# sourceMappingURL=company.component.js.map