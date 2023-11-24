import {Column, Default, ForeignKey, Model, Table} from 'sequelize-typescript';
import {Card} from "../../card/model/card.schema";

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
    @Column
    @Default(0)
    grade: number;
    @Column
    @Default(0)
    shots: number;
}