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
    type: DataType.DATEONLY, // Armazena apenas a data (YYYY-MM-DD)
    allowNull: false,
  })
  data!: string;

  @Column({
    type: DataType.TIME, // Armazena apenas a hora (HH:MM:SS)
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
    defaultValue: 'Marcado', // Ex: Marcado, Concluído, Cancelado
  })
  status!: string;

  // --- RELACIONAMENTOS (CHAVES ESTRANGEIRAS) ---

  @ForeignKey(() => Servico)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  servicoId!: number;

  @BelongsTo(() => Servico)
  servico!: Servico;


  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  funcionarioId!: number;

  // Criamos um "apelido" para a associação, para não confundir com o cliente
  @BelongsTo(() => User, 'funcionarioId')
  funcionario!: User;


  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  clienteId!: number;

  @BelongsTo(() => User, 'clienteId')
  cliente!: User;
}
