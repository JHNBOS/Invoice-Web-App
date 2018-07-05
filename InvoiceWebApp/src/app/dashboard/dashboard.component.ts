import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from '../shared/services/user.service';
import User from '../shared/models/user.model';
import { SharedService } from '../shared/services/shared.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    user: User = null;

    constructor(private titleService: Title, private userService: UserService) { }

    ngOnInit() {
        this.titleService.setTitle('Home - inVoice');
        this.getLoggedInUser();
    }

    getLoggedInUser() {
        this.user = JSON.parse(localStorage.getItem('loggedInUser'));
    }
}
