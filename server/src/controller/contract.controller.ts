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

const insertContract: RequestHandler = async (req, res) => {
    const data = req.body;
    const token = validateToken(req, res);
    try{
        await insertData({token, data});
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
      let creatorEmail = input.data.creatorEmail;
      if(!creatorEmail){
        creatorEmail = 'admin';
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
      throw error;
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
    throw error;
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

const stripe_payment: RequestHandler = async (req, res) => {
  try{
    // const token = validateToken(req, res);
    // const email = getEmailFromToken(token);
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
    const amount =req.body
    const stripeBearerToken = process.env.STRIPE_SECRET_KEY;
    const stripe = require("stripe")(stripeBearerToken);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 50000,
      currency: "usd", 
    });
    console.log('payment - ', paymentIntent);
    res.status(200).json(paymentIntent.client_secret);
  } catch(err){
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
    stripe_payment
  };
  export default contract;