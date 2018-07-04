export default class DebtorViewModel {
    ssn: number = null;
    first_name: string = null;
    last_name: string = null;
    email: string = null;
    phone: string = null;
    bank_account: string = null;

    street: string;
    number: number;
    suffix: string;
    postal_code: string;
    city: string;
    country: string;

    full: string;

    setDebtorString() {
        this.full =  this.ssn + ' - ' + this.first_name + ' ' + this.last_name + ' from ' + this.city + ', ' + this.country;
    }
}
