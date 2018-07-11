import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import InvoiceItem from '../models/invoice_item.model';

@Injectable()
export class InvoiceItemService {

    private apiUrl = 'http://localhost/api/items/';

    constructor(public http: HttpClient) { }

    getByNumber(number: number): Observable<InvoiceItem> {
        return this.http.get(this.apiUrl + 'getByNumber?number=' + number)
            .catch(this.handleError);
    }

    getByInvoice(id: string): Observable<InvoiceItem[]> {
        return this.http.get(this.apiUrl + 'getByInvoice?invoice=' + id)
            .catch(this.handleError);
    }

    getByName(name: string): Observable<InvoiceItem> {
        return this.http.get(this.apiUrl + 'getByName?name=' + name)
            .catch(this.handleError);
    }

    create(invoiceItem: InvoiceItem): Observable<InvoiceItem> {
        return this.http.post(this.apiUrl + 'create', invoiceItem)
            .catch(this.handleError);
    }

    update(invoiceItem: InvoiceItem): Observable<InvoiceItem> {
        return this.http.put(this.apiUrl + 'update', invoiceItem)
            .catch(this.handleError);
    }

    delete(number: number): Observable<boolean> {
        return this.http.delete(this.apiUrl + 'delete?number=' + number)
            .catch(this.handleError);
    }

    private handleError(error) {
        return Observable.throw(error);
    }
}
