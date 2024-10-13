import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login-container',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {
  credentials = { email: '', password: '' };
  showPassword = false;
  showSignUpModal: boolean = false;

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
}
