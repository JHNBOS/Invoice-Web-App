import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import User from './models/user.model';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/share';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
  private apiUrl = 'http://jhnbos.nl/invoice-api/users/';

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'login.php', { email: email, password: password })
      .map(user => user)
      .share()
      .catch(this.handleError);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('loggedInUser');
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
