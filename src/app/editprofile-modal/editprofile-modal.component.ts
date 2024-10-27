import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-editprofile-modal',
  templateUrl: './editprofile-modal.component.html',
  styleUrls: ['./editprofile-modal.component.css'],
})
export class EditprofileModalComponent {
  @Input() isVisible = false; // Visibility control input
  @Output() close = new EventEmitter<void>(); // Event to close modal
  profileData = { name: '', bio: '', location: '', website: '' }; // Model for form data
  public photoUrl: string | ArrayBuffer | null | undefined = null;

  @ViewChild('fileInput') fileInput!: ElementRef;

  ngOnChanges() {
    if (this.isVisible) {
      this.setBodyBackground();
    } else {
      this.resetBodyBackground();
    }
  }

  public setBodyBackground() {
    document.body.style.backgroundColor = 'rgba(128, 128, 128, 0.5)'; // Adjust the transparency level as needed
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }

  public resetBodyBackground() {
    document.body.style.backgroundColor = ''; // Reset the background color
    document.body.style.overflow = ''; // Allow scrolling again
  }

  public onClose() {
    this.isVisible = false;
  }

  closeModal() {
    this.close.emit(); // Emit close event
  }

  public saveChanges() {
    console.log('Profile data saved:', this.profileData);
    // Save profile data, or emit data if needed
    this.closeModal();
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  // Method to handle file selection
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.photoUrl = e.target?.result; // Assign the image source
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  // Method to remove the photo
  removePhoto(event: MouseEvent) {
    event.stopPropagation(); // Prevent click event from triggering the file input
    this.photoUrl = null; // Reset the photo URL
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // Reset the file input value
    }
  }
}
