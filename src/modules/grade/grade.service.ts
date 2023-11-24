import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Grade} from "./model/grade.schema";

@Injectable()
export class GradeService {
    constructor(
        @InjectModel(Grade) private readonly gradeRepository: typeof Grade,
    ) {}

    updateGrade(cardId: number) {
        // TODO update_grade service
    }

    createGrade(cardId: number) {
        // TODO create_grade service
    }
}
