import { Schema, Types, model, Document, ObjectId } from "mongoose";
import Contract from "../interfaces/contract.interface";
import modelConstants from "../constants/schema_names";

const contractSchema = new Schema(
    {
      clientEmail: { type: String, required: true, },
      creatorEmail: { type: String, required: true, default:'admin@gmail.com' },
      category: { type: String, required: true },
      description: { type: String, },
      stpe1: { type: String, default: '' },
      stpe2: { type: String, default: '' },
      step3: { type: String, default: '' },
      status: { type: Number, default: 0 },
      cancel: { type: String, default: '' },
      creatorPrice: { type: Number, default: 0 },
      fee: { type: Number, default: 0 },
      createdDate: { type: Date, default: Date.now },
      endDate: { type: Date,  default: '' },
    },
    {
      collection: modelConstants.contract,
    }
  );
  
  const ContractModel = model<Contract>(modelConstants.contract, contractSchema);
  export default ContractModel;