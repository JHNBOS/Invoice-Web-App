import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './modal.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule
    ],
    declarations: [
        ModalComponent
    ],
    exports: [
        ModalComponent
    ]
})
export class ModalModule { }
