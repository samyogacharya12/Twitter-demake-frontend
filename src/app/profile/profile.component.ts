import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  isModalVisible = false;
  isCardBoxVisible = false;
  @ViewChild('cardBox') cardBox: ElementRef | undefined;
  profileImageUrl: string = '';

  constructor(private router: Router, private location: Location) {}

  goBack(): void {
    this.location.back(); // This will navigate to the previous page
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

  toggleCard(event: Event) {
    event.stopPropagation(); // Prevent click propagation to document
    this.isCardBoxVisible = !this.isCardBoxVisible;
  }

  // Close the card box if clicked outside of it
  @HostListener('document:click', ['$event'])
  closeCardBox(event: MouseEvent) {
    if (this.cardBox && !this.cardBox.nativeElement.contains(event.target)) {
      this.isCardBoxVisible = false; // Close card box if clicked outside
    }
  }

  onOptionClick(event: MouseEvent) {
    event.stopPropagation(); // Prevent click from closing the card-box
    console.log('Option clicked:', event.target); // You can handle option selection here
  }

  onImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImageUrl = reader.result as string; // Display the new image
      };
      reader.readAsDataURL(file);
    }
  }

  triggerImageUpload() {
    const fileInput = document.getElementById(
      'upload-photo'
    ) as HTMLInputElement;
    fileInput.click();
  }

  removeImage(event: Event) {
    event.stopPropagation(); // Prevents triggering image upload on box-content click
    this.profileImageUrl = ''; // Clear the uploaded image
  }
}
