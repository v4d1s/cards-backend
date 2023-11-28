import {IsNumber} from 'class-validator';

export class CreateGradeDTO {
    @IsNumber()
    grade: number;
    @IsNumber()
    shots: number;
}