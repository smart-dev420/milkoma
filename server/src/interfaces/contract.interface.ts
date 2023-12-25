export default interface Contract extends Document {
    clientEmail: string;
    creatorEmail: string;
    category: string;
    description: string;
    step1: string;
    step2: string;
    step3: number;
    status: number;
    cancel: string;
    creatorPrice: string;
    fee: string;
    confirm: boolean;
    billed: boolean;
    createdDate: string;
    endDate: string;
    paidDate: string;
  }
  