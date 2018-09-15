import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

    @Input('title') title = 'Title';
    @Input('redirectOnClose') redirectOnClose = false;
    @Input('redirectTo') redirectTo = '/';
    @Input('showModal') showModal = false;

    constructor(private router: Router) { }

    ngOnInit() { }

    closeModal() {
        this.showModal = false;

        setTimeout(() => {
            if (this.redirectOnClose) {
                this.router.navigate([this.redirectTo]);
            }
        }, 500);
    }
}
