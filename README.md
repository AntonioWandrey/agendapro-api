# AgendaPro API 🚀

API backend para o sistema de agendamento de serviços AgendaPro. Projetada para ser robusta, segura e escalável, lidando com a lógica de negócio de usuários, serviços e agendamentos.

## ✨ Features Principais

- 🔐 **Autenticação:** Sistema de Login e Cadastro de usuários com tokens JWT e senhas criptografadas com `bcrypt`.
- 👥 **Gestão de Funcionários (Usuários):** CRUD completo para gerenciar os profissionais e clientes.
- 🛠️ **Gestão de Serviços:** CRUD completo para gerenciar os serviços oferecidos.
- 🗓️ **Sistema de Agendamentos:**
  - Criação e listagem de agendamentos com relacionamentos (Serviço, Funcionário, Cliente).
  - Lógica inteligente de verificação de horários disponíveis baseada no expediente do funcionário e agendamentos existentes.
- ✔️ **Validação de Dados:** Validação de entrada robusta utilizando Zod e middlewares para garantir a integridade dos dados.

## 🛠️ Tecnologias Utilizadas

- **Runtime:** Node.js
- **Framework:** Express.js
- **Linguagem:** TypeScript
- **Banco de Dados:** PostgreSQL
- **ORM:** Sequelize com `sequelize-typescript`
- **Validação:** Zod
- **Autenticação:** JSON Web Tokens (JWT)

## 🚀 Como Rodar o Projeto Localmente

Instruções para configurar e rodar a API em uma nova máquina.

1.  **Pré-requisitos:**

    - Node.js (v18+)
    - PostgreSQL instalado e rodando.

2.  **Clonar o repositório:**

    ```bash
    git clone (https://github.com/AntonioWandrey/agendapro-api)
    cd agendapro-api
    ```

3.  **Instalar as dependências:**

    ```bash
    npm install
    ```

4.  **Configurar o Banco de Dados:**

    - Crie um banco de dados PostgreSQL local chamado `agendapro_dev`.
    - No arquivo `src/Db/conn.ts`, ajuste os dados de conexão (usuário, senha, porta) se forem diferentes do padrão para o seu ambiente.

5.  **Rodar a API em modo de desenvolvimento:**

    ```bash
    npm run dev
    ```

    A API irá iniciar e criar as tabelas no banco de dados automaticamente. Ela estará rodando em `http://localhost:6592`.

6.  **Popular o Banco de Dados:**
    - Com a API rodando, use uma ferramenta como o **Postman** para fazer requisições `POST` para os endpoints ` /user/newCommonUser` e `/servicos` para criar usuários e serviços de teste.

## 🗺️ Endpoints Principais da API

| Recurso          | Método   | Endpoint                        | Descrição                                   |
| ---------------- | -------- | ------------------------------- | ------------------------------------------- |
| **Usuários**     | `POST`   | `/user/newCommonUser`           | Cria um novo usuário (funcionário/cliente). |
|                  | `POST`   | `/user/login`                   | Autentica um usuário e retorna um token.    |
|                  | `GET`    | `/user/`                        | Lista todos os usuários.                    |
|                  | `PUT`    | `/user/:id`                     | Atualiza um usuário existente.              |
|                  | `DELETE` | `/user/:id`                     | Deleta um usuário.                          |
| **Serviços**     | `POST`   | `/servicos`                     | Cria um novo serviço.                       |
|                  | `GET`    | `/servicos`                     | Lista todos os serviços.                    |
|                  | `PUT`    | `/servicos/:id`                 | Atualiza um serviço existente.              |
|                  | `DELETE` | `/servicos/:id`                 | Deleta um serviço.                          |
| **Agendamentos** | `POST`   | `/agendamentos`                 | Cria um novo agendamento.                   |
|                  | `GET`    | `/agendamentos`                 | Lista todos os agendamentos.                |
|                  | `POST`   | `/agendamentos/disponibilidade` | Verifica horários disponíveis.              |
