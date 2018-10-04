import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationResult } from '../../shared/models/pagination.result';
import Settings from '../../shared/models/settings.model';
import User from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
    settings: Settings = JSON.parse(sessionStorage.getItem('settings'));

    users: User[] = [];

    query = '';
    pagedResult: PaginationResult<User>;

    constructor(private titleService: Title, private route: ActivatedRoute,
        private userService: UserService, private router: Router) { }

    ngOnInit() {
        this.titleService.setTitle('Users - ' + this.settings.company_name);
        this.getPage(1);
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

    search() {
        const results: User[] = [];
        this.users.forEach(f => {
            if (f.company_name == null) {
                if (f.email.toLowerCase().includes(this.query.toLowerCase())
                    || f.first_name.toLowerCase().includes(this.query.toLowerCase())
                    || f.last_name.toLowerCase().includes(this.query.toLowerCase())) {

                    results.push(f);
                }
            } else {
                if (f.email.toLowerCase().includes(this.query.toLowerCase())
                    || f.company_name.toLowerCase().includes(this.query.toLowerCase())) {

                    results.push(f);
                }
            }
        });

        return results;
    }

    getPage(page: number) {
        this.userService.index(page).subscribe(
            (response) => {
                this.pagedResult = response;
                this.users = this.pagedResult.data;
            },
            (error: HttpErrorResponse) => { throw error; }
        );
    }
}
