import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../shared/authguard.service';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
    {
        path: 'settings',
        children: [
            {
                path: '',
                component: SettingsComponent,
                pathMatch: 'full',
                canActivate: [AuthGuard],
                data: {
                    title: 'Settings',
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

export class SettingsRoutingModule { }
