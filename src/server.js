require('dotenv').config();  
const express = require('express');  
const exphbs = require('express-handlebars');  
const path = require('path');  
const morgan = require('morgan');  
const cookieParser = require('cookie-parser');  
const { sequelize } = require('./models'); 
const authRoutes = require('./routes/authRoutes');  
const purchaseRoutes = require('./routes/purchaseRoutes');  

const app = express(); 
const PORT = process.env.PORT || 3000;  

app.engine('hbs', exphbs.engine({
  extname: 'hbs', 
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  helpers: {
    multiply: (a, b) => a * b 
  }
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views')); 

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(cookieParser()); 
app.use(morgan('dev'));

// Rotas da API
app.use('/auth', authRoutes); 
app.use('/', purchaseRoutes); 

const startServer = async () => {
  try {
    await sequelize.authenticate();  
    console.log('Conectado ao banco de dados.');
    
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (err) {
    console.error('Erro de conexão:', err);
  }
};

startServer();
