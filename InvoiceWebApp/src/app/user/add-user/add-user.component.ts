import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import Role from '../../shared/models/role.model';
import User from '../../shared/models/user.model';
import { RoleService } from '../../shared/services/role.service';
import { UserService } from '../../shared/services/user.service';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
    currentUser: User = new User;
    roles: Role[] = null;

    constructor(private titleService: Title, private route: ActivatedRoute, private userService: UserService, private roleService: RoleService, private router: Router) { }

    ngOnInit() {
        this.titleService.setTitle('Create User - inVoice');
        this.getRoles();
    }

    getRoles() {
        this.roleService.getAll().subscribe(
            (response) => this.roles = response,
            (error) => { throw error; }
        );
    }

    submitForm() {
        this.userService.create(this.currentUser).subscribe(
            (response) => { this.router.navigate(['/users']); },
            (error) => { throw error; }
        );
    }
}
