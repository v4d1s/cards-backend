import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {CardService} from "./card.service";
import {CreateCardDTO} from "./dto";
import {AuthGuard} from "../user/auth.guard";
import {CardsPackService} from "../cards-pack/cards-pack.service";

@UseGuards(AuthGuard)
@Controller('pack/:packId/card')
export class CardController {
    constructor(
        private readonly cardService: CardService,
        private readonly cardsPackService: CardsPackService,
    ) {}

    @Get('')
    getCards(@Param('packId') packId: number) {
        return this.cardService.getCards(packId);
    }

    @Get(':cardId')
    getCard(@Param('cardId') cardId: number) {
        return this.cardService.getCard(cardId);
    }

    @Post('')
    async addCard(@Body() dto: CreateCardDTO) {
        const card = await this.cardService.addCard(dto)
        await this.cardsPackService.updateCardCount(true, card.packId);
        // TODO добавить grade всем пользователям с этим вопросом
    }

    @Patch(':cardId')
    updateCard(@Body() dto: CreateCardDTO, @Param('cardId') cardId: number) {
        return this.cardService.updateCard(dto, cardId);
    }

    @Delete(':cardId')
    async deleteCard(@Param('cardId') cardId: number, @Param('packId') packId: number) {
        await this.cardService.deleteCard(cardId);
        await this.cardsPackService.updateCardCount(false, packId);
        // TODO удалить все grade с этой карточкой
    }
}
