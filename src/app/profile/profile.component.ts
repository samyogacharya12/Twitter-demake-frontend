import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoginServiceService } from '../login/login-service.service';
import { User } from '../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent{

  constructor(private router: Router,private location:Location,private loginService: LoginServiceService ) {}
  user?:User;

  ngOnInit(): void {
   this.loginService.findByUserId(localStorage.getItem('userId')).subscribe(
    response => {
      this.user=response;// Navigate to a protected route on successful login
      // Handle successful login
    },
    error => {
      console.error("error", error);
    }
  );
  }

   goBack(): void {
    this.location.back();  // This will navigate to the previous page
  }


  public scrollLeft() {
    const container = document.querySelector('.overflow-x-auto') as HTMLElement;
    container.scrollBy({ left: -250, behavior: 'smooth' }); // Adjust scroll distance as needed
  }

  public scrollRight() {
    const container = document.querySelector('.overflow-x-auto') as HTMLElement;
    container.scrollBy({ left: 250, behavior: 'smooth' }); // Adjust scroll distance as needed
  }
}
