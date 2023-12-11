export interface Product extends Document {
    userEmail: string;
    contractId: string;
    productData: ProductData[];
}

interface ProductData {
    title: string;
    fileName: string;
    fileExtension: string;
    fileSize: number;
    createdDate: Date;
  }