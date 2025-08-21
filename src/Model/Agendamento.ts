// src/Model/Agendamento.ts

import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './User';
import { Servico } from './Servico';

@Table({
  tableName: 'agendamentos',
  timestamps: true,
})
export class Agendamento extends Model {

  @Column({
    type: DataType.DATEONLY, // Armazena apenas a data: "2025-08-20"
    allowNull: false,
  })
  data!: string;

  @Column({
    type: DataType.TIME, // Armazena apenas a hora: "14:30:00"
    allowNull: false,
  })
  hora_inicio!: string;

  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  hora_fim!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'Marcado', // Valores podem ser: Marcado, Concluído, Cancelado, etc.
  })
  status!: string;

  // --- Relacionamento com a tabela 'servicos' ---
  @ForeignKey(() => Servico)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  servicoId!: number;

  @BelongsTo(() => Servico)
  servico!: Servico;

  // --- Relacionamento com a tabela 'Users' (para o funcionário) ---
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  funcionarioId!: number;

  @BelongsTo(() => User, 'funcionarioId')
  funcionario!: User;

  // --- Relacionamento com a tabela 'Users' (para o cliente) ---
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  clienteId!: number;

  @BelongsTo(() => User, 'clienteId')
  cliente!: User;
}
