import { Schema, Types, model, Document, ObjectId } from "mongoose";
import PayHistory from "../interfaces/payhistory.interface";
import modelConstants from "../constants/schema_names";

const payHistorySchema = new Schema(
    {
        clientEmail: { type: String, required: true, unique: true },
        contractId: { type: String, required: true, },
        creatorMoney: { type: Number, required: true, },
        fee: { type: Number, required: true, },
        paidDate: { type: String, required: true, },
    },
    {
      collection: modelConstants.payHistory,
    }
  );
  
  const PayHistoryModel = model<PayHistory>(modelConstants.payHistory, payHistorySchema);
  export default PayHistoryModel;