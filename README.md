# ASCII---Projeto-Trainee


## Implementacao recente

O backend agora grava usuarios em SQLite usando Prisma. As rotas /cadastro, /login e /usuarios usam Prisma para acessar o banco local.

## Passo a passo para executar o projeto

1) Instale as dependencias do projeto:

```bash
npm install
```

2) Inicie o banco SQLite e gere o client do Prisma:

```bash
npx prisma db push
```

Isso cria o arquivo prisma/dev.db com as tabelas.
A conexao fica definida em .env, usando DATABASE_URL.

3) Inicie o backend em um terminal:

```bash
node server.js
```

O servidor sobe em http://localhost:3000

4) Inicie o frontend em outro terminal:

```bash
npm run dev
```

O Vite sobe em http://localhost:5173
