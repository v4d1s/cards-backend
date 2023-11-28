import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Card } from './model/card.schema';
import { CreateCardDTO } from './dto';
import { AuthGuard } from '../user/auth.guard';
import { Grade } from '../grade/model/grade.schema';

@UseGuards(AuthGuard)
@Injectable()
export class CardService {
  constructor(
    @InjectModel(Card) private readonly cardRepository: typeof Card,
  ) {}

  async getCards(packId: number, userId: number) {
    return await this.cardRepository.findAll({
      include: [
        {
          model: Grade,
          required: true,
          right: true,
          where: { userId },
        },
      ],
      where: { packId: packId },
    });
  }

  async getCard(cardId: number, userId: number) {
    return await this.cardRepository.findOne({
      include: [
        {
          model: Grade,
          required: true,
          right: true,
          where: { userId },
        },
      ],
      where: { id: cardId },
    });
  }

  async addCard(dto: CreateCardDTO) {
    const newCard = {
      packId: dto.packId,
      question: dto.question,
      answer: dto.answer,
    };
    return await this.cardRepository.create(newCard);
  }

  async updateCard(dto: CreateCardDTO, cardId: number) {
    return await this.cardRepository.update(
      { answer: dto.answer, question: dto.question },
      { where: { id: cardId } },
    );
  }

  async deleteCard(cardId: number) {
    return await this.cardRepository.destroy({ where: { id: cardId } });
  }

  async getAllCardsId() {
    return await this.cardRepository.findAll({ attributes: ['id'] });
  }
}
