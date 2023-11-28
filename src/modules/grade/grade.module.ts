import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Grade } from './model/grade.schema';
import { GradeController } from './grade.controller';
import { GradeService } from './grade.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../user/jwt.strategy';

@Module({
  imports: [
    SequelizeModule.forFeature([Grade]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [GradeController],
  providers: [GradeService],
})
export class GradeModule {}
