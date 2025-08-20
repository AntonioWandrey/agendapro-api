// App.ts
import express, { Application, urlencoded } from "express";
import http, { Server } from "http";
import cors from "cors";
import UserRouter from "./Router/UserRouter";
import sequelize from "./db/conn";
import ServicoRouter from "./Router/ServicoRouter";
import AgendamentoRouter from "./Router/AgendamentoRouter";


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
    this.app.use("/agendamentos", AgendamentoRouter);
  }


  public async ListenPort() {
    try {
      console.log("Conectando ao banco...");
      await sequelize.sync({ alter: true });
      this.app.listen(6592, () => {
        console.log("Conectou ao banco de dados");
        console.log("Servidor funcionando na porta 5432");
      });
    } catch (e) {
      console.log(e);
    }
  }
}
