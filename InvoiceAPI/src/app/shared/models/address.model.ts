export default class Address {
    street: string;
    number: number;
    suffix: string;
    postal_code: string;
    city: string;
    country: string;

    public isValid(): boolean {
        let valid = false;
        if (this.street != null && this.number != null && this.postal_code != null && this.city != null && this.country != null) {
            valid = true;
        }
        return valid;
    }
}
