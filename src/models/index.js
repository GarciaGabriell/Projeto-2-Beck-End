require('dotenv').config();  // Carrega as variáveis de ambiente do arquivo .env para acessar as configurações de banco de dados
const { Sequelize, DataTypes } = require('sequelize');  // Importa o Sequelize e o tipo de dados (DataTypes) para a definição dos modelos

// Conexão com o banco de dados usando Sequelize
const sequelize = new Sequelize({
  host: process.env.DB_HOST,         // Endereço do host do banco de dados (ex: 'localhost' ou IP do servidor)
  username: process.env.DB_USER,     // Nome do usuário para autenticação no banco de dados
  password: process.env.DB_PASSWORD, // Senha do usuário para se conectar ao banco de dados
  database: process.env.DB_NAME,     // Nome do banco de dados onde as tabelas estão localizadas
  dialect: 'mysql',                  // Define o dialeto do banco de dados, nesse caso, MySQL
  logging: false,                    // Desativa o log das queries SQL no console para não poluir a saída
});

// Importação dos modelos
// Importa os modelos de User, Purchase, Ticket e PurchaseTicket, passando a conexão do Sequelize e DataTypes para cada modelo
const User = require('./User')(sequelize, DataTypes);
const Purchase = require('./Purchase')(sequelize, DataTypes);
const Ticket = require('./Ticket')(sequelize, DataTypes);
const PurchaseTicket = require('./purchaseTicket')(sequelize, DataTypes);

// Definindo as associações entre os modelos
// Associações entre os modelos para garantir que as relações de banco de dados sejam configuradas corretamente

// Associa o modelo Ticket com Purchase e PurchaseTicket (um ticket pode ser comprado em várias compras e cada compra pode ter vários tickets)
Ticket.associate({ Purchase, PurchaseTicket });

// Associa o modelo Purchase com Ticket e PurchaseTicket (uma compra pode ter vários tickets e cada ticket pode estar relacionado a várias compras)
Purchase.associate({ Ticket, PurchaseTicket });

// Exporta a conexão do Sequelize e os modelos para que possam ser utilizados em outras partes da aplicação
module.exports = { sequelize, User, Purchase, Ticket, PurchaseTicket };
