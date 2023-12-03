import { Column, Default, HasMany, Model, Table } from 'sequelize-typescript';
import { CardsPack } from '../../cards-pack/model/cards-pack.schema';
import { Card } from '../../card/model/card.schema';

@Table
export class User extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @Column
  email: string;
  @Column
  password: string;
  @Column
  name: string;
  @Default(0)
  @Column
  cardsCount: number;
  @HasMany(() => CardsPack, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  cardsPacksList: CardsPack[];
  @HasMany(() => Card, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  cardsList: Card[];
}
