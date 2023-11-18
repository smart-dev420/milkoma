import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { isEmpty } from "lodash";
import logger from "../utils/logger";

//* Making sure the request have body, do not use for GET requests

export const verifyBodyRequest: RequestHandler = (req, res, next) => {
  if (isEmpty(req.body)) {
    logger.error("Request have no body!");
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "No body provided!" });
  } else {
    next();
  }
};

export const existIDRequest: RequestHandler = (req, res, next) => {
  const id = req.query.id;
  if (isEmpty(id)) {
    logger.error("existIDRequest : Request has no address!");
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "No ID!" });
  } else {
    if(id?.length != 24){
      logger.error("Invalid ID!");
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "ID validation failed" });
    }else{
      next();
    }
  }
};

export const existTxRequest: RequestHandler = (req, res, next) => {
  const tx = req.query.tx;
  if (isEmpty(tx)) {
    logger.error("Request has no Tx!");
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "No Tx!" });
  } else {
    if(tx?.length != 66) {
      logger.error("Invalid Tx!");
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Tx validation failed" });
    }else{
      next();
    }
  }
};
