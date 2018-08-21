import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import Settings from '../../../shared/models/settings.model';
import User from '../../../shared/models/user.model';
import { UserService } from '../../../shared/services/user.service';

@Component({
    selector: 'app-import-user',
    templateUrl: './import-user.component.html',
    styleUrls: ['./import-user.component.scss']
})
export class ImportUserComponent implements OnInit {
    settings: Settings = JSON.parse(sessionStorage.getItem('settings'));
    @ViewChild('fileInput') fileInput: ElementRef;

    users: User[] = [];
    fileLabel: string = 'Choose a CSV file to upload';

    constructor(private titleService: Title, private userService: UserService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.titleService.setTitle('Import Users - ' + this.settings.company_name);
    }

    upload(event: any) {
        this.extractData(event.target);
    }

    setFileName() {
        let fi = this.fileInput.nativeElement;
        if (fi.files && fi.files[0]) {
            let fileToUpload = fi.files[0];

            if (fileToUpload) {
                this.fileLabel = fileToUpload.name;
            }
        } else {
            this.fileLabel = 'Choose a CSV file to upload';
        }
    }

    private mapToUser(data: any[]) {
        const user = new User();
        user.first_name = data[0];
        user.last_name = data[1];
        user.email = data[2];
        user.password = data[3];
        user.picture = data[4];
        user.role_id = data[5]

        this.users.push(user);
    }

    private extractData(fileInput: any) {
        let fi = this.fileInput.nativeElement;
        const lines = [];

        if (fi.files && fi.files[0]) {
            let fileToUpload = fi.files[0];

            const reader: FileReader = new FileReader();
            reader.readAsText(fileToUpload);

            reader.onload = (e) => {
                const csv: string = reader.result;
                const allTextLines = csv.split(/\r|\n|\r/);
                const headers = allTextLines[0].split(',');

                for (let i = 1; i < allTextLines.length; i++) {
                    // split content based on comma
                    const data = allTextLines[i].split(',');
                    if (data.length === headers.length) {
                        const tarr = [];
                        for (let j = 0; j < headers.length; j++) {
                            tarr.push(data[j]);
                        }

                        this.mapToUser(tarr);
                    }
                }

                this.saveUsers();
            };
        }
    }

    private saveUsers() {
        let count = 0;
        for (let i = 0; i < this.users.length; i++) {
            const user = this.users[i];

            this.userService.create(user).subscribe(
                (response) => { },
                (error) => { throw (error); }
            );
        }

        setTimeout(() => {
            this.router.navigate(['/users']);
        }, 500);
    }
}
