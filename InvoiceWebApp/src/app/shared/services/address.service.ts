import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Address from '../models/address.model';

@Injectable()
export class AddressService {

    private apiUrl = 'http://invoice.jhnbos.nl:90/api/address/';

    constructor(public http: HttpClient) { }

    getAll(): Observable<Address[]> {
        return this.http.get<Address[]>(this.apiUrl + 'getAll')
            .pipe(catchError(error => throwError(error)));
    }

    getByCity(city: string): Observable<Address[]> {
        return this.http.get<Address[]>(this.apiUrl + 'getByCity?city=' + city)
            .pipe(catchError(error => throwError(error)));
    }

    getByPostal(postal: string): Observable<Address[]> {
        return this.http.get<Address[]>(this.apiUrl + 'getByPostal?postal=' + postal)
            .pipe(catchError(error => throwError(error)));
    }

    getAddress(postal: string, number: number): Observable<Address> {
        return this.http.get<Address>(this.apiUrl + 'getByNumberAndPostalCode?number=' + number + '&postal=' + postal)
            .pipe(catchError(error => throwError(error)));
    }

    create(address: Address): Observable<Address> {
        return this.http.post<Address>(this.apiUrl + 'create', address)
            .pipe(catchError(error => throwError(error)));
    }

    delete(number: number, suffix: string, postal: string): Observable<boolean> {
        return this.http.delete<boolean>(this.apiUrl + 'delete?number=' + number + '&suffix=' + suffix + '&postal=' + postal)
            .pipe(catchError(error => throwError(error)));
    }
}
