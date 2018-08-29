const { User } = require('../models')
const Op = require('../models/Index').Sequelize.Op

module.exports = {
  async authenticate (req, res) {
    try {
      let resetPasswordToken = req.body.resetPasswordToken
      if (resetPasswordToken) {
        let user = await User.findOne({ where: { resetPasswordToken: resetPasswordToken, resetPasswordExpires: { [Op.gte]: new Date() } } })
        if (user) {
          console.log(user.dataValues)
          res.status(200).send({
            userId: user.dataValues.id
          })
        } else {
          res.status(404).send()
        }
      }
    } catch (error) {
      console.log(error)
      res.status(500).send()
    }
  }
}
