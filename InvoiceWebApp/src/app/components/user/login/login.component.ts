import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../shared/authentication.service';
import User from '../../../shared/models/user.model';
import { UserService } from '../../../shared/services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    email = '';
    password = '';
    user: User;

    constructor(private titleService: Title, private route: ActivatedRoute, private userService: UserService,
        private router: Router, private authenticationService: AuthenticationService) {}

    ngOnInit() {
        this.titleService.setTitle('Sign In - Invoice Panel');

        // reset login status
        this.authenticationService.logout();
    }

    checkCredentials() {
        this.authenticationService.login(this.email, this.password)
            .subscribe(
                (response) => {
                    sessionStorage.setItem('loggedInUser', JSON.stringify(response));
                    this.router.navigate(['/']);
                },
                (error) => { throw (error); }
            );
    }
}
