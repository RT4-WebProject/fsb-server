import {
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsNumberString,
  IsEmail,
} from 'class-validator';

export class CreateAgencyDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  countries: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  password: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
