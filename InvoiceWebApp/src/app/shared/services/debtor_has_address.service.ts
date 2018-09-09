import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import DebtorHasAddress from '../models/debtor_has_address.model';

@Injectable()
export class DebtorHasAddressService {

    private apiUrl = environment.apiBase + '/has_address/';

    constructor(public http: HttpClient) { }

    getByNumberAndPostalCode(postal: string, number: number): Observable<DebtorHasAddress> {
        return this.http.get<DebtorHasAddress>(this.apiUrl + 'read.php?number=' + number + '&postal=' + postal)
            .pipe(catchError(error => throwError(error)));
    }

    getByPostalCode(postal: string): Observable<DebtorHasAddress[]> {
        return this.http.get<DebtorHasAddress[]>(this.apiUrl + 'getByPostalCode?postal=' + postal)
            .pipe(catchError(error => throwError(error)));
    }

    getByDebtorId(id: string): Observable<DebtorHasAddress> {
        return this.http.get<DebtorHasAddress>(this.apiUrl + 'getByDebtorId?id=' + id)
            .pipe(catchError(error => throwError(error)));
    }

    getAll(): Observable<DebtorHasAddress[]> {
        return this.http.get<DebtorHasAddress[]>(this.apiUrl + 'getAll')
            .pipe(catchError(error => throwError(error)));
    }

    create(debtorHasAddress: DebtorHasAddress): Observable<DebtorHasAddress> {
        return this.http.post<DebtorHasAddress>(this.apiUrl + 'create', debtorHasAddress)
            .pipe(catchError(error => throwError(error)));
    }

    deleteDebtorHasAddress(id: string, postal: string, number: number): Observable<boolean> {
        return this.http.delete<boolean>(this.apiUrl + 'delete?id=' + id + '&number=' + number + '&postal=' + postal)
            .pipe(catchError(error => throwError(error)));
    }
}
