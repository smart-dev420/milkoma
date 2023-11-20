export default interface Account extends Document {
  email: string;
  password: string;
  username: string;
  admin: boolean;
  region: string;
  resetpasswordtoken : string;
  resetpasswordexpire: number;
  company: string;
  role: string;
  follower: string[];
  heart: string[];
  liveAccount: string;
  youtubeAccount: string;
  tiktokAccount: string;
  instagramAccount: string;
  verify: boolean;
  handleCard:string;
  strikes : number;
}
