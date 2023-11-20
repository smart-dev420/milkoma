export default interface Card extends Document {
    email: string;
    cardData: CardDataType[];
}

export type CardDataType = {
    type: string;
    name: string;
    number: number;
    year: string;
    month: string;
    cvc: string;
    status: boolean;
}