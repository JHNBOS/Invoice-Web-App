"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Address = /** @class */ (function () {
    function Address() {
    }
    Address.prototype.isValid = function () {
        var valid = false;
        if (this.street != null && this.number != null && this.postal_code != null && this.city != null && this.country != null) {
            valid = true;
        }
        return valid;
    };
    return Address;
}());
exports.default = Address;
//# sourceMappingURL=address.model.js.map