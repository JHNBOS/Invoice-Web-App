import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DebtorComponent } from './debtor/debtor.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { AuthGuard } from './shared/authguard.service';
import { LoginComponent } from './user/login/login.component';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: { title: '', roles: [1, 2] }
    },
    {
        path: 'users',
        component: UserComponent,
        canActivate: [AuthGuard],
        data: { title: 'Users', roles: [1] }
    },
    {
        path: 'debtors',
        component: DebtorComponent,
        canActivate: [AuthGuard],
        data: { title: 'Debtors', roles: [1] }
    },
    {
        path: 'invoices',
        component: InvoiceComponent,
        canActivate: [AuthGuard],
        data: { title: 'Invoices', roles: [1, 2] }
    },
    {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Sign In' }
    },
    {
        path: 'forgot',
        component: ResetPasswordComponent,
        data: { title: 'Reset Password' }
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }
