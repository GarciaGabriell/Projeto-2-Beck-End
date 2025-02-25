module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    
    nome: {
      type: DataTypes.STRING,  
      allowNull: false,        
    },

    // 'preco' é o preço do ingresso
    preco: {
      type: DataTypes.DECIMAL, 
      allowNull: false,        
    },

    
    quantidadeDisponivel: {
      type: DataTypes.INTEGER,  
      allowNull: false,         
    },
  });

  
  Ticket.associate = (models) => {
    // Relacionamento muitos-para-muitos entre 'Ticket' e 'Purchase' usando a tabela intermediária 'PurchaseTicket'
    Ticket.belongsToMany(models.Purchase, {
      through: models.PurchaseTicket, 
      foreignKey: 'ticketId',          
      otherKey: 'purchaseId',          
    });
  };

  return Ticket;
};
