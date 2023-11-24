import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {CardsPack} from "./model/cards-pack.schema";
import {CreateCardsPackDTO} from "./dto";

@Injectable()
export class CardsPackService {
    constructor(
        @InjectModel(CardsPack) private readonly cardsPackRepository: typeof CardsPack,
    ) {}
    getCardsPacks() {
        // TODO get_cardsPack service
    }

    getCardsPack(packId: number) {
        // TODO get_cardPack service
    }

    addCardsPack(dto: CreateCardsPackDTO) {
        // TODO add_cardsPack service
    }

    deleteCardPack(packId: number) {
        // TODO delete_cardPack service
    }
}
