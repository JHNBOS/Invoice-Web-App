import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ToastyModule } from 'ng2-toasty';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing';

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
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
