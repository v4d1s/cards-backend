import { IsNumber, IsString } from 'class-validator';

export class CreateCardDTO {
  @IsNumber()
  packId: number;
  @IsNumber()
  userId: number;
  @IsString()
  question: string;
  @IsString()
  answer: string;
}

export class UpdateCardDTO {
  @IsString()
  question: string;
  @IsString()
  answer: string;
}
