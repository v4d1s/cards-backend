import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { Card } from './model/card.schema';
import { SequelizeModule } from '@nestjs/sequelize';
import {CardController} from "./card.controller";

@Module({
  imports: [SequelizeModule.forFeature([Card])],
  controllers: [CardController],
  providers: [CardService]
})
export class CardModule {}
