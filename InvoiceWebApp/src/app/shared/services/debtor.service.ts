import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import Debtor from '../models/debtor.model';

@Injectable()
export class DebtorService {

    private apiUrl = 'http://localhost/api/debtors/';

    constructor(public http: HttpClient) { }

    getByEmail(email: string): Observable<Debtor> {
        return this.http.get(this.apiUrl + 'getByEmail?email=' + email)
            .catch(this.handleError);
    }

    getById(id: string): Observable<Debtor> {
        return this.http.get(this.apiUrl + 'getById?id=' + id)
            .catch(this.handleError);
    }

    getAll(): Observable<Debtor[]> {
        return this.http.get(this.apiUrl + 'getAll')
            .catch(this.handleError);
    }

    create(debtor: Debtor): Observable<Debtor> {
        return this.http.post(this.apiUrl + 'create', debtor)
            .catch(this.handleError);
    }

    update(debtor: Debtor): Observable<Debtor> {
        return this.http.put(this.apiUrl + 'update', debtor)
            .catch(this.handleError);
    }

    delete(id: string) {
        return this.http.delete(this.apiUrl + 'delete?id=' + id)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        return Observable.throw(error);
    }
}
