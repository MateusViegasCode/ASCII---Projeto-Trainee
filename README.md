# CraftCode | ASCII - Projeto Trainee

## 📖 Sobre o Projeto

O CraftCode nasceu como um grande desafio do Projeto Trainee da ASCII. A nossa ideia central é construir uma plataforma moderna, robusta e intuitiva focada em cursos de programação. O objetivo desta jornada é conectar o conhecimento teórico com a prática real de mercado, criando não apenas uma interface agradável, mas uma arquitetura funcional de ponta a ponta.

O projeto evoluiu rapidamente de um conceito visual para uma aplicação *fullstack* completa. A implementacao recente garantiu que o backend agora grava usuarios em SQLite usando Prisma. As rotas `/cadastro`, `/login` e `/usuarios` usam Prisma para acessar o banco local, garantindo segurança (com encriptação de senhas) e eficiência no gerenciamento de dados.

## 🚀 Tecnologias Utilizadas

* **Frontend:** React, Vite
* **Backend:** Node.js, Express
* **Banco de Dados & ORM:** SQLite, Prisma
* **Segurança:** bcrypt

---

## ⚙️ Passo a passo para executar o projeto

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
