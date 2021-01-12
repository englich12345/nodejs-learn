const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const userResponseModel = require('../models/UserResponseModel')
const saltRounds = 10
const config = require('../config');
const jwtHelper = require('../helpers/jwt.helper');
const { getUserById } = require('../api/controllers/UserController');
let tokenList = {}

const UserService = {
  async register(req, response) {
    const user = await User.findOne({ email: req.email });
    if (user) return response.status(404).send({ message: 'User has already exist!' })
    bcrypt.hash(req.password, saltRounds, async (err, hash) => {
      const userRegister = {
        name: req.name,
        password: hash,
        email: req.email,
        role: "user"
      };
      const userModel = new User(userRegister);
      const result = await userModel.save();
      return response.status(200).send({
        message: 'Created user successfully!',
        status: response.statusCode = 200,
        data: userResponseModel(result)
      })
    })
  },

  async login(req, response) {
    const user = await User.findOne({ email: req.email });
    if (!user) return response.send({ message: 'User not found!' })
    bcrypt.compare(req.password, user.password, (err, result) => {
      if (!result) return response.send({ message: 'password is not correct' })
      const user_info = {
        id: user._id,
        name: user.name
      }
      const accessToken = jwtHelper.generateToken(user, config.accessToken, config.expireInToken);
      const refreshAccessToken = jwtHelper.generateToken(user, config.refreshAccessToken, config.expireInRefreshToken);
      tokenList[refreshAccessToken] = { accessToken, refreshAccessToken };
      return response.status(200).send({ accessToken, refreshAccessToken, user: user_info })
    })
  },

  async refresh_token(req, response) {
    const refreshTokenFromClient = req.refreshToken;
    if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {
      const decoded = jwtHelper.verifyToken(refreshTokenFromClient, config.refreshAccessToken);
      const accessToken = jwtHelper.generateToken(decoded, config.accessToken, config.expireInToken)
      return response.status(200).send({ accessToken })
    }
  },

  async getUserById(id, response) {
    try {
      const user = await User.findById(id).exec();
      if (!user) return response.status(200).send({message: "Not found user!"})
      return response.status(200).send(user)
    } catch (error) {
      console.log(error)
      return response.status(200).send({message: "Not found user!"})
    }
  },

  async getAllUser(req, response) {
    try {
      const users = await User.find();
      response.send(users)
    } catch (error) {
      return response.status(500).send({
        message: "Can't get users"
      })
    }
  }
}

module.exports = UserService;
