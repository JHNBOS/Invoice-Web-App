"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Debtor = /** @class */ (function () {
    function Debtor() {
        this.ssn = null;
        this.first_name = null;
        this.last_name = null;
        this.email = null;
        this.phone = null;
        this.bank_account = null;
    }
    Debtor.prototype.isValid = function () {
        var valid = false;
        if (this.ssn != null && this.first_name != null && this.last_name != null && this.email != null && this.bank_account != null) {
            valid = true;
        }
        return valid;
    };
    return Debtor;
}());
exports.default = Debtor;
//# sourceMappingURL=debtor.model.js.map