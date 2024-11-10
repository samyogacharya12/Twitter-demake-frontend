import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from "./login/AuthGaurd";
import { HttpClientModule } from '@angular/common/http';
import {LoginServiceService} from "./login/login-service.service";
import {FormsModule} from "@angular/forms";
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { CommentBoxComponent } from './comment-box/comment-box.component'; // Ensure it's declared
import { EditprofileModalComponent } from './editprofile-modal/editprofile-modal.component';
import { FollowingFollowersComponent } from './following-followers/following-followers.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegistrationComponent,
    ProfileComponent,
    CommentBoxComponent,
    EditprofileModalComponent,
    FollowingFollowersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [LoginServiceService,
    AuthGuard],
  bootstrap: [AppComponent]  // Ensure you have AppComponent in the bootstrap array

})
export class AppModule { }
