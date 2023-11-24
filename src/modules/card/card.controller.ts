import {Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {CardService} from "./card.service";
import {CreateCardDTO} from "./dto";

// @ts-ignore
@Controller('pack/:packId')
export class CardController {
    constructor(private readonly cardService: CardService) {}

    @Get('')
    getCards(@Param() params: any) {
        return this.cardService.getCards(params.packId);
    }

    @Post('')
    addCard(dto: CreateCardDTO) {
        return this.cardService.addCard(dto);
    }

    @Patch(':cardId')
    updateCard(dto: CreateCardDTO, @Param() params: any) {
        return this.cardService.updateCard(dto, params.cardId);
    }

    @Delete(':cardId')
    deleteCard(@Param() params: any) {
        return this.cardService.deleteCard(params.cardId)
    }
}
