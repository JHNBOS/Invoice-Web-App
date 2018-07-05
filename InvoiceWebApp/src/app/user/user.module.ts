import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { UserService } from '../shared/services/user.service';
import { UserRoutingModule } from './user.routing';

import { ToastyModule } from 'ng2-toasty';
import { CustomErrorHandler } from '../shared/error-handler';

import { UserComponent } from './user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { ImportUserComponent } from './import-user/import-user.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    UserComponent,
    EditUserComponent,
    AddUserComponent,
    DetailUserComponent,
    ImportUserComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ToastyModule.forRoot(),
    UserRoutingModule
  ],
  providers: [
    UserService,
    { provide: ErrorHandler, useClass: CustomErrorHandler}
  ],
  exports: [
    UserComponent
  ]
})
export class UserModule { }
