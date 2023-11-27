import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import {CardModule} from "../card/card.module";
import {CardsPackModule} from "../cards-pack/cards-pack.module";
import {GradeModule} from "../grade/grade.module";
import configurations from "../../configurations";
import { SequelizeModule } from '@nestjs/sequelize';
import {User} from "../user/model/user.schema";
import {Card} from "../card/model/card.schema";
import {CardsPack} from "../cards-pack/model/cards-pack.schema";
import {Grade} from "../grade/model/grade.schema";

@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        load: [configurations],
      }),
      SequelizeModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
              dialect: 'postgres',
              host: configService.get('db_host'),
              port: configService.get('db_port'),
              database: configService.get('db_name'),
              username: configService.get('db_user'),
              password: configService.get('db_password'),
              synchronize: true,
              autoLoadModels: true,
              models: [User, Card, CardsPack, Grade],
          }),
      }),
      UserModule,
      CardsPackModule,
      CardModule,
      GradeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
