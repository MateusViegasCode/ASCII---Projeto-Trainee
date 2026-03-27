const { Router } = require('express');
const UserController = require('../controllers/userController');
const userValidations = require('../middlewares/userValidations');
const { authMiddleware, authorize } = require('../middlewares/auth');

const router = Router();

// Todas as rotas abaixo exigem autenticação
// Remova authMiddleware se quiser rotas abertas durante desenvolvimento
router.use(authMiddleware);

/**
 * @route   GET /api/users
 * @desc    Lista todos os usuários (com paginação e filtros opcionais)
 * @query   page, limit, tipo, ativo
 * @access  admin
 */
router.get('/', authorize('admin'), UserController.getAll);

/**
 * @route   GET /api/users/:id
 * @desc    Retorna um usuário por ID
 * @access  admin ou o próprio usuário
 */
router.get('/:id', userValidations.idParam, UserController.getById);

/**
 * @route   POST /api/users
 * @desc    Cria um novo usuário
 * @body    { nome, email, senha, tipo, ativo? }
 * @access  admin
 */
router.post('/', authorize('admin'), userValidations.create, UserController.create);

/**
 * @route   PUT /api/users/:id
 * @desc    Atualiza dados de um usuário
 * @body    { nome?, email?, senha?, tipo?, ativo? }
 * @access  admin
 */
router.put('/:id', authorize('admin'), userValidations.update, UserController.update);

/**
 * @route   DELETE /api/users/:id
 * @desc    Remove um usuário
 * @access  admin
 */
router.delete('/:id', authorize('admin'), userValidations.idParam, UserController.remove);

module.exports = router;
