import {
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsNumberString,
  IsEmail,
  IsNumber,
  IsPositive,
} from 'class-validator';
import { Agency } from 'src/models/agency.entity';

export class CampaignDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  link: string;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  goal: number;
}
