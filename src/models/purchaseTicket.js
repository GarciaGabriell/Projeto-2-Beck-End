module.exports = (sequelize, DataTypes) => {
  // Define o modelo 'PurchaseTicket', que representa a tabela intermediária no relacionamento muitos-para-muitos entre 'Purchases' e 'Tickets'
  const PurchaseTicket = sequelize.define('PurchaseTicket', {
    
    // 'purchaseId' é a chave estrangeira que se refere à tabela 'Purchases', indicando a qual compra o ingresso pertence
    purchaseId: {
      type: DataTypes.INTEGER,  // Tipo de dado inteiro para armazenar o ID da compra
      allowNull: false,  // Não permite valores nulos para esta coluna
      references: {
        model: 'Purchases',  // A tabela que é referenciada, neste caso, 'Purchases'
        key: 'id',  // A chave primária da tabela 'Purchases', que é usada como chave estrangeira aqui
      },
    },

    // 'ticketId' é a chave estrangeira para a tabela 'Tickets', indicando qual ingresso foi comprado
    ticketId: {
      type: DataTypes.INTEGER,  // Tipo de dado inteiro para armazenar o ID do ingresso
      allowNull: false,  // Não permite valores nulos para esta coluna
      references: {
        model: 'Tickets',  // A tabela que é referenciada, neste caso, 'Tickets'
        key: 'id',  // A chave primária da tabela 'Tickets', que é usada como chave estrangeira aqui
      },
    },

    // 'quantidade' indica a quantidade de ingressos comprados para esta compra
    quantidade: {
      type: DataTypes.INTEGER,  // Tipo de dado inteiro para armazenar a quantidade de ingressos
      allowNull: false,  // Não permite valores nulos para esta coluna
      defaultValue: 1,  // Valor padrão é 1, caso o usuário não forneça a quantidade
    },
  });

  // Retorna o modelo 'PurchaseTicket' para que ele possa ser utilizado em outras partes da aplicação
  return PurchaseTicket;
};
