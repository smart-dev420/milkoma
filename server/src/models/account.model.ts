import { Schema, Types, model, Document, ObjectId } from "mongoose";
import Account from "../interfaces/auth.interface";
import modelConstants from "../constants/schema_names";

//* Basic schema for account

const accountSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    emailverify : { type : Boolean, default : false },
    // emailverifytoken : { type : String },
    // emailverifytokenexpire : { type : Number },
    username : { type : String, default : 'unnamed', required: true },
    admin : { type : Boolean, default : false},
    company: { type: String, required: true},
    region : { type : String, default : "Japan",},
    active: { type : Boolean, default: true},
    heart: { type: Number },
    follower: { type: Number },
    liveAccount: { type:String, default:"" },
    youtubeAccount: { type:String, efault:"" },
    tiktokAccount: { type:String, default:"" },
    instagramAccount: { type:String, default:"" },
    verify: { type: Boolean, default: false },
    resetpasswordtoken : { type : String },
    resetpasswordexpire: { type : Number }, 
    handleCard : { type : String },
    strikes : {type : Number, default : 0},
  },
  {
    collection: modelConstants.account,
  }
);

const AccountModel = model<Account>(modelConstants.account, accountSchema);
export default AccountModel;
