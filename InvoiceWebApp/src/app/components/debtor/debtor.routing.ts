import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../shared/authguard.service';
import { AddDebtorComponent } from './add-debtor/add-debtor.component';
import { DebtorComponent } from './debtor.component';
import { DetailDebtorComponent } from './detail-debtor/detail-debtor.component';
import { EditDebtorComponent } from './edit-debtor/edit-debtor.component';
import { ImportDebtorComponent } from './import-debtor/import-debtor.component';

const routes: Routes = [
    {
        path: 'debtors',
        children: [
            { path: '', component: DebtorComponent, canActivate: [AuthGuard], data: { title: 'Debtors', roles: [1] } },
            { path: 'add/:company', component: AddDebtorComponent, canActivate: [AuthGuard], data: { title: 'Add Debtor', roles: [1] } },
            { path: 'details/:id', component: DetailDebtorComponent, canActivate: [AuthGuard], data: { title: 'Debtor Details', roles: [1, 2] } },
            { path: 'edit/:id', component: EditDebtorComponent, canActivate: [AuthGuard], data: { title: 'Edit Debtor', roles: [1, 2] } },
            { path: 'import', component: ImportDebtorComponent, canActivate: [AuthGuard], data: { title: 'Import Debtors', roles: [1] } }
        ]
    },
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

export class DebtorRoutingModule { }
