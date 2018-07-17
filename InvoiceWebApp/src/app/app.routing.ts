import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddDebtorComponent } from './components/debtor/add-debtor/add-debtor.component';
import { DebtorComponent } from './components/debtor/debtor.component';
import { DetailDebtorComponent } from './components/debtor/detail-debtor/detail-debtor.component';
import { EditDebtorComponent } from './components/debtor/edit-debtor/edit-debtor.component';
import { ImportDebtorComponent } from './components/debtor/import-debtor/import-debtor.component';
import { CreateInvoiceComponent } from './components/invoice/create-invoice/create-invoice.component';
import { DetailInvoiceComponent } from './components/invoice/detail-invoice/detail-invoice.component';
import { EditInvoiceComponent } from './components/invoice/edit-invoice/edit-invoice.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { DetailUserComponent } from './components/user/detail-user/detail-user.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { ImportUserComponent } from './components/user/import-user/import-user.component';
import { LoginComponent } from './components/user/login/login.component';
import { ResetPasswordComponent } from './components/user/reset-password/reset-password.component';
import { UserComponent } from './components/user/user.component';
import { AuthGuard } from './shared/authguard.service';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: { title: ' ', roles: [1, 2] }
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
