import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { omit } from "lodash";
import logger from "../utils/logger";
import { verifyToken } from '../middlewares/auth.jwt';
import ProvideModel from "../models/provide.model";
import { Provide } from "../interfaces/provide.interface";
import { saveProvideFile, saveProductFile } from "../services/contract.service";
import ProductModel from "../models/product.model";
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const rootPath = path.dirname(require.main?.path);
const providePath = path.join(rootPath, 'uploads/provides');
const productPath = path.join(rootPath, 'uploads/products');
const receiptPath = path.join(rootPath, 'uploads/receipts');

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

const uploadProvideFile: RequestHandler = async (req, res) => {
    if (!req.files) {
      return res.status(500).send({ msg: "file is not found" })
    }
    const contractId = req.body.contractId;
    const cus_fileName = req.body.filename;
    const files:any = req.files;
    const file:FileInterface = files.file;
    const filename = contractId + uuidv4();
    let title:string = file.name;
    const size = file.size;
    const ext = file.name.split('.');
    const provideData = req.body;
    const fileExtension = ext[ext.length - 1].toLowerCase();
    if(cus_fileName !== ''){
      title = cus_fileName + '.' + fileExtension;
    }
    file.mv(`${providePath}/${filename}.${fileExtension}`, async function (err:any) {
      if (err) {
          console.log(err)
          return res.status(500).send({ msg: "アップロード失敗" });
      }
      try {
        await saveProvideFile({ title, filename, fileExtension, size, provideData });
        return res.status(200).send({ msg: "アップロードに成功しました" });
      } catch (error) {
        console.log(error);
        return res.status(500).send({ msg: "アップロード失敗" });
      }
    });
  }
  
  const provideDownload: RequestHandler = async (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.join(providePath, fileName);
    fs.access(filePath, fs.constants.F_OK, (err:any) => {
      if (err) {
        logger.error("No file exists");
        res.status(200).send({msg:'No file exists'});
      } else {
        logger.info("File exists");
        res.status(200).sendFile(filePath);
      }
    });
  }

  const getProvideFiles: RequestHandler = async (req, res) => {
    const contractId = req.params.id;
    try{
      const result = await ProvideModel.findOne({contractId:contractId});
      return res.status(200).send({data: result?.provideData});
    }catch(error) {
      logger.error(error);
      // throw error;
    }
  }

  const uploadProductFile: RequestHandler = async (req, res) =>{
    if (!req.files) {
      return res.status(500).send({ msg: "file is not found" })
    }
    const contractId = req.body.contractId;
    const cus_fileName = req.body.filename;
    const files:any = req.files;
    const file:FileInterface = files.file;
    const filename = contractId + uuidv4();
    let title:string = file.name;
    const size = file.size;
    const ext = file.name.split('.');
    const productData = req.body;
    const fileExtension = ext[ext.length - 1].toLowerCase();
    if(cus_fileName !== ''){
      title = cus_fileName + '.' + fileExtension;
    }
    file.mv(`${productPath}/${filename}.${fileExtension}`, async function (err:any) {
      if (err) {
          console.log(err)
          return res.status(500).send({ msg: "アップロード失敗" });
      }
      try {
        await saveProductFile({ title, filename, fileExtension, size, productData });
        return res.status(200).send({ msg: "アップロードに成功しました" });
      } catch (error) {
        console.log(error);
        return res.status(500).send({ msg: "アップロード失敗" });
      }
    });
  }

  const getProductFiles: RequestHandler = async (req, res) => {
    const contractId = req.params.id;
    try{
      const result = await ProductModel.findOne({contractId:contractId});
      return res.status(200).send({data: result?.productData});
    }catch(error) {
      logger.error(error);
      // throw error;
    }
  }

  const productDownload: RequestHandler = async (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.join(productPath, fileName);
    fs.access(filePath, fs.constants.F_OK, (err:any) => {
      if (err) {
        logger.error("No file exists");
        res.status(200).send({msg:'No file exists'});
      } else {
        logger.info("File exists");
        res.status(200).sendFile(filePath);
      }
    });
  }

  const receivedDownload: RequestHandler = async (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.join(receiptPath, fileName);
    fs.access(filePath, fs.constants.F_OK, (err:any) => {
      if (err) {
        logger.error("No file exists");
        res.status(200).send({msg:'No file exists'});
      } else {
        logger.info("File exists");
        res.status(200).sendFile(filePath);
      }
    });
  }

  const provide = { 
    uploadProvideFile,
    provideDownload,
    getProvideFiles,
    uploadProductFile,
    getProductFiles,
    productDownload,
    receivedDownload
  };
  export default provide;