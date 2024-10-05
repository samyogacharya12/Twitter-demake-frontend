import { Component } from '@angular/core';

@Component({
  selector: 'app-comment-box-view',
  templateUrl: './comment-box-view.component.html',
  styleUrls: ['./comment-box-view.component.css']
})
export class CommentBoxViewComponent {
  comments = [
    { username: 'user1', text: 'Amazing post! 😍' },
    { username: 'user2', text: 'Love this content, keep it up!' },
    { username: 'user3', text: 'So inspiring! ❤️' },
    { username: 'user4', text: 'Wow, this is really cool!' }
  ];
  likesCount = 120;


  newComment = '';

  // Method to add a new comment
  addComment() {
    if (this.newComment.trim()) {
      this.comments.push({
        username: 'current_user',
        text: this.newComment
      });
      this.newComment = ''; // Clear the input field after submitting
    }
  }
}
