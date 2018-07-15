import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastyModule } from 'ngx-toasty';
import { DebtorService } from '../../../shared/services/debtor.service';
import { DebtorDropdownComponent } from './debtor-dropdown.component';

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
