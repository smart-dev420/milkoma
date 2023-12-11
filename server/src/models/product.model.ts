import { Schema, Types, model, Document, ObjectId } from "mongoose";
import { Product } from "../interfaces/product.interface";
import modelConstants from "../constants/schema_names";

const productSchema = new Schema(
    {
      userEmail: { type: String, required: true, unique: true },
      // creatorEmail: { type: String, required: true, unique: true },
      contractId: { type: String, required: true, unique: true },
      productData: [{ 
        title: String,
        fileName: String,
        fileExtension: String,
        fileSize: Number,
        createdDate: Date,
      }]
    },
    {
      collection: modelConstants.product,
    }
  );
  
  const ProductModel = model<Product>(modelConstants.product, productSchema);
  export default ProductModel;