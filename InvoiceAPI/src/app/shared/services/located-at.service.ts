import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/share';

import LocatedAt from '../models/located_at.model';

@Injectable()
export class LocatedAtService {

  private apiUrl = 'http://jhnbos.nl/invoice-api/located_at/';

  constructor(public http: HttpClient) { }

  getLocatedAt(postal: string, number: number): Observable<LocatedAt> {
    return this.http.get<any>(this.apiUrl + 'read.php?postal=' + postal + '&number=' + number)
      .map(res => res[0] as LocatedAt)
      .share()
      .catch(this.handleError);
  }

  getLocatedAtByCompany(id: number): Observable<LocatedAt> {
    return this.http.get<any>(this.apiUrl + 'read.php?id=' + id)
      .map(res => res[0] as LocatedAt)
      .share()
      .catch(this.handleError);
  }

  getAllLocatedAt(): Observable<LocatedAt[]> {
    return this.http.get<any>(this.apiUrl + 'readAll.php')
      .map(res => res as LocatedAt[])
      .share()
      .catch(this.handleError);
  }

  createLocatedAt(located_at: LocatedAt): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.apiUrl + 'create.php', located_at)
      .map(res => res as LocatedAt[])
      .share()
      .catch(this.handleError);
  }

  deleteLocatedAt(postal: string, number: number) {
    return this.http.post(this.apiUrl + 'delete.php?postal=' + postal + '&number=' + number, {})
      .map(res => res)
      .share()
      .catch(this.handleError);
  }

  deleteLivesAtByCompany(id: number) {
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
