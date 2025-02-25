exports.isAdmin = (req, res, next) => {
  if (req.user.tipo !== 'admin') {
    return res.status(403).json({ message: 'Acesso restrito apenas para administradores.' });
  }
  next();  
};
