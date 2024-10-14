import { Component } from '@angular/core';
import { LoginServiceService } from './../login/login-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  constructor(private userService: LoginServiceService) {}
  checkUsername=false;
  isInvalidEmail=false;
   onSelectUsername(event: any):void{
    if(this.user.username.length<3){
     this.checkUsername=true;
     console.log('character is less');
    } else{
      this.checkUsername=false;
    }
   }

   validateEmail(event: any): void {
    // Simple email regex pattern
    console.log('simple email regex pattern');
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (emailPattern.test(this.user.email)) {
      // The email is valid
      this.isInvalidEmail = false;
      console.log('Email is valid');
    } else {
      // The email is not valid
      this.isInvalidEmail = true;
      console.log('Email is not valid');
    }

  }

  user = {
    username: '',
    phone: '',
    dobMonth: '',
    dobDay: '',
    dobYear: '',
    password: '',
    email: '',
    birth_date: ''
  };

  showSignUpModal = false;

  
  
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  days = Array.from({ length: 31 }, (_, i) => i + 1);
  years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  // Helper function to format the date into YYYY-MM-DD
  formatDate(year: string, month: string, day: string): string {
    const monthIndex = this.months.indexOf(month) + 1;
    const paddedMonth = monthIndex < 10 ? `0${monthIndex}` : monthIndex.toString();
    const paddedDay = +day < 10 ? `0${day}` : day;
    return `${year}-${paddedMonth}-${paddedDay}`;
  }

  onSubmit() {
    const formattedDate = this.formatDate(this.user.dobYear, this.user.dobMonth, this.user.dobDay);
    const userData = {
      username: this.user.username,
      phone: this.user.phone,
      password: this.user.password,
      email: this.user.email,
      birth_date: formattedDate // Send formatted date
    };

    this.userService.registerUser(userData).subscribe({
      next: () => {
        this.showSignUpModal = true; // Show modal on successful registration
        // Automatically close the modal after 5 seconds

                this.resetFormData();

        setTimeout(() => {
          this.closeSignUpPopup();
        }, 5000); // 
      },
      error: (err) => console.error('Registration failed', err)
    });

  }

  resetFormData() {
    this.user = {
      username: '',
      phone: '',
      dobMonth: '',
      dobDay: '',
      dobYear: '',
      password: '',
      email: '',
      birth_date: ''
    };
  }

  useEmailInstead() {
    console.log('Switching to email input');
  }

  closeSignUpPopup() {
    this.showSignUpModal = false; // Close modal
  }
}
