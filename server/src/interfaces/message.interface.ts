export default interface Message extends Document {
    userEmail: string;
    clientEmail: string;
    contractId: string;
    message: MessageDataType[];
}

export type MessageDataType = {
    content: string;
    date: string;
    uploadDataName: string;
    uploadDataPath: string;
    checked: boolean;
}
  