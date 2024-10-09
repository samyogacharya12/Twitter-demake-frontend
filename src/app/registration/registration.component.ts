import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent{
  user = {
    name: '',
    phone: '',
    dobMonth: '',
    dobDay: '',
    dobYear: ''
  };

  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  days = Array.from({ length: 31 }, (_, i) => i + 1);
  years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  onSubmit() {
    console.log('User data:', this.user);
  }

  useEmailInstead() {
    console.log('Switching to email input');
  }
}