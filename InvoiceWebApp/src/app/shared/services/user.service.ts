import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import User from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

    private apiUrl = 'http://localhost/api/users/';

    constructor(public http: HttpClient) { }

    getByEmail(email: string): Observable<User> {
        return this.http.get<User>(this.apiUrl + 'getByEmail?email=' + email)
            .pipe(catchError(this.handleError));
    }

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl + 'getAll')
            .pipe(catchError(this.handleError));
    }

    checkCredentials(email: string, password: string): Observable<User> {
        return this.http.get<User>(this.apiUrl + 'authenticate?email=' + email + '&password=' + password)
            .pipe(catchError(this.handleError));
    }

    create(user: User): Observable<User> {
        return this.http.post<User>(this.apiUrl + 'create', user)
            .pipe(catchError(this.handleError));
    }

    update(user: User): Observable<User> {
        return this.http.put<User>(this.apiUrl + 'update', user)
            .pipe(catchError(this.handleError));
    }

    delete(email: string): Observable<boolean> {
        return this.http.delete<boolean>(this.apiUrl + 'delete?email=' + email)
            .pipe(catchError(this.handleError));
    }

    upload(file: any, user: User): Observable<User> {
        let formData = new FormData();
        formData.append("file", file);
        formData.append("model", JSON.stringify(user));

        return this.http.post<User>(this.apiUrl + 'upload', formData)
            .pipe(catchError(this.handleError));
    }

    resetPassword(email: string): Observable<any> {
        return this.http.get(this.apiUrl + 'resetPassword?email=' + email)
            .pipe(catchError(this.handleError));
    }

    private handleError(error: any) {
        return Observable.throw(error);
    }
}
