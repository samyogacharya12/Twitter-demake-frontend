import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./login/AuthGaurd";
import {LoginComponent} from "./login/login.component";
import {AppComponent} from "./app.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path: 'registration', component: RegistrationComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/profile/:id', component: ProfileComponent },
  { path: '**', redirectTo: 'login' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
