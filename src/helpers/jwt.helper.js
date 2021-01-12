const jwt = require('jsonwebtoken')

const generateToken = (user, secretKey, tokenLife) => {
  const payload = {
    _id: user.id,
    name: user.name,
    email: user.email
  };

  const token = jwt.sign(
    payload,
    secretKey,
    {
      algorithm: "HS256",
      expiresIn: tokenLife,
      expiresIn: 5000
    }
  )

  return token
}

const verifyToken = (refreshToken, refreshSecretKey) => {
  try {
    const decoded = jwt.verify(refreshToken, refreshSecretKey)
    return decoded
  } catch (error) {
    throw error
  }
}


module.exports = {
  generateToken,
  verifyToken
}
