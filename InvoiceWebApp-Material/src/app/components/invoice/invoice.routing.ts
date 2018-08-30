import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../shared/authguard.service';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { InvoiceComponent } from './invoice.component';
import { DetailInvoiceComponent } from './detail-invoice/detail-invoice.component';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';

const routes: Routes = [
    {
        path: 'invoices',
        children: [
            { path: '', component: InvoiceComponent, canActivate: [AuthGuard], data: { title: 'Invoices', roles: [1, 2] } },
            { path: 'create', component: CreateInvoiceComponent, canActivate: [AuthGuard], data: { title: 'Create Invoice', roles: [1] } },
            { path: 'details/:id', component: DetailInvoiceComponent, canActivate: [AuthGuard], data: { title: 'Invoice Details', roles: [1, 2] } },
            { path: 'edit/:id', component: EditInvoiceComponent, canActivate: [AuthGuard], data: { title: 'Edit Invoice', roles: [1] } }
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

export class InvoiceRoutingModule { }
