"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User() {
        this.user_id = null;
        this.first_name = null;
        this.last_name = null;
        this.email = null;
        this.profile_pic = null;
        this.password = null;
    }
    User.prototype.isValid = function () {
        var valid = false;
        if (this.first_name != null && this.last_name != null && this.email != null && this.password != null) {
            valid = true;
        }
        return valid;
    };
    return User;
}());
exports.default = User;
//# sourceMappingURL=user.model.js.map