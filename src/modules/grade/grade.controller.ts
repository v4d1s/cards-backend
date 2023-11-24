import {Controller, Get, Param, Patch, Post} from '@nestjs/common';
import {GradeService} from "./grade.service";

@Controller('/pack/:packId')
export class GradeController {
    constructor(private readonly gradeService: GradeService) {}

    @Post(':cardId')
    createGrade(@Param() params: any) {
        return this.gradeService.createGrade(params.cardId);
    }

    @Patch(':cardId')
    updateGrade(@Param() params: any) {
        return this.gradeService.updateGrade(params.cardId);
    }
}
