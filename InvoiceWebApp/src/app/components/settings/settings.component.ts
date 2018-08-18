import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import Settings from '../../shared/models/settings.model';
import { SettingsService } from '../../shared/services/settings.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    settings: Settings = null;

    @ViewChild('fileInput') fileInput: ElementRef;

    constructor(private settingsService: SettingsService, private titleService: Title, private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
        this.titleService.setTitle('Settings - Invoice Panel');
        this.getSettings();
    }

    getSettings() {
        this.settings = JSON.parse(sessionStorage.getItem('settings'));
    }

    submitForm() {
        this.settingsService.update(this.settings).subscribe(
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
                this.settingsService.upload(fileToUpload, this.settings).subscribe(
                    (response) => {
                        sessionStorage.setItem('settings', JSON.stringify(response));
                        this.router.navigate(['/']);
                    },
                    (error) => { throw (error); }
                );
            }
        } else {
            this.router.navigate(['/']);
        }
    }
}
