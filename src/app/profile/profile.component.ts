import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
   isModalVisible = false;

  constructor(private router: Router,private location:Location) {
    
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

 

  public openModal() {
    this.isModalVisible = true;
  }

  public closeModal() {
    this.isModalVisible = false;
  }
}
