export default class Address {
    street: string = null;
    number: number = null;
    suffix: string = null;
    postal_code: string = null;
    city: string = null;
    country: string = null;

    public isValid(): boolean {
        if (this.street != null && this.number != null && this.postal_code != null && this.city != null && this.country != null) {
            return true;
        }
        return false;
    }
}
