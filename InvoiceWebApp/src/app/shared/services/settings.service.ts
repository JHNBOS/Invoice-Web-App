import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Settings from '../models/settings.model';

@Injectable()
export class SettingsService {

    private apiUrl = 'http://invoice.jhnbos.nl:90/api/settings/';

    constructor(public http: HttpClient) { }

    get(): Observable<Settings> {
        return this.http.get<Settings>(this.apiUrl + 'get')
            .pipe(catchError(error => throwError(error)));
    }

    update(settings: Settings): Observable<Settings> {
        return this.http.put<Settings>(this.apiUrl + 'update', settings)
            .pipe(catchError(error => throwError(error)));
    }
}
