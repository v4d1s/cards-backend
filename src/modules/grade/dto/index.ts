import {IsNumber} from 'class-validator';

export class CreateGradeDTO {
    @IsNumber()
    cardId: number;
    @IsNumber()
    userId: number;
    @IsNumber()
    grade: number;
    @IsNumber()
    shots: number;
}