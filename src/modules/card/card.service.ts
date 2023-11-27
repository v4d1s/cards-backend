import {Injectable, UseGuards} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Card} from "./model/card.schema";
import {CreateCardDTO} from "./dto";
import {AuthGuard} from "../user/auth.guard";

@UseGuards(AuthGuard)
@Injectable()
export class CardService {
    constructor(
        @InjectModel(Card) private readonly cardRepository: typeof Card,
    ) {}

    async getCards(packId: number) {
        return await this.cardRepository.findAll({ where: { packId: packId } })
        // TODO Для каждой карточки также добавляем поля ГРАДЕ (левое присоединением)
    }

    async getCard(cardId: number) {
        return await this.cardRepository.findOne({ where: { id: cardId } })
        // TODO Для каждой карточки также добавляем поля ГРАДЕ (левое присоединением)
    }

    async addCard(dto: CreateCardDTO) {
        console.log(dto);
        const newCard = {
            packId: dto.packId,
            question: dto.question,
            answer: dto.answer,
        };
        return await this.cardRepository.create(newCard);
    }

    async updateCard(dto: CreateCardDTO, cardId: number) {
        return await this.cardRepository.update(
            {answer: dto.answer, question: dto.question},
            {where: { id: cardId }}
        )
    }

    async deleteCard(cardId: number) {
        return await this.cardRepository.destroy({where: {id: cardId}})
    }
}
