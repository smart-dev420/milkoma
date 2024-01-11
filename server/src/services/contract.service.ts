import Contract from "../interfaces/contract.interface";
import ContractModel from "../models/contract.model";
import logger from "../utils/logger";
import bcrypt from "bcrypt";
import { get } from "lodash";
import dotenv from "dotenv";
import ProvideModel from "../models/provide.model";
import ProductModel from "../models/product.model";
dotenv.config({ path: "./.env" });

export function allContract(input: string){
    try{
      const res = ContractModel.find({ clientEmail: input }).sort({ createdDate: -1 });
        return res;
    }catch (err){
        console.error(err)
    }
}

export function getContract(input: string){
    try{
        const res = ContractModel.findOne({_id: input});
        return res;
    } catch (err){
        console.error(err);
    }
}

export async function saveProvideFile(input: any): Promise<void> {
    try {
      console.log("Uploading Provide File");
      const { title, filename, fileExtension, size, provideData } = input;
  
      const existing = await ProvideModel.findOne({ userEmail: provideData.userEmail, contractId: provideData.contractId });
  
      if (existing) {
        console.log("Already the data exists");
        existing.provideData.push({
          title: title,
          fileName: filename,
          fileExtension: fileExtension,
          fileSize: size,
          createdDate: new Date(),
        });
        await existing.save();
      } else {
        const newProvideData = {
          title: title,
          fileName: filename,
          fileExtension: fileExtension,
          fileSize: size,
          createdDate: new Date(),
        };
  
        const docData = {
          userEmail: provideData.userEmail,
          contractId: provideData.contractId,
          provideData: [newProvideData]
        };
  
        await ProvideModel.create(docData);
      }
    } catch (error) {
      console.log("Upload Failed");
      // throw error;
    }
  }

export async function saveProductFile(input: any): Promise<void> {
  try {
    console.log("Uploading Product File");
    const { title, filename, fileExtension, size, productData } = input;

    const existing = await ProductModel.findOne({ userEmail: productData.userEmail, contractId: productData.contractId });

    if (existing) {
      console.log("Already the data exists");
      existing.productData.push({
        title: title,
        fileName: filename,
        fileExtension: fileExtension,
        fileSize: size,
        createdDate: new Date(),
      });
      await existing.save();
    } else {
      const newProductData = {
        title: title,
        fileName: filename,
        fileExtension: fileExtension,
        fileSize: size,
        createdDate: new Date(),
      };

      const docData = {
        userEmail: productData.userEmail,
        contractId: productData.contractId,
        productData: [newProductData]
      };

      await ProductModel.create(docData);
    }
  } catch (error) {
    console.log("Upload Failed");
    // throw error;
  }
}