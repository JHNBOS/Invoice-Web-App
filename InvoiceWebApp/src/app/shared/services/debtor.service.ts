import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Debtor from '../models/debtor.model';

@Injectable()
export class DebtorService {

    private apiUrl = 'http://localhost/api/debtors/';

    constructor(public http: HttpClient) { }

    getByEmail(email: string): Observable<Debtor> {
        return this.http.get<Debtor>(this.apiUrl + 'getByEmail?email=' + email)
            .pipe(catchError(error => throwError(error)));
    }

    getById(id: string): Observable<Debtor> {
        return this.http.get<Debtor>(this.apiUrl + 'getById?id=' + id)
            .pipe(catchError(error => throwError(error)));
    }

    getAll(): Observable<Debtor[]> {
        return this.http.get<Debtor[]>(this.apiUrl + 'getAll')
            .pipe(catchError(error => throwError(error)));
    }

    create(debtor: Debtor): Observable<Debtor> {
        return this.http.post<Debtor>(this.apiUrl + 'create', debtor)
            .pipe(catchError(error => throwError(error)));
    }

    update(debtor: Debtor): Observable<Debtor> {
        return this.http.put<Debtor>(this.apiUrl + 'update', debtor)
            .pipe(catchError(error => throwError(error)));
    }

    delete(id: string): Observable<boolean> {
        return this.http.delete<boolean>(this.apiUrl + 'delete?id=' + id)
            .pipe(catchError(error => throwError(error)));
    }
}
