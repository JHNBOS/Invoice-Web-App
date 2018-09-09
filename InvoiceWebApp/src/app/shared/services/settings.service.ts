import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import Settings from '../models/settings.model';

@Injectable()
export class SettingsService {

    private apiUrl = environment.apiBase + '/settings/';

    constructor(public http: HttpClient) { }

    get(): Observable<Settings> {
        return this.http.get<Settings>(this.apiUrl + 'get')
            .pipe(catchError(error => throwError(error)));
    }

    update(settings: Settings): Observable<Settings> {
        return this.http.put<Settings>(this.apiUrl + 'update', settings)
            .pipe(catchError(error => throwError(error)));
    }

    upload(file: any, settings: Settings): Observable<Settings> {
        let formData = new FormData();
        formData.append("file", file);
        formData.append("model", JSON.stringify(settings));

        return this.http.post<Settings>(this.apiUrl + 'upload', formData)
            .pipe(catchError(error => throwError(error)));
    }
}
