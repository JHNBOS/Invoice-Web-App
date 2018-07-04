import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { InvoiceService } from '../shared/services/invoice.service';
import { DebtorService } from '../shared/services/debtor.service';
import { AddressService } from '../shared/services/address.service';
import { LivesAtService } from '../shared/services/lives-at.service';
import { LocatedAtService } from '../shared/services/located-at.service';
import { InvoiceRoutingModule } from './invoice.routing';

import { ToastyModule } from 'ng2-toasty';
import { CustomErrorHandler } from '../shared/error-handler';

import { InvoiceComponent } from './invoice.component';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';

import { DebtorDropdownModule } from '../debtor/debtor-dropdown/debtor-dropdown.module';

@NgModule({
  declarations: [
    InvoiceComponent,
    CreateInvoiceComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    DebtorDropdownModule,
    ToastyModule.forRoot(),
    InvoiceRoutingModule
  ],
  providers: [
    InvoiceService,
    DebtorService,
    AddressService,
    LivesAtService,
    LocatedAtService,
    { provide: ErrorHandler, useClass: CustomErrorHandler}
  ],
  exports: [
    InvoiceComponent
  ]
})
export class InvoiceModule { }
