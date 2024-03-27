import { IsEmail, IsNumber, IsString } from 'class-validator';

export class GetUserDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
