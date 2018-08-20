import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

    @Input('title') title:string = 'Title';
    @Input('body') body:string = 'Lorem ispum dolor et';
    @Input('showModal') showModal:boolean = false;

    constructor() { }

    ngOnInit() {
    }

}
