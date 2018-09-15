import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import User from './models/user.model';

@Injectable()
export class AuthenticationService {
    private apiUrl = environment.apiBase + '/users/';

    constructor(private http: HttpClient, private router: Router) { }

    login(email: string, password: string): Observable<User> {
        return this.http.get<User>(this.apiUrl + 'authenticate?email=' + email + '&password=' + password)
            .pipe(catchError(error => throwError(error)));
    }

    logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('signedInUser');
    }
}
