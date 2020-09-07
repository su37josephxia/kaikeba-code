import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({modelName: 'users'})
export default class User extends Model<User> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER,
    })
    public id: number;

    @Column(DataType.CHAR)
    public name: string;
}