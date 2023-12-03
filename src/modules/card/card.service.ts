import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Card } from './model/card.schema';
import {CreateCardDTO, UpdateCardDTO} from './dto';
import { AuthGuard } from '../user/auth.guard';
import { Grade } from '../grade/model/grade.schema';
import {Op} from "sequelize";

@UseGuards(AuthGuard)
@Injectable()
export class CardService {
  constructor(
    @InjectModel(Card) private readonly cardRepository: typeof Card,
  ) {}

  async getCards(
      packId: number,
      userId: number,
      cardQuestion: string,
      page: number,
      pageCount: number,
      sortCards: string,
  ) {
    let { count, rows } = { count: null, rows: null };
    switch (sortCards) {
      case '0updated':
        if (cardQuestion != "")
          return { count, rows } = await this.cardRepository.findAndCountAll({
            include: [
              {
                model: Grade,
                required: true,
                right: true,
                where: { userId },
              },
            ],
            where: {
              packId: packId,
              question: { [Op.startsWith]: cardQuestion },
            },
            order: [['updatedAt', 'DESC']],
            limit: pageCount,
            offset: (page - 1) * pageCount,
          })
        else
          return { count, rows } = await this.cardRepository.findAndCountAll({
            include: [
              {
                model: Grade,
                required: true,
                right: true,
                where: { userId },
              },
            ],
            where: {
              packId: packId,
            },
            order: [['updatedAt', 'DESC']],
            limit: pageCount,
            offset: (page - 1) * pageCount,
          })
      case '1updated':
        if (cardQuestion != "")
          return { count, rows } = await this.cardRepository.findAndCountAll({
            include: [
              {
                model: Grade,
                required: true,
                right: true,
                where: { userId },
              },
            ],
            where: {
              packId: packId,
              question: { [Op.startsWith]: cardQuestion },
            },
            order: [['updatedAt', 'ASC']],
            limit: pageCount,
            offset: (page - 1) * pageCount,
          })
        else
          return { count, rows } = await this.cardRepository.findAndCountAll({
            include: [
              {
                model: Grade,
                required: true,
                right: true,
                where: { userId },
              },
            ],
            where: {
              packId: packId,
            },
            order: [['updatedAt', 'ASC']],
            limit: pageCount,
            offset: (page - 1) * pageCount,
          })
      default:
        throw new Error('Query param sort is wrong');
    }
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

  async updateCard(dto: UpdateCardDTO, cardId: number) {
    return await this.cardRepository.update(dto, { where: { id: cardId } });
  }

  async deleteCard(cardId: number) {
    return await this.cardRepository.destroy({ where: { id: cardId } });
  }

  async getAllCardsId() {
    return await this.cardRepository.findAll({ attributes: ['id'] });
  }
}
