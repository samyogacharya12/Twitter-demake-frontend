import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  role?: string | any;
  ngOnInit(): void {
    this.role = localStorage.getItem("role");
  } userName?: string = 'John Doe';
  statusList?: [];
  followers?: number = 1500;
  following?: number = 300;
  posts?: number = 45;
  commentCount = 123;
  retweetCount = 456;
  likeCount = 789;
  showNotifications: boolean = false;
  showComment: boolean = false;

  // Sample notifications data
  notifications = [
    { message: 'Anna started following you', time: '10 minutes ago' },
    { message: 'Mark liked your post', time: '2 hours ago' },
    { message: 'You have a new message from Sarah', time: '1 day ago' },
    { message: 'David commented on your photo', time: '3 days ago' }
  ];

  // sample posts data
  newPosts = [
    {
      id: 1,
      username: 'Elon Musk',
      handle: '@elondude',
      time: '13h',
      content: 'Subscribe to unlock new features and if eligible, receive a share of revenue.',
      avatar: 'https://example.com/avatar1.jpg',
      imageUrl: 'https://loremflickr.com/800/800',
      verified: true
    },
    {
      id: 2,
      username: 'Jane Doe',
      handle: '@janedoe',
      time: '5h',
      content: 'This is a great day to learn Angular!',
      avatar: 'https://example.com/avatar2.jpg',
      imageUrl: 'https://loremflickr.com/1920/1920',
      verified: false
    }
    // Add more posts as needed
  ];

  isVisible = false;

  isModalVisible = false;
  commentInput = '';
  comments = ['Great post!', 'Love this!'];

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
  constructor() { }

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
