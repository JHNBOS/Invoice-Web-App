import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ngx-currency-mask';
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from 'ngx-currency-mask/src/currency-mask.config';
import { MaterialModule } from '../../material.module';
import { CustomErrorHandler } from '../../shared/error-handler';
import { AddressService } from '../../shared/services/address.service';
import { DebtorService } from '../../shared/services/debtor.service';
import { InvoiceService } from '../../shared/services/invoice.service';
import { InvoiceItemService } from '../../shared/services/invoice_item.service';
import { DebtorDropdownModule } from '../debtor/debtor-dropdown/debtor-dropdown.module';
import { ModalModule } from '../modal/modal.module';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { DetailInvoiceComponent } from './detail-invoice/detail-invoice.component';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';
import { InvoiceComponent } from './invoice.component';
import { InvoiceRoutingModule } from './invoice.routing';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: "left",
    allowNegative: false,
    allowZero: true,
    decimal: ",",
    precision: 2,
    prefix: "",
    suffix: "",
    thousands: "."
};

@NgModule({
    declarations: [
        InvoiceComponent,
        CreateInvoiceComponent,
        DetailInvoiceComponent,
        EditInvoiceComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        DebtorDropdownModule,
        CurrencyMaskModule,
        ModalModule,
        MaterialModule,
        InvoiceRoutingModule
    ],
    providers: [
        InvoiceService,
        InvoiceItemService,
        DebtorService,
        AddressService,
        { provide: ErrorHandler, useClass: CustomErrorHandler },
        { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
    ],
    exports: [
        InvoiceComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class InvoiceModule { }
