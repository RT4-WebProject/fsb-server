import { IsNotEmpty, IsOptional } from 'class-validator';
import { Agency } from 'src/models/agency.entity';
import { Campaign } from 'src/models/campaign.entity';

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
  campaign: Campaign;

  @IsNotEmpty()
  agency: Agency;

  @IsOptional()
  feedback: string;
}
