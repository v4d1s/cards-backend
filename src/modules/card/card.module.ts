import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { Card } from './model/card.schema';
import { SequelizeModule } from '@nestjs/sequelize';
import { CardController } from './card.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../user/jwt.strategy';
import { CardsPackService } from '../cards-pack/cards-pack.service';
import { CardsPack } from '../cards-pack/model/cards-pack.schema';
import { GradeService } from '../grade/grade.service';
import { Grade } from '../grade/model/grade.schema';
import { User } from '../user/model/user.schema';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Card, CardsPack, Grade, User]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [CardController],
  providers: [CardService, CardsPackService, GradeService, UserService],
})
export class CardModule {}
