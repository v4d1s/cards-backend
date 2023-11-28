import { Module } from '@nestjs/common';
import { CardsPackService } from './cards-pack.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { CardsPack } from './model/cards-pack.schema';
import { CardsPackController } from './cards-pack.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../user/jwt.strategy';

@Module({
  imports: [
    SequelizeModule.forFeature([CardsPack]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [CardsPackController],
  providers: [CardsPackService],
})
export class CardsPackModule {}
