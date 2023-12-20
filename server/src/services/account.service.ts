import Account from "../interfaces/auth.interface";
import AccountModel from "../models/account.model";
import logger from "../utils/logger";
import bcrypt from "bcrypt";
import authConfig from "../config/auth.config";
import { get } from "lodash";
import { decode, sign } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const admins = process.env.ADMINS || ""
const adminArray = admins.split(',')

export function getEmailFromToken(token: string) {
  const decoded = decode(token);
  const email = get(decoded, "user");
  if (!decoded || !email) { return 'invalid';}
  return email;
}

export async function resetPwd(input: any) {
  const salt = await bcrypt.genSalt(authConfig.salt);
  const password = await bcrypt.hashSync(input.password, salt);
  const email = input.email;
  const result = await AccountModel.find({ email });
  if (result.length > 0) {
    const resetpasswordexpire = result[0].resetpasswordexpire;
    if(Date.now() < resetpasswordexpire) {
      console.log("res - ", input)
      return await AccountModel.updateOne({email}, {password});
    } else {
      throw Error("トークンの有効期限が切れました"); // Token expired
    }
  } else {
    throw Error("アカウントが見つかりません"); // Account not found
  }
}

export async function changePswd(input: any) {
  const salt = await bcrypt.genSalt(authConfig.salt);
  const password = await bcrypt.hashSync(input.password, salt);
  const email = input.email;
  const result = await AccountModel.find({ email });
  if (result.length > 0) {
      return await AccountModel.updateOne({email}, {password});
  } else {
    throw Error("アカウントが見つかりません"); // Account not found
  }
}

export async function createAccount(input: any) {
  try {
    logger.info("Creating account");
    console.log("data - ", input)
    const salt = await bcrypt.genSalt(authConfig.salt);
    const hash = await bcrypt.hashSync(input.password, salt);

    // * Check username validity to avoid duplicates
    const email = input.email;
    const result = await AccountModel.find({ email : email });
    if (result.length !== 0) {
      throw Error("メールアドレスはすでに存在します!"); // Email address already exists
    }
    let admin = false;
    if(authConfig.admins.includes(email)) {
      admin = true
    }
    let role = 'client';
    if(input.role == 1){
      role = 'creator';
    }
    const doc: Account = new AccountModel({
      email: email,
      password: hash,
      username: input.username,
      admin : admin,
      role: role,
      follower: [],
      heart: [],
      company: input.company,
      liveAccount: input.live??"",
      youtubeAccount: input.youtube??"",
      tiktokAccount: input.tiktok??"",
      instagramAccount: input.instagram??"",
      twitterAccount: input.twitter??"",
      verify:false,
      // region: input.region
    });
    return await AccountModel.create(doc);
  } catch (error: any) {
    logger.error("Creating account Failed");
    throw error;
  }
}

export function createAccessToken(user: string) {
  try {
    const accessToken = sign({ user: user }, authConfig.accessTokenSecret, {
      expiresIn: authConfig.accessTokenTtl,
    });

    return accessToken;
  } catch (err: any) {
    throw err;
  }
}

export async function refreshAccessToken(refreshToken: string) {
  try {
    const decoded = decode(refreshToken);

    const email = get(decoded, "email");
    // Decode JWT
    if (!decoded || !email) return false;

    const user = await findAccount({ email: email });
    if (!user) return false;

    const accessToken = createAccessToken(user.email);

    return accessToken;
  } catch (err: any) {
    throw err;
  }
}

export async function findAccount(query: any) {
  try {
    return await AccountModel.findOne(query).lean();
  } catch (err: any) {
    throw err;
  }
}

export async function validatePassword(email: string, password: string) {
  try {
    const akun = await AccountModel.findOne({ email });
    if (!akun) return false;
    const isValid = await bcrypt.compare(password, akun.password);
    if (!isValid) return false;

    return isValid;
  } catch (err: any) {
    throw err;
  }
}

export async function validateActive(email:string){
  try {
    const akun = await AccountModel.findOne({ email });
    return akun?.role;
  } catch (err: any) {
    throw err;
  }
}

export async function updateField(query : any, update: any) {
  try {
    logger.info("Update Field");
    console.log('res - ', query)
    const res = await AccountModel.find(query);
    if(res.length !== 1) {
      logger.error("No exist field found", query);
      // throw Error("No exist field")
      return false
    }
    await AccountModel.updateOne(query, update);
    return true;
  } catch (error: any) {
    logger.error("Save Profile Failed");
    throw error;
  }
}

export async function saveProfile(input : any) {
  try {
    logger.info("Save Profile");
    const {
      id, 
      username, 
      secretcode, 
      following, 
      followers, 
      region,
    } = input;
    const query = {_id : id}
    const res = await AccountModel.find(query)
    if(res.length !== 1) {
      logger.error("No Exist profile");
    }
    const update = {
      username    : username,
      secretcode  : secretcode,
      following   : following,
      followers   : followers,
      region      : region,
    };
    return await AccountModel.updateOne(query, update);
  } catch (error: any) {
    logger.error("Save Profile Failed");
    throw error;
  }
}

