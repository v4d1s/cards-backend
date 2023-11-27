import {Controller, Get, Param, Patch, Post} from '@nestjs/common';
import {GradeService} from "./grade.service";

@Controller('/pack/:packId/:cardId')
export class GradeController {
    constructor(private readonly gradeService: GradeService) {}

    @Patch()
    updateGrade(@Param('cardId') cardId: number) {
        return this.gradeService.updateGrade(cardId);
    }
}
