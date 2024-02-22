import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { omit } from "lodash";
import logger from "../utils/logger";
const { v4: uuidv4 } = require('uuid');
import { getEmailFromToken, readCreatorInfo, readProfile } from "../services/account.service";
import Contract from "../interfaces/contract.interface";
import ContractModel from "../models/contract.model";
import AccountModel from "../models/account.model";
import { allContract, getContract } from "../services/contract.service";
import { subscribe } from "../utils/stripe";
import express, { Request, Response } from 'express';
import { CreatePdfDocument } from "../utils/create_pdf";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import AWS from 'aws-sdk';
const COMPANY_NAME = process.env.COMPANY_NAME;
const domain = process.env.DOMAIN;

const SES_CONFIG = {
  accessKeyId: 'AKIA4O2PXKWP46567YHC',
  secretAccessKey: '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',
  region: 'ap-northeast-1',
};

const AWS_SES = new AWS.SES(SES_CONFIG);
const awsEmail:string = process.env.AWS_EMAIL??'';
const sendEmail = (recipientEmail:string, name:string, option:string) => {
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

export const validateToken = (req:any, res:any) => {
    const { authorization } = req.body.token || req.query.token || req.headers;
    if (!authorization) {
      return res.status(StatusCodes.FORBIDDEN).json({
        msg: "トークンが提供されていません", // No token provided
      });
    }
    const token = authorization.split(' ')[1];
    return token;
}

const insertContract: RequestHandler = async (req, res) => {
    const data = req.body;
    const token = validateToken(req, res);
    const email = getEmailFromToken(token);
    const userData = await AccountModel.findOne({email:email}, 'username');
    let step3 = '';
    if(data.step3 === 0){
      step3 = '相談したい';
    } else {
      step3 = data.step3 + 'ヶ月';
    }
    try{
        await insertData({token, data});
        const emailBody = `<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open Sans">
        <div style="display: flex;">
        <div style="width: 30%;"></div>
        <div style="width: 450px;">
        <div style="color: #163253; font-size: 16px; font-weight: 600; font-style: normal; font-family: 'Open Sans';">
        <p>【ミルコマ】お申し込み受け付けました。</p>
        <p>———————————————————————-</p>
        <p style='line-height: 150%;font-size:12px'>このメールはお客様の注文に関する大切なメールです。<br>
          必ず内容をご確認ください。</p>
        <p>———————————————————————-</p>    
        <p>${userData?.username}様</p>
    
        <p>お世話になっております。</p>
        <p>この度は、弊社ミルコマの丸投げ依頼に</p>
        <p>お申し込みくださりありがとうございました。</p>
        <p>以下の内容でご依頼の丸投げをお受けいたしましたので、</p>
        <p>今一度ご確認くださいませ。</p>
        <p>━━━ お申し込み情報 ━━━━━━━━━━━━━━━━</p>
        <p>【Q1.どのような商品か？】</p>
        <p>${data.step1}</p>
        <p>【Q2.動画をどのように追加いたいか？】</p>
        <p>${data.step2}</p>
        <p>【Q3.納期はいつ頃が希望か？】</p>
        <p>${step3}</p>
        <p>———————————————————————</p>
        <p>▼▼▼キャンセルについて▼▼▼</p>
        <p>ご依頼をキャンセルされる場合は、</p>
        <p>下記マイページにの「キャンセルボタン」からお願いいたします。</p>
        <p>ミルコマ連絡先：info@neopen.co.jp</p>
        <p>ご質問やご不明な点がございましたら、</p>
        <p>お手数ではございますが、下記までお問い合わせください。</p>
        <p>メールアドレス：info@neopen.co.jp</p>
        <p><a href="${domain}">ミルコマ</a></p>

        <br><br><br>
        <div style="border-bottom: 1px solid #D4DAE0; width: 100%"></div>
        <p style="font-weight: 600; font-size: 11px; color: #163253;">'${COMPANY_NAME}' Inc. Japan</p>
        </div>
        </div>
        <div style="width: 20%;"></div>
        </div>`;
        // sendEmail(email, "案件受注", emailBody);
        
        return res.status(StatusCodes.OK).send({msg : "契約が成果的に締結されました。"}); // The contract has been successfully concluded.
      } catch (err:any){
        logger.error(err);
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({ msg: err.message });
      }
}

export async function insertData(input: any) {
    try {
      logger.info("Adding contract");
      const email = getEmailFromToken(input.token);
      const res = await AccountModel.findOne({_id: input.data.creatorEmail}, 'email');
      let creatorEmail;
      if(!res){
        creatorEmail = 'admin';
      } else {
        creatorEmail = res.email;
      }
      console.log('data - ', input.data.step1);
      const doc: Contract = new ContractModel({
        clientEmail: email,
        creatorEmail: creatorEmail,
        category: input.data.category,
        description: input.data.description,
        step1: input.data.step1,
        step2: input.data.step2,
        step3: input.data.step3,
        status: 0,
        cancel: '', 
      });
      return await ContractModel.create(doc);
    } catch (error: any) {
      logger.error("Adding Contract Failed");
      // throw error;
    }
  }

const getCreatorData: RequestHandler = async (req, res) => {
  try {
    logger.info("Getting contract creator info");
    const contractId = req.params.id;
    const data = await ContractModel.findOne({ _id: contractId });
    const info = await AccountModel.findOne({ email: data?.creatorEmail }, 'email username avatar heart follower');
    return res.status(StatusCodes.OK).send(info);
  } catch (error: any) {
    logger.error("Getting contract creator info Failed");
    // throw error;
  }
}

const getAllContract: RequestHandler = async (req, res) => {
  try{
    logger.info("Getting all contract info");
    const userEmail = req.params.email;
    const info = await allContract(userEmail);
    return res.status(StatusCodes.OK).send(info);
  } catch (error: any) {
    console.error(error);
  }
}

const getContractInfo: RequestHandler = async (req, res) => {
  try{
    const contractId = req.params.id;
    const info = await getContract(contractId);
    return res.status(StatusCodes.OK).send(info);
  }catch(err){
    console.error(err);
  }
}

const setContract: RequestHandler = async (req, res) => {
  try{
    const contractId = req.params.id;
    const info = await ContractModel.updateOne({ _id: contractId }, { confirm: true });
    return res.status(StatusCodes.OK).send(info);
  } catch (err){
    console.error(err);
  }
}

const nextStep: RequestHandler = async (req, res) => {
  try{
    const contractId = req.params.id;
    const status = parseInt(req.body.currentStatus) + 1;
    console.log('data - ', contractId, '---', status);
    const info = await ContractModel.updateOne({ _id: contractId }, { status: status });
    return res.status(StatusCodes.OK).send(info);
  } catch (err){
    console.error(err);
  }
}

const getAllContracts: RequestHandler = async (req, res) => {
  try{
    const info = await ContractModel.find();
    return res.status(StatusCodes.OK).send(info);
  } catch(err){
    console.error(err);
  }
}

const contractConfirm: RequestHandler = async (req, res) => {
  try{
    const contractId = req.params.id;
    await ContractModel.updateOne({_id: contractId}, {status: 1, confirm:true});
    return res.status(StatusCodes.OK).send({msg:'正常に確認されました'});
  } catch (err){
    console.error(err);
  }
}

const contractCancel: RequestHandler = async (req, res) => {
  try{
    const contractId = req.params.id;
    await ContractModel.updateOne({_id: contractId}, {status: -1, confirm:false});
    return res.status(StatusCodes.OK).send({msg:'正常にキャンセルされました'});
  } catch (err){
    console.error(err);
  }
}

const addCreator: RequestHandler = async (req, res) => {
  try{
    const contractId = req.params.id;
    const creatorEmail = req.body.creator_email;
    console.log('creatorEmail - ',creatorEmail);
    if(!creatorEmail){
      return res.status(StatusCodes.OK).send(false);
    }
    await ContractModel.updateOne({_id: contractId}, {creatorEmail: creatorEmail});
    return res.status(StatusCodes.OK).send({msg:'正常に追加されました'});
  } catch (err){
    console.error(err);
  }
}

const contractPayment: RequestHandler = async (req, res) => {
  try{
    const contractId = req.params.id;
    const price = req.body.price;
    const fee = req.body.fee;
    await ContractModel.updateOne({_id: contractId}, {creatorPrice:price, fee:fee});
    return res.status(StatusCodes.OK).send({msg:'正常に追加されました'});
  } catch (err){
    console.error(err);
  }
}

const stripe_payment: RequestHandler = async (req, res) => {
  try{
    const token = validateToken(req, res);
    const email = getEmailFromToken(token);
    // const contractId = req.params.id;
    // const detail = {
    //   email: email,
    //   username: req.body.username,
    //   cardNumber: req.body.cardNumber,
    //   month: req.body.month,
    //   year: req.body.year,
    //   cvc: req.body.cvc
    // }
    // const info = await subscribe({contractId, detail});
    // return res.status(StatusCodes.OK).send(info);
    console.log('*****************************', req.body.token)
    // const { token, amount } = req.body;
    const idempotencyKey = uuidv4();
    const stripeBearerToken = process.env.STRIPE_SECRET_KEY;
    const stripe = require("stripe")(stripeBearerToken);
    
    try {

      const customer = await stripe.customers.create({
        email: email,
        name: 'Neopen' // Assuming 'token' contains the payment method ID (e.g., card token)
      });
      console.log('customer', customer);
      // const customer = await stripe.customers.create({
      //   email: token.email,
      //   source: token.id // Assuming 'token' contains the payment method ID (e.g., card token)
      // });
    
      // const charge = await stripe.charges.create({
      //   amount: amount * 100,
      //   currency: 'usd',
      //   customer: customer.id,
      //   receipt_email: token.email
      // }, {
      //   idempotencyKey: idempotencyKey
      // });
    
      // res.status(200).json(charge);
      // let paymentMethod = await stripe.paymentMethods.create({
      //   type: 'card',
      //   card: {
      //   number: '4242424242424242',
      //   exp_month: 9,
      //   exp_year: 2024,
      //   cvc: '314',
      //   },
      //   });
      // let paymentIntent = await stripe.paymentIntents.create({
      //   payment_method: paymentMethod.id,
      //   amount: 75*100, // USD*100
      //   currency: 'usd',
      //   confirm: true,
      //   payment_method_types: ['card'],
      //   });

      //   res.send(paymentIntent);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'An error occurred while processing your payment.' });
    }

    // const amount =req.body.amount;
    // const stripeBearerToken = process.env.STRIPE_SECRET_KEY;
    // const stripe = require("stripe")(stripeBearerToken);
    
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: parseInt(amount),
    //   currency: "usd", 
    // });
    // console.log('payment - ', paymentIntent);
    // res.status(200).json(paymentIntent.client_secret);
  } catch(err){
    console.error(err);
  }
}

interface CreatePaymentIntentRequest {
  amount: number;
  currency: string;
  customer: string;
}

interface CreatePaymentIntentResponse {
  clientSecret: string;
}

const getClientSecret: RequestHandler = async (req: Request<any, any, CreatePaymentIntentRequest>, res: Response<CreatePaymentIntentResponse | { error: string }>) => {
  const { amount, currency, customer } = req.body;
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27', // Change to your Stripe API version
  });
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      customer,
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
}

