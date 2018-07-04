import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/share';

import Invoice from '../models/invoice.model';
import InvoiceRow from '../models/invoice-row.model';

@Injectable()
export class InvoiceService {

  private apiUrl = 'http://jhnbos.nl/invoice-api/invoices/';

  constructor(public http: HttpClient) { }

  getInvoiceByNumber(id: number): Observable<Invoice> {
    return this.http.get<any>(this.apiUrl + 'read.php?number=' + id)
      .map(res => res[0] as Invoice)
      .share()
      .catch(this.handleError);
  }

  getAllInvoices(): Observable<Invoice[]> {
    return this.http.get<any>(this.apiUrl + 'readAll.php')
      .map(res => res as Invoice[])
      .share()
      .catch(this.handleError);
  }

  createInvoice(invoice: Invoice): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.apiUrl + 'create.php', invoice)
      .map(res => res as Invoice[])
      .share()
      .catch(this.handleError);
  }

  insertInvoiceItems(items: InvoiceRow[]): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.apiUrl + 'insert-items.php', items)
      .map(res => res as InvoiceRow[])
      .share()
      .catch(this.handleError);
  }

  updateInvoice(invoice: Invoice): Observable<any> {
    return this.http.post(this.apiUrl + 'update.php', invoice)
      .map(res => res as Invoice[])
      .share()
      .catch(this.handleError);
  }

  deleteInvoiceByNumber(id: number) {
    return this.http.post(this.apiUrl + 'delete.php?number=' + id, {})
      .map(res => res)
      .share()
      .catch(this.handleError);
  }

  deleteInvoiceByDebtor(id: number) {
    return this.http.post(this.apiUrl + 'delete.php?id=' + id, {})
      .map(res => res)
      .share()
      .catch(this.handleError);
  }

  private handleError(error) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.log(errMsg);
    return Observable.throw(errMsg);
  }
}
