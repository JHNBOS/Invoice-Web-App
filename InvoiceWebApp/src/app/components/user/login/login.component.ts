import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../../../shared/authentication.service';
import Settings from '../../../shared/models/settings.model';
import { UserService } from '../../../shared/services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    settings: Settings = JSON.parse(sessionStorage.getItem('settings'));

    email = '';
    password = '';
    returnUrl: string;

    constructor(private titleService: Title, private route: ActivatedRoute, private userService: UserService,
        private router: Router, private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.titleService.setTitle('Sign In - ' + this.settings.company_name);

        // reset login status
        this.authenticationService.logout();

        // get possible return url
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    checkCredentials() {
        this.authenticationService.login(this.email, this.password)
            .subscribe(
                (response) => {
                    sessionStorage.setItem('signedInUser', JSON.stringify(response));
                    this.router.navigateByUrl(this.returnUrl);
                },
                (error) => { throw (error); }
            );
    }
}
