import {
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsNumberString,
  IsEmail,
} from 'class-validator';

export class AgencyDto {
  id: string;
  createdAt: Date;
  name: string;
  website: string;
  social: string;
  phone: string;
  email: string;
  image: string;
  approved: boolean;
  countries: string;
  description: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
