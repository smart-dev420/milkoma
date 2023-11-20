export default interface Product extends Document {
    userEmail: string;
    clientEmail: string;
    contractId: string;
    productData: ProductDataType[];
}

export type ProductDataType = {
    fileName: string;
    capacity: string;
    createdDate: string;
}