import { Component } from '@angular/core';

@Component({
  selector: 'app-status-post',
  templateUrl: './status-post.component.html',
  styleUrls: ['./status-post.component.css']
})
export class StatusPostComponent {
  newPost: string = '';
  posts: string[] = [];

  submitPost() {
    if (this.newPost.trim()) {
      this.posts.push(this.newPost);
      this.newPost = '';
    }
  }
}
