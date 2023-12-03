import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateCardsPackDTO {
  @IsString()
  name: string;
  @IsNumber()
  userId: number;
  @IsBoolean()
  isPrivate: boolean;
}

export class UpdateCardsPackDTO {
  @IsString()
  name: string;
  @IsBoolean()
  isPrivate: boolean;
}
