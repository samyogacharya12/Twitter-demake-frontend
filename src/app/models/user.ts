export interface IUser {
  id?: string;
  full_name?: string;
  profile_image_url?: string;
  email?: string;
  username?: string;
  retweet_count?:string,
  num_following?:number,
  num_followers?:number,
  verified_on?:string,
  bio?:string,
  location?:string,
  website?:string,
  tweet_count?:number,
  is_followed?:boolean,
  header_image_url?:string
}

export class User implements IUser {
  constructor(
    public id?: string,
    public full_name?: string,
    public profile_image_url?: string,
    public email?:string,
    public username?: string,
    public retweet_count?:string,
    public num_following?:number,
    public num_followers?:number,
    public verified_on?:string,
    public bio?:string,
    public location?:string,
    public website?:string,
    public tweet_count?:number,
    public is_followed?:boolean,
    public header_image_url?:string
  ) {
  
  }
}