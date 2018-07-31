import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Invoice from '../models/invoice.model';

@Injectable()
export class InvoiceService {

    private apiUrl = 'http://invoice.jhnbos.nl:90/api/invoices/';

    constructor(public http: HttpClient) { }

    getByNumber(id: string): Observable<Invoice> {
        return this.http.get<Invoice>(this.apiUrl + 'getByNumber?invoice=' + id)
            .pipe(catchError(error => throwError(error)));
    }

    getByDebtorId(id: string): Observable<Invoice[]> {
        return this.http.get<Invoice[]>(this.apiUrl + 'getByDebtorId?debtor=' + id)
            .pipe(catchError(error => throwError(error)));
    }

    getByCreationDate(date: Date): Observable<Invoice> {
        return this.http.get<Invoice>(this.apiUrl + 'getByCreationDate?date=' + date)
            .pipe(catchError(error => throwError(error)));
    }

    getNearlyExpired(): Observable<Invoice> {
        return this.http.get<Invoice>(this.apiUrl + 'getNearlyExpired')
            .pipe(catchError(error => throwError(error)));
    }

    getAll(): Observable<Invoice[]> {
        return this.http.get<Invoice[]>(this.apiUrl + 'getAll')
            .pipe(catchError(error => throwError(error)));
    }

    create(invoice: Invoice): Observable<Invoice> {
        return this.http.post<Invoice>(this.apiUrl + 'create', invoice)
            .pipe(catchError(error => throwError(error)));
    }

    update(invoice: Invoice): Observable<Invoice> {
        return this.http.put<Invoice>(this.apiUrl + 'update', invoice)
            .pipe(catchError(error => throwError(error)));
    }

    delete(id: string): Observable<boolean> {
        return this.http.delete<boolean>(this.apiUrl + 'delete?invoice=' + id)
            .pipe(catchError(error => throwError(error)));
    }

    deleteByDebtor(id: number): Observable<boolean> {
        return this.http.delete<boolean>(this.apiUrl + 'deleteByDebtorId?debtor=' + id)
            .pipe(catchError(error => throwError(error)));
    }
}
