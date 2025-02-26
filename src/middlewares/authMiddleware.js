const jwt = require('jsonwebtoken');  // Importa a biblioteca para manipulação de tokens JWT

// Middleware de autenticação
exports.authenticate = (req, res, next) => {
  // Verifica o token de autenticação nos cookies
  const token = req.cookies.auth_token;
  if (!token) {
    return res.status(401).json({ message: 'Acesso não autorizado. Por favor, faça login para continuar.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    
    next();  
  } catch (error) {
    res.status(401).json({ message: 'Token inválido ou expirado. Por favor, faça login novamente.' });
  }
};


// Middleware para verificar se o usuário é administrador
exports.isAdmin = (req, res, next) => {
  if (req.user.tipo !== 'admin') {
    return res.status(403).json({ message: 'Acesso restrito a administradores.' });
  }
  next();
};

