import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastyModule } from 'ng2-toasty';
import { DebtorDropdownModule } from '../debtor/debtor-dropdown/debtor-dropdown.module';
import { CustomErrorHandler } from '../shared/error-handler';
import { AddressService } from '../shared/services/address.service';
import { DebtorService } from '../shared/services/debtor.service';
import { InvoiceService } from '../shared/services/invoice.service';;
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { InvoiceComponent } from './invoice.component';
import { InvoiceRoutingModule } from './invoice.routing';

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
        { provide: ErrorHandler, useClass: CustomErrorHandler }
    ],
    exports: [
        InvoiceComponent
    ]
})
export class InvoiceModule { }
