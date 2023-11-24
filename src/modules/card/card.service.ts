import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Card} from "./model/card.schema";
import {CreateCardDTO} from "./dto";

@Injectable()
export class CardService {
    constructor(
        @InjectModel(Card) private readonly cardRepository: typeof Card,
    ) {}

    getCards(packId: number) {
        // TODO get_cards service
        // Для каждой карточки также добавляем поля ГРАДЕ (левое присоединением)
    }

    addCard(dto: CreateCardDTO) {
        // TODO add_card service
    }

    updateCard(dto: CreateCardDTO, cardId: number) {
        // TODO update_card service
    }

    deleteCard(cardId: number) {
        // TODO delete_card service
    }
}
