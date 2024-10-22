import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'login-container',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { email: '', password: '' };


}