const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const UserModel = require('../models/userModel');

const router = Router();

/**
 * @route   POST /api/auth/login
 * @desc    Autentica usuário e retorna JWT
 * @body    { email, senha }
 */
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

module.exports = router;
