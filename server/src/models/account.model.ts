import { Schema, Types, model, Document, ObjectId } from "mongoose";
import Account from "../interfaces/auth.interface";
import modelConstants from "../constants/schema_names";

//* Basic schema for account

const accountSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    username : { type : String, default : 'unnamed', required: true },
    avatar: { type: String, default: 'avatar' },
    admin : { type : Boolean, default : false},
    company: { type: String, required: true},
    region : { type : String, default : "Japan",},
    role: { type : String, default: 'client'},
    description: { type: String, default: '' },
    skills: { type: Array, default:[] },
    heart: { type: Array, default:[] },
    follower: { type: Array, default:[] },
    liveAccount: { type:String, default:"" },
    youtubeAccount: { type:String, efault:"" },
    tiktokAccount: { type:String, default:"" },
    instagramAccount: { type:String, default:"" },
    twitterAccount: { type:String, default:"" },
    verify: { type: Boolean, default: false },
    verify_doc: { type: String, default: ''},
    resetpasswordtoken : { type : String, default:'' },
    resetpasswordexpire: { type : Number, default:0 }, 
    handleCard : { type : String, default:'' },
    strikes : {type : Number, default : 0},
  },
  {
    collection: modelConstants.account,
  }
);

const AccountModel = model<Account>(modelConstants.account, accountSchema);
export default AccountModel;
