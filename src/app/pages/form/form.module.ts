import { NgModule } from '@angular/core';

import { FormRoutingModule, routedComponents } from './form-routing.module';

@NgModule({
  imports: [
    FormRoutingModule
  ],
  declarations: [
    ...routedComponents
  ]
})
export class FormModule { }
