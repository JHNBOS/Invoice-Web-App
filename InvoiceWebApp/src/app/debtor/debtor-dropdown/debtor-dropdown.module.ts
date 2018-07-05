import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule, PathLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';

import { ToastyModule } from 'ng2-toasty';

import { DebtorDropdownComponent } from './debtor-dropdown.component';

import { DebtorService } from '../../shared/services/debtor.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        NgSelectModule,
        ToastyModule.forRoot()
    ],
    exports: [
        DebtorDropdownComponent
    ],
    declarations: [
        DebtorDropdownComponent
    ],
    providers: [
        DebtorService,
        { provide: LocationStrategy, useClass: PathLocationStrategy }
    ]
})
export class DebtorDropdownModule { }
