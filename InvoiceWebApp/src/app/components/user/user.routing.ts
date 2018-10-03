import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../shared/authguard.service';
import { AddUserComponent } from './add-user/add-user.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ImportUserComponent } from './import-user/import-user.component';
import { UserComponent } from './user.component';

const routes: Routes = [
    {
        path: 'users',
        children: [
            {
                path: '',
                component: UserComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'Users',
                    roles: [1]
                }
            },
            {
                path: 'edit/:email',
                component: EditUserComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'Edit User',
                    roles: [1, 2]
                }
            },
            {
                path: 'add/:company',
                component: AddUserComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'Add User',
                    roles: [1]
                }
            },
            {
                path: 'details/:email',
                component: DetailUserComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'User Details',
                    roles: [1, 2]
                }
            },
            {
                path: 'import',
                component: ImportUserComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'Import Users',
                    roles: [1]
                }
            }
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

export class UserRoutingModule { }
