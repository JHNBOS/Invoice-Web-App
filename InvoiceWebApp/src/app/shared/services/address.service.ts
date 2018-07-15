import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Address from '../models/address.model';

@Injectable()
export class AddressService {

    private apiUrl = 'http://localhost/api/address/';

    constructor(public http: HttpClient) { }

    getAll(): Observable<Address[]> {
        return this.http.get<Address[]>(this.apiUrl + 'getAll')
            .pipe(catchError(this.handleError));
    }

    getByCity(city: string): Observable<Address[]> {
        return this.http.get<Address[]>(this.apiUrl + 'getByCity?city=' + city)
            .pipe(catchError(this.handleError));
    }

    getByPostal(postal: string): Observable<Address[]> {
        return this.http.get<Address[]>(this.apiUrl + 'getByPostal?postal=' + postal)
            .pipe(catchError(this.handleError));
    }

    getAddress(postal: string, number: number): Observable<Address> {
        return this.http.get<Address>(this.apiUrl + 'getByNumberAndPostalCode?number=' + number + '&postal=' + postal)
            .pipe(catchError(this.handleError));
    }

    create(address: Address): Observable<Address> {
        return this.http.post<Address>(this.apiUrl + 'create', address)
            .pipe(catchError(this.handleError));
    }

    delete(number: number, suffix: string, postal: string): Observable<boolean> {
        return this.http.delete<boolean>(this.apiUrl + 'delete?number=' + number + '&suffix=' + suffix + '&postal=' + postal)
            .pipe(catchError(this.handleError));
    }

    private handleError(error: any) {
        return Observable.throw(error);
    }
}
