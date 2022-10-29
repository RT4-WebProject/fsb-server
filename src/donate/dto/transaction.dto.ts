export class TransactionDto{
    id: string;
    createdAt: Date;
    from: string;
    to: string;
    cause: string;
    amount: string;
    receiptStripe: string;
    receiptBlockchain: string;
    fromCountry: string;
    campaignID: string;
}