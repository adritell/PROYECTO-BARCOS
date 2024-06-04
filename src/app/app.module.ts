import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TableModule} from 'primeng/table';
import { SocioComponent } from './components/socio/socio.component_admin'
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/auth/login.component';
import { BarcoComponentAdmin } from './components/barco/barco.component.admin';
import { PrincipalComponent } from './components/principal/principal.component';
import { CommonModule } from '@angular/common';





@NgModule({
  declarations: [
    AppComponent,

    SocioComponent, 
    LoginComponent,
    BarcoComponentAdmin,
    PrincipalComponent
    
    ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    TableModule,
    HttpClientModule,
    ReactiveFormsModule,
    DialogModule,
    BrowserAnimationsModule,
    CommonModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
