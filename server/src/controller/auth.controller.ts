import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import {
  createAccessToken,
  createAccount,
  findAccount,
  validatePassword,
  validateActive,
  saveProfile,
  readProfile,
  updateField,
  resetPwd,
  optValidate,
  follow,
  heart,
  updateUserProfile,
  getUserProfileInfo,
  changePswd,
  changeSNSData,
  changeSkillsData,
  getAdminData,
  getUserRole,
  refreshAccessToken
} from "../services/account.service";
import { omit } from "lodash";
import logger from "../utils/logger";
import { verifyToken } from '../middlewares/auth.jwt';
const { v4: uuidv4 } = require('uuid');
import { decode, sign } from "jsonwebtoken";
import { get } from "lodash";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import nodemailer from 'nodemailer';
// const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const rootPath = path.dirname(require.main?.path);
const avatarPath = path.join(rootPath, 'uploads/avatars');
const providePath = path.join(rootPath, 'uploads/provides');
const productPath = path.join(rootPath, 'uploads/products');
const receiptPath = path.join(rootPath, 'uploads/receipts');
const verifyPath = path.join(rootPath, 'uploads/verifies');
const otpGenerator = require('otp-generator')
import AWS from 'aws-sdk';
import AccountModel from "../models/account.model";
import { CreatePdfDocument } from "../utils/create_pdf"
// AWS.config.update({ region: 'ap-northeast-1' }); 
// const ses = new AWS.SES({ apiVersion: '2010-12-01' });


const APP_URL = process.env.FRONT_URL;
const COMPANY_NAME = process.env.COMPANY_NAME;
const userEmail = process.env.SERVER_EMAIL;
const userPswd = process.env.SERVER_PASSWORD;
const mailgunUserEmail = process.env.MAILGUN_USEREMAIL;
const mailgunUserPswd = process.env.MAILGUN_USER_PASSWORD;
//* Basic Authentication with JWT
// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 587,
//   auth: {
//     user: userEmail,
//     pass: userPswd
//   }
// });

/** Mailgun server */
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'Neopen', key: process.env.MAILGUN_API_KEY});

const mailgun_transporter = nodemailer.createTransport({
  host: 'smtp.mailgun.org',
  port: 587,
  auth: {
    user: userEmail,
    pass: userPswd
  }
});

/** AWS SES Setting */
const SES_CONFIG = {
  accessKeyId: process.env.AWS_AKI,
  secretAccessKey: process.env.AWS_SAK,
  region: 'us-east-1',
};

const AWS_SES = new AWS.SES(SES_CONFIG);
const sesSender = process.env.SES_SENDER_EMAIL;
const awsEmail:string = process.env.AWS_EMAIL??'';
let sendEmail = (recipientEmail:string, name:string, option:string) => {
  let params = {
    Source: awsEmail,
    Destination: {
      ToAddresses: [
        recipientEmail
      ],
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: option,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: name,
      }
    },
  };
  return AWS_SES.sendEmail(params).promise();
};

export function getEmailFromToken(token: string) {
  const decoded = decode(token);
  const email = get(decoded, "user");
  if (!decoded || !email) { return 'invalid';}
  return email;
}

const login: RequestHandler = async (req, res) => {
  logger.info('Login')
  try {
    const akun = await findAccount({ email: req.body.email });
    if (!akun) {
      logger.error('Account not found')
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "アカウントが見つかりません" }); // Account not found
    }
    const password = req.body.password;
    // if (!password) throw Error("No password provided");
    if (!password) console.error("No password provided");
    const isValid = await validatePassword(akun.email, req.body.password);
    if (!isValid) {
      logger.error('Password invalid!')
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "パスワードが無効です!" }); // Password invalid
    }
    // const isActive = await validateActive(akun.email);
    // if(!isActive){
    //   logger.error('Inactive!')
    //   return res
    //     .status(StatusCodes.UNAUTHORIZED)
    //     .json({ msg: "アクティブが無効です!" }); // Active invalid
    // }
    const token = await createAccessToken(req.body.email);
    return res
      .status(StatusCodes.OK)
      .send({ ...omit(akun, "password"), token: token, });
  } catch (err: any) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "ログインエラー", err: err.message }); // Login error
  }
};

