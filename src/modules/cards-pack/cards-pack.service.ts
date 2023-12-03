import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CardsPack } from './model/cards-pack.schema';
import { CreateCardsPackDTO } from './dto';
import { Op } from "sequelize";
import {User} from "../user/model/user.schema";

@Injectable()
export class CardsPackService {
  constructor(
    @InjectModel(CardsPack)
    private readonly cardsPackRepository: typeof CardsPack,
  ) {}
  // async getCardsPacks() {
  //   return await this.cardsPackRepository.findAll();
  // }

  async getCardsPacks(
    userId: number,
    page: number,
    pageCount: number,
    sort: string,
    min: number,
    max: number,
    totalCount: number,
    packName: string,
  ) {
    let { count, rows } = { count: null, rows: null };
    switch (sort) {
      case '0updated':
        if (packName != "")
          return { count, rows } =  await this.cardsPackRepository.findAndCountAll({
            include: [
              {
                model: User,
                required: true,
                right: true,
                attributes: ['name'],
              },
            ],
            where: {
              [Op.or]: [{ isPrivate: false }, { isPrivate: true, userId: userId }],
              name: { [Op.startsWith]: packName },
              cardsCount: { [Op.between]: [min, max] },
            },
            order: [['updatedAt', 'DESC']],
            limit: pageCount,
            offset: (page - 1) * pageCount,
          })
        else
          return { count, rows } =  await this.cardsPackRepository.findAndCountAll({
            include: [
              {
                model: User,
                required: true,
                right: true,
                attributes: ['name'],
              },
            ],
            where: {
              [Op.or]: [{ isPrivate: false }, { isPrivate: true, userId: userId }],
              cardsCount: { [Op.between]: [min, max] },
            },
            order: [['updatedAt', 'DESC']],
            limit: pageCount,
            offset: (page - 1) * pageCount,
          })
      case '1updated':
        if (packName != "")
          return { count, rows } =  await this.cardsPackRepository.findAndCountAll({
            include: [
              {
                model: User,
                required: true,
                right: true,
                attributes: ['name'],
              },
            ],
            where: {
              [Op.or]: [{ isPrivate: false }, { isPrivate: true, userId: userId }],
              name: { [Op.startsWith]: packName },
              cardsCount: { [Op.between]: [min, max] },
            },
            order: [['updatedAt', 'ASC']],
            limit: pageCount,
            offset: (page - 1) * pageCount,
          })
        else
          return { count, rows } =  await this.cardsPackRepository.findAndCountAll({
            include: [
              {
                model: User,
                required: true,
                right: true,
                attributes: ['name'],
              },
            ],
            where: {
              [Op.or]: [{ isPrivate: false }, { isPrivate: true, userId: userId }],
              cardsCount: { [Op.between]: [min, max] },
            },
            order: [['updatedAt', 'ASC']],
            limit: pageCount,
            offset: (page - 1) * pageCount,
          })
      case '0cardsCount':
        if (packName != "")
          return { count, rows } =  await this.cardsPackRepository.findAndCountAll({
            include: [
              {
                model: User,
                required: true,
                right: true,
                attributes: ['name'],
              },
            ],
            where: {
              [Op.or]: [{ isPrivate: false }, { isPrivate: true, userId: userId }],
              name: { [Op.startsWith]: packName },
              cardsCount: { [Op.between]: [min, max] },
            },
            order: [['cardsCount', 'DESC']],
            limit: pageCount,
            offset: (page - 1) * pageCount,
          })
        else
          return { count, rows } =  await this.cardsPackRepository.findAndCountAll({
            include: [
              {
                model: User,
                required: true,
                right: true,
                attributes: ['name'],
              },
            ],
            where: {
              [Op.or]: [{ isPrivate: false }, { isPrivate: true, userId: userId }],
              cardsCount: { [Op.between]: [min, max] },
            },
            order: [['cardsCount', 'DESC']],
            limit: pageCount,
            offset: (page - 1) * pageCount,
          })
      case '1cardsCount':
        if (packName != "")
          return { count, rows } =  await this.cardsPackRepository.findAndCountAll({
            include: [
              {
                model: User,
                required: true,
                right: true,
                attributes: ['name'],
              },
            ],
            where: {
              [Op.or]: [{ isPrivate: false }, { isPrivate: true, userId: userId }],
              name: { [Op.startsWith]: packName },
              cardsCount: { [Op.between]: [min, max] },
            },
            order: [['cardsCount', 'ASC']],
            limit: pageCount,
            offset: (page - 1) * pageCount,
          })
        else
          return { count, rows } =  await this.cardsPackRepository.findAndCountAll({
            include: [
              {
                model: User,
                required: true,
                right: true,
                attributes: ['name'],
              },
            ],
            where: {
              [Op.or]: [{ isPrivate: false }, { isPrivate: true, userId: userId }],
              cardsCount: { [Op.between]: [min, max] },
            },
            order: [['cardsCount', 'ASC']],
            limit: pageCount,
            offset: (page - 1) * pageCount,
          })
      default:
        throw new Error('Query param sortPacks is wrong');
    }
  }

