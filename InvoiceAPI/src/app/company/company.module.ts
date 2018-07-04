import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { CompanyService } from '../shared/services/company.service';
import { AddressService } from '../shared/services/address.service';
import { LocatedAtService } from '../shared/services/located-at.service';
import { CompanyRoutingModule } from './company.routing';

import { ToastyModule } from 'ng2-toasty';
import { CustomErrorHandler } from '../shared/error-handler';

import { CompanyComponent } from './company.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { DetailCompanyComponent } from './detail-company/detail-company.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { ImportCompanyComponent } from './import-company/import-company.component';

@NgModule({
  declarations: [
    CompanyComponent,
    AddCompanyComponent,
    DetailCompanyComponent,
    EditCompanyComponent,
    ImportCompanyComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ToastyModule.forRoot(),
    CompanyRoutingModule
  ],
  providers: [
    CompanyService,
    AddressService,
    LocatedAtService,
    { provide: ErrorHandler, useClass: CustomErrorHandler}
  ],
  exports: [
    CompanyComponent
  ]
})
export class CompanyModule { }
