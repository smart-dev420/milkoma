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
  changeSkillsData
} from "../services/account.service";
import { omit } from "lodash";
import logger from "../utils/logger";
import { verifyToken } from '../middlewares/auth.jwt';
const { v4: uuidv4 } = require('uuid');

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
  accessKeyId: 'AKIA4O2PXKWP46567YHC',
  secretAccessKey: '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',
  region: 'ap-northeast-1',
};

const AWS_SES = new AWS.SES(SES_CONFIG);
const sesSender = process.env.SES_SENDER_EMAIL;
let sendEmail = (recipientEmail:string, name:string, option:string) => {
  let params = {
    Source: 'openwindower@gmail.com',
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
    if (!password) throw Error("No password provided");
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
    return res.status(StatusCodes.OK).send({msg : "パスワード変更済み！"}); // Password changed!
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
    <p>こんにちは、</p>
    <p style='line-height: 300%;'>パスワードをリセットするリクエストを受け取りました。</p>
    <p>リクエストしていない場合は、このメッセージを無視してください。</p>
    <p>それ以外の場合は、以下の番号を使用してパスワードをリセットできます。</p>
    <p style='margin: 40px 0;'>'${otpNumber}'</p>
    <p style='line-height: 0%;'>Thanks</p>
    <p>'${COMPANY_NAME}'</p>
    <br><br><br>
    <div style="border-bottom: 1px solid #D4DAE0; width: 100%"></div>
    <p style="font-weight: 600; font-size: 11px; color: #163253;">'${COMPANY_NAME}' Inc. Japan</p>
    </div>
    </div>
    <div style="width: 20%;"></div>
    </div>`
    const mailOptions = {
      from: userEmail,
      to: email,
      subject: "パスワードを再設定する", // Reset Password
      html: emailBody
    };

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

    sendEmail(email, "パスワードを再設定する", emailBody).
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

// const uploadProfile: RequestHandler = async (req, res) => {
//   // if (!req.files) {
//   //   return res.status(500).send({ msg: "file is not found" })
//   // }
//   const {id} = req.query;
//   const username:string   = req.body.username;
//   const secretcode:string = req.body.secretcode;
//   const fname:string      = req.body.fname;
//   const lname:string      = req.body.lname;
//   const email:string      = req.body.email;
//   const noPublic:boolean  = req.body.noPublic;
//   const bio:string        = req.body.bio;
//   const followers:number  = req.body.followers;
//   const following:number  = req.body.following;
//   const region:number     = req.body.region;
//   console.log("following",following);
//   const filename = id;
//   let resumename = '';
//   if (req.files){
//     const files:any = req.files;
//     if(files.avatar){
//       const avatarFile:FileInterface = files.avatar;
//       avatarFile.mv(`${avatarPath}/${filename}.png`, function (err:any) {
//         if (err) {
//             console.log(err)
//             return res.status(500).send({ result: "Error occured to upload avatar" });
//         }
//       });  
//     }
//     if(files.resume){
//       const resumeFile:FileInterface = files.resume;
//       resumename = uuidv4()
//       // resumeFile.mv(`${resumePath}/${resumename}.pdf`, function (err:any) {
//       //   if (err) {
//       //       console.log(err)
//       //       return res.status(500).send({ result: "Error occured to upload resume" });
//       //   }
//       // });  
//     }
//   }
//   saveProfile({id, username, secretcode, fname, lname, email, noPublic, bio, following, followers, region, resumename})
//   .then(() => res.status(200).send({ result : "success" }))
//   .catch(() => res.status(500).send({ result : "Error occured to upload profile"}));
// }

const readProfilebyID: RequestHandler = async (req, res) => {
  try {
    const {id} = req.query;
    const result = await readProfile({_id:id});
    if(result.length !== 1){
      throw Error("No profile found")
    }
    return res.status(StatusCodes.OK).send({result : result[0]});
  } catch (err) {
      logger.error(err);
      return res.status(StatusCodes.BAD_REQUEST).send({result : null});
  }
}

const getUserInfo: RequestHandler = async (req, res) => {
  try {
    const {id} = req.query;
    const result = await readProfile({_id : id});
    // const name = result[0]?.fname + result[0]?.lname;
    const username = result[0]?.username;
    const admin = result[0].admin ? result[0].admin : false
    const region = result[0].region
    return res.status(StatusCodes.OK).send({username, admin, region });
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
  const token = validateToken(req, res);
  const result = await getUserProfileInfo({token});
  return res.status(StatusCodes.OK).send(result);
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
  file.mv(`${verifyPath}/${filename}.${fileExtension}`, function (err:any) {
    if (err) {
        console.log(err)
        return res.status(500).send({ msg: "エラーがおきました" });
    }
      res.status(200).send({ msg : "正常に送信されました" });
  });
}

const changeSNS:RequestHandler = async (req, res) => {
    const data = req.body;
    await changeSNSData({data});
    return res.status(200).send({msg:'正常に更新されました'});
}

const changeSkills:RequestHandler = async (req, res) => {
    const data = req.body;
    await changeSkillsData({data});
    return res.status(200).send({msg:'正常に更新されました'});
}

const getCreatorInfo:RequestHandler = async (req, res) => {
  const data = await AccountModel.find({role:'creator'}, '-admin -password -region -resetpasswordexpire -resetpasswordtoken -__v');
  return res.status(200).send({data});
}

const getCreatorProfile:RequestHandler = async (req, res) => {
  const userId = req.params.id;
  console.log('userId', userId);
  const data = await AccountModel.findOne({_id: userId}, '-admin -password -region -role -resetpasswordexpire -resetpasswordtoken -__v -strikes');
  return res.status(200).send({data});
}

const auth = { 
  register, 
  login, 
  changePassword,
  readProfilebyID, 
  forgotPassword, 
  resetPassword, 
  getUserInfo,
  getAvatar,
  optValidation,
  followUser,
  heartUser,
  getUserProfile,
  updateProfile,
  uploadVerify,
  changeSNS,
  changeSkills,
  getCreatorInfo,
  getCreatorProfile
};
export default auth;
