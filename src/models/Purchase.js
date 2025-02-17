module.exports = (sequelize, DataTypes) => {
  // Define o modelo 'Purchase', que representa a tabela 'Purchase' no banco de dados
  const Purchase = sequelize.define('Purchase', {
    
    // 'usuarioId' é a chave estrangeira para o usuário que fez a compra
    usuarioId: {
      type: DataTypes.INTEGER,  // Tipo de dado inteiro para armazenar o ID do usuário
      allowNull: false,         // Não permite valores nulos para esta coluna
    },
  });

  // Associações entre o modelo 'Purchase' e outros modelos
  Purchase.associate = (models) => {
    // Relacionamento muitos-para-muitos entre 'Purchase' e 'Ticket' através da tabela intermediária 'PurchaseTicket'
    Purchase.belongsToMany(models.Ticket, {
      through: models.PurchaseTicket,  // Tabela intermediária 'PurchaseTicket'
      foreignKey: 'purchaseId',        // Chave estrangeira no modelo 'PurchaseTicket' para 'Purchase'
      otherKey: 'ticketId',            // Chave estrangeira no modelo 'PurchaseTicket' para 'Ticket'
    });
  };

  return Purchase;
};
