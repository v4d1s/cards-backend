import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  Query,
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
  // @Get('')
  // getCardsPacks() {
  //   return this.cardsPackService.getCardsPacks();
  // }
  @Get('')
  async getCardsPacks(
      @Query('user_id') userId: number,
      @Query('page') page: number,
      @Query('pageCount') pageCount: number,
      @Query('sortPacks') sort: string,
      @Query('min') min: number,
      @Query('max') max: number,
      @Query('cardPacksTotalCount') totalCount: number,
      @Query('packName') packName: string,
      @Request() req: any,
  ) {
    if (userId != null || userId != undefined) {
      const { count, rows } = await this.cardsPackService.getCardsPacksFromUser(userId, page, pageCount, sort, min, max, totalCount, packName);
      return {
        cardPacks: rows,
        cardPacksTotalCount: count,
      };
    }
    else {
      const { count, rows } = await this.cardsPackService.getCardsPacks(req.user.id, page, pageCount, sort, min, max, totalCount, packName);
      return {
        cardPacks: rows,
        cardPacksTotalCount: count,
      };
    }
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
