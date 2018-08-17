import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastyModule } from 'ngx-toasty';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { DebtorModule } from './components/debtor/debtor.module';
import { InvoiceModule } from './components/invoice/invoice.module';
import { SettingsModule } from './components/settings/settings.module';
import { UserModule } from './components/user/user.module';
import { AuthenticationService } from './shared/authentication.service';
import { AuthGuard } from './shared/authguard.service';
import { CustomErrorHandler } from './shared/error-handler';
import { RoleService } from './shared/services/role.service';
import { SettingsService } from './shared/services/settings.service';
import { SharedService } from './shared/services/shared.service';

//registerLocaleData(localeNL, 'nl');

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
        ToastyModule.forRoot(),
        AppRoutingModule
    ],
    exports: [
        ToastyModule
    ],
    providers: [
        SharedService,
        RoleService,
        SettingsService,
        { provide: AuthGuard, useClass: AuthGuard },
        { provide: AuthenticationService, useClass: AuthenticationService },
        { provide: ErrorHandler, useClass: CustomErrorHandler },
        //{ provide: LOCALE_ID, useValue: 'nl' }
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
