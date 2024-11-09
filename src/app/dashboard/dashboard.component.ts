import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';

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
  showReactions: { [postId: number]: boolean } = {}; // Object to track reactions per post
  selectedReactionIcon: string | null = null;
  showCommentModal = false;
  isCardBoxVisible = false;
  role?: string | any;
  @ViewChild('cardBox') cardBox: ElementRef | undefined;

  constructor() {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
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
    this.showComment = !this.showComment;
  }

  repost(post: Post) {
    post.reposts++;
  }

  // Function to toggle like state for a post
  public likePost(post: Post) {
    if (post.userReacted) {
      post.likes -= 1; // Remove like
      post.selectedReactionIcon = null; // Clear selected reaction icon
      post.reactionType = ''; // Reset reaction type
    } else {
      post.likes += 1; // Add like
      post.selectedReactionIcon = 'assets/reactions/like (1).png'; // Set default like icon
      post.reactionType = 'like'; // Set reaction type to like
    }
    post.userReacted = !post.userReacted; // Toggle like state
  }

  // Function to handle reactions
  public react(post: Post, reaction: string, iconPath: string) {
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
        return 'fa-heart';
    }
  }

  toggleCommentModal() {
    this.showCommentModal = !this.showCommentModal;
  }

  // Call this method when the comment button is clicked
  commentOnPost(post: Post) {
    this.toggleCommentModal();
  }

  toggleReactions(postId: number, state: boolean) {
    this.showReactions[postId] = state;
  }

  // Define reactions array
  reactions = [
    { type: 'like', iconPath: 'assets/reactions/like (1).png' },
    { type: 'love', iconPath: 'assets/reactions/love.png' },
    { type: 'haha', iconPath: 'assets/reactions/haha.png' },
    { type: 'wow', iconPath: 'assets/reactions/wow.png' },
    { type: 'sad', iconPath: 'assets/reactions/sad.png' },
    { type: 'angry', iconPath: 'assets/reactions/angry.png' },
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
}
