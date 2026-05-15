import express from 'express';  // pra criar o servidor
import cors from 'cors';        // para permitir que o site converse com ele
import { PrismaClient } from '@prisma/client'; // cliente do Prisma para acessar o SQLite
import bcrypt from 'bcrypt';    // ferramenta de segurança

const app = express();
app.use(cors());
app.use(express.json());

// Instancia do cliente do Prisma para todo o servidor
const prisma = new PrismaClient();

app.post('/cadastro', async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ erro: "Preenche todos os campos obrigatórios!" });
    }

    try {
        // Verifica se o email ja existe no banco para evitar duplicidade
        const usuarioExistente = await prisma.user.findUnique({
            where: { email: email }
        });

        if (usuarioExistente) {
            return res.status(400).json({ erro: "Este e-mail já está registado no CraftCode." });
        }

        // Gera o hash da senha para nao salvar texto simples
        const senhaEncriptada = await bcrypt.hash(senha, 10);

        // Registra o usuario com a senha protegida
        const novoUsuario = await prisma.user.create({
            data: {
                nome: nome,
                email: email,
                senha: senhaEncriptada
            }
        });

        // Retorna apenas dados basicos do usuario, sem senha
        return res.status(201).json({ 
            mensagem: "Usuário registado com sucesso!", 
            usuario: {
                id: novoUsuario.id,
                nome: novoUsuario.nome,
                email: novoUsuario.email
            }
        });

    } catch (erro) {
        // Registra o erro
        console.error("Erro no cadastro:", erro);
        return res.status(500).json({ erro: "Erro interno ao processar o registo." });
    }
});

app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ erro: "Por favor, preencha e-mail e senha!" });
    }

    try {
        // Busca o usuario pelo email informado
        const usuarioEncontrado = await prisma.user.findUnique({
            where: { email: email }
        });

        if (!usuarioEncontrado) {
            return res.status(400).json({ erro: "E-mail ou senha incorretos." });
        }

        // Compara a senha enviada com o hash salvo no banco
        const senhaValida = await bcrypt.compare(senha, usuarioEncontrado.senha);

        if (!senhaValida) {
            return res.status(400).json({ erro: "E-mail ou senha incorretos." });
        }

        // Retorna apenas dados basicos do usuario, sem senha
        return res.status(200).json({
            mensagem: `Bem-vindo de volta, ${usuarioEncontrado.nome}!`,
            usuario: {
                id: usuarioEncontrado.id,
                nome: usuarioEncontrado.nome,
                email: usuarioEncontrado.email
            }
        });

    } catch (erro) {
        // Registra o erro
        console.error("Erro no login:", erro);
        return res.status(500).json({ erro: "Erro interno ao processar o login." });
    }
});

// Rota extra para ver o resultado: http://localhost:3000/usuarios
app.get('/usuarios', async (req, res) => {
    try {
        // Lista os usuarios sem expor as senhas
        const usuarios = await prisma.user.findMany({
            select: {
                id: true,
                nome: true,
                email: true,
                createdAt: true
            }
        });

        return res.json(usuarios);
    } catch (erro) {
        // Registra o erro
        console.error("Erro ao listar usuarios:", erro);
        return res.status(500).json({ erro: "Erro interno ao carregar usuarios." });
    }
});

app.listen(3000, () => {
    console.log('Servidor Back-end a correr na porta 3000!');
});
