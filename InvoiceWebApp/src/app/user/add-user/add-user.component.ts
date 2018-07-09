import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

    @ViewChild('fileInput') fileInput: ElementRef;

    constructor(private titleService: Title, private route: ActivatedRoute, private userService: UserService, private roleService: RoleService, private router: Router) { }

    ngOnInit() {
        this.titleService.setTitle('Create User - Invoice Panel');
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
            (response) => {
                if (response != null) {
                    this.fileUpload();
                }
            },
            (error) => { throw error; }
        );
    }

    fileUpload(): void {
        let fi = this.fileInput.nativeElement;
        if (fi.files && fi.files[0]) {
            let fileToUpload = fi.files[0];

            if (fileToUpload) {
                this.userService.upload(fileToUpload, this.currentUser).subscribe(
                    (response) => this.router.navigate(['/users']),
                    (error) => { throw (error); }
                );
            }
        } else {
            this.router.navigate(['/users']);
        }
    }

}
