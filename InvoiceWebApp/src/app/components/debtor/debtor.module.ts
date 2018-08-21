import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastyModule } from 'ngx-toasty';
import { CustomErrorHandler } from '../../shared/error-handler';
import { AddressService } from '../../shared/services/address.service';
import { DebtorService } from '../../shared/services/debtor.service';
import { DebtorHasAddressService } from '../../shared/services/debtor_has_address.service';
import { ModalModule } from '../modal/modal.module';
import { AddDebtorComponent } from './add-debtor/add-debtor.component';
import { DebtorComponent } from './debtor.component';
import { DebtorRoutingModule } from './debtor.routing';
import { DetailDebtorComponent } from './detail-debtor/detail-debtor.component';
import { EditDebtorComponent } from './edit-debtor/edit-debtor.component';
import { ImportDebtorComponent } from './import-debtor/import-debtor.component';

@NgModule({
    declarations: [
        DebtorComponent,
        AddDebtorComponent,
        DetailDebtorComponent,
        EditDebtorComponent,
        ImportDebtorComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ModalModule,
        ToastyModule.forRoot(),
        DebtorRoutingModule
    ],
    providers: [
        DebtorService,
        AddressService,
        DebtorHasAddressService,
        { provide: ErrorHandler, useClass: CustomErrorHandler }
    ],
    exports: [
        DebtorComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class DebtorModule { }
