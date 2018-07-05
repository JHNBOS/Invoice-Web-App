import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import Invoice from '../models/invoice.model';

@Injectable()
export class InvoiceService {

    private apiUrl = 'http://localhost/api/invoices/';

    constructor(public http: HttpClient) { }

    getByNumber(id: number): Observable<Invoice> {
        return this.http.get(this.apiUrl + 'getByNumber?invoice=' + id)
            .catch(this.handleError);
    }

    getByDebtorId(id: string): Observable<Invoice> {
        return this.http.get(this.apiUrl + 'getByDebtorId?debtor=' + id)
            .catch(this.handleError);
    }

    getByCreationDate(date: Date): Observable<Invoice> {
        return this.http.get(this.apiUrl + 'getByCreationDate?date=' + date)
            .catch(this.handleError);
    }

    getNearlyExpired(): Observable<Invoice> {
        return this.http.get(this.apiUrl + 'getNearlyExpired')
            .catch(this.handleError);
    }

    getAll(): Observable<Invoice[]> {
        return this.http.get(this.apiUrl + 'getAll')
            .catch(this.handleError);
    }

    create(invoice: Invoice): Observable<Invoice> {
        return this.http.post(this.apiUrl + 'create', invoice)
            .catch(this.handleError);
    }

    update(invoice: Invoice): Observable<Invoice> {
        return this.http.put(this.apiUrl + 'update', invoice)
            .catch(this.handleError);
    }

    delete(number: number): Observable<boolean> {
        return this.http.delete(this.apiUrl + 'delete?invoice=' + number)
            .catch(this.handleError);
    }

    deleteByDebtor(id: number): Observable<boolean> {
        return this.http.delete(this.apiUrl + 'deleteByDebtorId?debtor=' + id)
            .catch(this.handleError);
    }

    private handleError(error) {
        return Observable.throw(error);
    }
}
