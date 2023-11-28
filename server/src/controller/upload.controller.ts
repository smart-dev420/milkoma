import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { omit } from "lodash";
import logger from "../utils/logger";
import { verifyToken } from '../middlewares/auth.jwt';
import ProvideModel from "../models/provide.model";
import Provide from "../interfaces/provide.interface";
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const rootPath = path.dirname(require.main?.path);
const avatarPath = path.join(rootPath, 'uploads/avatars');
const providePath = path.join(rootPath, 'uploads/provides');
const productPath = path.join(rootPath, 'uploads/products');
const receiptPath = path.join(rootPath, 'uploads/receipts');
const verifyPath = path.join(rootPath, 'uploads/verifies');
const uploadPath = [providePath, productPath, receiptPath, verifyPath];

// let storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//   cb(null, verifyPath)
//   },
//   filename: function (req, file, cb) {
//   let extArray = file.mimetype.split("/");
//   let extension = extArray[extArray.length - 1];
//   cb(null, file.fieldname + '-' + Date.now()+ '.' +extension)
//   }
//   })

//   const upload = multer({ storage: storage })

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
    createdDate: Date;
  }

export const uploadFile: RequestHandler = async (req, res) => {
    if (!req.files) {
      return res.status(500).send({ msg: "file is not found" })
    }
    const files:any = req.files;
    const file:FileInterface = files.file;
    const filename = uuidv4();
    const title = file.name;
    const size = file.size;
    const path = req.body.path;
    const ext = file.name.split('.');
    const provideData = req.body;
    // const contractId = req.body.contractId;
    const fileExtension = ext[ext.length - 1].toLowerCase();
    file.mv(`${uploadPath[path]}/${filename}.${fileExtension}`, function (err:any) {
      if (err) {
          console.log(err)
          return res.status(500).send({ upload: "Error occured" });
      }
      saveFile({title, filename, fileExtension, size, provideData})
      .then(() => res.status(200).send({ upload : "success" }))
      .catch(() => res.status(500).send({ upload : "Error occured"}));
    });
    
  }

  export async function saveFile(input: any) {
    try {
      logger.info("Uploading File");
      const {title, filename, fileExtension, size, provideData} = input;
      console.log(title);
      console.log(filename);
      const existing = await ProvideModel.find({userEmail: provideData.userEmail, creatorEmail: provideData.creatorEmail, contractId: provideData.contractId});
      if(existing.length > 0) {
        logger.error("Already uploaded this file");
      }
      else {
        const doc: Provide = new ProvideModel({
            userEmail: provideData.userEmail,
            creatorEmail: provideData.creatorEmail,
            contractId: provideData.contractId,
            provideData: {
                fileName: title,

            }
        });
        return await ProvideModel.create(doc);
      }
    } catch (error: any) {
      logger.info("Upload PDF Failed");
      throw error;
    }
  }

  export const uploadVerifyFile: RequestHandler = async (req, res) => {
    if (!req.files) {
      return res.status(500).send({ msg: "file is not found" })
    }
    console.log("res - ", req.files);
    const files:any = req.files;
    const file:FileInterface = files.file;
    file.mv(`${verifyPath}/${file.name}`, function (err:any) {
      if (err) {
          console.log(err)
          return res.status(500).send({ upload: "Error occured" });
      }
      res.status(200).send({ upload : "success" });
    });
  }
  const provide = { 
    uploadFile,
    uploadVerifyFile
  };
  export default provide;