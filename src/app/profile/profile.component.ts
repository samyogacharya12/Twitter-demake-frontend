import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoginServiceService } from '../login/login-service.service';
import { User } from '../models/user';
import { People } from '../models/people';
import { TwitterServiceService } from '../twitter-service.service';
import { ActivatedRoute } from '@angular/router';
import { FollowService } from '../follow-service.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  showFollowingDashboard=false;
  userId: string | null = null;
  showProfile=false;
  isAdminPage=false;
  userProfiles?:User[];
  user: User = new User();
  peoples?:People[];
  selectedFile?: File;
  imagePreviewUrl: string | ArrayBuffer | null = null; // This will store the preview URL
  showUpdateModel = false;
  isModalVisible = false;
  isOpen: boolean = false;
  profileImageUrl:any;
  constructor(private route: ActivatedRoute,
    private router: Router,private location:Location, 
    private loginService:LoginServiceService, 
    private twitterServuce:TwitterServiceService,
    private followService:FollowService) {
    
  }
  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    if(this.userId===localStorage.getItem('userId')){
      this.showProfile=true;
      this.isAdminPage=true;
      console.log(this.showProfile);
    } else{
      this.showProfile=false;
      this.isAdminPage=false;
    }
   this.loginService.findByUserId(this.userId).subscribe(
    response => {
      this.user=response;// Navigate to a protected route on successful login
      // Handle successful login
      console.log('response for user'+this.user.is_followed);
      console.log('response for user cover image'+this.user.header_image_url);
    },
    error => {
      console.error("error", error);
    }
  );
  this.twitterServuce.fetchPeoples().subscribe(res=>{
       this.peoples=res;
  }); 
  this.followService.fetchFollowers(this.userId).subscribe(res=>{
   this.userProfiles=res;
  });

  }


  displayFollowing():void{
    this.showFollowingDashboard=true;
  }

  navigateWithParams(id:any) {
    // Using `navigate` with route parameters and query parameters
    this.router.navigate(['/dashboard/profile', id]); 
    this.ngOnInit();   
  }

  follow(userId:any):void{
    this.followService.follow(userId).subscribe(resp=>{
          this.ngOnInit();   
    });
  }

  unFollow(userId:any):void{
    this.followService.delete(userId).subscribe(resp=>{
          this.ngOnInit();   
    });
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

 

  public openModal() {
    this.isModalVisible = true;
  }

  public closeModal() {
    this.isModalVisible = false;
  }
}