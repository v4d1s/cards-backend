import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Grade} from "./model/grade.schema";
import {CreateGradeDTO} from "./dto";

@Injectable()
export class GradeService {
    constructor(
        @InjectModel(Grade) private readonly gradeRepository: typeof Grade,
    ) {}

    async updateGrade(dto: CreateGradeDTO, userId: number, cardId: number) {
        let newGrade = (await this.gradeRepository.findOne({where: {cardId, userId}})).grade + dto.grade;
        let newShots = (await this.gradeRepository.findOne({where: {cardId, userId}})).shots + 1;
        return await this.gradeRepository.update({grade: newGrade, shots: newShots}, {where: {cardId, userId}})
    }

    async createGradesForNewUser(list: any, userId: number) {
        for (let card of list) {
            const newGrade = {
                cardId: card.id,
                userId: userId,
            };
            await this.gradeRepository.create(newGrade);
        }
    }

    async createGradesForNewCard(list: any, cardId: number) {
        for (let card of list) {
            const newGrade = {
                cardId: cardId,
                userId: card.id,
            };
            await this.gradeRepository.create(newGrade);
        }
    }
}
