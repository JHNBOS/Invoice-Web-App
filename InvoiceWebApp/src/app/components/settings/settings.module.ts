import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastyModule } from 'ngx-toasty';

import { CustomErrorHandler } from '../../shared/error-handler';
import { SettingsService } from '../../shared/services/settings.service';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings.routing';

@NgModule({
    declarations: [
        SettingsComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ToastyModule.forRoot(),
        SettingsRoutingModule
    ],
    providers: [
        SettingsService,
        { provide: ErrorHandler, useClass: CustomErrorHandler }
    ],
    exports: [
        SettingsComponent
    ]
})
export class SettingsModule { }
