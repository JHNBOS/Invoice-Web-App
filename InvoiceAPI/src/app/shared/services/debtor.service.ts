import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/share';

import Debtor from '../models/debtor.model';

@Injectable()
export class DebtorService {

  private apiUrl = 'http://jhnbos.nl/invoice-api/debtors/';

  constructor(public http: HttpClient) { }

  getDebtorByEmail(email: string): Observable<Debtor> {
    return this.http.get<any>(this.apiUrl + 'read.php?email=' + email)
      .map(res => res[0] as Debtor)
      .share()
      .catch(this.handleError);
  }

  getDebtorById(id: number): Observable<Debtor> {
    return this.http.get<any>(this.apiUrl + 'read.php?id=' + id)
      .map(res => res[0] as Debtor)
      .share()
      .catch(this.handleError);
  }

  getAllDebtors(): Observable<Debtor[]> {
    return this.http.get<any>(this.apiUrl + 'readAll.php')
      .map(res => res as Debtor[])
      .share()
      .catch(this.handleError);
  }

  createDebtor(debtor: Debtor): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.apiUrl + 'create.php', debtor)
      .map(res => res as Debtor[])
      .share()
      .catch(this.handleError);
  }

  updateDebtor(debtor: Debtor): Observable<any> {
    return this.http.post(this.apiUrl + 'update.php', debtor)
      .map(res => res as Debtor[])
      .share()
      .catch(this.handleError);
  }

  deleteDebtorByEmail(email: string) {
    return this.http.post(this.apiUrl + 'delete.php?email=' + email, {})
      .map(res => res)
      .share()
      .catch(this.handleError);
  }

  deleteDebtorById(id: number) {
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
