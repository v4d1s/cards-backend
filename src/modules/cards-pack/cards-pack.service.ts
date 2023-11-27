import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {CardsPack} from "./model/cards-pack.schema";
import {CreateCardsPackDTO} from "./dto";

@Injectable()
export class CardsPackService {
    constructor(
        @InjectModel(CardsPack) private readonly cardsPackRepository: typeof CardsPack,
    ) {}
    async getCardsPacks() {
        return await this.cardsPackRepository.findAll();
    }

    async getCardsPack(packId: number) {
        return await this.cardsPackRepository.findOne({ where: { id: packId } });
    }

    async addCardsPack(dto: CreateCardsPackDTO) {
        const newPack = {
            name: dto.name,
            userId: dto.userId,
            isPrivate: dto.isPrivate,
        };
        await this.cardsPackRepository.create(newPack);
        return dto;
    }

    async deleteCardPack(packId: number) {
        return await this.cardsPackRepository.destroy({where: {id: packId}})
    }

    async updateCardCount(isPlus: boolean, packId: number) {
        const card = await this.cardsPackRepository.findOne({where: {id: packId}});
        if (!card) throw new Error('Pack not found');
        let newCount = card.cardsCount;
        if (isPlus)
            newCount++;
        else
            newCount--;
        return await this.cardsPackRepository.update({cardsCount: newCount}, {where: {id: packId}});
    }
}
