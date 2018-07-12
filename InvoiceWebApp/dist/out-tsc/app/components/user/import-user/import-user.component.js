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
var user_service_1 = require("../../../shared/services/user.service");
var ImportUserComponent = /** @class */ (function () {
    function ImportUserComponent(titleService, userService, route, router) {
        this.titleService = titleService;
        this.userService = userService;
        this.route = route;
        this.router = router;
        this.users = [];
    }
    ImportUserComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle('Import Users - Invoice Panel');
    };
    ImportUserComponent.prototype.upload = function (event) {
        this.extractData(event.target);
    };
    ImportUserComponent.prototype.mapToUser = function (data) {
        var user = new user_model_1.default();
        user.first_name = data[0];
        user.last_name = data[1];
        user.email = data[2];
        user.password = data[3];
        user.picture = data[4];
        user.role_id = data[5];
        this.users.push(user);
    };
    ImportUserComponent.prototype.extractData = function (fileInput) {
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
                    _this.mapToUser(tarr);
                }
            }
            _this.saveUsers();
        };
    };
    ImportUserComponent.prototype.saveUsers = function () {
        var _this = this;
        var count = 0;
        for (var i = 0; i < this.users.length; i++) {
            var user = this.users[i];
            this.userService.create(user).subscribe(function (response) { }, function (error) { throw (error); });
        }
        setTimeout(function () {
            _this.router.navigate(['/users']);
        }, 500);
    };
    ImportUserComponent = __decorate([
        core_1.Component({
            selector: 'app-import-user',
            templateUrl: './import-user.component.html',
            styleUrls: ['./import-user.component.scss']
        }),
        __metadata("design:paramtypes", [platform_browser_1.Title, user_service_1.UserService, router_1.ActivatedRoute, router_1.Router])
    ], ImportUserComponent);
    return ImportUserComponent;
}());
exports.ImportUserComponent = ImportUserComponent;
//# sourceMappingURL=import-user.component.js.map