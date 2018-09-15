import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

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
    show = false;

    constructor(private userService: UserService, private router: Router, private titleService: Title) {
    }

    ngOnInit() {
        this.titleService.setTitle('Reset Password - ' + this.settings.company_name);
    }

    resetPassword() {
        this.userService.resetPassword(this.email).subscribe(
            (response) => this.show = true,
            (error) => { throw error; }
        );
    }
}
