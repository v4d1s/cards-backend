import { IsNumber, IsString } from 'class-validator';

export class CreateCardDTO {
  @IsNumber()
  packId: number;
  @IsString()
  question: string;
  @IsString()
  answer: string;
}
