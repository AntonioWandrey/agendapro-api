// App.ts - Configuração do servidor Express

import express, { Application, urlencoded } from "express"; // Importando express e urlencoded
import http, { Server } from "http"; // Importando http e Server
import cors from "cors"; // Importando cors
// Importando a conexão com o banco de dados
import sequelize from "./Db/conn";

// Nossos Routers
import UserRouter from "./Router/UserRouter"; // Importando UserRouter
import ServicoRouter from "./Router/ServicoRouter"; // Importando ServicoRouter
import AgendamentoRouter from "./Router/AgendamentoRouter"; // Importando AgendamentoRouter

export default class App {
  public app: Application;
  public http: Server;

  constructor() {
    this.app = express();
    this.http = http.createServer(this.app);
    this.middlewares();
    this.RouteMiddleWare();
  }

  public middlewares() {
    this.app.use(express.json());
    this.app.use(
      urlencoded({
        extended: true,
      })
    );
    this.app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: [
          "Content-Type",
          "Authorization",
          "X-Requested-With",
          "Accept",
        ],
      })
    );
  }

  public RouteMiddleWare() {
    this.app.use("/user", UserRouter);
    this.app.use("/servicos", ServicoRouter);
    this.app.use("/agendamentos", AgendamentoRouter); // <-- Linha que faltava
  }


  public async ListenPort() {
    try {
      console.log("Conectando ao banco...");
      await sequelize.sync({ alter: true });
      this.app.listen(6592, () => {
        // Log dinâmico que corrigimos
        console.log(`Conectou ao banco de dados: ${sequelize.getDatabaseName()}`);
        console.log("Servidor funcionando na porta 6592");
      });
    } catch (e) {
      console.log(e);
    }
  }
}
