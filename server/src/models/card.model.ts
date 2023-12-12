import { Schema, Types, model, Document, ObjectId } from "mongoose";
import Card from "../interfaces/card.interface";
import modelConstants from "../constants/schema_names";

const cardSchema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        // contractId: { type: String, required: true },
        cardData: { type: Array, required: true },
        // payData: { type: Array, required: true },
        // date: { type: Date, default: Date.now() },
    },
    {
      collection: modelConstants.card,
    }
  );
  
  const CardModel = model<Card>(modelConstants.card, cardSchema);
  export default CardModel;