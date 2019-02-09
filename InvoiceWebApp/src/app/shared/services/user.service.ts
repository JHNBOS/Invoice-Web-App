import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { PaginationResult } from '../models/pagination.result';
import User from '../models/user.model';

@Injectable()
export class UserService {
    private apiUrl = environment.apiBase + '/users/';

    constructor(public http: HttpClient) { }

    getByEmail(email: string): Observable<User> {
        return this.http.get<User>(this.apiUrl + 'getByEmail?email=' + email)
            .pipe(catchError(error => throwError(error)));
    }

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl + 'getAll')
            .pipe(catchError(error => throwError(error)));
    }

    index(page: number, pageSize: number = 10): Observable<PaginationResult<User>> {
        return this.http.get<PaginationResult<User>>(this.apiUrl + 'index?page=' + page + '&pageSize=' + pageSize)
            .pipe(catchError(error => throwError(error)));
    }

    checkCredentials(email: string, password: string): Observable<User> {
        return this.http.get<User>(this.apiUrl + 'authenticate?email=' + email + '&password=' + password)
            .pipe(catchError(error => throwError(error)));
    }

    create(user: User): Observable<User> {
        return this.http.post<User>(this.apiUrl + 'create', user)
            .pipe(catchError(error => throwError(error)));
    }

    update(user: User): Observable<User> {
        return this.http.put<User>(this.apiUrl + 'update', user)
            .pipe(catchError(error => throwError(error)));
    }

    delete(email: string): Observable<boolean> {
        return this.http.delete<boolean>(this.apiUrl + 'delete?email=' + email)
            .pipe(catchError(error => throwError(error)));
    }

    upload(file: any, user: User): Observable<User> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('model', JSON.stringify(user));

        return this.http.post<User>(this.apiUrl + 'upload', formData)
            .pipe(catchError(error => throwError(error)));
    }

    resetPassword(email: string): Observable<any> {
        return this.http.get(this.apiUrl + 'resetPassword?email=' + email)
            .pipe(catchError(error => throwError(error)));
    }
}
