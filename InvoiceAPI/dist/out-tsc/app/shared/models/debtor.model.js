"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Debtor = /** @class */ (function () {
    function Debtor() {
        this.id = null;
        this.first_name = null;
        this.last_name = null;
        this.company_name = null;
        this.email = null;
        this.phone = null;
        this.bank_account = null;
        this.address = null;
    }
    Debtor.prototype.isValid = function () {
        if (this.id != null && ((this.first_name != null && this.last_name != null) || this.company_name != null) && (this.email != null || this.phone != null) && this.bank_account != null) {
            return true;
        }
        return false;
    };
    return Debtor;
}());
exports.default = Debtor;
//# sourceMappingURL=debtor.model.js.map