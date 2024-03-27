import { IsNumber, IsString } from 'class-validator';

export class CreateWorkDto {
  @IsNumber()
  userId: number;

  @IsString()
  workName: string;

  @IsNumber()
  workPayRate: number;

  @IsNumber()
  workTaxRate: number;
}
