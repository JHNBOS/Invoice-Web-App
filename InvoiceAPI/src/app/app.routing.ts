import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DebtorComponent } from './debtor/debtor.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { AuthGuard } from './shared/authguard.service';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: { title: '' }
    },
    {
        path: 'users',
        component: UserComponent,
        canActivate: [AuthGuard],
        data: { title: 'Users' }
    },
    {
        path: 'debtors',
        component: DebtorComponent,
        canActivate: [AuthGuard],
        data: { title: 'Debtors' }
    },
    {
        path: 'invoices',
        component: InvoiceComponent,
        canActivate: [AuthGuard],
        data: { title: 'Invoices' }
    },
    {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Sign In' }
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
