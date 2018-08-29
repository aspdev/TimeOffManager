const Sequelize = require('sequelize')
const Op = Sequelize.Op
const path = require('path')

module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'timeOffManager',
    user: process.env.DB_USER || 'timeOffManager',
    password: process.env.DB_PASS || 'timeOffManager',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: path.join(__dirname, '../../sqlite.db'),
      operatorsAliases: Op
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 's#d@vbi4Lz32897'
  },
  emailService: {
    host: process.env.HOST || 'smtp.localhost',
    port: process.env.PORT || 25,
    emailFrom: process.env.EMAIL_FROM || 'office@simplito.com'
  }
}
