export default interface Message extends Document {
    contractId: string;
    message: MessageDataType[];
}

export type MessageDataType = {
    email: string;
    date: string;
    message: string;
    uploadDataName: string;
    checked: boolean;
}
  