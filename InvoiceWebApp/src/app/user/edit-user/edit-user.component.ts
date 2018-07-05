import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import User from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
    email: string;
    currentUser: User;

    constructor(private titleService: Title, private route: ActivatedRoute, private userService: UserService, private router: Router) { }

    ngOnInit() {
        this.titleService.setTitle('Edit User - inVoice');
        this.route.params.subscribe(
            (params) => {
                this.email = params['email'];
                this.getUser(this.email);
            }
        );
    }

    submitForm() {
        this.userService.update(this.currentUser).subscribe(
            (response) => { this.router.navigate(['/users']); },
            (error) => { throw error; }
        );
    }

    getUser(email: string) {
        this.userService.getByEmail(email).subscribe(
            (response) => this.currentUser = response,
            (error) => { throw error; }
        );
    }
}
