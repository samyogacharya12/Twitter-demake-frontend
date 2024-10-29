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
  userId: string | null = null;
  showProfile=false;
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
    console.log('ngOnInit is called'); 
    this.userId = this.route.snapshot.paramMap.get('id');
    console.log('user id'+ this.userId);
    console.log('server user id'+ localStorage.getItem('userId'));
    if(this.userId===localStorage.getItem('userId')){
      this.showProfile=true;
      console.log(this.showProfile);
    } else{
      this.showProfile=false;
    }
   this.loginService.findByUserId(this.userId).subscribe(
    response => {
      this.user=response;// Navigate to a protected route on successful login
      // Handle successful login
      console.log('response for user'+this.user.profile_image_url);
    },
    error => {
      console.error("error", error);
    }
  );
  this.twitterServuce.fetchPeoples().subscribe(res=>{
       this.peoples=res.detail;
  }); 
  }

  follow(userId:any):void{
    console.log(' follow ' +userId);
    this.followService.follow(userId).subscribe(resp=>{
          console.log('follow is done'+resp);
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