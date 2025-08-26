// src/Db/conn.ts - VERSÃO ATUALIZADA

import { Sequelize } from "sequelize-typescript";
import { User } from "../Model/User";
import LoginLog from "../Model/LoginLog";
import { Servico } from "../Model/Servico";
import { Agendamento } from "../Model/Agendamento";

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'silpi',
    password: '',
    database: 'agendapro_dev',
    models: [
      User,
      LoginLog,
      Servico,
      Agendamento
    ],
    logging: false,
});

export default sequelize;
