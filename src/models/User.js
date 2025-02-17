module.exports = (sequelize, DataTypes) => {
  // Define o modelo 'User', que representa a tabela 'User' no banco de dados
  const User = sequelize.define('User', {
    
    // 'nome' é o nome completo do usuário
    nome: {
      type: DataTypes.STRING,  // Tipo de dado string para armazenar o nome do usuário
      allowNull: false,        // Não permite valores nulos para esta coluna
    },

    // 'email' é o endereço de e-mail único do usuário
    email: {
      type: DataTypes.STRING,  // Tipo de dado string para armazenar o e-mail
      unique: true,            // Garante que o e-mail seja único no banco de dados, evitando duplicidade
      allowNull: false,        // Não permite valores nulos para esta coluna
    },

    // 'senha' é a senha do usuário, usada para autenticação
    senha: {
      type: DataTypes.STRING,  // Tipo de dado string para armazenar a senha do usuário
      allowNull: false,        // Não permite valores nulos para esta coluna
    }
  });

  // Retorna o modelo 'User' para ser utilizado em outras partes da aplicação
  return User;
};
