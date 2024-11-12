import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FollowService } from '../follow-service.service';
import { IUser, User } from '../models/user';
import { LoginServiceService } from '../login/login-service.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-following-followers',
  templateUrl: './following-followers.component.html',
  styleUrls: ['./following-followers.component.css'],
})
export class FollowingFollowersComponent {
  isCardBoxVisible = false;
  isVerifiedFollower=true;
  isFollowing=false;
  isFollowers=false;
  users?:IUser[];
  user?:IUser | any=new User();
  userId: string | null = null;
  followingType:string | any;
  @ViewChild('cardBox') cardBox: ElementRef | undefined;

  constructor(private route: ActivatedRoute,
              private location: Location, 
              private followService:FollowService,
              private loginService:LoginServiceService,
              private router: Router) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
   this.followingType=localStorage.getItem('followingType');
   this.loginService.findByUserId(this.userId).subscribe(
    response => {
      this.user=response;// Navigate to a protected route on successful login
      // Handle successful login
      console.log('response for user'+this.user.full_name);
    },
    error => {
      console.error("error", error);
    }
  );
   if(this.followingType==='Following'){
    this.isVerifiedFollower=false;
    this.isFollowing=true;
    this.isFollowers=false;
   this.followService.fetchFollowing(this.userId).subscribe(res=>{
     this.users=res.following || [];
   });
  } else if(this.followingType==='Followers'){
    this.isFollowers=true;
    this.isVerifiedFollower=false;
    this.isFollowing=false;
     this.followService.fetchFollowers(this.userId).subscribe(resp=>{
      this.users=resp.followers || [];
     });
  }
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

  goBack(): void {
    this.location.back(); // This will navigate to the previous page
  }

  isVerifiedFollowers():void{
    this.isFollowing=false;
    this.isFollowers=false;
    this.isVerifiedFollower=true;
  }


  isFollowingTab():void{
    this.isFollowing=true;
    this.isFollowers=false;
    this.isVerifiedFollower=false;
    this.followService.fetchFollowing(this.userId).subscribe(res=>{
      this.users=res.following || [];
    });
  }

  isFollowersTab():void{
    this.isFollowers=true;
    this.isFollowing=false;
    this.isVerifiedFollower=false;
    this.followService.fetchFollowers(this.userId).subscribe(resp=>{
      this.users=resp.followers || [];
     });
  }

  unFollow(userId:any):void{
    this.followService.delete(userId).subscribe(resp=>{
          this.ngOnInit();   
    });
  }

  follow(userId:any):void{
    this.followService.follow(userId).subscribe(resp=>{
          this.ngOnInit();   
    });
  }

  profilePageRoute(userId?:string):void{
    console.log('user id'+userId);
    console.log('user profile');
    this.router.navigate(['/dashboard/profile', userId]); 
  }

}