export default interface PayHistory extends Document {
    clientEmail: string;
    creatorEmail: string;
    contractId: string;
    creatorMoney: number;
    fee: number;
    paidDate: string;
}