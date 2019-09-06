const BcryptService = require('../services/BcryptService')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.VIRTUAL,
    password_hash: DataTypes.STRING
  }, {
    hooks: {
      beforeSave: async user => {
        if (user.password) {
          user.password_hash = await BcryptService.generateHash(user.password)
        }
      }
    }
  })
  return User
}