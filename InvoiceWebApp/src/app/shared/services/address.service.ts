import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import Address from '../models/address.model';

@Injectable()
export class AddressService {

    private apiUrl = 'http://localhost/api/address/';

    constructor(public http: HttpClient) { }

    getAll(): Observable<Address[]> {
        return this.http.get(this.apiUrl + 'getAll')
            .catch(this.handleError);
    }

    getByCity(city: string): Observable<Address[]> {
        return this.http.get(this.apiUrl + 'getByCity?city=' + city)
            .catch(this.handleError);
    }

    getByPostal(postal: string): Observable<Address[]> {
        return this.http.get(this.apiUrl + 'getByPostal?postal=' + postal)
            .catch(this.handleError);
    }

    getAddress(postal: string, number: number): Observable<Address> {
        return this.http.get(this.apiUrl + 'getByNumberAndPostalCode?number=' + number + '&postal=' + postal)
            .catch(this.handleError);
    }

    create(address: Address): Observable<any> {
        return this.http.post(this.apiUrl + 'create', address)
            .catch(this.handleError);
    }

    delete(number: number, suffix: string, postal: string): Observable<boolean> {
        return this.http.delete(this.apiUrl + 'delete?number=' + number + '&suffix=' + suffix + '&postal=' + postal)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        return Observable.throw(error);
    }
}
