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
  resetpasswordtoken : string;
  resetpasswordexpire: number;
  handleCard:string;
  strikes : number;
}
