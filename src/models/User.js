module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {

    tipo: {
      type: DataTypes.STRING,
      allowNull: false,        
    },
    
    // 'nome' é o nome completo do usuário
    nome: {
      type: DataTypes.STRING,
      allowNull: false,        
    },

    // 'email' é o endereço de e-mail único do usuário
    email: {
      type: DataTypes.STRING,  
      unique: true,            
      allowNull: false,        
    },

    senha: {
      type: DataTypes.STRING,  
      allowNull: false,        
    }
  });

  return User;
};
