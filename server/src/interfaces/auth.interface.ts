export default interface Account extends Document {
  email: string;
  password: string;
  username: string;
  avatar: string;
  admin: boolean;
  company: string;
  region: string;
  role: string;
  description: string;
  skills: string[];
  heart: string[];
  follower: string[];
  liveAccount: string;
  youtubeAccount: string;
  tiktokAccount: string;
  instagramAccount: string;
  twitterAccount: string;
  verify: boolean;
  verify_doc: string;
  resetpasswordtoken : string;
  resetpasswordexpire: number;
  customer_id:string;
  strikes : number;
}
