"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Address = /** @class */ (function () {
    function Address() {
        this.street = null;
        this.number = null;
        this.suffix = null;
        this.postal_code = null;
        this.city = null;
        this.country = null;
    }
    Address.prototype.isValid = function () {
        if (this.street != null && this.number != null && this.postal_code != null && this.city != null && this.country != null) {
            return true;
        }
        return false;
    };
    return Address;
}());
exports.default = Address;
//# sourceMappingURL=address.model.js.map