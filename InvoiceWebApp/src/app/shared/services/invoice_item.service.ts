import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import InvoiceItem from '../models/invoice_item.model';

@Injectable()
export class InvoiceItemService {

    private apiUrl = environment.apiBase + '/items/';

    constructor(public http: HttpClient) { }

    getByNumber(number: number): Observable<InvoiceItem> {
        return this.http.get<InvoiceItem>(this.apiUrl + 'getByNumber?number=' + number)
            .pipe(catchError(error => throwError(error)));
    }

    getByInvoice(id: string): Observable<InvoiceItem[]> {
        return this.http.get<InvoiceItem[]>(this.apiUrl + 'getByInvoice?invoice=' + id)
            .pipe(catchError(error => throwError(error)));
    }

    getByName(name: string): Observable<InvoiceItem> {
        return this.http.get<InvoiceItem>(this.apiUrl + 'getByName?name=' + name)
            .pipe(catchError(error => throwError(error)));
    }

    create(invoiceItem: InvoiceItem): Observable<InvoiceItem> {
        return this.http.post<InvoiceItem>(this.apiUrl + 'create', invoiceItem)
            .pipe(catchError(error => throwError(error)));
    }

    update(invoiceItem: InvoiceItem): Observable<InvoiceItem> {
        return this.http.put<InvoiceItem>(this.apiUrl + 'update', invoiceItem)
            .pipe(catchError(error => throwError(error)));
    }

    delete(number: number): Observable<boolean> {
        return this.http.delete<boolean>(this.apiUrl + 'delete?number=' + number)
            .pipe(catchError(error => throwError(error)));
    }
}
