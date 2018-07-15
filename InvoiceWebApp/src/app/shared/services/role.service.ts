import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Role from '../models/role.model';

@Injectable()
export class RoleService {

    private apiUrl = 'http://localhost/api/roles/';

    constructor(public http: HttpClient) { }

    getAll(): Observable<Role[]> {
        return this.http.get<Role[]>(this.apiUrl + 'getAll')
            .pipe(catchError(error => throwError(error)));
    }
}
