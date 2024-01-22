import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import authConfig from "../config/auth.config";
import logger from "../utils/logger";

//* Middleware to verify whether the jwt is valid


export const verifyToken: RequestHandler = (req, res, next) => {
  const { authorization } = req.body.token || req.query.token || req.headers;
  if (!authorization) {
    return res.status(StatusCodes.FORBIDDEN).json({
      msg: "トークンが提供されていません", // No token provided
    });
  }
  const token = authorization.split(' ')[1]
  try {
    jwt.verify(token, authConfig.accessTokenSecret, (err: any, decoded: any) => {
      if (err) {
        if (err instanceof TokenExpiredError) {
          return res.status(StatusCodes.UNAUTHORIZED).json({
            msg: 'トークンが期限切れです', // Token has expired
          });
        } else {
          return res.status(StatusCodes.UNAUTHORIZED).json({
            msg: '無効な認証', // Invalid authorization
          });
        }
      }
  
      // Token is valid, you can access decoded information
      res.locals.decoded = decoded;
      next();
    });
  } catch (err: any) {
    if (err.name !== "JsonWebTokenError") {
      logger.error(err);
    } else {
      logger.error("Invalid token", err);
    }
  }
};

export const verifyAdmin: RequestHandler = (req, res, next) => {
  const { authorization } = req.body.token || req.query.token || req.headers;
  console.log()
  if (!authorization) {
    return res.status(StatusCodes.FORBIDDEN).json({
      msg: "トークンが提供されていません",  //No token provided
    });
  }
  const token = authorization.split(' ')[1] 
  try {
    jwt.verify(
      token,
      authConfig.accessTokenSecret,
      (err: any, decoded: any) => {
        if (err) {
          return res.status(StatusCodes.UNAUTHORIZED).json({
            msg: "無効な認証", //Invalid authorization
          });
        }
        if(!authConfig.admins.includes(decoded.user)){
          return res.status(StatusCodes.UNAUTHORIZED).json({
            msg: "無効な認証", //Invalid authorization
          });
        }
        res.locals.decoded = decoded;
        next();
      }
    );
  } catch (err: any) {
    if (err.name !== "JsonWebTokenError") {
      logger.error(err);
    } else {
      logger.error("Invalid token", err);
    }
  }
};
