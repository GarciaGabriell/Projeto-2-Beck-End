// Middleware para verificar se o usuário tem permissão de administrador
exports.isAdmin = (req, res, next) => {
  // Verifica se o tipo de usuário no objeto `req.user` é 'admin'
  if (req.user.tipo !== 'admin') {
    // Se o usuário não for um administrador, retorna um erro 403 (acesso proibido)
    return res.status(403).json({ message: 'Acesso restrito apenas para administradores.' });
  }

  // Se o usuário for administrador, permite o acesso à próxima função ou middleware
  // (geralmente, o controlador que processa a requisição)
  next();  
};
