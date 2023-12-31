import {
  Column,
  Default,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Card } from '../../card/model/card.schema';

@Table
export class Grade extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @ForeignKey(() => Card)
  cardId: number;
  @Column
  userId: number;
  @Default(0)
  @Column
  grade: number;
  @Default(0)
  @Column
  shots: number;
}
