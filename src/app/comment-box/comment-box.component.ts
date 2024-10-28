import { Component } from '@angular/core';
import { TwitterServiceService } from '../twitter-service.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.css']
})
export class CommentBoxComponent {
  showCommentPopup = true; // Control popup visibility
  commentInput = ''; // Input for comment
  comments: string[] = []; // Array to hold comments
  remainingValues?: number = 280; // Twitter-like character limit
  maxChars?:number | any=280;
  parentId?:any;
  userId?:any;
  username?:string;
  profileUrl?:string;
  mediaUrl?:string;
  isOpen=true;
  showCommentModal = false;


  constructor(private twitterService: TwitterServiceService, private router: Router,private location: Location) { }

  ngOnInit(): void {
     this.parentId=localStorage.getItem('parentTweetId');
     this.userId=localStorage.getItem('userId');
     
     this.twitterService.fetchTweetById(this.parentId).subscribe(response=>{
           this.username=response.user.username;
           this.profileUrl=response.user.profileUrl;
           this.mediaUrl=response.media_url;
           response.reply_ids.forEach((reply: any) => {
            this.twitterService.fetchTweetById(reply).subscribe(res=>{
              console.log('res'+res.content);
              this.comments?.push(res.content);
            })
           });
     });
  }

  toggleCommentModal() {
    this.showCommentModal = !this.showCommentModal;
  }
  
  navigateDashboard():void{
    this.showCommentPopup=false;
  }

  toggleCommentPopup() {
    this.showCommentPopup = !this.showCommentPopup;
  }

  // Calculate remaining characters for the input
  calculateRemainingChars() {
    this.remainingValues = 280 - this.commentInput.length;
  }
}
