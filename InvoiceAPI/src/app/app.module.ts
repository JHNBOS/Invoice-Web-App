import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ToastyModule } from 'ng2-toasty';
import { CustomErrorHandler } from './shared/error-handler';

import { AppComponent } from './app.component';

import { DashboardModule } from './dashboard/dashboard.module';
import { UserModule } from './user/user.module';
import { DebtorModule } from './debtor/debtor.module';
import { InvoiceModule } from './invoice/invoice.module';

import { AppRoutingModule } from './app.routing';
import { SharedService } from './shared/services/shared.service';
import { AuthGuard } from './shared/authguard.service';
import { AuthenticationService } from './shared/authentication.service';

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
        ToastyModule.forRoot(),
        AppRoutingModule
    ],
    exports: [
        ToastyModule
    ],
    providers: [
        SharedService,
        { provide: AuthGuard, useClass: AuthGuard },
        { provide: AuthenticationService, useClass: AuthenticationService },
        { provide: ErrorHandler, useClass: CustomErrorHandler }
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
