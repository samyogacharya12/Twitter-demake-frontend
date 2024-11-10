import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { LoginServiceService } from '../login/login-service.service';
import { User } from '../models/user';

@Component({
  selector: 'app-editprofile-modal',
  templateUrl: './editprofile-modal.component.html',
  styleUrls: ['./editprofile-modal.component.css'],
})
export class EditprofileModalComponent {
  selectedFile?: File;
  headerFile?:File;
  constructor(private loginService: LoginServiceService) { }
  userDto:User=new User();
  @Input() isVisible = false; // Visibility control input
  @Output() close = new EventEmitter<void>(); // Event to close modal
  profileData = { name: '', bio: '', location: '', website: '' }; // Model for form data
  public photoUrl: string | ArrayBuffer | null | undefined = null;
  public profileImageUrl: string | ArrayBuffer | null | undefined = null;
  showExistingImage=true;
  showCoverImage=true;
  @ViewChild('fileInput') fileInput!: ElementRef;

  ngOnInit(): void {
    if (this.isVisible) {
      this.setBodyBackground();
    } else {
      this.resetBodyBackground();
    }
    this.loginService.me().subscribe(response=>{
      this.userDto=response;
 });
  }
  updateUser():void{
    const formData = new FormData();
    if(this.userDto.id){
      formData.append('id', this.userDto?.id);
      }

      if(this.selectedFile){
        formData.append('media', this.selectedFile);
      }

    if(this.userDto.full_name){
    formData.append('full_name', this.userDto.full_name);
    }
    if(this.selectedFile){
      formData.append('profile_image', this.selectedFile);
    }

    if(this.headerFile){
      formData.append('header_image', this.headerFile);
    }

    if(this.userDto.location){
    formData.append('location', this.userDto?.location);
    }

    if(this.userDto.bio){
      formData.append('bio', this.userDto?.bio);
      }

      if(this.userDto.website){
        formData.append('website', this.userDto?.website);
        }
        this.loginService.updateUser(formData).subscribe(
          response => {
            console.log('User updated successfully', response);
            location.reload();
            // Handle successful update, e.g., display success message or close modal
          },
          error => {
            console.error('Update failed', error);
            // Handle failure, e.g., show an error message or modal
          }
        );
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
    this.updateUser();
    this.closeModal();
    this.ngOnInit();
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  triggerProfileInput() {
    const fileInput = document.getElementById('profileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  // Method to handle file selection
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0]; // Store the selected file
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileImageUrl = e.target?.result; // Assign the image source
      };
      reader.readAsDataURL(input.files[0]);
    }
    this.showExistingImage=false;
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.headerFile = input.files[0]; // Store the selected file
      const reader = new FileReader();
      reader.onload = (e) => {
        this.photoUrl = e.target?.result; // Assign the image source
      };
      reader.readAsDataURL(input.files[0]);
    }
    this.showCoverImage=false;
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