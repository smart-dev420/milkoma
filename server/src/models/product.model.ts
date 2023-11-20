import { Schema, Types, model, Document, ObjectId } from "mongoose";
import Product from "../interfaces/product.interface";
import modelConstants from "../constants/schema_names";

const productSchema = new Schema(
    {
        userEmail: { type: String, required: true, unique: true },
        clientEmail: { type: String, required: true, unique: true },
        contractId: { type: String, required: true, unique: true },
        productData: { type: Array, required: true },
    },
    {
      collection: modelConstants.product,
    }
  );
  
  const ProductModel = model<Product>(modelConstants.product, productSchema);
  export default ProductModel;