export interface Provide extends Document {
    userEmail: string;
    contractId: string;
    provideData: ProvideData[];
  }

interface ProvideData {
    title: string;
    fileName: string;
    fileExtension: string;
    fileSize: number;
    createdDate: Date;
  }