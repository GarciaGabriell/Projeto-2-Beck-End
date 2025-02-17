const jwt = require('jsonwebtoken');  // Importa a biblioteca para manipulação de tokens JWT

// Middleware de autenticação
exports.authenticate = (req, res, next) => {
  // Verifica o token de autenticação nos cookies
  const token = req.cookies.auth_token;

  // Se o token não for encontrado, retorna um erro 401 (não autorizado)
  if (!token) {
    return res.status(401).json({ message: 'Acesso não autorizado. Por favor, faça login para continuar.' });
  }

  try {
    // Tenta verificar e decodificar o token usando a chave secreta armazenada no arquivo .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Se o token for válido, armazena as informações do usuário no objeto `req` para uso em outros middlewares ou controladores
    req.user = decoded;
    
    // Chama o próximo middleware ou a função da rota
    next();  
  } catch (error) {
    // Se ocorrer algum erro ao verificar o token (ex: token expirado ou inválido),
    // retorna um erro 401 (não autorizado)
    res.status(401).json({ message: 'Token inválido ou expirado. Por favor, faça login novamente.' });
  }
};

// Middleware para verificar se o usuário é administrador
exports.isAdmin = (req, res, next) => {
  // Verifica se o tipo de usuário armazenado em `req.user` é 'admin'
  if (req.user.tipo !== 'admin') {
    // Se o usuário não for administrador, retorna um erro 403 (acesso proibido)
    return res.status(403).json({ message: 'Acesso restrito a administradores.' });
  }

  // Se o usuário for administrador, permite o acesso e chama o próximo middleware ou função da rota
  next();
};
