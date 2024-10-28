import { IUser } from "./user";

export class TweetTs {
    id: number;
    content: string;
    media_url: string;
    created_at?: number;  
    user?:IUser;
    like_count?:number;
    retweet_count?:number;
    comment_count?:number;
  
    constructor(id: number, content: string, media_url: string, created_at?: number,user?:IUser, 
      like_count?:number,retweet_count?:number, 
      comment_count?:number) {
      this.id = id;
      this.content = content;
      this.media_url = media_url;
      this.created_at = created_at; 
      this.user=user;
      this.like_count=like_count;
      this.retweet_count=retweet_count;
      this.comment_count=comment_count;
    }
}
