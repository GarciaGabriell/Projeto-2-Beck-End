require('dotenv').config();  
const { Sequelize, DataTypes } = require('sequelize'); 

const sequelize = new Sequelize({
  host: process.env.DB_HOST,         
  username: process.env.DB_USER,     
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME,     
  dialect: 'mysql',                  
  logging: false,                    
});

const User = require('./User')(sequelize, DataTypes);
const Purchase = require('./Purchase')(sequelize, DataTypes);
const Ticket = require('./Ticket')(sequelize, DataTypes);
const PurchaseTicket = require('./purchaseTicket')(sequelize, DataTypes);

const models = { User, Purchase, Ticket, PurchaseTicket };

Ticket.associate(models);
Purchase.associate(models);

module.exports = { sequelize, User, Purchase, Ticket, PurchaseTicket };
