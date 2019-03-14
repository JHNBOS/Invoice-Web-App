import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Settings from '../../shared/models/settings.model';
import { SettingsService } from '../../shared/services/settings.service';


@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    settings: Settings = null;
    fileLabel = 'Choose an image to use as logo';

    @ViewChild('fileInput') fileInput: ElementRef;

    constructor(private settingsService: SettingsService, private titleService: Title, private route: ActivatedRoute,
        private router: Router, private spinner: NgxSpinnerService) { }

    ngOnInit() {
        this.titleService.setTitle('Settings - Invoice Panel');
        this.getSettings();
    }

    getSettings() {
        this.settings = JSON.parse(sessionStorage.getItem('settings'));
    }

    submitForm() {
        // Show spinner
        this.spinner.show();

        this.settingsService.update(this.settings).subscribe(
            (response) => this.fileUpload(response),
            (error) => { throw error; }
        );
    }

    fileUpload(settings: Settings): void {
        const fi = this.fileInput.nativeElement;
        if (fi.files && fi.files[0]) {
            const fileToUpload = fi.files[0];

            if (fileToUpload) {
                this.settingsService.upload(fileToUpload, settings).subscribe(
                    (response) => {
                        sessionStorage.setItem('settings', JSON.stringify(response));

                        setTimeout(() => {
                            // Hide spinner
                            this.spinner.hide();

                            sessionStorage.setItem('force', JSON.stringify(true));
                            this.router.navigate(['/']);
                        }, 1500);
                    },
                    (error) => { throw (error); }
                );
            }
        } else {
            sessionStorage.setItem('settings', JSON.stringify(settings));

            setTimeout(() => {
                // Hide spinner
                this.spinner.hide();

                sessionStorage.setItem('force', JSON.stringify(true));
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
            this.fileLabel = 'Choose an image to use as logo';
        }
    }
}
