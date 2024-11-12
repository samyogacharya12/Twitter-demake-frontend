import { IUser } from "./user";

export class TweetTs {
    id: string;
    content: string;
    media_url: string;
    created_at?: number;  
    user?:IUser;
    like_count?:number;
    retweet_count?:number;
    comment_count?:number;
    reactionType?:string;
    userReacted?: boolean;
    comments?: number;
    reposts?: number;
    selectedReactionIcon?: string | null;
    media_type?:string;
    
    
    constructor(id: string, content: string, media_url: string, created_at?: number,user?:IUser, 
      like_count?:number,retweet_count?:number, 
      comment_count?:number,
      reactionType?:string,
      userReacted?: boolean,
      likes?: number,
      comments?: number,
      reposts?: number,
      selectedReactionIcon?: string | null,
      media_type?:string) {
      this.id = id;
      this.content = content;
      this.media_url = media_url;
      this.created_at = created_at; 
      this.user=user;
      this.like_count=like_count;
      this.retweet_count=retweet_count;
      this.comment_count=comment_count;
      this.reactionType=reactionType;
      this.userReacted=userReacted;
      this.like_count=like_count;
      this.comments=comments;
      this.reposts=reposts;
      this.selectedReactionIcon=selectedReactionIcon;
      this.media_type=media_type;
    }
};
