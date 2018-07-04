import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { DebtorService } from '../shared/services/debtor.service';
import { AddressService } from '../shared/services/address.service';
import { LivesAtService } from '../shared/services/lives-at.service';
import { DebtorRoutingModule } from './debtor.routing';

import { ToastyModule } from 'ng2-toasty';
import { CustomErrorHandler } from '../shared/error-handler';

import { DebtorComponent } from './debtor.component';
import { AddDebtorComponent } from './add-debtor/add-debtor.component';
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
    ToastyModule.forRoot(),
    DebtorRoutingModule
  ],
  providers: [
    DebtorService,
    AddressService,
    LivesAtService,
    { provide: ErrorHandler, useClass: CustomErrorHandler}
  ],
  exports: [
    DebtorComponent
  ]
})
export class DebtorModule { }
