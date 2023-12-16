import { Schema, Types, model, Document, ObjectId } from "mongoose";
import { Provide } from "../interfaces/provide.interface";
import modelConstants from "../constants/schema_names";

const provideSchema = new Schema(
    {
        userEmail: { type: String, required: true },
        // creatorEmail: { type: String, required: true, unique: true },
        contractId: { type: String, required: true, unique: true },
        provideData: [{ 
          title: String,
          fileName: String,
          fileExtension: String,
          fileSize: Number,
          createdDate: Date,
        }]
    },
    {
      collection: modelConstants.provide,
    }
  );
  
  const ProvideModel = model<Provide>(modelConstants.provide, provideSchema);
  export default ProvideModel;