import {Column, ForeignKey, HasMany, Model, Table} from 'sequelize-typescript';
import {Grade} from "../../grade/model/grade.schema";
import {CardsPack} from "../../cards-pack/model/cards-pack.schema";

@Table
export class Card extends Model {
    @Column({
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;
    @ForeignKey(() => CardsPack)
    packId: number;
    @Column
    question: string;
    @Column
    answer: string;
    @HasMany(() => Grade, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    gradesList: Grade[];
}