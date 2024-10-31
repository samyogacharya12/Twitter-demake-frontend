export class Comments {
  username:string;
  profileUrl:string;
  comment:string;
  mediaUrl:string;

  constructor(
    username: string = '',
    profileUrl: string = '',
    comment: string = '',
    mediaUrl: string = ''
  ) {
    this.username = username;
    this.profileUrl = profileUrl;
    this.comment = comment;
    this.mediaUrl = mediaUrl;
  }
}
