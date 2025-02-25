const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota GET para exibir o formulário de login
router.get('/login', (req, res) => {
  res.render('login');
});

// Rota POST para login
router.post('/login', async (req, res) => {
  try {
    const user = await authController.login(req, res);
    if (user) {
      return res.redirect('/vendas');
    } else {
      return res.render('login', { message: 'E-mail ou senha inválidos.' });
    }
  } catch (error) {
    console.error('Erro ao tentar fazer login', error);
    return res.render('login', { message: 'Erro ao tentar fazer login. Por favor, tente novamente.' });
  }
});

router.get('/register', (req, res) => {
  res.render('register');
});

// Rota POST para registrar o novo usuário
router.post('/register', async (req, res) => {
  try {
    const user = await authController.register(req, res); 
    if (user) {
      return res.redirect('/auth/login');  // Redireciona para o login após o cadastro bem-sucedido
    } else {
      return res.render('register', { message: 'Erro ao cadastrar usuário. Tente novamente.' });
    }
  } catch (error) {
    console.error('Erro ao cadastrar usuário', error);
    return res.render('register', { message: 'Erro ao cadastrar usuário. Verifique os dados e tente novamente.' });
  }
});

module.exports = router;
