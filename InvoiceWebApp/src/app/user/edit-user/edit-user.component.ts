import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import Role from '../../shared/models/role.model';
import User from '../../shared/models/user.model';
import { RoleService } from '../../shared/services/role.service';
import { UserService } from '../../shared/services/user.service';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
    email: string;
    currentUser: User;
    roles: Role[] = null;

    constructor(private titleService: Title, private route: ActivatedRoute, private userService: UserService, private roleService: RoleService, private router: Router) { }

    ngOnInit() {
        this.titleService.setTitle('Edit User - inVoice');
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
