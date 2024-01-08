import { Schema, Types, model, Document, ObjectId } from "mongoose";
import Message from "../interfaces/message.interface";
import modelConstants from "../constants/schema_names";

const messageSchema = new Schema(
    {
        contractId: { type: String, required: true, unique: true },
        message: { type: Array, required: true },
    },
    {
      collection: modelConstants.message,
    }
  );
  
  const MessageModel = model<Message>(modelConstants.message, messageSchema);
  export default MessageModel;