import {Body, Controller, Patch} from '@nestjs/common';
import {GradeService} from "./grade.service";
import {CreateGradeDTO} from "./dto";

@Controller('/pack/:packId/card/:cardId')
export class GradeController {
    constructor(private readonly gradeService: GradeService) {}

    @Patch('grade')
    updateGrade(@Body() dto: CreateGradeDTO) {
        return this.gradeService.updateGrade(dto);
    }
}
