"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InvoiceRow = /** @class */ (function () {
    function InvoiceRow() {
        this.id = null;
        this.invoice_number = null;
        this.name = null;
        this.description = null;
        this.tax = null;
        this.price = null;
        this.discount = null;
        this.quantity = null;
    }
    InvoiceRow.prototype.isValid = function () {
        var valid = false;
        if (this.id != null && this.name != null && this.tax != null && this.price != null && this.discount != null) {
            valid = true;
        }
        return valid;
    };
    return InvoiceRow;
}());
exports.default = InvoiceRow;
//# sourceMappingURL=invoice-row.model.js.map