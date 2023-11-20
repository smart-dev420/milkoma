import { Schema, Types, model, Document, ObjectId } from "mongoose";
import Receipt from "../interfaces/receipt.interface";
import modelConstants from "../constants/schema_names";

const receiptSchema = new Schema(
    {
        userEmail: { type: String, required: true, unique: true },
        contractId: { type: String, required: true, unique: true },
        fileName: { type: String, required: true, unique: true },
        createdDate: { type: String, required: true, unique: true },
    },
    {
      collection: modelConstants.receipt,
    }
  );
  
  const ReceiptModel = model<Receipt>(modelConstants.receipt, receiptSchema);
  export default ReceiptModel;