import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastyModule } from 'ng2-toasty';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { DashboardModule } from './dashboard/dashboard.module';
import { DebtorModule } from './debtor/debtor.module';
import { InvoiceModule } from './invoice/invoice.module';
import { AuthenticationService } from './shared/authentication.service';
import { AuthGuard } from './shared/authguard.service';
import { CustomErrorHandler } from './shared/error-handler';
import { SharedService } from './shared/services/shared.service';
import { UserModule } from './user/user.module';

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
