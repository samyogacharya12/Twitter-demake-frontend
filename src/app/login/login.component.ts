import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {LoginServiceService} from "./login-service.service";
import { IUser, User } from '../models/user';

@Component({
  selector: 'login-container',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = ''; 
  password: string = '';
  credentials = { username: '', password: '' };
  user: IUser | any=new User();
  constructor(private authService: LoginServiceService, private router: Router) { }
  showPassword = false;
  showSignUpModal: boolean = false;
  showAuthFailModal: boolean = false;


  ngOnInit(): void {
    this.showPassword = false;
  }

  showPasswordTab(): void {
    this.showPassword = true;
  }

  openSignUpPopup() {
    this.showSignUpModal = true;
  }

  closeSignUpPopup() {
    this.showSignUpModal = false;
  }

  closeLoginPopup() {
    this.showAuthFailModal = false;
  }
  login() {

    this.credentials.username=this.username;
    this.credentials.password=this.password;
    this.authService.login(this.credentials).subscribe(
      response => {
        this.router.navigate(['/dashboard']);  // Navigate to a protected route on successful login
        console.log('Login successful');
        // Handle successful login
      },
      error => {
        setTimeout(() => {
          this.closeLoginPopup();
        }, 5000); 
        console.error('Login failed', error);
        // Show the modal when login fails
        this.showAuthFailModal = true;
      }
    );
  }

  closeAuthFailModal() {
    this.showAuthFailModal = false;
  }

}
