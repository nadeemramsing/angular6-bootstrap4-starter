import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

//Modules
import { PagesRoutingModule } from './pages-routing.module';

//Components
import { PagesComponent } from './pages.component';
import { NavbarComponent } from './../common/components/navbar/navbar.component';

//Directives


const PAGES_COMPONENTS = [
  PagesComponent,
  NavbarComponent
];

const PAGES_DIRECTIVES = [

]

@NgModule({
  imports: [
    PagesRoutingModule,
    CommonModule
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    ...PAGES_DIRECTIVES,
  ]
})
export class PagesModule { }
