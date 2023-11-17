import { Module } from '@nestjs/common';
import { CardsPackService } from './cards-pack.service';

@Module({
  providers: [CardsPackService]
})
export class CardsPackModule {}
