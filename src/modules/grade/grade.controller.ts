import {Body, Controller, Patch} from '@nestjs/common';
import {GradeService} from "./grade.service";
import {CreateGradeDTO} from "./dto";

@Controller('/pack/:packId/:cardId')
export class GradeController {
    constructor(private readonly gradeService: GradeService) {}

    @Patch()
    updateGrade(@Body() dto: CreateGradeDTO) {
        return this.gradeService.updateGrade(dto);
    }
}