const paymentSave: RequestHandler = async (req: Request, res: Response) => {
  try{
    const contractId = req.params.id;
    await ContractModel.updateOne({ _id: contractId }, { billed: true, paidDate: Date.now() });
    const info = await ContractModel.findOne({ _id: contractId});
    if(info){
      const totalPrice = parseFloat(info.creatorPrice) + parseFloat(info.fee);
      const value = { name: info.category, price: totalPrice }
      CreatePdfDocument(contractId, value);
    }
    return res.status(StatusCodes.OK);
  } catch (err){
    console.error(err);
  }
}

const getPaymentHistory: RequestHandler = async (req: Request, res: Response) =>{
  try{
    const token = validateToken(req, res);
    const email = getEmailFromToken(token);
    const info = await ContractModel.find({clientEmail: email, billed: true}, 'category creatorPrice fee');
    return res.status(StatusCodes.OK).send(info);
  } catch (err){
    console.error(err);
  }
}

const contract = { 
    insertContract,
    getCreatorData,
    getAllContract,
    getContractInfo,
    setContract,
    nextStep,
    stripe_payment,
    getAllContracts,
    contractConfirm,
    contractCancel,
    addCreator,
    getClientSecret,
    contractPayment,
    paymentSave,
    getPaymentHistory
  };
  export default contract;