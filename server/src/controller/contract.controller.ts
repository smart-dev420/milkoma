import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { omit } from "lodash";
import logger from "../utils/logger";
const { v4: uuidv4 } = require('uuid');
import { getEmailFromToken } from "../services/account.service";
import Contract from "../interfaces/contract.interface";
import ContractModel from "../models/contract.model";

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
        creatorEmail = 'admin@gmail.com';
      }
      const doc: Contract = new ContractModel({
        clientEmail: email,
        creatorEmail: creatorEmail,
        category: input.data.category,
        description: input.data.description,
        stpe1: input.data.stpe1,
        stpe2: input.data.stpe2,
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

const contract = { 
    insertContract
  };
  export default contract;