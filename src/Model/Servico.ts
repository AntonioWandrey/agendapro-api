// src/Model/Servico.ts

import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'servicos', // Nome da tabela no banco de dados
  timestamps: true      // Cria automaticamente os campos createdAt e updatedAt
})
export class Servico extends Model {

  @Column({
    type: DataType.STRING,
    allowNull: false // Campo obrigatório
  })
  nome!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true // Campo opcional
  })
  descricao?: string;

  @Column({
    type: DataType.DECIMAL(10, 2), // Preço com 2 casas decimais
    allowNull: false
  })
  preco!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  duracao_em_minutos!: number;
}
