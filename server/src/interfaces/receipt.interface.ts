export default interface Receipt extends Document {
    user_email: string;
    contract_id: string;
    fileName: string;
    createdDate: string;
}

export type ReceiptDataType = {

}