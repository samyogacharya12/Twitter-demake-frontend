import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { TwitterServiceService } from '../twitter-service.service';
import { LoginServiceService } from '../login/login-service.service';
import { FollowService } from '../follow-service.service';
import {Router} from "@angular/router";
import { TweetTs } from '../models/tweet.ts';
import { People } from '../models/people';
import { IUser, User } from '../models/user';
import { Comments } from '../models/comments';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Post {
  id: number;
  userReacted: boolean;
  likes: number;
  comments: number;
  reposts: number;
  selectedReactionIcon?: string | null;
  reactionType?: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  selectedOption: string = '';
  content: string = ''; 
  tone:string | any;
  peoples?:People[];
  showReactions: { [postId: string]: boolean } = {}; // Object to track reactions per post
  selectedReactionIcon: string | null = null;
  showCommentModal = false;
  isCardBoxVisible = false;
  role?: string | any;
  userId: string | any = null;
  user:User=new User();
  tweet = { content: '', media_url: '', tweet_id:''};
  tweets?:TweetTs[];
  isHomeDashboard?:boolean=true;
  isFollowingDashboard?:boolean=false;
  comments:Comments[]=[];
  comment: Comments = new Comments();
  commentInput?:any;
  parentId?:any;
  selectedFile?: File;
  imagePreviewUrl: string | ArrayBuffer | null = null; // This will store the preview URL
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
  safeMediaUrl:string | any;
  videoPreviewUrl: string | any;
  @ViewChild('cardBox') cardBox: ElementRef | undefined;

  constructor(
    private authService: LoginServiceService,
    private twitterService: TwitterServiceService,private loginService: LoginServiceService,
    private followService: FollowService,
    private sanitizer: DomSanitizer,
    private router: Router) { }

    isMediaUrlAvailable(tweet?:TweetTs): boolean {
      console.log('media url' +tweet?.media_url);
      if(tweet?.media_url){
        return true;
      } else{
        return false;
      }
    }
    
  ngOnInit(): void {
    this.authService.me().subscribe(resp=>{
      localStorage.setItem("userId", resp.id);
      this.userId=localStorage.getItem('userId');
      localStorage.setItem("profile_image_url", resp.profile_image_url);
      this.loginService.findByUserId(this.userId).subscribe(res=>{
        this.user=res;
        console.log('profile image url' +this.user.profile_image_url);
      });
 });
    this.comments=[];
    this.twitterService.fetchTweets().subscribe(
      response => {
        this.tweets=response;
        this.tweets?.forEach((tweet) => {
          this.safeMediaUrl=this.sanitizer.bypassSecurityTrustResourceUrl(tweet.media_url);
          tweet.resource_url=this.safeMediaUrl;
        });
              },
      error => {
        console.error("error", error);
      }
    );
    this.role = localStorage.getItem("role");
    this.parentId=localStorage.getItem('parentTweetId');    
    this.twitterService.fetchTweetById(this.parentId).subscribe(response=>{
          response.reply_ids.forEach((reply: any) => {
           this.twitterService.fetchTweetById(reply).subscribe(res=>{
            this.comment=new Comments();
            this.comment.username=res.user.username;
            this.comment.profileUrl=res.user.profile_image_url;
            this.comment.comment=res.content;
            this.comment.mediaUrl=res.media_url;
            this.comments?.push(this.comment);

           })
          });   
    });
    this.twitterService.fetchPeoples().subscribe(res=>{
      this.peoples=res;
 });
    console.log('following page dashboard'+ this.isFollowingDashboard);
    console.log(' current tweets ' +this.tweets?.length); 
  }

  // Sample notifications data
  notifications = [
    { message: 'Anna started following you', time: '10 minutes ago' },
    { message: 'Mark liked your post', time: '2 hours ago' },
    { message: 'You have a new message from Sarah', time: '1 day ago' },
    { message: 'David commented on your photo', time: '3 days ago' },
  ];

  // sample posts data
  newPosts = [
    {
      id: 1,
      username: 'Elon Musk',
      handle: '@elondude',
      time: '13h',
      content:
        'Subscribe to unlock new features and if eligible, receive a share of revenue.',
      avatar: 'https://example.com/avatar1.jpg',
      imageUrl: 'https://loremflickr.com/800/800',
      likes: 0,
      comments: 0,
      reposts: 0,
      userReacted: false,
      verified: true,
      reactionType: '',
    },
    {
      id: 2,
      username: 'Jane Doe',
      handle: '@janedoe',
      time: '5h',
      content: 'This is a great day to learn Angular!',
      avatar: 'https://example.com/avatar2.jpg',
      imageUrl: 'https://loremflickr.com/1920/1920',
      likes: 0,
      comments: 0,
      reposts: 0,
      userReacted: false,
      verified: false,
      reactionType: '',
    },
    // Add more posts as needed
  ];

  isVisible = false;

  isModalVisible = false;


  homePageDashboard():void{
    console.log("home page dashboard");
    this.isHomeDashboard=true;
    this.isFollowingDashboard=false;
    this.tweets=[];
    this.twitterService.fetchTweets().subscribe(
      response => {
        this.tweets=response;
        this.tweets?.forEach((tweet) => {
          this.safeMediaUrl=this.sanitizer.bypassSecurityTrustResourceUrl(tweet.media_url);
          tweet.resource_url=this.safeMediaUrl;
        });
              },
      error => {
        console.error("error", error);
      }
    );
  }

  followingPageDashboard():void{
    console.log("following page dashboard");
    this.isHomeDashboard=false;
    this.isFollowingDashboard=true;
    this.tweets=[];
    this.twitterService.fetchTweets('following').subscribe(
      response => {
        this.tweets=response;
        this.tweets?.forEach((tweet) => {
          this.safeMediaUrl=this.sanitizer.bypassSecurityTrustResourceUrl(tweet.media_url);
          tweet.resource_url=this.safeMediaUrl;
        });
              },
      error => {
        console.error("error", error);
      }
    );
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
    console.log('sending data');
    const formdata=new FormData();
    formdata.append('parent_tweet_id', this.parentId);
    formdata.append('content',this.commentInput);
    console.log('user id ' +this.userId);
    formdata.append('user_id', this.userId);
    this.twitterService.submit(formdata).subscribe(resp=>{
      console.log('comment is saved');
      this.showCommentModal=false;
      this.commentInput='';
    });
    const trimmedComment = this.commentInput.trim();
  }

  removeImage() {
    this.selectedFile = undefined;
    this.imagePreviewUrl = null; // Reset the image preview
    const fileInput: HTMLInputElement = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // Reset the file input
    }
  }

  removeVideo() {
    this.selectedFile = undefined;
    this.videoPreviewUrl = null; // Reset the Video Preview
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
    if (this.tone) {
    formData.append('tone', this.tone);
    }
    formData.append('content', this.tweet.content);
    this.twitterService.submit(formData).subscribe(
      response=>{
        if(response){
        this.content='';
        this.selectedFile=undefined;
        this.removeImage();
        this.ngOnInit();
        }
      }
    )
  }

  newPost?: string = '';

  recentPosts: { content: string; timestamp: string }[] = [
    { content: 'Had a great day at the beach!', timestamp: '2 hours ago' },
    { content: 'Loving the new Angular features.', timestamp: '1 day ago' },
    { content: 'Just finished a 5K run!', timestamp: '3 days ago' },
  ];

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]; 
    if (this.selectedFile) {
      console.log('Selected File Type ' + this.selectedFile.type);
    const fileType = this.selectedFile.type; // Get the file type
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imagePreviewUrl = reader.result; // Store the image URL to be used in the template
    };
    if(this.selectedFile){
    reader.readAsDataURL(this.selectedFile);
    }
  }

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

  profilePageRoute(userId?:any):void{
    console.log('user id'+userId);
    console.log('user profile');
    this.router.navigate(['/dashboard/profile', userId]); 
  }


  toggleCommentPopup() {
    this.showComment = !this.showComment;
  }

  openDialogueBox(parentTweetId?:any):void{
    localStorage.setItem('parentTweetId', parentTweetId);
    this.parentId=parentTweetId;
    this.ngOnInit();
    this.toggleCommentModal();
  }


  repost(post: Post) {
    post.reposts++;
  }
  // Function to toggle like state for a post
  public likePost(post: TweetTs) {
    if (post.userReacted && post.like_count) {
      post.selectedReactionIcon = null; // Clear selected reaction icon
      post.reactionType = ''; // Reset reaction type
    } else if(post.like_count) {
      post.selectedReactionIcon = 'assets/reactions/like (1).png'; // Set default like icon
      post.reactionType = 'like'; // Set reaction type to like
    }
    post.userReacted = !post.userReacted; // Toggle like state
    this.tweet.tweet_id=post.id;
    this.twitterService.submitLikes(this.tweet).subscribe(resp=>{
      this.ngOnInit();
    });

  }
  // Function to handle reactions
  public react(post: TweetTs, reaction: string, iconPath: string) {
    post.selectedReactionIcon = iconPath; // Set the selected reaction icon
    post.reactionType = reaction; // Update the reaction type

    if (!post.userReacted) {
      this.likePost(post); // Increment like count if not already liked
    } else {
      // (if the user clicks the same reaction again, you might want to reset it)
    }

    this.showReactions[post.id] = false;
  }

  getReactionIcon(reactionType: string | undefined): string {
    switch (reactionType) {
      case 'like':
        return 'fa-thumbs-up';
      case 'love':
        return 'fa-heart'; // Change this to your desired icon for 'love'
      case 'haha':
        return 'fa-laugh';
      case 'wow':
        return 'fa-surprise';
      case 'sad':
        return 'fa-sad-tear';
      case 'angry':
        return 'fa-angry';
      default:
        return 'fa-thumbs-up';
    }
  }

  toggleCommentModal() {
    console.log('toggleCommentModal');
    this.showCommentModal = !this.showCommentModal;
    console.log(' showCommentModal '+this.showCommentModal);
  }

  // Call this method when the comment button is clicked
  commentOnPost(post: Post) {
    this.toggleCommentModal();
  }

  toggleReactions(postId: string, state: boolean) {
    this.showReactions[postId] = state;
  }

  // Define reactions array
  reactions = [
    { type: 'like', iconPath: 'assets/reactions/like (1).png' }
  ];

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

  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('profile_image_url');
    localStorage.removeItem('authToken'); 
    this.router.navigate(['/login']);
    console.log("User logged out");
  }

  filterSarcastic(requestType?:string) {
    this.tone=requestType;
  }

  filterPoetry(requestType?:string) {
    this.tone=requestType;
  }
}