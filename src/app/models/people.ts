export class People {
     id:string;
    user_id: string;
    full_name: string;
    user_name: string;
    bio?: string; // optional property
    profile_image_url?:string;  
    constructor(id:string,user_id: string, full_name: string, user_name: string, bio?: string,profile_image_url?:string) {
      this.id=id;
      this.user_id = user_id;
      this.full_name = full_name;
      this.user_name = user_name;
      this.bio = bio;
      this.profile_image_url=profile_image_url;
    }
  }
  