export const register: RequestHandler = async (req, res) => {
  try {
    const user = await createAccount(req.body);
    const {email} = req.body;
    const {username} = req.body;
    const loginUrl = 'http://13.112.85.135:3000/login';
    const emailBody = `
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open Sans">
    <div style="display: flex;">
    <div style="width: 30%;"></div>
    <div style="width: 450px;">
    <div style="color: #163253; font-size: 16px; font-weight: 600; font-style: normal; font-family: 'Open Sans';">
    <p style='line-height: 300%;font-size:12px'>※このメールはシステムからの自動返信です。<br>
      こちらのアドレスに返信をしないでください。</p>

    <p>この度は会員登録にお申し込みいただき、誠にありがとうございます。</p>

    <p>会員のお申し込みを受け付けました。</p>
    <p>このメールで "${username}"さまの会員登録が完了となります。</p>
    <p>ここのリンク（${loginUrl}）よりログインできます</p>

    <p>ご質問やご不明な点がございましたら、
    お手数ではございますが、下記までお問い合わせください。</p>
    <p>メールアドレス：info@neopen.co.jp</p>
    <br><br><br>
    <div style="border-bottom: 1px solid #D4DAE0; width: 100%"></div>
    <p style="font-weight: 600; font-size: 11px; color: #163253;">'${COMPANY_NAME}' Inc. Japan</p>
    </div>
    </div>
    <div style="width: 20%;"></div>
    </div>`;
    if(user){
      // sendEmail(email, "【ミルコマ】会員登録いただきありがとうございます。", emailBody);
    }
    return res.status(StatusCodes.OK).send(omit(user?.toJSON(), "password"));
  } catch (err: any) {
    logger.error(err);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ msg: "レジストレーションエラー", err: err.message }); //Register error
  }
};

const resetPassword: RequestHandler = async (req, res) => {
  const email = req.params.email;
  const password = req.body.password;
  try {
    await resetPwd({email, password});
    const emailBody = `
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open Sans">
    <div style="display: flex;">
    <div style="width: 30%;"></div>
    <div style="width: 450px;">
    <div style="color: #163253; font-size: 16px; font-weight: 600; font-style: normal; font-family: 'Open Sans';">
    <p>お世話になっております。</p>
    <p>パスワードの再設定が完了いたしました。</p>
    <p>引き続きミルコマのご利用をよろしくお願いいたします。</p>
    <p>パウワードの再設定をされていない方は</p>
    <p>こちらのメッセージを無視してください。</p>
    <p>ご質問やご不明な点がございましたら、</p>
    <p>お手数ではございますが、下記までお問い合わせください。</p>
    <p >メールアドレス：info@neopen.co.jp</p>
    <br><br>
    <div style="border-bottom: 1px solid #D4DAE0; width: 100%"></div>
    <p style="font-weight: 600; font-size: 11px; color: #163253;">'${COMPANY_NAME}' Inc. Japan</p>
    </div>
    </div>
    <div style="width: 20%;"></div>
    </div>`;

    // sendEmail(email, "【ミルコマ】パスワード再設定完了", emailBody);
      return res.status(StatusCodes.OK).send({msg : "パスワード変更済み！"}); // Password changed!
      // res.status(200).send({msg:'メールが正常に送信されました'}); // Email sent successfully
  } catch (err: any) {
    logger.error(err);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ msg: err.message });
  }
}

const changePassword: RequestHandler = async (req, res) => {
  const email = req.params.email;
  const password = req.body.password;
  try {
    await changePswd({email, password});
    return res.status(StatusCodes.OK).send({msg : "パスワード変更済み！"}); // Password changed!
  } catch (err: any) {
    logger.error(err);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ msg: err.message });
  }
}

