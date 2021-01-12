const dotenv = require('dotenv');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const config = {
  /**
 * Your favorite port
 */
  port: parseInt(process.env.PORT, 10),

  /**
  * Database mongoose
  */
  database: process.env.MONGODB_URI,

  /**
  * Secret key
  */

  accessToken: process.env.SECRET_KEY,

  /**
  * Expire token
  */

  expireInToken: process.env.ACCESS_TOKEN_LIFE,

  /**
  * Refresh secret key
  */

  refreshAccessToken: process.env.REFRESH_SECRET_KEY,

  /**
  * Expire refresh token
  */

  expireInRefreshToken: process.env.REFRESH_ACCESS_TOKEN_LIFE,

  /**
 * Used by winston logger
 */
  logs: {
    level: process.env.LOG_LEVEL || 'not found',
  },

  /**
 * API configs
 */
  api: {
    prefix: '/api',
  },
}

module.exports = config
