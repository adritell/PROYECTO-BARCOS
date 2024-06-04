import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SocioComponent } from './components/socio/socio.component_admin';
import { LoginComponent } from './components/auth/login.component';
import { AuthGuard } from './guardianes/auth.guard';
import { BarcoComponentAdmin } from './components/barco/barco.component.admin';
import { PrincipalComponent } from './components/principal/principal.component';

const routes: Routes = [
  { path: '', component: PrincipalComponent },
  { path: 'admin', component: SocioComponent, canActivate: [AuthGuard] },
  {path:'login', component: LoginComponent},
  {path:'barcos/admin', component:BarcoComponentAdmin, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