const forgotPassword: RequestHandler = async (req, res) => {
  const {email} = req.body;
  const akun = await findAccount({ email: req.body.email });
    if (!akun) {
      logger.error('Account not found')
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "アカウントが見つかりません" }); // Account not found
    }
  const userName = akun.username;
  // const resetToken = crypto.randomBytes(20).toString('hex');
  const resetTokenExpiration = Date.now() + 600000;
  const query = {email};
  const otpNumber = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
  const update = { resetpasswordtoken : otpNumber, resetpasswordexpire : resetTokenExpiration }
  const result = await updateField(query, update);
  if(!result){res.status(400).send({msg:'アカウントが見つかりません'});} // Account not found
  else {
    
    // Compose the email
    const emailBody = `
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open Sans">
    <div style="display: flex;">
    <div style="width: 30%;"></div>
    <div style="width: 450px;">
    <div style="color: #163253; font-size: 16px; font-weight: 600; font-style: normal; font-family: 'Open Sans';">
    <p>${userName}様</p>
    <p>お世話になっております。</p>
    <p>パスワードの再設定リクエストを受け付けました。</p>
    <p>以下のコードを入力し、パスワードを完了させてください。</p>

    <p style='margin: 40px 0; font-size: 16px; font-weight: bold;'>コード: ${otpNumber}</p>
    <p >パスワードの再設定をリクエストされていない方は</p>
    <p >こちらのメッセージを無視してください。</p>
    <br><br>
    <div style="border-bottom: 1px solid #D4DAE0; width: 100%"></div>
    <p style="font-weight: 600; font-size: 11px; color: #163253;">'${COMPANY_NAME}' Inc. Japan</p>
    </div>
    </div>
    <div style="width: 20%;"></div>
    </div>`;
    // const mailOptions = {
    //   from: userEmail,
    //   to: email,
    //   subject: "【ミルコマ】コードのお知らせ", // Reset Password
    //   html: emailBody
    // };

    // mg.messages.create(process.env.MAILGUN_DOMAIN, {
    //   from: process.env.MAILGUN_SERVER_EMAIL,
    //   to: ["openwindower@gmail.com"],
    //   subject: "Hello",
    //   text: "Testing some Mailgun awesomeness!",
    //   html: "<h1>Testing some Mailgun awesomeness!</h1>"
    // })
    // .then((msg:any) => {console.log(msg);res.status(200).send({msg:'メールが正常に送信されました'});}) // logs response data
    // .catch((err:any) => console.log(err));

    // Send the email
    // transporter.sendMail(mailOptions, (error:any, info:any) => {
    //   if (error) {
    //     console.error(error);
    //     res.status(500).send('メール送信エラー'); // Error sending email
    //   } else {
    //     console.log('Email sent: ' + info.response);
    //     res.status(200).send({msg:'メールが正常に送信されました'}); // Email sent successfully
    //   }
    // });  
    
    // try {
    //   const data = await ses.sendEmail(params).promise();
    //   console.log('Email sent:', data.MessageId);
    // } catch (err) {
    //   console.error('Error sending email:', err);
    // }

    sendEmail(email, "【ミルコマ】コードのお知らせ", emailBody).
    then((data:any) => {
      res.status(200).send({msg:'メールが正常に送信されました'}); // Email sent successfully
    }).
    catch((err:any) => {
      console.log(err);
      res.status(500).send('メール送信エラー'); // Error sending email
    });

  }
}

interface FileInterface {
  name: string;
  data: Buffer;
  size: number;
  encoding: string;
  tempFilePath: string;
  truncated: boolean;
  mimetype: string;
  md5: string;
  mv: any;
}

const getUserInfo: RequestHandler = async (req, res) => {
  try {
    const {id} = req.query;
    const result = await readProfile({_id : id});
    // const name = result[0]?.fname + result[0]?.lname;
    if(result){
      const username = result[0]?.username;
      const admin = result[0].admin ? result[0].admin : false
      const region = result[0].region
      return res.status(StatusCodes.OK).send({username, admin, region });
    }
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send({name:'unnamed', username:'unusernamed', secretverify:false});
  }
}

export const getAvatar: RequestHandler = async (req, res) => {
  const id = req.params.id;
  const getAvatar = await AccountModel.findOne({_id:id});
  const file = getAvatar?.avatar;
  const filePath = path.join(avatarPath, file);
  fs.access(filePath, fs.constants.F_OK, (err:any) => {
    if (err) {
      logger.error("No avatar exists");
      const noavatar = path.join(rootPath, 'src/assets/avatar.png');
      res.status(200).sendFile(noavatar);
    } else {
      logger.info("Avatar exists");
      res.status(200).sendFile(filePath);
    }
  });
}

