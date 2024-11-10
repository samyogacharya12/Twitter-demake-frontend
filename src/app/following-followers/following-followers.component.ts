import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FollowService } from '../follow-service.service';
import { IUser, User } from '../models/user';

@Component({
  selector: 'app-following-followers',
  templateUrl: './following-followers.component.html',
  styleUrls: ['./following-followers.component.css'],
})
export class FollowingFollowersComponent {
  isCardBoxVisible = false;
  isFollowing=false;
  isFollowers=false;
  users?:IUser[];
  userId: string | null = null;
  followingType:string | any;
  @ViewChild('cardBox') cardBox: ElementRef | undefined;

  constructor(private route: ActivatedRoute,private location: Location, private followService:FollowService) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
   this.followingType=localStorage.getItem('followingType');
   console.log('followingType'+this.followingType);
   if(this.followingType==='Following'){
   this.followService.fetchFollowing(this.userId).subscribe(res=>{
     this.users=res.following || [];
   });
  } else if(this.followingType==='Followers'){
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

  isFollowingTab():void{
    this.isFollowing=true;
    this.isFollowers=false;
  }

  isFollowersTab():void{
    this.isFollowers=true;
    this.isFollowing=false;
  }
}