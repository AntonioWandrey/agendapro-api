import { Model, Column, DataType, Table, CreatedAt, UpdatedAt } from "sequelize-typescript";

@Table
export default class Role extends Model<Role> {

    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    Role_id!: number;

    @Column({
        type: DataType.STRING
    })
    Descricao!: string;

    @Column({
        type: DataType.INTEGER
    })
    AdminUserWhoHasCreated!: number;

    @CreatedAt
    @Column({
        type: DataType.DATE,
    })
    createdAt!: Date;

    @UpdatedAt
    @Column({
        type: DataType.DATE,
    })
    updatedAt!: Date;
}
