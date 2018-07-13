import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import Role from '../../../shared/models/role.model';
import User from '../../../shared/models/user.model';
import { RoleService } from '../../../shared/services/role.service';
import { UserService } from '../../../shared/services/user.service';

@Component({
    selector: 'app-detail-user',
    templateUrl: './detail-user.component.html',
    styleUrls: ['./detail-user.component.scss']
})
export class DetailUserComponent implements OnInit {
    email: string;
    user: User;
    roles: Role[] = null;

    constructor(private titleService: Title, private route: ActivatedRoute, private userService: UserService, private roleService: RoleService, private _sanitizer: DomSanitizer, private router: Router) { }

    ngOnInit() {
        this.titleService.setTitle('User Details - Invoice Panel');
        this.route.params.subscribe(
            (params) => {
                this.email = params['email'];
                this.getRoles();
                this.getUser(this.email);
            }
        );
    }

    getRoles() {
        this.roleService.getAll().subscribe(
            (response) => this.roles = response,
            (error) => { throw error; }
        );
    }

    getUser(email: string) {
        this.userService.getByEmail(email).subscribe(
            (response) => this.user = response,
            (error) => { throw error; }
        );
    }
}
