import { Component } from '@angular/core';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.css']
})
export class CommentBoxComponent {
  showCommentPopup = false; // Control popup visibility
  commentInput = ''; // Input for comment
  comments: string[] = []; // Array to hold comments
  remainingValues?: number = 280; // Twitter-like character limit
  maxChars?:number | any=280;

  toggleCommentPopup() {
    this.showCommentPopup = !this.showCommentPopup;
  }

  // Calculate remaining characters for the input
  calculateRemainingChars() {
    this.remainingValues = 280 - this.commentInput.length;
  }
  // Method to add a comment
  addComment() {
    this.showCommentPopup=true;
    const trimmedComment = this.commentInput.trim();
    if (trimmedComment.length > 0 && trimmedComment.length <= this.maxChars) {
      this.comments.push(trimmedComment);
      this.commentInput = ''; // Clear input
    }
  }
}
