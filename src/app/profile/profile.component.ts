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
  selectedFile?: File;
  imagePreviewUrl: string | ArrayBuffer | null = null; // This will store the preview URL
  showUpdateModel = false;
  constructor(private router: Router,private location:Location,private loginService: LoginServiceService ) {}
  user: User = new User(); // Initialize user to an empty object
  isOpen: boolean = false;
  ngOnInit(): void {
    console.log(" ngOnInit " +this.imagePreviewUrl);
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


  onImageUpload(event: any) {
    this.selectedFile = event.target.files[0]; 
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imagePreviewUrl = reader.result; // Store the image URL to be used in the template
    };
    console.log("Inside image url "+this.imagePreviewUrl);
    if(this.selectedFile){
    reader.readAsDataURL(this.selectedFile);
    }
  }
   
  updateUser():void{
    const formData = new FormData();
    if(this.user.full_name){
    formData.append('full_name', this.user.full_name);
    }
    if(this.user.username){
    formData.append('username', this.user?.username);
    }
    if(this.selectedFile){
      formData.append('media', this.selectedFile);
    }
    this.loginService.updateUser(formData).subscribe(res=>{
        this.goBack();
    });
  }

  openModal(): void {
    this.isOpen = true;
  }

   goBack(): void {
    this.isOpen=false;
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
