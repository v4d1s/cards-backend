import { Module } from '@nestjs/common';
import { CardsPackService } from './cards-pack.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { CardsPack } from './model/cards-pack.schema';
import { CardsPackController } from './cards-pack.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../user/jwt.strategy';
import {User} from "../user/model/user.schema";
import {UserService} from "../user/user.service";

@Module({
  imports: [
    SequelizeModule.forFeature([CardsPack, User]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [CardsPackController],
  providers: [CardsPackService, UserService],
})
export class CardsPackModule {}
