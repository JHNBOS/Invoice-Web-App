import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompanyComponent } from './company.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { AuthGuard } from '../shared/authguard.service';
import { DetailCompanyComponent } from './detail-company/detail-company.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { ImportCompanyComponent } from './import-company/import-company.component';

const routes: Routes = [
    {
        path: 'companies',
        children: [
            { path: '', component: CompanyComponent, canActivate: [AuthGuard], data: { title: 'Companies' } },
            { path: 'add', component: AddCompanyComponent, canActivate: [AuthGuard], data: { title: 'Add Company' } },
            { path: 'details/:id', component: DetailCompanyComponent, canActivate: [AuthGuard], data: { title: 'Company Details' } },
            { path: 'edit/:id', component: EditCompanyComponent, canActivate: [AuthGuard], data: { title: 'Edit Company' } },
            { path: 'import', component: ImportCompanyComponent, canActivate: [AuthGuard], data: { title: 'Import Companies' } },
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

export class CompanyRoutingModule { }