export const getAvatarByEmail: RequestHandler = async (req, res) => {
  const id = req.params.id;
  const getAvatar = await AccountModel.findOne({email:id});
  const file = getAvatar?.avatar;
  const filePath = path.join(avatarPath, file);
  fs.access(filePath, fs.constants.F_OK, (err:any) => {
    if (err) {
      logger.error("No avatar exists");
      if (getAvatar?.admin){
        const adminAvatar = path.join(rootPath, 'src/assets/admin_avatar.png');
        res.status(200).sendFile(adminAvatar);
      }else {
        const noavatar = path.join(rootPath, 'src/assets/avatar.png');
        res.status(200).sendFile(noavatar);
      }
    } else {
      logger.info("Avatar exists");
      res.status(200).sendFile(filePath);
    }
  });
}

const optValidation:RequestHandler = async (req, res) => {
  const otp = req.body.otp;
  const email = req.params.email;
  try {
    await optValidate({email, otp});
    return res.status(StatusCodes.OK).send({msg : "検証が成功しました!"}); // Validate successful!
  } catch (err: any) {
    logger.error(err);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ msg: err.message });
  }
}

const validateToken = (req:any, res:any) => {
  const { authorization } = req.body.token || req.query.token || req.headers;
  if (!authorization) {
    return res.status(StatusCodes.FORBIDDEN).json({
      msg: "トークンが提供されていません", // No token provided
    });
  }
  const token = authorization.split(' ')[1];
  return token;
}

const followUser:RequestHandler = async (req, res) => {
  const followingUser = req.body.email;
  const token = validateToken(req, res);
  try{
    const result = await follow({token, followingUser});
    if(result){
      return res.status(StatusCodes.OK).send({msg : "フォローされました!", state: 1}); // Follow successful!
    }
    return res.status(StatusCodes.OK).send({msg : "すでにこのユーザーをフォローしています", state: 0}); // Already follow this user
  } catch (err:any){
    logger.error(err);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ msg: err.message });
  }
}

const heartUser:RequestHandler = async (req, res) => {
  const heartUser = req.body.email;
  const token = validateToken(req, res);
  try{
    const result = await heart({token, heartUser});
    if(result){
      return res.status(StatusCodes.OK).send({msg : "みたいな!", state: 1}); // Heart successful!
    }
    return res.status(StatusCodes.OK).send({msg : "このユーザーはすでに「いいね」をしています", state: 0}); // Already like this user
  } catch (err:any){
    logger.error(err);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ msg: err.message });
  }
}

const getUserProfile:RequestHandler = async (req, res) => {
  try{
    const token = validateToken(req, res);
    const result = await getUserProfileInfo({token});
    return res.status(StatusCodes.OK).send(result);
  } catch (err) {
    console.error(err);
  }
}

const updateProfile:RequestHandler = async (req, res) => {
  const data = req.body;
  let fileName = data.avatar;
  if (req.files) {
    const files:any = req.files;
    const file:FileInterface = files.avatar;
    const extension = file.name.split('.');
    fileName = data.id+'.'+extension[extension.length-1];
    file.mv(`${avatarPath}/${fileName}`, function (err:any) {
      if (err) {
          console.log(err)
          return res.status(500).send({ msg: "エラーがおきました" });
      }
    });
  }
  await updateUserProfile({data, fileName});
  return res.status(200).send({msg:'正常に更新されました'});
}

const uploadVerify:RequestHandler = async (req, res) => {
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" })
  }
  const files:any = req.files;
  const file:FileInterface = files.file;
  const filename = req.params.id;
  const ext = file.name.split('.');
  const fileExtension = ext[ext.length - 1].toLowerCase();
  file.mv(`${verifyPath}/${filename}.${fileExtension}`, async function (err:any) {
    if (err) {
        console.log(err)
        return res.status(500).send({ msg: "エラーがおきました" });
    }
      const token = validateToken(req, res);
      const email = getEmailFromToken(token);
      await AccountModel.updateOne({ email: email}, {verify_doc:filename+'.'+fileExtension});
      res.status(200).send({ msg : "正常に送信されました" });
  });
}

const changeSNS:RequestHandler = async (req, res) => {
    const data = req.body;
    try{
      await changeSNSData({data});
      return res.status(200).send({msg:'正常に更新されました'});
    } catch(err) {
      console.log(err)
    }
}

