const { body, param, validationResult } = require('express-validator');

// Helper para retornar erros de validação
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Dados inválidos',
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

const TIPOS_VALIDOS = ['admin', 'usuario', 'moderador']; // ajuste conforme seu domínio

const userValidations = {
  create: [
    body('nome')
      .trim()
      .notEmpty().withMessage('Nome é obrigatório')
      .isLength({ max: 100 }).withMessage('Nome deve ter no máximo 100 caracteres'),

    body('email')
      .trim()
      .notEmpty().withMessage('E-mail é obrigatório')
      .isEmail().withMessage('E-mail inválido')
      .isLength({ max: 100 }).withMessage('E-mail deve ter no máximo 100 caracteres'),

    body('senha')
      .notEmpty().withMessage('Senha é obrigatória')
      .isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),

    body('tipo')
      .notEmpty().withMessage('Tipo é obrigatório')
      .isIn(TIPOS_VALIDOS).withMessage(`Tipo deve ser um de: ${TIPOS_VALIDOS.join(', ')}`),

    body('ativo')
      .optional()
      .isBoolean().withMessage('Ativo deve ser booleano'),

    validate,
  ],

  update: [
    param('id').isInt({ min: 1 }).withMessage('ID inválido'),

    body('nome')
      .optional()
      .trim()
      .notEmpty().withMessage('Nome não pode ser vazio')
      .isLength({ max: 100 }).withMessage('Nome deve ter no máximo 100 caracteres'),

    body('email')
      .optional()
      .trim()
      .isEmail().withMessage('E-mail inválido')
      .isLength({ max: 100 }).withMessage('E-mail deve ter no máximo 100 caracteres'),

    body('senha')
      .optional()
      .isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),

    body('tipo')
      .optional()
      .isIn(TIPOS_VALIDOS).withMessage(`Tipo deve ser um de: ${TIPOS_VALIDOS.join(', ')}`),

    body('ativo')
      .optional()
      .isBoolean().withMessage('Ativo deve ser booleano'),

    validate,
  ],

  idParam: [
    param('id').isInt({ min: 1 }).withMessage('ID inválido'),
    validate,
  ],
};

module.exports = userValidations;
