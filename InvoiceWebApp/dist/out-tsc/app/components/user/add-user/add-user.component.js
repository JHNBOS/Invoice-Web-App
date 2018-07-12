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
var user_model_1 = require("../../../shared/models/user.model");
var role_service_1 = require("../../../shared/services/role.service");
var user_service_1 = require("../../../shared/services/user.service");
var AddUserComponent = /** @class */ (function () {
    function AddUserComponent(titleService, route, userService, roleService, router) {
        this.titleService = titleService;
        this.route = route;
        this.userService = userService;
        this.roleService = roleService;
        this.router = router;
        this.currentUser = new user_model_1.default;
        this.roles = null;
    }
    AddUserComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle('Create User - Invoice Panel');
        this.getRoles();
    };
    AddUserComponent.prototype.getRoles = function () {
        var _this = this;
        this.roleService.getAll().subscribe(function (response) { return _this.roles = response; }, function (error) { throw error; });
    };
    AddUserComponent.prototype.submitForm = function () {
        var _this = this;
        this.userService.create(this.currentUser).subscribe(function (response) {
            if (response != null) {
                _this.fileUpload();
            }
        }, function (error) { throw error; });
    };
    AddUserComponent.prototype.fileUpload = function () {
        var _this = this;
        var fi = this.fileInput.nativeElement;
        if (fi.files && fi.files[0]) {
            var fileToUpload = fi.files[0];
            if (fileToUpload) {
                this.userService.upload(fileToUpload, this.currentUser).subscribe(function (response) { return _this.router.navigate(['/users']); }, function (error) { throw (error); });
            }
        }
        else {
            this.router.navigate(['/users']);
        }
    };
    __decorate([
        core_1.ViewChild('fileInput'),
        __metadata("design:type", core_1.ElementRef)
    ], AddUserComponent.prototype, "fileInput", void 0);
    AddUserComponent = __decorate([
        core_1.Component({
            selector: 'app-add-user',
            templateUrl: './add-user.component.html',
            styleUrls: ['./add-user.component.scss']
        }),
        __metadata("design:paramtypes", [platform_browser_1.Title, router_1.ActivatedRoute, user_service_1.UserService, role_service_1.RoleService, router_1.Router])
    ], AddUserComponent);
    return AddUserComponent;
}());
exports.AddUserComponent = AddUserComponent;
//# sourceMappingURL=add-user.component.js.map