import {
  HasMany,
  Column,
  Model,
  Table,
  ForeignKey,
  Default,
  BelongsTo,
} from 'sequelize-typescript';
import { Card } from '../../card/model/card.schema';
import { User } from '../../user/model/user.schema';

@Table
export class CardsPack extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @Column
  name: string;

  @ForeignKey(() => User)
  userId: number;
  @BelongsTo(() => User, 'userId')
  declare user: User;

  @Default(false)
  @Column
  isPrivate: boolean;
  @Default(0)
  @Column
  cardsCount: number;
  @HasMany(() => Card, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  cardsList: Card[];
}
