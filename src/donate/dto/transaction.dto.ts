import { IsNotEmpty, IsOptional } from 'class-validator';

export class TransactionDto {
  @IsNotEmpty()
  from: string;

  // amount: number;
  // receiptStripe: string;
  // receiptBlockchain: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  fromCountry: string;

  @IsOptional()
  campaign: string;

  @IsNotEmpty()
  agency: string;

  @IsOptional()
  feedback: string;
}
