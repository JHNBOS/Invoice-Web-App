import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/share';

import Company from '../models/company.model';

@Injectable()
export class CompanyService {

  private apiUrl = 'http://jhnbos.nl/invoice-api/companies/';

  constructor(public http: HttpClient) { }

  getCompanyByNumber(id: number): Observable<Company> {
    return this.http.get<any>(this.apiUrl + 'read.php?number=' + id)
      .map(res => res[0] as Company)
      .share()
      .catch(this.handleError);
  }

  getAllCompanies(): Observable<Company[]> {
    return this.http.get<any>(this.apiUrl + 'readAll.php')
      .map(res => res as Company[])
      .share()
      .catch(this.handleError);
  }

  createCompany(company: Company): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.apiUrl + 'create.php', company)
      .map(res => res as Company[])
      .share()
      .catch(this.handleError);
  }

  updateCompany(company: Company): Observable<any> {
    return this.http.post(this.apiUrl + 'update.php', company)
      .map(res => res as Company[])
      .share()
      .catch(this.handleError);
  }

  deleteCompanyByNumber(id: number) {
    return this.http.post(this.apiUrl + 'delete.php?number=' + id, {})
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
