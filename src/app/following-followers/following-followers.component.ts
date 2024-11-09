import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-following-followers',
  templateUrl: './following-followers.component.html',
  styleUrls: ['./following-followers.component.css'],
})
export class FollowingFollowersComponent {
  isCardBoxVisible = false;
  @ViewChild('cardBox') cardBox: ElementRef | undefined;

  constructor(private location: Location) {}

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

  goBack(): void {
    this.location.back(); // This will navigate to the previous page
  }
}
