export interface IUser {
  id?: number;
  full_name?: string;
  profile_image_url?: string;
  email?: string;
  username?: string;
  retweet_count?:string,
}

export class User implements IUser {
  constructor(
    public id?: number,
    public full_name?: string,
    public profile_image_url?: string,
    public email?:string,
    public username?: string,
    public retweet_count?:string
  ) {}
}