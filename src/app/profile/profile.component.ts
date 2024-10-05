import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  name: string = 'John Doe';
  handle: string = 'johndoe';
  bio: string = 'Web Developer | Tech Enthusiast | Coffee Lover';
  followers: number = 1200;
  following: number = 500;

  tweets = [
    {
      content: 'This is my first tweet! #HelloWorld',
      likes: 20,
      retweets: 5,
      comments: 3
    },
    {
      content: 'Just finished a cool project. #WebDevelopment',
      likes: 45,
      retweets: 12,
      comments: 8
    }
    // Add more tweets here
  ];
}
