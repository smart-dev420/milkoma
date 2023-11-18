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
      throw Error("Token expired");
    }
  } else {
    throw Error("Account not found");
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
      throw Error("Email already exists!");
    }
    let admin = false;
    if(authConfig.admins.includes(email)) {
      admin = true
    }
    let role = true;
    if(input.role == 1){
      role = false;
    }
    const doc: Account = new AccountModel({
      email: email,
      password: hash,
      emailverify: false,
      username: input.username,
      admin : admin,
      active: role,
      company: input.company,
      liveAccount: input.live??"",
      youtubeAccount: input.youtube??"",
      tiktokAccount: input.tiktok??"",
      instagramAccount: input.instagram??"",
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
    return akun?.active;
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
      fname, 
      email, 
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

export async function strikeAdvisorService(input:any) {
  try {
    logger.info("strikeAdvisorService")
    const {_id, strikes} = input
    const query = {_id}
    const update = {strikes}
    return await AccountModel.updateOne(query, update)
  } catch (error: any) {
    logger.error("strikeAdvisorService Failed")
    throw error
  }
}

export async function deleteAdvisorService(input:any) {
  try {
    logger.info("deleteAdvisorService")
    const {_id} = input
    const query = {_id}
    return await AccountModel.deleteOne(query)
  } catch (error: any) {
    logger.error("deleteAdvisorService Failed")
    throw error
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

export async function refCodeVerifyService(input : any) {
  try {
    logger.info("refCodeVerifyService");
    const {_id, refCode} = input
    const query = {_id}
    const update = {
      secretcode : refCode,
      secretverifyrequest : true,
      secretverify : false
    }
    return await AccountModel.updateOne(query, update);
  } catch (error: any) {
    logger.error("refCodeVerifyService Failed");
    throw error;
  }
}

export async function procVerifyRequestedAdvisorsService(input : any) {
  try {
    logger.info("procVerifyRequestedAdvisorsService");
    const {_id, allowed} = input
    const query = {_id}
    const advisor = await AccountModel.find(query);
    if(advisor.length !== 1){
      throw Error("Invalid ID")
    }
    let update : any = {
      secretverify : true,
      secretverifyrequest : false,
    }
    console.log(typeof(allowed))
    if(allowed === 'false'){
      update = {
        secretverify : false,
        secretverifyrequest : false,
        secretcode : "",
      }
    }
    console.log(update)
    await AccountModel.updateOne(query, update);
    return true
  } catch (error: any) {
    logger.error("procVerifyRequestedAdvisorsService Failed");
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