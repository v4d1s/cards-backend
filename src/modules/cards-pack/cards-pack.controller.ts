import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CardsPackService } from './cards-pack.service';
import { CreateCardsPackDTO } from './dto';
import { AuthGuard } from '../user/auth.guard';

@UseGuards(AuthGuard)
@Controller('pack')
export class CardsPackController {
  constructor(private readonly cardsPackService: CardsPackService) {}
  @Get('')
  getCardsPacks() {
    return this.cardsPackService.getCardsPacks();
  }

  @Get(':packId')
  getCardPacks(@Param('packId') packId: number) {
    return this.cardsPackService.getCardsPack(packId);
  }

  @Post('')
  addCardsPack(@Body() dto: CreateCardsPackDTO) {
    return this.cardsPackService.addCardsPack(dto);
  }

  @Delete(':packId')
  deleteCardsPack(@Param('packId') packId: number) {
    return this.cardsPackService.deleteCardPack(packId);
  }
}