  async getCardsPacksFromUser(
      userId: number,
      page: number,
      pageCount: number,
      sort: string,
      min: number,
      max: number,
      totalCount: number,
      packName: string
  ) {
    let { count, rows } = { count: null, rows: null };
    switch (sort) {
      case '0updated':
        if (packName != "")
          return { count, rows } = await this.cardsPackRepository.findAndCountAll({
            include: [
              {
                model: User,
                required: true,
                right: true,
                attributes: ['name'],
              },
            ],
            where: {
              userId: userId,
              name: { [Op.startsWith]: packName },
              cardsCount: { [Op.between]: [min, max] },
            },
            order: [['updatedAt', 'DESC']],
            limit: pageCount,
            offset: (page - 1) * pageCount,
          })
        else
          return { count, rows } = await this.cardsPackRepository.findAndCountAll({
            include: [
              {
                model: User,
                required: true,
                right: true,
                attributes: ['name'],
              },
            ],
            where: {
              userId: userId,
              cardsCount: { [Op.between]: [min, max] },
            },
            order: [['updatedAt', 'DESC']],
            limit: pageCount,
            offset: (page - 1) * pageCount,
          })
      case '1updated':
        if (packName != "")
          return { count, rows } = await this.cardsPackRepository.findAndCountAll({
            include: [
              {
                model: User,
                required: true,
                right: true,
                attributes: ['name'],
              },
            ],
            where: {
              userId: userId,
              name: { [Op.startsWith]: packName },
              cardsCount: { [Op.between]: [min, max] },
            },
            order: [['updatedAt', 'ASC']],
            limit: pageCount,
            offset: (page - 1) * pageCount,
          })
        else
          return { count, rows } =  await this.cardsPackRepository.findAndCountAll({
            include: [
              {
                model: User,
                required: true,
                right: true,
                attributes: ['name'],
              },
            ],
            where: {
              userId: userId,
              cardsCount: { [Op.between]: [min, max] },
            },
            order: [['updatedAt', 'ASC']],
            limit: pageCount,
            offset: (page - 1) * pageCount,
          })
      case '0cardsCount':
        if (packName != "")
          return { count, rows } =  await this.cardsPackRepository.findAndCountAll({
            include: [
              {
                model: User,
                required: true,
                right: true,
                attributes: ['name'],
              },
            ],
            where: {
              userId: userId,
              name: { [Op.startsWith]: packName },
              cardsCount: { [Op.between]: [min, max] },
            },
            order: [['cardsCount', 'DESC']],
            limit: pageCount,
            offset: (page - 1) * pageCount,
          })
        else
          return { count, rows } =  await this.cardsPackRepository.findAndCountAll({
            include: [
              {
                model: User,
                required: true,
                right: true,
                attributes: ['name'],
              },
            ],
            where: {
              userId: userId,
              cardsCount: { [Op.between]: [min, max] },
            },
            order: [['cardsCount', 'DESC']],
            limit: pageCount,
            offset: (page - 1) * pageCount,
          })
      case '1cardsCount':
        if (packName != "")
          return { count, rows } =  await this.cardsPackRepository.findAndCountAll({
            include: [
              {
                model: User,
                required: true,
                right: true,
                attributes: ['name'],
              },
            ],
            where: {
              userId: userId,
              name: { [Op.startsWith]: packName },
              cardsCount: { [Op.between]: [min, max] },
            },
            order: [['cardsCount', 'ASC']],
            limit: pageCount,
            offset: (page - 1) * pageCount,
          })
        else
          return { count, rows } =  await this.cardsPackRepository.findAndCountAll({
            include: [
              {
                model: User,
                required: true,
                right: true,
                attributes: ['name'],
              },
            ],
            where: {
              userId: userId,
              cardsCount: { [Op.between]: [min, max] },
            },
            order: [['cardsCount', 'ASC']],
            limit: pageCount,
            offset: (page - 1) * pageCount,
          })
      default:
        throw new Error('Query param sortPacks is wrong');
    }
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
    return await this.cardsPackRepository.destroy({ where: { id: packId } });
  }

  async updateCardCount(isPlus: boolean, packId: number) {
    const card = await this.cardsPackRepository.findOne({
      where: { id: packId },
    });
    if (!card) throw new Error('Pack not found');
    let newCount = card.cardsCount;
    if (isPlus) newCount++;
    else newCount--;
    return await this.cardsPackRepository.update(
      { cardsCount: newCount },
      { where: { id: packId } },
    );
  }
}
