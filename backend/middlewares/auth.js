const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Token de autenticação não fornecido',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, tipo }
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido ou expirado',
    });
  }
};

// Middleware para restringir por tipo de usuário
const authorize = (...tipos) => (req, res, next) => {
  if (!tipos.includes(req.user?.tipo)) {
    return res.status(403).json({
      success: false,
      message: 'Acesso negado: permissão insuficiente',
    });
  }
  next();
};

module.exports = { authMiddleware, authorize };
