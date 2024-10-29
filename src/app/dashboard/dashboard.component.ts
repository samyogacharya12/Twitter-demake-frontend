import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { TwitterServiceService } from '../twitter-service.service';
import { LoginServiceService } from '../login/login-service.service';
import {Router} from "@angular/router";
import { TweetTs } from '../models/tweet.ts';
import { IUser, User } from '../models/user';
import { People } from '../models/people';
import { FollowService } from '../follow-service.service';
interface  Post {
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
  showReactions: { [postId: number]: boolean } = {}; // Object to track reactions per post
  peoples?:People[];
  showCommentModal = false;
  isOpen=false;
  userId: string | any = null;
  tweet = { content: '', media_url: '' };
  tweets?:TweetTs[];
  user:User=new User();
  content: string = ''; 
  selectedReactionIcon: string | null = null;
  role?: string | any;
  isHomeDashboard?:boolean=true;
  isFollowingDashboard?:boolean=false;
  constructor(private twitterService: TwitterServiceService,private loginService: LoginServiceService,
    private followService: FollowService,
    private router: Router) { }
  commentUserName?:string;
  commentProfileUrl?:string;
  commentMediaUrl?:string;
  reactions = [
    { type: 'like', iconPath: 'assets/reactions/like (1).png' },
    { type: 'love', iconPath: 'assets/reactions/love.png' },
    { type: 'haha', iconPath: 'assets/reactions/haha.png' },
    { type: 'wow', iconPath: 'assets/reactions/wow.png' },
    { type: 'sad', iconPath: 'assets/reactions/sad.png' },
    { type: 'angry', iconPath: 'assets/reactions/angry.png' },
  ];
  ngOnInit(): void {
    this.comments=[];
    this.twitterService.fetchTweets().subscribe(
      response => {
        this.tweets=response;
              },
      error => {
        console.error("error", error);
      }
    );
    this.userId=localStorage.getItem('userId');
    this.loginService.findByUserId(this.userId).subscribe(res=>{
      this.user=res;
    });
    this.role = localStorage.getItem("role");
    this.parentId=localStorage.getItem('parentTweetId');
    this.userId=localStorage.getItem('userId');
    
    this.twitterService.fetchTweetById(this.parentId).subscribe(response=>{
          this.commentUserName=response.user.username;
          this.commentProfileUrl=response.user.profile_image_url;
          this.commentMediaUrl=response.media_url;
          response.reply_ids.forEach((reply: any) => {
           this.twitterService.fetchTweetById(reply).subscribe(res=>{
             console.log('res'+res.content);
             this.comments?.push(res.content);
           })
          });
    });
    this.twitterService.fetchPeoples().subscribe(res=>{
      this.peoples=res;
 }); 
  }



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
  imagePreviewUrl: string | ArrayBuffer | null = null; // This will store the preview URL
  selectedFile?: File;
  parentId?:any;
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
  commentInput = '';
  comments = ['Great post!', 'Love this!'];
   


  navigateWithParams(id:any) {
    console.log('id'+id);
    // Using `navigate` with route parameters and query parameters
    this.router.navigate(['/dashboard/profile', id]); 
    this.ngOnInit();   
  }

  profilePageRoute(userId?:any):void{
    console.log('user id'+userId);
    console.log('user profile');
    this.router.navigate(['/dashboard/profile', userId]); 
  }



  openDialogueBox(parentTweetId?:any):void{
    console.log('parent tweet value' +parentTweetId);
    localStorage.setItem('parentTweetId', parentTweetId);
    this.parentId=parentTweetId;
    this.ngOnInit();
    this.toggleCommentModal();
  }

  follow(userId:any):void{
    console.log('following person');
    console.log(' follow ' +userId);
    this.followService.follow(userId).subscribe(resp=>{
          console.log('follow is done'+resp);
          this.ngOnInit();   
    });
  }

  // Function to close the modal
  closeModal() {
    this.isOpen = false;
  }

  // Function to add a comment
  addComment() {
    console.log('sending data');
    const formdata=new FormData();
    formdata.append('parent_tweet_id', this.parentId);
    formdata.append('content',this.commentInput);
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


  newPost?: string = '';

  recentPosts: { content: string; timestamp: string }[] = [
    { content: 'Had a great day at the beach!', timestamp: '2 hours ago' },
    { content: 'Loving the new Angular features.', timestamp: '1 day ago' },
    { content: 'Just finished a 5K run!', timestamp: '3 days ago' },
  ];

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
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

  toggleCommentPopup() {
    this.showCommentModal = !this.showCommentModal;
  }

  commentOnPost(post: Post) {
    post.comments++;
    // Optional: Open a comment input or modal if needed
  }

  repost(post: Post) {
    post.reposts++;
  }

  // Function to toggle like state for a post
  public likePost(post: TweetTs) {
    if (post.userReacted && post.likes) {
      post.likes -= 1; // Remove like
      post.selectedReactionIcon = null; // Clear selected reaction icon
      post.reactionType = ''; // Reset reaction type
    } else if(post.likes) {
      post.likes += 1; // Add like
      post.selectedReactionIcon = 'assets/reactions/like (1).png'; // Set default like icon
      post.reactionType = 'like'; // Set reaction type to like
    }
    post.userReacted = !post.userReacted; // Toggle like state
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

  toggleReactions(postId: number, state: boolean) {
    this.showReactions[postId] = state;
  }

  homePageDashboard():void{
    console.log("home page dashboard");
    this.isHomeDashboard=true;
    this.isFollowingDashboard=false;
    this.tweets=[];
    this.twitterService.fetchTweets().subscribe(
      response => {
        this.tweets=response;
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
              },
      error => {
        console.error("error", error);
      }
    );
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
        return 'fa-heart';
    }
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
        this.removeImage();
        this.ngOnInit();
        }
      }
    )
  }

  toggleCommentModal() {
    this.showCommentModal = !this.showCommentModal;
  }

}