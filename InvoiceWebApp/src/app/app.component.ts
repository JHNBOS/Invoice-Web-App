import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { AuthenticationService } from './shared/authentication.service';
import User from './shared/models/user.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    user: User = null;
    isLoggedIn = false;
    title: string;

    constructor(private authService: AuthenticationService, private route: ActivatedRoute,
        private router: Router, private _sanitizer: DomSanitizer) { }

    ngOnInit() {
        this.checkIfLoggedIn();
        this.getCurrentRouteTitle();
    }

    checkIfLoggedIn() {
        this.user = JSON.parse(sessionStorage.getItem('loggedInUser'));
        if (this.user != null) {
            this.isLoggedIn = true;
        } else {
            this.isLoggedIn = false;
        }
    }

    getCurrentRouteTitle() {
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .map(() => this.route)
            .map(route => {
                while (route.firstChild) { route = route.firstChild; }
                return route;
            })
            .filter(route => route.outlet === 'primary')
            .mergeMap(route => route.data)
            .subscribe((event) => this.title = event['title']);
    }

    signOut() {
        this.authService.logout();
        this.checkIfLoggedIn();

        if (!this.isLoggedIn) {
            this.router.navigate(['/login']);
        }
    }
}
