import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/authguard.service';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { InvoiceComponent } from './invoice.component';

const routes: Routes = [
    {
        path: 'invoices',
        children: [
            { path: '', component: InvoiceComponent, canActivate: [AuthGuard], data: { title: 'Invoices' } },
            { path: 'create', component: CreateInvoiceComponent, canActivate: [AuthGuard], data: { title: 'Create Invoice' } }
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
