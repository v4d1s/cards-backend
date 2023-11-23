import {Column, HasMany, Model, Table} from 'sequelize-typescript';
import {CardsPack} from "../../cards-pack/model/cards-pack.schema";

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
    @Column
    isAdmin: boolean;
    @Column
    cardsCount: number;
    @HasMany(() => CardsPack, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    cardsPacksList: CardsPack[];
}