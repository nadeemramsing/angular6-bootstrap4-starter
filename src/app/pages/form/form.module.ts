import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { CustomFormsModule } from 'ng4-validators';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { FormRoutingModule, routedComponents } from './form-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CustomFormsModule,
    FormRoutingModule,
    FormsModule,
    MDBBootstrapModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...routedComponents
  ]
})
export class FormModule { }
