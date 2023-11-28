import {Body, Controller, Param, Patch, Request, UseGuards} from '@nestjs/common';
import {GradeService} from "./grade.service";
import {CreateGradeDTO} from "./dto";
import {AuthGuard} from "../user/auth.guard";

@UseGuards(AuthGuard)
@Controller('/pack/:packId/card/:cardId')
export class GradeController {
    constructor(private readonly gradeService: GradeService) {}

    @Patch('grade')
    updateGrade(@Body() dto: CreateGradeDTO, @Param('cardId') cardId: number, @Request() req: any) {
        return this.gradeService.updateGrade(dto, req.user.id, cardId);
    }
}
