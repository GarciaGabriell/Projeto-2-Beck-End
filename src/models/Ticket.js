module.exports = (sequelize, DataTypes) => {
  // Define o modelo 'Ticket', que representa a tabela 'Ticket' no banco de dados
  const Ticket = sequelize.define('Ticket', {
    
    // 'nome' é o nome do ingresso, por exemplo, 'VIP' ou 'Normal'
    nome: {
      type: DataTypes.STRING,  // Tipo de dado string para armazenar o nome do ingresso
      allowNull: false,        // Não permite valores nulos para esta coluna
    },

    // 'preco' é o preço do ingresso
    preco: {
      type: DataTypes.DECIMAL, // Tipo de dado decimal para armazenar o preço do ingresso
      allowNull: false,        // Não permite valores nulos para esta coluna
    },

    // 'quantidadeDisponivel' indica quantos ingressos desse tipo estão disponíveis
    quantidadeDisponivel: {
      type: DataTypes.INTEGER,  // Tipo de dado inteiro para armazenar a quantidade disponível
      allowNull: false,         // Não permite valores nulos para esta coluna
    },
  });

  // Definindo as associações entre 'Ticket' e 'Purchase'
  Ticket.associate = (models) => {
    // Relacionamento muitos-para-muitos entre 'Ticket' e 'Purchase' usando a tabela intermediária 'PurchaseTicket'
    Ticket.belongsToMany(models.Purchase, {
      through: models.PurchaseTicket,  // Tabela intermediária 'PurchaseTicket' para associar 'Ticket' e 'Purchase'
      foreignKey: 'ticketId',          // Chave estrangeira no modelo 'PurchaseTicket' para 'Ticket'
      otherKey: 'purchaseId',          // Chave estrangeira no modelo 'PurchaseTicket' para 'Purchase'
    });
  };

  return Ticket;
};
