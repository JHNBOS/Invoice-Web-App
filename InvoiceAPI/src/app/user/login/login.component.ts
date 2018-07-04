import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import User from '../../shared/models/user.model';
import { AuthenticationService } from '../../shared/authentication.service';
import { Observable } from 'rxjs/Observable';
import { ToastyService, ToastOptions } from 'ng2-toasty';

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
        user => {
          localStorage.setItem('loggedInUser', JSON.stringify(user[0] as User));
          this.router.navigate(['/']);
        },
        error => {
          this.toastyService.warning(this.toastOptions);
          return Observable.throw(error);
        });
  }

}
