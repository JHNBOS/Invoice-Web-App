import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import DebtorHasAddress from '../models/debtor_has_address.model';

@Injectable()
export class DebtorHasAddressService {

    private apiUrl = 'http://localhost/api/has_address/';

    constructor(public http: HttpClient) { }

    getByNumberAndPostalCode(postal: string, number: number): Observable<DebtorHasAddress> {
        return this.http.get<DebtorHasAddress>(this.apiUrl + 'read.php?number=' + number + '&postal=' + postal)
            .pipe(catchError(this.handleError));
    }

    getByPostalCode(postal: string): Observable<DebtorHasAddress[]> {
        return this.http.get<DebtorHasAddress[]>(this.apiUrl + 'getByPostalCode?postal=' + postal)
            .pipe(catchError(this.handleError));
    }

    getByDebtorId(id: string): Observable<DebtorHasAddress> {
        return this.http.get<DebtorHasAddress>(this.apiUrl + 'getByDebtorId?id=' + id)
            .pipe(catchError(this.handleError));
    }

    getAll(): Observable<DebtorHasAddress[]> {
        return this.http.get<DebtorHasAddress[]>(this.apiUrl + 'getAll')
            .pipe(catchError(this.handleError));
    }

    create(debtorHasAddress: DebtorHasAddress): Observable<DebtorHasAddress> {
        return this.http.post<DebtorHasAddress>(this.apiUrl + 'create', debtorHasAddress)
            .pipe(catchError(this.handleError));
    }

    deleteDebtorHasAddress(id: string, postal: string, number: number): Observable<boolean> {
        return this.http.delete<boolean>(this.apiUrl + 'delete?id=' + id + '&number=' + number + '&postal=' + postal)
            .pipe(catchError(this.handleError));
    }

    private handleError(error: any) {
        return Observable.throw(error);
    }
}
