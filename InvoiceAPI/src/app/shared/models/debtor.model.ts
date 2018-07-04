export default class Debtor {
    ssn: number= null;
    first_name: string = null;
    last_name: string = null;
    email: string = null;
    phone: string = null;
    bank_account: string = null;

    public isValid(): boolean {
        let valid = false;
        if (this.ssn != null && this.first_name != null && this.last_name != null && this.email != null && this.bank_account != null) {
            valid = true;
        }
        return valid;
    }
}
