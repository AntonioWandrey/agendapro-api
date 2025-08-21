import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, BeforeUpdate } from 'sequelize-typescript';
import bcrypt from 'bcrypt';

@Table({
  tableName: 'Users',
  timestamps: true
})
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  User_id?: number;

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

  @Column({ type: DataType.STRING, allowNull: true })
  cargo?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  nivel?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  salario?: string;

  @Column({ type: DataType.INTEGER, allowNull: true })
  comissao?: number;

  @Column({ type: DataType.STRING, defaultValue: 'Ativo' })
  status!: string;

  @CreatedAt
  @Column({ type: DataType.DATE })
  createdAt?: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  updatedAt?: Date;

  // --- "GANCHO" PARA CRIPTOGRAFAR SENHA ANTES DE ATUALIZAR ---
  @BeforeUpdate
  static async hashPasswordOnUpdate(instance: User) {
    if (instance.changed('senha')) {
      const salt = await bcrypt.genSalt(10);
      instance.senha = await bcrypt.hash(instance.senha, salt);
    }
  }
}
