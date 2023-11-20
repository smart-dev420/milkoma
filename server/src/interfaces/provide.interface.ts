export default interface Provide extends Document {
    userEmail: string;
    creatorEmail: string;
    contractId: string;
    provideData: ProvideDataType[];
}

export type ProvideDataType = {
    fileName: string;
    capacity: string;
    createdDate: string;
}