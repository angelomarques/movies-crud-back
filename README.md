# 🧱 Projeto Filmes CRUD Back-End

Este é um projeto backend utilizando **NestJS** e **TypeORM**. Siga os passos abaixo para rodar o projeto localmente.

---

## ⚙️ Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (versão recomendada: 20+)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/) instalado
- Banco de dados compatível com TypeORM (Ex: PostgreSQL)

---

## 📁 1. Crie o arquivo `.env`

Crie um arquivo `.env` na raiz do projeto com as variáveis de ambiente abaixo:

```env
TYPEORM_URL=
JWT_SECRET=

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_REGION=
AWS_S3_BUCKET_NAME=

RESEND_API_KEY=
EMAIL_FROM_ADDRESS=
```

````

> Preencha os valores de acordo com suas credenciais e ambiente local.

---

## 📦 2. Instale as dependências

Com **npm**:

```bash
npm install
```

Ou com **yarn**:

```bash
yarn
```

---

## ▶️ 3. Rode o projeto

Com **npm**:

```bash
npm run start:dev
```

Ou com **yarn**:

```bash
yarn start:dev
```

---

## 🌐 4. Acesse a aplicação

A API estará disponível em:

```
http://localhost:3001
```

---

## 📝 Observações

- Certifique-se de que o banco de dados esteja disponível e acessível.
- O NestJS usará as configurações de conexão definidas na variável `TYPEORM_URL`.
- Se estiver utilizando serviços como AWS S3 ou Resend para envio de e-mails, as credenciais também devem estar corretamente configuradas.

---
````
