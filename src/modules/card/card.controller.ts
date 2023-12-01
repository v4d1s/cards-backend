import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDTO } from './dto';
import { AuthGuard } from '../user/auth.guard';
import { CardsPackService } from '../cards-pack/cards-pack.service';
import { GradeService } from '../grade/grade.service';
import { UserService } from '../user/user.service';

@UseGuards(AuthGuard)
@Controller('pack/:packId/card')
export class CardController {
  constructor(
    private readonly cardService: CardService,
    private readonly cardsPackService: CardsPackService,
    private readonly gradeService: GradeService,
    private readonly userService: UserService,
  ) {}

  @Get('')
  getCards(@Param('packId') packId: number, @Request() req: any) {
    return this.cardService.getCards(packId, req.user.id);
  }

  @Get(':cardId')
  getCard(@Param('cardId') cardId: number, @Request() req: any) {
    return this.cardService.getCard(cardId, req.user.id);
  }

  @Post('')
  async addCard(@Body() dto: CreateCardDTO, @Request() req: any) {
    const card = await this.cardService.addCard(dto);
    await this.cardsPackService.updateCardCount(true, card.packId);
    await this.userService.updateCardCount(true, req.user.id, 1);
    const userList = await this.userService.getAllUsersId();
    await this.gradeService.createGradesForNewCard(userList, card.id);
  }

  @Patch(':cardId')
  updateCard(@Body() dto: CreateCardDTO, @Param('cardId') cardId: number) {
    return this.cardService.updateCard(dto, cardId);
  }

  @Delete(':cardId')
  async deleteCard(
    @Param('cardId') cardId: number,
    @Param('packId') packId: number,
    @Request() req: any,
  ) {
    await this.cardService.deleteCard(cardId);
    await this.cardsPackService.updateCardCount(false, packId);
    await this.userService.updateCardCount(false, req.user.id, 1);
  }
}
