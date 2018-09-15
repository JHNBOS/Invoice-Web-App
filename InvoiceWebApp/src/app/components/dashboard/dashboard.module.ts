import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ToastyModule } from 'ngx-toasty';

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
        DashboardRoutingModule,
        ToastyModule.forRoot()
    ],
    providers: [
    ],
    exports: [
        DashboardComponent
    ]
})
export class DashboardModule { }
