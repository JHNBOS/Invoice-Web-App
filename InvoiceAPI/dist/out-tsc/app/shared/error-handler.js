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
var ng2_toasty_1 = require("ng2-toasty");
var core_2 = require("@angular/core");
var http_1 = require("@angular/common/http");
var CustomErrorHandler = /** @class */ (function () {
    function CustomErrorHandler(ngZone, toastyService) {
        this.ngZone = ngZone;
        this.toastyService = toastyService;
        this.toastOptions = {
            title: 'Oops, an error occured',
            msg: '',
            theme: ' bootstrap',
            showClose: true,
            timeout: 4000
        };
    }
    CustomErrorHandler.prototype.handleError = function (error) {
        var _this = this;
        console.log('An error occured!', error);
        this.ngZone.run(function () {
            if (typeof (window) !== 'undefined') {
                var date = new Date().toISOString();
                // Set message based on error
                if (error instanceof http_1.HttpErrorResponse) {
                    _this.toastOptions.msg = 'An error occured while your request was being processed, please try again!';
                    console.error(date, 'HTTP Error.', error.message, 'Status code:', error.status);
                }
                else if (error instanceof TypeError) {
                    _this.toastOptions.msg = 'An error occured, please try again!';
                    console.error(date, 'Typescript Error', error.message);
                }
                else if (error instanceof Error) {
                    _this.toastOptions.msg = 'An error occured, please try again!';
                    console.error(date, 'General Error', error.message);
                }
                else {
                    _this.toastOptions.msg = 'Something unexpected happened, please try again!';
                    console.error(date, 'Unexpected Error', error.message);
                }
                // Show message
                _this.toastyService.error(_this.toastOptions);
            }
        });
    };
    CustomErrorHandler = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_2.NgZone, ng2_toasty_1.ToastyService])
    ], CustomErrorHandler);
    return CustomErrorHandler;
}());
exports.CustomErrorHandler = CustomErrorHandler;
//# sourceMappingURL=error-handler.js.map