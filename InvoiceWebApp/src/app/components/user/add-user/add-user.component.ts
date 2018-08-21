import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import Role from '../../../shared/models/role.model';
import Settings from '../../../shared/models/settings.model';
import User from '../../../shared/models/user.model';
import { RoleService } from '../../../shared/services/role.service';
import { UserService } from '../../../shared/services/user.service';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
    settings: Settings = JSON.parse(sessionStorage.getItem('settings'));
    @ViewChild('fileInput') fileInput: ElementRef;

    user: User = new User;
    roles: Role[] = null;
    fileLabel: string = 'Choose an image to use as profile picture';

    constructor(private titleService: Title, private route: ActivatedRoute, private userService: UserService, private roleService: RoleService, private router: Router) { }

    ngOnInit() {
        this.titleService.setTitle('Create User - ' + this.settings.company_name);
        this.getRoles();
    }

    getRoles() {
        this.roleService.getAll().subscribe(
            (response) => this.roles = response,
            (error) => { throw error; }
        );
    }

    submitForm() {
        this.user.role_id = Number(this.user.role_id);
        this.userService.create(this.user).subscribe(
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
                this.userService.upload(fileToUpload, this.user).subscribe(
                    (response) => this.router.navigate(['/users']),
                    (error) => { throw (error); }
                );
            }
        } else {
            this.router.navigate(['/users']);
        }
    }

    setFileName() {
        let fi = this.fileInput.nativeElement;
        if (fi.files && fi.files[0]) {
            let fileToUpload = fi.files[0];

            if (fileToUpload) {
                this.fileLabel = fileToUpload.name;
            }
        } else {
            this.fileLabel = 'Choose an image to use as profile picture';
        }
    }
}
