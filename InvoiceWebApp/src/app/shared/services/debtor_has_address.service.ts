import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import DebtorHasAddress from '../models/debtor_has_address.model';

@Injectable()
export class DebtorHasAddressService {

    private apiUrl = 'http://localhost/api/has_address/';

    constructor(public http: HttpClient) { }

    getByNumberAndPostalCode(postal: string, number: number): Observable<DebtorHasAddress> {
        return this.http.get(this.apiUrl + 'read.php?number=' + number + '&postal=' + postal)
            .catch(this.handleError);
    }

    getByPostalCode(postal: string): Observable<DebtorHasAddress[]> {
        return this.http.get(this.apiUrl + 'getByPostalCode?postal=' + postal)
            .catch(this.handleError);
    }

    getByDebtorId(id: string): Observable<DebtorHasAddress> {
        return this.http.get(this.apiUrl + 'getByDebtorId?id=' + id)
            .catch(this.handleError);
    }

    getAll(): Observable<DebtorHasAddress[]> {
        return this.http.get(this.apiUrl + 'getAll')
            .catch(this.handleError);
    }

    create(debtorHasAddress: DebtorHasAddress): Observable<DebtorHasAddress> {
        return this.http.post(this.apiUrl + 'create', debtorHasAddress)
            .catch(this.handleError);
    }

    deleteDebtorHasAddress(id: string, postal: string, number: number): Observable<boolean> {
        return this.http.delete(this.apiUrl + 'delete?id=' + id + '&number=' + number + '&postal=' + postal)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        return Observable.throw(error);
    }
}
