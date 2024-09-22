import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit  {
  userName?: string = 'John Doe';
  statusList?:[];
  followers?: number = 1500;
  following?: number = 300;
  posts?: number = 45;
  showNotifications: boolean = false;

  // Sample notifications data
  notifications = [
    { message: 'Anna started following you', time: '10 minutes ago' },
    { message: 'Mark liked your post', time: '2 hours ago' },
    { message: 'You have a new message from Sarah', time: '1 day ago' },
    { message: 'David commented on your photo', time: '3 days ago' }
  ];

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

  ngOnInit(): void {
  }
}
