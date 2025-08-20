import { Model, Column, DataType, Table, CreatedAt, UpdatedAt } from "sequelize-typescript";

@Table
export default class LoginLog extends Model<LoginLog> {
    
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    LoginLog_id!: number;

    @Column({
        type: DataType.STRING,
    })
    IdUsuario!: string;

    @Column({
        type: DataType.DATE
    })
    DataHoraLogin!:Date;

    @Column({
        type:DataType.STRING
    })
    Token!:String;

    @Column({
        type: DataType.DATE
    })
    DataHoraLogout!:Date;
    

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
