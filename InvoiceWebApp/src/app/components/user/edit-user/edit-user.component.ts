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
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
    settings: Settings = JSON.parse(sessionStorage.getItem('settings'));
    currentUser: User = JSON.parse(sessionStorage.getItem('signedInUser'));
    @ViewChild('fileInput') fileInput: ElementRef;

    email: string;
    user: User;
    roles: Role[] = null;
    fileLabel = 'Choose an image to use as profile picture';

    constructor(private titleService: Title, private route: ActivatedRoute, private userService: UserService,
        private roleService: RoleService, private router: Router, private spinner: NgxSpinnerService) { }

    ngOnInit() {
        this.titleService.setTitle('Edit User - ' + this.settings.company_name);
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
        // Show spinner
        this.spinner.show();

        this.userService.update(this.user).subscribe(
            (response) => {
                if (response != null && (this.fileInput.nativeElement.files && this.fileInput.nativeElement.files[0])) {
                    this.fileUpload();
                } else {
                    // IF current user equals currently signed in user then update user in session storage
                    if (this.user.email === this.currentUser.email) {
                        sessionStorage.setItem('signedInUser', JSON.stringify(response));
                    }

                    setTimeout(() => {
                        // Hide spinner
                        this.spinner.hide();

                        this.router.navigate(['/']);
                    }, 1500);
                }
            },
            (error) => { throw error; }
        );
    }

    getUser(email: string) {
        this.userService.getByEmail(email).subscribe(
            (response) => this.user = response,
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
                        // IF current user equals currently signed in user then update user in session storage
                        if (this.user.email === this.currentUser.email) {
                            sessionStorage.setItem('signedInUser', JSON.stringify(response));
                        }

                        setTimeout(() => {
                            // Hide spinner
                            this.spinner.hide();

                            this.router.navigate(['/']);
                        }, 1500);
                    },
                    (error) => { throw error; }
                );
            }
        } else {
            setTimeout(() => {
                // Hide spinner
                this.spinner.hide();

                this.router.navigate(['/']);
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
