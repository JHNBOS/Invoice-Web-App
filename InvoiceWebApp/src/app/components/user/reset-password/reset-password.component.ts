import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastOptions, ToastyService } from 'ngx-toasty';
import Settings from '../../../shared/models/settings.model';
import { UserService } from '../../../shared/services/user.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    settings: Settings = JSON.parse(sessionStorage.getItem('settings'));

    email: string;
    toastOptions: ToastOptions;

    constructor(private userService: UserService, private router: Router, private toastyService: ToastyService, private titleService: Title) {
        this.toastOptions = {
            title: '',
            msg: '',
            theme: ' bootstrap',
            showClose: true,
            timeout: 3000,
            onRemove: () => {
                this.router.navigate(['/login']);
            }
        };
    }

    ngOnInit() {
        this.titleService.setTitle('Reset Password - ' + this.settings.company_name);
    }

    showSuccess() {
        this.toastOptions.title = 'Success';
        this.toastOptions.msg = 'An e-mail has been sent to this e-mail address.';

        this.toastyService.success(this.toastOptions);
    }

    resetPassword() {
        this.userService.resetPassword(this.email).subscribe(
            (response) => this.showSuccess(),
            (error) => { throw error; }
        );
    }
}
