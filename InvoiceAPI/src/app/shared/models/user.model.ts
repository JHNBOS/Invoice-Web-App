export default class User {
    user_id: number = null;
    first_name: string = null;
    last_name: string = null;
    email: string = null;
    profile_pic: string = null;
    password: string = null;

    public isValid(): boolean {
        let valid = false;
        if (this.first_name != null && this.last_name != null && this.email != null && this.password != null) {
            valid = true;
        }
        return valid;
    }
}
