import Address from "./address.model";

export default class Debtor {
    id: string = null;
    first_name: string = null;
    last_name: string = null;
    company_name: string = null;
    email: string = null;
    phone: string = null;
    bank_account: string = null;
    address: Address = null;
    showLine: string = null;

    public isValid(): boolean {
        if (this.id != null && ((this.first_name != null && this.last_name != null) || this.company_name != null) && (this.email != null || this.phone != null) && this.bank_account != null) {
            return true;
        }
        return false;
    }

    setDebtorString() {
        if (this.company_name == null) {
            this.showLine = this.id + ' - ' + this.first_name + ' ' + this.last_name + ' from ' + this.address.city + ', ' + this.address.country;
        } else {
            this.showLine = this.id + ' - ' + this.company_name + ' in ' + this.address.city + ', ' + this.address.country;
        }
    }
}
