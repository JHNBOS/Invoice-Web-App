export default class User {
    user_id: number = null;
    first_name: string = null;
    last_name: string = null;
    email: string = null;
    profile_pic: string = null;
    password: string = null;
    role_id: number = null;
    role: string = null;

    public isValid(): boolean {
        if (this.first_name != null && this.last_name != null && this.email != null && this.password != null && this.role_id != null) {
            return true;
        }
        return false;
    }
}
