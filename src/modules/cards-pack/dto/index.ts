import {IsBoolean, IsNumber, IsString} from 'class-validator';

export class CreateCardsPackDTO {
    @IsString()
    name: string;
    @IsNumber()
    userId: number;
    @IsBoolean()
    isPrivate: boolean;
}