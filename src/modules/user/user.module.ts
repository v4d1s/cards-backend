import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './model/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy, jwtConstants } from './jwt.strategy';
import { Grade } from '../grade/model/grade.schema';
import { GradeService } from '../grade/grade.service';
import { CardService } from '../card/card.service';
import { Card } from '../card/model/card.schema';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    SequelizeModule.forFeature([User, Grade, Card]),
  ],
  providers: [UserService, JwtStrategy, GradeService, CardService],
  controllers: [UserController],
  exports: [PassportModule, UserService],
})
export class UserModule {}