export async function saveCustomerID(input: any) {
  try {
    logger.info("saveCustomerID");
    const {userID, method, customerID} = input
    let handleName = ''
    if(method === 'card') handleName = 'handleCard'    
    if(method === 'gpay') handleName = 'handleGPay'
    const update = {[handleName]:customerID}
    const query = {_id : userID}
    return await updateField(query, update)
  } catch (error: any) {
    logger.error("saveCustomerID Failed");
    throw error;
  }
}

export async function addClient(input: any) {
  try {
    logger.info("addClient");
    const {_id, userID} = input
    const query = {_id}
    const searchClient : Array<any> = [];
    searchClient.push(userID)
    const subQuery = {clients: { $in: searchClient }}
    const cliRes = await AccountModel.find(subQuery)
    console.log(cliRes)
    if(cliRes.length > 0){
      logger.error("Already added this client")
    }else{
      await AccountModel.updateOne(query, { $push: { clients: userID }})
    }
    return {res : "Successfully added"}
  } catch (error: any) {
    logger.error("addClient Failed");
    throw error;
  }
}

export async function readProfile(input : any) {
  try {
    logger.info("Read Profile");
    const { _id } = input;
    const query = {_id}
    return await AccountModel.find(query);
  } catch (error: any) {
    logger.error("Read Profile Failed");
    throw error;
  }
}

export async function readCreatorInfo(input : any) {
  try {
    logger.info("Read CreatorInfo");
    const { role } = input;
    const query = {role}
    return await AccountModel.find(query);
  } catch (error: any) {
    logger.error("Read Info Failed");
    throw error;
  }
}

export async function optValidate(input:any) {
  const email = input.email;
  const otp = input.otp;
  const result = await AccountModel.find({email});
  if (result.length > 0) {
    const resetpasswordexpire  = result[0].resetpasswordexpire;
    if(Date.now() < resetpasswordexpire) {
      const code = result[0].resetpasswordtoken;
      console.log("res - ", code, otp)
      if(code === otp){
        logger.info("Validate successful.")
      }else{
        throw Error("無効なコード");  // Invalide code
      }
    } else {
      throw Error("トークンの有効期限が切れました"); // Token expired
    }
  } else {
    throw Error("トークンが見つかりません"); // Token not found
  }
}

export async function follow(input: any) {
    const email = getEmailFromToken(input.token);
    const follow = input.followingUser;
    const result = await AccountModel.findOne({email:follow});
    const followArray = result?.follower || [];
    if (!followArray.includes(email)) {
      followArray.push(email);
      await AccountModel.updateOne({ email:follow }, { follower: followArray });
      logger.info("Follow");
      return true;
    }
    else {
      logger.error("Already follow this user");
      return false;
    }
}

export async function heart(input: any){
  const email = getEmailFromToken(input.token);
  const heart = input.heartUser
  const result = await AccountModel.findOne({email: heart});
  const heartArray = result?.heart || [];
  if (!heartArray.includes(email)) {
    heartArray.push(email);
    await AccountModel.updateOne({ email:heart }, { heart: heartArray });
    return true;
  }
  else {
    logger.error("Already like this user");
    // throw Error("このユーザーはすでに「いいね」をしています!"); // Already like this user
    return false;
  }
}

export async function getUserProfileInfo(input: any){
  const email = getEmailFromToken(input.token);
  const res = await AccountModel.findOne({ email }, '-_id -admin -follower -heart -password -region -resetpasswordexpire -resetpasswordtoken -__v');
  return res;
}

export async function updateUserProfile(input:any){
  const id = input.data.id;
  const userName = input.data.username;
  const company = input.data.company;
  const avatar = input.fileName;
  await AccountModel.updateOne({_id:id}, { username: userName, company:company, avatar:avatar});
  logger.info("Successfully updated");
  return true;
}

export async function changeSNSData(input:any){
  const id = input.data.id;
  const live = input.data.liveAccount;
  const youtube = input.data.youtubeAccount;
  const tiktok = input.data.tiktokAccount;
  const instagram = input.data.instagramAccount;
  const twitter = input.data.twitterAccount;
  await AccountModel.updateOne({_id:id}, { liveAccount: live, youtubeAccount:youtube, tiktokAccount:tiktok, instagramAccount: instagram, twitterAccount: twitter});
  logger.info("Successfully updated");
  return true;
}

export async function changeSkillsData(input:any){
  const id = input.data.id;
  const detail = input.data.detail;
  const skills = input.data.skills;
  await AccountModel.updateOne({_id:id}, { description: detail, skills: skills});
  logger.info("Successfully updated");
  return true;
}

export async function getAdminData(input: any){
  const email = getEmailFromToken(input.token);
  const res = await AccountModel.findOne({ email }, 'admin');
  return res;
}

export async function getUserRole(input: any){
  const email = getEmailFromToken(input.token);
  const res = await AccountModel.findOne({ email }, 'role');
  return res;
}