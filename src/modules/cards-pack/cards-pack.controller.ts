import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {CardsPackService} from "./cards-pack.service";
import {CreateCardsPackDTO} from "./dto";

@Controller('pack')
export class CardsPackController {
    constructor(private readonly cardsPackService: CardsPackService) {}

    @Get('')
    getCardsPacks() {
        return this.cardsPackService.getCardsPacks();
    }

    @Get(':packId')
    getCardPacks(@Param() params: any) {
        return this.cardsPackService.getCardsPack(params.packId);
    }

    @Post('')
    addCardsPack(@Body() dto: CreateCardsPackDTO) {
        return this.cardsPackService.addCardsPack(dto);
    }

    @Delete(':packId')
    deleteCardsPack(@Param() params: any) {
        return this.cardsPackService.deleteCardPack(params.packId);
    }

}
