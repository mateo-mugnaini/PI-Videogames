const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "videogame",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      released: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.NOW,
        allowNull: true,
      },

      rating: {
        type: DataTypes.STRING,
      },

      platform: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },

      image: {
        type: DataTypes.STRING,
        defaultValue:
          "https://i.scdn.co/image/ab67616d0000b273b7d18dde0166e9df52b22c8d",
      },

      created: {
        type: DataTypes.STRING,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
