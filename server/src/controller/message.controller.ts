import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { omit } from "lodash";
import logger from "../utils/logger";
import { verifyToken } from '../middlewares/auth.jwt';
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const rootPath = path.dirname(require.main?.path);
const messagePath = path.join(rootPath, 'uploads/messages');

const saveMessage: RequestHandler = async (req, res) => {

}
const message = {
    saveMessage
}
export default message;