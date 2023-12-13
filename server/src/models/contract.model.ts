import { Schema, Types, model, Document, ObjectId } from "mongoose";
import Contract from "../interfaces/contract.interface";
import modelConstants from "../constants/schema_names";

const contractSchema = new Schema(
    {
      clientEmail: { type: String, required: true, },
      creatorEmail: { type: String, required: true, default:'admin@gmail.com' },
      category: { type: String, required: true },
      description: { type: String, },
      step1: { type: String },
      step2: { type: String },
      step3: { type: Number },
      status: { type: Number, default: 0 },
      cancel: { type: String, default: '' },
      creatorPrice: { type: Number, default: 0 },
      fee: { type: Number, default: 0 },
      confirm: { type: Boolean, default: false },
      billed: { type: Boolean, default: false },
      createdDate: { type: Date, default: Date.now },
      endDate: { type: Date,  default: '' },
    },
    {
      collection: modelConstants.contract,
    }
  );
  
  const ContractModel = model<Contract>(modelConstants.contract, contractSchema);
  export default ContractModel;