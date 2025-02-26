const { User } = require('../models');  
const bcrypt = require('bcryptjs');  
const jwt = require('jsonwebtoken');  

// Função para registrar o usuário
exports.register = async (req, res) => {
  const { nome, email, senha, tipo} = req.body; 

  try {
    // Verifica se o usuário já existe no banco de dados, consultando pelo e-mail
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'Este E-mail já está em uso!' });
    }

    // Realiza a criptografia da senha do usuário antes de armazená-la no banco de dados
    const hashedPassword = await bcrypt.hash(senha, 10);

    const user = await User.create({ nome, email, senha: hashedPassword, tipo });

    // Após o cadastro ser realizado, redireciona o usuário para a página de login
    res.status(200).json({ message:'Usuário Cadastrado com sucesso!'})
  } catch (error) {
    console.error('Falha ao cadastrar usuário:', error);
    res.status(500).json({ message: 'Não foi possível realizar o cadastro', error });
  }
};

// Função para login do usuário
exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await User.findOne({ where: { email } });
    if (!usuario) {
      return res.status(400).json({ message: 'E-mail ou senha incorretos' });
    }

    // Compara a senha fornecida com a senha armazenada no banco de dados
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(400).json({ message: 'E-mail ou senha incorretos' });
    }

    const token = jwt.sign({ id: usuario.id, email: usuario.email, tipo: usuario.tipo }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Armazena o token em um cookie, garantindo que seja seguro com httpOnly
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });

    // Redireciona o usuário para a página de vendas
    res.redirect('/vendas');
  } catch (error) {
    console.error('Falha ao realizar login:', error);
    res.status(500).json({ message: 'Erro ao tentar realizar login.' });
  }
};

exports.loginApi = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await User.findOne({ where: { email } });
    if (!usuario) {
      return res.status(400).json({ message: 'E-mail ou senha incorretos' });
    }

    // Compara a senha fornecida com a senha armazenada no banco de dados
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(400).json({ message: 'E-mail ou senha incorretos' });
    }

    const token = jwt.sign({ id: usuario.id, email: usuario.email, tipo: usuario.tipo }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Redireciona o usuário para a página de vendas
    res.status(200).json({token});
  } catch (error) {
    console.error('Falha ao realizar login:', error);
    res.status(500).json({ message: 'Erro ao tentar realizar login.' });
  }
};

