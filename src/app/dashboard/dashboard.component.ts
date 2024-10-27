import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { TwitterServiceService } from '../twitter-service.service';
import { TweetTs } from '../models/tweet.ts';
import { fakeAsync } from '@angular/core/testing';
import { LoginServiceService } from '../login/login-service.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isOpen: boolean = false;
  imagePreviewUrl: string | ArrayBuffer | null = null; // This will store the preview URL
  selectedFile?: File;
  isHomeDashboard?:boolean=true;
  isFollowingDashboard?:boolean=false;
  role?: string | any;
  userName?: string = 'John Doe';
  statusList?: [];
  followers?: number = 1500;
  following?: number = 300;
  posts?: number = 45;
  commentCount = 123;
  retweetCount = 456;
  likeCount = 789;
  showNotifications: boolean = false;
  showComment: boolean = false;
  tweets?:TweetTs[];
  content: string = ''; 
  tweet = { content: '', media_url: '' };
  isVisible = false;
  isModalVisible = false;
  commentInput = '';
  comments = ['Great post!', 'Love this!'];


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]; 
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imagePreviewUrl = reader.result; // Store the image URL to be used in the template
    };
    if(this.selectedFile){
    reader.readAsDataURL(this.selectedFile);
    }
  }

  removeImage() {
    this.selectedFile = undefined;
    this.imagePreviewUrl = null; // Reset the image preview
    const fileInput: HTMLInputElement = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // Reset the file input
    }
  }

  ngOnInit(): void {
    this.twitterService.fetchTweets().subscribe(
      response => {
        this.tweets=response;// Navigate to a protected route on successful login
        // Handle successful login
      },
      error => {
        console.error("error", error);
      }
    );
    this.role = localStorage.getItem("role");
    this.loginService.me().subscribe(response=>{
         localStorage.setItem("userId", response.id);
         console.log(' current user id '+ response.id);
    });
  }

  homePageDashboard():void{
    console.log("home page dashboard");
    this.isHomeDashboard=true;
    this.isFollowingDashboard=false;
  }

  followingPageDashboard():void{
    console.log("following page dashboard");
    this.isHomeDashboard=false;
    this.isFollowingDashboard=true;
  }



  submit():void{
    const formData = new FormData();
    if (!this.selectedFile) {
      console.error('No file selected');
    }  else{
      formData.append('media', this.selectedFile);
    }
    console.log('data' +this.content);
    this.tweet.content=this.content;
    formData.append('content', this.tweet.content);
    this.twitterService.submit(formData).subscribe(
      response=>{
        if(response){
        this.content='';
        this.selectedFile=undefined;
        }
      }
    )
    this.ngOnInit();
  }
  // Function to open the modal
  openModal() {
    this.isModalVisible = true;
  }

  // Function to close the modal
  closeModal() {
    this.isModalVisible = false;
  }

  // Function to add a comment
  addComment() {
    if (this.commentInput.trim()) {
      this.comments.push(this.commentInput);
      this.commentInput = '';
    }
  }

  newPost?: string = '';

  recentPosts: { content: string, timestamp: string }[] = [
    { content: 'Had a great day at the beach!', timestamp: '2 hours ago' },
    { content: 'Loving the new Angular features.', timestamp: '1 day ago' },
    { content: 'Just finished a 5K run!', timestamp: '3 days ago' }
  ];

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }
  constructor(private twitterService: TwitterServiceService,private loginService: LoginServiceService ,private router: Router) { }

  increaseCount(reaction: string) {
    if (reaction === 'comment') {
      this.commentCount++;
      this.showComment = true;
    } else if (reaction === 'retweet') {
      this.retweetCount++;
    } else if (reaction === 'like') {
      this.likeCount++;
    }
  }

  showReactionOptions = false;

  // Selected reaction, default to like
  selectedReaction = '👍';

  // Method to show reactions on hover
  showReactions() {
    this.showReactionOptions = true;
  }




  toggleCommentPopup() {
    this.showComment = !this.showComment;
  }

  // Method to hide reactions when not hovering
  hideReactions() {
    this.showReactionOptions = false;
  }

  // Method to select a reaction
  selectReaction(reaction: string) {
    this.selectedReaction = reaction;
    this.hideReactions();  // Hide the options after selecting
  }


}
