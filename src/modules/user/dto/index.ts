import {IsBoolean, IsNumber, IsString} from 'class-validator';

export class CreateUserDTO {
    @IsString()
    name: string;
    @IsNumber()
    userId: number;
    @IsBoolean()
    isPrivate: boolean;
    @IsNumber()
    cardsCount: number;
}