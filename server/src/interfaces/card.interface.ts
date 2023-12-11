export default interface Card extends Document {
    email: string;
    cardData: CardDataType[];
}

export type CardDataType = {
    type: string;
    email: string;
    name: string;
    cardId: string;
    clientId: string;
    price: { type: Number, required: true },
    subscriptionId: { type: String, required: true },
    // paymentMethod: { type: String, required: true },
    // number: number;
    // year: string;
    // month: string;
    // cvc: string;
    // status: boolean;
}