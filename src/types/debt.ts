export interface Debt {
    _id: string;
    from: number;
    to: number;
    amount: number;
    description: string;
    dateTime: string;
    chatId: number;
}