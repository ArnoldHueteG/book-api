const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('books', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    author: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'books',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__books__3213E83F85C7B732",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
