import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChatComponent } from './chat/chat.component';
import { StatusPostComponent } from './status-post/status-post.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommentBoxComponent } from './comment-box/comment-box.component';
import { CommentBoxViewComponent } from './comment-box-view/comment-box-view.component';
import { ProfileComponent } from './profile/profile.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CommentBoxComponent,
    RegistrationComponent,
    DashboardComponent,
    ChatComponent,
    StatusPostComponent,
    CommentBoxComponent,
    CommentBoxViewComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
