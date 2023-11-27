import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {Grade} from "./model/grade.schema";
import {GradeController} from "./grade.controller";
import {GradeService} from "./grade.service";

@Module({
    imports: [SequelizeModule.forFeature([Grade])],
    controllers: [GradeController],
    providers: [GradeService],
})
export class GradeModule {}
