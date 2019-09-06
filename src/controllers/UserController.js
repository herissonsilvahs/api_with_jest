const { User } = require('../models')
const JWTService = require('../services/JWTService')
const BcryptService = require('../services/BcryptService')

module.exports = {
  async signUp(req, res) {
    const { email, password, name } = req.body
    try {
      if (!email || !password || !name) {
        return res.status(400).json({message: "Missing parans"})
      }
      if (password.length < 8 || password.length > 20) {
        return res.status(400).json({message: 'Password must be from 8 to 20 characters'})
      }
      const user = await User.create({
        name,
        email,
        password
      })
      return res.status(200).json({
        user: user,
        token: JWTService.sign(user.toJSON())
      })
    } catch (err) {
      return res.status(500).json({error: err})
    }
  },
  async signIn(req, res) {
    const { email, password } = req.body
    try {
      const query = { where:{ email } }
      const user = await User.findOne(query)
      if (!user) {
        return res.status(400).json({message: 'Invalid user credentials'})
      }
      const validPassword = await BcryptService.compareHash(password, user.password_hash)
      if (!validPassword) {
        return res.status(400).json({message: 'Invalid user credentials'})
      }
      return res.status(200).json({
        user: user,
        token: JWTService.sign(user.toJSON())
      })
    } catch (err) {
      return res.status(500).json(err)
    }
  }
}