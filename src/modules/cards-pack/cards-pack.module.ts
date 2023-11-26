import { Module } from '@nestjs/common';
import { CardsPackService } from './cards-pack.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { CardsPack } from "./model/cards-pack.schema";

@Module({
  imports: [SequelizeModule.forFeature([CardsPack])],
  providers: [CardsPackService]
})
export class CardsPackModule { }
