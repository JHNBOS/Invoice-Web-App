import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastyModule } from 'ngx-toasty';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { DebtorModule } from './components/debtor/debtor.module';
import { InvoiceModule } from './components/invoice/invoice.module';
import { ModalModule } from './components/modal/modal.module';
import { SettingsModule } from './components/settings/settings.module';
import { UserModule } from './components/user/user.module';
import { AuthenticationService } from './shared/authentication.service';
import { AuthGuard } from './shared/authguard.service';
import { CustomErrorHandler } from './shared/error-handler';
import { ApplicationService } from './shared/services/application.service';
import { RoleService } from './shared/services/role.service';
import { SettingsService } from './shared/services/settings.service';

export function app_Init(appService: ApplicationService) {
    return () => appService.initializeApp();
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        UserModule,
        DashboardModule,
        DebtorModule,
        InvoiceModule,
        SettingsModule,
        ModalModule,
        NgxSpinnerModule,
        ToastyModule.forRoot(),
        AppRoutingModule
    ],
    exports: [
        ToastyModule
    ],
    providers: [
        RoleService,
        SettingsService,
        ApplicationService,
        { provide: AuthGuard, useClass: AuthGuard },
        { provide: AuthenticationService, useClass: AuthenticationService },
        { provide: ErrorHandler, useClass: CustomErrorHandler },
        { provide: APP_INITIALIZER, useFactory: app_Init, deps: [ApplicationService], multi: true },
    ],
    bootstrap: [
        AppComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AppModule { }
