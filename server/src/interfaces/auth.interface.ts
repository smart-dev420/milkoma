export default interface Account extends Document {
  email: string;
  password: string;
  emailverify: boolean;
  // emailverifytoken : string;
  // emailverifytokenexpire: number;
  username: string;
  admin: boolean;
  region: string;
  resetpasswordtoken : string;
  resetpasswordexpire: number;
  company: string;
  active: boolean;
  liveAccount: string;
  youtubeAccount: string;
  tiktokAccount: string;
  instagramAccount: string;
  verify: boolean;
  handleCard:string;
  // handleGPay:string;
  strikes : number;
}
