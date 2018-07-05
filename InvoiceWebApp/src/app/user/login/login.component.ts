import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastOptions, ToastyService } from 'ng2-toasty';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../../shared/authentication.service';
import User from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    toastOptions: ToastOptions;
    email = '';
    password = '';
    user: User;

    constructor(private titleService: Title, private route: ActivatedRoute, private userService: UserService,
        private router: Router, private authenticationService: AuthenticationService, private toastyService: ToastyService) {
        this.toastOptions = {
            title: 'Oops',
            msg: 'You\'ve entered the wrong credentials, please try again!',
            theme: ' bootstrap',
            showClose: true,
            timeout: 4000
        };
    }

    ngOnInit() {
        this.titleService.setTitle('Sign In - inVoice');

        // reset login status
        this.authenticationService.logout();
    }

    checkCredentials() {
        this.authenticationService.login(this.email, this.password)
            .subscribe(
                (response) => {
                    localStorage.setItem('loggedInUser', JSON.stringify(response as User));
                    this.router.navigate(['/']);
                },
                (error) => { throw (error); }
            );
    }
}
