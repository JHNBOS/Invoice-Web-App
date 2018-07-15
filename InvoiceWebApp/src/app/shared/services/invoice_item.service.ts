import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import InvoiceItem from '../models/invoice_item.model';

@Injectable()
export class InvoiceItemService {

    private apiUrl = 'http://localhost/api/items/';

    constructor(public http: HttpClient) { }

    getByNumber(number: number): Observable<InvoiceItem> {
        return this.http.get<InvoiceItem>(this.apiUrl + 'getByNumber?number=' + number)
            .pipe(catchError(this.handleError));
    }

    getByInvoice(id: string): Observable<InvoiceItem[]> {
        return this.http.get<InvoiceItem[]>(this.apiUrl + 'getByInvoice?invoice=' + id)
            .pipe(catchError(this.handleError));
    }

    getByName(name: string): Observable<InvoiceItem> {
        return this.http.get<InvoiceItem>(this.apiUrl + 'getByName?name=' + name)
            .pipe(catchError(this.handleError));
    }

    create(invoiceItem: InvoiceItem): Observable<InvoiceItem> {
        return this.http.post<InvoiceItem>(this.apiUrl + 'create', invoiceItem)
            .pipe(catchError(this.handleError));
    }

    update(invoiceItem: InvoiceItem): Observable<InvoiceItem> {
        return this.http.put<InvoiceItem>(this.apiUrl + 'update', invoiceItem)
            .pipe(catchError(this.handleError));
    }

    delete(number: number): Observable<boolean> {
        return this.http.delete<boolean>(this.apiUrl + 'delete?number=' + number)
            .pipe(catchError(this.handleError));
    }

    private handleError(error) {
        return Observable.throw(error);
    }
}
