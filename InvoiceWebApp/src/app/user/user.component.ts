import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import User from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
    users: User[] = [];

    constructor(private titleService: Title, private route: ActivatedRoute,
        private userService: UserService, private router: Router) { }

    ngOnInit() {
        this.titleService.setTitle('Users - inVoice');
        this.getAllUsers();
    }

    getAllUsers() {
        this.userService.getAll().subscribe(
            (response) => this.users = response,
            (error) => { throw (error); }
        );
    }

    deleteUser(email: string) {
        if (confirm('Are you sure you want to delete this user?')) {
            this.userService.delete(email).subscribe(
                (response) => this.ngOnInit(),
                (error) => { throw (error); }
            );
        }
    }
}
