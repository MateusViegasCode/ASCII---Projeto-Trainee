const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const UserModel = require('../models/userModel');

const router = Router();
const SALT_ROUNDS = 12;

//POST /api/auth/login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('E-mail inválido'),
    body('senha').notEmpty().withMessage('Senha é obrigatória'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { email, senha } = req.body;
      const { data: user, error } = await UserModel.findByEmail(email);

      if (error || !user) {
        return res.status(401).json({ success: false, message: 'Credenciais inválidas' });
      }
      if (!user.ativo) {
        return res.status(403).json({ success: false, message: 'Usuário inativo' });
      }

      const senhaValida = await bcrypt.compare(senha, user.senha_hash);
      if (!senhaValida) {
        return res.status(401).json({ success: false, message: 'Credenciais inválidas' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, tipo: user.tipo },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      return res.json({
        success: true,
        token,
        user: { id: user.id, nome: user.nome, email: user.email, tipo: user.tipo },
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Erro interno', error: err.message });
    }
  }
);

// POST /api/auth/register 
// Rota pública: qualquer pessoa pode se cadastrar com tipo "usuario"
router.post(
  '/register',
  [
    body('nome').trim().notEmpty().withMessage('Nome é obrigatório'),
    body('email').isEmail().withMessage('E-mail inválido'),
    body('senha').isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { nome, email, senha } = req.body;

      const { exists } = await UserModel.emailExists(email);
      if (exists) {
        return res.status(409).json({ success: false, message: 'E-mail já cadastrado' });
      }

      const senha_hash = await bcrypt.hash(senha, SALT_ROUNDS);

      const { data, error } = await UserModel.create({
        nome,
        email,
        senha_hash,
        tipo: 'usuario',
        ativo: true,
      });

      if (error) throw error;

      return res.status(201).json({
        success: true,
        message: 'Conta criada com sucesso',
        data,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Erro interno', error: err.message });
    }
  }
);

module.exports = router;
