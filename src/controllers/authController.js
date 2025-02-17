const { User } = require('../models');  // Verifique se o modelo User está sendo importado corretamente
const bcrypt = require('bcryptjs');  // Pacote utilizado para criptografar senhas
const jwt = require('jsonwebtoken');  // Pacote utilizado para gerar tokens JWT

// Função para registrar o usuário
exports.register = async (req, res) => {
  const { nome, email, senha } = req.body;  // Obtém os dados de nome, email e senha enviados pelo usuário

  try {
    // Verifica se o usuário já existe no banco de dados, consultando pelo e-mail
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      // Caso o e-mail já tenha sido registrado, retorna uma resposta de erro
      return res.status(400).json({ message: 'Este E-mail já está em uso!' });
    }

    // Realiza a criptografia da senha do usuário antes de armazená-la no banco de dados
    const hashedPassword = await bcrypt.hash(senha, 10);  // Senha criptografada com um salt de 10

    // Cria um novo usuário com as informações fornecidas
    const user = await User.create({ nome, email, senha: hashedPassword });

    // Após o cadastro ser realizado, redireciona o usuário para a página de login
    res.redirect('/auth/login');
  } catch (error) {
    // Caso ocorra algum erro durante o registro, retorna uma resposta de erro 500
    console.error('Falha ao cadastrar usuário:', error);
    res.status(500).json({ message: 'Não foi possível realizar o cadastro', error });
  }
};

// Função para login do usuário
exports.login = async (req, res) => {
  const { email, senha } = req.body;  // Obtém os dados de e-mail e senha fornecidos pelo usuário

  try {
    // Verifica se o usuário existe no banco de dados com base no e-mail
    const usuario = await User.findOne({ where: { email } });

    // Se o usuário não for encontrado, retorna uma mensagem de erro
    if (!usuario) {
      return res.status(400).json({ message: 'E-mail ou senha incorretos' });
    }

    // Compara a senha fornecida com a senha armazenada no banco de dados
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      // Caso a senha não seja válida, retorna um erro
      return res.status(400).json({ message: 'E-mail ou senha incorretos' });
    }

    // Se a senha for válida, gera um token JWT com as informações do usuário (id e e-mail)
    const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Armazena o token em um cookie, garantindo que seja seguro com httpOnly
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });  // O cookie expira após 1 hora (3600000 ms)

    // Após login bem-sucedido, redireciona o usuário para a página de vendas
    res.redirect('/vendas');
  } catch (error) {
    // Se ocorrer um erro durante o login, retorna uma resposta de erro 500
    console.error('Falha ao realizar login:', error);
    res.status(500).json({ message: 'Erro ao tentar realizar login.' });
  }
};
