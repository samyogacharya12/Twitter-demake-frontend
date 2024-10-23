import { IUser } from "./user";

export class TweetTs {
    id: number;
    content: string;
    media_url: string;
    created_at?: number;  
    user?:IUser;
  
    constructor(id: number, content: string, media_url: string, created_at?: number,user?:IUser ) {
      this.id = id;
      this.content = content;
      this.media_url = media_url;
      this.created_at = created_at; 
      this.user=user;
    }
}