const changeSkills:RequestHandler = async (req, res) => {
    const data = req.body;
    try{
      await changeSkillsData({data});
      return res.status(200).send({msg:'正常に更新されました'});
    } catch (err){
      console.log(err);
    }
}

const getCreatorInfo:RequestHandler = async (req, res) => {
  try{
    const data = await AccountModel.find({role:'creator'}, '-admin -password -region -resetpasswordexpire -resetpasswordtoken -__v');
    return res.status(200).send({data});
  } catch(err){
    console.log(err);
  }
}

const getSearchCreatorInfo:RequestHandler = async (req, res) => {
  try{
    const search = req.params.id;;
    const data = await AccountModel.find(
      { 
        role: 'creator', 
        $or: [
          { username: { $regex: new RegExp(search, 'i') } },
          { email: { $regex: new RegExp(search, 'i') } }
        ]
      },
      '-admin -password -region -resetpasswordexpire -resetpasswordtoken -__v'
    );
    return res.status(200).send({data});
  } catch(err){
    console.log(err);
  }
}

const getCreatorProfile:RequestHandler = async (req, res) => {
  const userId = req.params.id;
  try{
    const data = await AccountModel.findOne({_id: userId}, '-admin -password -region -role -resetpasswordexpire -resetpasswordtoken -__v -strikes');
    return res.status(200).send({data});
  }catch(err){
    console.log(err);
  }
}

const verifyData:RequestHandler = async (req, res) => {
  const email = req.params.email;
  try{
    const data = await AccountModel.findOne({email: email}, 'verify');
    return res.status(200).send(data?.verify);
  } catch(err){
    console.error(err);
  }
}

const getAdmin:RequestHandler = async (req, res) => {
  const token = validateToken(req, res);
  try{
    const result = await getAdminData({token});
    return res.status(StatusCodes.OK).send(result);
  } catch(err) {
    console.error(err);
  }
}

const getAllUsersInfo:RequestHandler = async (req, res) => {
  try{
    const info = await AccountModel.find({admin: false}, 'avatar username email company role verify verify_doc');
    return res.status(StatusCodes.OK).send(info);
  } catch(err){
    console.error(err);
  }
}

const userVerify:RequestHandler = async (req, res) => {
  try{
    const userId = req.params.id;
    await AccountModel.updateOne({_id: userId}, {verify: true});
    return res.status(StatusCodes.OK).send({msg:'アップデート成功'});
  }catch(err){
    console.error(err);
  }
}

const userDelete:RequestHandler = async (req, res) => {
  try{
    const userId = req.params.id;
    await AccountModel.deleteOne({_id: userId});
    return res.status(StatusCodes.OK).send({msg:'正常に削除されました'});
  }catch(err){
    console.error(err);
  }
}

const verifyDownload: RequestHandler = async (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(verifyPath, fileName);
  fs.access(filePath, fs.constants.F_OK, (err:any) => {
    if (err) {
      logger.error("No file exists");
      res.status(StatusCodes.OK).send({msg:'No file exists'});
    } else {
      logger.info("File exists");
      res.status(StatusCodes.OK).sendFile(filePath);
    }
  });
}

const getRole: RequestHandler = async (req, res) => {
  const token = validateToken(req, res);
  try{
    const info = await getUserRole({token});
    return res.status(StatusCodes.OK).send({role:info?.role});
  } catch(err){
    console.error(err);
  }
}

const refreshToken: RequestHandler = async (req, res) => {
  try{
    const token = validateToken(req, res);
    const info = await refreshAccessToken(token);
    if(info === false){
      return res.status(StatusCodes.BAD_REQUEST).send({msg:'error'});
    }
    return res.status(StatusCodes.OK).send(info);
  } catch(err){
    console.error(err);
  }
}

const auth = { 
  register, 
  login, 
  changePassword,
  forgotPassword, 
  resetPassword, 
  getUserInfo,
  getAvatar,
  getAvatarByEmail,
  optValidation,
  followUser,
  heartUser,
  getUserProfile,
  updateProfile,
  uploadVerify,
  changeSNS,
  changeSkills,
  getCreatorInfo,
  getSearchCreatorInfo,
  getCreatorProfile,
  verifyData,
  getAdmin,
  getAllUsersInfo,
  userVerify,
  userDelete,
  verifyDownload,
  getRole,
  refreshToken
};
export default auth;
