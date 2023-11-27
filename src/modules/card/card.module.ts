import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { Card } from './model/card.schema';
import { SequelizeModule } from '@nestjs/sequelize';
import {CardController} from "./card.controller";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "../user/jwt.strategy";
import {CardsPackService} from "../cards-pack/cards-pack.service";
import {CardsPackModule} from "../cards-pack/cards-pack.module";
import {CardsPackController} from "../cards-pack/cards-pack.controller";
import {CardsPack} from "../cards-pack/model/cards-pack.schema";

@Module({
  imports: [
      SequelizeModule.forFeature([Card, CardsPack]),
      JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '1h' },
      }),
  ],
  controllers: [CardController],
  providers: [CardService, CardsPackService]
})
export class CardModule {}
