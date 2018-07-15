import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Invoice from '../models/invoice.model';

@Injectable()
export class InvoiceService {

    private apiUrl = 'http://localhost/api/invoices/';

    constructor(public http: HttpClient) { }

    getByNumber(id: string): Observable<Invoice> {
        return this.http.get<Invoice>(this.apiUrl + 'getByNumber?invoice=' + id)
            .pipe(catchError(this.handleError));
    }

    getByDebtorId(id: string): Observable<Invoice[]> {
        return this.http.get<Invoice[]>(this.apiUrl + 'getByDebtorId?debtor=' + id)
            .pipe(catchError(this.handleError));
    }

    getByCreationDate(date: Date): Observable<Invoice> {
        return this.http.get<Invoice>(this.apiUrl + 'getByCreationDate?date=' + date)
            .pipe(catchError(this.handleError));
    }

    getNearlyExpired(): Observable<Invoice> {
        return this.http.get<Invoice>(this.apiUrl + 'getNearlyExpired')
            .pipe(catchError(this.handleError));
    }

    getAll(): Observable<Invoice[]> {
        return this.http.get<Invoice[]>(this.apiUrl + 'getAll')
            .pipe(catchError(this.handleError));
    }

    create(invoice: Invoice): Observable<Invoice> {
        return this.http.post<Invoice>(this.apiUrl + 'create', invoice)
            .pipe(catchError(this.handleError));
    }

    update(invoice: Invoice): Observable<Invoice> {
        return this.http.put<Invoice>(this.apiUrl + 'update', invoice)
            .pipe(catchError(this.handleError));
    }

    delete(id: string): Observable<boolean> {
        return this.http.delete<boolean>(this.apiUrl + 'delete?invoice=' + id)
            .pipe(catchError(this.handleError));
    }

    deleteByDebtor(id: number): Observable<boolean> {
        return this.http.delete<boolean>(this.apiUrl + 'deleteByDebtorId?debtor=' + id)
            .pipe(catchError(this.handleError));
    }

    private handleError(error) {
        return Observable.throw(error);
    }
}
