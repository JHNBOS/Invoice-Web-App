import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import Role from '../models/role.model';

@Injectable()
export class RoleService {

    private apiUrl = 'http://localhost/api/roles/';

    constructor(public http: HttpClient) { }

    getAll(): Observable<Role[]> {
        return this.http.get<any>(this.apiUrl + 'getAll')
            .catch(this.handleError);
    }

    private handleError(error: any) {
        return Observable.throw(error);
    }
}
