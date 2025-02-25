const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];  

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido ou expirado.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; 
    next();  
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido ou expirado. Por favor, faça login novamente.' });
  }
};
module.exports = { authenticate }; 