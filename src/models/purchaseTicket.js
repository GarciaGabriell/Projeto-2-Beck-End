module.exports = (sequelize, DataTypes) => {
  const PurchaseTicket = sequelize.define('PurchaseTicket', {

    purchaseId: {
      type: DataTypes.INTEGER,  
      allowNull: false,  
      references: {
        model: 'Purchase',  
        key: 'id', 
      },
    },

    
    ticketId: {
      type: DataTypes.INTEGER,  
      allowNull: false, 
      references: {
        model: 'Ticket',  
        key: 'id', 
      },
    },

    
    quantidade: {
      type: DataTypes.INTEGER,  
      allowNull: false, 
      defaultValue: 1,  // Valor padrão é 1, caso o usuário não forneça a quantidade
    },
  });

  return PurchaseTicket;
};
