import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

 @Table
 export class User extends Model<User> {
   @Column({
     type: DataType.INTEGER,
     autoIncrement: true,
     primaryKey: true,
   })
   User_id!: number;

   @Column({
     type: DataType.STRING,
     allowNull: false,
   })
   nome!: string;

   @Column({
     type: DataType.STRING,
     allowNull: false,
   })
   sobreNome!: string;

   @Column({
     type: DataType.STRING,
     allowNull: false,
     unique: true,
   })
   cpf!: string;

   @Column({
     type: DataType.STRING,
     allowNull: false,
     unique: true,
   })
   rg!: string;

   @Column({
     type: DataType.STRING,
     allowNull: false,
   })
   departamento!: string;

   @Column({
     type: DataType.STRING,
     allowNull: false,
     unique: true,
   })
   email!: string;

   @Column({
     type: DataType.INTEGER,
   })
   cargoId!: number;

   @Column({
     type: DataType.STRING,
     allowNull: false,
   })
   numeroDeTelefone!: string;

   @Column({
     type: DataType.STRING,
     allowNull: false,
   })
   senha!: string;

   @Column({
     type: DataType.INTEGER
   })
   empresaId!:number;

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
