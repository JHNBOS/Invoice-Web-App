import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomErrorHandler } from '../../shared/error-handler';
import { SettingsService } from '../../shared/services/settings.service';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings.routing';
import { MaterialModule } from '../../material.module';

@NgModule({
    declarations: [
        SettingsComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        MaterialModule,
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
