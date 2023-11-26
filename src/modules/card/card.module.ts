import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { Card } from './model/card.schema';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Card])],
  providers: [CardService]
})
export class CardModule {}
