module.exports = (sequelize, DataTypes) => {
const Purchase = sequelize.define('Purchase', {
    
    usuarioId: {
      type: DataTypes.INTEGER,  
      allowNull: false,         
    },
  });

 
  Purchase.associate = (models) => {
    
    Purchase.belongsToMany(models.Ticket, {
      through: models.PurchaseTicket,  
      foreignKey: 'purchaseId',        
      otherKey: 'ticketId',        
    });
  };

  return Purchase;
};
