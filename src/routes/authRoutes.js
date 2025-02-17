const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota GET para exibir o formulário de login
router.get('/login', (req, res) => {
  res.render('login');  // Renderiza o formulário de login
});

// Rota POST para login
router.post('/login', async (req, res) => {
  try {
    // Tenta fazer login com as credenciais fornecidas
    const user = await authController.login(req, res);  // Chama a função de login do controlador
    if (user) {
      return res.redirect('/vendas');  // Redireciona para a página de vendas após o login bem-sucedido
    } else {
      return res.render('login', { message: 'E-mail ou senha inválidos.' });  // Exibe uma mensagem de erro caso o login falhe
    }
  } catch (error) {
    console.error('Erro ao tentar fazer login', error);  // Exibe o erro no console para depuração
    return res.render('login', { message: 'Erro ao tentar fazer login. Por favor, tente novamente.' });
  }
});

// Rota GET para exibir o formulário de cadastro
router.get('/register', (req, res) => {
  res.render('register'); // Renderiza o formulário de cadastro
});

// Rota POST para registrar o novo usuário
router.post('/register', async (req, res) => {
  try {
    // Tenta registrar o novo usuário com os dados fornecidos
    const user = await authController.register(req, res); 
    if (user) {
      return res.redirect('/auth/login');  // Redireciona para o login após o cadastro bem-sucedido
    } else {
      return res.render('register', { message: 'Erro ao cadastrar usuário. Tente novamente.' });  // Mensagem de erro caso o cadastro falhe
    }
  } catch (error) {
    console.error('Erro ao cadastrar usuário', error);  // Exibe o erro no console para depuração
    return res.render('register', { message: 'Erro ao cadastrar usuário. Verifique os dados e tente novamente.' });
  }
});

module.exports = router;
