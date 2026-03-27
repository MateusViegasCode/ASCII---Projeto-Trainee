const bcrypt = require('bcryptjs');
const UserModel = require('../models/userModel');

const SALT_ROUNDS = 12;

const UserController = {
  // GET /users
  async getAll(req, res) {
    try {
      const { page = 1, limit = 20, tipo, ativo } = req.query;

      const filters = {
        page: parseInt(page),
        limit: parseInt(limit),
        tipo,
        ativo: ativo !== undefined ? ativo === 'true' : undefined,
      };

      const { data, error } = await UserModel.findAll(filters);

      if (error) throw error;

      return res.json({
        success: true,
        data,
        pagination: {
          page: filters.page,
          limit: filters.limit,
        },
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar usuários',
        error: err.message,
      });
    }
  },

  // GET /users/:id
  async getById(req, res) {
    try {
      const { id } = req.params;
      const { data, error } = await UserModel.findById(id);

      if (error || !data) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado',
        });
      }

      return res.json({ success: true, data });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar usuário',
        error: err.message,
      });
    }
  },

  // POST /users
  async create(req, res) {
    try {
      const { nome, email, senha, tipo, ativo } = req.body;

      // Verificar email duplicado
      const { exists, error: emailError } = await UserModel.emailExists(email);
      if (emailError) throw emailError;
      if (exists) {
        return res.status(409).json({
          success: false,
          message: 'E-mail já cadastrado',
        });
      }

      // Hash da senha
      const senha_hash = await bcrypt.hash(senha, SALT_ROUNDS);

      const { data, error } = await UserModel.create({
        nome,
        email,
        senha_hash,
        tipo,
        ativo: ativo !== undefined ? ativo : true,
      });

      if (error) throw error;

      return res.status(201).json({
        success: true,
        message: 'Usuário criado com sucesso',
        data,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Erro ao criar usuário',
        error: err.message,
      });
    }
  },

  // PUT /users/:id  (substituição total dos campos editáveis)
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, senha, tipo, ativo } = req.body;

      // Verificar se usuário existe
      const { data: existing, error: findError } = await UserModel.findById(id);
      if (findError || !existing) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado',
        });
      }

      // Verificar email duplicado (excluindo o próprio usuário)
      if (email && email !== existing.email) {
        const { exists, error: emailError } = await UserModel.emailExists(email, id);
        if (emailError) throw emailError;
        if (exists) {
          return res.status(409).json({
            success: false,
            message: 'E-mail já cadastrado por outro usuário',
          });
        }
      }

      // Montar campos a atualizar
      const fields = {};
      if (nome !== undefined) fields.nome = nome;
      if (email !== undefined) fields.email = email;
      if (tipo !== undefined) fields.tipo = tipo;
      if (ativo !== undefined) fields.ativo = ativo;
      if (senha) fields.senha_hash = await bcrypt.hash(senha, SALT_ROUNDS);

      if (Object.keys(fields).length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Nenhum campo para atualizar',
        });
      }

      const { data, error } = await UserModel.update(id, fields);
      if (error) throw error;

      return res.json({
        success: true,
        message: 'Usuário atualizado com sucesso',
        data,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Erro ao atualizar usuário',
        error: err.message,
      });
    }
  },

  // DELETE /users/:id
  async remove(req, res) {
    try {
      const { id } = req.params;

      const { data: existing, error: findError } = await UserModel.findById(id);
      if (findError || !existing) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado',
        });
      }

      const { error } = await UserModel.delete(id);
      if (error) throw error;

      return res.json({
        success: true,
        message: 'Usuário removido com sucesso',
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Erro ao remover usuário',
        error: err.message,
      });
    }
  },
};

module.exports = UserController;
