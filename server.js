import express from 'express';  // pra criar o servidor
import cors from 'cors';        // para permitir que o site converse com ele
import bcrypt from 'bcrypt';    // ferramenta de segurança

const app = express();
app.use(cors());
app.use(express.json());

const bancoDeUsuarios = []; // banco de dados temporário

// 'async': o processo de criptografar a senha demora uns milissegundos, e o servidor tem que esperar
app.post('/cadastro', async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ erro: "Preenche todos os campos obrigatórios!" });
    }

    const emailJaExiste = bancoDeUsuarios.find(usuario => usuario.email === email);
    
    if (emailJaExiste) {
        return res.status(400).json({ erro: "Este e-mail já está registado no CraftCode." });
    }

    try {
        // O número '10' é o "Salt" (nível de complexidade da mistura). 10 é o padrão de segurança da indústria.
        const senhaEncriptada = await bcrypt.hash(senha, 10);

        const novoUsuario = {
            id: Date.now(),
            nome: nome,
            email: email,
            senha: senhaEncriptada // guarda a senha já criptografada
        };

        bancoDeUsuarios.push(novoUsuario);

        return res.status(201).json({ 
            mensagem: "Usuário registado com sucesso!", 
            usuario: novoUsuario 
        });

    } catch (erro) {
        // Se algo correr mal na encriptação, manda um aviso
        return res.status(500).json({ erro: "Erro interno ao processar o registo." });
    }
});

app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ erro: "Por favor, preencha e-mail e senha!" });
    }

    const usuarioEncontrado = bancoDeUsuarios.find(u => u.email === email);
    
    if (!usuarioEncontrado) {
        return res.status(400).json({ erro: "E-mail ou senha incorretos." });
    }

    try {
        
        const senhaValida = await bcrypt.compare(senha, usuarioEncontrado.senha);

        if (!senhaValida) {
            return res.status(400).json({ erro: "E-mail ou senha incorretos." });
        }

        return res.status(200).json({
            mensagem: `Bem-vindo de volta, ${usuarioEncontrado.nome}!`,
            usuario: {
                id: usuarioEncontrado.id,
                nome: usuarioEncontrado.nome,
                email: usuarioEncontrado.email
            }
        });

    } catch (erro) {
        return res.status(500).json({ erro: "Erro interno ao processar o login." });
    }
});

// Rota extra para ver o resultado: http://localhost:3000/usuarios
app.get('/usuarios', (req, res) => {
    res.json(bancoDeUsuarios);
});

app.listen(3000, () => {
    console.log('Servidor Back-end a correr na porta 3000!');
});