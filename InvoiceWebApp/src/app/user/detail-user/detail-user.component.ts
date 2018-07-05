import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import User from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';

@Component({
    selector: 'app-detail-user',
    templateUrl: './detail-user.component.html',
    styleUrls: ['./detail-user.component.scss']
})
export class DetailUserComponent implements OnInit {
    email: string;
    currentUser: User;

    constructor(private titleService: Title, private route: ActivatedRoute, private userService: UserService,
        private router: Router) { }

    ngOnInit() {
        this.titleService.setTitle('User Details - inVoice');
        this.route.params.subscribe(
            (params) => {
                this.email = params['email'];
                this.getUser(this.email);
            }
        );
    }

    getUser(email: string) {
        this.userService.getByEmail(email).subscribe(
            (response) => this.currentUser = response,
            (error) => { throw error; }
        );
    }
}
