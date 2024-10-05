import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AppComponent} from "./app.component";
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatusPostComponent } from './status-post/status-post.component';
import { CommentBoxComponent } from './comment-box/comment-box.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path: 'registration', component: RegistrationComponent},
  {path: 'status', component: StatusPostComponent},
  { path: 'dashboard', component: DashboardComponent},
  {path:'comment', component: CommentBoxComponent},
  { path: '**', redirectTo: 'login' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }