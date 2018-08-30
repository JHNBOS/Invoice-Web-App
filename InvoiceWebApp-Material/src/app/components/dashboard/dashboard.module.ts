import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { ModalModule } from '../modal/modal.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing';

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        ModalModule,
        MaterialModule,
        DashboardRoutingModule,
    ],
    providers: [
    ],
    exports: [
        DashboardComponent
    ]
})
export class DashboardModule { }
