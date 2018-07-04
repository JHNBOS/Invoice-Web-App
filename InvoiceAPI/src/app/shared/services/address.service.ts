import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/share';

import Address from '../models/address.model';

@Injectable()
export class AddressService {

  private apiUrl = 'http://jhnbos.nl/invoice-api/addresses/';

  constructor(public http: HttpClient) { }

  getAddress(postal: string, number: number): Observable<Address> {
    return this.http.get<any>(this.apiUrl + 'read.php?postal=' + postal + '&number=' + number)
      .map(res => res[0] as Address)
      .share()
      .catch(this.handleError);
  }

  getAllAddresses(): Observable<Address[]> {
    return this.http.get<any>(this.apiUrl + 'readAll.php')
      .map(res => res as Address[])
      .share()
      .catch(this.handleError);
  }

  createAddress(address: Address): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.apiUrl + 'create.php', address)
      .map(res => res as Address[])
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
