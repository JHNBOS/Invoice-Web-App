"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DebtorViewModel = /** @class */ (function () {
    function DebtorViewModel() {
        this.ssn = null;
        this.first_name = null;
        this.last_name = null;
        this.email = null;
        this.phone = null;
        this.bank_account = null;
    }
    DebtorViewModel.prototype.setDebtorString = function () {
        this.full = this.ssn + ' - ' + this.first_name + ' ' + this.last_name + ' from ' + this.city + ', ' + this.country;
    };
    return DebtorViewModel;
}());
exports.default = DebtorViewModel;
//# sourceMappingURL=debtor.viewmodel.js.map