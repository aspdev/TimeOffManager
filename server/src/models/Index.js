const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
)

fs.readdirSync(__dirname)
  .filter((file) => file !== 'Index.js')
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

db.sequelize = sequelize
db.Sequelize = Sequelize

console.log(db.Form)

db.User.hasMany(db.Form, {foreignKey: 'employeeId', sourceKey: 'id'})
db.Form.belongsTo(db.User, {foreignKey: 'employeeId', sourceKey: 'id'})
module.exports = db
