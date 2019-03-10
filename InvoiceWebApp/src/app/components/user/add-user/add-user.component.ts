import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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

    forCompany: boolean;
    user: User = new User;
    roles: Role[] = null;
    fileLabel = 'Choose an image to use as profile picture';

    constructor(private titleService: Title, private route: ActivatedRoute, private userService: UserService,
        private roleService: RoleService, private router: Router, private spinner: NgxSpinnerService) { }

    ngOnInit() {
        this.titleService.setTitle('Create User - ' + this.settings.company_name);
        this.forCompany = false;
        this.user.role_id = 0;

        this.route.params.subscribe(
            (params) => {
                this.forCompany = params['company'] === 'yes' ? true : false;
            }
        );
        this.getRoles();
    }

    changeForm(event: any) {
        if (event.target.checked) {
            this.forCompany = true;
        } else {
            this.forCompany = false;
        }
    }

    getRoles() {
        this.roleService.getAll().subscribe(
            (response) => this.roles = response,
            (error) => { throw error; }
        );
    }

    submitForm() {
        // Show spinner
        this.spinner.show();

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
        const fi = this.fileInput.nativeElement;
        if (fi.files && fi.files[0]) {
            const fileToUpload = fi.files[0];

            if (fileToUpload) {
                this.userService.upload(fileToUpload, this.user).subscribe(
                    (response) => {
                        setTimeout(() => {
                            // Hide spinner
                            this.spinner.hide();

                            this.router.navigate(['/users']);
                        }, 1500);
                    },
                    (error) => { throw (error); }
                );
            }
        } else {
            setTimeout(() => {
                // Hide spinner
                this.spinner.hide();

                this.router.navigate(['/users']);
            }, 1500);
        }
    }

    setFileName() {
        const fi = this.fileInput.nativeElement;
        if (fi.files && fi.files[0]) {
            const fileToUpload = fi.files[0];

            if (fileToUpload) {
                this.fileLabel = fileToUpload.name;
            }
        } else {
            this.fileLabel = 'Choose an image to use as profile picture';
        }
    }
}
