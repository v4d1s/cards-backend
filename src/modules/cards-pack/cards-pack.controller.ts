import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CardsPackService } from './cards-pack.service';
import { CreateCardsPackDTO } from './dto';
import { AuthGuard } from '../user/auth.guard';
import {UserService} from "../user/user.service";

@UseGuards(AuthGuard)
@Controller('pack')
export class CardsPackController {
  constructor(
    private readonly cardsPackService: CardsPackService,
    private readonly userService: UserService,
  ) {}
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
  async deleteCardsPack(@Param('packId') packId: number, @Request() req: any) {
    const pack = await this.cardsPackService.getCardsPack(packId);
    await this.cardsPackService.deleteCardPack(packId);
    await this.userService.updateCardCount(false, req.user.id, pack.cardsCount);
  }
}
