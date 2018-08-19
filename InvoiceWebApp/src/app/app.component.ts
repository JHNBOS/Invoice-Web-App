import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { AuthenticationService } from './shared/authentication.service';
import Settings from './shared/models/settings.model';
import User from './shared/models/user.model';
import { SettingsService } from './shared/services/settings.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    settings: Settings = null;
    currentUser: User = null;
    isSignedIn = false;
    title: string;

    constructor(private authService: AuthenticationService, private route: ActivatedRoute, private router: Router, private _sanitizer: DomSanitizer,
        private settingsService: SettingsService, private titleService: Title) {
        this.getSettings();
    }

    ngOnInit() {
        this.titleService.setTitle(this.settings.company_name); \

        this.checkIfLoggedIn();
        this.getCurrentRouteTitle();
    }

    checkIfLoggedIn() {
        this.currentUser = JSON.parse(sessionStorage.getItem('signedInUser'));
        if (this.currentUser != null) {
            this.isSignedIn = true;
        } else {
            this.isSignedIn = false;
        }
    }

    getCurrentRouteTitle() {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .pipe(map(() => this.route))
            .pipe(map(route => {
                while (route.firstChild) { route = route.firstChild; }
                return route;
            }))
            .pipe(filter(route => route.outlet === 'primary'))
            .pipe(mergeMap(route => route.data))
            .subscribe((event) => this.title = event['title']);
    }

    getSettings() {
        this.settingsService.get().subscribe(
            (response) => {
                this.settings = response;
                sessionStorage.setItem('settings', JSON.stringify(response));
            },
            (error) => { throw error; }
        );
    }

    signOut() {
        this.authService.logout();
        this.checkIfLoggedIn();

        if (!this.isSignedIn) {
            this.router.navigate(['/login']);
        }
    }
}
