const jwt = require('jsonwebtoken');  // Biblioteca utilizada para gerar e verificar tokens JWT
const SECRET_KEY = process.env.JWT_SECRET;  // A chave secreta para verificar o token, vinda do arquivo .env

// Middleware para autenticação do usuário com JWT
const authenticate = (req, res, next) => {
  // Tenta pegar o token da requisição, que pode vir dos cookies ou do cabeçalho Authorization
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];  

  // Se o token não for encontrado, retorna um erro 401 (não autorizado)
  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido ou expirado.' });
  }

  try {
    // Verifica e decodifica o token usando a chave secreta armazenada no .env
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;  // Armazena as informações do usuário (decodificadas) no objeto `req` para uso em requisições posteriores

    // Chama a próxima função no middleware (por exemplo, o controlador que irá processar a requisição)
    next();  
  } catch (error) {
    // Se ocorrer um erro ao verificar o token (como o token ser inválido ou expirado)
    return res.status(401).json({ message: 'Token inválido ou expirado. Por favor, faça login novamente.' });
  }
};

module.exports = { authenticate };  // Exporta o middleware para ser usado em outras partes da aplicação
