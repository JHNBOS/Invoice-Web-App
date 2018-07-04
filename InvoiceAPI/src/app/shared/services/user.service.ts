import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/share';

import User from '../models/user.model';

@Injectable()
export class UserService {

  private apiUrl = 'http://jhnbos.nl/invoice-api/users/';

  constructor(public http: HttpClient) {}

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<any>(this.apiUrl + 'read.php?email=' + email)
      .map(res => res[0] as User)
      .share()
      .catch(this.handleError);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<any>(this.apiUrl + 'read.php?id=' + id)
      .map(res => res[0] as User)
      .share()
      .catch(this.handleError);
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'readAll.php')
      .map(res => res as User[])
      .catch(this.handleError);
  }

  checkCredentials(email: string, password: string): Observable<User> {
    return this.http.post<any>(this.apiUrl + 'login.php', { email: email, password: password})
      .map(res => res as User[])
      .share()
      .catch(this.handleError);
  }

  createUser(user: User): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.apiUrl + 'create.php', user)
      .map(res => res as User[])
      .share()
      .catch(this.handleError);
  }

  updateUser(user: User): Observable<any> {
    return this.http.post(this.apiUrl + 'update.php', user)
      .map(res => res as User[])
      .share()
      .catch(this.handleError);
  }

  deleteUserByEmail(email: string) {
    return this.http.post(this.apiUrl + 'delete.php?email=' + email, {})
      .map(res => res)
      .share()
      .catch(this.handleError);
  }

  deleteUserById(id: number) {
    return this.http.post(this.apiUrl + 'delete.php?id=' + id, {})
      .map(res => res)
      .share()
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
}
