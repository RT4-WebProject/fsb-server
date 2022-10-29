import { Double } from "typeorm";

export class TransactionDto{
    id: string;
    createdAt: Date;
    from: string;
    to: string;
    cause: string;
    amount: Double;
    receiptStripe: string;
    receiptBlockchain: string;
    fromCountry: string;
    campaignID: string;
    agencyID: string;
}