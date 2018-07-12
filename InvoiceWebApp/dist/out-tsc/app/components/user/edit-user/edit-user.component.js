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
var role_service_1 = require("../../../shared/services/role.service");
var user_service_1 = require("../../../shared/services/user.service");
var EditUserComponent = /** @class */ (function () {
    function EditUserComponent(titleService, route, userService, roleService, router) {
        this.titleService = titleService;
        this.route = route;
        this.userService = userService;
        this.roleService = roleService;
        this.router = router;
        this.roles = null;
    }
    EditUserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.titleService.setTitle('Edit User - Invoice Panel');
        this.getCurrentUser();
        this.route.params.subscribe(function (params) {
            _this.email = params['email'];
            _this.getRoles();
            _this.getUser(_this.email);
        });
    };
    EditUserComponent.prototype.getRoles = function () {
        var _this = this;
        this.roleService.getAll().subscribe(function (response) { return _this.roles = response; }, function (error) { throw error; });
    };
    EditUserComponent.prototype.submitForm = function () {
        var _this = this;
        this.userService.update(this.user).subscribe(function (response) {
            if (response != null) {
                _this.fileUpload();
            }
        }, function (error) { throw error; });
    };
    EditUserComponent.prototype.getUser = function (email) {
        var _this = this;
        this.userService.getByEmail(email).subscribe(function (response) { return _this.user = response; }, function (error) { throw error; });
    };
    EditUserComponent.prototype.getCurrentUser = function () {
        this.currentUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    };
    EditUserComponent.prototype.fileUpload = function () {
        var _this = this;
        var fi = this.fileInput.nativeElement;
        if (fi.files && fi.files[0]) {
            var fileToUpload = fi.files[0];
            if (fileToUpload) {
                this.userService.upload(fileToUpload, this.user).subscribe(function (response) { return _this.router.navigate(['/users']); }, function (error) { throw error; });
            }
        }
        else {
            this.router.navigate(['/users']);
        }
    };
    __decorate([
        core_1.ViewChild('fileInput'),
        __metadata("design:type", core_1.ElementRef)
    ], EditUserComponent.prototype, "fileInput", void 0);
    EditUserComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-user',
            templateUrl: './edit-user.component.html',
            styleUrls: ['./edit-user.component.scss']
        }),
        __metadata("design:paramtypes", [platform_browser_1.Title, router_1.ActivatedRoute, user_service_1.UserService, role_service_1.RoleService, router_1.Router])
    ], EditUserComponent);
    return EditUserComponent;
}());
exports.EditUserComponent = EditUserComponent;
//# sourceMappingURL=edit-user.component.js.map