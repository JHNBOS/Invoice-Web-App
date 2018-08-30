import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

    @Input('title') title: string = 'Title';
    @Input('redirectOnClose') redirectOnClose: boolean = false;
    @Input('redirectTo') redirectTo: string = '/';
    @Input('showModal') showModal: boolean = false;

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
