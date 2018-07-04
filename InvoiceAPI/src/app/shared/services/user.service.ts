import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/share';

import User from '../models/user.model';

@Injectable()
export class UserService {

    private apiUrl = 'http://localhost/api/users/';

    constructor(public http: HttpClient) { }

    getByEmail(email: string): Observable<User> {
        return this.http.get(this.apiUrl + 'getByEmail?email=' + email)
            .catch(this.handleError);
    }

    getAll(): Observable<User[]> {
        return this.http.get<any>(this.apiUrl + 'getAll')
            .catch(this.handleError);
    }

    checkCredentials(email: string, password: string): Observable<User> {
        return this.http.get(this.apiUrl + 'authenticate?email=' + email + '&password=' + password)
            .catch(this.handleError);
    }

    create(user: User): Observable<User> {
        return this.http.post(this.apiUrl + 'create', user)
            .catch(this.handleError);
    }

    update(user: User): Observable<User> {
        return this.http.put(this.apiUrl + 'update', user)
            .catch(this.handleError);
    }

    delete(email: string): Observable<boolean> {
        return this.http.delete(this.apiUrl + 'delete?email=' + email)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        return Observable.throw(error);
    }
}
