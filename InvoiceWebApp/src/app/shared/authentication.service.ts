import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import User from './models/user.model';

@Injectable()
export class AuthenticationService {
    private apiUrl = 'http://localhost/api/users/';

    constructor(private http: HttpClient, private router: Router) { }

    login(email: string, password: string): Observable<User> {
        return this.http.get(this.apiUrl + 'authenticate?email=' + email + '&password=' + password)
            .catch(this.handleError);
    }

    logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('loggedInUser');
    }

    private handleError(error) {
        return Observable.throw(error);
    }
}
