import { Schema, Types, model, Document, ObjectId } from "mongoose";
import Card from "../interfaces/card.interface";
import modelConstants from "../constants/schema_names";

const cardSchema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        cardData: { type: Array, required: true },
    },
    {
      collection: modelConstants.card,
    }
  );
  
  const CardModel = model<Card>(modelConstants.card, cardSchema);
  export default CardModel;